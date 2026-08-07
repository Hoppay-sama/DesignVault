export interface StyleAxis {
  color: number;
  typography: number;
  motion: number;
  density: number;
  texture: number;
  layout: number;
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
}
