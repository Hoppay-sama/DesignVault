# The Anti-Slop Playbook: How to Prompt Professional Website Designs in 2026

> A comprehensive guide for Senior PMs and Frontend Designers to generate professional, non-AI-slop website designs using modern prompting infrastructure, MCPs, skills, and proven vocabulary.

---

## Table of Contents

1. [Diagnosing AI Slop: The Tells You Must Ban First](#1-diagnosing-ai-slop-the-tells-you-must-ban-first)
2. [The Infrastructure Layer: MCPs, Skills, and DESIGN.md](#2-the-infrastructure-layer-mcps-skills-and-designmd)
3. [The Prompt Architecture: From Vague to Surgical](#3-the-prompt-architecture-from-vague-to-surgical)
4. [The Vocabulary of Distinction: Terms That Unlock Quality](#4-the-vocabulary-of-distinction-terms-that-unlock-quality)
5. [Proven Workflows (The Methods)](#5-proven-workflows-the-methods)
6. [Governance: Keeping Slop from Creeping Back](#6-governance-keeping-slop-from-creeping-back)
7. [Master Prompt Template](#7-master-prompt-template)
8. [Quick Reference: Anti-Slop Vocabulary Cheat Sheet](#8-quick-reference-anti-slop-vocabulary-cheat-sheet)

---

## 1. Diagnosing AI Slop: The Tells You Must Ban First

Before you write a better prompt, you need to know what you are fighting. AI slop has become so predictable that you can diagnose it from a glance.

### The Canonical Symptoms

| Slop Pattern | What It Looks Like | Why It Happens |
|---|---|---|
| **The Inter Default** | Inter or Roboto everywhere, no typographic system | Statistically the "safest" screen font in training data |
| **Purple-to-Blue Gradient Syndrome** | Omnipresent purple/blue gradients on heroes, buttons, backgrounds | Gradients "test well" across the widest audience, so models default to them |
| **Vague Aspirational Headlines** | "Build the future of work," "Your all-in-one platform" | AI averages every headline it has seen; specificity is the antidote |
| **Uniform Component Sizing** | Identical 16px border radius, 24px padding, same card heights everywhere | No intentional variation = no visual hierarchy |
| **Plastic Illustrations** | Abstract 3D blobs, overly smooth AI-generated people | Slightly too symmetrical, slightly too smooth |
| **Missing or Generic Motion** | Either no animation, or every element fading in with identical timing | Motion design requires intent, not just pattern matching |

**The core insight:** AI tools do not generate ugly websites. They generate *statistically average* websites. Your job is to move the output away from the mean.

---

## 2. The Infrastructure Layer: MCPs, Skills, and DESIGN.md

The biggest shift in 2026 is that prompting is no longer just text-in-a-box. It is an **infrastructure stack**.

### 2.1 Model Context Protocol (MCP)

MCP (Model Context Protocol) is an open JSON-RPC standard that lets AI applications discover tools, reusable prompts, resources, and context from remote servers through stateful sessions.

**Why this matters for design:** Instead of pasting the same design rules into every chat, you can connect your agent to a design-context server that persists your brand standards, component library, and quality gates. MCP servers expose prompts as first-class primitives.

**Practical design applications:**
- **Prompt library servers**: Centralize your anti-slop rules so every agent session loads them automatically.
- **Retrieval servers**: Feed your agent live design-system documentation, not static training data.
- **Clarification servers**: Force the agent to ask questions before generating, preventing guesswork.

### 2.2 Skills as "Taste Infrastructure"

Skills are portable instruction files (typically `SKILL.md`) that agents load to apply subjective quality standards. Think of them as **codified taste**.

#### The Three Most Impactful Design Skills in Production

**A. Taste Skill (by Leonxlnx)**
The flagship anti-slop frontend framework. It installs via CLI and provides adjustable dials:
- **DESIGN_VARIANCE** (1-10): Layout experimentation (low = centered/clean; high = asymmetric/modern)
- **MOTION_INTENSITY** (1-10): Animation depth (low = hover; high = scroll/magnetic)
- **VISUAL_DENSITY** (1-10): Information per viewport (low = spacious; high = dense dashboards)

**Specialized variants:**
- `soft-skill` — Premium/luxury UI (high-end product, editorial, fashion)
- `brutalist-skill` — Swiss/industrial aesthetics (raw typography, grid-breaking, stark contrast)
- `minimalist-skill` — Editorial product UI (Notion/Linear vibes, sparse, precise)

**B. Impeccable (by Paul Bakaus)**
A design skill that achieved a **0.82/1.00 aggregate quality score** versus a 0.47 baseline — a **59% improvement** purely from vocabulary injection. It forces the agent to load `PRODUCT.md` and `DESIGN.md` before generating, runs critique/audit/polish passes, and bans specific anti-patterns (e.g., "no bounce easing").

**C. Anthropic's Frontend-Design Skill**
The original anti-slop skill with over 277,000 installs. It makes the agent self-aware of slop by naming the problem directly, then enforces:
- Distinctive typography (no Arial, no Inter without intent)
- Cohesive color with conviction (dominant colors + sharp accents)
- High-impact motion moments over scattered micro-interactions
- Atmospheric backgrounds over flat solids

### 2.3 DESIGN.md: The Diffable Source of Truth

Google open-sourced the `DESIGN.md` standard so design rules can live in your repo, be linted, and be diffed like code.

**Key capabilities:**
- **Lintable**: Run `npx @google/design.md lint DESIGN.md` to catch invalid tokens, missing foundations, broken references, and contrast issues.
- **Agent-readable**: When an agent finds a `DESIGN.md`, it has a reason to pull new work back into the system instead of inventing new colors or radii.
- **OKLCH-native**: Modern color syntax that agents can use for perceptually uniform palettes.

**Workflow integration:** Pair `DESIGN.md` with `PRODUCT.md` (brand context) and `AGENTS.md` (reusable rules). Impeccable, for example, treats a missing `PRODUCT.md` as a blocker and runs a `teach` command to generate one before continuing.

---

## 3. The Prompt Architecture: From Vague to Surgical

### 3.1 The Three-Layer Structure

Every effective prompt contains three elements. When teams tested 180 AI web design prompts, generic instructions produced generic outputs, while structured prompts generated usable starting points.

| Layer | Purpose | Example |
|---|---|---|
| **Context** | What is being built, for whom, and why | "A landing page for cybersecurity founders who are skeptical of marketing" |
| **Constraints** | Hard rules, bans, and stylistic boundaries | "No Inter. No purple gradients. No centered heroes. WCAG 2.2 AA contrast." |
| **Output Format** | What the deliverable looks like | "Single-file React component, semantic HTML, CSS variables for tokens, GSAP for motion" |

### 3.2 The Anti-Slop Prompt Formula

Based on tested workflows, here is the formula that consistently beats generic outputs:

**Step 1: Ban the defaults explicitly**
> "Avoid Inter, Roboto, Arial, and system defaults. No purple-to-blue gradients on white backgrounds. No generic 3D illustrations. No vague aspirational headlines."

**Step 2: Force a creative axis**
> "Choose a distinctive display font paired with a refined body font. Use dominant colors with sharp accents. Commit to an aesthetic direction: [brutally minimal / editorial magazine / retro-futuristic / industrial brutalist]."

**Step 3: Anchor to a specific audience and emotional state**
> "Design for [specific audience]. The interface should feel [specific emotion]. The user is in the moment of [specific context], so the layout must [specific behavior]."

**Step 4: Define the visual architecture**
> "Use a strong visual hierarchy: headline as primary focal point, product interface as secondary, proof strip as tertiary. Asymmetrical balance. Generous whitespace. 12-column grid."

### 3.3 Emotional and Functional Context

The most underrated prompt upgrade is describing the **user's emotional state** upon arrival. Instead of "add a signup form," describe the moment:

> "The user is nervous about pricing and comparing options. They need reassurance before sharing details. The form should feel trustworthy, not aggressive."

This changes layout, copy tone, field order, and visual weight in ways that "make a contact form" never will.

---

## 4. The Vocabulary of Distinction: Terms That Unlock Quality

AI models already know how to make beautiful interfaces. What they lack is the **specific vocabulary** to activate that knowledge. Here is the terminology that moves outputs from generic to professional.

### 4.1 Typography as Identity

| Instead of... | Use... | Effect |
|---|---|---|
| "Modern fonts" | "Grotesk sans-serif headline, humanist sans body, tight tracking on labels" | Signals intentional typographic system |
| "Good typography" | "Strong type hierarchy: large confident headline, concise medium-weight subheading, readable body, generous line height, max two typefaces" | Creates functional ranking |
| "Nice text" | "Editorial serif headline, restrained sans supporting copy, generous letter spacing on small labels, calm type scale" | Signals luxury/premium register |

**Key terms to inject:** display type, grotesk, humanist, geometric, editorial, type scale, tracking, measure (line width), font pairing, optical alignment, baseline grid.

### 4.2 Hierarchy and Spatial Composition

| Term | What It Controls |
|---|---|
| **Primary/Secondary/Tertiary focal point** | Reading order and attention flow |
| **Asymmetrical balance** | Breaks the default centered-grid monotony |
| **Generous negative space / macro whitespace** | Prevents the "fill every gap" slop tendency |
| **Z-pattern / F-pattern** | Controls how the eye moves through the layout |
| **Visual weight / Dominant mass** | Ensures elements know their place in the hierarchy |

### 4.3 Color as Semantics, Not Decoration

| Instead of... | Use... |
|---|---|
| "Blue and white" | "Deep navy background with precise accent colors; semantic naming: --color-action-primary, --color-feedback-success" |
| "Modern gradient" | "Atmospheric background with layered gradients, noise textures, and depth; no decorative purple-to-blue" |
| "Nice palette" | "Restrained palette with shared undertone, one controlled electric blue accent for CTAs only, tinted neutrals" |

### 4.4 Motion with Intent

| Slop Motion | Professional Motion |
|---|---|
| "Add some animations" | "One well-orchestrated page load with staggered reveals; CSS-only where possible" |
| "Fade everything in on scroll" | "Scroll-triggered animations only where they serve navigation or storytelling; easing: power2.out, not linear" |
| "Bouncy buttons" | "Subtle hover state transitions that communicate tactility; no bounce easing" |

---

## 5. Proven Workflows (The Methods)

### 5.1 The Skill-Stack Workflow (Highest ROI)

Used by teams producing production-grade UI in minutes.

1. **Install the skill stack** (one-time):
   - `impeccable` (taste + context loading)
   - `frontend-design` (anti-slop aesthetics)
   - `make-interfaces-feel-better` (optical alignment, button tactility)
   - `web-design-guidelines` (semantic HTML, focus states)
   - `accessibility` + `core-web-vitals` (WCAG, LCP/INP/CLS)

2. **Run `/teach-impeccable`** to generate `PRODUCT.md` and `DESIGN.md` from your repo.

3. **Prompt in plain language**: "Build a landing page for [X]." The agent auto-loads context, runs lint checks, and applies design laws.

4. **Run critique and polish**: Explicitly request a `/critique` and `/polish` pass before accepting output.

### 5.2 The Image-First Pipeline

For when you need a specific visual direction before code:

1. Use `imagegen-frontend-web` skill to generate reference comps (hero, landing, multi-section).
2. Feed the generated frames to Codex, Cursor, or Claude Code with `image-to-code-skill`.
3. The agent analyzes the references, then implements the frontend to match.

### 5.3 The Reference-Driven Workflow

Instead of prompting from zero, feed the model screenshots or URLs of award-winning sites as multimodal context. Then prompt:

> "Recreate the layout, spacing, and typography of [reference URL], but adapt the color palette and content for [my brand]. Maintain the hierarchy and motion feel, but change the visual identity."

This works because you are giving the model a **visual architecture** to follow, not asking it to invent one from statistical averages.

### 5.4 The Design-First Workflow

When creative control is paramount:

1. **Concept in Figma** with intentional design choices.
2. **Export via Anima** to React components.
3. **Refine with Claude Code** for edge cases, performance, and anti-slop polish.

---

## 6. Governance: Keeping Slop from Creeping Back

AI slop is not a one-time bug; it is a **gravitational pull**. Implement these guardrails:

| Guardrail | Implementation |
|---|---|
| **Pre-approved Component Blocks** | Build a library of vetted components that AI assembles rather than generates from scratch |
| **Slop Scoring System** | Flag outputs with generic fonts, purple gradients, predictable layouts, or uniform padding. Reject before review. |
| **Human Review Gates** | Mandate approval for all AI-generated frontend code. Check accessibility, performance, brand consistency. |
| **Receipt Culture** | Before calling work done, the agent must attach a checklist: design language identified, mobile checked, typography checked, no generic AI tropes. |
| **Prompt Versioning** | Treat prompts like code. When business rules or brand standards change, version the prompts. |

---

## 7. Master Prompt Template

Here is a synthesis of everything above — a prompt structure you can adapt immediately:

```
PROJECT CONTEXT
- Product: [Name] — [One-line description]
- Audience: [Specific persona] who feels [emotional state] when they arrive
- Goal: [Single conversion action or learning outcome]

DESIGN SYSTEM (Reference DESIGN.md if available)
- Typography: [Display font] for headlines + [Body font] for copy. Max 2 typefaces.
- Color: [Dominant color] with [Accent color] for CTAs only. Semantic CSS variables.
- Spacing: [Scale, e.g., 8px base, generous macro whitespace]
- Motion: [e.g., orchestrated page-load stagger, subtle hover transitions, no bounce]

ANTI-SLOP CONSTRAINTS (Explicitly ban)
- NO Inter, Roboto, Arial, or system defaults as primary fonts
- NO purple-to-blue gradients, neon gradients, or decorative gradients without purpose
- NO centered hero + 3-column feature card layout
- NO generic 3D illustrations, stock business photos, or abstract blobs
- NO vague headlines like "Build the future" or "Scale without limits"
- NO scattered micro-interactions; motion must be purposeful
- NO identical border-radius and padding on every component

VISUAL ARCHITECTURE
- Hierarchy: [Primary focal point] → [Secondary] → [Tertiary]
- Layout: [Asymmetrical / Editorial / Split-screen / etc.]
- Grid: [12-column / Baseline / etc.]
- Balance: [Asymmetrical with optical alignment]

CONTENT & COPY
- Headline voice: [Specific, e.g., "Sparse and precise like Linear" or "Opinionated and direct like Basecamp"]
- CTA copy: [Action-oriented, specific to the user's next step]

OUTPUT FORMAT
- [Single-file React / Next.js page / etc.]
- Semantic HTML, explicit image dimensions, focus states
- WCAG 2.2 AA compliant
- Mobile-first breakpoints defined
```

---

## 8. Quick Reference: Anti-Slop Vocabulary Cheat Sheet

### Typography
- **Display type** — Large, attention-grabbing headline font
- **Grotesk** — Clean, geometric sans-serif (e.g., Helvetica, Akzidenz-Grotesk)
- **Humanist** — Sans-serif with calligraphic roots (e.g., Frutiger, Gill Sans)
- **Geometric** — Based on simple shapes (e.g., Futura, Avenir)
- **Editorial** — Magazine-quality, often serif (e.g., Tiempos, Freight)
- **Type scale** — Systematic sizing hierarchy (e.g., 1.25x or 1.5x multiplier)
- **Tracking** — Letter-spacing adjustments
- **Measure** — Optimal line width for readability (45-75 characters)
- **Font pairing** — Intentional combination of two complementary typefaces
- **Optical alignment** — Adjusting visual center vs. mathematical center
- **Baseline grid** — Horizontal rhythm system for vertical alignment

### Spatial Composition
- **Primary/Secondary/Tertiary focal point** — Reading order and attention flow
- **Asymmetrical balance** — Breaks the default centered-grid monotony
- **Generous negative space / macro whitespace** — Prevents the "fill every gap" slop tendency
- **Z-pattern / F-pattern** — Controls how the eye moves through the layout
- **Visual weight / Dominant mass** — Ensures elements know their place in the hierarchy
- **Optical alignment** — Adjusting visual center vs. mathematical center

### Color
- **Semantic naming** — `--color-action-primary`, `--color-feedback-success`
- **Atmospheric background** — Layered gradients, noise textures, and depth
- **Restrained palette** — Shared undertone, one controlled accent
- **Tinted neutrals** — Off-whites and warm grays instead of pure #FFFFFF / #000000
- **OKLCH** — Perceptually uniform color syntax

### Motion
- **Orchestrated page load** — Staggered reveals with purposeful timing
- **Scroll-triggered** — Animations tied to scroll position, not just time
- **Easing: power2.out** — Smooth deceleration, not linear or bounce
- **Hover tactility** — Subtle state transitions that feel physical
- **No bounce easing** — Bounce feels cheap and unprofessional

### Copy & Voice
- **Sparse and precise** — Like Linear, Apple
- **Opinionated and direct** — Like Basecamp, 37signals
- **Warm and conversational** — Like Notion, Slack
- **Technical and confident** — Like Vercel, Linear
- **Avoid vague aspirational** — No "Build the future," "Scale without limits," "Your all-in-one platform"

### Aesthetic Directions
- **Brutally minimal** — Stark, Swiss, grid-based, high contrast
- **Editorial magazine** — Serif headlines, generous whitespace, image-forward
- **Retro-futuristic** — 80s/90s tech nostalgia, neon accents, monospace
- **Industrial brutalist** — Raw materials, exposed structure, heavy typography
- **Soft premium** — Rounded corners, muted pastels, gentle shadows, luxury feel
- **Dense dashboard** — Information-rich, compact, data-forward

---

## Bottom Line

The difference between AI slop and professional design is not the model — it is the **context architecture** around the model. In 2026, the winning workflow is:

1. **Codify your taste** into skills and `DESIGN.md`.
2. **Ban the defaults explicitly** in every prompt.
3. **Use design vocabulary** (hierarchy, asymmetry, measure, tinted neutrals) to activate latent model knowledge.
4. **Anchor to emotion and audience**, not just features.
5. **Run critique loops** before shipping.

AI is a first-draft machine. Professional results come from the infrastructure you wrap around it.

---

*Last updated: August 2026*
*For iteration: Add new skills, vocabulary, and workflow learnings as they emerge.*
