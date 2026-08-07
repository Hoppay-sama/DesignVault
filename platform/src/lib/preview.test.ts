import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parsePreviewFrontmatter } from './preview.ts';

const VALID = `---
layout: terminal
displayFont: jetbrains-mono
bodyFont: inter
background: '#0A0A0F'
surface: '#16161E'
ink: '#E6E6EF'
accent: '#00E5A0'
texture: mono-lines
motif: ticker
---`;

test('parses valid frontmatter into a StylePreview', () => {
  const p = parsePreviewFrontmatter(VALID);
  assert.ok(p);
  assert.equal(p.layout, 'terminal');
  assert.equal(p.displayFont, 'jetbrains-mono');
  assert.equal(p.bodyFont, 'inter');
  assert.equal(p.background, '#0A0A0F');
  assert.equal(p.texture, 'mono-lines');
  assert.equal(p.motif, 'ticker');
});

test('returns undefined for non-frontmatter text', () => {
  assert.equal(parsePreviewFrontmatter('no frontmatter here'), undefined);
});

test('normalizes unknown enums to defaults', () => {
  const p = parsePreviewFrontmatter('---\nlayout: nonsense\ntexture: sparkles\nmotif: explode\n---');
  assert.ok(p);
  assert.equal(p.layout, 'editorial');
  assert.equal(p.texture, 'none');
  assert.equal(p.motif, 'none');
});

test('drops invalid hex and empty font keys', () => {
  const p = parsePreviewFrontmatter(`---
layout: grid
displayFont: '  '
background: '#GGGGGG'
accent: red
---`);
  assert.ok(p);
  assert.equal(p.displayFont, undefined);
  assert.equal(p.background, undefined);
  assert.equal(p.accent, undefined);
  assert.equal(p.layout, 'grid');
});

test('returns undefined for empty input', () => {
  assert.equal(parsePreviewFrontmatter(''), undefined);
});
