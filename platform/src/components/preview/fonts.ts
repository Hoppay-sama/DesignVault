import type { StylePreview } from '../../lib/types';

export interface FontPair { display: string; body: string }

/**
 * Complete literal class names, never built via template strings. Tailwind
 * v4 emits an arbitrary-value utility only when the exact literal appears in
 * a scanned source file, so this safelist is what keeps the compiled CSS in
 * sync with the catalog. Keys mirror the --font-<key> variables bound by
 * font-registry.tsx.
 */
export const FONT_CLASSES = {
  fraunces: 'font-[family-name:var(--font-fraunces)]',
  archivo: 'font-[family-name:var(--font-archivo)]',
  'playfair-display': 'font-[family-name:var(--font-playfair-display)]',
  'space-grotesk': 'font-[family-name:var(--font-space-grotesk)]',
  inter: 'font-[family-name:var(--font-inter)]',
  newsreader: 'font-[family-name:var(--font-newsreader)]',
  oswald: 'font-[family-name:var(--font-oswald)]',
  'jetbrains-mono': 'font-[family-name:var(--font-jetbrains-mono)]',
  'source-serif-4': 'font-[family-name:var(--font-source-serif-4)]',
  'space-mono': 'font-[family-name:var(--font-space-mono)]',
} as const;

type FontKey = keyof typeof FONT_CLASSES;

/** Stable family key -> next/font CSS-variable classes (registry binds variables in Task 6). */
export const FONT_CATALOG: Record<string, FontPair> = Object.fromEntries(
  (Object.keys(FONT_CLASSES) as FontKey[]).map((key) => [
    key,
    { display: FONT_CLASSES[key], body: FONT_CLASSES[key] },
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