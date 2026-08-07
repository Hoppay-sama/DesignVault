/**
 * Use-case mapping, derived from each style's `when-to-use.mdx` "Perfect For"
 * tables (docs/specs/2026-08-07-use-case-filter-concept.md §4).
 *
 * A use case is WHAT you are building (portfolio, dashboard, dev tool), not
 * HOW it looks (that is the cluster lens in clusters.ts). The mapping is
 * many-to-many: a style maps to several use cases; a use case must map to
 * ≥3 styles or it is dropped. Every style maps to ≥1 use case (no orphans).
 */

export interface UseCase {
  id: string;
  label: string;
  description: string;
  slugs: string[];
}

export const USE_CASES: UseCase[] = [
  {
    id: 'portfolio',
    label: 'Portfolio',
    description: 'Personal / artist / photographer / designer portfolio sites',
    slugs: [
      'dither-mono',
      'quiet-editorial',
      'editorial-portrait',
      'vast-quiet-cinematic',
      'dark-cinematic-studio',
      'cinematic-scroll-story',
      'kinetic-typography',
      'generative-algorithmic',
      'ai-surreal',
      'monochrome-single-accent',
      'hand-drawn-organic-illustration',
      'ethereal-dreamscape',
      'playful-interactive-maximal',
      'liquid-glass-noir',
    ],
  },
  {
    id: 'editorial',
    label: 'Editorial / Publication',
    description: 'Long-form journalism, magazines, publishing, zines, research publications',
    slugs: [
      'dither-mono',
      'typographic-brutalist',
      'editorial-serif-narrative',
      'classical-remix',
      'quiet-editorial',
      'editorial-portrait',
      'bold-anti-corporate-color',
      'grain-noise-texture',
      'hand-drawn-organic-illustration',
      'ethereal-dreamscape',
    ],
  },
  {
    id: 'app-ui',
    label: 'App / Product UI',
    description: 'SaaS, tools, apps, product interfaces (incl. fintech, AI/ML, gaming UI)',
    slugs: [
      'dark-tech-terminal',
      'obsidian-precision',
      'dark-cinematic-studio',
      'bold-anti-corporate-color',
      'swiss-mono-precision',
      'monochrome-single-accent',
      'ethereal-dreamscape',
      'data-as-texture',
      'data-visualization-aesthetic',
      'playful-interactive-maximal',
      'liquid-glass-noir',
    ],
  },
  {
    id: 'music-film-entertainment',
    label: 'Music / Film / Entertainment',
    description: 'Music, album, film/TV, streaming, festivals, entertainment brands',
    slugs: [
      'dither-mono',
      'typographic-brutalist',
      'vast-quiet-cinematic',
      'dark-cinematic-studio',
      'kinetic-typography',
      'retro-futuristic',
      'generative-algorithmic',
      'ai-surreal',
      'bold-anti-corporate-color',
      'grain-noise-texture',
      'playful-interactive-maximal',
      'liquid-glass-noir',
    ],
  },
  {
    id: 'data',
    label: 'Data / Dashboard',
    description: 'Analytics, BI, dashboards, data platforms, monitoring',
    slugs: [
      'dither-mono',
      'dark-tech-terminal',
      'obsidian-precision',
      'swiss-mono-precision',
      'monochrome-single-accent',
      'print-tech-paper',
      'data-as-texture',
      'data-visualization-aesthetic',
    ],
  },
  {
    id: 'dev-tools',
    label: 'Dev Tools',
    description: 'Developer tools, IDEs, API docs, technical documentation, infrastructure',
    slugs: [
      'dark-tech-terminal',
      'obsidian-precision',
      'quiet-editorial',
      'swiss-mono-precision',
      'monochrome-single-accent',
      'print-tech-paper',
      'data-as-texture',
      'data-visualization-aesthetic',
    ],
  },
  {
    id: 'ecommerce',
    label: 'E-commerce (boutique)',
    description: 'DTC / luxury / single-product showcase — excludes mass catalogs',
    slugs: [
      'luxury-refined-restraint',
      'three-d-product-showcase',
      'futuristic-fashion',
      'organic-botanical-warmth',
      'grain-noise-texture',
      'hand-drawn-organic-illustration',
      'ethereal-dreamscape',
      'liquid-glass-noir',
    ],
  },
  {
    id: 'landing-campaign',
    label: 'Landing / Campaign',
    description: 'Campaign microsites, product launches, events, experiential',
    slugs: [
      'typographic-brutalist',
      'kinetic-typography',
      'retro-futuristic',
      'generative-algorithmic',
      'bold-anti-corporate-color',
      'ethereal-dreamscape',
      'playful-interactive-maximal',
    ],
  },
  {
    id: 'agency',
    label: 'Agency / Studio',
    description: 'Creative studios, design studios, production houses, agencies',
    slugs: [
      'typographic-brutalist',
      'dark-cinematic-studio',
      'kinetic-typography',
      'retro-futuristic',
      'generative-algorithmic',
      'futuristic-fashion',
      'liquid-glass-noir',
    ],
  },
  {
    id: 'experimental',
    label: 'Experimental / Interactive',
    description: 'Generative, motion-forward, gamified, avant-garde, interactive',
    slugs: [
      'kinetic-typography',
      'retro-futuristic',
      'generative-algorithmic',
      'ai-surreal',
      'bold-anti-corporate-color',
      'playful-interactive-maximal',
    ],
  },
  {
    id: 'three-3d-scroll',
    label: '3D / Scroll Story',
    description: '3D product showcase, scroll-driven cinematic narrative, spatial',
    slugs: ['cinematic-scroll-story', 'three-d-product-showcase', 'liquid-glass-noir'],
  },
];

/** Display labels + one-line definitions, keyed by use-case id. */
export const USE_CASE_LABELS: Record<string, { label: string; description: string }> =
  Object.fromEntries(
    USE_CASES.map((uc) => [uc.id, { label: uc.label, description: uc.description }])
  );

export function getUseCasesForSlug(slug: string): UseCase[] {
  return USE_CASES.filter((uc) => uc.slugs.includes(slug));
}