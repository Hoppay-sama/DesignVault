import fs from "node:fs";
import { expect, test } from "@playwright/test";

const OUT = ".verify/proofs";

const plan: Array<[string, string, number[]]> = [
  ["dither-mono", "/proofs/dither-mono", [0, 0.28, 0.6, 0.95]],
  ["cinematic-kovra", "/proofs/cinematic-scroll-story", [0.25, 0.55, 0.9]],
  ["cinematic-lumen", "/proofs/cinematic-scroll-story/lumen", [0.25, 0.5, 0.95]],
  ["vast-longitude", "/proofs/vast-quiet-cinematic", [0.35, 0.7, 1]],
];

test("proofs render clean and capture frames", async ({ page }) => {
  test.setTimeout(180_000);
  fs.mkdirSync(OUT, { recursive: true });
  await page.setViewportSize({ width: 1440, height: 900 });

  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  for (const [name, route, ratios] of plan) {
    await page.goto(route);
    await page.waitForTimeout(1200);
    for (const ratio of ratios) {
      await page.evaluate((value) => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo(0, max * value);
      }, ratio);
      await page.waitForTimeout(2200);
      await page.screenshot({ path: `${OUT}/${name}-${String(ratio).replace(".", "_")}.png` });
    }
  }

  expect(errors).toEqual([]);
});
