# Directions - design-off pick sheet

Nine directions from creative-director (2026-09-12). Pick one per single-build proof;
pick two for cinematic-scroll-story (A/B build). Full detail lives in this file only -
the build brief comes from the picked direction.

---

## Dither Mono (pick 1)

### A - TERMINUS (typography-led)
- **Pitch:** Annual journal on engineered collapse; imagery exists only inside the letterforms of monumental headlines - type is the only window.
- **Mechanic:** "The aperture" - each chapter word is an SVG `<text>` mask holding a dithered raster of the subject (rebar tangle, grid map, dead radar dish); clip-reveals once left-to-right, then stays. Zero rectangular images on the page.
- **Motion:** clip-path mask reveals (~1000ms, `cubic-bezier(0.22,1,0.36,1)`), hard cuts between chapters, static grain; reduced-motion = instant opacity.
- **Content:** TERMINUS annual journal; chapter callouts `RES. FREQ. 1.9 HZ`, `PEAK DEFLECTION 44 MM`.
- **Accent:** blood `#8B0000` (one data point per section + CTA). **Risk:** low-med. **Ref:** Nothing.tech glyph system + brutalist FS-dither portraits.

### B - LONGWIRE (imagery-led)
- **Pitch:** Field microphone brand; every section is one generated exposure that "develops" out of near-black.
- **Mechanic:** "Slow exposure" - procedural horizon/terrain rendered through a Bayer dither on canvas; on section entry the dither sweeps columns left-to-right (~1600ms) exactly once, then freezes (CPU off).
- **Motion:** the development sweep is the only movement; rise/fade for text; fixed grain.
- **Content:** LONGWIRE field hardware; specs `SENSITIVITY -38 dB/PA`, `IP67 SEALED DIAPHRAGM`, `STANDBY 960 H`.
- **Accent:** amber `#D4A574`. **Risk:** med (canvas dither core; mobile GPU bounded by fallback). **Ref:** Kestrel v4 light-as-force + Teenage Engineering spec marginalia.

