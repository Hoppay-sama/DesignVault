'use client';

import { useState, useCallback } from 'react';
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

const DEFAULT_RANGE: AxisRange = { min: 1, max: 5 };

interface StyleFiltersProps {
  styles: StyleEntry[];
  allTags: string[];
  onFilteredStyles: (filtered: StyleEntry[]) => void;
}

export function StyleFilters({ styles, allTags, onFilteredStyles }: StyleFiltersProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [axisFilters, setAxisFilters] = useState<AxisFiltersState>(() => {
    const initial: Record<string, AxisRange> = {};
    for (const key of AXIS_KEYS) {
      initial[key] = { ...DEFAULT_RANGE };
    }
    return initial as AxisFiltersState;
  });
  const [showAxisFilters, setShowAxisFilters] = useState(false);

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

  const handleTagClick = (tag: string) => {
    const newTag = activeTag === tag ? null : tag;
    setActiveTag(newTag);
    applyFilters(newTag, axisFilters);
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
    const reset: Record<string, AxisRange> = {};
    for (const key of AXIS_KEYS) {
      reset[key] = { ...DEFAULT_RANGE };
    }
    const newState = reset as AxisFiltersState;
    setAxisFilters(newState);
    applyFilters(activeTag, newState);
  };

  const hasActiveAxisFilter = AXIS_KEYS.some(
    (key) =>
      axisFilters[key].min !== DEFAULT_RANGE.min ||
      axisFilters[key].max !== DEFAULT_RANGE.max
  );

  return (
    <div className="space-y-6">
      {/* Tag Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => handleTagClick('')}
          className={`px-4 py-2 rounded-full text-sm transition-colors ${
            activeTag === null
              ? 'bg-ground-elevated border border-border text-text-primary'
              : 'bg-ground-elevated border border-border text-text-secondary hover:text-text-primary hover:border-border-hover'
          }`}
        >
          All Styles ({styles.length})
        </button>
        {allTags.map((tag) => {
          const count = styles.filter((s) => s.tags.includes(tag)).length;
          return (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                activeTag === tag
                  ? 'bg-accent text-accent-text border border-accent'
                  : 'bg-ground-elevated border border-border text-text-secondary hover:text-text-primary hover:border-border-hover'
              }`}
            >
              {tag} ({count})
            </button>
          );
        })}
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
                        max={5}
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
                        max={5}
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
