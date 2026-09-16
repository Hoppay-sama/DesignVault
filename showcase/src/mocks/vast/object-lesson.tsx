import { useEffect, useRef } from "react";
import "./object-lesson.css";

// Ticks span a 180° arc: index 0 points left, 5 up, 10 right.
function Gauge() {
  return (
    <svg viewBox="0 0 200 260" className="mock-ol-gauge" aria-hidden="true">
      <circle cx="100" cy="100" r="86" className="mock-ol-dial" />
      <circle cx="100" cy="100" r="72" className="mock-ol-dial-inner" />
      {[...Array(11)].map((_, i) => {
        const rad = ((-90 + i * 18) * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={100 + Math.sin(rad) * 62}
            y1={100 - Math.cos(rad) * 62}
            x2={100 + Math.sin(rad) * 72}
            y2={100 - Math.cos(rad) * 72}
            className="mock-ol-tick"
          />
        );
      })}
      <line
        x1="100"
        y1="100"
        x2="100"
        y2="42"
        className="mock-ol-needle"
        transform="rotate(34 100 100)"
      />
      <circle cx="100" cy="100" r="7" className="mock-ol-hub" />
      <rect x="88" y="186" width="24" height="64" className="mock-ol-post" />
    </svg>
  );
}

const SHOTS = [
  { id: "SHOT 01", label: "WIDE - FROM THE SHORE", distance: "400 M", scale: 0.26 },
  { id: "SHOT 03", label: "MEDIUM - THROUGH THE GLASS", distance: "12 M", scale: 0.62 },
  { id: "SHOT 05", label: "CLOSE - BRASS AND FLOAT", distance: "1 M", scale: 1.18 },
];

export function ObjectLessonMock() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting)),
      { threshold: 0.3 },
    );
    root.querySelectorAll(".mock-ol-reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="mock-object-lesson" ref={rootRef}>
      <div className="mock-ol-gap" />

      {SHOTS.map((shot, i) => (
        <section
          key={shot.id}
          className="mock-ol-shot mock-ol-reveal"
          data-shot={i + 1}
          aria-label={`${shot.id}, distance ${shot.distance}`}
        >
          <span className="mock-ol-shot-id">{shot.id}</span>
          <div className="mock-ol-stage" style={{ transform: `scale(${shot.scale})` }}>
            <Gauge />
          </div>
          <div className="mock-ol-meta">
            <span>{shot.label}</span>
            <span>
              DISTANCE <b className="mock-ol-accent">{shot.distance}</b>
            </span>
          </div>
        </section>
      ))}

      <section className="mock-ol-shot mock-ol-shot--return mock-ol-reveal" aria-label="Shot 07, return">
        <span className="mock-ol-shot-id">SHOT 07 - RETURN</span>
        <div className="mock-ol-stage" style={{ transform: "scale(0.3)" }}>
          <Gauge />
        </div>
        <p className="mock-ol-credit">
          HALL METER WORKS, GAUGE NO. 7 - brass, glass, and a float. It has measured every tide
          since <b className="mock-ol-accent">1911</b>. No batteries.
        </p>
      </section>

      <div className="mock-ol-gap" />
    </main>
  );
}
