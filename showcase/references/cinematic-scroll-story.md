# References - Cinematic Scroll Story

Source content: `content/styles/cinematic-scroll-story/references.mdx`
Live-site teardowns below add to it. Each entry: mechanic / stack / what to steal.

## Teardowns

### Cartier Watches & Wonders - Immersive Garden
- **Mechanic:** A scrollable digital twin - six Three.js alcoves, one per watch; horizons drift, water laps, mirrors shift; hidden gestures in every scene; a composed score does narrative work.
- **Stack:** Three.js/WebGL, custom shaders, per-scene audio.
- **Steal conceptually:** Treat each scroll segment as a *room with its own physics and light*, not a slide. One product, six worlds. The scroll IS the walkthrough.

### Hatom - Immersive Garden
- **Mechanic:** Five-chapter WebGL narrative (griffin hatches, armors up, expands across planets); progressive asset loading; original score (Ben Lukas Boysen). Awwwards SOTD.
- **Stack:** Three.js, progressive loading pipeline, sound design.
- **Steal conceptually:** Chaptering with hard narrative beats; load assets *with* the story so weight never blocks the first frame. Audio leads the emotional arc.

### Trionn - studio site (Codrops case study, 2026)
- **Mechanic:** Unified system - GSAP timelines + ScrollTrigger pinned/scrubbed sections + SplitText + Three.js hero/services/work grid + Lenis smooth scroll + Web Audio, all synchronized under one ticker; DOM foreground over WebGL with `mix-blend-mode: difference`; heavy work deferred via `requestIdleCallback`.
- **Stack:** Next.js, React, GSAP + ScrollTrigger + SplitText, Three.js, Lenis, Tailwind, Web Audio.
- **Steal conceptually:** One clock drives everything (GSAP ticker → Lenis.raf → ScrollTrigger.update). `gsap.matchMedia()` for per-breakpoint choreography. Keep content in real DOM for accessibility.

### The Watch - 60fps (Awwwards SOTD)
- **Mechanic:** Product scroll story - the object is the narrative.
- **Steal conceptually:** A single object observed from many angles beats many objects seen once. Pacing: hold on detail, release, move.

### Decathlon Yestalgia - index (Awwwards SOTD)
- **Mechanic:** Nostalgic archive scroll; memory as the storytelling device.
- **Steal conceptually:** Scenes as *eras*; scroll speed as emotional tempo (slow past, fast present).

### Mostar City Scroll Story (in-repo canonical)
- **Mechanic:** 7+ transparent-edge PNG parallax layers, segment choreography, lerp 0.14, blur ramps, 3-set clone infinite slider.
- **Steal conceptually:** The inventory in `template-prompt.mdx` is the baseline - match it, then add ONE idea it does not have.

## Motion vocabulary

scroll-scrubbed animation, multi-layer parallax, lerp smoothing, scene transition
(blur ramp / brightness shift / saturation ramp), pinned section, story panel,
fly-in, infinite slider (clone + normalize), reduced-motion snap fallback.

## Capture checklist

Number of layers (7+), scroll depth (3000-4000px), lerp weight (not raw scroll),
scene transitions (blur/brightness, not plain fades), feathered alpha edges,
minimal text density, true infinite slider (no visible rewind).
