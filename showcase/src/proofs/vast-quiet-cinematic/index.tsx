import { useEffect, useRef } from "react";
import "./styles.css";

const STATIONS = [
  {
    id: "Station 01",
    title: "First light",
    at: 0,
    note: "Headland - 400 m",
    log: "The lamp is lit an hour before the weather turns. Nobody is awake to see it. That is the point.",
    credit: "Est. 1911 - Twelve berths",
  },
  {
    id: "Station 02",
    title: "The narrows",
    at: 0.5,
    note: "Keepers' pass - Five fathoms",
    log: "Two hundred metres of black water between headlands. The bell has rung through every one.",
    credit: "Bell 04 - Still swinging",
  },
  {
    id: "Station 03",
    title: "Observatory",
    at: 1,
    note: "Observatory - Elev. 61 m",
    log: "Twelve berths. One telescope. Weather first, guests second.",
    credit: "Winter berths - Open",
  },
] as const;

const DWELL = 0.22;

const RIDGES: Record<"far" | "near", Record<number, string>> = {
  far: {
    1: "M0 428 L120 398 L260 414 L400 368 L560 396 L720 342 L880 372 L1000 348 L1000 600 L0 600 Z",
    2: "M0 408 L160 382 L320 402 L460 342 L540 370 L700 400 L860 356 L1000 386 L1000 600 L0 600 Z",
    3: "M0 440 L180 418 L360 444 L520 384 L680 418 L840 334 L940 352 L1000 328 L1000 600 L0 600 Z",
  },
  near: {
    1: "M0 520 L150 486 L320 506 L470 452 L640 484 L800 440 L1000 470 L1000 600 L0 600 Z",
    2: "M0 498 L180 452 L360 492 L470 540 L530 566 L650 520 L820 470 L1000 506 L1000 600 L0 600 Z",
    3: "M0 540 L200 512 L400 532 L600 486 L760 518 L880 466 L1000 492 L1000 600 L0 600 Z",
  },
};

function Ridge({ variant, scene }: { variant: "far" | "near"; scene: number }) {
  return (
    <svg
      className={`vq-ridge vq-ridge--${variant}`}
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={RIDGES[variant][scene]} />
    </svg>
  );
}

function Observatory() {
  return (
    <div className="vq-observatory" aria-hidden="true">
      <svg viewBox="0 0 120 72">
        <path d="M28 38 Q60 6 92 38 Z" />
        <rect x="32" y="36" width="56" height="32" />
        <rect x="56" y="0" width="8" height="12" />
      </svg>
    </div>
  );
}

export function VastQuietCinematicProof() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lonRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLParagraphElement>(null);
  const noteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 768px)");
    let current = 0;
    let raf = 0;

    const paint = () => {
      const span = track.offsetHeight - window.innerHeight;
      const scrolled = -track.getBoundingClientRect().top;
      const target = span > 0 ? Math.min(1, Math.max(0, scrolled / span)) : 0;
      current += (target - current) * 0.12;
      el.style.setProperty("--vq-p", current.toFixed(4));
      STATIONS.forEach((station, i) => {
        const dwell = Math.max(0, 1 - Math.abs(current - station.at) / DWELL);
        el.style.setProperty(`--vq-s${i}`, dwell.toFixed(3));
      });
      if (lonRef.current) {
        lonRef.current.textContent = `72\u00b0 ${(14.6 - current * 6.4).toFixed(1)}\u2032 W`;
      }
      if (pctRef.current) {
        pctRef.current.textContent = `${String(Math.round(current * 100)).padStart(3, "0")} %`;
      }
      if (noteRef.current) {
        const nearest = current < 0.25 ? 0 : current < 0.75 ? 1 : 2;
        noteRef.current.textContent = STATIONS[nearest].note;
      }
      raf = requestAnimationFrame(paint);
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const sync = () => {
      if (wide.matches && !reduced.matches) start();
      else stop();
    };

    sync();
    reduced.addEventListener("change", sync);
    wide.addEventListener("change", sync);
    return () => {
      stop();
      reduced.removeEventListener("change", sync);
      wide.removeEventListener("change", sync);
    };
  }, []);

  return (
    <main className="vq-root" ref={rootRef}>
      <header className="vq-bar vq-bar--top">
        <h1 className="vq-brand">Cape Meridian Observatory</h1>
        <p className="vq-lon">
          <span>LON</span>
          <span className="vq-accent" ref={lonRef}>
            72° 11.4′ W
          </span>
        </p>
        <p className="vq-progress" ref={pctRef}>
          050 %
        </p>
      </header>

      <div className="vq-track" ref={trackRef}>
        <div className="vq-viewport">
          <div className="vq-pano">
            {STATIONS.map((station, i) => (
              <section className={`vq-scene vq-scene--${i + 1}`} key={station.id}>
                <div className="vq-sky" aria-hidden="true" />
                <div className="vq-glow" aria-hidden="true" />
                <div className="vq-fog" aria-hidden="true" />
                <Ridge variant="far" scene={i + 1} />
                <Ridge variant="near" scene={i + 1} />
                {i === 2 && <Observatory />}
                <div className="vq-station">
                  <p className="vq-kicker">{station.id}</p>
                  <h2 className="vq-title">{station.title}</h2>
                  <p className="vq-log">{station.log}</p>
                  <p className="vq-credit">{station.credit}</p>
                  {i === 2 && (
                    <button className="vq-cta" type="button">
                      Request a winter berth
                    </button>
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      <footer className="vq-bar vq-bar--bottom">
        <p>N 41° 23.8′</p>
        <p ref={noteRef}>{STATIONS[0].note}</p>
        <p>Scale 1:80 000 - 21:9</p>
      </footer>
    </main>
  );
}
