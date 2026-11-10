import { chromium } from "playwright";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const PORT = 5173;
const URL = `http://localhost:${PORT}/`;
const SCREENSHOT_DIR = path.resolve(process.cwd(), "audit_screenshots");

async function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch (e) {
      // server not ready yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server at ${url} failed to respond within ${timeoutMs}ms`);
}

async function main() {
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  console.log("Starting Vite dev server...");
  const viteProcess = spawn("npx", ["vite", "--port", String(PORT)], {
    stdio: "inherit",
    shell: true,
  });

  try {
    await waitForServer(URL);
    console.log("Vite server ready. Launching Playwright...");

    const browser = await chromium.launch();

    // 1. Desktop Full Page 1440px
    console.log("Capturing Desktop 1440px...");
    const desktopPage = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    await desktopPage.goto(URL, { waitUntil: "networkidle" });
    await desktopPage.waitForTimeout(1500);

    // Simulate scroll to trigger animations
    await desktopPage.evaluate(async () => {
        const height = document.body.scrollHeight;
        for (let i = 0; i < height; i += 100) {
            window.scrollTo(0, i);
            await new Promise(r => setTimeout(r, 50));
        }
        window.scrollTo(0, 0);
    });
    await desktopPage.waitForTimeout(1000);

    const bentoElem = await desktopPage.$("#robots-catalog");
    if (bentoElem) {
      await bentoElem.scrollIntoViewIfNeeded();
      await desktopPage.waitForTimeout(500);
      await bentoElem.screenshot({
        path: path.join(SCREENSHOT_DIR, "bento-fleet-desktop-1440px.png"),
      });

      const roiBtn = await desktopPage.$("#open-roi-selector");
      if (roiBtn) {
          await roiBtn.scrollIntoViewIfNeeded();
          await roiBtn.click();
          await desktopPage.waitForTimeout(500);
          await desktopPage.screenshot({ path: path.join(SCREENSHOT_DIR, "bento-roi-selector-desktop-open.png") });
      }
    } else {
        await desktopPage.screenshot({
          path: path.join(SCREENSHOT_DIR, "bento-fleet-desktop-1440px-fallback.png"),
          fullPage: true,
        });
    }

    // 2. Mobile Full Page 390px
    console.log("Capturing Mobile 390px...");
    const mobilePage = await browser.newPage({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    await mobilePage.goto(URL, { waitUntil: "networkidle" });
    await mobilePage.waitForTimeout(1500);

    // Simulate scroll to trigger animations
    await mobilePage.evaluate(async () => {
        const height = document.body.scrollHeight;
        for (let i = 0; i < height; i += 100) {
            window.scrollTo(0, i);
            await new Promise(r => setTimeout(r, 50));
        }
        window.scrollTo(0, 0);
    });
    await mobilePage.waitForTimeout(1000);

    const mobileBentoElem = await mobilePage.$("#robots-catalog");
    if (mobileBentoElem) {
      await mobileBentoElem.scrollIntoViewIfNeeded();
      await mobilePage.waitForTimeout(500);
      await mobileBentoElem.screenshot({
        path: path.join(SCREENSHOT_DIR, "bento-fleet-mobile-390px.png"),
      });

      const mobileRoiBtn = await mobilePage.$("#open-roi-selector");
      if (mobileRoiBtn) {
          await mobileRoiBtn.scrollIntoViewIfNeeded();
          await mobileRoiBtn.click();
          await mobilePage.waitForTimeout(500);
          await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, "bento-roi-selector-mobile-open.png") });
      }
    }

    console.log("All screenshots successfully captured into:", SCREENSHOT_DIR);
    await browser.close();
  } finally {
    console.log("Stopping Vite server...");
    viteProcess.kill("SIGINT");
  }
}

main().catch((err) => {
  console.error("Screenshot capture failed:", err);
  process.exit(1);
});
