import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { StyleEntry } from './types';
import { getUseCasesForSlug } from './use-cases';

const CONTENT_DIR = path.join(process.cwd(), '..', 'content', 'styles');

export function getAllStyleSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }
  return fs.readdirSync(CONTENT_DIR).filter((slug) => {
    const fullPath = path.join(CONTENT_DIR, slug);
    return fs.statSync(fullPath).isDirectory();
  });
}

/**
 * Extracts a `## Heading` block from an index.mdx body.
 * Handles both `##` and `###` heading levels. Returns undefined when the
 * heading is absent. Used to surface sections for styles whose content is
 * inline in index.mdx instead of split across section files.
 */
function extractBodySection(body: string, heading: string): string | undefined {
  const lines = body.split('\n');
  const start = lines.findIndex((line) =>
    new RegExp(`^#{2,3}\\s+${heading}\\s*$`).test(line)
  );
  if (start === -1) {
    return undefined;
  }
  const out: string[] = [];
  for (let i = start + 1; i < lines.length; i++) {
    if (/^#{1,3}\s/.test(lines[i])) {
      break;
    }
    out.push(lines[i]);
  }
  const text = out.join('\n').trim();
  return text.length > 0 ? text : undefined;
}

/**
 * Extracts `- [ ]` checklist items, stripping the checkbox marker.
 * Returns undefined when the text has no checklist items.
 */
function extractChecklist(text: string): string[] | undefined {
  const items = text
    .split('\n')
    .filter((line) => /^-\s*\[\s*\]/.test(line))
    .map((line) => line.replace(/^-\s*\[\s*\]\s*/, '').trim())
    .filter((line) => line.length > 0);
  return items.length > 0 ? items : undefined;
}

