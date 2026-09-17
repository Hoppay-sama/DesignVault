# KOVRA v2 — Motion / Choreography Spec (P4)

**Date:** 2026-09-16 · **Author:** motion-director · **Status:** implementation-ready
**Scope:** `showcase/src/proofs/cinematic-scroll-story/` — choreography spec only. The frontend specialist implements from this document. No production code here.
**Upstream:** art direction `showcase/references/kovra-v2-artdirection.md` (authoritative; §refs below), reference board `showcase/references/kovra-v2.md`, v1 build `index.tsx` + `styles.css`.
**Assets on disk (verified):** `showcase/public/kovra/` — KV-V1/V2/V3 `.mp4` + posters, KV-S1/S2/S3/S5 `.jpg`, `LICENSES.md`. **KV-S4 does not exist** — MILL TOWN = KV-S3 + veil + thread beat + sight cards. **Loader count = 7 footage assets.**

---

## 0. Motion concept

**One sentence:** a fixed field instrument plays back four hard-cut territories of real footage while a single mint thread draws itself through all of them — the camera descends (high aerial → low follow → eye-level → flat water), the luminance falls (~210 → ~145 → ~80 → ~18), and the only motion that never breaks is the thread's draw and the HUD's count.

Everything else in this document is that sentence, timed.

---

## 1. Keeps vs replaces (v1 internals)

