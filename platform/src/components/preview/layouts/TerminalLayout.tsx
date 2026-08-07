import type { JSX } from 'react';
import type { LayoutProps } from './index';
import { getFontClasses } from '../fonts';
import { TextureOverlay } from '../textures';
import { Motif } from '../motifs';

const BLINK_KEYFRAMES = `
@keyframes preview-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}`;

export default function TerminalLayout({
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
      <style>{BLINK_KEYFRAMES}</style>
      <TextureOverlay texture={preview.texture} />
      <div className="flex h-full flex-col justify-between px-5 pb-8 pt-5">
        <div>
          <p className="text-[10px]" style={{ color: ink, opacity: 0.6 }}>
            $ designvault --style
          </p>
          <p className="mt-1 text-[13px] font-semibold" style={{ color: ink }}>
            <span style={{ opacity: 0.6 }}>$ </span>
            <span className={display}>{title}</span>
            <span
              className="ml-1 inline-block h-[0.85em] w-[0.45em] align-baseline"
              style={{
                backgroundColor: accent,
                animation: 'preview-blink 1.1s steps(1, end) infinite',
              }}
            />
          </p>
        </div>
      </div>
      <div
        className="absolute inset-x-0 bottom-0 flex h-6 items-center gap-1.5 px-4"
        style={{ backgroundColor: surface }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: accent }}
        />
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: ink, opacity: 0.5 }}
        />
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: ink, opacity: 0.25 }}
        />
      </div>
      <div className="absolute bottom-7 right-2">
        <Motif motif={preview.motif} accent={accent} />
      </div>
    </div>
  );
}
