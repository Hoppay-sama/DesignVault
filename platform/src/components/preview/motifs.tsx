import type { JSX } from 'react';
import type { StylePreview } from '../../lib/types';

const KEYFRAMES = `
@keyframes preview-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes preview-spin {
  to { transform: rotate(360deg); }
}`;

function MarqueeMotif({ accent }: { accent: string }): JSX.Element {
  const text = 'DESIGNVAULT \u2726 ';
  return (
    <div
      className="w-[140px] overflow-hidden text-[9px] uppercase tracking-[0.25em]"
      style={{ color: accent, fontFamily: 'var(--font-mono)' }}
    >
      <div
        className="flex w-max whitespace-nowrap"
        style={{ animation: 'preview-marquee 9s linear infinite' }}
      >
        <span>{text.repeat(4)}</span>
        <span>{text.repeat(4)}</span>
      </div>
    </div>
  );
}

function TickerMotif({ accent }: { accent: string }): JSX.Element {
  const text = 'DESIGNVAULT \u2022 ';
  return (
    <div
      className="w-[150px] overflow-hidden border-y py-0.5 text-[8px] uppercase tracking-[0.3em]"
      style={{ borderColor: accent, color: accent, fontFamily: 'var(--font-mono)' }}
    >
      <div
        className="flex w-max whitespace-nowrap"
        style={{ animation: 'preview-marquee 14s linear infinite' }}
      >
        <span>{text.repeat(3)}</span>
        <span>{text.repeat(3)}</span>
      </div>
    </div>
  );
}

function OrbitMotif({ accent }: { accent: string }): JSX.Element {
  return (
    <div
      className="relative h-8 w-8 rounded-full border"
      style={{ borderColor: accent, animation: 'preview-spin 6s linear infinite' }}
    >
      <span
        className="absolute left-1/2 top-0 h-1.5 w-1.5 rounded-full"
        style={{ transform: 'translate(-50%, -50%)', backgroundColor: accent }}
      />
    </div>
  );
}

export function Motif({
  motif,
  accent,
}: {
  motif: StylePreview['motif'];
  accent?: string;
}): JSX.Element | null {
  const color = accent ?? 'var(--color-accent)';
  if (motif === 'none') return null;
  return (
    <>
      <style>{KEYFRAMES}</style>
      {motif === 'marquee' && <MarqueeMotif accent={color} />}
      {motif === 'ticker' && <TickerMotif accent={color} />}
      {motif === 'orbit' && <OrbitMotif accent={color} />}
    </>
  );
}
