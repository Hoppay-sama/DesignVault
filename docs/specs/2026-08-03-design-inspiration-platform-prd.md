# Product Requirement Document: Design Inspiration Platform

**Project:** Anti-Slop Design Concept — Design Inspiration & Prompt Library  
**Date:** August 3, 2026  
**Version:** 1.0  
**Status:** Draft — Pending User Review  

---

## Table of Contents

1. [Product Vision](#1-product-vision)
2. [Target Audience](#2-target-audience)
3. [Research Taxonomy](#3-research-taxonomy)
4. [Content Model — Style Entry Template](#4-content-model--style-entry-template)
5. [Platform Architecture & UX](#5-platform-architecture--ux)
6. [Technical Stack](#6-technical-stack)
7. [Prompt System Architecture](#7-prompt-system-architecture)
8. [Editorial Workflow](#8-editorial-workflow)
9. [Data Model & File Structure](#9-data-model--file-structure)
10. [Launch Scope & Phasing](#10-launch-scope--phasing)
11. [Success Criteria](#11-success-criteria)
12. [Appendices](#12-appendices)

---

## 1. Product Vision

### 1.1 What We're Building

A **web-based design inspiration platform** that catalogs 30+ distinct design aesthetics with comprehensive educational content and ready-to-use AI prompts. Each style entry teaches designers and developers *why* a design works, *when* to use it, and *how* to reproduce it — then gives them a copy-paste prompt to generate similar results in their AI coding assistant.

### 1.2 Core Value Proposition

> **For designers and developers who want to create exceptional landing pages without starting from scratch:**  
> DesignVault is a curated design inspiration platform that categorizes 30+ aesthetics with full design intelligence (principles, vocabulary, anti-patterns) and dual prompts (exact replica + parameterized template)  
> **Unlike** Pinterest boards, Awwwards galleries, or generic prompt libraries,  
> **Our product** teaches the *why* behind each style and provides production-ready prompts tested against AI coding assistants.

### 1.3 Design Philosophy

The platform itself must embody the anti-slop principles it teaches:
- **No generic SaaS aesthetics** — the site has its own distinctive visual identity
- **Gallery-first** — visual content dominates, text supports
- **Fast and immersive** — the browsing experience should feel like a design magazine, not a database
- **Educational without being academic** — insights are actionable, not theoretical

---

## 2. Target Audience

### 2.1 Primary User: Designers & Developers

**Profile:**
- Frontend developers, UI designers, creative developers, and technical designers
- Comfortable with AI coding assistants (Cursor, Claude Code, v0.dev, Copilot)
- Want to create distinctive landing pages but lack the design vocabulary to articulate what they want
- Value learning *why* designs work, not just copying them

**User Journey:**
1. Land on the gallery homepage
2. Browse or filter to find an aesthetic that resonates
3. Click into a style entry
4. Read the Visual DNA and Design Principles (understand the *why*)
5. Study the Reference Gallery (see it in practice)
6. Copy the prompt (exact replica to study, or parameterized template to adapt)
7. Paste into their AI coding assistant
8. Adapt the output for their own project

**What Success Looks Like:**
- User copies a prompt and gets a landing page that genuinely embodies the style
- User understands *which elements are essential* to the style vs. *which can be customized*
- User can articulate the style to others using the vocabulary they learned

### 2.2 Secondary Audiences

| Audience | How They Use It |
|----------|----------------|
| **Creative Directors** | Reference specific styles when communicating design direction to their team |
| **AI Prompt Engineers** | Study the prompt structures to learn how to write better design prompts |
| **Design Educators** | Use style entries as teaching material for design principles |

---

## 3. Research Taxonomy

### 3.1 Research Sources

| Source | What We Extract | Method |
|--------|----------------|--------|
| **Popular production landing pages** | What's actually shipping at high quality (Linear, Vercel, Raft, etc.) | Systematic screenshot + analysis of real production sites |
| **motionsites.ai / motionsite.ai** | Motion-heavy landing pages, scroll-driven narratives | Screenshot + video capture, categorize by motion type |
| **igloo.inc** | Premium curated designs, emerging aesthetics | Style extraction, visual DNA analysis |
| **Pinterest** | Volume of aesthetic trends, color/typography patterns | Pattern recognition across hundreds of pins |
| **X.com (design community)** | Cutting-edge experimental work, designer showcases | Track viral design posts, identify emerging styles |
| **Instagram reels/videos/images** | Motion design, animation techniques, trending aesthetics | Screen recording, frame extraction |
| **Awwwards / SiteInspire / Godly** | Award-winning sites, curated galleries | Systematic browse, extract recurring patterns |
| **Figma community / Dribbble / Behance** | Concept work, trending aesthetics | Trend identification, style clustering |
| **Taste skill references** | Design skill patterns (Taste Skill dials, Impeccable, Anthropic frontend-design) | Extract proven vocabulary and style configurations |
| **Existing reference collection** | 40+ curated images/videos from `Design inspo/` folder | Analyze and classify into emerging categories |
| **Existing prompt collection** | 7 example prompts with known aesthetics | Reverse-engineer style DNA from proven prompts |

### 3.2 Six-Axis Analysis System

Each design encountered during research is analyzed across 6 axes:

```
Axis 1: COLOR REGISTER
  ← Monochrome ─── Limited Palette ─── Rich Polychrome →
  (B&W, single accent)    (2-3 colors)    (4+ colors, varied)

Axis 2: TYPOGRAPHIC REGISTER  
  ← System/Default ─── Clean Sans ─── Editorial ─── Experimental →
  (Inter, system)    (Grotesk, geometric)   (Serif, display)   (Custom, expressive)

Axis 3: MOTION INTENSITY
  ← Static ─── Ambient ─── Interactive ─── Choreographed →
  (no motion)   (hover only)    (scroll/trigger)   (orchestrated sequences)

Axis 4: VISUAL DENSITY
  ← Monumental Space ─── Balanced ─── Information-Dense →
  (huge whitespace,    (normal)      (dashboards,
   1-2 elements)                    data-rich)

Axis 5: TEXTURE & SURFACE
  ← Clean ─── Tactile ─── Processed ─── Raw →
  (flat, smooth)   (subtle grain)   (dither, halftone,   (exposed structure,
                                     noise, ASCII)        brutalist)

Axis 6: LAYOUT STRUCTURE
  ← Grid-Rigid ─── Asymmetric ─── Fluid ─── Experimental →
  (strict 12-col)   (intentional     (organic,       (breaking all
                      imbalance)      flowing)          conventions)
```

### 3.3 Style Clustering Process

```
Step 1: COLLECT (200-300 designs from all sources)
  → Screenshot, record URL, note initial impression

Step 2: TAG (assign raw descriptors)
  → "dark mode, serif, cinematic, slow scroll, fog photography"
  → Use existing vocabulary from Anti-Slop Playbook as seed terms

Step 3: CLUSTER (group by visual DNA similarity)
  → Designs sharing 4+ axis coordinates cluster together
  → Name emerges from the cluster's dominant characteristics

Step 4: NAME (crystallize each style)
  → Name should evoke the feeling, not describe mechanically
  → Good: "Vast Quiet Cinematic" ✅
  → Bad: "Minimal Serif With Landscape Photography" ❌
  → Names must be prompt-ready (usable in AI prompts)

Step 5: VALIDATE (check against existing references)
  → Each style must have 3+ real-world examples
  → Each style must be distinguishable from neighbors on the map
  → Each style must have unique vocabulary terms

Step 6: DOCUMENT (full style entry)
  → Fill out the complete 15-section template (Section 4)
```

### 3.4 Initial Style Hypotheses (Seed Styles)

Based on existing references — to be validated and expanded through research:

| # | Style Name (Working) | Axis Coordinates | Seed Source |
|---|---|---|---|
| 1 | Dither Mono | Mono · Editorial · Ambient · Monumental · Raw · Asymmetric | Kestrel v4 prompt |
| 2 | Print Tech Paper | Limited · Clean Sans · Static · Balanced · Processed · Grid | Kestrel v1 prompt |
| 3 | Vast Quiet Cinematic | Mono · Editorial · Static · Monumental · Clean · Asymmetric | Kestrel v3 prompt |
| 4 | Classical Remix | Limited · Editorial · Ambient · Balanced · Tactile · Grid | Kestrel v5 prompt |
| 5 | Data-as-Texture | Mono · Clean Sans · Ambient · Balanced · Processed · Fluid | Kestrel v2 prompt |
| 6 | Liquid Glass Noir | Limited · Clean Sans · Ambient · Balanced · Clean · Grid | VEX prompt (prompt 5) |
| 7 | Dark Cinematic Studio | Limited · Serif+Sans · Choreographed · Balanced · Tactile · Asymmetric | Prisma prompt (prompt 4) |
| 8 | Editorial Portrait | Mono · Serif · Ambient · Balanced · Clean · Asymmetric | Marcus Bennet prompt |
| 9 | Cinematic Scroll Story | Rich · Editorial · Choreographed · Balanced · Tactile · Fluid | Mostar prompt (prompt 2) |
| 10 | Futuristic Fashion | Mono · Geometric · Interactive · Balanced · Clean · Grid | LGPSM prompt (prompt 1) |
| 11 | Soft Premium | Rich · Humanist · Ambient · Balanced · Tactile · Asymmetric | To be discovered |
| 12 | Industrial Brutalist | Mono · Grotesk · Static · Dense · Raw · Grid-Rigid | To be discovered |
| 13 | Retro-Futuristic | Limited · Monospace · Interactive · Balanced · Processed · Experimental | To be discovered |
| 14 | Neo-Swiss | Limited · Geometric · Static · Balanced · Clean · Grid-Rigid | To be discovered |
| 15 | Organic Editorial | Rich · Serif · Ambient · Balanced · Tactile · Fluid | To be discovered |
| 16-30+ | *To be discovered through research* | — | Research sources above |

### 3.5 Research Deliverables

The research phase produces:

1. **Style Landscape Map** — visual positioning of all 30+ styles on the 6 axes
2. **Style Encyclopedia** — full 15-section entry for each style
3. **Master Vocabulary** — 200-300 terms cross-referenced to styles
4. **Reference Gallery** — 3-5 real-world examples per style
5. **Dual Prompt Set** — exact replica + parameterized template per style

---

## 4. Content Model — Style Entry Template

Each of the 30+ styles gets a complete entry following this 15-section structure.

### 4.1 Entry Structure Overview

```
┌─────────────────────────────────────────────────────┐
│  STYLE ENTRY                                        │
│                                                     │
│  ① Identity Card                                    │
│  ② Visual DNA                                       │
│  ③ Design Principles                                │
│  ④ Typography System                                │
│  ⑤ Color Architecture                               │
│  ⑥ Motion Principles                                │
│  ⑦ Layout Grammar                                   │
│  ⑧ Texture & Surface                                │
│  ⑨ Vocabulary Bank                                  │
│  ⑩ Anti-Slop Checklist                              │
│  ⑪ When to Use                                      │
│  ⑫ Common Mistakes                                  │
│  ⑬ Reference Gallery                                │
│  ⑭ Exact Replica Prompt                             │
│  ⑮ Parameterized Template                           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 4.2 Section Specifications

#### ① Identity Card

Quick-reference header for the style.

| Field | Description | Example |
|-------|-------------|---------|
| Style Name | Evocative, prompt-ready name | "Dither Mono" |
| One-Line Essence | 1-2 sentences that make you *see* the style | "Brutalist B&W editorial where bitmap texture replaces color as the emotional medium." |
| Axis Position | 6 dot indicators showing coordinates | Color: ●○○○○○ · Type: ○●○○○○ · Motion: ○○●○○○ |
| Mood Keywords | 3-5 words capturing the feel | Stark, Monumental, Authoritative, Raw, Dark |
| Difficulty | 1-5 stars — how hard to execute well | ★★★★☆ |

#### ② Visual DNA

A paragraph (100-150 words) that makes someone *see* the style before they see an image. Written in present tense, sensory language. Not a technical description — an evocation.

#### ③ Design Principles

3-5 underlying rules that define this style. These are *transferable* — they apply even when specific elements change. Each principle has:
- **Rule name** (capitalized, memorable)
- **Explanation** (1-2 sentences)
- **What it prevents** (the anti-pattern it guards against)

#### ④ Typography System

Specific, actionable type specifications:

| Component | Specified |
|-----------|-----------|
| **Display typeface** | Register (grotesk/geometric/serif), example fonts, weight range, tracking, size (clamp values) |
| **Body typeface** | Register, examples, weight, tracking, size |
| **Micro/label type** | Usually monospace, all-caps, wide tracking, tiny size |
| **Type scale ratio** | 1.25x, 1.5x, or 1.618x |
| **Font pairing logic** | Why these fonts work together in this style |

#### ⑤ Color Architecture

Not just hex codes — the *system* behind the colors:

| Component | Specified |
|-----------|-----------|
| **Ground** | Background color (never pure white/black — near-values) |
| **Text** | Primary text color (off-white or near-black) |
| **Accent** | Single accent color, surgical usage rules |
| **Semantic** | Success/error/warning colors (desaturated to match style) |
| **Color rule** | One sentence governing when color earns its place |

#### ⑥ Motion Principles

| Component | Specified |
|-----------|-----------|
| **Entrance** | Duration, easing, stagger pattern, what animates |
| **Scroll** | Parallax amounts, reveal techniques, scroll-linked effects |
| **Interaction** | Hover states, cursor effects, button transitions |
| **Easing library** | Specific CSS easing curves used (e.g., `cubic-bezier(0.22, 1, 0.36, 1)`) |
| **Reduced motion** | How the style degrades gracefully |

#### ⑦ Layout Grammar

| Component | Specified |
|-----------|-----------|
| **Grid** | Column count, asymmetry rules, where content lives |
| **Hero** | Full viewport? Split? What's anchored where? |
| **Spacing** | Section padding, component gaps (clamp values) |
| **Hierarchy** | Primary/secondary/tertiary focal points |
| **Signature moves** | Layout tricks unique to this style (e.g., "footer wordmark overlaps content") |

#### ⑧ Texture & Surface

| Component | Specified |
|-----------|-----------|
| **Primary texture** | Main surface treatment (dither, grain, noise, etc.) |
| **Secondary texture** | Supporting texture (vignette, overlay, etc.) |
| **Image processing** | Rules for how images must be treated (never raw) |
| **Surface rules** | What surfaces feel like (paper, film, concrete, glass) |

#### ⑨ Vocabulary Bank

15-25 terms organized into three tiers:

| Tier | Purpose | Count | Example |
|------|---------|-------|---------|
| **Primary terms** | Must appear in prompt to unlock the style | 5-8 | "bitmap dither", "monumental display type" |
| **Secondary terms** | Refine and tune the output | 5-10 | "Floyd-Steinberg", "wordmark overlap" |
| **Context terms** | Set the mood and emotional register | 3-5 | "brutalist editorial", "monochromatic tension" |
| **Banned terms** | If these appear, the style has broken | 3-5 | "gradient", "glassmorphism", "playful" |

#### ⑩ Anti-Slop Checklist

10+ specific, testable items. Each is a hard rule:

```
□ No pure #000000 background (use #0A0A0A to #111111)
□ No pure #FFFFFF text (use #E8E8E8 to #F5F5F5)
□ No purple, indigo, or blue accent colors
□ No centered hero layout
...
```

#### ⑪ When to Use

| Sub-section | Content |
|-------------|---------|
| **Perfect for** | 3-5 ideal contexts (e.g., "analytics platforms", "luxury B2B brands") |
| **Avoid when** | 3-5 contexts where this style is wrong (e.g., "playful consumer brands") |
| **Brand personality match** | What kind of brand voice this style reinforces |

#### ⑫ Common Mistakes

3-5 mistakes with WHY and FIX for each:

```
MISTAKE: [What people do wrong]
WHY IT FAILS: [The design principle being violated]
FIX: [The correct approach]
```

#### ⑬ Reference Gallery

| Type | Content |
|------|---------|
| **Live sites** | 3+ URLs with specific observations ("What works: monumental wordmark") |
| **Screenshots** | Annotated captures showing key techniques |
| **Video** | Motion references if animation is central to the style |

#### ⑭ Exact Replica Prompt

A detailed, copy-pasteable prompt that recreates a specific design in this style at its purest form. Follows the structure defined in Section 7.1.

#### ⑮ Parameterized Template

Same prompt structure with brand-swappable placeholders and guidance notes. Follows the structure defined in Section 7.2.

### 4.3 Entry Quality Criteria

Every style entry must pass this checklist before publishing:

```
□ Identity Card is complete and axis coordinates are placed
□ Visual DNA paragraph makes you SEE the style without an image
□ At least 3 design principles (max 5) — specific, transferable rules
□ Typography names real fonts with real sizes and weights
□ Color system has semantic naming, not just hex codes
□ Motion section specifies easing curves, not just "add animation"
□ Layout section describes grid, spacing, and hierarchy with values
□ Texture section specifies processing technique (not just "add grain")
□ Vocabulary Bank has 15+ terms, including banned terms
□ Anti-Slop Checklist has 10+ specific, testable items
□ When to Use has 3+ perfect contexts and 3+ avoid-when contexts
□ Common Mistakes has 3+ mistakes with WHY and FIX for each
□ Reference Gallery has 3+ real examples with specific observations
□ Exact Replica Prompt is detailed enough to reproduce pixel-faithfully
□ Parameterized Template has clear placeholders and guidance
```

---

## 5. Platform Architecture & UX

### 5.1 Site Structure — 4 Primary Zones

| Zone | URL Pattern | Purpose |
|------|-------------|---------|
| **Gallery (Home)** | `/` | Visual grid of all styles, categorized. Entry point. |
| **Style Entry** | `/style/[slug]` | Full 15-section entry with dual prompts. |
| **Vocabulary Lab** | `/vocabulary` | Master glossary, cross-referenced to styles. |
| **Prompt Guide** | `/guide` | Methodology for anti-slop prompt engineering. |

Additionally:
| Zone | URL Pattern | Purpose |
|------|-------------|---------|
| **Landscape Map** | `/map` | Visual relationship map of all styles on 6 axes. |
| **Category** | `/category/[slug]` | Filtered gallery view (e.g., `/category/monochrome`). |

### 5.2 Gallery Homepage

The homepage is a **visual-first gallery** organized by style categories:

**Above the fold:**
- Hero statement: "30+ Design Aesthetics. Copy the prompt. Ship the page."
- Two CTAs: "Browse Styles" (primary) and "Search Vocabulary" (secondary)
- Quick filter pills: All Styles, Monochrome, High Motion, Editorial, Brutalist, Cinematic, Minimal, etc.

**Main content:**
- 3-column card grid (2-col tablet, 1-col mobile)
- Each card: preview image/thumbnail, style name, one-line essence, tag pills
- Cards link to full style entry pages
- Infinite scroll or "Load More" pagination
- Filter pills narrow the grid in real-time (URL params update)

**Card anatomy:**
```
┌──────────────────────────────────┐
│                                  │
│     Preview Image/Thumbnail      │
│     (style name in mono overlay) │
│                                  │
├──────────────────────────────────┤
│  Style Name                      │
│  One-line essence (2 lines max)  │
│  [tag] [tag] [tag]               │
└──────────────────────────────────┘
```

### 5.3 Style Entry Page

Full 15-section layout, optimized for reading and prompt copying:

**Layout:**
- Sticky sidebar with section navigation (table of contents)
- Main content area with generous reading width (max-w-3xl)
- Each section collapsible on mobile
- Dual prompt panel at the bottom (tabs: Exact Replica / Parameterized)

**Prompt panel UX:**
- Tab switcher between Exact and Parameterized
- Code block with syntax-highlighted prompt text
- One-click copy button (full prompt or individual sections)
- Character count display
- "Tested with" badges (Cursor, Claude Code, v0.dev)
- Copy confirmation toast

### 5.4 Discovery & Navigation

Three complementary discovery paths:

| Path | Mechanism | Best For |
|------|-----------|----------|
| **Browse by Style** | Gallery grid → click card → entry | "Show me everything dark and moody" |
| **Filter by Axis** | Pill filters or interactive axis controls → results narrow | "I need monochrome with high motion" |
| **Search by Vocabulary** | Search bar accepts design terms → returns matching styles | "I know the word 'dither', show me styles" |

**Filter state lives in the URL** — e.g., `/?color=monochrome&motion=high&texture=raw` — making every filtered view shareable and bookmarkable.

### 5.5 Responsive Behavior

| Breakpoint | Gallery | Entry Page |
|------------|---------|------------|
| **Desktop (1200px+)** | 3-column card grid | Sidebar TOC + main content, side-by-side prompt panels |
| **Tablet (768px)** | 2-column card grid | Stacked prompt panels (tabs: Exact / Template) |
| **Mobile (375px)** | 1-column, horizontal scroll carousel | Single column, accordion for entry sections |

---

## 6. Technical Stack

### 6.1 Stack Selection

| Layer | Technology | Justification |
|-------|-----------|---------------|
| **Framework** | Next.js 15 (App Router) | SSR for SEO, RSC for performance, API routes for search, file-based routing |
| **Styling** | Tailwind CSS v4 | Matches existing prompt ecosystem, utility-first for rapid gallery layouts |
| **Motion** | Framer Motion | Gallery transitions, page transitions, scroll reveals — consistent with prompt examples |
| **Search** | Flexsearch (client-side) | Vocabulary search + tag filtering without backend overhead |
| **Content** | MDX files in `/content` repo | Each style entry as structured MDX — editable by design team, git-diffable |
| **Media** | Cloudflare Images / R2 | Optimized gallery thumbnails + full-res reference images |
| **Hosting** | Vercel or Cloudflare Pages | Static export + serverless search, edge-cached globally |
| **State** | URL search params | Filter state in URL — shareable, bookmarkable, no client state management needed |
| **Code highlighting** | Shiki or Prism | For prompt code blocks in style entries |

### 6.2 Architecture Diagram

```
┌──────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                  │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │ Gallery  │  │  Style   │  │Vocabulary│           │
│  │   Page   │  │  Entry   │  │   Lab    │           │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘           │
│       │              │              │                 │
│       └──────────────┼──────────────┘                 │
│                      │                                │
│              ┌───────▼───────┐                        │
│              │  Flexsearch   │                        │
│              │  (in-browser) │                        │
│              └───────┬───────┘                        │
│                      │                                │
└──────────────────────┼────────────────────────────────┘
                       │ loads at build time
              ┌────────▼────────┐
              │  /content/*.mdx │
              │  (style entries)│
              └────────┬────────┘
                       │ processed by
              ┌────────▼────────┐
              │  Next.js Build  │
              │  (MDX → HTML)   │
              └────────┬────────┘
                       │ deployed to
              ┌────────▼────────┐
              │  Vercel / CF    │
              │  Pages (Edge)   │
              └─────────────────┘
```

### 6.3 SEO Strategy

- Each style entry is a server-rendered page with full meta tags
- Open Graph images generated per style (style name + preview thumbnail)
- Schema.org structured data for each style entry
- Sitemap auto-generated from `/content` directory
- Vocabulary terms link bidirectionally to style entries

### 6.4 Performance Targets

| Metric | Target |
|--------|--------|
| **LCP** | < 1.5s |
| **FID / INP** | < 100ms |
| **CLS** | < 0.05 |
| **First paint** | < 800ms |
| **Gallery load (30 cards)** | < 2s on 3G |

---

## 7. Prompt System Architecture

### 7.1 Exact Replica Prompt Structure

Based on the 7 example prompts in the reference collection:

```
┌─────────────────────────────────────────────────┐
│  EXACT REPLICA PROMPT                           │
│                                                 │
│  1. VIBE STATEMENT (1-2 sentences)              │
│     What the page feels like, what to ban       │
│                                                 │
│  2. STACK & SETUP                               │
│     Framework, fonts, CSS variables             │
│                                                 │
│  3. ASSET URLS (exact, no substitutions)        │
│     Images, videos, fonts — all remote          │
│                                                 │
│  4. LAYOUT & COPY (exact strings)               │
│     Section by section, pixel-precise           │
│                                                 │
│  5. ANIMATION SPEC (exact math)                 │
│     Easing, timing, stagger, scroll triggers    │
│                                                 │
│  6. VISUAL RULES (bans & constraints)           │
│     "No purple, no cards, no glow"             │
│                                                 │
│  7. RESPONSIVE BEHAVIOR                         │
│     Breakpoints, mobile adaptations             │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 7.2 Parameterized Template Structure

Same skeleton, with intelligent placeholders:

```
┌─────────────────────────────────────────────────┐
│  PARAMETERIZED TEMPLATE                          │
│                                                 │
│  1. VIBE STATEMENT                              │
│     "A [MOOD] landing page for [BRAND_NAME]..." │
│     Guidance: "Choose a mood that matches..."   │
│                                                 │
│  2. STACK & SETUP                               │
│     Framework fixed, fonts parameterized:       │
│     "Replace [DISPLAY_FONT] with a grotesk      │
│      like Space Grotesk or Chakra Petch"        │
│                                                 │
│  3. ASSET SLOTS (not URLs)                      │
│     "Use a [TEXTURE_TYPE] image of [SUBJECT]   │
│      processed with [PROCESSING_TECHNIQUE]"     │
│                                                 │
│  4. LAYOUT GRAMMAR (structure, not copy)        │
│     "Left-aligned headline, right-anchored      │
│      image. Never centered hero."               │
│                                                 │
│  5. MOTION PRINCIPLES (not exact values)        │
│     "Orchestrated entrance, staggered reveals.  │
│      No bounce easing. Duration: 800-1400ms."   │
│                                                 │
│  6. ANTI-SLOP CONSTRAINTS (preserved verbatim)  │
│     These NEVER change — they ARE the style    │
│                                                 │
│  7. RESPONSIVE (preserved verbatim)             │
│     Breakpoint strategy is style-locked          │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 7.3 What's Fixed vs. What's Swappable

| Element | Exact Replica | Parameterized Template |
|---------|--------------|----------------------|
| **Framework/stack** | Fixed | Fixed |
| **Font names** | Exact (Orbitron, Ogg) | Placeholder + guidance |
| **Font register** | — | Fixed (e.g., "grotesk display") |
| **Color hex values** | Exact (#0A0A0A) | Placeholder + guidance |
| **Color architecture** | — | Fixed (e.g., "near-black ground, one warm accent") |
| **Image URLs** | Exact remote URLs | Slot descriptions + processing instructions |
| **Copy/headlines** | Exact strings | Placeholder ([BRAND_NAME], [TAGLINE]) |
| **Layout structure** | Exact pixel values | Grammar rules (e.g., "asymmetric, left-aligned") |
| **Animation easing** | Exact curves | Principles (e.g., "power2.out, no bounce") |
| **Animation timing** | Exact ms values | Ranges (e.g., "800-1400ms") |
| **Anti-slop bans** | Fixed | Fixed (NEVER parameterized) |
| **Responsive strategy** | Fixed | Fixed |

### 7.4 Prompt UX on Style Entry Page

```
┌──────────────────────────────────────────────────┐
│  DITHER MONO — Prompts                           │
│                                                  │
│  [Tab: Exact Replica] [Tab: Parameterized]       │
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │  Build a brutalist-editorial B&W landing │    │
│  │  page titled [BRAND]...                  │    │
│  │                                          │    │
│  │  ## FONTS                                │    │
│  │  Load: Space Grotesk (600/700/800)...    │    │
│  │  ...                                     │    │
│  └──────────────────────────────────────────┘    │
│                                                  │
│  [📋 Copy Full Prompt]  [📋 Copy Section: FONTS] │
│                                                  │
│  ℹ️ Tested with: Cursor, Claude Code, v0.dev     │
└──────────────────────────────────────────────────┘
```

**Key interactions:**
- One-click copy — full prompt or individual sections
- "Tested with" badges showing validated AI tools
- Copy confirmation toast with character count
- Section-level copying for users who only need typography or motion specs

---

## 8. Editorial Workflow

### 8.1 Content Production Pipeline

```
Phase 1: RESEARCH & CAPTURE
  Researcher identifies design → screenshots/video → initial tags
  ↓
Phase 2: CLUSTER & NAME  
  Designs grouped by 6-axis similarity → style named → validated (3+ examples)
  ↓
Phase 3: DEEP ANALYSIS
  Design team writes: Visual DNA, Principles, Typography, Color, Motion, Layout, Texture
  ↓
Phase 4: PROMPT ENGINEERING
  Prompt writer creates: Exact Replica Prompt → Parameterized Template → tests both
  ↓
Phase 5: VOCABULARY EXTRACTION
  15-25 terms identified → cross-referenced to other styles → added to Master Vocabulary
  ↓
Phase 6: QUALITY GATE
  Entry checked against 17-point quality criteria (§4.3) → approved → published
```

### 8.2 Roles & Responsibilities

| Role | Responsibility |
|------|---------------|
| **Researcher** | Sources designs from Pinterest, X, Awwwards, Instagram, production sites. Captures screenshots/videos. Assigns initial tags. |
| **Design Analyst** | Performs 6-axis analysis. Writes Visual DNA, Design Principles, and reference gallery observations. |
| **Typography/Color/Motion Specialist** | Deep-dives into specific systems — names exact fonts, defines color architecture, specifies easing curves. |
| **Prompt Engineer** | Writes both prompts. Tests exact replica in AI coding assistant. Creates parameterized version with guidance notes. |
| **Editor** | Runs quality gate checklist. Ensures vocabulary consistency across entries. Approves for publication. |

### 8.3 Content Update Cadence

| Frequency | Action |
|-----------|--------|
| **Ongoing** | New designs captured and tagged as discovered |
| **Bi-weekly** | Cluster review — check if new designs form a new style or fit existing ones |
| **Monthly** | Publish 2-3 new complete style entries |
| **Quarterly** | Review axis positioning — adjust if styles evolved. Update reference galleries. |

---

## 9. Data Model & File Structure

### 9.1 Content Directory Structure

```
/content/
  ├── _meta/
  │   ├── site-config.mdx          # Site-wide settings
  │   └── vocabulary-index.json    # Master vocabulary cross-references
  │
  ├── styles/
  │   ├── dither-mono/
  │   │   ├── index.mdx            # ① Identity Card + ② Visual DNA
  │   │   ├── principles.mdx       # ③ Design Principles
  │   │   ├── typography.mdx       # ④ Typography System
  │   │   ├── color.mdx            # ⑤ Color Architecture
  │   │   ├── motion.mdx           # ⑥ Motion Principles
  │   │   ├── layout.mdx           # ⑦ Layout Grammar
  │   │   ├── texture.mdx          # ⑧ Texture & Surface
  │   │   ├── vocabulary.mdx       # ⑨ Vocabulary Bank
  │   │   ├── anti-slop.mdx        # ⑩ Anti-Slop Checklist
  │   │   ├── when-to-use.mdx      # ⑪ When to Use
  │   │   ├── mistakes.mdx         # ⑫ Common Mistakes
  │   │   ├── references.mdx       # ⑬ Reference Gallery
  │   │   ├── exact-prompt.mdx     # ⑭ Exact Replica Prompt
  │   │   └── template-prompt.mdx  # ⑮ Parameterized Template
  │   │
  │   ├── print-tech-paper/
  │   │   └── (same structure)
  │   │
  │   └── ... (30+ style directories)
  │
  └── guide/
      ├── methodology.mdx          # Prompt engineering guide
      ├── combining-styles.mdx     # How to blend aesthetics
      └── anti-slop-rules.mdx      # Universal anti-slop rules
```

### 9.2 MDX Frontmatter Schema

Each `index.mdx` file has frontmatter with structured metadata:

```yaml
---
slug: dither-mono
title: Dither Mono
oneLineEssence: "Brutalist B&W editorial where bitmap texture replaces color as the emotional medium."
axis:
  color: 1        # 1=monochrome, 6=polychrome
  typography: 2   # 1=system, 6=experimental
  motion: 2       # 1=static, 6=choreographed
  density: 2      # 1=monumental, 6=dense
  texture: 5      # 1=clean, 6=raw
  layout: 4       # 1=grid-rigid, 6=experimental
moodKeywords:
  - Stark
  - Monumental
  - Authoritative
  - Raw
  - Dark
difficulty: 4     # 1-5 stars
tags:
  - monochrome
  - brutalist
  - editorial
  - dither
  - bitmap
thumbnail: /images/styles/dither-mono/thumb.jpg
heroImage: /images/styles/dither-mono/hero.jpg
testedWith:
  - cursor
  - claude-code
  - v0
publishDate: 2026-08-15
lastUpdated: 2026-08-15
status: published  # draft | review | published
---
```

### 9.3 Search Index

At build time, a Flexsearch index is generated from:
- Style names and one-line essences
- Vocabulary terms (all tiers)
- Tags and mood keywords
- Design principle summaries

The index is loaded client-side for instant search/filter without server round-trips.

---

## 10. Launch Scope & Phasing

### 10.1 Phase 1: Research & Foundation (Weeks 1-3)

| Deliverable | Description |
|-------------|-------------|
| **Research sweep** | 200-300 designs collected from all sources |
| **Style clustering** | 30+ styles identified, named, validated |
| **Vocabulary seed** | 200+ terms extracted and cross-referenced |
| **Landscape map** | Visual positioning of all styles on 6 axes |
| **Platform scaffold** | Next.js project, content structure, component library |

### 10.2 Phase 2: Content Production (Weeks 4-8)

| Deliverable | Description |
|-------------|-------------|
| **15 style entries** | First batch of complete 15-section entries |
| **Dual prompts** | Exact + parameterized for each style, tested |
| **Reference galleries** | 3-5 real examples per style |
| **Quality gate pass** | All entries validated against 17-point criteria |

### 10.3 Phase 3: Platform Build (Weeks 6-10, overlaps Phase 2)

| Deliverable | Description |
|-------------|-------------|
| **Gallery homepage** | Card grid, filter pills, responsive |
| **Style entry pages** | Full 15-section layout, sidebar TOC |
| **Prompt panel** | Dual-tab, copy-to-clipboard, section copy |
| **Vocabulary Lab** | Search, cross-references, axis browsing |
| **Prompt Guide** | Methodology pages |
| **SEO & performance** | Meta tags, OG images, Core Web Vitals optimization |

### 10.4 Phase 4: Remaining Content & Launch (Weeks 11-14)

| Deliverable | Description |
|-------------|-------------|
| **15+ remaining style entries** | Complete the 30+ library |
| **Landscape Map page** | Interactive visual relationship map |
| **Testing** | Cross-browser, responsive, prompt validation |
| **Launch** | Deploy, announce, gather feedback |

### 10.5 Post-Launch

| Cadence | Action |
|---------|--------|
| Monthly | 2-3 new style entries published |
| Quarterly | Axis map review, reference gallery refresh |
| Ongoing | Community feedback integration, new research sources |

---

## 11. Success Criteria

### 11.1 Content Quality Metrics

| Metric | Target |
|--------|--------|
| **Style entries at launch** | 30+ complete, quality-gated entries |
| **Vocabulary terms** | 200+ cross-referenced terms |
| **Prompt test pass rate** | 90%+ of prompts produce style-accurate output when tested in Cursor/Claude Code |
| **Reference examples per style** | 3+ real-world examples minimum |

### 11.2 User Experience Metrics

| Metric | Target |
|--------|--------|
| **LCP** | < 1.5s |
| **Time to first prompt copy** | < 30s from landing (browse → click → copy) |
| **Mobile usability** | Full functionality on 375px+ viewports |
| **Accessibility** | WCAG 2.2 AA compliance |

### 11.3 Business Metrics (Post-Launch)

| Metric | Target (3 months) |
|--------|-------------------|
| **Prompt copies per day** | Track via analytics |
| **Unique visitors** | Track via analytics |
| **Most-copied styles** | Identify which aesthetics resonate most |
| **User feedback** | Collect via feedback widget |

---

## 12. Appendices

### Appendix A: Anti-Slop Playbook Reference

This PRD builds on the existing `referrence/anti_slop_playbook.md` which defines:
- The canonical symptoms of AI slop
- The infrastructure layer (MCPs, Skills, DESIGN.md)
- The prompt architecture (three-layer structure)
- The vocabulary of distinction (terms that unlock quality)
- Proven workflows
- Master prompt template
- Quick reference cheat sheet

### Appendix B: Existing Prompt Collection

7 example prompts in `referrence/prompts/` demonstrate the exact replica prompt format:
1. `example_prompt.md` — LGPSM (Futuristic Fashion)
2. `example_prompt2.md` — Mostar (Cinematic Scroll Story)
3. `example_prompt3.md` — Marcus Bennet (Editorial Portrait)
4. `example_prompt4.md` — Prisma (Dark Cinematic Studio)
5. `example_prompt5.md` — VEX (Liquid Glass Noir)
6. `example_prompt6.md` — Aethera (Cinematic Hero)
7. `example_prompt7.md` — Kestrel (5 Directions: Print Tech Paper, Data-as-Texture, Vast Quiet Cinematic, Dither Mono, Classical Remix)

### Appendix C: Design Inspiration Collection

40+ images and videos in `C:/Dev/Design inspo/` serve as seed material for research and style clustering.

### Appendix D: Related Skills & Tools

| Skill | Relevance |
|-------|-----------|
| `design-taste-frontend` | Anti-slop frontend principles |
| `frontend-design` | Distinctive, production-grade interface creation |
| `impeccable` | UI audit, polish, and design system governance |
| `apple-design` | Physical motion, spring animations, translucency |
| `emil-design-eng` | Component design, animation decisions, invisible details |
| `imagegen-frontend-web` | Generating reference comps for image-first pipeline |
| `review-animations` | Motion quality gate |
| `find-animation-opportunities` | Discover missing animations |

---

*Document version: 1.0*  
*Last updated: August 3, 2026*  
*Next step: User review → Research phase → Implementation planning*
