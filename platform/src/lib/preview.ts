import matter from 'gray-matter';
import type { StylePreview } from './types';

const HEX_RE = /^#[0-9a-fA-F]{6}$/;
const LAYOUTS = ['editorial', 'brutalist', 'terminal', 'cinematic', 'grid', 'asymmetric'] as const;
const TEXTURES = ['none', 'grain', 'paper', 'grid-lines', 'mono-lines'] as const;
const MOTIFS = ['marquee', 'ticker', 'orbit', 'none'] as const;

/**
 * Parses the YAML frontmatter of a preview.mdx file into a StylePreview.
 * Returns undefined when frontmatter is absent or unparseable (callers
 * degrade to the gradient placeholder / hidden mockup).
 */
export function parsePreviewFrontmatter(raw: string): StylePreview | undefined {
  if (!raw || raw.trim().length === 0) return undefined;
  if (!matter.test(raw)) return undefined;
  const parsed = matter(raw);
  if (!parsed.data || typeof parsed.data !== 'object' || Array.isArray(parsed.data)) {
    return undefined;
  }
  const d = parsed.data as Record<string, unknown>;
  return {
    layout: LAYOUTS.includes(d.layout as (typeof LAYOUTS)[number])
      ? (d.layout as StylePreview['layout'])
      : 'editorial',
    displayFont: typeof d.displayFont === 'string' && d.displayFont.trim().length > 0
      ? d.displayFont.trim() : undefined,
    bodyFont: typeof d.bodyFont === 'string' && d.bodyFont.trim().length > 0
      ? d.bodyFont.trim() : undefined,
    background: typeof d.background === 'string' && HEX_RE.test(d.background) ? d.background : undefined,
    surface: typeof d.surface === 'string' && HEX_RE.test(d.surface) ? d.surface : undefined,
    ink: typeof d.ink === 'string' && HEX_RE.test(d.ink) ? d.ink : undefined,
    accent: typeof d.accent === 'string' && HEX_RE.test(d.accent) ? d.accent : undefined,
    texture: TEXTURES.includes(d.texture as (typeof TEXTURES)[number])
      ? (d.texture as StylePreview['texture']) : 'none',
    motif: MOTIFS.includes(d.motif as (typeof MOTIFS)[number])
      ? (d.motif as StylePreview['motif']) : 'none',
  };
}