import { useEffect, useRef, type CSSProperties } from "react";
import "./styles.css";

/**
 * LONGWIRE - Dither Mono direction B.
 * Mechanic: slow exposure. Each section renders a procedural luminance field
 * through a Bayer 4x4 ordered dither, sweeping columns left-to-right once, then
 * freezes and cancels rAF. No photography, no external assets.
 */

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const SWEEP_MS = 1600;
const GROUND = "#0a0a0a";
const DOT = "#c9c9c9";

type Luma = (x: number, y: number, i: number, j: number) => number;

const hash = (i: number, j: number) => {
  const n = Math.sin(i * 127.1 + j * 311.7) * 43758.5453;
  return n - Math.floor(n);
};

// 01 CAPTURE - a transient decaying across the frame.
const capture: Luma = (x, y, i, j) => {
  const env = Math.exp(-x * 2.0) * 0.82 + 0.18;
  const trace =
    0.5 +
    Math.sin(x * 21) * 0.15 * env +
    Math.sin(x * 53 + 1.3) * 0.05 * env +
    Math.sin(x * 97) * 0.018 * env;
  const line = Math.exp(-((y - trace) ** 2) / 0.0006) * 0.95;
  const bed = Math.exp(-(((y - 0.5) * 3.8) ** 2)) * 0.28;
  return 0.03 + line + bed + (hash(i, j) - 0.5) * 0.05;
};

// 02 WEATHER - turbulent cloud bands over a low sun.
const weather: Luma = (x, y, i, j) => {
  const turb =
    Math.sin(x * 4.1 + Math.sin(y * 5.7) * 1.8) * 0.5 +
    Math.sin(y * 9.3 + x * 1.6) * 0.5;
  const bands = 0.5 + 0.5 * Math.sin(y * 6.2 + turb * 2.2);
  const cloud = Math.pow(bands, 2.1) * 0.72;
  const dx = x - 0.76;
  const dy = (y - 0.24) * 1.4;
  const sun = Math.exp(-(dx * dx + dy * dy) / 0.012) * 0.5;
  return 0.04 + cloud + sun + (hash(i, j) - 0.5) * 0.045;
};

// 03 RETURN - concentric echoes radiating from off-frame.
const echo: Luma = (x, y, i, j) => {
  const dx = x - 0.16;
  const dy = (y - 0.5) * 1.9;
  const d = Math.sqrt(dx * dx + dy * dy);
  const rings = 0.5 + 0.5 * Math.cos(d * 40 - 1.1);
  const decay = Math.exp(-d * 1.3) * 0.92;
  const core = Math.exp(-(d * d) / 0.004) * 0.55;
  return 0.03 + rings * decay + core + (hash(i, j) - 0.5) * 0.045;
};

function Exposure({ subject, label }: { subject: Luma; label: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let cols = 0;
    let rows = 0;
    let cell = 4;
    let radius = 1.15;
    let lum = new Float32Array(0);
    let drawn = -1;
    let started = false;

    const build = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return false;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = w < 768 ? 6 : 4; // ponytail: coarser grid on mobile, not a separate renderer
      radius = cell * 0.29;
      cols = Math.ceil(w / cell);
      rows = Math.ceil(h / cell);
      lum = new Float32Array(cols * rows);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const v = subject((i + 0.5) / cols, (j + 0.5) / rows, i, j);
          lum[j * cols + i] = Math.max(0, Math.min(1, v));
        }
      }
      ctx.fillStyle = GROUND;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = DOT;
      drawn = -1;
      return true;
    };

    const drawTo = (upto: number) => {
      const end = Math.min(upto, cols - 1);
      for (let i = drawn + 1; i <= end; i++) {
        for (let j = 0; j < rows; j++) {
          if (lum[j * cols + i] * 16 <= BAYER[(i % 4) + (j % 4) * 4]) continue;
          ctx.beginPath();
          ctx.arc(i * cell + cell / 2, j * cell + cell / 2, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      drawn = end;
    };

    const run = () => {
      if (started) return true;
      if (!build()) return false; // not laid out yet; retry on next intersection
      started = true;
      if (reduce || canvas.clientWidth < 768) {
        drawTo(cols - 1); // static developed frame
        return true;
      }
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / SWEEP_MS);
        drawTo(Math.floor(p * (cols - 1)));
        raf = p < 1 ? requestAnimationFrame(tick) : 0; // freeze, rAF cancelled
      };
      raf = requestAnimationFrame(tick);
      return true;
    };

    const host = canvas.parentElement ?? canvas;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting) && run()) io.disconnect();
      },
      { threshold: 0.25 },
    );
    io.observe(host);

    const onResize = () => {
      if (!started) return;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      if (build()) drawTo(cols - 1);
    };
    window.addEventListener("resize", onResize);

    return () => {
      io.disconnect();
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [subject]);

  return <canvas ref={ref} className="proof-lw-canvas" role="img" aria-label={label} />;
}

