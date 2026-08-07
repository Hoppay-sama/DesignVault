'use client';

import { useState, useCallback, useMemo, useEffect, useRef, type KeyboardEvent } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { StyleEntry, StyleAxis } from '@/lib/types';
import { STYLE_CLUSTERS } from '@/lib/clusters';
import { USE_CASES, USE_CASE_LABELS } from '@/lib/use-cases';

interface AxisRange {
  min: number;
  max: number;
}

interface AxisFiltersState {
  color: AxisRange;
  typography: AxisRange;
  motion: AxisRange;
  density: AxisRange;
  texture: AxisRange;
  layout: AxisRange;
}

/** External command from the gallery empty state: reset everything or quick-pick a use case. */
export interface FilterCommand {
  signal: number;
  action: 'reset' | 'quickpick';
  useCaseId?: string;
}

const AXIS_LABELS: Record<keyof StyleAxis, { label: string; low: string; high: string }> = {
  color: { label: 'Color', low: 'Monochrome', high: 'Vivid' },
  typography: { label: 'Typography', low: 'System', high: 'Custom' },
  motion: { label: 'Motion', low: 'Static', high: 'Kinetic' },
  density: { label: 'Density', low: 'Sparse', high: 'Dense' },
  texture: { label: 'Texture', low: 'Clean', high: 'Textured' },
  layout: { label: 'Layout', low: 'Grid', high: 'Freeform' },
};

const AXIS_KEYS: (keyof StyleAxis)[] = [
  'color',
  'typography',
  'motion',
  'density',
  'texture',
  'layout',
];

const DEFAULT_RANGE: AxisRange = { min: 1, max: 6 };

function createDefaultAxisFilters(): AxisFiltersState {
  return {
    color: { ...DEFAULT_RANGE },
    typography: { ...DEFAULT_RANGE },
    motion: { ...DEFAULT_RANGE },
    density: { ...DEFAULT_RANGE },
    texture: { ...DEFAULT_RANGE },
    layout: { ...DEFAULT_RANGE },
  };
}

interface StyleFiltersProps {
  styles: StyleEntry[];
  onFilteredStyles: (filtered: StyleEntry[]) => void;
  command?: FilterCommand | null;
}

