# References — KOVRA v2 (cinematic scroll story)

> Purpose: measurable anatomy of five award-tier scroll-story sites to source techniques for the KOVRA v2 rebuild (4-scene river descent glacier → pine → mill town → delta; unbroken thread line; doc-register HUD; scene color arc glacial → pine → amber → indigo; sights slider).
> Provenance: CLI captures 2026-09-16, Playwright chromium at 1440×900 (agent-browser MCP is blocked in this environment, so captures ran via the CLI fallback), 3 frames per site (top.png, scroll-1.png, scroll-2.png) under showcase/.verify/refs/&lt;slug&gt;/; computed styles, fonts, DOM/tech signals in showcase/.verify/refs/_capture-report.json (18.2KB, 6 entries). Slugs: landonorris, igloo, lusion, oimachi, 21hrs, nothing-tech (failed).
> Caveats: this pass analyzed frames programmatically (per-band palettes, luminance means, a 6×4 edge-density grid, accent-hex matching, letterbox/grain probes) — the session could not render images to vision, so qualitative details marked "prior-observed" come from the earlier researcher's notes, cross-checked against pixel metrics where possible. igloo/lusion/21hrs are single-viewport apps (DOM scroll ≈ 0): frames are app states, not scroll positions, and frame positions were not recorded. igloo's DOM shell is near-empty (render surface off-DOM), so its computed-style evidence is 2 root props + loaded fonts. 21hrs scroll-1 and scroll-2 are near-identical (2 distinct states, not 3). landonorris/oimachi frames cover ≈21% / ≈50% of their scroll depth.

## Per-site teardowns (5 sites)