function ExposureFrame({
  subject,
  label,
  index,
  variant,
}: {
  subject: Luma;
  label: string;
  index: string;
  variant: "wide" | "tall" | "band";
}) {
  return (
    <figure className={`proof-lw-frame proof-lw-frame--${variant}`}>
      <Exposure subject={subject} label={label} />
      <span className="proof-lw-vignette" aria-hidden="true" />
      <figcaption className="proof-lw-frame-cap">
        <span>Exposure {index}</span>
        <span>Developed 4&times;4</span>
      </figcaption>
    </figure>
  );
}

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

function Copy({ index, name, body, spec }: { index: string; name: string; body: string; spec: string }) {
  return (
    <>
      <p className="proof-lw-label" data-reveal style={delay(0)}>
        {index} / {name}
      </p>
      <h2 className="proof-lw-h2" data-reveal style={delay(90)}>
        {name}
      </h2>
      <p className="proof-lw-body" data-reveal style={delay(180)}>
        {body}
      </p>
      <p className="proof-lw-spec" data-reveal style={delay(260)}>
        {spec}
      </p>
    </>
  );
}

export function DitherMonoProof() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.2 },
    );
    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);

  return (
    <main className="proof-lw">
      <div className="proof-lw-grain" aria-hidden="true" />

      <section className="proof-lw-hero">
        <div className="proof-lw-lead">
          <p className="proof-lw-label" data-reveal style={delay(200)}>
            Longwire / Field Microphone / Mk. IV
          </p>
          <h1 data-reveal style={delay(320)}>
            The interval is the signal
          </h1>
          <p className="proof-lw-sub" data-reveal style={delay(440)}>
            A field microphone built for distance. Longwire holds the pause between two sounds, and
            keeps it.
          </p>
          <a className="proof-lw-cta" href="#request" data-reveal style={delay(560)}>
            Request a unit
          </a>
        </div>

        <dl className="proof-lw-cluster" data-reveal style={delay(620)}>
          <div>
            <dt>Sensitivity</dt>
            <dd className="proof-lw-accent">-38 dB/PA</dd>
          </div>
          <div>
            <dt>Seal</dt>
            <dd>IP67 Sealed Diaphragm</dd>
          </div>
          <div>
            <dt>Standby</dt>
            <dd>960 H</dd>
          </div>
        </dl>
      </section>

      <section className="proof-lw-bleed">
        <div className="proof-lw-bleed-wrap">
          <ExposureFrame
            subject={capture}
            label="A decaying transient rendered as an ordered dither"
            index="01"
            variant="wide"
          />
          <div className="proof-lw-overlay">
            <Copy
              index="01"
              name="Capture"
              body="The diaphragm answers pressure, not volume. What arrives first is kept; the rest is allowed to pass."
              spec="Sensitivity -38 dB/PA"
            />
          </div>
        </div>
      </section>

      <section className="proof-lw-section proof-lw-split">
        <div className="proof-lw-copy">
          <Copy
            index="02"
            name="Weather"
            body="Weather arrives as texture before it arrives as sound. The instrument records the texture first."
            spec="IP67 Sealed Diaphragm"
          />
        </div>
        <ExposureFrame
          subject={weather}
          label="Turbulent cloud bands rendered as an ordered dither"
          index="02"
          variant="tall"
        />
      </section>

      <section className="proof-lw-section proof-lw-return">
        <ExposureFrame
          subject={echo}
          label="Concentric echoes rendered as an ordered dither"
          index="03"
          variant="band"
        />
        <div className="proof-lw-return-row">
          <div>
            <p className="proof-lw-label" data-reveal>
              03 / Return
            </p>
            <h2 className="proof-lw-h2" data-reveal style={delay(90)}>
              Return
            </h2>
          </div>
          <div>
            <p className="proof-lw-body" data-reveal style={delay(180)}>
              Every signal comes back changed. Longwire keeps the interval, not the noise.
            </p>
            <p className="proof-lw-spec" data-reveal style={delay(260)}>
              Standby 960 H
            </p>
          </div>
        </div>
      </section>

      <footer className="proof-lw-footer">
        <div className="proof-lw-wordmark" aria-hidden="true" data-reveal>
          Longwire
        </div>
        <div className="proof-lw-footer-row">
          <span>Longwire Field Instruments</span>
          <span>&copy; 2026</span>
          <span>All intervals kept</span>
        </div>
      </footer>
    </main>
  );
}