export function StyleFilters({ styles, onFilteredStyles, command }: StyleFiltersProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeUseCases, setActiveUseCases] = useState<string[]>([]);
  const [axisFilters, setAxisFilters] = useState<AxisFiltersState>(createDefaultAxisFilters);
  const [showAxisFilters, setShowAxisFilters] = useState(false);
  const [showUseCaseRow, setShowUseCaseRow] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Latest state snapshot for URL round-trip comparison.
  const stateRef = useRef({ tag: activeTag, axes: axisFilters, useCases: activeUseCases });
  useEffect(() => {
    stateRef.current = { tag: activeTag, axes: axisFilters, useCases: activeUseCases };
  }, [activeTag, axisFilters, activeUseCases]);

  // Queue of URLs WE pushed (router.replace). router.replace is async, so
  // rapid clicks can have several pushes in flight that land out of order.
  // When a landing matches a queued URL it is our own navigation — consume
  // it and skip the round-trip. A landing NOT in the queue is a back/forward
  // or deep link, so apply its state. A single-slot ref misattributes late
  // landings under rapid clicks (URL/state desync), hence the queue.
  const pushedRef = useRef<string[]>([]);

  // Cluster pills: one per style cluster (A→H), counts from actual tag data.
  const clusterCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cluster of STYLE_CLUSTERS) {
      counts[cluster.name] = styles.filter((style) =>
        style.tags.includes(cluster.name)
      ).length;
    }
    return counts;
  }, [styles]);

  // Use-case pills: counts from the style → use-case mapping.
  const useCaseCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const uc of USE_CASES) {
      counts[uc.id] = styles.filter((style) => style.useCases.includes(uc.id)).length;
    }
    return counts;
  }, [styles]);

  // Combined rule: (cluster if any) AND (use-case OR if any) AND axis ranges.
  const applyFilters = useCallback(
    (tag: string | null, axes: AxisFiltersState, useCases: string[]) => {
      const filtered = styles.filter((style) => {
        // Tag filter
        if (tag && !style.tags.includes(tag)) {
          return false;
        }

        // Use-case filter — OR-union across the selected pills
        if (useCases.length > 0 && !useCases.some((id) => style.useCases.includes(id))) {
          return false;
        }

        // Axis filters
        for (const key of AXIS_KEYS) {
          const range = axes[key];
          const value = style.axis[key];
          if (value < range.min || value > range.max) {
            return false;
          }
        }

        return true;
      });

      onFilteredStyles(filtered);
    },
    [styles, onFilteredStyles]
  );

  // ---- URL state (PRD §5.4): filter state lives in the URL ----

  const serializeState = useCallback(
    (tag: string | null, axes: AxisFiltersState, useCases: string[]): string => {
      const params = new URLSearchParams();
      if (tag) {
        params.set('tag', tag);
      }
      if (useCases.length > 0) {
        params.set('use', useCases.join(','));
      }
      for (const key of AXIS_KEYS) {
        const range = axes[key];
        if (range.min !== DEFAULT_RANGE.min || range.max !== DEFAULT_RANGE.max) {
          params.set(key, `${range.min}-${range.max}`);
        }
      }
      return params.toString();
    },
    []
  );

  const parseSearchParams = useCallback(
    (
      sp: URLSearchParams | null
    ): { tag: string | null; axes: AxisFiltersState; useCases: string[] } => {
      const axes = createDefaultAxisFilters();
      if (sp) {
        for (const key of AXIS_KEYS) {
          const raw = sp.get(key);
          const match = raw?.match(/^(\d)-(\d)$/);
          if (match) {
            const min = Math.min(6, Math.max(1, Number(match[1])));
            const max = Math.min(6, Math.max(1, Number(match[2])));
            axes[key] = { min: Math.min(min, max), max: Math.max(min, max) };
          }
        }
      }
      const tag = sp?.get('tag') ?? null;
      // Drop ids we don't know about so stale/deep-linked URLs can't create
      // an unfilterable state.
      const useCases = (sp?.get('use')?.split(',').filter(Boolean) ?? []).filter(
        (id) => USE_CASE_LABELS[id]
      );
      return { tag, axes, useCases };
    },
    []
  );

  // URL → state. Skips our own pushed URLs (any landing that matches a
  // queued push is consumed and ignored; back/forward and deep links apply).
  useEffect(() => {
    const parsed = parseSearchParams(searchParams);
    const parsedKey = serializeState(parsed.tag, parsed.axes, parsed.useCases);

    const idx = pushedRef.current.indexOf(parsedKey);
    if (idx !== -1) {
      pushedRef.current.splice(idx, 1);
      return;
    }

    const currentKey = serializeState(
      stateRef.current.tag,
      stateRef.current.axes,
      stateRef.current.useCases
    );
    if (parsedKey !== currentKey) {
      setActiveTag(parsed.tag);
      setActiveUseCases(parsed.useCases);
      setAxisFilters(parsed.axes);
    }
  }, [searchParams, parseSearchParams, serializeState]);

  // State → filtered results. Single place where filtering happens.
  useEffect(() => {
    applyFilters(activeTag, axisFilters, activeUseCases);
  }, [activeTag, axisFilters, activeUseCases, applyFilters]);

  const commitUrl = useCallback(
    (tag: string | null, axes: AxisFiltersState, useCases: string[]) => {
      const qs = serializeState(tag, axes, useCases);
      pushedRef.current.push(qs);
      // Cap the queue: superseded pushes can linger if a navigation is
      // cancelled, and stale entries only ever cause a harmless no-op.
      if (pushedRef.current.length > 20) {
        pushedRef.current.shift();
      }
      router.replace(qs ? `/?${qs}` : '/', { scroll: false });
    },
    [router, serializeState]
  );

  // External commands from the gallery empty state (Reset / quick-pick).
  useEffect(() => {
    if (!command) {
      return;
    }
    const defaultAxes = createDefaultAxisFilters();
    if (command.action === 'reset') {
      setActiveTag(null);
      setActiveUseCases([]);
      setAxisFilters(defaultAxes);
      commitUrl(null, defaultAxes, []);
    } else if (command.action === 'quickpick' && command.useCaseId) {
      setActiveTag(null);
      setActiveUseCases([command.useCaseId]);
      setAxisFilters(defaultAxes);
      commitUrl(null, defaultAxes, [command.useCaseId]);
    }
  }, [command, commitUrl]);

  const handleTagClick = (tag: string | null) => {
    setActiveTag(tag);
    commitUrl(tag, axisFilters, activeUseCases);
  };

  const handleUseCaseClick = (id: string) => {
    const updated = activeUseCases.includes(id)
      ? activeUseCases.filter((uc) => uc !== id)
      : [...activeUseCases, id];
    setActiveUseCases(updated);
    commitUrl(activeTag, axisFilters, updated);
  };

  const handleAxisChange = (axis: keyof StyleAxis, bound: 'min' | 'max', value: number) => {
    const updated = {
      ...axisFilters,
      [axis]: {
        ...axisFilters[axis],
        [bound]: value,
      },
    };
    setAxisFilters(updated);
    commitUrl(activeTag, updated, activeUseCases);
  };

  const handleResetAxes = () => {
    const newState = createDefaultAxisFilters();
    setAxisFilters(newState);
    commitUrl(activeTag, newState, activeUseCases);
  };

  const hasActiveAxisFilter = AXIS_KEYS.some(
    (key) =>
      axisFilters[key].min !== DEFAULT_RANGE.min ||
      axisFilters[key].max !== DEFAULT_RANGE.max
  );

  // Mobile (<640px): use-case row collapses behind a disclosure.
  const useCaseRowOpen = showUseCaseRow || activeUseCases.length > 0;

  // Arrow keys move focus within a pill row (Enter/Space toggle natively).
  const handlePillRowKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') {
      return;
    }
    const pills = Array.from(
      e.currentTarget.querySelectorAll<HTMLButtonElement>('button[data-pill]')
    );
    if (pills.length === 0) {
      return;
    }
    const currentIndex = pills.indexOf(document.activeElement as HTMLButtonElement);
    if (currentIndex === -1) {
      return;
    }
    e.preventDefault();
    const delta = e.key === 'ArrowRight' ? 1 : -1;
    pills[(currentIndex + delta + pills.length) % pills.length].focus();
  };

  // Count currently visible styles (tag + use-case + axis filters)
  const filteredCount = useMemo(() => {
    return styles.filter((style) => {
      if (activeTag && !style.tags.includes(activeTag)) {
        return false;
      }
      if (
        activeUseCases.length > 0 &&
        !activeUseCases.some((id) => style.useCases.includes(id))
      ) {
        return false;
      }
      for (const key of AXIS_KEYS) {
        const range = axisFilters[key];
        const value = style.axis[key];
        if (value < range.min || value > range.max) {
          return false;
        }
      }
      return true;
    }).length;
  }, [styles, activeTag, activeUseCases, axisFilters]);

  return (
    <div className="space-y-6">
      {/* Style count — single source of truth for result counts */}
      <p className="font-mono-label text-text-muted tracking-widest">
        {filteredCount} {filteredCount === 1 ? 'STYLE' : 'STYLES'}
      </p>

      {/* Cluster Pills */}
      <div className="space-y-2">
        <span className="block font-mono-label text-xs text-text-muted tracking-widest uppercase">
          Browse by style
        </span>
        <div
          data-pill-row
          onKeyDown={handlePillRowKeyDown}
          className="flex flex-wrap items-center justify-start gap-2"
        >
          <button
            data-pill
            onClick={() => handleTagClick(null)}
            aria-pressed={activeTag === null}
            className={`min-h-11 sm:min-h-0 px-3 py-1.5 rounded-full text-xs transition-colors ${
              activeTag === null
                ? 'bg-accent text-accent-text'
                : 'bg-ground-elevated border border-border text-text-secondary hover:text-text-primary hover:border-border-hover'
            }`}
          >
            All
            <span className={`ml-1 ${activeTag === null ? '' : 'opacity-80'}`}>
              {styles.length}
            </span>
          </button>
          {STYLE_CLUSTERS.map((cluster) => (
            <button
              key={cluster.id}
              data-pill
              onClick={() => handleTagClick(cluster.name)}
              aria-pressed={activeTag === cluster.name}
              className={`min-h-11 sm:min-h-0 px-3 py-1.5 rounded-full text-xs transition-colors ${
                activeTag === cluster.name
                  ? 'bg-accent text-accent-text'
                  : 'bg-ground-elevated border border-border text-text-secondary hover:text-text-primary hover:border-border-hover'
              }`}
            >
              {cluster.name}
              <span
                className={`ml-1 ${
                  activeTag === cluster.name ? '' : 'opacity-80'
                }`}
              >
                {clusterCounts[cluster.name]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Use-case pills: multi-select OR-union */}
      <div className="space-y-2">
        <div className="flex items-center justify-start">
          <span className="hidden md:block font-mono-label text-xs text-text-muted tracking-widest uppercase">
            Browse by use case
          </span>
          <button
            type="button"
            onClick={() => setShowUseCaseRow(!showUseCaseRow)}
            aria-expanded={useCaseRowOpen}
            aria-controls="use-case-pills"
            className="md:hidden min-h-11 flex items-center gap-2 px-4 rounded-lg text-xs font-medium bg-ground-elevated border border-border text-text-secondary hover:text-text-primary transition-colors"
          >
            Browse by use case
            <svg
              className={`w-3.5 h-3.5 transition-transform ${
                useCaseRowOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
            {activeUseCases.length > 0 && <span className="w-2 h-2 rounded-full bg-accent" />}
          </button>
        </div>
        <p
          className={`text-xs text-text-muted ${
            useCaseRowOpen ? '' : 'hidden md:block'
          }`}
        >
          Select all that apply
        </p>
        <div
          id="use-case-pills"
          data-pill-row
          onKeyDown={handlePillRowKeyDown}
          className={`flex flex-wrap items-center justify-start gap-2 ${
            useCaseRowOpen ? '' : 'hidden md:flex'
          }`}
        >
          {USE_CASES.map((uc) => {
            const isSelected = activeUseCases.includes(uc.id);
            return (
              <button
                key={uc.id}
                data-pill
                onClick={() => handleUseCaseClick(uc.id)}
                aria-pressed={isSelected}
                title={uc.description}
                className={`min-h-11 sm:min-h-0 px-3 py-1.5 rounded-full text-xs transition-colors ${
                  isSelected
                    ? 'bg-accent text-accent-text'
                    : 'bg-ground-elevated border border-border text-text-secondary hover:text-text-primary hover:border-border-hover'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`mr-1.5 inline-flex items-center justify-center w-3.5 h-3.5 rounded-[3px] border ${
                    isSelected
                      ? 'border-current'
                      : 'border-text-muted'
                  }`}
                >
                  {isSelected && (
                    <svg
                      className="w-2.5 h-2.5"
                      viewBox="0 0 10 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        d="M2 5.5l2 2 4-4.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                {uc.label}
                <span className={`ml-1 ${isSelected ? '' : 'opacity-80'}`}>
                  {useCaseCounts[uc.id]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Axis Filter Toggle */}
      <div className="flex items-center justify-start gap-4">
        <button
          onClick={() => setShowAxisFilters(!showAxisFilters)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
            showAxisFilters || hasActiveAxisFilter
              ? 'bg-ground-elevated border border-accent/30 text-accent'
              : 'bg-ground-elevated border border-border text-text-secondary hover:text-text-primary hover:border-border-hover'
          }`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
          6-Axis Filter
          {hasActiveAxisFilter && (
            <span className="w-2 h-2 rounded-full bg-accent" />
          )}
        </button>
        <button
          onClick={handleResetAxes}
          disabled={!hasActiveAxisFilter}
          aria-hidden={!hasActiveAxisFilter}
          tabIndex={hasActiveAxisFilter ? 0 : -1}
          className={`text-sm transition-colors ${
            hasActiveAxisFilter
              ? 'text-text-muted hover:text-text-secondary'
              : 'invisible'
          }`}
        >
          Reset axes
        </button>
      </div>

      {/* Axis Sliders */}
      {showAxisFilters && (
        <div className="bg-ground-elevated border border-border rounded-xl p-6 max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AXIS_KEYS.map((key) => {
              const config = AXIS_LABELS[key];
              const range = axisFilters[key];
              return (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-label text-text-muted">
                      {config.label.toUpperCase()}
                    </span>
                    <span className="text-xs text-text-muted">
                      {range.min}–{range.max}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-text-muted w-16 text-right">
                      {config.low}
                    </span>
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="range"
                        min={1}
                        max={6}
                        value={range.min}
                        onChange={(e) =>
                          handleAxisChange(
                            key,
                            'min',
                            Math.min(Number(e.target.value), range.max)
                          )
                        }
                        className="flex-1 accent-accent h-1 bg-border rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent"
                        aria-label={`${config.label} minimum`}
                      />
                      <input
                        type="range"
                        min={1}
                        max={6}
                        value={range.max}
                        onChange={(e) =>
                          handleAxisChange(
                            key,
                            'max',
                            Math.max(Number(e.target.value), range.min)
                          )
                        }
                        className="flex-1 accent-accent h-1 bg-border rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent"
                        aria-label={`${config.label} maximum`}
                      />
                    </div>
                    <span className="text-xs text-text-muted w-16">
                      {config.high}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}