import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outputDir = path.join(process.cwd(), 'audit_screenshots');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const pagesToCapture = [
  { name: 'home', url: 'http://localhost:3000/' },
  { name: 'industry-retail', url: 'http://localhost:3000/industries/retail' },
  { name: 'industry-retail-prequalification', url: 'http://localhost:3000/industries/retail#prequalification' },
  { name: 'robot-uclean-series', url: 'http://localhost:3000/robots/uclean-series' },
  { name: 'robot-ulog-series', url: 'http://localhost:3000/robots/ulog-series' },
  { name: 'robot-userve-series', url: 'http://localhost:3000/robots/userve-series' },
  { name: 'services', url: 'http://localhost:3000/services' }
];

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

  for (const pageInfo of pagesToCapture) {
    // Desktop
    const dPage = await desktopContext.newPage();
    await dPage.goto(pageInfo.url, { waitUntil: 'networkidle' });
    await dPage.waitForTimeout(1000);
    await dPage.screenshot({ path: path.join(outputDir, `desktop_1440_${pageInfo.name}.png`), fullPage: true });
    await dPage.close();

    // Mobile
    const mPage = await mobileContext.newPage();
    await mPage.goto(pageInfo.url, { waitUntil: 'networkidle' });
    await mPage.waitForTimeout(1000);
    await mPage.screenshot({ path: path.join(outputDir, `mobile_390_${pageInfo.name}.png`), fullPage: true });
    await mPage.close();
  }

  await browser.close();
  console.log('Screenshots captured successfully in', outputDir);
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
