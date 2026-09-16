# Proof spec - Cinematic Scroll Story

Source of truth (do not copy, read from source):

- `../../../content/styles/cinematic-scroll-story/template-prompt.mdx` - parameterized spec
- `../../../content/styles/cinematic-scroll-story/exact-prompt.mdx` - literal page spec
- `../../../content/styles/cinematic-scroll-story/references.mdx` - reference sites
- `../../../content/styles/cinematic-scroll-story/anti-slop.mdx` - hard bans (must not appear)
- `../../../content/styles/cinematic-scroll-story/{typography,color,motion,texture,layout}.mdx`

Proof-specific rules:

- This proof gets the full design-off: two built variants (A/B), picked by eye.
- Layers: transparent-edge assets or procedurally built equivalents; no hard-edge rectangles.
- Motion judged from video; prefer lerp smoothing over raw scroll linking.
- Acceptance: spec honored, anti-slop bans absent, visual-verify evidence complete.
