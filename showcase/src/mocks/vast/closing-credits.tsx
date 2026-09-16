import "./closing-credits.css";

type Credit = [role: string, value: string, accent?: boolean];

const OPENING: Credit[] = [
  ["LOCATION", "MYKINES"],
  ["SOUND RECORDED", "WIND, FULMAR"],
  ["SILENCE INDEX", "11 dB", true],
  ["CAST", "NO ONE"],
];

const CLOSING: Credit[] = [
  ["CAMERA - STILL", "ONE FRAME, HELD"],
  ["WEATHER", "LOW CLOUD, NO WIND"],
  ["TELESCOPE", "STOWED"],
  ["EDITED IN", "SILENCE"],
];

function CreditList({ rows }: { rows: Credit[] }) {
  return (
    <dl className="mock-cc-credits">
      {rows.map(([role, value, accent]) => (
        <div className="mock-cc-row" key={role}>
          <dt>{role}</dt>
          <dd className={accent ? "mock-cc-accent" : undefined}>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ClosingCreditsMock() {
  return (
    <main className="mock-closing-credits">
      <div className="mock-cc-bar mock-cc-bar--top" aria-hidden="true">
        <span>THE QUIET INDEX - ISSUE NO. 9</span>
        <span>RUNTIME 03:48</span>
      </div>

      <div className="mock-cc-crawl">
        <p className="mock-cc-kicker">AN INDEX OF SILENT PLACES</p>
        <h1 className="mock-cc-title">THE QUIET INDEX</h1>
        <CreditList rows={OPENING} />
      </div>

      <section className="mock-cc-frame" aria-label="Dwelling frame, reel 01">
        <div className="mock-cc-still" aria-hidden="true" />
        <div className="mock-cc-titlecard">
          <span>REEL 01</span>
          <b>03:48</b>
        </div>
      </section>

      <div className="mock-cc-crawl">
        <CreditList rows={CLOSING} />
        <p className="mock-cc-fine">A film that never existed.</p>
        <a className="mock-cc-fin" href="#top">
          FIN
        </a>
      </div>

      <div className="mock-cc-bar mock-cc-bar--bottom" aria-hidden="true">
        <span>MYKINES - 62° 06′ N</span>
        <span>NO ONE WAS THERE</span>
      </div>
    </main>
  );
}
