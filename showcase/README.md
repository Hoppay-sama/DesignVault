# DesignVault Showcase

Three flagship proofs that validate the DesiVault thesis: the styles render as real,
crafted pages - not descriptions of pages. One mechanic per proof.

## Proofs

| Route | Style | Build |
|---|---|---|
| `/proofs/dither-mono` | Dither Mono | single build |
| `/proofs/cinematic-scroll-story` | Cinematic Scroll Story — **KOVRA v2 flagship** (rebuilt 2026-09-16) | two variants (A/B); A uses real footage (3 videos + 4 stills, free-license) |
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
- Specific fictional content, real copy; **intentional production-grade layers** — medium is the style's choice (real media with `LICENSES.md` records, generated comps, or authored illustration / type-as-image); the ban is on placeholder stand-ins, not on medium.
- Quality bar: reference board first (`references/kovra-v2.md`) — proofs are judged against SOTD-level captures in their own register, not against their own mocks.
- Deployment: local-first; Vercel deploy happens after proofs earn it (P5), then the
  platform embeds the live pages.

## Non-goals

Platform redesign, 3D observatory, taxonomy changes, Portfolio Journey changes.
