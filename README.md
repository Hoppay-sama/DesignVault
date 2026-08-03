# DesignVault — Design Inspiration Platform

A curated design inspiration platform featuring 30+ distinct aesthetics with full design intelligence and ready-to-use AI prompts.

## Overview

DesignVault helps designers and developers create exceptional landing pages by providing:
- **30+ design styles** — from Dither Mono to Playful Interactive Maximal
- **Complete design intelligence** — principles, vocabulary, anti-patterns, references
- **Dual prompt system** — exact replica + parameterized templates for AI coding assistants
- **Interactive discovery** — filter by axis, search by vocabulary, browse by style

## Project Structure

```
Anti-slop Design Concept/
├── content/                    # Style content (MDX files)
│   └── styles/                 # 30 style directories
│       ├── dither-mono/        # 14 files (complete)
│       ├── vast-quiet-cinematic/
│       ├── obsidian-precision/
│       └── ... (27 more)
├── docs/
│   └── specs/                  # Product documentation
│       ├── 2026-08-03-design-inspiration-platform-prd.md
│       └── 2026-08-03-design-taxonomy-vocabulary.md
├── platform/                   # Next.js web application
│   ├── src/
│   │   └── app/               # App router pages
│   └── package.json
├── referrence/                 # Original reference materials
│   ├── anti_slop_playbook.md
│   └── prompts/               # 7 example prompts
└── .gitignore
```

## Quick Start

### Platform (Web App)

```bash
cd platform
npm install
npm run dev
```

Open http://localhost:3000

### Content

Style entries are in `content/styles/`. Each style has:
- `index.mdx` — Identity, visual DNA, principles
- `typography.mdx`, `color.mdx`, `motion.mdx`, etc.
- `exact-prompt.mdx` — Copy-paste ready prompt
- `template-prompt.mdx` — Parameterized version

## Design Taxonomy

30 styles across 6 axes:
1. **Color Register** — Monochrome → Polychrome
2. **Typographic Register** — System → Experimental
3. **Motion Intensity** — Static → Hyper-Kinetic
4. **Visual Density** — Monumental → Cockpit
5. **Texture & Surface** — Clean → Raw
6. **Layout Structure** — Grid-Rigid → Broken

## Style Clusters

- **Dark & Monumental** — Dither Mono, Obsidian Precision, Typographic Brutalist
- **Editorial & Serif** — Editorial Serif Narrative, Classical Remix, Quiet Editorial
- **Cinematic & Motion-Heavy** — Vast Quiet Cinematic, Dark Cinematic Studio, Cinematic Scroll Story
- **Experimental & Type-Forward** — Kinetic Typography, Retro-Futuristic, Generative Algorithmic
- **Clean & Structured** — Swiss Mono Precision, Monochrome+Accent, Futuristic Fashion
- **Warm & Organic** — Organic Botanical Warmth, Grain/Noise Texture, Hand-Drawn
- **Dense & Data-Forward** — Data-as-Texture, Data Visualization Aesthetic, Playful Maximal
- **Glass & Spatial** — Liquid Glass Noir, Editorial Portrait

## Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Content:** MDX
- **Search:** Flexsearch (planned)
- **Icons:** Lucide React

## Development

```bash
# Install dependencies
cd platform && npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## License

Private project. All rights reserved.

---

*Built with the Anti-Slop Playbook principles.*
