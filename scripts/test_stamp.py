from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 390, "height": 844})
    page.goto("http://localhost:5173")
    page.wait_for_load_state("networkidle")

    page.get_by_text("Démarrer ma commande").click()
    page.wait_for_selector("text=Adresse de récupération")
    page.get_by_label("Adresse de récupération").fill("Carrefour Vêdoko")
    page.get_by_label("Ville").select_option("cotonou")
    page.get_by_label("Numéro à contacter sur place").fill("0190000000")
    page.screenshot(path="/tmp/fallback-01-step1.png")
    page.get_by_role("button", name="Suivant").click()

    page.wait_for_selector("text=Adresse de livraison")
    page.get_by_label("Adresse de livraison").fill("Godomey")
    page.get_by_label("Ville").select_option("calavi")
    page.get_by_label("Numéro à contacter à la livraison").fill("0197000000")
    page.wait_for_timeout(200)
    page.screenshot(path="/tmp/fallback-02-estimate.png")
    page.get_by_role("button", name="Suivant").click()

    page.wait_for_selector("text=Dernière étape")
    page.get_by_label("Heure de récupération souhaitée").fill("14:30")
    page.get_by_label("Nature du colis").fill("Documents")
    page.get_by_role("button", name="Voir le récapitulatif").click()

    page.wait_for_selector("text=Bon de course")
    page.wait_for_timeout(200)
    page.screenshot(path="/tmp/fallback-03-recap.png")
    print("RECAP TEXT:", page.locator("body").inner_text()[:1500])

    browser.close()