**KEPT (architecture intact):**
- Sticky `100vh` stage inside a tall track (`calc(100vh + 3600px)` desktop; `calc(100dvh + 2000px)` below 768 — v1's mobile length, now governing all sub-768 widths).
- rAF loop with lerp `0.14` driving `--p` on the `<main>` element (v1 `useScrollProgress`, kept verbatim in mechanism; see §3 for Lenis layering).
- Thread draw mechanic: single SVG path, `pathLength={1}`, `stroke-dasharray: 1`, `stroke-dashoffset: calc(1 - var(--p))` — this exact value is also the sight-card trigger (§5, §8).
- Dual-stroke thread pattern (dark shadow stroke + mint line stroke, `vector-effect: non-scaling-stroke`).
- Bottom progress bar (retained, upgraded with 25/50/75% ticks).
- `scenes` data-array-driven rendering pattern.
- Per-frame distance recompute (`offsetHeight - innerHeight`) — resize is inherently handled; do not cache it.
- Reduced-motion escape hatch concept (`--p: 1` shortcut) — expanded into the full collapse in §10.

**REPLACED (deleted, not restyled):**
- SVG ridge/terrain illustration, CSS stars, drawn bridge divs → photographic media stacks (KV-*).
- Cross-faded `::before/::after` mix-blend tints → per-scene hard-cut stacks driven by `data-scene` (§6).
- Cormorant Garamond everywhere → Archivo (display/UI) + IBM Plex Mono (instrument).
- Top nav → full fixed HUD (§7).
- Panel opacity ramps (`clamp((--p - x) * 13 …)`) → hard text swap at cut lines + char-by-char place-name reveals (§4).
- `kovra-opening` static hero → loader sequence + char-split wordmark overlay (§2).
- `kovra-sights` landmark rail (420vw translateX) + footer section → POI markers on the thread + flying sight cards + HUD terminal line (§8). The rail, its heading, and the footer are deleted.
- Terrain blur-rack filter chain → deleted. (Rack-defocus is re-specced as an optional media flag, default OFF — §6.1.)

---

## 2. Timeline / state machine

### 2.1 States

```
LOADING → SCENE_01 → SCENE_02 → SCENE_03 → SCENE_04 → TERMINAL
              ↑___________ reverse transitions on upward scroll ___________|
(no return to LOADING, ever)
```

State lives in one rAF-owned variable set; the DOM surface is:
- `main[data-state="loading" | "playing" | "terminal"]`
- `main[data-scene="01" | "02" | "03" | "04"]` (only meaningful while `playing`/`terminal`)

### 2.2 Transition conditions

| From → To | Trigger (exact) |
|---|---|
| LOADING → SCENE_01 | `assetsReady === true && t ≥ T_MIN_HOLD (1800ms)` — hard cut, one frame (§2.3). Safety: if `assetsReady` hasn't fired by `t = 6000ms`, cut anyway (never hold the viewer past 6s). |
| SCENE_01 → SCENE_02 | lerped `--p ≥ 0.25` |
| SCENE_02 → SCENE_03 | `--p ≥ 0.50` |
| SCENE_03 → SCENE_04 | `--p ≥ 0.75` |
| any SCENE_n → SCENE_n−1 | `--p <` the same boundary (reversible; cuts fire both directions) |
| SCENE_04 → TERMINAL | `--p ≥ 0.995` (lerp asymptote guard — see §3.4) |
| TERMINAL → SCENE_04 | `--p < 0.995` |

`assetsReady` = all 7 footage assets resolved: 3 videos reach `readyState ≥ 3` (HAVE_FUTURE_DATA) **and have been `play()`-warmed once** (muted → autoplay-legal), 4 stills `decode()` resolved. Listen per-element; count to 7.

### 2.3 The hard cut (one frame, guaranteed)

A cut is a **class/attribute swap only** — no transition, no animation, no opacity interpolation may be attached to any element that changes at a cut. Mechanism:

1. rAF tick computes `sceneIdx` from `--p`.
2. If `sceneIdx !== lastSceneIdx`: set `data-scene`, fire the stitch glow pulse (§5.4), swap HUD scene index text (§7.2).
3. CSS: `[data-scene="02"] .kovra-media-01 { visibility: hidden }` etc. — all four scene stacks stay mounted; inactive ones get `visibility: hidden` (NOT `display: none` — keeps compositing layers warm and avoids layout). Visibility flips in the same style recalc as the attribute write → one frame, no blend frame.

**Warm strategy (no missing-frame flash):** all media mounts at t=0 under the loader. Videos carry `poster` + `preload="auto"` and are `play()`ed once during LOADING (muted), then paused. Stills are `<img>` with `decoding="async"` + `decode()` awaited. By the time the loader cuts, every scene's first frame is decoded and composited. There is no lazy loading anywhere in this proof.

### 2.4 What survives every cut (continuity guarantee)

These layers are **outside** the per-scene stacks, never receive `visibility` swaps, and never animate opacity at a boundary:

- Thread SVG (draw + markers + glow) — z above scene stacks.
- Entire HUD (brackets, wordmark, scene index, km, telemetry, bottom-center line, progress bar).
- Grain layer (static, §9.2).

Critic check: frame-step any boundary — thread and HUD pixels identical before/after; media/veil/text swapped within ≤120ms (one to two frames at 60fps capture).

---

## 3. Scroll model

### 3.1 Lenis + the `--p` lerp (both, layered — ratified)

- **Lenis** smooths native scroll: `new Lenis({ lerp: 0.12, wheelMultiplier: 1, touchMultiplier: 1.5 })`. Its rAF is driven from the same single rAF loop as the `--p` tick (`lenis.raf(time)` inside the existing tick — one loop, never two).
- **`--p` lerp 0.14 kept** on top, exactly as v1: `current += (target - current) * 0.14`, where `target` derives from Lenis-smoothed `window.scrollY` (v1 reads `getBoundingClientRect().top` — keep that read; it is already Lenis-aware since Lenis scrolls the real scroller).
- Combined feel: Lenis takes the wheel's edge off; the 0.14 scrub adds instrument lag so the thread draw reads as mechanical playback, not viewport tracking. Do not tune one to compensate for the other.
- Lenis instantiation is gated: skip entirely under reduced-motion and on `pointer: coarse` is NOT needed (Lenis handles touch natively with `syncTouch: false` default — leave default).

### 3.2 Track lengths

| Width | Track | Source |
|---|---|---|
| ≥768px | `calc(100vh + 3600px)` | v1, ratified |
| <768px | `calc(100dvh + 2000px)` | v1 mobile value, extended to govern all sub-768 |

`min-height: 100dvh` on the stage at 360; never `h-screen`/`100vh` on mobile stage height.

### 3.3 Resize

Distance is recomputed every frame from live layout (kept from v1) — no resize listener needed for `--p`. Lenis: call `lenis.resize()` on a debounced (150ms) `resize` listener. On orientation change, same path. No other motion state depends on viewport measurements except POI marker placement (§5.3), which recomputes on the same debounce.

### 3.4 Terminal clamp

`--p` is clamped `0…1` (v1 already does). At `--p ≥ 0.995`: state → TERMINAL, km readout forced to `412 / 412` (raw `round(0.995 × 412) = 410` would read wrong — the force is required), thread fully drawn (`dashoffset` at `p=1` is 0 — the lerp converges there naturally within a few frames), terminal line shown in HUD bottom-center (§7.3). Scrolling back above 0.995 reverts to SCENE_04 and the field-note mirror returns. There is no footer, no rewind, no credits — the page ends at the clamp.

---

## 4. Entrance sequence (LOADING → first frame of GLACIER)

All times from loader mount (t=0). Loader is an ink `#05080C` fixed field, z above everything including HUD.

| t (ms) | Event | Detail |
|---|---|---|
| 0 | Loader field visible | Ink, opaque. Nothing else renders beneath it visually (scene stacks are mounted but covered). |
| 0 → 500 | Brackets draw | Four L-brackets (1px bone/70%, 28px arms, 20px inset — HUD geometry, reused). Each arm is a 1px span scaling from 0: horizontal arms `scaleX` 0→1, vertical `scaleY` 0→1, `transform-origin` at the corner. Duration 500ms, `cubic-bezier(0.22, 1, 0.36, 1)`, all four simultaneously. Transform/opacity only. |
| 550 | Status line 1 in | `KOVRA / FIELD RECORD` — mono 12px, bone/60%, fade+rise 8px, 200ms, `ease-out`. |
| 950 | Status line 2 in | `CALIBRATING THREAD` — same treatment. |
| 1350 | Status line 3 in | `LOADING FOOTAGE 07/07` — same treatment. Count is **07** (3 videos + 4 stills on disk; supersedes the art direction's `09/09`). |
| 1350 → cut | Hold | Lines persist; no spinner, no percentage, no progress ring. The bracket frame + three lines IS the loader. |
| `assetsReady && t ≥ 1800` (or t = 6000 timeout) | **HARD CUT** | Loader unmounts (`display: none`, same frame). GLACIER stack already visible beneath. KV-V1 already playing (warmed per §2.3). No fade — the cut is the entrance. |
| cut +150 → +310 | Wordmark chars | `KOVRA` hero wordmark (Archivo expanded wdth 125, 800, 16vw, caps, tracking −0.02em): 5 char spans. Per char: `opacity 0→1`, `translateY(0.55em)→0`, 480ms each, `cubic-bezier(0.16, 1, 0.3, 1)` (easeOutExpo family). Stagger **40ms/char** → last char starts +160ms, all settled ~+630ms after its start. Chars are `aria-hidden` spans inside an `aria-label="KOVRA"` h1. |
| cut +150 → onward | Wordmark drift | The whole wordmark block simultaneously begins its scroll-linked exit: `translateY(calc(var(--p) × -60vh))` and `opacity: clamp(0, (0.06 − --p) × 16, 1)` — gone by p≈0.0625, fully transparent by p≈0.06. The char reveal plays *while* the drift begins; the block is already moving as it resolves. |
| cut +900 | Scene 01 text block arms | Field note + micro lines (not char-split): fade + `translateY(12px)→0`, 500ms, `ease-out`, triggered when `--p ≥ 0.07` (intro sequencing, 2026-09-16: the wordmark owns the viewport until its fade completes at p 0.0625; scene-01 copy then ramps in over p 0.0625–0.0875, symmetric on scroll-back). |
| cut +1200 | Scroll cue hairline | `SCROLL TO DESCEND` block in HUD bottom-center: 44px hairline `scaleX` 0→1, 600ms, `cubic-bezier(0.22, 1, 0.36, 1)`, `transform-origin: left`. |
| cut +1400 | Scroll cue text | `SCROLL TO DESCEND` label fades in, 400ms. Cue lives in the HUD (§7.3), visible only while `--p < 0.03`. |

**Total: ink → instrument frame in ~1.8–2.2s, wordmark resolved by ~+0.8s after cut.** Nothing bounces; every easing in the entrance is a decel.

### 4.1 Char-by-char rationing (ruling honored)

Char-split applies to exactly five strings: the opening `KOVRA` and the four place-names (`GLACIAL SOURCE`, `THE NARROWS`, `MILL TOWN`, `DELTA AT NIGHT`). Nothing else splits — not field notes, not HUD, not sight cards.

Place-name reveal spec: same per-char treatment as the wordmark (480ms, 40ms stagger, same easing), triggered:
- Scene 01: `--p ≥ 0.02` (after the wordmark has begun leaving — the two never fully coexist at rest).
- Scenes 02–04: at their cut line crossing (the reveal IS the scene's arrival beat).
- Reverse scroll back into a scene whose reveal already played: reveal stays played (one-shot per session; do not re-split on re-entry — re-splitting on every boundary crossing would strobe).

### 4.2 Scene text block entrance/exit

- Entrance: place-name chars (above), then field note + micro + detail as one block: fade + 12px rise, 500ms, delayed +300ms after the place-name's first char.
- Exit: **the cut.** No fade-out ramp. The outgoing text block is `visibility: hidden` in the same frame as the media swap. (This replaces v1's symmetric opacity clamps — v2 text does not dissolve, it is cut.)
- Within its scene window the block drifts on the 0.14 parallax (§4.3).

### 4.3 Parallax formulas (from art direction §7)

Per-scene drift: `D = clamp((--p − sceneStart) / 0.25, 0, 1)` where sceneStart ∈ {0, 0.25, 0.5, 0.75}. All parallax is `translate3d`/`translateY` only.

| Layer | Formula | Travel @900px vh |
|---|---|---|
| Far still | `translateY(calc(D × −4vh))` + `scale(1.06)` (headroom vs edge reveal) | 36px |
| Base media | `translateY(calc(D × −2vh))` + `scale(1.04)` | 18px |
| Tint + veil | none — locked to stage (factor 0) | 0 |
| Thread | **global, not per-scene:** `translateY(calc(var(--p) × −10vh))` — p-based so it is pixel-continuous across cuts (a per-scene D would jump 2.5vh at every boundary and break the continuity guarantee) | 90px total |
| POI markers | inherit thread transform (same SVG group) | with thread |
| Text block | `translateY(calc((D − 0.5) × 14vh))` — drifts from +7vh to −7vh around its anchor; the 0.14 factor reads as the text floating off the field faster than the world sinks | ±63px |
| HUD | none — `position: fixed` | 0 |

At 768: all per-scene factors halve (far 0.02, base 0.01, text ±7vh); thread global factor stays (continuity matters more than depth at this width). At 360: far stills are dropped entirely; base 0.01; text ±5vh.

---

## 5. Thread mechanics

### 5.1 Path definition

One SVG, one path, full stage: `viewBox="0 0 1200 760"`, `preserveAspectRatio="none"`, absolutely positioned `inset: 0` (v1 geometry kept). The path is a single continuous cubic chain entering from the top edge (~45% x) and exiting the bottom — v1's `M575 -20 C530 108 … 600 780` is kept as the starting geometry, **re-tuned per scene** so each scene's segment reads against its footage:

- Segment 1 (GLACIER): enters top ~45% x, draws downward through the pale field — the dark braid's line.
- Segment 2 (PINE): runs the dark central water corridor between tree masses.
- Segment 3 (MILL TOWN): crosses mid-frame at bridge height (see §5.5 — it dips *behind* the bridge band).
- Segment 4 (DELTA): flattens — wider, slower curves low in frame, ending bottom-center-ish; the line losing its banks with the river.

Coordinates are authored once in the SVG `d` attribute; nothing recomputes them at runtime. The path never re-routes, never blurs (ruling).

### 5.2 Draw mapping

`pathLength={1}`; both strokes carry `stroke-dasharray: 1; stroke-dashoffset: calc(1 - var(--p))` — pure CSS off the custom property, no JS per-frame path math. km↔draw identity: the thread's drawn fraction at `--p` is `--p` itself, and `km = round(--p × 412)`, so **a marker at km K sits at path fraction K/412 and triggers when `--p ≥ K/412`**. One mechanism, two readings.

### 5.3 POI markers

Four markers at km 118 / 224 / 271 / 412 → path fractions 0.2864 / 0.5437 / 0.6578 / 1.0000.

- Placement: JS measures the path once (`getTotalLength()` + `getPointAtLength(fraction × total)`) and positions each marker group at that point. Recompute on debounced resize only. (With `preserveAspectRatio="none"` the SVG user units stretch non-uniformly; `getPointAtLength` operates in user units, so markers placed via the same coordinate space land correctly on the stretched path — place markers as SVG elements inside the SVG, not as HTML overlays.)
- Anatomy: 6px mint dot (`#BCF2DC`) + 1px bone ring at 8px diameter.
- Activation & persistence: dot starts at 40% opacity; when `--p ≥` its fraction it goes to 100% and **stays lit for the rest of the session** — including through cuts and on reverse scroll (a passed marker never un-lights; the thread accumulates evidence). One-way latch, stored in the same rAF state, applied as a class.
- Lantern Quay (km 412, fraction 1.0) sits at the path's end — it lights at the terminal clamp.

### 5.4 Glow + stitch pulse

Three stacked strokes on the same `d` (v1's two, plus one):

| Stroke | Spec |
|---|---|
| shadow | v1 kept: `#06141E`, width 11, opacity 0.45, `blur(8px)` filter (static filter — applied once, never animated) |
| line | v1 kept: `#BCF2DC`, width 3, `drop-shadow(0 0 7px rgb(188 242 220 / 0.72))` (static) |
| glow (new) | `#BCF2DC`, width 9, `drop-shadow(0 0 14px rgb(188 242 220 / 0.8))`, **opacity 0.35 base** — this stroke's opacity is the only animated thread property |

**Stitch pulse (ruling: ≤ +40%, ≤300ms, once per stitch):** on every `sceneIdx` change (§2.2), set `data-stitch` on the thread SVG; CSS transitions glow opacity 0.35 → 0.49 (+40%) in 120ms `ease-out`, and a `transitionend`/timeout removes the attribute → 180ms back to 0.35. Total 300ms. Opacity-only — no filter animation, no box-shadow animation. Retriggering (fast scrub back and forth across a line) simply restarts the transition; do not queue pulses.

**Scene-scoped glow states (opacity of the glow stroke only):**
- Scene 04 (DELTA): base opacity raised 0.35 → 0.55 — on the near-black field the thread must be the brightest linear element in frame (art direction §3 scene 04). The pulse still fires on entry (0.55 → 0.77 → 0.55, same +40% ratio, same 300ms envelope).
- All other scenes: 0.35.

### 5.5 MILL TOWN thread dip (bridge beat, no KV-S4)

KV-S4 does not exist, so the art direction's "masked foreground layer" is unavailable. The beat is preserved with an **occlusion mask on the thread itself** — no drawn bridge, no procedural terrain:

- While `data-scene="03"` only, the thread SVG carries `mask-image: linear-gradient(180deg, #000 0%, #000 44%, rgba(0,0,0,0.28) 50%, rgba(0,0,0,0.28) 56%, #000 62%, #000 100%)` (−webkit- prefix included). The thread dims to 28% opacity across the horizontal band where KV-S3's bridge sits (bridge is mid-frame in the acquired still) — reading as the line passing behind the bridge's dark mass.
- The band's percentages are **tuned against the actual KV-S3 frame during implementation** (open question §13.1); the mechanism (scene-scoped CSS mask, opacity-only effect) is fixed.
- Fallback if the band can't be tuned to read correctly against the still: drop the mask entirely — the thread passes over the bridge. This is a critic-callable decision, not a silent one. The beat is "the thread dips under the bridge layer"; a dimmed crossing is the honest minimum, an invisible one is a failure of the scene, not of the mask.

### 5.6 DELTA brightness

Covered in §5.4 (glow base 0.55 in scene 04). Additionally the DELTA veil recipe (art direction §6 D) already drives mean luminance to ~18 — no further thread boost; resist adding one.

---

## 6. Per-scene choreography

Common to all scenes: layer stack per art direction §3 (media → far still → grade filter → tint → veil → text scrim → thread → POI/cards → text block → HUD). Veil and tint are **locked** — zero parallax, zero opacity animation within a scene window (they swap at cuts, hard). Grade filters are static per scene (applied always, not scrubbed).

### 6.1 SCENE 01 — GLACIER (`p 0–0.25`, km 000–103)

- **Visible:** KV-V1 video (base), KV-S1 still (far, upper band, opacity ~0.5 under veil), grade G, tint `#8FCBD8`/0.45, veil G, text block lower-left, thread entering top ~45% x.
- **Moves:** base media −2vh drift; far still −4vh; text block ±7vh around anchor; thread draws top→down on global −10vh drift; wordmark (overlay, not scene layer) drifts up −60vh and is gone by p≈0.06.
- **Anchored:** veil, tint, HUD.
- **Beats:** loader hard-cut arrival; wordmark char reveal + drift-out (p 0–0.06); place-name `GLACIAL SOURCE` char reveal at p≥0.02; text block arms +300ms later. No POI in this scene.
- **Perceived:** the cut from ink to high-key ice is the page's biggest single luminance event (~0 → ~210); the wordmark resolving over moving footage while already drifting is the hero moment.

**Optional rack-defocus (default OFF — ratified):** if enabled, outgoing media gains `blur(min(8px, 8px × clamp((--p − (end − 0.06)) / 0.06, 0, 1)))` in the final 6% of its window — a lens rack, never a fade. Ship state: OFF. If the critic requests it, it is a one-property addition per scene stack.

### 6.2 SCENE 02 — PINE (`p 0.25–0.5`, km 103–206)

- **Visible:** KV-V2 video, KV-S2 far still (fog band), grade P, tint `#2E6B5C`/0.5, veil P, text block, thread in the dark central corridor.
- **Moves:** standard drifts (§4.3); thread continues drawing.
- **Beats:** the ~65-point luminance drop at the cut — walking under the tree line; place-name `THE NARROWS` char reveal at the cut; **SIGHT 01 — Gorge Gate** card flies in when `--p ≥ 0.2864` (km 118), ~4% into the scene — early enough to read as part of the arrival, not a stray pop.
- **Perceived:** sudden enclosure; the thread now runs a dark corridor instead of open ice.

### 6.3 SCENE 03 — MILL TOWN (`p 0.5–0.75`, km 206–309)

- **Visible:** KV-S3 still (base — stills-only scene; motion comes from thread, parallax, cards), grade M, tint `#B07A3A`/0.45, veil M, text block. No far still, no mid still (KV-S4 not sourced).
- **Moves:** base still −2vh drift (the only motion on the media side — lean into it: this scene's stillness against the moving thread is the "human scale holds still while the river works" beat); thread with the §5.5 bridge-dip mask; **two** sight cards.
- **Beats:** cool→warm hue cut at 0.5; `MILL TOWN` char reveal; **SIGHT 02 — Bell Bridge** at `--p ≥ 0.5437` (km 224); **SIGHT 03 — Mill Wheel** at `--p ≥ 0.6578` (km 271). Two cards in one scene is the densest moment — they must not overlap: Bell Bridge anchors right of the thread, Mill Wheel anchors left (§8.2 side rule handles this naturally if the path's x at km 271 sits left of km 224's; verify at implementation and hard-code the side per card if the path geometry disagrees).
- **Perceived:** warmth arrives; the thread momentarily yields to the bridge and returns.

### 6.4 SCENE 04 — DELTA (`p 0.75–1.0`, km 309–412)

- **Visible:** KV-V3 video, KV-S5 far still (horizon band), grade D, tint `#2A3A8C`/0.55, veil D, text block, thread at glow 0.55.
- **Moves:** standard drifts; thread completes its draw.
- **Beats:** amber→indigo cut at 0.75; `DELTA AT NIGHT` char reveal; thread becomes the brightest linear element (§5.4); **SIGHT 04 — Lantern Quay** at `--p ≥ 0.995` — the terminal trigger and the card trigger are the same threshold; the card is the last arrival of the page, landing as the km counter forces to 412/412 and the terminal line appears. Choreograph the simultaneity deliberately: terminal line (HUD, +0ms), Lantern Quay card (+150ms delay so the HUD statement lands first), marker dot lights with the card.
- **Perceived:** everything darkens until the instrument's line is what remains; the page ends on evidence, not a footer.

---

## 7. HUD motion

The HUD is `position: fixed`, z-topmost, bone `#F2EDE4` everywhere, never unmounts, never fades as a layer, never re-grades. **The only animations permitted inside the HUD are within-element fades ≤200ms and the progress fill.**

### 7.1 km counter

- `KM {n} / 412`, IBM Plex Mono 500 14px, `font-variant-numeric: tabular-nums`.
- Update rule: `n = (--p ≥ 0.995) ? 412 : Math.round(--p × 412)`; write `textContent` **only when n changes** (string compare in the rAF tick — avoids 60fps text mutation). No easing, no tweening, no odometer roll — the digits track the lerp, which is already smooth (ruling: no easing theater).
- Monotonic by construction (`--p` is monotonic under forward scroll; reverse scroll legitimately decreases it).

### 7.2 Scene index

- `SCENE 0{n}/04 — {NAME}`, swaps at cut lines via the same `sceneIdx` change that drives `data-scene` (§2.2). Swap is a hard text swap — no fade (it must be frame-identical in timing with the media cut for the critic's frame-step check).

### 7.3 Bottom-center line (three-state)

Three stacked spans, one visible:

| State | Condition | Content |
|---|---|---|
| scroll cue | `--p < 0.03` | `SCROLL TO DESCEND` + 44px hairline (entrance per §2, at cut+1200/1400ms) |
| field-note mirror | `0.03 ≤ --p < 0.995` | `FIELD NOTE {001/118/224/412}` — mirrors the active scene's text-block micro; swaps hard at cut lines with the scene index |
| terminal line | `--p ≥ 0.995` | `THE RIVER LEAVES EVIDENCE.` (mono, bone, 60%) |

Transitions between states: 180ms opacity fade **within the HUD only** (this is the sanctioned exception to "no fades" — it is inside the instrument, not between scenes). The cue→mirror swap at p=0.03 is early enough that it never coincides with a scene cut.

### 7.4 Progress bar

- Full-width 1px bone/20% track; mint fill `width: calc(var(--p) × 100%)` — CSS off `--p`, no JS. Ticks: three 1px bone/40% vertical marks at 25/50/75% (scene boundaries), static.
- Fill width mutation is layout-affecting on a 1px element — acceptable (paint area is negligible); alternative `scaleX` with `transform-origin: left` is preferred if the frame harness flags it: `transform: scaleX(var(--p))`.

### 7.5 Static HUD elements

Brackets, wordmark block, `FIELD RECORD / RIVER DESCENT`, telemetry `62°24′N / DESCENT 1410 M` (mock), `KOVRA / an unbroken thread` micro-label (bottom-left, permanent — absorbed from the deleted v1 footer): zero motion, ever.

---

## 8. Sight cards

### 8.1 Arrival

- **Trigger:** `--p ≥ km/412` (the v1 dashoffset value — same number, reused; no new mechanism). One-shot latch per card per session (like markers); on reverse scroll below the trigger the card dismisses (§8.3) and re-arms? **No** — the card re-arms on reverse (dismiss is real), but the marker stays lit. Card and marker have different persistence rules: markers latch, cards track the trigger.
- **Animation:** 450ms, `cubic-bezier(0.22, 1, 0.36, 1)` (easeOutQuint family — strong decel, no overshoot; an overshoot would read as bounce, banned register). From the marker's screen position: `translate(24px, 0) scale(0.96)` → `translate(0, 0) scale(1)`, `opacity 0→1`. Transform origin: the card edge nearest the marker.
- **Direction (side rule):** the card offsets **away from the lower-left text block** — i.e., it flies in from the marker toward the right/upper-right of the thread point, +24px along +x, unless the marker's x is in the right third of the viewport, in which case it mirrors (−24px). Mill Town's two cards may need per-card hard-coded sides (§6.3). The 24px offset is the "from the marker" read; the card's resting position is adjacent to the thread point, clamped to stay ≥24px from viewport edges and clear of the text block's bounding box.

### 8.2 Anatomy & persistence

- Instrument card per art direction §9: ink `#05080C`/92%, 1px bone/15% border, one bracket corner (bottom-right, bone/40%), mono label `SIGHT 0n / KM {km}`, Archivo expanded 700 caps 20px name, one-line note bone/62% 13px/1.55. Width `min(280px, 72vw)`. **No backdrop-filter, no blur, no glass.**
- Cards are scene media: they cut with their scene (`visibility` swap at the boundary, same frame as everything else). The marker dot persists (thread layer).
- `pointer-events: auto` on the card only; the thread SVG and markers stay `pointer-events: none`.

### 8.3 Dismissal + hover

- Dismiss (reverse scroll below trigger, or scene cut): reverse of arrival — `translate(24px, 0) scale(0.96)`, opacity → 0, **250ms**, same easing. Scene cuts dismiss instantly (visibility swap, no animation — cut discipline outranks card animation).
- Hover nudge: `translate(0, -2px)`, 150ms `ease-out`, transform only. **This is the only card interaction.** No growth, no glow, no lift shadow.
- Mobile (<768): cards become bottom-anchored full-width strips (width `86vw`, same anatomy) — arrival becomes a slide-up: `translateY(24px) → 0` + opacity, same 450ms/450ms-reverse envelope, anchored to the bottom edge above the progress bar. Same trigger, same latch rules.

---

## 9. Cursor + grain

### 9.1 Cursor (ratified: kept, constrained)

- 6px mint `#BCF2DC` dot, `position: fixed`, `mix-blend-mode: difference`, `pointer-events: none`, z above HUD.
- **Augments, never replaces:** the native cursor stays visible (`cursor: auto` everywhere; no `cursor: none`).
- Follow: lerp **0.35** per frame in the same shared rAF loop (snappier than the 0.14 scrub — a cursor that lags at 0.14 reads broken; at 0.35 it trails just enough to feel analog). Position via `translate3d`, no layout.
- **Hover growth: none.** Ruled out — the native cursor already signals interactivity; growing the dot is decoration without instrument function (anti-pattern §8.8). The dot is ambience, not affordance.
- Disabled: `pointer: coarse` (touch) and `prefers-reduced-motion: reduce`. Implementation: matchMedia gates at mount + `change` listener; when disabled the element is `display: none`.

### 9.2 Grain (ratified: kept, sub-perceptual, static)

- One fixed layer, monochrome SVG-noise data-URI (feTurbulence, tiled), `opacity: 0.035`, `pointer-events: none`.
- **Never animated** — no keyframes, no background-position shifts, no opacity oscillation. It is a texture, not an effect.
- Z-order: above the media stacks + veils, **below** text blocks, sight cards, thread, and HUD. It binds the footage sources; it must never sit on the instrument layers.
- Acceptance: invisible as speckle at 100% zoom; if the critic sees it, drop the layer entirely (ratified fallback) — do not tune opacity below 0.035, delete instead.

---

## 10. Reduced motion (full collapse — ruling honored)

`matchMedia("(prefers-reduced-motion: reduce)")` at mount, with a `change` listener (dynamic flip re-renders into reduced mode; leaving reduced mode re-initializes the full system).

**Behavior list (complete):**

1. **No loader.** The loading state is skipped entirely; page renders directly in collapsed form.
2. **No sticky stage.** The track collapses: the four scenes become four stacked, in-document-order, full-bleed sections (`min-height: 100dvh` each), normal document scroll, native scrolling (Lenis not instantiated).
3. **Media:** each scene shows its graded still — video scenes use their poster jpgs as `<img>` (KV-V1-poster, KV-V2-poster, KV-V3-poster); KV-S3 as-is. Same grade/tint/veil recipes (they're static CSS — they survive the collapse). No video playback, no parallax.
4. **Thread:** rendered fully drawn as a static SVG per scene segment (the one continuous path is fine as-is with `stroke-dashoffset: 0`; if per-scene stacking breaks the single-SVG approach, render the path once per scene section clipped to that scene's km band — implementation's choice, the requirement is "fully drawn, static"). Glow at base opacity, no pulses. POI markers all lit, positioned statically; sight cards rendered inline below their marker, statically visible (no fly-in).
5. **No char reveals.** Wordmark and place-names render as plain text, fully visible.
6. **No parallax** anywhere; all drift transforms removed.
7. **No custom cursor.**
8. **HUD:** static, fixed. Scene index **unmounts** (four scenes are simultaneously visible stacked — a single index would be wrong; art direction §10 ruling). km reads `412 / 412` fixed. Progress bar full. Bottom-center shows the terminal line `THE RIVER LEAVES EVIDENCE.` permanently. Brackets, wordmark, telemetry, thread-label all present and static.
9. **Everything remains fully functional:** all copy readable, all four sight cards visible with full text, focus order = document order (actually improved by the collapse).

---

## 11. Responsive motion deltas

| Width | Media | Motion changes |
|---|---|---|
| ≥768 (reference 1440) | 3 videos + all stills | Full system (this spec). |
| 768–361 | Videos → poster `<img>` (no `<video>` element rendered); far stills kept | Parallax factors halved (§4.3); HUD drops flavor telemetry; everything else identical. Track `calc(100dvh + 2000px)`. |
| 360 | Stills only; far stills (KV-S1/S2/S5) dropped — base + veil + thread only | Wordmark 16vw (~58px) optically centered; place-names 10vw; text block docks lower-third full-width (6vw insets) above the progress bar; sight cards → bottom-strip variant (§8.3); HUD minimal: brackets (16px inset, 20px arms), scene index, km bottom-left, progress bar. |

The sticky stage + thread + HUD structure survives at every width — recomposition, not stacking (art direction §11).

---

## 12. Performance contract

**Animated properties — allowed:** `transform` (translate3d/scale), `opacity`, `stroke-dashoffset` (SVG paint on a small layer — the core mechanic, sanctioned), `width` on the 1px progress fill (or `scaleX` if flagged), `textContent` on change-only. **Everything else static.**

Explicit bans: animated `filter` (all filters — thread drop-shadows, grade chains, grain — are applied once and never tweened), animated `box-shadow`, animated `background-position`, `backdrop-filter` anywhere, layout-triggering animations on elements larger than the 1px progress fill.

**Video discipline:**
- All videos: `muted`, `loop`, `playsinline`, `preload="auto"`, `poster` set. No audio track, no autoplay attribute (playback is triggered in JS during loader warm-up — muted playback is policy-legal).
- **Only the active scene's video plays.** On `sceneIdx` change: `play()` the new scene's video if `readyState ≥ 2`, `pause()` all others. Paused videos keep their last frame (that frame is what the poster-free cut shows — posters are the pre-play face).
- `IntersectionObserver` on the `<main>` element (threshold 0): when the proof scrolls out of view (page continues past the track, if the showcase mounts siblings), pause all videos and cancel the rAF loop; on re-entry, resume. One observer, one boolean, no per-video observers.
- `document.visibilitychange`: pause everything (rAF + videos), resume on visible.

**will-change hygiene:** `will-change: transform` only on the thread SVG, the cursor dot, and the active text block — set statically on thread/cursor; the text block's is acceptable as a static declaration (4 elements, never churned). No `will-change` on media layers (the scale headroom already promotes them), no `will-change: opacity` anywhere.

**Images:** stills are `<img>` with explicit `width`/`height` attributes (KV-S1/S2/S3/S5 intrinsic sizes) to prevent layout shift; `loading="eager"` + `fetchpriority="high"` on KV-S3 and the three posters (above-fold-or-cut-critical), default eager on the rest (they're needed by the first cut sequence anyway — nothing in this proof is legitimately lazy).

**Frame budget:** target ≥55fps at 1440×900 in the `.verify` fps harness. The per-frame JS work is: one `getBoundingClientRect` read (batched at tick start, before all writes — never interleave), ~6 custom-property/style writes, 1–2 conditional text writes. Composited work: 3 video layers (1 playing), 4 stills, thread paint. If the harness flags the thread's per-frame `stroke-dashoffset` repaint, the sanctioned optimization is splitting the thread into 4 scene-scoped path segments and only mutating the active segment's dashoffset — take it only on evidence, not preemptively.

---

## 13. Open questions for implementation

1. **KV-S3 bridge band coordinates (§5.5):** the occlusion mask's 44/50/56/62% stops are estimates against the acquired still's composition. Tune visually; if no band reads correctly, drop the dip (thread passes over) and note it for the critic.
2. **Mill Town card sides (§6.3):** confirm from the final path geometry whether km 224 and km 271 markers need hard-coded opposite sides or whether the §8.1 side rule resolves them naturally.
3. **768 track length:** art direction specifies 3600px (desktop) and 2000px (360); I assigned v1's 2000px to all <768. If 768–361 feels rushed at 2000px, the knob is `calc(100dvh + 2800px)` — one value, decide in review.
4. **Loader timeout (§2.2):** 6000ms hard ceiling is my call; if the showcase's other proofs establish a different patience convention, match it.
5. **Rack-defocus:** ships OFF (§6.1). Confirm it stays off in review rather than silently implementing the flag.

---

## 14. Acceptance criteria (visual-critic, observable)

Verify at 1440×900 with screenshots, a scroll-through video, and frame-stepping at the three cut lines. 768/360 variants noted where they differ.

**Entrance**
- E1. Loader shows: ink field → four brackets drawn (≤600ms) → exactly three mono status lines appearing in sequence (~400ms apart), third reading `LOADING FOOTAGE 07/07`. No spinner, no ring, no percentage.
- E2. Loader → GLACIER is a hard cut: no frame shows ink and footage blended; the first footage frame is a playing video (or its poster mid-warm), not a gradient.
- E3. Wordmark `KOVRA` resolves char-by-char (left→right, ~40ms/char, rise + fade, no bounce) while already drifting upward; fully transparent by p≈0.06.
- E4. Scroll cue appears last (~+1.4s after cut), reads `SCROLL TO DESCEND` with a 44px hairline, and is gone (hard swap to field-note mirror) by p=0.03.

**Scroll & state**
- S1. `--p`-driven motion shows instrument lag: thread draw and km counter trail the wheel slightly, smoothly, with no jitter and no rubber-band overshoot.
- S2. km counter is tabular (digits don't shift width), monotonic forward, updates every frame `--p` changes, reads exactly `412 / 412` at terminal.
- S3. Scene index text matches the visible scene at every sampled scroll position, including immediately after frame-stepping across each boundary.

**Cuts**
- C1. Frame-stepping across p=0.25/0.5/0.75: media, veil, tint, and text block swap within ≤2 captured frames; zero intermediate blend/opacity frames; zero motion-blur-like cross-fade frames.
- C2. Thread pixels (position, stroke, glow) and all HUD pixels are identical in the frame before and the frame after each cut.
- C3. Exactly one glow pulse fires per boundary crossing: ≤ +40% brightness on the thread glow, ≤300ms total, once (scrubbing back and forth across a line restarts, never stacks, pulses).

**Thread & sights**
- T1. Thread is one continuous path across all four scenes; stroke `#BCF2DC` ±8; enters top ~45% x; no discontinuity at any boundary; never blurred.
- T2. In MILL TOWN the thread visibly dims across the bridge band (or, if the dip was dropped per §13.1, passes over cleanly — critic rules which ships).
- T3. In DELTA the thread is the brightest linear element in frame.
- T4. Each sight card flies in from its marker's position (~450ms, strong decel, no overshoot) exactly when the drawn thread tip passes the marker's km; card text matches §9 of the art direction; no glass/blur on the card.
- T5. Passed markers stay lit through subsequent cuts and on reverse scroll; cards dismiss on reverse scroll (~250ms) and re-fly on re-approach.
- T6. Lantern Quay's card, the 412/412 km readout, and the terminal line `THE RIVER LEAVES EVIDENCE.` land together at the terminal clamp (card ≤150ms after the HUD line); no footer, no rewind UI exists.

**HUD**
- H1. Bone `#F2EDE4` ±4 sampled at all four bracket locations in all four scenes (constant-tone rule).
- H2. Progress fill matches `--p` ±2%; ticks visible at 25/50/75%.
- H3. Bottom-center shows exactly one of: cue / field-note mirror / terminal line at any sampled p; transitions between them fade ≤200ms and never coincide with a scene cut.

**Motion hygiene**
- M1. No element other than thread glow opacity, card transforms, char reveals, HUD micro-fades, and the sanctioned transforms animates anywhere; zero `backdrop-filter` in computed styles; grain static (two screenshots 1s apart at rest are pixel-identical outside video regions).
- M2. Cursor: 6px mint dot trailing the pointer (lerp-visible), native cursor still visible, dot absent on touch emulation and under reduced motion; dot never grows on hover.
- M3. Grain invisible as speckle at 100%; absent over HUD, text, and cards.

**Performance**
- P1. fps harness ≥55fps median during a full scroll-through at 1440×900; no frame >100ms during cuts.
- P2. Only the active scene's video is playing at any sampled moment (three paused, one playing); all videos pause when the proof is scrolled out of view and on tab blur.

**Responsive**
- R1. 768: zero `<video>` elements in the DOM (posters only); flavor telemetry absent; parallax visibly reduced.
- R2. 360: no horizontal overflow at any p; text block lower-third full-width; sight cards bottom strips sliding up; stage uses `100dvh`.
- R3. Reduced motion: four stacked graded still scenes in document order, thread fully drawn and static, all sight cards visible inline, HUD static with km `412 / 412`, scene index absent, no loader, no cursor dot, full copy readable, keyboard focus order = document order.

---

*End of spec. Implementation dispatches from here; deviations from this document get logged against the section number, not silently absorbed.*
