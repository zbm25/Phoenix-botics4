import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        await page.goto("http://127.0.0.1:3000/industries/retail#prequalification", wait_until="networkidle")
        await page.wait_for_timeout(500)

        for step in range(1, 7):
            options = await page.locator("#prequalification div.cursor-pointer, #prequalification button.cursor-pointer").all()
            if options:
                await options[0].click()
                await page.wait_for_timeout(100)

            next_btn = page.locator("#prequalification button", has_text="Continuer")
            if await next_btn.is_visible():
                await next_btn.click()
            else:
                finish_btn = page.locator("#prequalification button", has_text="Voir mon étude")
                if await finish_btn.is_visible():
                    await finish_btn.click()
            await page.wait_for_timeout(300)

        links = await page.locator("#prequalification a, #prequalification button").all()
        for l in links:
            txt = await l.inner_text()
            tag = await l.evaluate("el => el.tagName")
            href = await l.evaluate("el => el.getAttribute('href')") if tag == "A" else None
            print(f"Found element: Tag={tag}, Text='{txt.strip()}', Href='{href}'")

        await browser.close()

asyncio.run(main())
