import { useEffect, useRef, type CSSProperties, type RefObject } from "react";
import "./lumen.css";

type PartStyle = CSSProperties & {
  "--x"?: string;
  "--y"?: string;
  "--z"?: string;
};

const partStyle = (x: number, y: number, z: number): PartStyle => ({
  "--x": `${x}px`,
  "--y": `${y}px`,
  "--z": `${z}`,
});

function TideClock() {
  return (
    <svg
      className="lumen-clock"
      viewBox="0 0 620 620"
      role="img"
      aria-labelledby="clock-title clock-description"
    >
      <title id="clock-title">Lumen Mk. III tide clock</title>
      <desc id="clock-description">
        A hand-drawn brass and blued-steel tide clock shown as seven separated component groups.
      </desc>
      <defs>
        <radialGradient id="case-metal" cx="30%" cy="24%">
          <stop offset="0" stopColor="#fff7e5" />
          <stop offset="0.47" stopColor="#d9c7a6" />
          <stop offset="1" stopColor="#8e785c" />
        </radialGradient>
        <linearGradient id="brass-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f5dc9d" />
          <stop offset="0.45" stopColor="#b88742" />
          <stop offset="1" stopColor="#7a5428" />
        </linearGradient>
        <linearGradient id="steel-edge" x1="0" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#577186" />
          <stop offset="0.52" stopColor="#203e52" />
          <stop offset="1" stopColor="#102534" />
        </linearGradient>
        <radialGradient id="dial-paper" cx="42%" cy="38%">
          <stop offset="0" stopColor="#f8f0dd" />
          <stop offset="1" stopColor="#e7d9ba" />
        </radialGradient>
        <filter id="paper-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id="fine-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>

      <g className="clock-part part-case" style={partStyle(-30, 34, 0.42)}>
        <circle className="lumen-ground-shadow" cx="310" cy="320" r="226" fill="#152633" opacity="0.22" filter="url(#paper-shadow)" />
        <circle cx="310" cy="310" r="226" fill="url(#case-metal)" stroke="#604c35" strokeWidth="3" />
        <circle cx="310" cy="310" r="217" fill="none" stroke="#f1dfbb" strokeWidth="2" opacity="0.7" />
        <circle cx="310" cy="310" r="207" fill="none" stroke="#876d4e" strokeWidth="8" opacity="0.65" />
        <path d="M154 199c35-70 103-112 170-111" fill="none" stroke="#fff6df" strokeWidth="4" opacity=".75" />
        <path d="M136 355c12 76 51 125 114 157" fill="none" stroke="#695139" strokeWidth="2" opacity=".5" />
        <circle cx="310" cy="310" r="195" fill="none" stroke="#b08b55" strokeWidth="1" strokeDasharray="2 7" />
        <circle cx="180" cy="420" r="7" fill="#6d543a" opacity=".12" />
        <circle cx="430" cy="210" r="5" fill="#6d543a" opacity=".1" />
        <path d="M97 310h12M511 310h12M310 97v12M310 511v12" stroke="#6d543a" strokeWidth="3" />
      </g>

      <g className="clock-part part-bezel" style={partStyle(42, -24, 0.58)}>
        <circle className="lumen-ground-shadow" cx="310" cy="310" r="185" fill="#0d2330" opacity=".25" filter="url(#fine-shadow)" />
        <circle cx="310" cy="310" r="185" fill="none" stroke="url(#brass-edge)" strokeWidth="22" />
        <circle cx="310" cy="310" r="171" fill="none" stroke="#f2d99a" strokeWidth="2" opacity=".8" />
        <circle cx="310" cy="310" r="155" fill="none" stroke="#70502d" strokeWidth="4" />
        <circle cx="310" cy="310" r="177" fill="none" stroke="#f7e3ac" strokeWidth="1" opacity=".3" strokeDasharray="1 3" />
        <path d="M175 181A172 172 0 0 1 362 141" fill="none" stroke="#fff0c4" strokeWidth="4" opacity=".8" />
        <path d="M441 413a170 170 0 0 1-82 53" fill="none" stroke="#69451e" strokeWidth="4" opacity=".6" />
      </g>

      <g className="clock-part part-crystal" style={partStyle(-35, -34, 0.68)}>
        <circle cx="310" cy="310" r="146" fill="#dbe8e5" fillOpacity=".12" stroke="#d9e8e3" strokeWidth="3" />
        <circle cx="310" cy="310" r="141" fill="none" stroke="#fffaf0" strokeWidth="1" opacity=".72" />
        <path d="M211 220c34-37 79-56 126-57" fill="none" stroke="#fffdf5" strokeWidth="9" strokeLinecap="round" opacity=".35" />
        <path d="M401 411c-19 16-38 27-63 35" fill="none" stroke="#b9d0cc" strokeWidth="4" opacity=".35" />
      </g>

      <g className="clock-part part-dial" style={partStyle(-48, 55, 0.76)}>
        <circle cx="310" cy="310" r="135" fill="url(#dial-paper)" stroke="#b59b73" strokeWidth="2" />
        <circle cx="310" cy="310" r="126" fill="none" stroke="#d0b98c" strokeWidth="1" />
        <circle cx="310" cy="310" r="106" fill="none" stroke="#c5aa7c" strokeWidth="1" strokeDasharray="1 8" />
        <g fill="#2a4654" fontFamily="JetBrains Mono, monospace" fontSize="13" textAnchor="middle">
          <text x="310" y="220">HIGH</text><text x="310" y="414">LOW</text>
          <text x="216" y="318">FALL</text><text x="404" y="318">RISE</text>
        </g>
        <g stroke="#425d67" strokeWidth="2">
          <path d="M310 192v16M310 412v16M192 310h16M412 310h16" />
          <path d="M226 226l11 11M394 226l-11 11M226 394l11-11M394 394l-11-11" strokeWidth="1" />
        </g>
        <path d="M244 363c28 22 92 28 133-1" fill="none" stroke="#ba8540" strokeWidth="2" />
        <path d="M244 363c38 8 94 8 133-1" fill="none" stroke="#294c5b" strokeWidth="1" strokeDasharray="3 4" />
        <circle cx="310" cy="310" r="10" fill="#b88742" stroke="#61421e" strokeWidth="2" />
      </g>

      <g className="clock-part part-hands" style={partStyle(62, 45, 0.84)}>
        <path d="M310 310L279 226" stroke="#172f3d" strokeWidth="6" strokeLinecap="round" />
        <path d="M310 310L376 350" stroke="#a97534" strokeWidth="5" strokeLinecap="round" />
        <path d="M276 219l3 18M381 355l-12-8" stroke="#e9c978" strokeWidth="2" />
        <circle cx="310" cy="310" r="14" fill="#c3934d" stroke="#563b20" strokeWidth="3" />
        <circle cx="310" cy="310" r="5" fill="#f0d28f" />
      </g>

      <g className="clock-part part-cam" style={partStyle(-48, -68, 0.92)}>
        <circle cx="390" cy="392" r="39" fill="#193b4b" stroke="#ae7e39" strokeWidth="5" />
        <circle cx="390" cy="392" r="28" fill="none" stroke="#d4b36e" strokeWidth="3" strokeDasharray="10 5" />
        <circle cx="390" cy="392" r="13" fill="#c89b4f" stroke="#5e411e" strokeWidth="3" />
        <path d="M390 363v13M419 392h-13M390 421v-13M361 392h13" stroke="#f0d693" strokeWidth="3" />
        <path d="M422 364l20-21" stroke="#98672c" strokeWidth="5" strokeLinecap="round" />
      </g>

      <g className="clock-part part-gears" style={partStyle(62, 68, 1)}>
        <g fill="#385d6e" stroke="#c4944c" strokeWidth="3">
          <circle cx="211" cy="390" r="28" /><circle cx="264" cy="431" r="21" /><circle cx="448" cy="255" r="25" />
        </g>
        <g fill="none" stroke="#e5bf73" strokeWidth="4">
          <circle cx="211" cy="390" r="11" /><circle cx="264" cy="431" r="8" /><circle cx="448" cy="255" r="10" />
          <path d="M211 373v34M194 390h34M264 418v26M251 431h26M448 240v30M433 255h30" />
        </g>
        <path d="M232 402l19 18M280 420l144-151M427 266l-133 45" fill="none" stroke="#a87836" strokeWidth="4" />
        <path d="M176 391h-22M222 366l15-17M245 398l18-13M249 451l-10 18M292 434l20 8M427 232l-13-17M474 255h21M464 278l17 13" fill="none" stroke="#d8b064" strokeWidth="4" />
      </g>
    </svg>
  );
}

