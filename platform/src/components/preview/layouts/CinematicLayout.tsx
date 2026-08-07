import type { JSX } from 'react';
import type { LayoutProps } from './index';
import { getFontClasses } from '../fonts';
import { TextureOverlay } from '../textures';
import { Motif } from '../motifs';

const GLOW_GRADIENT =
  'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)';

export default function CinematicLayout({
  preview,
  title,
}: LayoutProps): JSX.Element {
  const { display } = getFontClasses(preview);
  const ink = preview.ink ?? 'var(--color-text-primary)';
  const accent = preview.accent ?? 'var(--color-accent)';

  return (
    <div
      className={`relative aspect-[3/2] w-full overflow-hidden ${display}`}
      style={{ background: preview.background ?? 'var(--color-ground)' }}
    >
      <TextureOverlay texture="grain" />
      <div
        className="absolute inset-x-0 top-0 h-[12%]"
        style={{ backgroundColor: ink, opacity: 0.8 }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[12%]"
        style={{ backgroundColor: ink, opacity: 0.8 }}
      />
      <div className="flex h-full flex-col items-center justify-center px-8">
        <h1
          className="text-center uppercase tracking-[0.18em]"
          style={{
            fontSize: 'clamp(1.25rem, 6vw, 3rem)',
            lineHeight: 1.15,
            color: ink,
          }}
        >
          {title}
        </h1>
        <div className="relative mt-5 h-[3px] w-3/5">
          <div
            className="absolute inset-0"
            style={{ background: GLOW_GRADIENT }}
          />
          <div
            className="absolute inset-x-[15%] top-1/2 h-[2px] -translate-y-1/2"
            style={{ backgroundColor: accent }}
          />
        </div>
      </div>
      <div className="absolute bottom-2 right-2">
        <Motif motif={preview.motif} accent={accent} />
      </div>
    </div>
  );
}