### 1. landonorris.com — McLaren F1 driver site (Webflow; Awwwards SOTY 2025 per brief)
**Captures:** top.png, scroll-1.png, scroll-2.png · **Capture quality:** partial — 3 frames ≈ 21% of 12,677px scroll depth (hero + 2 mid/late states)
- **Composition:** hero is a flat cream field (98.8% of frame within tolerance of #F4F4ED) with corner HUD (wordmark, monogram, lime STORE button, NEXT RACE card; edge grid: 19 left / 11 right). **Visual check (orchestrator, 2026-09-16):** the hero is NOT blank — a monumental delicate hairline illustration (organic track/continent linework with pale filled blobs) fills the whole frame; the pixel pass missed it because it sits within ~ΔL 3 of the ground. Corrected reading: corner-HUD poster over a full-frame vector illustration; mid state = cream field + one dense dark collage block (edge spike 65 center-left; black 11.4% of frame); late state = black #111112 field (70–83% per band) with a dense grid (edge 12–23%/band). No letterboxing; depth comes from collage layering (canvas effects over img), not perspective.
- **Typography:** Mona Sans Variable (body + h1, 700) + Brier display; tokens --text--h1 4rem, --h2 4.5rem, --impact 7.9375rem (127px), --eyebrow 0.578rem; measured h1 38px uppercase 700 (below the 4rem token — responsive clamp or secondary h1); uppercase convention for eyebrows/labels.
- **Color:** light bands #F4F4ED / #EFEFE5 / #EBEEE0; dark bands #111112 over body base #282C20; lime #D2FF00 (+ lime-off #B2C73A), orange #FF6B00; greys #B9BBAD / #C8CBBD. Strategy: one signal color (lime) persists across the tonal cut — measured 0.49% / 0.42% / 0.51% of pixels in the three states.
- **Media:** 133 img + 21 canvas + 0 video; marquee strip in DOM; collage + canvas treatment; no grain overlay (flat-band ΔL 0.2–2.6).
- **Sensory checklist:** loading y · cursor n · smooth scroll y (Lenis) · grain n · sound n · magnetic ? · char anim n (h1Spans 0) · transitions y
- **Motion:** Lenis + Webflow IX (no GSAP); 4 sticky / 21 fixed layers; loader entrance; marquee loop; hard band cuts between states.
- **Second read:** the hero reads as a blank poster until the top-corner HUD rail resolves (prior-observed round/GP countdown; lime concentrated in the top band) — the page announces itself as a schedule before it shows a driver.

### 2. igloo.inc — WebGL 3D site (Awwwards SOTY 2024 per brief)
**Captures:** top.png, scroll-1.png, scroll-2.png · **Capture quality:** partial — single-viewport app (scrollable 0), DOM shell near-empty (0 canvas/img/h2 in DOM; render surface off-DOM); 3 distinct scene states captured; pixel evidence only
- **Composition:** full-bleed grey-blue field (#A0A5B1 = 95.6% of top frame); HUD/telemetry cluster centered (white 2.3% in middle bands; edge grid r1–r2 cols 2–3); no letterbox (top/bottom row sd ≤ 2.1); depth = measured vertical luminance gradient (scroll-1 band means 181 → 122 top-to-bottom) with edge density rising 4.1 → 16.4 into the near field — fog above terrain.
- **Typography:** IBM Plex Mono Medium/Regular as the HUD face (loaded fonts); no DOM text measurable (body font = browser default, h1 null); display type lives inside the WebGL surface — unmeasurable.
- **Color:** --bgColor #A0A5B1 single-field grey-blue; white HUD text; near-field #666677–#888899 tones in terrain states; no accent color on screen — monochrome field + white instrumentation.
- **Media:** all WebGL, render surface off-DOM; 0 img/video in DOM.
- **Sensory checklist:** loading n (DOM) · cursor ? · smooth scroll p (wheel consumed by app) · grain n (ΔL 0.3–1.0) · sound n (DOM) · magnetic ? · char anim ? (in-canvas) · transitions y (3 distinct states)
- **Motion:** state-to-state scene transitions inside one viewport; telemetry panels + scene progress bar persist across states (prior-observed; white HUD cluster present in all 3 frames).
- **Second read:** a monochrome instrument panel floating over terrain — the fog gradient (measured 181 → 122) does the depth work a horizon line would normally do.

### 3. lusion.co — 3D/interactive studio site
**Captures:** top.png, scroll-1.png, scroll-2.png · **Capture quality:** partial — single-viewport app (scrollable 0); DOM valid (h1, nav 7, fixed 9); 3 distinct canvas states
- **Composition:** white page chrome is the anchored invariant — top band 99% white in the hero state and 91% in the dark state; the canvas scene mutates between states (dark mass mid-frame → blue-tinted #AAAAFF bottom band at 18% → dark navy #000011/#222233 mid bands) while the frame stays white; centered bottom micro-HUD (prior-observed scroll cue); no letterbox.
- **Typography:** Aeonik (body + h1, 400, sentence case) + IBM Plex Mono + LusionMono; measured DOM h1 36px / 1.1 line-height; the prior visual estimate of ~7–8vw display type could not be reconciled with the DOM measurement (possibly canvas-scaled type) — treat as unverified.
- **Color:** neutrals white #FFF / off-white #F0F1FA / dark-white #E4E6EF / grey-blue #2B2E3A; accents blue #1A2FFB (+ #071BDF, header #0016EC), green #C1FF00, purple #8832F7, red #FF4C41; on screen, blue measured 0.35% (hero, lower bands) and 1.49% (state 2, bottom band). Strategy: white field + one saturated accent per state.
- **Media:** 3 canvas + 1 Vimeo reel iframe (prior-measured; iframe count not in the capture report); 0 img; no grain (ΔL 0.3–1.0).
- **Sensory checklist:** loading y · cursor n · smooth scroll p (app-consumed wheel) · grain n · sound n · magnetic ? · char anim n (h1Spans 0) · transitions y
- **Motion:** loader entrance; state-machine transitions (white → blue-tint → dark navy) with the white frame locked; 9 fixed HUD/nav layers.
- **Second read:** the headline's blue graphic stroke (prior-observed; blue pixels concentrated in the lower bands) reads as hand-annotation over the 3D scene — author voice over render.

### 4. oimachi.co — design/AI/Webflow studio site
**Captures:** top.png, scroll-1.png, scroll-2.png · **Capture quality:** partial — 3 frames ≈ 50% of 5,356px scroll depth
- **Composition:** dark #181818 field with a bright center band in the hero (band 2: 30% white/#FFFFEE — a large light media block mid-frame); text mass top-left (edge grid r0 cols 0–2: 28/23/19); dense mosaic throughout (edge 15–25%/band in later frames); bottom-center media block in scroll-1 (grid r3: 60/46).
- **Typography:** Aeonik 300 (h1 52px / 57.2px, tracking −1.56px = −0.03em, sentence case, 65 char spans); companions Feature Deck, Material Symbols, webflow-icons; no mono face.
- **Color:** #181818 base + white; brand pink #DD23BB (root token; 4.6% of hero frame, concentrated in the center media band); the prior-cited green #00E200 is absent from root tokens and 0% pure-green pixels — only a graded #004411 tint (scroll-1, band 3) appears on screen. Strategy: pink as the brand signal on dark.
- **Media:** 34 video + 100 img — heaviest media load on the board; video mosaic grid; no grain overlay (ΔL ≤ 4.8, media noise only).
- **Sensory checklist:** loading n · cursor n · smooth scroll p (GSAP present, Lenis absent; smoother unverified) · grain n · sound y · magnetic ? · char anim y (65-span h1) · transitions y
- **Motion:** GSAP + Webflow IX3; char-by-char headline reveal; 15 fixed layers, 1 sticky.
- **Second read:** the bright center band cuts the dark field like a lightbox — the studio presents a wall of evidence (34 videos) instead of claims.

### 5. 21hrs.space — "21 Hours on the Moon", lunar journey story (closest structural analogue to KOVRA)
**Captures:** top.png, scroll-1.png, scroll-2.png · **Capture quality:** partial — single-viewport app (scrollable 4px); scroll-1 ≈ scroll-2 (near-identical palettes and edge grid) — 2 distinct states captured, not 3
- **Composition:** black #000000 full-bleed field (98% of top band); bright lunar-surface band at band 1 (24% #DDDDDD); centered terrain/map cluster (edge grid r2 cols 2–3: 31/31); HUD row across band 1 (r1: 13–14 across cols 1–4); bottom-right instrument cluster in the second state (r3 col 4: 30–31; prior-observed filmstrip); hairline tan corner brackets (--color-frameCorner #E4B592; tan measured 0.10% at frame edges).
- **Typography:** FuturaStd display + AkkuratMonoLL mono companion (geometric display + mono instrument pairing); no DOM text measurable (body font default; text in canvas); mainTitle token #D9D9D9. **Visual check (orchestrator, 2026-09-16):** hero display is a giant gradient-filled "MOON" (~30vw, silver vertical gradient) with "21HRS ON THE" italic caps + flanking rules above and a MISSION/YEAR caption row below — display-type-as-subject, canvas-rendered.
- **Color:** black #000000 field; cream #FFF3EA as the constant instrumentation tone (tokens: text, compass, viewfinder, hints, vuMeter, carouselLines all #FFF3EA); tan #E4B592 corners; progressBar #DAD0C8; red #EE1212 pop token (not on screen in captured states). Strategy: monochrome field + cream instrumentation + rare red pop.
- **Media:** 6 canvas + 83 img (likely WebGL texture assets; the prior note claimed 83 iframes — iframe count is absent from the capture report, unverified); 0 DOM video.
- **Sensory checklist:** loading y · cursor n · smooth scroll p (app-consumed wheel) · grain n (ΔL 0.9–2.0) · sound y (+ --color-vuMeter token = VU-meter HUD) · magnetic ? · char anim ? (in-canvas) · transitions p (2 states)
- **Motion:** loader entrance; wheel-driven scene states in one viewport; persistent instrument HUD (compass, progress bar, VU meter, viewfinder tokens constant across states).
- **Second read:** tan corner brackets + compass/viewfinder tokens frame the viewport as recovered instrument footage — a viewfinder, not a webpage (prior-observed landing cue at the bottom edge).

**Failed capture — nothing.tech:** 3 attempts (prior); all frames show a centered modal over light content (edge-grid center cluster r1–r2 cols 2–3; top frame dominated by yellow-family tones #FFDD55/#EEDD33, later frames white modal states) — a consent/region wall; site visuals were never reached. The DOM behind it did load (docH 7,266px, Lenis, NType82 family set, custom cursor y) — incidental facts only. Excluded from the matrix below.

## Coverage table

y = verified · p = partial / app-consumed · n = absent · ? = unmeasurable (in-canvas). N of 5 counts strict y.

| Element | landonorris | igloo | lusion | oimachi | 21hrs | N of 5 |
|---|---|---|---|---|---|---|
| Loading screen | y | ? | y | n | y | 3 |
| Custom cursor | n | ? | n | n | n | 0 |
| Smooth / virtual scroll | y | p | p | p | p | 1 (5 incl. partial) |
| Grain overlay | n | n | n | n | n | 0 |
| Sound | n | n | n | y | y | 2 |
| Char-split headline | n | ? | n | y | ? | 1 |
| Persistent HUD layer(s) | y | y | y | p | y | 4 |
| Full-bleed scene surface | n | y | y | n | y | 3 |
| Mono companion font | n | y | y | n | y | 3 |
| Hard tonal cut between states | y | p | y | p | p | 2 |
| POI markers on a map surface | n | n | n | n | y | 1 |
| Marquee | y | n | n | n | n | 1 |
| Dense media mosaic (≥30 assets) | y | n | n | y | p | 2 |
| Corner-bracket frame | n | n | n | n | y | 1 |
| Sound + VU-meter HUD | n | n | n | n | y | 1 |

Reading: the consensus spine is persistent HUD (4/5) + smooth or virtual scroll (5/5 incl. partial) + a mono companion face (3/5). Grain and custom cursors are absent everywhere on this board; sound is a minority feature (2/5) but bundles with the instrument HUD (21hrs).

## Transfer to KOVRA

Ranked by impact on the v2 rebuild; each maps to a named KOVRA mechanic.

1. **Persistent instrument HUD surviving every scene** (igloo + 21hrs + landonorris). Evidence: igloo's white HUD cluster present in all 3 states; 21hrs cream instrumentation tokens constant across both states; landonorris keeps 21 fixed layers + lime across a 247 → 40 luminance cut. → KOVRA doc-register HUD: fixed corner-bracket frame (21hrs pattern, amber #F4C777 brackets), live scene index (01/04 GLACIER …), live km readout (v1's static 000—412 km eyebrow becomes a counter), thin progress bar retained from v1. HUD tone stays constant while scene palettes cut.
2. **Full-bleed scene surface + fog depth + HUD overlay** (igloo). Evidence: 95.6% single-field frames; measured top-to-bottom luminance gradient 181 → 122; edge density rising 4.1 → 16.4 into the near field. → KOVRA river scenes: glacier / pine / mill town / delta each become a full-bleed footage layer with an atmospheric veil producing a ≥50-point band-luminance delta top-to-bottom, text floating as HUD over the field — replacing v1's side panel cards over an SVG ridge illustration. igloo does this in WebGL; KOVRA can reach the same measurable structure with footage + gradient veils.
3. **Anchored invariant across hard cuts** (lusion locked white frame; landonorris lime). Evidence: lusion's top band stays 99% / 91% white while the canvas state flips white → dark navy; landonorris's lime survives a 207-point meanLum drop. → KOVRA unbroken thread line: thread + HUD are the only constants; scene media and palettes cut hard at boundaries with no cross-fade. v1 already draws one continuous path — keep that property and let everything around it change violently.
4. **Per-scene palette as narrative beat, hard cuts** (landonorris). Evidence: frame meanLum 247 → 177 → 40 across three states; band palettes flip cream → #111112 between sections. → KOVRA color arc glacial → pine → amber → indigo: four hard-graded scene palettes with ≥60 meanLum steps between adjacent scenes, plus one surviving signal accent across all cuts (candidate: thread glow #BCF2DC or amber #F4C777 — the lime role).
5. **POI markers anchored to the traveled surface** (21hrs). Evidence: centered map/terrain cluster (edge grid 31/31) + prior-observed POI markers; viewfinder/compass tokens. → KOVRA sights slider upgrade: sights become markers pinned at km positions along the thread; each sight-card flies in when its thread segment draws past (v1's stroke-dashoffset is already the right trigger — reuse it); card styling shifts from glass rail to instrument card (mono labels, corner tick). Replaces the detached 420vw bottom rail.
6. Runner-up: **char-by-char reveals** (oimachi: 65-span h1 + GSAP). Reserve for the opening h1 and scene place-names — oimachi's studio register is louder than KOVRA's field-document register; sparing use keeps the doc voice.

Stretch: if v2 adds river audio, gate it behind the HUD (21hrs VU-meter pattern; oimachi sound) rather than autoplay.

## KOVRA v1 delta

Given this board, the six most obvious deficiencies of showcase/src/proofs/cinematic-scroll-story/ (index.tsx + styles.css):

1. HUD is a 1px progress bar + static nav — no scene index, km readout, corner frame, or constant HUD tone (board spine: 4/5 references keep a persistent HUD).
2. Color arc is two cross-faded mix-blend overlays (.kovra-scene::before/::after) — no hard per-scene cuts; mid-arc scenes grade through intermediate tones (landonorris cuts 247 → 40 between frames).
3. Terrain is one static SVG ridge illustration with ≤168px translateY parallax — no full-bleed media layer, no footage, no fog/depth gradient (igloo measures 181 → 122).
4. Thread line is a fixed bezier that never re-routes and anchors nothing — the landmark rail is a detached bottom overlay sliding 420vw, not POIs pinned to the thread (21hrs anchors markers to its map surface).
5. Zero entrance choreography — no loading state, the h1 is a single text node (oimachi splits 65 spans), and panels animate opacity clamps only.
6. Zero sensory layer — no sound, grain, cursor, or scroll smoothing (native wheel + rAF-lerped --p at 0.14; board: 5/5 smooth or virtual scroll, 2/5 sound, 3/5 loaders).
