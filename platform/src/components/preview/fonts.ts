import type { StylePreview } from '../../lib/types';

export interface FontPair { display: string; body: string }

/** Stable family key -> next/font CSS-variable classes (registry binds variables in Task 6). */
export const FONT_CATALOG: Record<string, FontPair> = Object.fromEntries(
  ['fraunces', 'playfair-display', 'source-serif-4', 'newsreader', 'inter',
   'space-grotesk', 'jetbrains-mono', 'space-mono', 'archivo', 'oswald'].map((key) => [
    key,
    { display: `font-[family-name:var(--font-${key})]`, body: `font-[family-name:var(--font-${key})]` },
  ])
) as Record<string, FontPair>;

export function getFontClasses(preview: StylePreview | undefined): FontPair {
  const display = preview?.displayFont ? FONT_CATALOG[preview.displayFont]?.display : undefined;
  const body = preview?.bodyFont ? FONT_CATALOG[preview.bodyFont]?.body : undefined;
  return {
    display: display ?? 'font-display',
    body: body ?? 'font-body',
  };
}