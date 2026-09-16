import { useEffect, useRef, type RefObject } from "react";
import "./kovra.css";

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

export function KovraMock() {
  const ref = useRef<HTMLElement>(null);
  useProgress(ref);

  return (
    <main className="mock-kovra" ref={ref}>
      <div className="mock-kovra-stage">
        <svg
          className="mock-kovra-layer mock-kovra-sky"
          viewBox="0 0 1000 700"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="kovra-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0a1c2c" />
              <stop offset="0.5" stopColor="#164a5e" />
              <stop offset="1" stopColor="#2f8b86" />
            </linearGradient>
          </defs>
          <rect width="1000" height="700" fill="url(#kovra-sky)" />
        </svg>

        <svg
          className="mock-kovra-layer mock-kovra-distant"
          viewBox="0 0 1000 700"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <path
            fill="#123747"
            d="M0 322 L128 214 L250 292 L372 182 L508 286 L648 206 L782 300 L902 238 L1000 296 L1000 700 L0 700 Z"
          />
        </svg>

        <svg
          className="mock-kovra-layer mock-kovra-river"
          viewBox="0 0 1000 700"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="mock-kovra-river-line"
            pathLength={1}
            d="M470 -10 C438 120 548 208 494 330 C444 448 612 516 552 710"
          />
        </svg>

        <svg
          className="mock-kovra-layer mock-kovra-mid"
          viewBox="0 0 1000 700"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="#123844"
            d="M0 386 L190 318 L368 362 L470 344 L512 392 L556 344 L680 352 L820 302 L1000 368 L1000 430 L0 430 Z"
          />
        </svg>

        <svg
          className="mock-kovra-layer mock-kovra-fore"
          viewBox="0 0 1000 700"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path fill="#0b2731" d="M0 520 L90 470 L210 505 L340 452 L448 540 L448 700 L0 700 Z" />
          <path fill="#0b2731" d="M560 548 L680 462 L800 508 L920 468 L1000 512 L1000 700 L560 700 Z" />
        </svg>

        <div className="mock-kovra-panel">
          <p className="mock-kovra-kicker">Kovra / the unbroken thread</p>
          <p className="mock-kovra-copy">Nobody owns the first kilometer. The ice keeps it.</p>
          <p className="mock-kovra-sub">Glacier to delta · km 000–412</p>
        </div>
      </div>
    </main>
  );
}
