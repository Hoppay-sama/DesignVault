export interface StyleAxis {
  color: number;
  typography: number;
  motion: number;
  density: number;
  texture: number;
  layout: number;
}

/**
 * Rendered-preview configuration parsed from content/styles/<slug>/preview.mdx.
 * All hex fields are validated 6-digit hex or undefined (component falls back
 * to platform tokens). layout/texture/motif are normalized at parse time.
 */
export interface StylePreview {
  layout: 'editorial' | 'brutalist' | 'terminal' | 'cinematic' | 'grid' | 'asymmetric';
  displayFont?: string;
  bodyFont?: string;
  background?: string;
  surface?: string;
  ink?: string;
  accent?: string;
  texture: 'none' | 'grain' | 'paper' | 'grid-lines' | 'mono-lines';
  motif: 'marquee' | 'ticker' | 'orbit' | 'none';
}

export interface StyleEntry {
  slug: string;
  title: string;
  oneLineEssence: string;
  axis: StyleAxis;
  moodKeywords: string[];
  difficulty: number;
  tags: string[];
  useCases: string[];
  status: string;
  testedWith?: string[];
  // Content sections
  visualDna?: string;
  principles?: string[];
  typography?: string;
  color?: string;
  motion?: string;
  layout?: string;
  texture?: string;
  vocabulary?: string;
  antiSlop?: string[];
  whenToUse?: string;
  mistakes?: string[];
  references?: string;
  exactPrompt?: string;
  templatePrompt?: string;
  preview?: StylePreview;
}
