import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outputDir = path.join(process.cwd(), 'audit_screenshots');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function capture() {
  const browser = await chromium.launch();

  // Desktop 1440px
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });

  // Mobile 390px
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });

  // 1. Capture Desktop Mockup
  const dPage = await desktopContext.newPage();
  await dPage.goto('http://localhost:3000/preview-mockup', { waitUntil: 'networkidle' });
  await dPage.waitForTimeout(1000);
  await dPage.screenshot({ path: path.join(outputDir, 'desktop_1440_fleet_mockup.png'), fullPage: true });
  await dPage.close();

  // 2. Capture Mobile Mockup
  const mPage = await mobileContext.newPage();
  await mPage.goto('http://localhost:3000/preview-mockup', { waitUntil: 'networkidle' });
  await mPage.waitForTimeout(1000);
  await mPage.screenshot({ path: path.join(outputDir, 'mobile_390_fleet_mockup.png'), fullPage: true });
  await mPage.close();

  await browser.close();
  console.log('Mockup screenshots captured successfully in', outputDir);
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
