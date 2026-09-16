import "./terminus.css";

/**
 * Mechanic: the aperture. Imagery exists only inside letterforms.
 * The dot pattern stands in for a dithered raster (no external assets).
 */
export function TerminusMock() {
  return (
    <main className="mock-terminus">
      <div className="mock-terminus-grain" aria-hidden="true" />

      <section className="mock-terminus-hero">
        <p className="mock-terminus-label">Terminus / Annual Journal / Vol. 01</p>

        <h1 className="mock-terminus-title">
          <svg viewBox="0 0 1400 400" role="img" aria-label="Engineered Collapse">
            <defs>
              <pattern id="terminus-dots" width="7" height="7" patternUnits="userSpaceOnUse">
                <circle cx="1.8" cy="1.8" r="1.7" fill="#E8E8E8" />
              </pattern>
            </defs>
            <text className="mock-terminus-word" x="0" y="170" fontSize={200} fill="#E8E8E8">
              ENGINEERED
            </text>
            <text
              className="mock-terminus-word"
              x="0"
              y="360"
              fontSize={200}
              fill="url(#terminus-dots)"
            >
              COLLAPSE
            </text>
          </svg>
        </h1>

        <p className="mock-terminus-stand">A record of structures that failed on purpose.</p>
      </section>

      <section className="mock-terminus-chapter">
        <p className="mock-terminus-label">Chapter 03 / The Aperture</p>

        <svg
          className="mock-terminus-chapter-svg"
          viewBox="0 0 1400 260"
          role="img"
          aria-label="Rebar tangle"
        >
          <defs>
            <pattern
              id="terminus-dots-2"
              width="9"
              height="9"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(38)"
            >
              <circle cx="2.2" cy="2.2" r="2" fill="#E8E8E8" />
            </pattern>
          </defs>
          <text
            className="mock-terminus-word"
            x="0"
            y="204"
            fontSize={240}
            fill="url(#terminus-dots-2)"
          >
            REBAR
          </text>
        </svg>

        <p className="mock-terminus-callout">RES. FREQ. 1.9 HZ / PEAK DEFLECTION 44 MM</p>
      </section>
    </main>
  );
}