function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let current = reduced ? 0.43 : 0;
    let raf = 0;
    const tick = () => {
      const span = root.offsetHeight - window.innerHeight;
      const raw = span > 0 ? Math.min(1, Math.max(0, -root.getBoundingClientRect().top / span)) : 0;
      const target = reduced ? 0.43 : raw;
      current += (target - current) * 0.12;
      const explodeRaw = Math.max(0, 1 - Math.abs(current - 0.46) / 0.34);
      const explode = explodeRaw * explodeRaw * (3 - 2 * explodeRaw);
      const focus = Math.max(0, Math.min(1, (current - 0.47) / 0.2)) * Math.max(0, Math.min(1, (0.86 - current) / 0.2));
      const showroom = Math.max(0, Math.min(1, (current - 0.8) / 0.14));
      const nav = Math.max(0, Math.min(1, (current - 0.88) / 0.06));
      const shade = reduced
        ? 0
        : Math.max(
            Math.max(0, 1 - Math.abs(current - 0.46) / 0.09),
            Math.max(0, 1 - Math.abs(current - 0.8) / 0.11),
          ) * 0.22;
      root.style.setProperty("--p", current.toFixed(4));
      root.style.setProperty("--explode", explode.toFixed(4));
      root.style.setProperty("--focus", focus.toFixed(4));
      root.style.setProperty("--showroom", showroom.toFixed(4));
      root.style.setProperty("--nav", nav.toFixed(4));
      root.style.setProperty("--shade", shade.toFixed(4));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ref]);
}

