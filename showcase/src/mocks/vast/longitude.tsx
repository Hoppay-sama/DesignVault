import { useEffect, useRef, useState } from "react";
import "./longitude.css";

const STATIONS = [
  { at: 0.15, id: "STATION 01", note: "HEADLAND - 400 M" },
  { at: 0.5, id: "STATION 02", note: "THE NARROWS" },
  { at: 0.85, id: "STATION 03", note: "OPEN WATER" },
];

// ponytail: single scroll-scrub handler, no GSAP — one tween doesn't need the lib.
export function LongitudeMock() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(0.45);
      return;
    }
    let frame = 0;
    const update = () => {
      const span = track.offsetHeight - window.innerHeight;
      setProgress(span > 0 ? Math.min(1, Math.max(0, window.scrollY / span)) : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const minutes = (14.6 - progress * 6.4).toFixed(1);
  const nearest = STATIONS.reduce(
    (best, s) => (Math.abs(s.at - progress) < Math.abs(best.at - progress) ? s : best),
    STATIONS[0],
  );

  return (
    <main className="mock-longitude">
      <header className="mock-longitude-bar mock-longitude-bar--top">
        <span>CAPE MERIDIAN OBSERVATORY</span>
        <span>
          LON <b className="mock-longitude-accent">{`72° ${minutes}′ W`}</b>
        </span>
        <span>{String(Math.round(progress * 100)).padStart(3, "0")}%</span>
      </header>

      <div className="mock-longitude-track" ref={trackRef}>
        <div className="mock-longitude-viewport">
          <div
            className="mock-longitude-panorama"
            style={{ transform: `translateX(${-progress * 200}vw)` }}
          >
            <div className="mock-longitude-sky" />
            <div className="mock-longitude-fog" />
            <svg
              className="mock-longitude-ridge mock-longitude-ridge--far"
              viewBox="0 0 3000 600"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M0 430 L140 386 L300 408 L470 342 L640 372 L820 300 L1000 336 L1180 268 L1380 312 L1560 244 L1760 292 L1960 226 L2160 274 L2360 214 L2560 262 L2760 206 L3000 248 L3000 600 L0 600 Z" />
            </svg>
            <svg
              className="mock-longitude-ridge mock-longitude-ridge--near"
              viewBox="0 0 3000 600"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M0 520 L180 470 L380 502 L580 428 L800 470 L1020 398 L1240 448 L1460 382 L1680 432 L1920 368 L2160 420 L2400 356 L2640 408 L2860 356 L3000 396 L3000 600 L0 600 Z" />
            </svg>
          </div>

          {STATIONS.map((s) => (
            <div
              key={s.id}
              className="mock-longitude-station"
              style={{ opacity: Math.max(0, 1 - Math.abs(progress - s.at) / 0.13) }}
            >
              <h2>{s.id}</h2>
              <p>{s.note}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="mock-longitude-bar mock-longitude-bar--bottom">
        <span>N 41° 23.8′</span>
        <span>{nearest.note}</span>
        <span>SCALE 1:80 000 - 21:9</span>
      </footer>
    </main>
  );
}
