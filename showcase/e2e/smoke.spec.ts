import { expect, test } from "@playwright/test";

const routes = [
  "/proofs/dither-mono",
  "/proofs/cinematic-scroll-story",
  "/proofs/vast-quiet-cinematic",
];

for (const route of routes) {
  test(`${route} renders with a clean console`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(String(error)));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(errors).toEqual([]);
  });
}
