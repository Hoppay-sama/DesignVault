import { useEffect, useRef, useState } from "react";
import "./duotone.css";

const W = 1200;
const H = 640;

/** Closed topographic band between two sine offsets. */
const band = (y: number, amp: number, freq: number, phase: number, t: number) => {
  const top: string[] = [];
  const bottom: string[] = [];
  for (let x = 0; x <= W; x += 40) {
    const yy = y + Math.sin((x / W) * Math.PI * 2 * freq + phase) * amp;
    top.push(`L${x},${yy.toFixed(1)}`);
    bottom.unshift(`L${x},${(yy + t).toFixed(1)}`);
  }
  return `M0,${y.toFixed(1)} ${top.join(" ")} ${bottom.join(" ")} Z`;
};

const WAVES = [
  band(120, 34, 1.4, 0, 16),
  band(190, 52, 1.1, 0.8, 20),
  band(280, 44, 1.7, 2.1, 22),
  band(370, 60, 0.9, 3.4, 26),
  band(470, 38, 2.1, 4.2, 18),
  band(540, 30, 1.3, 5, 14),
];

/**
 * Mechanic: the proof strip. One procedural wireframe bisected by a draggable
 * hairline; left of it the same paths recompute as an ordered-dither proof.
 */
export function DuotoneMock() {
  const [pct, setPct] = useState(50);
  const stripRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    const move = (event: PointerEvent) => {
      const el = stripRef.current;
      if (!dragging.current || !el) return;
      const box = el.getBoundingClientRect();
      setPct(Math.max(0, Math.min(100, ((event.clientX - box.left) / box.width) * 100)));
    };
    const up = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  const runProof = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPct(100);
      return;
    }
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 700);
      setPct(p * 100);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  return (
    <main className="mock-duotone">
      <header className="mock-duotone-hero">
        <p className="mock-duotone-label">Duotone / Prepress terminal</p>
        <h1>Wireframe to proof</h1>
      </header>

      <section className="mock-duotone-instrument">
        <div className="mock-duotone-strip" ref={stripRef}>
          <svg className="mock-duotone-layer" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
            <g fill="none" stroke="#4b4b4b" strokeWidth="1">
              {WAVES.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </g>
          </svg>

          <svg
            className="mock-duotone-layer mock-duotone-proof"
            viewBox={`0 0 ${W} ${H}`}
            style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
            aria-hidden="true"
          >
            <defs>
              <pattern id="duotone-dots" width="8" height="8" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#e8e8e8" />
              </pattern>
            </defs>
            <g fill="url(#duotone-dots)">
              {WAVES.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </g>
          </svg>

          <div
            className="mock-duotone-handle"
            style={{ left: `${pct}%` }}
            role="slider"
            aria-label="Proof threshold"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pct)}
            tabIndex={0}
            onPointerDown={() => {
              dragging.current = true;
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") setPct((v) => Math.max(0, v - 1));
              if (event.key === "ArrowRight") setPct((v) => Math.min(100, v + 1));
            }}
          />
        </div>

        <div className="mock-duotone-readout">
          <span>THRESHOLD {Math.round(pct)}%</span>
          <span>DOTS {Math.round(pct * 1.8)}K</span>
          <span>GRID 4x4</span>
        </div>

        <div className="mock-duotone-controls">
          <button type="button" onClick={() => setPct(25)}>
            025 / Under-cut
          </button>
          <button type="button" onClick={() => setPct(50)}>
            050 / Press-safe
          </button>
          <button type="button" onClick={() => setPct(75)}>
            075 / Over-burn
          </button>
          <button className="mock-duotone-run" type="button" onClick={runProof}>
            Run a proof
          </button>
        </div>
      </section>
    </main>
  );
}