const materials = [
  ["Brass", "warm alloy / hand-patinated", "#b88742"],
  ["Blued steel", "oil-quenched / midnight blue", "#294e62"],
  ["Mineral crystal", "double-domed / optically clear", "#cbdedc"],
  ["Oak", "slow-grown / salt-seasoned", "#9d6b42"],
] as const;

export function LumenProof() {
  const ref = useRef<HTMLElement>(null);
  useScrollProgress(ref);

  return (
    <main className="lumen-page" ref={ref}>
        <div className="lumen-stage">
          <div className="lumen-wash" aria-hidden="true" />
          <div className="lumen-scrim" aria-hidden="true" />
          <div className="lumen-shade" aria-hidden="true" />
          <div className="lumen-grain" aria-hidden="true" />
        <header className="lumen-header">
          <a href="/" className="lumen-mark">Aven &amp; Mare</a>
          <span className="lumen-header-note">Tidal instruments / 03</span>
        </header>
        <div className="lumen-hero-copy">
          <p className="lumen-eyebrow">Aven &amp; Mare · horologist&apos;s ledger</p>
          <h1>LUMEN</h1>
          <p className="lumen-deck">Mk. III tide clock</p>
        </div>
        <div className="lumen-instrument">
          <TideClock />
          <div className="lumen-crosshair lumen-crosshair-x" aria-hidden="true" />
          <div className="lumen-crosshair lumen-crosshair-y" aria-hidden="true" />
        </div>
        <p className="lumen-scroll-cue">scroll to open <span>↓</span></p>
        <div className="lumen-ledger" aria-live="polite">
          <span className="ledger-title">Fifty-one parts.</span>
          <span>All answerable to the tide.</span>
        </div>
        <div className="lumen-parts" aria-hidden="true">
          <span className="part-label label-case">CASE / 01</span>
          <span className="part-label label-bezel">BEZEL / 02</span>
          <span className="part-label label-dial">DIAL / 03</span>
          <span className="part-label label-hands">HANDS / 04</span>
          <span className="part-label label-cam">TIDE CAM / 05</span>
          <span className="part-label label-gears">GEAR TRAIN / 06</span>
        </div>
        <div className="lumen-inspection">
          <p className="lumen-eyebrow">Inspection / tide cam</p>
          <h2>It listens<br />for the pull.</h2>
          <p>One small cam translates the moon&apos;s patient pressure into a face you can read.</p>
        </div>
        <div className="lumen-showroom">
          <p className="lumen-eyebrow">Materials that age in public</p>
          <div className="material-rail">
            {materials.map(([name, detail, color], index) => (
              <article
                className="material-card"
                key={name}
                style={{ "--material": color, "--i": index } as CSSProperties}
              >
                <span className="material-swatch" />
                <h3>{name}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </div>
        <nav className="lumen-nav" aria-label="Lumen navigation">
          <span>AVEN &amp; MARE</span>
          <a href="/proofs/cinematic-scroll-story">Read the ledger</a>
          <a href="/">Return to index</a>
        </nav>
      </div>
    </main>
  );
}
