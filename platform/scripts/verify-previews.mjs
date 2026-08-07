import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const ROOT = path.resolve(import.meta.dirname, '..', '..');
const CONTENT_DIR = path.join(ROOT, 'content', 'styles');
const LAYOUTS = ['editorial', 'brutalist', 'terminal', 'cinematic', 'grid', 'asymmetric'];
const TEXTURES = ['none', 'grain', 'paper', 'grid-lines', 'mono-lines'];
const MOTIFS = ['marquee', 'ticker', 'orbit', 'none'];
const HEX = /^#[0-9a-fA-F]{6}$/;

const errors = [];
const slugs = fs.readdirSync(CONTENT_DIR).filter((s) =>
  fs.statSync(path.join(CONTENT_DIR, s)).isDirectory());
for (const slug of slugs) {
  const file = path.join(CONTENT_DIR, slug, 'preview.mdx');
  if (!fs.existsSync(file)) { errors.push(`${slug}: preview.mdx missing`); continue; }
  const parsed = matter(fs.readFileSync(file, 'utf8'));
  const d = parsed.data;
  if (!d || typeof d !== 'object') { errors.push(`${slug}: no YAML frontmatter`); continue; }
  if (!LAYOUTS.includes(d.layout)) errors.push(`${slug}: layout must be one of ${LAYOUTS.join('|')}`);
  for (const k of ['background', 'surface', 'ink', 'accent']) {
    if (typeof d[k] === 'string' && !HEX.test(d[k])) errors.push(`${slug}: ${k} must be #RRGGBB`);
  }
  if (!TEXTURES.includes(d.texture)) errors.push(`${slug}: texture must be one of ${TEXTURES.join('|')}`);
  if (!MOTIFS.includes(d.motif)) errors.push(`${slug}: motif must be one of ${MOTIFS.join('|')}`);
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`verify-previews: OK (${slugs.length}/30)`);