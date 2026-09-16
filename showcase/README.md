# DesignVault Showcase

Three flagship proofs that validate the DesiVault thesis: the styles render as real,
crafted pages - not descriptions of pages. One mechanic per proof.

## Proofs

| Route | Style | Build |
|---|---|---|
| `/proofs/dither-mono` | Dither Mono | single build |
| `/proofs/cinematic-scroll-story` | Cinematic Scroll Story | two variants (A/B) |
| `/proofs/vast-quiet-cinematic` | Vast Quiet Cinematic | single build |

## Commands

```bash
cd showcase
npm install
npm run dev          # http://localhost:3001
npm run build        # typecheck + production build
npm run test:e2e     # Playwright smoke suite
```

## Pipeline (per proof)

1. References - `references/<style>.md` teardowns (source: `content/styles/<style>/references.mdx` + live-site research)
2. Directions - three written concepts, picked by eye before building
3. Build - one build per style; cinematic gets two variants
4. Verify - `visual-verify` skill: screenshots @360/768/1440, scroll video, fps, console, reduced-motion
5. Polish + one receipt line in `receipts.md`

Specs for each proof live next to its code (`src/proofs/<style>/SPEC.md`).

## Rules

- Per-proof CSS namespacing - aesthetics must not contaminate each other.
- One strong mechanic per page; no feature lists.
- Specific fictional content, real copy; procedural SVG/CSS imagery first.
- Deployment: local-first; Vercel deploy happens after proofs earn it (P5), then the
  platform embeds the live pages.

## Non-goals

Platform redesign, 3D observatory, taxonomy changes, Portfolio Journey changes.
