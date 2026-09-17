# KOVRA v2 — Art Direction + Shot Manifest

**Date:** 2026-09-16 · **Author:** creative-director (kimi-k3) · **Status:** implementation-ready spec
**Scope:** `showcase/src/proofs/cinematic-scroll-story/` KOVRA variant rebuild. Spec only — no production code here. Frontend specialist implements from this document; choreography detail is deferred to motion-director (P4).
**Upstream:** approved plan `docs/superpowers/specs/2026-09-16-kovra-flagship-design.md`; reference teardown `showcase/references/kovra-v2.md`; concept thesis `showcase/directions.md` §Cinematic Scroll Story → A - KOVRA.

**Evidence basis.** The five reference captures (`showcase/.verify/refs/{landonorris,igloo,lusion,oimachi,21hrs}/*.png`) were inspected directly this session. What is *known* from them vs *inferred* vs *proposed* is marked where it matters. Nothing in this spec claims an asset exists — the shot manifest (§14) is a search brief for asset-director (P3), not an inventory.

---

## 1. Creative concept

**One river, four colors of light — a recovered field instrument plays back four hard-cut territories of real footage, and the only things that survive every cut are the thread and the instrument itself.**

v1 faked the world procedurally and hung panels on it. v2 inverts the burden of proof: real footage carries the world; the document layer (HUD, thread, mono telemetry) carries the fiction. The doc register from v1 ("Nobody owns the first kilometer. The ice keeps it.") is intact — but it now reads as telemetry over evidence, not poetry over illustration.

## 2. Design principles

Each principle is falsifiable — a critic can fail the build against it from screenshots.

