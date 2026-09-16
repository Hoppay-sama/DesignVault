import { useEffect, useRef, type RefObject } from "react";
import "./swell.css";

function useProgress(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      return;
    }
    let current = 0;
    let raf = 0;
    const tick = () => {
      const span = el.offsetHeight - window.innerHeight;
      const scrolled = -el.getBoundingClientRect().top;
      const target = span > 0 ? Math.min(1, Math.max(0, scrolled / span)) : 0;
      current += (target - current) * 0.13;
      el.style.setProperty("--p", current.toFixed(4));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ref]);
}

const SLICES = [
  "M0 118 C150 70 320 150 500 96 S820 44 1000 102 L1000 160 L0 160 Z",
  "M0 126 C180 92 300 40 520 104 S840 150 1000 88 L1000 160 L0 160 Z",
  "M0 96 C160 140 340 52 520 110 S860 60 1000 116 L1000 160 L0 160 Z",
  "M0 132 C200 96 340 148 540 92 S860 118 1000 74 L1000 160 L0 160 Z",
  "M0 110 C170 66 360 128 520 78 S840 122 1000 108 L1000 160 L0 160 Z",
];

export function SwellMock() {
  const ref = useRef<HTMLElement>(null);
  useProgress(ref);

  return (
    <main className="mock-swell" ref={ref}>
      <div className="mock-swell-stage">
        <div className="mock-swell-field" aria-hidden="true">
          {SLICES.map((d, i) => (
            <svg
              key={i}
              className="mock-swell-slice"
              viewBox="0 0 1000 160"
              preserveAspectRatio="none"
            >
              <path d={d} vectorEffect="non-scaling-stroke" />
            </svg>
          ))}
        </div>

        <div className="mock-swell-frame" aria-hidden="true">
          <div className="mock-swell-crosshair" />
        </div>

        <div className="mock-swell-panel">
          <p className="mock-swell-kicker">Observation post G / plate swell 41</p>
          <p className="mock-swell-copy">The archive keeps the shape. The water keeps nothing.</p>
          <p className="mock-swell-sub">Lateral shear pass · 45–60%</p>
        </div>
      </div>
    </main>
  );
}
