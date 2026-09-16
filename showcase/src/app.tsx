import { DitherMonoProof } from "./proofs/dither-mono";
import { CinematicScrollStoryProof } from "./proofs/cinematic-scroll-story";
import { LumenProof } from "./proofs/cinematic-scroll-story/lumen";
import { VastQuietCinematicProof } from "./proofs/vast-quiet-cinematic";
import { mocks } from "./mocks/registry";

const proofs = [
  { path: "/proofs/dither-mono", label: "Dither Mono", Component: DitherMonoProof },
  {
    path: "/proofs/cinematic-scroll-story",
    label: "Cinematic / KOVRA (A)",
    Component: CinematicScrollStoryProof,
  },
  {
    path: "/proofs/cinematic-scroll-story/lumen",
    label: "Cinematic / LUMEN (B)",
    Component: LumenProof,
  },
  {
    path: "/proofs/vast-quiet-cinematic",
    label: "Vast Quiet Cinematic",
    Component: VastQuietCinematicProof,
  },
] as const;

export function App() {
  const path = window.location.pathname.replace(/\/+$/, "");

  const match = proofs.find((proof) => proof.path === path);
  if (match) {
    const { Component } = match;
    return <Component />;
  }

  const mock = mocks.find((entry) => entry.path === path);
  if (mock) {
    const { Component } = mock;
    return <Component />;
  }

  return (
    <main className="dv-index">
      <h1>DesignVault Showcase</h1>
      <p>Three flagship proofs. Nine direction mocks.</p>
      <nav aria-label="Proofs">
        {proofs.map((proof) => (
          <a key={proof.path} href={proof.path}>
            {proof.label}
          </a>
        ))}
      </nav>
      <h2>Direction mocks</h2>
      <nav aria-label="Direction mocks">
        {mocks.map((entry) => (
          <a key={entry.path} href={entry.path}>
            {entry.style} - {entry.direction}
          </a>
        ))}
      </nav>
    </main>
  );
}
