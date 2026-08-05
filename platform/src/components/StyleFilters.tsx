'use client';

import { useState, useCallback, useMemo } from 'react';
import { StyleEntry, StyleAxis } from '@/lib/types';

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
const VISIBLE_TAG_COUNT = 6;

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
}

export function StyleFilters({ styles, onFilteredStyles }: StyleFiltersProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [axisFilters, setAxisFilters] = useState<AxisFiltersState>(createDefaultAxisFilters);
  const [showAxisFilters, setShowAxisFilters] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);

  // Compute tags sorted by frequency from the styles data
  const { topTags, allTagsByFrequency, tagCounts } = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const style of styles) {
      for (const tag of style.tags) {
        counts[tag] = (counts[tag] || 0) + 1;
      }
    }

    const sorted = Object.entries(counts)
      .sort(([, a], [, b]) => b - a);

    return {
      topTags: sorted.slice(0, VISIBLE_TAG_COUNT).map(([tag]) => tag),
      allTagsByFrequency: sorted.map(([tag]) => tag),
      tagCounts: counts,
    };
  }, [styles]);

  const visibleTags = showAllTags ? allTagsByFrequency : topTags;
  const hasMoreTags = allTagsByFrequency.length > VISIBLE_TAG_COUNT;

  const applyFilters = useCallback(
    (tag: string | null, axes: AxisFiltersState) => {
      const filtered = styles.filter((style) => {
        // Tag filter
        if (tag && !style.tags.includes(tag)) {
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

  const handleTagClick = (tag: string | null) => {
    setActiveTag(tag);
    applyFilters(tag, axisFilters);
  };

  const handleAxisChange = (axis: keyof StyleAxis, bound: 'min' | 'max', value: number) => {
    setAxisFilters((prev) => {
      const updated = {
        ...prev,
        [axis]: {
          ...prev[axis],
          [bound]: value,
        },
      };
      applyFilters(activeTag, updated);
      return updated;
    });
  };

  const handleResetAxes = () => {
    const newState = createDefaultAxisFilters();
    setAxisFilters(newState);
    applyFilters(activeTag, newState);
  };

  const hasActiveAxisFilter = AXIS_KEYS.some(
    (key) =>
      axisFilters[key].min !== DEFAULT_RANGE.min ||
      axisFilters[key].max !== DEFAULT_RANGE.max
  );

  // Count currently visible styles (tag + axis filters)
  const filteredCount = useMemo(() => {
    return styles.filter((style) => {
      if (activeTag && !style.tags.includes(activeTag)) {
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
  }, [styles, activeTag, axisFilters]);

  return (
    <div className="space-y-6">
      {/* Style count */}
      <p className="text-center font-mono-label text-text-muted tracking-widest">
        {filteredCount} {filteredCount === 1 ? 'STYLE' : 'STYLES'}
      </p>

      {/* Tag Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => handleTagClick(null)}
          className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
            activeTag === null
              ? 'bg-accent text-accent-text'
              : 'bg-ground-elevated border border-border text-text-secondary hover:text-text-primary hover:border-border-hover'
          }`}
        >
          All
        </button>
        {visibleTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
              activeTag === tag
                ? 'bg-accent text-accent-text'
                : 'bg-ground-elevated border border-border text-text-secondary hover:text-text-primary hover:border-border-hover'
            }`}
          >
            {tag}
            <span className="ml-1 opacity-50">{tagCounts[tag]}</span>
          </button>
        ))}
        {hasMoreTags && (
          <button
            onClick={() => setShowAllTags(!showAllTags)}
            className="px-3 py-1.5 rounded-full text-xs text-text-muted hover:text-text-secondary transition-colors"
          >
            {showAllTags ? 'Show less' : `+${allTagsByFrequency.length - VISIBLE_TAG_COUNT} more`}
          </button>
        )}
      </div>

      {/* Axis Filter Toggle */}
      <div className="flex items-center justify-center gap-4">
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
        {hasActiveAxisFilter && (
          <button
            onClick={handleResetAxes}
            className="text-sm text-text-muted hover:text-text-secondary transition-colors"
          >
            Reset axes
          </button>
        )}
      </div>

      {/* Axis Sliders */}
      {showAxisFilters && (
        <div className="bg-ground-elevated border border-border rounded-xl p-6 max-w-3xl mx-auto">
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