/** Strips markdown heading/list/number prefixes and bold markers from a line. */
function cleanLine(line: string): string {
  return line
    .replace(/^#{1,3}\s+/, '')
    .replace(/^[-*]\s+/, '')
    .replace(/^\d+\.\s+/, '')
    .replace(/\*\*/g, '')
    .trim();
}

/**
 * Splits a prompt file that contains both prompts (Dual Prompts format)
 * and strips heading noise from prompt text. Single-prompt files pass
 * through with only their heading lines removed.
 */
function splitDualPrompts(raw: string): { exact?: string; template?: string } {
  const marker = '## Parameterized Template';
  const idx = raw.indexOf(marker);
  if (idx === -1) {
    return { exact: stripPromptHeadings(raw) };
  }
  return {
    exact: stripPromptHeadings(raw.slice(0, idx)),
    template: stripPromptHeadings(raw.slice(idx + marker.length)),
  };
}

/** Drops markdown heading lines (H1 and section markers) from prompt text. */
function stripPromptHeadings(text: string): string {
  const lines = text.split('\n').filter((line) => {
    const t = line.trim();
    if (/^#\s+/.test(t)) return false;
    if (/^#{2,3}\s+Exact Replica Prompt\s*$/.test(t)) return false;
    if (/^#{2,3}\s+Exact Replica\s*$/.test(t)) return false;
    if (/^#{2,3}\s+Parameterized Template\s*$/.test(t)) return false;
    return true;
  });
  return lines.join('\n').trim();
}

/**
 * Parses the inline `## Prompts` section of an index.mdx body:
 * `**Exact:** <prompt>` and `**Template:** <prompt>` lines.
 */
function parseInlinePrompts(body: string): { exact?: string; template?: string } {
  const section = extractBodySection(body, 'Prompts');
  if (!section) {
    return {};
  }
  const result: { exact?: string; template?: string } = {};
  for (const line of section.split('\n')) {
    const exactMatch = line.match(/^\*\*Exact:\*\*\s*(.+)$/);
    const templateMatch = line.match(/^\*\*Template:\*\*\s*(.+)$/);
    if (exactMatch) result.exact = exactMatch[1].trim();
    if (templateMatch) result.template = templateMatch[1].trim();
  }
  return result;
}

export function getStyleBySlug(slug: string): StyleEntry | null {
  const dirPath = path.join(CONTENT_DIR, slug);
  const indexPath = path.join(dirPath, 'index.mdx');

  if (!fs.existsSync(indexPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(indexPath, 'utf8');
  const { data, content } = matter(fileContents);
  const body = content;

  // Read optional section files
  const readSection = (filename: string): string | undefined => {
    const filePath = path.join(dirPath, filename);
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf8');
    }
    return undefined;
  };

  // Section files win; fall back to the inline `## Section` in index.mdx body.
  const section = (filename: string, heading: string): string | undefined =>
    readSection(filename) || extractBodySection(body, heading);

  // Principles: file, then inline Design Principles / Key Elements / Key Techniques.
  const principlesRaw =
    readSection('principles.mdx') ||
    extractBodySection(body, 'Design Principles') ||
    extractBodySection(body, 'Key Elements') ||
    extractBodySection(body, 'Key Techniques');
  const principles = principlesRaw
    ? principlesRaw
        .split('\n')
        .map(cleanLine)
        .filter(
          (line) =>
            line.length > 0 && !/^(Design Principles|Key Elements|Key Techniques)$/i.test(line)
        )
    : undefined;

  // Anti-slop: checklist items from file or inline section.
  const antiSlopRaw = readSection('anti-slop.mdx') || extractBodySection(body, 'Anti-Slop');
  const antiSlop = antiSlopRaw ? extractChecklist(antiSlopRaw) : undefined;

  // Mistakes: file lines, minus heading noise.
  const mistakesRaw = readSection('mistakes.mdx');
  const mistakes = mistakesRaw
    ? mistakesRaw
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0 && !/^#\s*Common Mistakes\s*$/.test(line))
        .map((line) => line.replace(/^#{1,3}\s+/, ''))
    : undefined;

  // Prompts: section files (possibly Dual Prompts), else inline `## Prompts`.
  const exactRaw = readSection('exact-prompt.mdx');
  let exactPrompt: string | undefined;
  let templatePrompt: string | undefined;
  if (exactRaw) {
    const split = splitDualPrompts(exactRaw);
    exactPrompt = split.exact;
    templatePrompt = split.template;
  } else {
    const inline = parseInlinePrompts(body);
    exactPrompt = inline.exact;
    templatePrompt = inline.template;
  }
  if (!templatePrompt) {
    const templateRaw = readSection('template-prompt.mdx');
    if (templateRaw) {
      templatePrompt = stripPromptHeadings(templateRaw);
    }
  }

  return {
    slug,
    title: data.title || slug,
    oneLineEssence: data.oneLineEssence || '',
    axis: data.axis || { color: 1, typography: 1, motion: 1, density: 1, texture: 1, layout: 1 },
    moodKeywords: data.moodKeywords || [],
    difficulty: data.difficulty || 3,
    tags: data.tags || [],
    useCases: getUseCasesForSlug(slug).map((uc) => uc.id),
    status: data.status || 'draft',
    testedWith: data.testedWith || undefined,
    visualDna: extractBodySection(body, 'Visual DNA') || body || undefined,
    principles,
    typography: section('typography.mdx', 'Typography'),
    color: section('color.mdx', 'Color'),
    motion: section('motion.mdx', 'Motion'),
    layout: section('layout.mdx', 'Layout'),
    texture: section('texture.mdx', 'Texture'),
    vocabulary: section('vocabulary.mdx', 'Vocabulary'),
    antiSlop,
    whenToUse: section('when-to-use.mdx', 'When to Use'),
    mistakes,
    references: readSection('references.mdx'),
    exactPrompt,
    templatePrompt,
  };
}

export function getAllStyles(): StyleEntry[] {
  const slugs = getAllStyleSlugs();
  return slugs
    .map((slug) => getStyleBySlug(slug))
    .filter((style): style is StyleEntry => style !== null)
    .sort((a, b) => a.title.localeCompare(b.title));
}