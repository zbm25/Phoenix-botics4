import { chromium } from 'playwright';

async function testConversionFlow() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('--- 1. Testing Home CTAs ---');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

  // Hero secondary CTA
  const heroBtnText = await page.locator('#hero-demo-btn').textContent();
  console.log('Home Hero Secondary CTA label:', heroBtnText.trim());

  // Services CTAs
  await page.goto('http://localhost:3000/#services', { waitUntil: 'networkidle' });
  const servicesBtns = await page.locator('#services button').allTextContents();
  console.log('Services section buttons:', servicesBtns.map(b => b.trim()));

  console.log('--- 2. Testing Robot Series Page CTAs & ROI Persistence ---');
  await page.goto('http://localhost:3000/robots/uclean-series', { waitUntil: 'networkidle' });

  // Top CTA
  const topCtaText = await page.locator('button:has-text("Estimer le ROI de cette gamme")').textContent();
  console.log('Series Top CTA:', topCtaText.trim());

  // Model Card CTAs
  const modelCtaText = await page.locator('button:has-text("Estimer le ROI de ce modèle")').first().textContent();
  console.log('Model Card CTA:', modelCtaText.trim());

  // Simulate ROI button click
  await page.locator('button:has-text("Vérifier la faisabilité sur mon site")').click();
  await page.waitForTimeout(500);
  console.log('Navigated URL after ROI check:', page.url());

  console.log('--- 3. Testing Retail Industry Page Copywriting ---');
  await page.goto('http://localhost:3000/industries/retail', { waitUntil: 'networkidle' });
  const heroHeading = await page.locator('h1').textContent();
  console.log('Retail Hero Heading:', heroHeading.replace(/\s+/g, ' ').trim());

  const sectionTitle = await page.locator('#chiffres h2').textContent();
  console.log('Retail Impact Section Title:', sectionTitle.trim());

  await browser.close();
  console.log('--- Verification Complete ---');
}

testConversionFlow().catch(err => {
  console.error('Error during verification:', err);
  process.exit(1);
});
