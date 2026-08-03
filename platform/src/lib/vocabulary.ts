import { getAllStyles } from './content';

export interface VocabularyTerm {
  term: string;
  description: string;
  category: string;
  styles: { slug: string; title: string }[];
}

/**
 * Extracts vocabulary terms from all styles.
 * Parses vocabulary.mdx tables and supplements with moodKeywords/tags.
 */
export function buildVocabularyIndex(): VocabularyTerm[] {
  const styles = getAllStyles();
  const termMap = new Map<string, VocabularyTerm>();

  for (const style of styles) {
    const styleRef = { slug: style.slug, title: style.title };

    // Parse vocabulary.mdx if it exists
    if (style.vocabulary) {
      const lines = style.vocabulary.split('\n');
      let currentCategory = 'General';

      for (const line of lines) {
        // Track category from headings
        if (line.startsWith('## ')) {
          currentCategory = line.replace('## ', '').replace(/---/g, '').trim();
          continue;
        }

        // Parse table rows: | `term` | description |
        const tableMatch = line.match(
          /\|\s*`([^`]+)`\s*\|\s*(.+?)\s*\|/
        );
        if (tableMatch) {
          const term = tableMatch[1].trim();
          const description = tableMatch[2].trim();
          addTerm(termMap, term, description, currentCategory, styleRef);
          continue;
        }

        // Parse prompt-ready phrases: "phrase"
        const phraseMatch = line.match(/^"([^"]+)"/);
        if (phraseMatch) {
          const term = phraseMatch[1].trim();
          addTerm(termMap, term, 'Prompt-ready phrase', 'Prompt Phrases', styleRef);
        }
      }
    }

    // Add mood keywords as terms
    for (const keyword of style.moodKeywords) {
      addTerm(termMap, keyword, `Mood keyword for ${style.title}`, 'Mood', styleRef);
    }

    // Extract key terms from visual DNA content
    if (style.visualDna) {
      const boldTerms = style.visualDna.match(/\*\*([^*]+)\*\*/g);
      if (boldTerms) {
        for (const bold of boldTerms) {
          const term = bold.replace(/\*\*/g, '').trim();
          if (term.length > 2 && term.length < 50) {
            addTerm(
              termMap,
              term,
              `Key element of ${style.title}`,
              'Visual Element',
              styleRef
            );
          }
        }
      }
    }
  }

  return Array.from(termMap.values()).sort((a, b) =>
    a.term.localeCompare(b.term)
  );
}

function addTerm(
  map: Map<string, VocabularyTerm>,
  term: string,
  description: string,
  category: string,
  styleRef: { slug: string; title: string }
): void {
  const key = term.toLowerCase();
  const existing = map.get(key);
  if (existing) {
    // Avoid duplicate style entries
    if (!existing.styles.some((s) => s.slug === styleRef.slug)) {
      existing.styles.push(styleRef);
    }
  } else {
    map.set(key, {
      term,
      description,
      category,
      styles: [styleRef],
    });
  }
}

/**
 * Returns all unique tags across all styles.
 */
export function getAllTags(): string[] {
  const styles = getAllStyles();
  const tagSet = new Set<string>();
  for (const style of styles) {
    for (const tag of style.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}
