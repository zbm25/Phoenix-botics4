import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        await page.goto("http://127.0.0.1:3000/industries/retail#prequalification", wait_until="networkidle")
        await page.wait_for_timeout(500)

        prequal_html = await page.inner_html("#prequalification")
        print("Prequalification container rendered.")
        print(prequal_html[:1000])
        await browser.close()

asyncio.run(main())
