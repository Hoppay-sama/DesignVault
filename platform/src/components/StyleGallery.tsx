'use client';

import { useState, useCallback, useMemo } from 'react';
import { StyleEntry } from '@/lib/types';
import { STYLE_CLUSTERS } from '@/lib/clusters';
import { USE_CASE_LABELS } from '@/lib/use-cases';
import { StyleFilters, FilterCommand } from './StyleFilters';
import { StyleCard } from './StyleGrid';

interface StyleGalleryProps {
  styles: StyleEntry[];
}

// Quick-pick suggestion shown in the empty state: the most popular use case.
const QUICK_PICK_USE_CASE = 'portfolio';

export function StyleGallery({ styles }: StyleGalleryProps) {
  const [filteredStyles, setFilteredStyles] = useState<StyleEntry[]>(styles);
  const [command, setCommand] = useState<FilterCommand | null>(null);

  const handleFilteredStyles = useCallback((filtered: StyleEntry[]) => {
    setFilteredStyles(filtered);
  }, []);

  const handleReset = useCallback(() => {
    setCommand({ signal: Date.now(), action: 'reset' });
  }, []);

  const handleQuickPick = useCallback(() => {
    setCommand({ signal: Date.now(), action: 'quickpick', useCaseId: QUICK_PICK_USE_CASE });
  }, []);

  // Group the (already filtered) styles into cluster sections, A→H order.
  // Empty clusters are skipped. When a tag filter is active, filteredStyles
  // only contains that cluster's styles, so a single section renders.
  const grouped = useMemo(
    () =>
      STYLE_CLUSTERS.map((cluster) => ({
        cluster,
        styles: filteredStyles.filter((style) => style.tags.includes(cluster.name)),
      })).filter((group) => group.styles.length > 0),
    [filteredStyles]
  );

  return (
    <>
      {/* Filter Section */}
      <section id="gallery" className="px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl leading-tight tracking-tight mb-6">
            Browse the library
          </h2>
          <StyleFilters
            styles={styles}
            onFilteredStyles={handleFilteredStyles}
            command={command}
          />
        </div>
      </section>

      {/* Style Grid */}
      <section className="px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {filteredStyles.length > 0 ? (
            <div className="space-y-16">
              {grouped.map(({ cluster, styles }) => (
                <section key={cluster.id} aria-labelledby={`cluster-${cluster.id}`}>
                  <header className="mb-6">
                    <h2
                      id={`cluster-${cluster.id}`}
                      className="font-display text-2xl md:text-3xl leading-tight tracking-tight"
                    >
                      {cluster.name}
                    </h2>
                    <p className="text-sm text-text-muted mt-1 max-w-2xl">
                      {cluster.sharedDna}
                    </p>
                  </header>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {styles.map((style) => (
                      <StyleCard key={style.slug} style={style} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-text-secondary text-lg mb-2">
                No styles match your filters
              </p>
              <p className="text-text-muted text-sm mb-6">
                Try clearing a filter or picking a popular use case
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-accent text-accent-text px-5 py-2.5 rounded-lg text-sm font-medium hover:scale-105 transition-transform"
                >
                  Reset all filters
                </button>
                <button
                  type="button"
                  onClick={handleQuickPick}
                  className="border border-border hover:border-border-hover px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
                >
                  Browse {USE_CASE_LABELS[QUICK_PICK_USE_CASE].label.toLowerCase()} styles
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
