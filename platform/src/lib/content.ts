import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { StyleEntry } from './types';

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

export function getStyleBySlug(slug: string): StyleEntry | null {
  const dirPath = path.join(CONTENT_DIR, slug);
  const indexPath = path.join(dirPath, 'index.mdx');

  if (!fs.existsSync(indexPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(indexPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Read optional sections
  const readSection = (filename: string): string | undefined => {
    const filePath = path.join(dirPath, filename);
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf8');
    }
    return undefined;
  };

  const readSectionArray = (filename: string): string[] | undefined => {
    const content = readSection(filename);
    if (content) {
      return content.split('\n').filter((line) => line.trim().length > 0);
    }
    return undefined;
  };

  return {
    slug,
    title: data.title || slug,
    oneLineEssence: data.oneLineEssence || '',
    axis: data.axis || { color: 1, typography: 1, motion: 1, density: 1, texture: 1, layout: 1 },
    moodKeywords: data.moodKeywords || [],
    difficulty: data.difficulty || 3,
    tags: data.tags || [],
    status: data.status || 'draft',
    visualDna: content || readSection('index.mdx'),
    principles: readSectionArray('principles.mdx'),
    typography: readSection('typography.mdx'),
    color: readSection('color.mdx'),
    motion: readSection('motion.mdx'),
    layout: readSection('layout.mdx'),
    texture: readSection('texture.mdx'),
    vocabulary: readSection('vocabulary.mdx'),
    antiSlop: readSectionArray('anti-slop.mdx'),
    whenToUse: readSection('when-to-use.mdx'),
    mistakes: readSectionArray('mistakes.mdx'),
    references: readSection('references.mdx'),
    exactPrompt: readSection('exact-prompt.mdx'),
    templatePrompt: readSection('template-prompt.mdx'),
  };
}

export function getAllStyles(): StyleEntry[] {
  const slugs = getAllStyleSlugs();
  return slugs
    .map((slug) => getStyleBySlug(slug))
    .filter((style): style is StyleEntry => style !== null)
    .sort((a, b) => a.title.localeCompare(b.title));
}
