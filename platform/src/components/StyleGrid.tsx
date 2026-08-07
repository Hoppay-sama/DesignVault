'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { StyleEntry } from '@/lib/types';
import { USE_CASE_LABELS } from '@/lib/use-cases';

interface StyleGridProps {
  initialStyles: StyleEntry[];
}

export function StyleGrid({ initialStyles }: StyleGridProps) {
  const [filteredStyles, setFilteredStyles] = useState<StyleEntry[]>(initialStyles);

  const handleFilteredStyles = useCallback((filtered: StyleEntry[]) => {
    setFilteredStyles(filtered);
  }, []);

  // This component is used by the parent page which passes the filter component
  // The actual filtering is handled by StyleFilters calling onFilteredStyles
  return { filteredStyles, setFilteredStyles: handleFilteredStyles };
}

interface StyleCardProps {
  style: StyleEntry;
}

export function StyleCard({ style }: StyleCardProps) {
  return (
    <Link
      href={`/style/${style.slug}`}
      className="bg-ground-elevated border border-border rounded-xl overflow-hidden hover:border-border-hover transition-colors group"
    >
      <div className="h-48 bg-gradient-to-br from-ground to-ground-elevated relative">
        <div className="absolute bottom-3 left-3 font-mono-label text-text-muted">
          {style.title.toUpperCase()}
        </div>
        <div className="absolute top-3 right-3 flex gap-1">
          {style.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="bg-ground/80 border border-border px-2 py-1 rounded text-xs text-text-muted backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg mb-2 group-hover:text-accent transition-colors">
          {style.title}
        </h3>
        {/* Use-case badges — decorative; the card title/link carries the accessible name */}
        {style.useCases.length > 0 && (
          <div aria-hidden="true" className="flex flex-wrap gap-1.5 mb-3">
            {style.useCases.slice(0, 2).map((id) => (
              <span
                key={id}
                className="bg-ground border border-border px-2 py-0.5 rounded text-[10px] uppercase tracking-wider text-text-muted"
              >
                {USE_CASE_LABELS[id]?.label ?? id}
              </span>
            ))}
            {style.useCases.length > 2 && (
              <span className="bg-ground border border-border px-2 py-0.5 rounded text-[10px] uppercase tracking-wider text-text-muted">
                +{style.useCases.length - 2}
              </span>
            )}
          </div>
        )}
        <p className="text-sm text-text-secondary line-clamp-2 mb-4">
          {style.oneLineEssence}
        </p>
        <div className="flex items-center justify-end gap-1 text-text-muted">
          <span className="text-xs">Difficulty</span>
          <span className="text-accent">{'★'.repeat(style.difficulty)}</span>
        </div>
      </div>
    </Link>
  );
}
