# Receipts

One line per proof after verification. Model/agents used, verify result, what felt
generic, what iteration worked.

| Date | Proof | Agents / models | Verify | Redone? | Notes |
|---|---|---|---|---|---|
| 2026-09-12 | LONGWIRE | frontend-developer (deepseek-v4.1-flash) | tsc + build + 3-viewport e2e captures + console gate | no | Bayer dither sweep reads well; kept the overlay/split/band composition variety. Watch: 719 lines > 450 target. |
| 2026-09-12 | KOVRA | frontend-developer-pro (gpt-5.6-luna) | tsc + build + e2e captures | yes (scroll) | Sticky broken by `overflow: hidden` on root (same trap as LONGITUDE mock) -> `overflow-x: clip`; h1 was inside `aria-hidden` scene -> moved out; delta panel overlapped sights heading -> fade-out range added; reduced-motion hid the title -> now static hero. |
| 2026-09-12 | LUMEN Mk. III | frontend-developer-pro (gpt-5.6-luna) | tsc + build + e2e captures | no | Instrument craft exceeded the mock; polish note: panel copy low-contrast over the light inspection scene; tiny card overlap bottom-left at ~0.95. |
| 2026-09-12 | LONGITUDE | frontend-developer (deepseek-v4.1-flash) | tsc + build + e2e captures + console gate | no | Panorama spans full track; one-family type per direction; CTA not wired (proof). |
| 2026-09-12 | LUMEN - texture pass | build + frontend-developer-pro fixes; lab measured | storyboard + videos + fps (static 53 / motion 52 solo) + 6/6 e2e | n/a | Style-spec texture built: fixed film grain 0.04 (static chosen; motion variant built + measured + removed), boundary shade at explode cusp + pre-resolve (<=0.22), dial paper tint, brushed bezel ring, case patina. Lab flag `?tex=` and texture.spec.ts removed after the pick. Remaining nits: part labels + "INSPECTION / TIDE CAM" eyebrow faint at 55-65%. |
| 2026-09-16 | KOVRA v2 — intro sequencing fix | orchestrator | build + intro captures (p 0/0.03/0.06/0.09) | no | User review finding: scene-01 copy overlapped the KOVRA wordmark at entry. Scene-01 copy now gates at p ≥0.07 (char reveal) + opacity ramp from p 0.0625 (symmetric on scroll-back); wordmark owns the viewport until its fade completes. |
| 2026-09-16 | KOVRA v2 — flagship rebuild | creative-director (kimi-k3) · researcher + researcher-pro · motion-director (gpt-5.6-luna) · frontend-developer-pro (gpt-5.6-luna) · asset acquisition executed by orchestrator (3 agent step-budget blowouts) | build + e2e 4/4 + deterministic luminance harness (101.3/71.0/27.3/18.8 descending) + 3-viewport captures + reduced-motion + scroll video + fps (idle 60.5, driven 23.5 headless CPU) | yes ×2 fix rounds | Reference board: 5 SOTD-level sites captured + measurable anatomy teardown. Real media only: 3 Coverr videos + 4 stills (Pexels/Coverr frames), zero procedural scenery. Visual critic r1 scored 6/10 (P0 card×type collision, media bleed 72px, scene-01 legibility, perf); all P0/P1 fixed and orchestrator-verified on fresh captures (critic r2 cancelled by user). KV-S4 watermill dropped (documented). |
| 2026-09-12 | LUMEN - improvement pass | visual-critic (kimi-k3) + frontend-developer-pro (gpt-5.6-luna) | storyboard (21 frames) + scroll video + 6/6 e2e | n/a | Critic scored 6.5/10; applied: focus scrim (P0 contrast), ledger fade-out (P0 overlap), text-shadow (P1), depth-graded blur + cam scale-forward (P1), showroom ramp 0.72->0.80 (P1 resolve), smoothstep explode, shadow fade, card stagger 420vw->120vw, reduced-motion shows content. Remaining nits: part labels + "INSPECTION / TIDE CAM" eyebrow faint at 55-65%. |

Systemic finding: the `overflow: hidden` + `position: sticky` trap hit twice (mock and
proof). Check `overflow-x: clip` on any scroll-driven sticky root first.
Systemic finding 2: agent step budgets (20-80) exhaust on asset acquisition and
iterate-measure loops — split by asset type, or execute mechanically with the
orchestrator and keep agents for judgment work. Measure luminance deterministically
(`.verify/scripts/measure-lum.mjs`, videos frozen at t=1.2s) — live video frames
swing the mean by 50+ points.
