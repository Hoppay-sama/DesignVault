import type { JSX } from 'react';
import type { StyleEntry } from '../../lib/types';
import { LAYOUT_VARIANTS } from './layouts/index.ts';

/**
 * Forces every descendant of the mockup to fully static styling so the framed
 * page never animates, even when the layout variant renders an animated motif
 * (marquee/ticker/orbit). Stylesheet `!important` beats the layouts' inline
 * `animation` styles; scoping to the root testid keeps the rest of the page
 * untouched. No keyframes are injected here — the layout keyframes stay inert.
 */
const STATIC_OVERRIDE = `
[data-testid="mini-page-mockup"] * {
  animation: none !important;
}`;

/**
 * Framed browser-window mockup of the StylePreview layout for a style's detail
 * page: a chrome top bar (traffic-light dots in the preview's surface/ink, URL
 * pill `/styles/<slug>`) over the layout variant rendered as static page
 * content. ALWAYS static — no hover cues, no keyframes. Returns null when
 * `style.preview` is undefined (the page hides the section in that case).
 */
export function MiniPageMockup({ style }: { style: StyleEntry }): JSX.Element | null {
  const { preview } = style;
  if (!preview) return null;

  const Layout = LAYOUT_VARIANTS[preview.layout];
  const ink = preview.ink ?? 'var(--color-text-primary)';
  const surface = preview.surface ?? 'var(--color-ground-elevated)';
  const inkMuted = `color-mix(in srgb, ${ink} 10%, transparent)`;

  return (
    <div
      data-testid="mini-page-mockup"
      aria-hidden="true"
      className="w-full overflow-hidden rounded-lg border shadow-xl"
      style={{ borderColor: inkMuted }}
    >
      <style>{STATIC_OVERRIDE}</style>
      <div
        className="relative flex items-center border-b px-4 py-3"
        style={{ backgroundColor: surface, borderColor: inkMuted }}
      >
        <div className="absolute left-4 flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: ink, opacity: 0.9 }}
          />
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: ink, opacity: 0.55 }}
          />
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: ink, opacity: 0.9 }}
          />
        </div>
        <div className="flex w-full justify-center">
          <div
            className="rounded-full px-3 py-1 text-[10px] tracking-wide"
            style={{
              backgroundColor: inkMuted,
              color: ink,
              fontFamily: 'var(--font-mono)',
              opacity: 0.85,
            }}
          >
            /styles/{style.slug}
          </div>
        </div>
      </div>
      <div className="relative w-full overflow-hidden">
        <Layout preview={preview} title={style.title} />
      </div>
    </div>
  );
}
