import type { JSX } from 'react';
import type { LayoutProps } from './index';
import { getFontClasses } from '../fonts';
import { TextureOverlay } from '../textures';
import { Motif } from '../motifs';

export default function AsymmetricLayout({
  preview,
  title,
}: LayoutProps): JSX.Element {
  const { display, body } = getFontClasses(preview);
  const ink = preview.ink ?? 'var(--color-text-primary)';
  const surface = preview.surface ?? 'var(--color-ground-elevated)';
  const accent = preview.accent ?? 'var(--color-accent)';

  return (
    <div
      className={`relative aspect-[3/2] w-full overflow-hidden ${display}`}
      style={{ background: preview.background ?? 'var(--color-ground)' }}
    >
      <TextureOverlay texture={preview.texture} />
      <div className="p-5">
        <div
          className="-rotate-6 overflow-hidden"
          style={{ backgroundColor: surface }}
        >
          <h1
            className="px-3 py-2 font-extrabold uppercase leading-[0.85]"
            style={{
              fontSize: 'clamp(1.75rem, 9vw, 4.5rem)',
              color: ink,
            }}
          >
            {title}
          </h1>
        </div>
        <div
          className="-mt-5 ml-10 w-56 max-w-[70%] rotate-3 border-2 px-3 py-2"
          style={{ backgroundColor: surface, borderColor: accent }}
        >
          <span
            className={`${body} text-[9px] uppercase tracking-widest`}
            style={{ color: ink, opacity: 0.7 }}
          >
            01 / Concept
          </span>
        </div>
        <div
          className="-mt-3 ml-4 w-24 rotate-6"
          style={{ backgroundColor: surface }}
        >
          <span
            className={`${body} block px-2 py-1 text-[9px] uppercase tracking-widest`}
            style={{ color: accent }}
          >
            DV
          </span>
        </div>
      </div>
      <div className="absolute bottom-2 right-2">
        <Motif motif={preview.motif} accent={accent} />
      </div>
    </div>
  );
}
