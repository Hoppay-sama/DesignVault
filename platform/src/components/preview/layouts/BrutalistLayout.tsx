import type { JSX } from 'react';
import type { LayoutProps } from './index';
import { getFontClasses } from '../fonts';
import { TextureOverlay } from '../textures';
import { Motif } from '../motifs';

export default function BrutalistLayout({
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
      <div className="flex h-full flex-col p-5">
        <div className="flex items-start gap-3">
          <div
            className="h-10 w-10 border-2"
            style={{ borderColor: ink, backgroundColor: surface }}
          >
            <div className="m-2 h-2 w-2" style={{ backgroundColor: accent }} />
          </div>
          <div
            className="translate-x-4 -translate-y-2 border-2 px-2 py-1"
            style={{ borderColor: ink }}
          >
            <span
              className={`${body} text-[9px] font-bold uppercase tracking-widest`}
              style={{ color: ink }}
            >
              DesignVault
            </span>
          </div>
        </div>
        <h1
          className="mt-4 font-black uppercase leading-[0.85]"
          style={{ fontSize: 'clamp(1.5rem, 8vw, 5rem)', color: ink }}
        >
          {title}
        </h1>
        <div className="mt-auto flex items-end justify-between">
          <div
            className="-translate-x-2 translate-y-2 border-2 px-3 py-1"
            style={{ borderColor: accent, backgroundColor: surface }}
          >
            <span
              className={`${body} text-[9px] font-bold uppercase tracking-widest`}
              style={{ color: accent }}
            >
              01
            </span>
          </div>
          <div className="h-3 w-2/5 border-2" style={{ borderColor: ink }} />
        </div>
      </div>
      <div className="absolute bottom-2 right-2">
        <Motif motif={preview.motif} accent={accent} />
      </div>
    </div>
  );
}
