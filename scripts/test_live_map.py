from playwright.sync_api import sync_playwright

COTONOU = {"latitude": 6.3703, "longitude": 2.3912}

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 390, "height": 844}, geolocation=COTONOU, permissions=["geolocation"])
    page = context.new_page()

    errors = []
    page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)

    page.goto("http://localhost:5173")
    page.wait_for_load_state("networkidle")
    page.get_by_text("Démarrer ma commande").click()
    page.wait_for_selector("text=Adresse de récupération")
    page.wait_for_timeout(1500)  # laisse la carte Google se charger
    page.screenshot(path="/tmp/live-01-map.png")

    page.get_by_role("button", name="Utiliser ma position actuelle").click()
    page.wait_for_timeout(2000)
    page.screenshot(path="/tmp/live-02-located.png")

    address_value = page.get_by_label("Adresse de récupération").input_value()
    city_value = page.get_by_label("Ville").input_value()
    print("ADDRESS:", address_value)
    print("CITY:", city_value)

    # Vérifie qu'il n'y a plus de champ de recherche autocomplete
    search_inputs = page.locator('input[placeholder="Rechercher une adresse…"]').count()
    print("SEARCH INPUT COUNT (doit etre 0):", search_inputs)

    print("CONSOLE ERRORS:", errors)
    browser.close()
