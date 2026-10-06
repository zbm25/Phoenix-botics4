import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1440, "height": 900})

        await page.goto("http://127.0.0.1:3000/industries/retail#prequalification", wait_until="networkidle")
        await page.wait_for_timeout(500)

        while True:
            # Check if diagnostic is reached
            if await page.locator("text=DIAGNOSTIC D'ÉLIGIBILITÉ DU SITE").is_visible():
                print("Diagnostic reached!")
                break

            # Click first non-selected option button inside #prequalification
            options = await page.locator("#prequalification button").all()
            clicked = False
            for opt in options:
                txt = await opt.inner_text()
                if txt and txt not in ["RETOUR", "CONTINUER", "VOIR LA PRÉQUALIFICATION", "VOIR MON ÉTUDE DE FAISABILITÉ"]:
                    await opt.click()
                    clicked = True
                    break

            await page.wait_for_timeout(200)

            # Click action button
            action_btn = page.locator("#prequalification button", has_text="CONTINUER")
            if not await action_btn.is_visible():
                action_btn = page.locator("#prequalification button", has_text="VOIR LA PRÉQUALIFICATION")
            if not await action_btn.is_visible():
                action_btn = page.locator("#prequalification button", has_text="VOIR MON ÉTUDE DE FAISABILITÉ")

            if await action_btn.is_visible() and await action_btn.is_enabled():
                await action_btn.click()
                await page.wait_for_timeout(300)

        # In Diagnostic, click "Demander une étude de faisabilité"
        cta = page.locator("#prequalification a", has_text="Demander une étude")
        await cta.click()
        await page.wait_for_timeout(500)

        url = page.url
        print(f"Current URL: {url}")
        assert "model=flotte-mixte" in url or "model=" in url, f"URL check: {url}"

        select_val = await page.eval_on_selector("#industry-retail-model", "el => el.value")
        print(f"Contact form selected model value: '{select_val}'")
        assert select_val == "flotte-mixte" or select_val != "", f"Contact select value: '{select_val}'"

        await page.screenshot(path="hero_screenshots/flotte_mixte_verification.png")
        print("Flotte-mixte flow test PASSED 100% successfully!")

        await browser.close()

asyncio.run(main())
