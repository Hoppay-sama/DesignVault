import { test, expect } from '@playwright/test';

const MOTION_HIGH = ['editorial-serif-narrative', 'kinetic-typography', 'dark-tech-terminal'];
const MOTION_LOW = ['quiet-editorial', 'swiss-mono-precision'];
const SIX_LAYOUTS = [
  'editorial-serif-narrative', 'typographic-brutalist', 'dark-tech-terminal',
  'dark-cinematic-studio', 'swiss-mono-precision', 'kinetic-typography',
];

test('landing shows 30 specimen previews with zero console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto('/');
  await expect(page.getByTestId('specimen-preview')).toHaveCount(30);
  expect(errors).toEqual([]);
});

test('specimen cards still navigate to style pages', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('specimen-preview').first().click();
  await expect(page).toHaveURL(/\/style\//);
});

test('detail pages render the framed mockup without overflow', async ({ page }) => {
  for (const slug of SIX_LAYOUTS) {
    await page.goto(`/style/${slug}`);
    await expect(page.getByTestId('mini-page-mockup')).toBeVisible();
    const overflow = await page.evaluate(
      () => document.scrollingElement!.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow, `${slug} overflows horizontally`).toBeLessThanOrEqual(0);
    const errors: string[] = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    expect(errors).toEqual([]);
  }
});

test('motion >= 3 styles expose exactly one hover cue', async ({ page }) => {
  for (const slug of MOTION_HIGH) {
    await page.goto(`/style/${slug}`);
    await expect(page.getByTestId('mini-page-mockup')).toBeVisible();
  }
  await page.goto('/');
  for (const slug of MOTION_HIGH) {
    const card = page.locator(`[data-testid="style-card"][data-slug="${slug}"]`);
    await expect(card.getByTestId('preview-cue')).toHaveCount(1);
  }
});

test('motion <= 2 styles have no hover cue', async ({ page }) => {
  await page.goto('/');
  for (const slug of MOTION_LOW) {
    const card = page.locator(`[data-testid="style-card"][data-slug="${slug}"]`);
    await expect(card.getByTestId('preview-cue')).toHaveCount(0);
  }
});

test('fallback: style without preview.mdx shows gradient placeholder, page 200', async ({ page }) => {
  // Manual companion check (cannot rename files inside Playwright): see Step 4.
  await page.goto('/');
  await expect(page.getByTestId('specimen-preview')).toHaveCount(30);
});

test('a11y: decorative specimens are aria-hidden, cards stay links', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('specimen-preview').first()).toHaveAttribute('aria-hidden', 'true');
  await expect(page.locator('a[href^="/style/"]').first()).toBeVisible();
});

test('category pages resolve specimen display fonts via PreviewFontProvider', async ({ page }) => {
  // Regresses the fix where /category/* grids omitted the provider, so
  // --font-* vars were undefined and specimen type silently fell back to
  // the platform body font. Font classes come from the literal safelist in
  // fonts.ts (FONT_CLASSES), which is what makes Tailwind emit the arbitrary
  // font utilities; these fixtures verify each in-use family resolves.
  const FIXTURES: Array<{
    category: string;
    slug: string;
    displayClass: string;
    fontFamily: string;
  }> = [
    {
      category: '/category/editorial-and-serif',
      slug: 'editorial-serif-narrative',
      displayClass: 'font-[family-name:var(--font-fraunces)]',
      fontFamily: 'Fraunces',
    },
    {
      category: '/category/dark-and-monumental',
      slug: 'typographic-brutalist',
      displayClass: 'font-[family-name:var(--font-archivo)]',
      fontFamily: 'Archivo',
    },
  ];
  for (const fixture of FIXTURES) {
    await test.step(fixture.slug, async () => {
      await page.goto(fixture.category);
      const specimen = page.locator(
        `[data-testid="style-card"][data-slug="${fixture.slug}"] [data-testid="specimen-preview"]`
      );
      await expect(specimen).toHaveCount(1);
      const result = await specimen.evaluate((node, { displayClass, fontFamily }) => {
        const seen = new Set<string>();
        const visit = (el: Element) => {
          seen.add(getComputedStyle(el).fontFamily);
          Array.from(el.children).forEach(visit);
        };
        visit(node);
        return {
          hasDisplayClass: Array.from(node.querySelectorAll('*')).some((el) =>
            el.classList.contains(displayClass)
          ),
          families: Array.from(seen),
        };
      }, fixture);
      expect(result.hasDisplayClass).toBe(true);
      expect(result.families.some((f) => f.includes(fixture.fontFamily))).toBe(true);
      expect(
        result.families.some((f) => !f.includes('Inter Tight')),
        `expected at least one specimen family to differ from the platform body font (Inter Tight), got: ${result.families.join(' | ')}`
      ).toBe(true);
    });
  }
});
