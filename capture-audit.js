import { chromium } from "playwright";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const PORT = 5173;
const PREVIEW_URL = `http://localhost:${PORT}/preview.html`;
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
    await waitForServer(PREVIEW_URL);
    console.log("Vite server ready. Launching Playwright...");

    const browser = await chromium.launch();

    // 1. Desktop Full Page 1440px
    console.log("Capturing Desktop 1440px...");
    const desktopPage = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    await desktopPage.goto(PREVIEW_URL, { waitUntil: "networkidle" });
    await desktopPage.waitForTimeout(1500);

    await desktopPage.screenshot({
      path: path.join(SCREENSHOT_DIR, "desktop-1440.png"),
      fullPage: true,
    });

    // 2. Bento Grid 3 Ranges Detail
    console.log("Capturing Bento 3 Ranges...");
    const bentoElem = await desktopPage.$("#robots-catalog");
    if (bentoElem) {
      await bentoElem.scrollIntoViewIfNeeded();
      await desktopPage.waitForTimeout(500);
      await bentoElem.screenshot({
        path: path.join(SCREENSHOT_DIR, "bento-3-ranges.png"),
      });
    }

    // 3. Videos -> Logos -> Services Transition
    console.log("Capturing Videos -> Logos -> Services transition...");
    const videoElem = await desktopPage.$("#robots-in-action");
    if (videoElem) {
      await videoElem.scrollIntoViewIfNeeded();
      await desktopPage.waitForTimeout(500);
      await desktopPage.screenshot({
        path: path.join(SCREENSHOT_DIR, "videos-logos-services.png"),
        // Capture viewport starting at videos section
      });
    }

    // 4. Mobile Full Page 390px
    console.log("Capturing Mobile 390px...");
    const mobilePage = await browser.newPage({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    await mobilePage.goto(PREVIEW_URL, { waitUntil: "networkidle" });
    await mobilePage.waitForTimeout(1500);

    await mobilePage.screenshot({
      path: path.join(SCREENSHOT_DIR, "mobile-390.png"),
      fullPage: true,
    });

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
