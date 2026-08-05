/**
 * Style relationship clusters, from the taxonomy doc Part 5
 * (docs/specs/2026-08-03-design-taxonomy-vocabulary.md).
 *
 * Two styles were added after the taxonomy was written and are assigned
 * here by DNA match: editorial-portrait → Editorial & Serif (B),
 * bold-anti-corporate-color → Experimental & Type-Forward (D).
 */

export interface StyleCluster {
  id: string;
  name: string;
  sharedDna: string;
  differentiator: string;
  color: string;
  slugs: string[];
}

export const STYLE_CLUSTERS: StyleCluster[] = [
  {
    id: 'A',
    name: 'Dark & Monumental',
    sharedDna: 'Near-black ground, monumental type, minimal color, high contrast',
    differentiator: 'Texture (Dither=dithered, Terminal=neon, Brutalist=raw, Precision=clean)',
    color: '#EDEDED',
    slugs: ['dither-mono', 'dark-tech-terminal', 'typographic-brutalist', 'obsidian-precision'],
  },
  {
    id: 'B',
    name: 'Editorial & Serif',
    sharedDna: 'Serif typography, generous whitespace, refined restraint',
    differentiator: 'Density (Narrative=dense, Quiet=minimal, Luxury=extreme space, Classical=ornamented)',
    color: '#E8B4B8',
    slugs: [
      'editorial-serif-narrative',
      'classical-remix',
      'quiet-editorial',
      'luxury-refined-restraint',
      'editorial-portrait',
    ],
  },
  {
    id: 'C',
    name: 'Cinematic & Motion-Heavy',
    sharedDna: 'Full-bleed imagery, scroll-driven motion, atmospheric depth',
    differentiator: 'Control (Quiet=slow, Studio=warm, Scroll=choreographed, 3D=interactive)',
    color: '#5E6AD2',
    slugs: [
      'vast-quiet-cinematic',
      'dark-cinematic-studio',
      'cinematic-scroll-story',
      'three-d-product-showcase',
    ],
  },
  {
    id: 'D',
    name: 'Experimental & Type-Forward',
    sharedDna: 'Breaking conventional layout, motion as primary medium',
    differentiator: 'Source (Kinetic=type, Retro=chrome, Generative=code, AI=latent)',
    color: '#F59E0B',
    slugs: [
      'kinetic-typography',
      'retro-futuristic',
      'generative-algorithmic',
      'ai-surreal',
      'bold-anti-corporate-color',
    ],
  },
  {
    id: 'E',
    name: 'Clean & Structured',
    sharedDna: 'Grid-based, precise, restrained color, technical feel',
    differentiator: 'Temperature (Swiss=cold, Accent=signal, Fashion=white, Paper=sage)',
    color: '#34D399',
    slugs: [
      'swiss-mono-precision',
      'monochrome-single-accent',
      'futuristic-fashion',
      'print-tech-paper',
    ],
  },
  {
    id: 'F',
    name: 'Warm & Organic',
    sharedDna: 'Tactile surfaces, warm palette, human/organic feel',
    differentiator: 'Source (Botanical=nature, Grain=print, Drawn=hand, Dreamscape=digital)',
    color: '#FB923C',
    slugs: [
      'organic-botanical-warmth',
      'grain-noise-texture',
      'hand-drawn-organic-illustration',
      'ethereal-dreamscape',
    ],
  },
  {
    id: 'G',
    name: 'Dense & Data-Forward',
    sharedDna: 'Information-rich, dynamic, engaging',
    differentiator: 'Tone (Data-as-Texture=cinematic, Data-Viz=precise, Playful=energetic)',
    color: '#22D3EE',
    slugs: ['data-as-texture', 'data-visualization-aesthetic', 'playful-interactive-maximal'],
  },
  {
    id: 'H',
    name: 'Glass & Spatial',
    sharedDna: 'Translucent surfaces, backdrop-blur, layered depth',
    differentiator: 'Temperature (Noir=dark)',
    color: '#A78BFA',
    slugs: ['liquid-glass-noir'],
  },
];

export function getClusterForSlug(slug: string): StyleCluster | undefined {
  return STYLE_CLUSTERS.find((cluster) => cluster.slugs.includes(slug));
}
