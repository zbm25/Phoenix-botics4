import asyncio
import os
from playwright.async_api import async_playwright

pages = [
    ("/industries/retail", "industry_retail"),
    ("/industries/hospitality", "industry_hospitality"),
    ("/industries/health", "industry_health"),
    ("/industries/industry", "industry_industry"),
    ("/robots/uclean-series", "robot_uclean"),
    ("/robots/userve-series", "robot_userve"),
    ("/robots/ulog-series", "robot_ulog"),
]

os.makedirs("hero_screenshots", exist_ok=True)

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()

        # Capture Desktop (1440px)
        page_desktop = await browser.new_page(viewport={"width": 1440, "height": 900})
        for path, name in pages:
            await page_desktop.goto(f"http://127.0.0.1:3000{path}", wait_until="networkidle")
            await page_desktop.wait_for_timeout(300)
            await page_desktop.screenshot(path=f"hero_screenshots/{name}_desktop_1440.png")
            print(f"Captured Desktop: {name}")
        await page_desktop.close()

        # Capture Mobile (375px)
        page_mobile = await browser.new_page(viewport={"width": 375, "height": 812})
        for path, name in pages:
            await page_mobile.goto(f"http://127.0.0.1:3000{path}", wait_until="networkidle")
            await page_mobile.wait_for_timeout(300)
            await page_mobile.screenshot(path=f"hero_screenshots/{name}_mobile_375.png")
            print(f"Captured Mobile: {name}")
        await page_mobile.close()

        await browser.close()

asyncio.run(main())