### C - DUOTONE (interaction-led)
- **Pitch:** Prepress terminal for print studios; the page demo IS the product - a draggable hairline splits wireframe-source vs dithered-proof live.
- **Mechanic:** "The proof strip" - one procedural SVG wireframe bisected by a 1px draggable hairline; right side recomputes an ordered-dither proof in real time with a mono readout (`THRESHOLD 62% / DOTS 112K / GRID 4x4`); snaps 0/25/50/75/100 with hard cuts.
- **Motion:** instrument wipe-in; hairline follows pointer in 1 frame (machines don't ease); ticks 600ms; reduced-motion = static 50/50 split.
- **Content:** DUOTONE prepress; presets `025 / 050 / 075` (Under-cut / Press-safe / Over-burn), CTA `RUN A PROOF`.
- **Accent:** rust `#B85C38` (the hairline itself). **Risk:** med-high (drag + live recompute + mobile fallback). **Ref:** Teenage Engineering alignment-as-aesthetic + Playdate strict single accent.

---

## Cinematic Scroll Story (pick 2 for A/B)

### A - KOVRA (journey-led)
- **Pitch:** One river, four colors of light - a documentarian descent from glacier to delta.
- **Mechanic:** "The Unbroken Thread" - a single SVG river line drawn by scroll progress survives every scene transition (terrain blurs out around it, thread stays sharp; passes under a bridge flat in Mill Town).
- **Motion:** 7 layers, lerp 0.14, `calc(100vh + 3600px)`, segmentInOut per scene, blur 0->14px exits, saturation ramps; sights slider 420vw pow(1.55), 4 river landmarks. Reduced-motion snaps to thread fully drawn.
- **Content:** fictional river KOVRA; doc register: "Nobody owns the first kilometer. The ice keeps it."
- **Palette:** glacial blue -> pine teal -> lantern amber -> delta indigo; one accent per scene. **Risk:** med (all-procedural terrain is the art-direction risk). **Ref:** Mostar inventory + Yestalgia eras.

### B - LUMEN Mk. III (object-led)
- **Pitch:** The tide clock video IS the parallax stack - product enters whole, explodes into floating component flats, is inspected, reassembles.
- **Mechanic:** "Exploded parallax" - SVG instrument splits into `~7` component groups with individual depth factors (0.4-1.0); scene 3 does a depth-of-field focus pull on the tide cam; reverse segmentInOut reassembles.
- **Motion:** lerp 0.12, `calc(100vh + 3900px)`, no rotation (layers register), slider = material cards.
- **Content:** "Aven & Mare, Tidal Instruments"; horologist's ledger register: "Fifty-one parts. All answerable to the tide."
- **Palette:** workshop cream -> steel blue -> navy showroom; brass accent. **Risk:** high (SVG instrument must read hand-made). **Ref:** The Watch pacing + AirPods choreography.

### C - SWELL 41 (abstract/kinetic-led)
- **Pitch:** Anatomy of one wave - a fixed observation frame stays pinned while one swell travels through it.
- **Mechanic:** "The Pass" - 7 contour slices rise, crest, shear laterally +/- exactly once (the climax), re-form; the observation cross-hair NEVER blurs.
- **Motion:** lerp 0.15, `calc(100vh + 3400px)`, saturation 60->100 on rise, background blur at split; optional bounded velocity garnish.
- **Content:** "Observation Post G" log; plates "Swell 39/40/42": "The archive keeps the shape. The water keeps nothing."
- **Palette:** steel -> jade -> foam -> pre-dawn; cold gold remnant. **Risk:** med (taste risk - must read as plotted data, not blobs). **Ref:** 21 Hrs pacing + Mostar split moved to a lateral shear.

**Creative-director's cut guidance:** A vs C = cleanest axis separation; A vs B = cleanest asset certainty (B carries craft risk).

---

## Vast Quiet Cinematic (pick 1)

### 1 - LONGITUDE (place-led)
- **Pitch:** Maritime observatory page as one continuous camera pan across an ultra-wide coastline.
- **Mechanic:** "The Traverse" - scroll scrubs a single `translateX` across an ~8000px generated panorama, 21:9 letterboxed; longitude HUD updates on the bars; three stations dwell, never a carousel.
- **Motion:** one GSAP scrub tween, letterbox draws in, 5-10% within-still parallax; reduced-motion = static station frames.
- **Content:** CAPE MERIDIAN observatory: "Twelve berths. One telescope. Weather first, guests second."
- **Accent:** dusty amber `#C4956A`. **Risk:** med (slips into slideshow if discipline breaks). **Ref:** AirPods camera choreography + Oimachi edge-anchored UI.

### 2 - OBJECT LESSON (object-led)
- **Pitch:** Instrument appraisal as film cuts - wide, medium, close, detail, then back out; after maximum intimacy the vast is the point.
- **Mechanic:** "The Cut Sequence" - six full-bleed cuts stepping nearer, labeled like an editor's log (`SHOT 04 / DISTANCE 1 M`); object under 15% of frame until CLOSE; RETURN cut dissolves over 2400ms.
- **Motion:** crossfades (400ms overlap), 5-10% drift, one element moves at a time.
- **Content:** HALL METER WORKS Gauge No. 7: "Brass, glass, and a float. It has measured every tide since 1911. No batteries."
- **Accent:** muted sage `#8B9D83`. **Risk:** low-med (deterministic crops; ending legibility). **Ref:** Kononenko withholding-as-composition + ERA Residence cut pacing.

### 3 - CLOSING CREDITS (text-as-film-credits-led)
- **Pitch:** Annual index of silent places formatted as the end-credit crawl of a film that never existed.
- **Mechanic:** "The Crawl with Dwelling Frames" - scroll-driven tiny credit column between letterbox bars; three times the crawl passes a full-bleed still titled `REEL 02 - SOLARHJORDHI, 03:48`; final credit is `FIN` as the quiet CTA.
- **Motion:** scroll-paced crawl (never auto), 400ms crossfades, fade-in-place; reduced-motion static.
- **Content:** THE QUIET INDEX Issue No. 9: `SILENCE INDEX - 11 dB`, `CAST - NO ONE`.
- **Accent:** dusty rose `#B8856A` (decibel/year values only). **Risk:** art high / eng low (the three stills carry it). **Ref:** RISK credits-as-interface + 21 Hrs scarcity of imagery.
