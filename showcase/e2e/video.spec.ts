import fs from "node:fs";
import path from "node:path";
import { test } from "@playwright/test";

test.use({
  viewport: { width: 1440, height: 900 },
  video: { mode: "on" },
});

test("lumen scroll video and storyboard", async ({ page }) => {
  test.setTimeout(180_000);
  const framesDir = ".verify/proofs/lumen-storyboard";
  fs.mkdirSync(framesDir, { recursive: true });

  await page.goto("/proofs/cinematic-scroll-story/lumen");
  await page.waitForTimeout(1500);

  const video = page.video();
  const steps = 20;
  for (let i = 0; i <= steps; i++) {
    await page.evaluate((ratio) => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, max * ratio);
    }, i / steps);
    await page.waitForTimeout(350);
    await page.screenshot({ path: `${framesDir}/frame-${String(i).padStart(2, "0")}.png` });
  }
  await page.waitForTimeout(800);

  const videoPath = video ? await video.path() : null;
  await page.close();
  if (videoPath) {
    const out = path.resolve(".verify/proofs/videos");
    fs.mkdirSync(out, { recursive: true });
    fs.copyFileSync(videoPath, path.join(out, "lumen-scroll.webm"));
  }
});
