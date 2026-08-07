import type { JSX } from 'react';
import type { LayoutProps } from './index';
import { getFontClasses } from '../fonts';
import { TextureOverlay } from '../textures';
import { Motif } from '../motifs';

export default function EditorialLayout({
  preview,
  title,
}: LayoutProps): JSX.Element {
  const { display, body } = getFontClasses(preview);
  const ink = preview.ink ?? 'var(--color-text-primary)';
  const accent = preview.accent ?? 'var(--color-accent)';
  const barStyle = {
    backgroundColor: preview.surface ?? 'var(--color-ground-elevated)',
    opacity: 0.55,
  };

  return (
    <div
      className={`relative aspect-[3/2] w-full overflow-hidden ${display}`}
      style={{ background: preview.background ?? 'var(--color-ground)' }}
    >
      <TextureOverlay texture={preview.texture} />
      <div className="flex h-full flex-col px-6 py-5">
        <div className="text-center">
          <div
            className="mx-auto mb-3 h-px w-10"
            style={{ backgroundColor: accent }}
          />
          <h1
            className="text-center"
            style={{
              fontSize: 'clamp(1.5rem, 8vw, 4rem)',
              lineHeight: 1.05,
              color: ink,
            }}
          >
            {title}
          </h1>
        </div>
        <div className="flex flex-1 items-center justify-center gap-8">
          <div className="h-2 w-3/4 rounded-full" style={barStyle} />
          <div className="h-2 w-1/2 rounded-full" style={barStyle} />
        </div>
        <div
          className="mt-4 border-l-2 pl-3"
          style={{ borderColor: accent }}
        >
          <p
            className={`${body} italic`}
            style={{ color: ink, opacity: 0.8, fontSize: '0.75rem' }}
          >
            &ldquo;{title}&rdquo;
          </p>
        </div>
      </div>
      <div className="absolute bottom-2 right-2">
        <Motif motif={preview.motif} accent={accent} />
      </div>
    </div>
  );
}
