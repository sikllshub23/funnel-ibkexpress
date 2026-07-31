from playwright.sync_api import sync_playwright

COTONOU = {"latitude": 6.3703, "longitude": 2.3912}
CALAVI = {"latitude": 6.4486, "longitude": 2.3554}

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 390, "height": 844}, geolocation=COTONOU, permissions=["geolocation"])
    page = context.new_page()

    console_errors = []
    page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
    page.on("pageerror", lambda exc: console_errors.append(f"pageerror: {exc}"))

    page.goto("http://localhost:5173")
    page.wait_for_load_state("networkidle")
    page.screenshot(path="/tmp/01-home.png", full_page=True)

    page.click("text=Démarrer ma commande")
    page.wait_for_timeout(500)
    page.screenshot(path="/tmp/02-step1-empty.png", full_page=True)

    # Étape 1 - géolocalisation
    page.click("text=Utiliser ma position actuelle")
    page.wait_for_timeout(2500)
    page.screenshot(path="/tmp/03-step1-located.png", full_page=True)
    page.fill('input[type="tel"]', "0190000000")
    page.screenshot(path="/tmp/04-step1-filled.png", full_page=True)

    next_btn = page.locator("button", has_text="Suivant").first
    print("step1 next disabled:", next_btn.is_disabled())
    next_btn.click()
    page.wait_for_timeout(500)

    # Étape 2 - géolocalisation Calavi
    context.set_geolocation(CALAVI)
    page.click("text=Utiliser ma position actuelle")
    page.wait_for_timeout(2500)
    page.screenshot(path="/tmp/05-step2-located.png", full_page=True)
    page.fill('input[type="tel"]', "0197000000")
    page.wait_for_timeout(300)
    page.screenshot(path="/tmp/06-step2-estimate.png", full_page=True)

    next_btn2 = page.locator("button", has_text="Suivant").first
    print("step2 next disabled:", next_btn2.is_disabled())
    next_btn2.click()
    page.wait_for_timeout(500)

    # Étape 3
    page.fill('input[type="time"]', "14:30")
    page.fill('input[type="text"]', "Documents")
    page.screenshot(path="/tmp/07-step3.png", full_page=True)
    page.click("text=Voir le récapitulatif")
    page.wait_for_timeout(500)
    page.screenshot(path="/tmp/08-recap.png", full_page=True)

    print("PAGE TEXT SNIPPET:", page.locator("body").inner_text()[:2000])

    page.click('button[aria-label="Fermer et revenir à l\'accueil"]')
    page.wait_for_timeout(300)
    page.locator("#bons-plans").scroll_into_view_if_needed()
    page.screenshot(path="/tmp/09-bons-plans.png", full_page=True)

    print("CONSOLE ERRORS:", console_errors)

    browser.close()