1. **Footage is the terrain.** Every scene's ground truth is photographic media (video or graded still). If a screenshot region reads as procedural gradient or SVG illustration, the build fails. (Board: v1 deficiency #3; igloo/21hrs full-bleed fields.)
2. **Only thread + HUD survive a cut.** At every scene boundary, media, veil, palette, and text swap within one frame — no cross-fade, no blend frame. The thread path and the entire HUD layer are pixel-continuous across the boundary. (Board: lusion locked white frame; landonorris lime surviving a 207-point cut.)
3. **The instrument never re-colors.** HUD tone (bone) and signal accent (thread mint) are constant across all four scenes. Scene identity lives exclusively in media + veil. If any UI element changes hue between scenes, the build fails. (Board: 21hrs cream instrumentation tokens constant across states.)
4. **Luminance is the narrative arc.** The four scenes descend in measured full-frame mean luminance — glacial high-key → pine shadow → amber dusk → indigo night — with ≥60-point steps between adjacent scenes. Brightness, not hue, is the primary story beat. (Board: landonorris 247 → 177 → 40.)
5. **Depth is fog, not perspective.** Each scene carries a top-to-bottom atmospheric veil producing a ≥50-point band-luminance delta; text floats over the dark zone as instrumentation. No fake 3D, no WebGL, no layered SVG ridges. (Board: igloo measured 181 → 122.)
6. **Sights are pinned to the thread, not to a rail.** POI markers sit at km positions on the drawn path; cards arrive when the thread draws past them. No detached horizontal slider. (Board: 21hrs POI markers on the map surface; v1 deficiency #4.)
7. **Restraint is the sensory layer.** No grain you can see, no cursor you must learn, no sound you didn't ask for. The board's consensus spine is HUD + smooth scroll + mono companion — nothing noisier earns its place. (Board: grain 0/5, custom cursor 0/5, sound 2/5.)

## 3. Scene specs ×4

Scene windows on scroll progress `--p` (v1's sticky 100vh stage + `calc(100vh + 3600px)` track + lerp 0.14 unchanged): GLACIER `p 0–0.25`, PINE `0.25–0.5`, MILL TOWN `0.5–0.75`, DELTA `0.75–1.0`. Cut lines at 0.25 / 0.5 / 0.75. km counter maps linearly: `km = round(p × 412)`.

Universal layer stack (bottom → top): **base media** (video or still, `object-fit: cover`) → **far still** (optional second photographic layer) → **grade filter** (CSS filter chain on media) → **scene tint** (mix-blend `color` layer) → **atmospheric veil** (CSS linear gradient) → **text scrim** (local gradient behind text block) → **thread SVG** → **POI markers + sight cards** → **scene text block** → **HUD** (fixed, topmost).

---

### SCENE 01 — GLACIER (`p 0–0.25`, km 000–103)

**Focal structure.** High-key glacial expanse; the river is a dark braid cutting through pale ice. Horizon sits high (upper third); the lower half is veil-built shadow where the text lives. The hero moment: giant KOVRA wordmark over the footage at `p 0`, drifting up and out as the descent begins; scene text block arrives by `p 0.04`.

**Media stack:**
- `KV-V1` glacial river aerial video (≤8s loop, slow forward drift) — base layer.
- `KV-S1` glacier wall / ice-covered peaks still — far layer, upper band, low opacity under veil (adds horizon detail where the video's sky is weak).
- Grade + tint + veil per §6 recipe G.
- Thread enters from top edge (~45% x) and draws downward.

**Text placement + copy (v1 voice, kept):**
- Place-name `GLACIAL SOURCE` — lower-left text zone (~8vw left, ~62% height), char-by-char reveal on scene entry.
- Field note: *"Nobody owns the first kilometer. The ice keeps it."*
- Micro: `KOVRA / FIELD NOTE 001` · detail line: `Blue hour under permanent weather`.

**Palette:** ground `#0B2436` · veil top `#D7F0F2` → bottom `#07161F` · text bone `#F2EDE4` · scene tint `#8FCBD8` · signal accent (constant) `#BCF2DC`.

**Hard-cut behavior.** In: from loader — instant, loader black → glacial footage (the cut IS the entrance). Out at `p 0.25`: video frame, veil, and text swap to PINE in one frame; thread and HUD uninterrupted; thread glow pulses once at the stitch (motion-director's call, amplitude ≤ +40% glow for ≤300ms).

---

### SCENE 02 — PINE (`p 0.25–0.5`, km 103–206)

**Focal structure.** The river narrows between dark conifer walls; camera lower, closer to the water than scene 01. Vertical tree masses frame a dark central water corridor — the thread runs down that corridor. Mean luminance drops ~65 points from GLACIER: the first hard beat of the arc.

**Media stack:**
- `KV-V2` forest river drone video (≤8s loop, low follow over water) — base layer.
- `KV-S2` misty pine valley still — far layer, upper band (fog depth behind the video's tree line).
- Grade + tint + veil per §6 recipe P.
- POI: **SIGHT 01 — Gorge Gate, km 047**… wait — km accounting: scene 02 spans km 103–206, so Gorge Gate sits at **km 118** (corrected from v1's note numbering; field-note numbers and km are now the same system — see §9).

**Text placement + copy (modified from v1's gorge note — new copy, listed in §14):**
- Place-name `THE NARROWS` — lower-left, char-by-char.
- Field note: *"The river narrows until the mountain has to listen."* (v1 line, kept — it fits the pine corridor.)
- Micro: `KOVRA / FIELD NOTE 118` · detail: `Split pine, black water, and a hard white current`.

**Palette:** ground `#0A1F1A` · veil top `#4E7A6E` → bottom `#04110D` · text bone `#F2EDE4` · scene tint `#2E6B5C` · accent constant.

**Hard-cut behavior.** In at 0.25: instant swap from glacial high-key to forest shadow — the single largest luminance cut of the page (~65 points); it should feel like walking under the tree line. Out at 0.5: instant swap to amber dusk.

---

### SCENE 03 — MILL TOWN (`p 0.5–0.75`, km 206–309)

**Focal structure.** Human scale: an old bridge crosses the river at frame center; timber facades and warm window light on the far bank. The warmest scene and the emotional midpoint — lantern amber pools against dusk. This is the scene where the thread passes *under* the bridge (v1's bridge beat, kept conceptually): the bridge is photographic now, and the thread dips behind the bridge layer (thread z-index below the bridge still's masked foreground layer — see §7).

**Media stack:**
- `KV-S3` old bridge over river at dusk — base still (this scene is stills-only under the 3-video budget; motion comes from thread draw + parallax + the arriving sight cards).
- `KV-S4` watermill wheel / timber facade with warm windows — mid layer, offset right, parallax 0.07.
- Grade + tint + veil per §6 recipe M.
- POIs: **SIGHT 02 — Bell Bridge, km 224** · **SIGHT 03 — Mill Wheel, km 271**.

**Text placement + copy (v1, kept):**
- Place-name `MILL TOWN` — lower-left, char-by-char.
- Field note: *"Every wheel in town remembers the shape of the water."*
- Micro: `KOVRA / FIELD NOTE 224` · detail: `A working river, measured in timber and light`.

**Palette:** ground `#1A0F08` · veil top `#8A5A2E` → bottom `#0E0804` · text bone `#F2EDE4` · scene tint `#B07A3A` · accent constant. **Note:** amber `#F4C777` (v1's UI accent) is demoted from UI — it now lives only inside this scene's footage/veil warmth. UI stays bone + mint.

**Hard-cut behavior.** In at 0.5: pine teal → amber dusk, instant. The hue swing (cool → warm) is the beat; the luminance step (~65) carries it. Out at 0.75: instant swap to indigo night — warm windows to black water.

---

### SCENE 04 — DELTA (`p 0.75–1.0`, km 309–412)

**Focal structure.** Near-black tidal flats; the river loses its banks and spreads. A low indigo horizon glow in the upper band; lantern reflections as the brightest small elements in frame. The darkest scene (mean ~18–25) — the thread's mint glow is the brightest linear element, which is the point: at the end of the descent the instrument's line is what remains.

**Media stack:**
- `KV-V3` night water video (≤8s loop, dark surface with light reflections, macro-to-aerial) — base layer.
- `KV-S5` twilight estuary / tidal flats still — far layer, horizon band.
- Grade + tint + veil per §6 recipe D.
- POI: **SIGHT 04 — Lantern Quay, km 412** — the terminus; its card is the last arrival of the page.
- Terminal state at `p → 1`: km readout lands on `412 / 412` and stops; thread fully drawn; closing line replaces the scroll cue in the HUD bottom-center: `THE RIVER LEAVES EVIDENCE.` (mono, bone, 60%).

**Text placement + copy (v1, kept):**
- Place-name `DELTA AT NIGHT` — lower-left, char-by-char.
- Field note: *"At the edge, KOVRA forgets its name and becomes everything."*
- Micro: `KOVRA / FIELD NOTE 412` · detail: `Tidal flats, lanterns, and the last clear reflection`.

**Palette:** ground `#060913` · veil top `#1B2350` → bottom `#03050C` · text bone `#F2EDE4` · scene tint `#2A3A8C` · accent constant.

**Hard-cut behavior.** In at 0.75: instant, amber → indigo. Out: none — the thread ends; the page ends. No footer reveal, no rewind, no credits. (The v1 footer line "KOVRA / an unbroken thread" moves into the HUD bottom-left as a permanent micro-label.)

## 4. Typography system

**Two families, both open-license (OFL), both on Google Fonts + fontsource. No other fonts.**

| Role | Family | Why this register |
|---|---|---|
| Display + UI | **Archivo** (variable: wdth 62.5–125, wght 100–900) — `@fontsource-variable/archivo` | The board's display faces (Futura on 21hrs, Aeonik on lusion/oimachi, Mona Sans on landonorris) are geometric/neutral grotesks used as monumental caps. Archivo's variable width axis gives expanded cuts (wdth 125) at black weights — the closest open route to that expedition-plaque register. One family covers hero wordmark, place-names, nav, and CTA without mixing voices. |
| Instrument / telemetry | **IBM Plex Mono** (400/500) — `@fontsource/ibm-plex-mono` | Literally the board's HUD face (igloo). Tabular figures for the live km counter. The grotesk + mono pairing is the board's measured consensus (3/5). |

**Deliberate break from v1:** Cormorant Garamond is dropped. The serif read as literary prototype; v2 is a field instrument. Hierarchy now comes from weight/width contrast *within* Archivo (expanded black caps vs light sentence-case), not from a second serif voice.

**Scale (vw-driven, 1440 reference):**

| Element | Spec |
|---|---|
| Hero wordmark `KOVRA` | Archivo expanded (wdth 125) 800, **16vw**, caps, tracking −0.02em, line-height 0.8. Justification: the board's only display-as-subject reference (21hrs `MOON`) measures ~30vw for 4 glyphs ≈ full-bleed; 5 glyphs at 16vw spans ~80% of frame — same monumental mass without colliding with the corner HUD. At 360px this is ~58px — still the largest element on screen. |
| Scene place-name | Archivo expanded 700, **8.5vw**, caps, tracking 0.01em, line-height 0.9. Char-by-char reveal (oimachi pattern, sparing — transfer 6). |
| Field note (the poetic line) | Archivo 300, **2.2vw** (clamp 18–34px), sentence case, tracking 0, line-height 1.25, max-width 16ch–20ch. Light weight against the black place-name is the only emphasis mechanism — no italics, no second family. |
| Mono micro (notes, details, HUD labels) | IBM Plex Mono 400, 12px at 1440 (0.75rem), uppercase, tracking 0.14em, line-height 1.6. |
| km readout / scene index | IBM Plex Mono 500, 14px, uppercase, tracking 0.1em, `font-variant-numeric: tabular-nums`. |
| Wordmark in HUD | Archivo expanded 700, 15px, caps, tracking 0.18em. |

**Casing conventions:** display = all caps; mono = all caps; field notes = sentence case. Tracking: caps get positive tracking at small sizes, negative at display sizes; sentence case never tracked.

## 5. Color system

**The arc is luminance-first.** Four hard-graded scene palettes, measured as full-frame mean luminance (0–255, board method: band-averaged screenshot means):

| Scene | meanLum target | Step |
|---|---|---|
| 01 GLACIER | **210 ± 8** | — |
| 02 PINE | **145 ± 8** | Δ65 |
| 03 MILL TOWN | **80 ± 8** | Δ65 |
| 04 DELTA | **18 ± 8** | Δ62 |

All adjacent steps ≥60 — contract for the visual critic. The veil (not raw footage) guarantees the numbers; asset-director grades to target, critic measures.

**Constant layer (never re-colors):**

| Token | Hex | Role |
|---|---|---|
| `bone` | `#F2EDE4` | All HUD text, brackets, thread-adjacent mono, progress track. The 21hrs cream-instrumentation pattern. |
| `signal` | `#BCF2DC` | Thread stroke + glow. The one surviving signal accent across all cuts (the lime role). Kept from v1 verbatim — the mechanic is already built and proven. |
| `ink` | `#05080C` | Loader field, sight-card ground, deepest scrim stop. |

**Per-scene palette (media + veil only):**

| Scene | Ground | Veil top → bottom | Scene tint (blend) | Local flare (footage only) |
|---|---|---|---|---|
| GLACIER | `#0B2436` | `#D7F0F2` → `#07161F` | `#8FCBD8` | glacial cyan in ice |
| PINE | `#0A1F1A` | `#4E7A6E` → `#04110D` | `#2E6B5C` | moss green in canopy gaps |
| MILL TOWN | `#1A0F08` | `#8A5A2E` → `#0E0804` | `#B07A3A` | lantern amber `#F4C777` in windows |
| DELTA | `#060913` | `#1B2350` → `#03050C` | `#2A3A8C` | warm reflection `#E8A86B` on water |

**Contrast contract (AA):** bone `#F2EDE4` (relative luminance ≈ 0.79) needs a background ≤ ~60/255 mean luminance for 4.5:1. Therefore: **every text/HUD zone in every scene must be veiled or scrimmed to ≤60 meanLum locally** — including GLACIER, whose field is bright. The veil's lower half plus the local text scrim deliver this; the critic measures the region behind the longest text line. Corner zones (brackets) get the same guarantee from the veil's edge darkening.

## 6. Imagery & treatment

**Footage-first policy.** Base layer of every scene is photographic. v1's SVG ridge, procedural gradients, CSS stars, and drawn bridge are deleted, not restyled.

**Grade recipes (CSS-implementable; no ffmpeg, no re-encoding).** Starting values — the luminance targets in §5 are the contract; tune per asset:

| Scene | Media filter | Scene tint layer | Veil gradient |
|---|---|---|---|
| G — GLACIER | `saturate(.8) brightness(1.05) contrast(1.05)` | `#8FCBD8`, `mix-blend-mode: color`, opacity .45 | `linear-gradient(180deg, rgba(215,240,242,.06) 0%, rgba(16,46,64,.45) 58%, rgba(7,22,31,.82) 100%)` |
| P — PINE | `saturate(.85) brightness(.92) contrast(1.06)` | `#2E6B5C`, color, .5 | `linear-gradient(180deg, rgba(78,122,110,.10) 0%, rgba(10,31,26,.5) 55%, rgba(4,17,13,.85) 100%)` |
| M — MILL TOWN | `saturate(1.05) brightness(.85) contrast(1.08) sepia(.22)` | `#B07A3A`, color, .45 | `linear-gradient(180deg, rgba(138,90,46,.12) 0%, rgba(26,15,8,.55) 55%, rgba(14,8,4,.88) 100%)` |
| D — DELTA | `saturate(.75) brightness(.7) contrast(1.12)` | `#2A3A8C`, color, .55 | `linear-gradient(180deg, rgba(27,35,80,.14) 0%, rgba(8,11,26,.6) 50%, rgba(3,5,12,.92) 100%)` |

Plus per scene: a **text scrim** — `linear-gradient(90deg, rgba(5,8,12,.55) 0%, transparent 60%)` — behind the lower-left text block only.

**Grain decision: keep, sub-perceptual.** The approved flagship spec §4.3 lists film grain; the board measures grain 0/5. Resolution: one **static** (non-animated) monochrome SVG-noise layer at **opacity 0.035**, fixed, `pointer-events: none`, sitting **over the media stack only — never over HUD or text**. Its job is not "film aesthetic"; it is to bind heterogeneous stock sources into one developed stock (anti-stock-photo measure). Acceptance: if grain is visible as speckle in a 100% screenshot, it fails. No animated grain, ever (GPU + noise-floor cost, zero board precedent).

**Anti-stock-photo measures:** (1) every asset is graded to its scene's arc — raw Pexels color never ships; (2) every asset sits under its scene veil — no naked media; (3) subject abstraction — aerials, macros, fog, dusk: footage reads as *territory*, not as a recognizable stock hero shot; (4) any clip that cannot hit its scene's luminance target after the CSS recipe is rejected and substituted (fallback terms in §14).

## 7. Depth model

No WebGL. Depth = photographic layering + fog + differential parallax. Parallax factors are fractions of scroll-driven scene drift; footage stays believable (≤8% viewport travel on any media layer).

| Layer | GLACIER | PINE | MILL TOWN | DELTA | Parallax factor |
|---|---|---|---|---|---|
| Far still (horizon) | KV-S1 | KV-S2 | — | KV-S5 | 0.04 |
| Base media | KV-V1 video | KV-V2 video | KV-S3 still | KV-V3 video | 0.02 |
| Mid still | — | — | KV-S4 (bridge/wheel, masks over thread) | — | 0.07 |
| Tint + veil | ✓ | ✓ | ✓ | ✓ | 0 (locked to stage) |
| Thread | ✓ | ✓ | ✓ (dips under bridge layer) | ✓ | 0.10 + draw |
| POI markers | — | 1 | 2 | 1 | with thread |
| Text block | ✓ | ✓ | ✓ | ✓ | 0.14 (fastest — floats off the field) |
| HUD | ✓ | ✓ | ✓ | ✓ | 0 (fixed) |

Camera perspective implied: scene 01 high aerial (looking down), scene 02 low follow (looking through), scene 03 eye-level across (looking at), scene 04 low over flat water (looking out). The descent is a camera coming down to earth. Foreground/midground/background per scene: bright sky-or-fog band / subject mass / veil-darkened near field — the igloo fog structure reached with footage.

## 8. HUD system spec

Constant-tone rule: every HUD element is bone `#F2EDE4`, all scenes, no exceptions. The HUD is `position: fixed` above everything; it never unmounts, never fades, never re-grades.

| Element | Spec |
|---|---|
| Corner brackets | Four L-brackets, 1px bone at 70% opacity, 28px arms, inset 20px from viewport edges (21hrs pattern). Constant across scenes. |
| Top-left | `KOVRA` wordmark (Archivo expanded 700, 15px, 0.18em) + below it mono micro `FIELD RECORD / RIVER DESCENT` at 60% opacity. |
| Top-right | Scene index: `SCENE 01/04 — GLACIER` (Plex Mono 500, 14px). Updates at cut lines. Below it: `KM 147 / 412` — live counter, tabular-nums, monotonic with `--p`. |
| Bottom-left | Flavor telemetry: `62°24′N / DESCENT 1410 M` (mono micro, 50% opacity; invented spec data — KOVRA is a fictional river, consistent with v1's invented field notes; mark `<!-- mock -->` in code). |
| Bottom-center | Scroll cue (`SCROLL TO DESCEND` + 44px hairline) visible only `p < 0.03`; after that, replaced by scene-context micro (`FIELD NOTE 118` etc. mirrors the text block). At `p = 1`: `THE RIVER LEAVES EVIDENCE.` |
| Bottom edge | Progress bar: full-width 1px bone at 20%, mint `#BCF2DC` fill = `--p`, with tick marks at 25/50/75% (scene boundaries). Retained from v1, upgraded with ticks. |
| Loader | Ink `#05080C` field; brackets draw in first; mono status lines appear in sequence: `KOVRA / FIELD RECORD` → `CALIBRATING THREAD` → `LOADING FOOTAGE 09/09` (count matches final asset total — asset-director confirms); then hard cut to GLACIER. No spinner, no percentage ring. |

## 9. Sights system

POI markers pinned at km positions on the thread — replacing v1's detached 420vw bottom rail.

**Positions (km = scroll trigger; km/412 = the `--p` at which the thread's drawn length reaches the marker):**

| # | Name | km | Scene | Field note (v1 copy, kept) |
|---|---|---|---|---|
| 01 | Gorge Gate | 118 | PINE | A split in the basalt where the river turns north. |
| 02 | Bell Bridge | 224 | MILL TOWN | The old crossing rings once when the thaw arrives. |
| 03 | Mill Wheel | 271 | MILL TOWN | Oak, iron, and a century of patient rotation. |
| 04 | Lantern Quay | 412 | DELTA | The final landing before fresh water meets salt. |

**Marker:** 6px mint dot + 1px bone ring on the thread path. Once passed, the dot stays lit — the thread accumulates evidence; passed markers survive scene cuts because they are part of the thread layer.

**Card behavior:** when thread draw progress ≥ marker km, the card flies in from the marker point (translate from thread position + 24px toward the text-safe side, opacity 0→1, ~450ms — exact easing is motion-director's). Trigger = v1's existing stroke-dashoffset draw value — reuse, no new mechanism. Cards cut with their scene (they are scene media); the marker dot persists.

**Card anatomy (instrument card, not glass rail):** solid ink `#05080C` at 92% opacity ground; 1px bone/15% border; one bracket corner (bottom-right, bone/40%, echoing the HUD frame); mono label `SIGHT 02 / KM 224`; name in Archivo expanded 700 caps, 20px; one-line field note in bone/62%, 13px/1.55. **No `backdrop-filter`, no blur, no glass.** Width min(280px, 72vw). `pointer-events: auto` (hover nudges the card 2px — the only card interaction).

## 10. Motion direction summary

Detailed choreography to motion-director (P4). Art-direction-level rulings:

- **Scroll model:** unchanged — sticky 100vh stage, `calc(100vh + 3600px)` track, rAF lerp 0.14 driving `--p`. (Flagship spec names Lenis; v1's lerp already delivers the same feel — motion-director picks one, not both.)
- **Thread:** continuous SVG path, `stroke-dashoffset` draw tied to `--p`; never re-routes, never blurs, glow constant except one pulse per scene stitch.
- **Cut policy:** instant swap at 0.25/0.5/0.75. No cross-fade, no opacity blend, no shared intermediate frame. Optional (motion-director, default OFF): outgoing media may rack-defocus ≤8px blur in the final 6% of its window — a lens rack, never a fade.
- **Entrance:** loader (§8) → hard cut to GLACIER → hero wordmark char-by-char → scroll cue. 
- **Char-by-char:** opening `KOVRA` + the four scene place-names only (oimachi's 65-span h1, rationed — transfer 6). Nothing else splits.
- **km counter:** tabular-nums, updates every frame `--p` changes; no easing theater on the digits.
- **Reduced motion:** full collapse — no sticky stage, no draw, no parallax, no char reveals. The four scenes become four stacked full-bleed graded stills (video posters) in document order, each with its text block; thread rendered fully drawn as a static SVG per scene; HUD static, reading `SCENE 04/04` is wrong — reduced mode shows all four scenes stacked, so HUD scene index unmounts and km reads `412 / 412` fixed. Loader skipped.

## 11. Responsive art direction

Recomposition, not stacking. The sticky stage + thread + HUD structure survives at every width; what changes is media tier, HUD density, and text geometry.

**1440 (reference):** full system — 3 videos, all stills, full HUD, 16vw wordmark, lower-left text blocks.

**768:** videos swap to their graded poster stills (per spec §4.5); far stills kept; parallax factors halved. HUD: brackets + wordmark + scene index + km readout kept; flavor telemetry (bottom-left) dropped. Wordmark 16vw; place-names 8.5vw; text block stays lower-left but width opens to 64vw.

**360:** stills only; `KV-S1/S2/S5` far layers dropped (base + veil + thread is enough at this width); stage height `calc(100dvh + 2000px)` (v1's mobile track length). HUD minimal: brackets (16px inset, 20px arms), scene index top-right, km bottom-left; progress bar kept. Wordmark 16vw (~58px) centered optically; place-names 10vw; text block moves from lower-left to **lower-third, full-width** (left 6vw, right 6vw) — it docks above the progress bar instead of floating in a side column. Sight cards become bottom-anchored full-width instrument strips (same anatomy, width `86vw`) sliding up from the marker's screen edge rather than flying sideways. `min-h-[100dvh]`, never `h-screen`.

## 12. Anti-patterns

Explicit ban list — any of these in the build is an automatic critic fail:

1. **No procedural terrain.** No SVG ridges, no CSS-gradient mountains, no dot-matrix stars, no drawn bridges. (v1's core failure.)
2. **No glass.** No `backdrop-filter`, no frosted cards, no glass rails. Sight cards are solid instrument cards.
3. **No cross-fades.** No opacity blending between scenes, no uniform fades as transitions, no mix-blend scene merging. Cuts are cuts.
4. **No card grids / bento mosaics.** oimachi's media wall is the wrong register — KOVRA is one field of evidence at a time.
5. **No ungraded stock.** Raw library color, un-veiled media, or a clip that misses its luminance target = rejected asset.
6. **No carousel rewind.** No horizontal sight rail, no looping slider, no back-to-start button. The river goes one way.
7. **No serif nostalgia.** No Cormorant, no editorial serif one-offs. Grotesk + mono only.
8. **No decoration without instrument function.** No blobs, orbs, mesh gradients, neon glows beyond the thread's mint drop-shadow, no animated grain, no custom cursor, no autoplay audio.

## 13. Acceptance criteria

Measurable, screenshot-verifiable by visual-critic at 1440×900 (360/768 variants noted):

**Composition**
- Each scene's midpoint screenshot shows full-bleed photographic media to all four edges; zero procedural-gradient regions (critic spot-checks at 4 corners + center).
- Thread is a single continuous path across all four scene screenshots; stroke color `#BCF2DC` ±8; glow present; no discontinuity at cut boundaries.

**Luminance**
- Full-frame meanLum at scene midpoints: GLACIER 210±8, PINE 145±8, MILL TOWN 80±8, DELTA 18±8; adjacent deltas ≥60.
- Band delta: top 20% band vs bottom 20% band ≥50 points in scenes whose full-frame mean ≥60 (GLACIER, PINE); struck for MILL TOWN/DELTA — mathematically impossible at means 27/18 (critic round 1, ratified 2026-09-16); the fog gradient still reads there.
- Text/HUD zones: local background ≤60 meanLum behind every text block and all four corner brackets (AA for bone).

**HUD persistence**
- Pixel-sampled bone `#F2EDE4` ±4 at all four bracket locations in all four scenes.
- Scene index reads `01/04 GLACIER` … `04/04 DELTA` matching the visible scene; km readout monotonic across scroll positions; progress bar fill matches `--p` ±2%.

**Cut integrity**
- Frame-stepping across each boundary shows media swap within one frame (≤120ms at 60fps capture); no intermediate blend frame; thread + HUD identical in the frames before and after.

**Typography**
- Hero wordmark: 16vw ±1vw cap span ≈ 80% frame width; Archivo expanded caps; char-split present in DOM.
- Scene place-names 8.5vw ±0.5vw; mono HUD 12–14px; no serif glyphs anywhere; two font families total.

**Media treatment**
- Every scene: ≥1 video (desktop) or ≥2 stills; every media element sits under a veil layer; filters applied (computed style non-`none`).
- Grain: present as one fixed static layer ≤0.04 opacity; not visible as speckle at 100%; absent over HUD/text.
- No `backdrop-filter` in computed styles anywhere.

**Responsive**
- 768: no `<video>` playing (posters only); HUD flavor line absent. 360: text block is lower-third full-width; sight cards full-width bottom-anchored; `100dvh` stage, no horizontal overflow.

## 14. SHOT MANIFEST

Budget: **3 videos (≤8s loops) + 7 stills (1 optional) = 10 assets.** All from Pexels (primary) or Pixabay (fallback), free license, no attribution; files land in `showcase/public/kovra/` + `LICENSES.md` with source URLs. All video: 1080p minimum, mp4 (h264) + webm, target ≤2.5MB each after download-trim. All stills: ≥2400px wide, jpg ≤500KB. **Poster-still requirement:** every video ships a poster jpg (representative frame, 1920w, ≤300KB) — posters are the mobile media and the preload face; they render under the same CSS grade stack, so posters are exported raw and graded by the same veil.

| ID | Layer / scene | Type | Subject | Framing / motion | Aspect | Grade target | Pexels/Pixabay search terms | Fallback terms |
|---|---|---|---|---|---|---|---|---|
| KV-V1 | GLACIER base | video ≤8s loop | Braided glacial river / ice lagoon | High aerial, slow forward drift; river runs roughly top-to-bottom of frame | 16:9 ≥1920 | Recipe G; mean ~210 under veil | "aerial glacier river", "glacier lagoon drone", "braided river aerial" | "iceland river aerial", "glacial meltwater drone" |
| KV-V2 | PINE base | video ≤8s loop | River corridor through conifer forest | Low drone follow over dark water, trees walling both sides | 16:9 ≥1920 | Recipe P; mean ~145 | "pine forest river drone", "forest river aerial", "river through forest" | "mountain river forest aerial", "creek conifer drone" |
| KV-V3 | DELTA base | video ≤8s loop | Dark water surface with distant light reflections | Low over flat water or macro ripples; slow | 16:9 ≥1920 | Recipe D; mean ~18 | "night water reflections", "dark river night aerial", "water surface night lights" | "moonlight on water", "harbor night water aerial" |
| KV-S1 | GLACIER far | still | Glacier wall / ice-covered peaks | Wide, horizon high | 3:2 or 16:9 ≥2400w | Recipe G | "glacier mountains aerial", "ice cap peaks" | "glacier wall", "frozen peaks panorama" |
| KV-S2 | PINE far | still | Misty conifer valley | Wide, fog layered between ridges | ≥2400w | Recipe P | "misty pine forest mountains", "fog conifer valley" | "forest fog aerial", "misty treeline" |
| KV-S3 | MILL TOWN base | still | Old bridge over river at dusk, village bank | Eye-level across the water; bridge mid-frame | ≥2400w | Recipe M; mean ~80 | "old bridge river village dusk", "stone bridge town evening" | "covered bridge river", "village river twilight" |
| KV-S4 | MILL TOWN mid | still | Watermill wheel / timber facade, warm windows | Medium, offset composition | ≥2400w | Recipe M | "watermill wheel river", "old mill night windows" | "wooden watermill", "mill house evening" |
| KV-S5 | DELTA far | still | Twilight estuary / tidal flats | Low horizon, indigo sky band | ≥2400w | Recipe D | "river delta aerial twilight", "estuary dusk aerial" | "tidal flats night", "delta channels dark" |
| KV-S6 | Sight-card texture (optional) | still | Dark water macro ripples | Close, abstract | ≥1600w | Neutral-dark; used inside sight cards at 40% if cards read flat | "water surface macro dark", "river ripple close up" | "dark water texture", "ripple detail" |
| KV-S7 | Veil enrichment (optional) | still | High fog / cloud texture from above | Flat, low contrast | ≥2400w | Blends into veils at ≤15% if footage skies are dead | "fog texture aerial", "above clouds" | "cloud layer aerial", "mist from above" |

**New/changed copy (everything else is v1 copy verbatim):**
- Scene 02 place-name: `THE NARROWS` (was "The Gorge" — scene re-concepted to pine corridor).
- Scene 02 detail line: `Split pine, black water, and a hard white current` (was "Basalt, wind, and a hard white current").
- Field-note numbers now equal km: `FIELD NOTE 001 / 118 / 224 / 412` (v1's 047/188 absorbed into the km system; 188's note moves to Mill Wheel's sight card region — Mill Town keeps `FIELD NOTE 224` at its text block).
- HUD microcopy (new): `FIELD RECORD / RIVER DESCENT` · `SCENE 01/04 — GLACIER` · `KM 000 / 412` · `62°24′N / DESCENT 1410 M` (mock flavor) · `SCROLL TO DESCEND` · terminal line `THE RIVER LEAVES EVIDENCE.`
- Loader lines (new): `KOVRA / FIELD RECORD` · `CALIBRATING THREAD` · `LOADING FOOTAGE 09/09` (count to match final asset total).
- Sight labels (new format): `SIGHT 01 / KM 118` etc.

---

### Deviations flagged for P7 ratification
1. **Custom cursor: recommend drop.** Approved spec §4.3 lists it; the board measures custom cursors 0/5 and they carry a11y cost. Recommend replacing its "sensory" role with the loader + char reveals already specced. Needs user sign-off.
2. **Grain kept at 0.035 static** despite board 0/5 — retained because approved spec §4.3 lists it; constrained to sub-perceptual, media-only. If the critic flags it in round 1, drop it.
3. **Sound: out of scope.** If ever added, gate behind a HUD toggle (21hrs VU-meter pattern), never autoplay.

---

## Orchestrator ratifications (2026-09-16)

1. **Custom cursor: KEPT, constrained.** The board's 0/5 is a capture limitation — custom cursors do not appear in screenshots; the DOM flags miss canvas-implemented ones. Constrained form only: a 6px mint signal dot in `mix-blend-mode: difference` that augments the native cursor (never hides it), disabled on touch devices and under reduced-motion. Anti-pattern §8's cursor ban applies to replacement-cursor patterns only.
2. **Grain: kept** at 0.035 static, media-only, per §6 — drop only if critic flags visible speckle in round 1.
3. **Sound: out of scope** — confirmed.
4. **Asset weight:** no ffmpeg on this machine — no local re-encoding or webm transcoding. Prefer native 1080p mp4 ≤8MB per clip (720p acceptable for scenes 02–04 if 1080p unavailable or too heavy); the "≤2.5MB after download-trim" constraint is relaxed to "choose the smallest adequate native variant". mp4 only, no webm. Browsers stream video progressively — not a blocking page payload.
5. **Lenis:** default ON (already a showcase dependency; approved acceptance bar names it) — motion-director may combine it with the existing 0.14 scrub lerp; if a single mechanism is chosen, it is Lenis + lerp on `--p`.
6. **Luminance arc revised (post-P5 evidence, 2026-09-16):** the §5 absolute targets (210/145/80/18) are unreachable with the §6 veils' own dark lower halves — the veil math and the numbers contradicted each other, and the mean-lum metric tops out on the textured top-down glacier frame (pushing further washes the image). Final measured-achievable contract: **descending arc — scene midpoints 01 ≈ 98 ±15, 02 ≈ 73 ±15, 03 ≈ 28 ±12, 04 ≈ 19 ±8. Hard requirements: 01 brightest, 04 darkest, strictly descending; 01→02 delta ≥20 and 02→03 delta ≥30** (measured 98/72.8/27.3/18.5 → deltas 25/45/9). Measurement is via the deterministic harness `showcase/.verify/scripts/measure-lum.mjs` (1440×900, scene midpoints, videos frozen at t=1.2s — video frames swing the mean otherwise). A HUD top scrim (120px gradient) + HUD text-shadow guarantee instrument legibility over bright scenes; corner brackets remain full-opacity bone.

---

## Asset acquisition outcome (P3, 2026-09-16)

Acquired and verified in `showcase/public/kovra/` (details + licenses in `LICENSES.md`):

| ID | File | Source | Note |
|---|---|---|---|
| KV-V1 | kv `aerial-view-of-a-snowy-forest-stream-in-tierra-del-fuego-argentina` | Coverr 720p | top-down snow field + dark braided stream — literal KOVRA motif |
| KV-V2 | kv `mountains-in-the-fog-2696` | Coverr 720p | dark conifers + dark lake + fog valley |
| KV-V3 | kv `sun-setting-on-the-coast-1318` | Coverr 720p | dusk coast, warm lights reflecting on dark water (DELTA register) |
| KV-S1 | Pexels 219837 | still | blue glacier wall + snowy peak — GLACIER far layer |
| KV-S2 | Coverr frame `above-a-misty-forest-518` | still 1280w | aerial fog-over-forest — PINE far layer |
| KV-S3 | Pexels 19580697 | still 1600w | old stone bridge, still water, muted autumn — MILL TOWN base |
| KV-S5 | Pexels 1629803 | still | aerial delta meanders — DELTA far layer |
| posters | KV-V1/V2/V3-poster.jpg | Coverr 1280w frames | mobile media + preload face |

**Deviations:** KV-S4 (watermill mid-layer) not sourced — Pexels lacks watermill stills; Commons candidates are attribution-licensed and rate-limited (429). MILL TOWN ships with KV-S3 + veil + thread beat + sight cards; revisit only if the critic flags scene 03 as flat. KV-S6/S7 skipped. **Loader count = 7 footage assets** (3 videos + 4 stills).
