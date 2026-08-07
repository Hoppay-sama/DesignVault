import type { JSX } from 'react';
import type { LayoutProps } from './index';
import { getFontClasses } from '../fonts';
import { TextureOverlay } from '../textures';
import { Motif } from '../motifs';

const TILE_COUNT = 6;

export default function GridLayout({
  preview,
  title,
}: LayoutProps): JSX.Element {
  const { display, body } = getFontClasses(preview);
  const ink = preview.ink ?? 'var(--color-text-primary)';
  const surface = preview.surface ?? 'var(--color-ground-elevated)';
  const accent = preview.accent ?? 'var(--color-accent)';

  return (
    <div
      className={`relative aspect-[3/2] w-full overflow-hidden ${body}`}
      style={{ background: preview.background ?? 'var(--color-ground)' }}
    >
      <TextureOverlay texture={preview.texture} />
      <div className="flex h-full flex-col px-4 py-3">
        <div className="flex items-baseline justify-between pb-2">
          <span
            className={`${display} text-[10px] uppercase tracking-widest`}
            style={{ color: ink, opacity: 0.75 }}
          >
            {title}
          </span>
          <span
            className="text-[10px] uppercase tracking-widest"
            style={{ color: ink, opacity: 0.4 }}
          >
            Index
          </span>
        </div>
        <div className="grid flex-1 grid-cols-3 gap-1.5">
          {Array.from({ length: TILE_COUNT }, (_, i) => i).map((i) => (
            <div
              key={i}
              className="relative overflow-hidden"
              style={{ backgroundColor: i === 2 ? accent : surface }}
            >
              <span
                className="absolute bottom-1 left-1.5 text-[10px] uppercase tracking-widest"
                style={{
                  color: i === 2 ? 'var(--color-ground)' : ink,
                  opacity: i === 2 ? 1 : 0.55,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-2 right-2">
        <Motif motif={preview.motif} accent={accent} />
      </div>
    </div>
  );
}
