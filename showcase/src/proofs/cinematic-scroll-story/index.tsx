import { useEffect, useRef, type RefObject } from "react";
import "./styles.css";

function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      element.style.setProperty("--p", "1");
      return;
    }

    let current = 0;
    let frame = 0;
    const tick = () => {
      const distance = element.offsetHeight - window.innerHeight;
      const target = distance > 0
        ? Math.min(1, Math.max(0, -element.getBoundingClientRect().top / distance))
        : 0;
      current += (target - current) * 0.14;
      element.style.setProperty("--p", current.toFixed(4));
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [ref]);
}

const scenes = [
  {
    id: "source",
    place: "Glacial Source",
    copy: "Nobody owns the first kilometer. The ice keeps it.",
    note: "KOVRA / FIELD NOTE 001",
    detail: "Blue hour under permanent weather",
  },
  {
    id: "gorge",
    place: "The Gorge",
    copy: "The river narrows until the mountain has to listen.",
    note: "KOVRA / FIELD NOTE 047",
    detail: "Basalt, wind, and a hard white current",
  },
  {
    id: "mill",
    place: "Mill Town",
    copy: "Every wheel in town remembers the shape of the water.",
    note: "KOVRA / FIELD NOTE 188",
    detail: "A working river, measured in timber and light",
  },
  {
    id: "delta",
    place: "Delta at Night",
    copy: "At the edge, KOVRA forgets its name and becomes everything.",
    note: "KOVRA / FIELD NOTE 412",
    detail: "Tidal flats, lanterns, and the last clear reflection",
  },
] as const;

const landmarks = [
  ["01", "Gorge Gate", "A split in the basalt where the river turns north."],
  ["02", "Bell Bridge", "The old crossing rings once when the thaw arrives."],
  ["03", "Mill Wheel", "Oak, iron, and a century of patient rotation."],
  ["04", "Lantern Quay", "The final landing before fresh water meets salt."],
] as const;

export function CinematicScrollStoryProof() {
  const wrapperRef = useRef<HTMLElement>(null);
  useScrollProgress(wrapperRef);

  return (
    <main className="kovra" ref={wrapperRef}>
      <div className="kovra-stage">
        <nav className="kovra-nav" aria-label="Kovra story navigation">
          <a href="#kovra-top" className="kovra-mark">KOVRA</a>
          <span>an observation in four stretches</span>
          <a href="#kovra-sights">follow the water</a>
        </nav>

        <div className="kovra-scene" aria-hidden="true">
          <svg className="kovra-terrain" viewBox="0 0 1200 760" preserveAspectRatio="none">
            <defs>
              <linearGradient id="kovra-sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#071b31" />
                <stop offset="0.55" stopColor="#2a6478" />
                <stop offset="1" stopColor="#9bd0c1" />
              </linearGradient>
              <linearGradient id="kovra-night" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#080a24" />
                <stop offset="0.62" stopColor="#25225e" />
                <stop offset="1" stopColor="#d08f6d" />
              </linearGradient>
              <radialGradient id="kovra-glow" cx="70%" cy="28%" r="60%">
                <stop offset="0" stopColor="#f6d88d" stopOpacity=".8" />
                <stop offset="1" stopColor="#f6d88d" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect className="kovra-sky" width="1200" height="760" fill="url(#kovra-sky)" />
            <rect className="kovra-night" width="1200" height="760" fill="url(#kovra-night)" />
            <ellipse className="kovra-sun" cx="890" cy="190" rx="360" ry="240" fill="url(#kovra-glow)" />
            <path className="kovra-ridge kovra-ridge-back" d="M0 340 145 210 274 292 420 148 556 282 718 174 866 296 1010 190 1200 306V760H0Z" />
            <path className="kovra-ridge kovra-ridge-mid" d="M0 420 170 320 306 376 468 258 584 382 732 280 870 390 1036 292 1200 380V760H0Z" />
            <path className="kovra-valley" d="M0 496 152 432 320 478 464 392 600 466 744 388 900 474 1060 416 1200 462V760H0Z" />
            <path className="kovra-bank kovra-bank-left" d="M0 544 175 504 325 538 470 492 556 540 505 760H0Z" />
            <path className="kovra-bank kovra-bank-right" d="M1200 524 1070 494 934 538 770 486 662 548 716 760H1200Z" />
            <path className="kovra-foreground" d="M0 654 110 604 218 644 348 586 466 658 578 614 700 664 840 596 980 646 1098 604 1200 644V760H0Z" />
          </svg>

          <svg className="kovra-thread" viewBox="0 0 1200 760" preserveAspectRatio="none">
            <path className="kovra-thread-shadow" pathLength={1} d="M575 -20 C530 108 690 182 610 292 C522 410 620 462 704 518 C778 568 666 644 600 780" />
            <path className="kovra-thread-line" pathLength={1} d="M575 -20 C530 108 690 182 610 292 C522 410 620 462 704 518 C778 568 666 644 600 780" />
          </svg>

          <div className="kovra-bridge">
            <span className="kovra-bridge-deck" />
            <span className="kovra-bridge-cable" />
            <span className="kovra-bridge-tower kovra-bridge-tower-left" />
            <span className="kovra-bridge-tower kovra-bridge-tower-right" />
          </div>

          <div className="kovra-stars" />
          <div className="kovra-panels">
            {scenes.map((scene) => (
              <article className={`kovra-panel kovra-panel-${scene.id}`} key={scene.id}>
                <p className="kovra-panel-note">{scene.note}</p>
                <p className="kovra-panel-place">{scene.place}</p>
                <h2>{scene.copy}</h2>
                <p className="kovra-panel-detail">{scene.detail}</p>
              </article>
            ))}
          </div>

          <div className="kovra-progress" aria-hidden="true"><span /></div>
        </div>

        <div className="kovra-opening" id="kovra-top">
          <p className="kovra-eyebrow">A river study / 000—412 km</p>
          <h1>Kovra</h1>
          <p className="kovra-intro">One river, four colors of light.</p>
          <span className="kovra-scroll-cue">Scroll to descend <i aria-hidden="true" /></span>
        </div>

        <section className="kovra-sights" id="kovra-sights" aria-label="Kovra landmarks">
          <div className="kovra-sights-heading">
            <p className="kovra-eyebrow">Observed along the way</p>
            <h2>The river leaves evidence.</h2>
          </div>
          <div className="kovra-landmark-rail">
            {landmarks.map(([number, name, copy]) => (
              <article className="kovra-landmark" key={name}>
                <p>{number}</p>
                <h3>{name}</h3>
                <span>{copy}</span>
                <i aria-hidden="true" />
              </article>
            ))}
          </div>
          <footer className="kovra-footer">
            <span>KOVRA / an unbroken thread</span>
            <span>Field notes, collected in light</span>
          </footer>
        </section>
      </div>
    </main>
  );
}
