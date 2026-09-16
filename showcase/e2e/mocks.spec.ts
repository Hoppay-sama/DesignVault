import fs from "node:fs";
import { expect, test } from "@playwright/test";

const OUT = ".verify/mocks";

const routes = [
  ["dither-terminus", "/mocks/dither-mono/terminus"],
  ["dither-longwire", "/mocks/dither-mono/longwire"],
  ["dither-duotone", "/mocks/dither-mono/duotone"],
  ["cinematic-kovra", "/mocks/cinematic/kovra"],
  ["cinematic-lumen", "/mocks/cinematic/lumen"],
  ["cinematic-swell", "/mocks/cinematic/swell"],
  ["vast-longitude", "/mocks/vast/longitude"],
  ["vast-object-lesson", "/mocks/vast/object-lesson"],
  ["vast-closing-credits", "/mocks/vast/closing-credits"],
] as const;

const midAt: Record<string, number> = {
  "dither-longwire": 0.35,
  "cinematic-kovra": 0.6,
  "cinematic-lumen": 0.5,
  "cinematic-swell": 0.55,
  "vast-longitude": 0.5,
  "vast-object-lesson": 0.45,
};

test("mocks render clean and capture frames", async ({ page }) => {
  test.setTimeout(120_000);
  fs.mkdirSync(OUT, { recursive: true });
  await page.setViewportSize({ width: 1280, height: 800 });

  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  for (const [name, route] of routes) {
    await page.goto(route);
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${OUT}/${name}-top.png` });

    const ratio = midAt[name];
    if (ratio !== undefined) {
      await page.evaluate((value) => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo(0, max * value);
      }, ratio);
      await page.waitForTimeout(1800);
      await page.screenshot({ path: `${OUT}/${name}-mid.png` });
    }
  }

  await page.goto("/mocks/dither-mono/duotone");
  await page.waitForTimeout(700);
  const handle = page.locator('[role="slider"]').first();
  const box = await handle.boundingBox();
  if (box) {
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + 240, box.y + box.height / 2, { steps: 10 });
    await page.mouse.up();
    await page.waitForTimeout(400);
  }
  await page.screenshot({ path: `${OUT}/dither-duotone-drag.png` });

  expect(errors).toEqual([]);
});
