import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getFontClasses, FONT_CATALOG } from './fonts.ts';

test('catalog has all 10 family keys', () => {
  assert.deepEqual(
    Object.keys(FONT_CATALOG).sort(),
    ['archivo', 'fraunces', 'inter', 'jetbrains-mono', 'newsreader', 'oswald',
     'playfair-display', 'source-serif-4', 'space-grotesk', 'space-mono'].sort()
  );
});

test('known keys resolve to variable classes', () => {
  const { display, body } = getFontClasses({
    layout: 'editorial', displayFont: 'fraunces', bodyFont: 'inter',
    texture: 'none', motif: 'none',
  });
  assert.ok(display.includes('var(--font-fraunces)'));
  assert.ok(body.includes('var(--font-inter)'));
});

test('unknown keys fall back to platform tokens', () => {
  const { display, body } = getFontClasses({
    layout: 'editorial', displayFont: 'comic-sans', bodyFont: undefined,
    texture: 'none', motif: 'none',
  });
  assert.equal(display, 'font-display');
  assert.equal(body, 'font-body');
});

test('undefined preview falls back to platform tokens', () => {
  const { display, body } = getFontClasses(undefined);
  assert.equal(display, 'font-display');
  assert.equal(body, 'font-body');
});
