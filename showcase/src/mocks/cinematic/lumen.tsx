import { useEffect, useRef, type RefObject } from "react";
import "./lumen.css";

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

export function LumenMock() {
  const ref = useRef<HTMLElement>(null);
  useProgress(ref);

  return (
    <main className="mock-lumen" ref={ref}>
      <div className="mock-lumen-stage">
        <div className="mock-lumen-room" aria-hidden="true" />

        <svg className="mock-lumen-clock" viewBox="0 0 400 400" aria-hidden="true">
          <g className="mock-lumen-part mock-lumen-case">
            <circle cx="200" cy="200" r="176" fill="#f6edd8" stroke="#a9865a" strokeWidth="2" />
          </g>
          <g className="mock-lumen-part mock-lumen-bezel">
            <circle cx="200" cy="200" r="150" fill="none" stroke="#c6a061" strokeWidth="10" />
          </g>
          <g className="mock-lumen-part mock-lumen-dial">
            <circle cx="200" cy="200" r="118" fill="#fbf6ea" stroke="#cbb389" strokeWidth="1" />
          </g>
          <g className="mock-lumen-part mock-lumen-needle">
            <line
              x1="200"
              y1="204"
              x2="200"
              y2="92"
              stroke="#7d2f26"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
          <g className="mock-lumen-part mock-lumen-cam">
            <circle cx="236" cy="250" r="26" fill="#d9c08c" stroke="#9c7a45" strokeWidth="2" />
          </g>
        </svg>

        <span className="mock-lumen-label mock-lumen-l1">01 / case</span>
        <span className="mock-lumen-label mock-lumen-l2">02 / bezel</span>
        <span className="mock-lumen-label mock-lumen-l3">03 / dial</span>
        <span className="mock-lumen-label mock-lumen-l4">04 / needle</span>
        <span className="mock-lumen-label mock-lumen-l5">05 / tide cam</span>

        <div className="mock-lumen-panel">
          <p className="mock-lumen-kicker">Aven &amp; Mare / tidal instruments</p>
          <p className="mock-lumen-copy">Fifty-one parts. All answerable to the tide.</p>
          <p className="mock-lumen-sub">Lumen Mk. III · exploded view</p>
        </div>
      </div>
    </main>
  );
}
