'use client';

import { useState, useCallback, useMemo } from 'react';
import { StyleEntry } from '@/lib/types';
import { STYLE_CLUSTERS } from '@/lib/clusters';
import { StyleFilters } from './StyleFilters';
import { StyleCard } from './StyleGrid';

interface StyleGalleryProps {
  styles: StyleEntry[];
}

export function StyleGallery({ styles }: StyleGalleryProps) {
  const [filteredStyles, setFilteredStyles] = useState<StyleEntry[]>(styles);

  const handleFilteredStyles = useCallback((filtered: StyleEntry[]) => {
    setFilteredStyles(filtered);
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
      <section className="px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <StyleFilters
            styles={styles}
            onFilteredStyles={handleFilteredStyles}
          />
        </div>
      </section>

      {/* Results Count */}
      {filteredStyles.length !== styles.length && (
        <div className="px-6 lg:px-8 pb-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm text-text-muted text-center">
              Showing {filteredStyles.length} of {styles.length} styles
            </p>
          </div>
        </div>
      )}

      {/* Style Grid */}
      <section id="gallery" className="px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {filteredStyles.length > 0 ? (
            <div className="space-y-16">
              {grouped.map(({ cluster, styles }) => (
                <section key={cluster.id} aria-labelledby={`cluster-${cluster.id}`}>
                  <header className="mb-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <h2
                        id={`cluster-${cluster.id}`}
                        className="font-display text-2xl md:text-3xl leading-tight tracking-tight"
                      >
                        {cluster.name}
                      </h2>
                      <span className="font-mono-label text-xs text-text-muted tracking-widest shrink-0">
                        {styles.length} {styles.length === 1 ? 'STYLE' : 'STYLES'}
                      </span>
                    </div>
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
              <p className="text-text-muted text-sm">
                Try adjusting your axis ranges or clearing tag filters
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
