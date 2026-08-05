'use client';

import { useEffect, useState } from 'react';

export interface TocItem {
  id: string;
  label: string;
}

/**
 * Sticky on-page navigation for the style entry page (PRD §5.3).
 * Tracks the section currently in view via IntersectionObserver and
 * highlights the matching link. Hidden below the lg breakpoint — the
 * page itself remains fully readable without it.
 */
export function StyleToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      // The header band at the top of the viewport is treated as the
      // "current section" zone; sections leaving it lose active state.
      { rootMargin: '-15% 0px -75% 0px', threshold: 0 }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) {
        observer.observe(el);
      }
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="sticky top-24">
      <p className="font-mono-label text-text-muted mb-3">ON THIS PAGE</p>
      <ul className="space-y-0.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={activeId === item.id ? 'true' : undefined}
              className={`block text-sm py-1.5 border-l-2 pl-3 transition-colors ${
                activeId === item.id
                  ? 'border-accent text-text-primary'
                  : 'border-border text-text-secondary hover:text-text-primary hover:border-border-hover'
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
