import type { JSX } from 'react';
import type { StylePreview } from '../../lib/types';

const GRAIN_URI =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E" +
  "%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' " +
  "stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' " +
  "filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

interface TextureSpec {
  backgroundImage: string;
  opacity: number;
}

const TEXTURES: Record<StylePreview['texture'], TextureSpec | null> = {
  none: null,
  grain: { backgroundImage: GRAIN_URI, opacity: 0.5 },
  paper: {
    backgroundImage:
      'repeating-linear-gradient(0deg, rgba(120,120,120,0.14) 0 1px, transparent 1px 14px),' +
      'repeating-linear-gradient(90deg, rgba(120,120,120,0.14) 0 1px, transparent 1px 14px)',
    opacity: 1,
  },
  'grid-lines': {
    backgroundImage:
      'repeating-linear-gradient(0deg, rgba(120,120,120,0.18) 0 1px, transparent 1px 18px),' +
      'repeating-linear-gradient(90deg, rgba(120,120,120,0.18) 0 1px, transparent 1px 18px)',
    opacity: 1,
  },
  'mono-lines': {
    backgroundImage:
      'repeating-linear-gradient(180deg, rgba(120,120,120,0.18) 0 1px, transparent 1px 24px)',
    opacity: 1,
  },
};

/**
 * Decorative, pointer-transparent texture overlay rendered above each layout.
 * none renders null so the layout stays clean.
 */
export function TextureOverlay({
  texture,
}: {
  texture: StylePreview['texture'];
}): JSX.Element | null {
  const spec = TEXTURES[texture];
  if (!spec) return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{ backgroundImage: spec.backgroundImage, opacity: spec.opacity }}
    />
  );
}