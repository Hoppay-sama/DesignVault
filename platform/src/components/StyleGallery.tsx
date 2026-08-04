'use client';

import { useState, useCallback } from 'react';
import { StyleEntry } from '@/lib/types';
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStyles.map((style) => (
                <StyleCard key={style.slug} style={style} />
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
