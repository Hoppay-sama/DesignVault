'use client';

import type { JSX } from 'react';
import type { StyleEntry } from '../../lib/types';
import { LAYOUT_VARIANTS } from './layouts';
import { TextureOverlay } from './textures';

/**
 * Keyframes for the marquee/ticker hover cue. Injected on demand so the
 * animation name resolves wherever the cue renders (mirrors motifs.tsx).
 */
const CUE_KEYFRAMES = `
@keyframes preview-cue-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}`;

/**
 * Hover cue for marquee/ticker-motif styles (motion axis >= 3): a small
 * slide strip that speeds up via group-hover on the specimen wrapper.
 */
function MarqueeCue({ accent }: { accent: string }): JSX.Element {
  const text = 'DESIGNVAULT \u2726 ';
  return (
    <>
      <style>{CUE_KEYFRAMES}</style>
      <div
        data-testid="preview-cue"
        className="pointer-events-none absolute bottom-2 right-2 w-36 overflow-hidden text-[9px] uppercase tracking-[0.25em] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ color: accent }}
      >
        <div className="flex w-max whitespace-nowrap [animation:preview-cue-marquee_7s_linear_infinite] group-hover:[animation-duration:1.4s]">
          <span>{text.repeat(4)}</span>
          <span>{text.repeat(4)}</span>
        </div>
      </div>
    </>
  );
}

/** Hover cue for grain-textured motion-heavy styles: a pulsing grain wash. */
function GrainCue(): JSX.Element {
  return (
    <div
      data-testid="preview-cue"
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-40 group-hover:animate-pulse"
    >
      <TextureOverlay texture="grain" />
    </div>
  );
}

/** Fallback hover cue: an accent block that swaps color/shape on hover. */
function AccentCue(): JSX.Element {
  return (
    <div
      data-testid="preview-cue"
      className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 rounded-sm bg-accent transition-all duration-300 group-hover:rotate-45 group-hover:rounded-full group-hover:bg-text-primary"
    />
  );
}

/**
 * Renders the configured StylePreview layout for a style card, or the exact
 * legacy gradient placeholder when `style.preview` is undefined. Decorated
 * with an aria-hidden wrapper and, for motion-heavy styles, exactly one
 * CSS-only hover cue whose flavor is picked by motif -> texture -> accent.
 */
export function SpecimenPreview({ style }: { style: StyleEntry }): JSX.Element {
  const { preview } = style;
  const motionHeavy = (style.axis.motion ?? 0) >= 3;
  const Layout = preview ? LAYOUT_VARIANTS[preview.layout] : null;

  const hasMarqueeMotif = preview?.motif === 'marquee' || preview?.motif === 'ticker';
  const accent = preview?.accent ?? 'var(--color-accent)';

  return (
    <div
      data-testid="specimen-preview"
      aria-hidden="true"
      className={`relative aspect-[3/2] w-full overflow-hidden${motionHeavy ? ' group' : ''}`}
    >
      {preview && Layout ? (
        <>
          <Layout preview={preview} title={style.title} />
          {motionHeavy && hasMarqueeMotif && <MarqueeCue accent={accent} />}
          {motionHeavy && !hasMarqueeMotif && preview.texture === 'grain' && (
            <GrainCue />
          )}
          {motionHeavy && !hasMarqueeMotif && preview.texture !== 'grain' && (
            <AccentCue />
          )}
        </>
      ) : (
        <div className="h-full w-full bg-gradient-to-br from-ground to-ground-elevated" />
      )}
    </div>
  );
}