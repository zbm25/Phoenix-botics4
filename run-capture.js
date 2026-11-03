import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const PORT = 5173;
const PREVIEW_URL = `http://localhost:${PORT}/preview.html?hideHeader=true`;
const SCREENSHOT_DIR = path.resolve(process.cwd(), "audit_screenshots");

async function main() {
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  console.log("Launching Playwright...");
  const browser = await chromium.launch();

  // Desktop context with video recording
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    recordVideo: {
      dir: SCREENSHOT_DIR,
      size: { width: 1440, height: 900 }
    }
  });

  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto(PREVIEW_URL, { waitUntil: "networkidle" });
  await desktopPage.waitForTimeout(1000);

  const bentoElem = await desktopPage.$("#preview-robots-catalog");

  if (bentoElem) {
    // Scroll progressif pour déclencher toutes les animations "whileInView"
    await bentoElem.scrollIntoViewIfNeeded();
    await desktopPage.evaluate(async () => {
        const height = document.body.scrollHeight;
        for (let i = 0; i < height; i += 100) {
            window.scrollTo(0, i);
            await new Promise(r => setTimeout(r, 50));
        }
        window.scrollTo(0, 0);
    });

    // Attendre que la zone soit bien rendue après les animations
    await desktopPage.waitForTimeout(1000);

    // Capture de la section complète (les 5 blocs)
    console.log("Capturing Desktop 1440px full section...");
    await bentoElem.screenshot({
      path: path.join(SCREENSHOT_DIR, "bento-fleet-1440px-clean.png"),
    });

    // Capture ligne 1 (uClean + ROI)
    const row1 = await desktopPage.$(".bento-row-1");
    if (row1) {
        await row1.screenshot({ path: path.join(SCREENSHOT_DIR, "bento-row1-uclean-roi.png") });
    }

    // Capture ligne 2 (uLog + uServe)
    const row2 = await desktopPage.$(".bento-row-2");
    if (row2) {
        await row2.scrollIntoViewIfNeeded();
        await desktopPage.waitForTimeout(500);
        await row2.screenshot({ path: path.join(SCREENSHOT_DIR, "bento-row2-ulog-userve.png") });
    }

    // Capture ligne 3 (uLab)
    const row3 = await desktopPage.$(".bento-row-3");
    if (row3) {
        await row3.scrollIntoViewIfNeeded();
        await desktopPage.waitForTimeout(500);
        await row3.screenshot({ path: path.join(SCREENSHOT_DIR, "bento-row3-ulab.png") });
    }

    // Ouvrir le ROI selector
    const roiBtn = await desktopPage.$("#open-roi-selector");
    if (roiBtn) {
        await roiBtn.scrollIntoViewIfNeeded();
        await roiBtn.click();
        await desktopPage.waitForTimeout(500);
        await desktopPage.screenshot({ path: path.join(SCREENSHOT_DIR, "bento-roi-selector-open.png") });
    }

  } else {
    console.error("Section Bento non trouvée.");
  }

  await desktopContext.close(); // Saves the video

  // Rename the video
  const videoFiles = fs.readdirSync(SCREENSHOT_DIR).filter(f => f.endsWith('.webm'));
  if (videoFiles.length > 0) {
      fs.renameSync(path.join(SCREENSHOT_DIR, videoFiles[0]), path.join(SCREENSHOT_DIR, "bento-desktop-scroll.webm"));
  }

  // Mobile context with video recording
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    recordVideo: {
      dir: SCREENSHOT_DIR,
      size: { width: 390, height: 844 }
    }
  });

  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(PREVIEW_URL, { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(1000);

  const mobileBentoElem = await mobilePage.$("#preview-robots-catalog");
  if (mobileBentoElem) {
    // Scroll progressif sur mobile
    await mobilePage.evaluate(async () => {
        const height = document.body.scrollHeight;
        for (let i = 0; i < height; i += 100) {
            window.scrollTo(0, i);
            await new Promise(r => setTimeout(r, 50));
        }
        window.scrollTo(0, 0);
    });

    await mobilePage.waitForTimeout(1000);
    await mobileBentoElem.scrollIntoViewIfNeeded();

    console.log("Capturing Mobile 390px full section...");
    await mobileBentoElem.screenshot({
      path: path.join(SCREENSHOT_DIR, "bento-fleet-mobile-390px-clean.png"),
    });
  }

  await mobileContext.close(); // Saves the video

  // Rename mobile video
  const videoFiles2 = fs.readdirSync(SCREENSHOT_DIR).filter(f => f.endsWith('.webm') && f !== "bento-desktop-scroll.webm");
  if (videoFiles2.length > 0) {
      fs.renameSync(path.join(SCREENSHOT_DIR, videoFiles2[0]), path.join(SCREENSHOT_DIR, "bento-mobile-scroll.webm"));
  }

  console.log("All screenshots and videos successfully captured into:", SCREENSHOT_DIR);
  await browser.close();
}

main().catch((err) => {
  console.error("Screenshot capture failed:", err);
  process.exit(1);
});
