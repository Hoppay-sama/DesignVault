import { useEffect, useRef } from "react";
import "./longwire.css";

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const CELL = 4;

/**
 * Mechanic: slow exposure. A procedural horizon develops out of near-black
 * through a Bayer 4x4 ordered dither, sweeping left-to-right once, then freezes.
 */
export function LongwireMock() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = frameRef.current;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let cols = 0;
    let rows = 0;
    let lum = new Float32Array(0);
    let drawn = -1;

    const build = () => {
      const w = host.clientWidth;
      const h = Math.round(w * 0.42);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(w / CELL);
      rows = Math.ceil(h / CELL);
      lum = new Float32Array(cols * rows);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = i / cols;
          const y = j / rows;
          const ridge = Math.sin(x * 9.2 + 1.3) * Math.sin(y * 4.1);
          const swell = Math.sin(x * 3.1 - y * 7.4) * 0.5;
          const noise = Math.sin(x * 21 + y * 13) * 0.22;
          const horizon = Math.exp(-(((y - 0.44) * 3.4) ** 2)) * 0.85;
          const v = 0.16 + horizon + ridge * 0.22 + swell * 0.2 + noise * 0.18;
          lum[j * cols + i] = Math.max(0, Math.min(1, v));
        }
      }
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#c9c9c9";
      drawn = -1;
    };

    const drawTo = (upto: number) => {
      const end = Math.min(upto, cols - 1);
      for (let i = drawn + 1; i <= end; i++) {
        for (let j = 0; j < rows; j++) {
          if (lum[j * cols + i] * 16 <= BAYER[(i % 4) + (j % 4) * 4]) continue;
          ctx.beginPath();
          ctx.arc(i * CELL + CELL / 2, j * CELL + CELL / 2, 1.15, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      drawn = end;
    };

    const run = () => {
      if (started.current) return;
      started.current = true;
      build();
      if (reduce) {
        drawTo(cols - 1);
        return;
      }
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / 1600);
        drawTo(Math.floor(p * (cols - 1)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(host);

    const onResize = () => {
      if (!started.current) return;
      if (raf) cancelAnimationFrame(raf);
      build();
      drawTo(cols - 1);
    };
    window.addEventListener("resize", onResize);

    return () => {
      io.disconnect();
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <main className="mock-longwire">
      <div className="mock-longwire-grain" aria-hidden="true" />

      <section className="mock-longwire-hero">
        <p className="mock-longwire-label">Longwire / Field Microphone / Mk. IV</p>
        <h1>
          Hear the
          <br />
          horizon
        </h1>
        <p className="mock-longwire-sub">
          A field microphone built for distance. It develops what it catches, slowly.
        </p>
      </section>

      <section className="mock-longwire-frame-wrap">
        <div ref={frameRef} className="mock-longwire-frame">
          <canvas
            ref={canvasRef}
            className="mock-longwire-canvas"
            role="img"
            aria-label="Procedural horizon rendered as an ordered dither"
          />
        </div>

        <div className="mock-longwire-caption">
          <p className="mock-longwire-label">Exposure 01 / Developed at 4x4</p>
          <p className="mock-longwire-spec">SENSITIVITY -38 dB/PA</p>
          <p className="mock-longwire-label">IP67 SEALED DIAPHRAGM / STANDBY 960 H</p>
        </div>

        <a className="mock-longwire-cta" href="#order">
          Request a unit
        </a>
      </section>
    </main>
  );
}
