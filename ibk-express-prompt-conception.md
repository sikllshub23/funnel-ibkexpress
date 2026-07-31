# IBK Express — Prompt de conception MVP + Config Google Maps

---

## 1. Prompt de conception complet (à donner à C23 / Claude Code)

```
Construis une PWA nommée "IBK Express" : un portail de réservation de livraison de colis qui remplace la prise de commande manuelle sur WhatsApp.

CONTEXTE
IBK Express est un service de livraison de colis basé à Cotonou, Bénin, opérant aussi vers Calavi. Actuellement, les clients envoient leur commande en dictant les infos sur WhatsApp via un message modèle. Cette app digitalise cette collecte d'informations sans supprimer WhatsApp du processus : elle sert de pont structuré qui prépare un message WhatsApp pré-rempli, prêt à envoyer.

STACK
- React + Vite
- Tailwind CSS
- PWA (manifest + service worker, installable)
- Google Maps JavaScript API + Places Autocomplete + Geocoding (voir section config séparée)
- Déploiement Vercel
- Pas de backend, pas de base de données à ce stade. Tout est géré côté client. Le numéro WhatsApp de destination sera injecté plus tard dans un fichier de config.
- Code structuré en fichier de config séparé (config/ibkExpress.js) pour isoler : nom de la marque, couleurs, numéro WhatsApp, grille tarifaire, liste des partenaires Bons Plans. Objectif : dédié à IBK Express pour l'instant, mais fichier isolé pour faciliter une future réutilisation.

PAGE D'ACCUEIL
- Logo / nom "IBK Express" + accroche courte ("IBK EXPRESS, c'est flash 🚀📦✅" ou reformulation courte).
- Description brève du service (livraison de colis rapide à Cotonou et Calavi).
- Bouton principal "Démarrer ma commande" qui lance le chat conversationnel.
- Horaires visibles : "Ouvert du lundi au samedi de 9h à 22h".
- Lien vers la section "Nos Bons Plans" plus bas sur la page.

CHAT CONVERSATIONNEL SCRIPTÉ (PAS D'IA — logique de questions fixes)
Objectif : donner l'impression de discuter avec un agent, mais c'est un enchaînement d'étapes prédéfinies avec des champs adaptés au type de donnée demandée. Interface façon bulles de chat (messages "agent" à gauche, réponses de l'utilisateur à droite), mais chaque question affiche directement le champ de saisie adapté (pas de texte libre à interpréter).

Le flux est découpé en 3 étapes seulement, chacune regroupant plusieurs champs :

ÉTAPE 1 — Récupération
- Message agent : "Où devons-nous récupérer le colis ?"
- Champ carte Google Maps avec Places Autocomplete + pin déplaçable + bouton "Utiliser ma position actuelle" (géolocalisation navigateur). Le client cherche l'adresse ou ajuste le pin manuellement.
- Au clic/validation du pin, reverse geocoding pour extraire la ville (utilisé pour l'estimation de frais) et générer un lien Google Maps (lat,lng) cliquable.
- Champ input type="tel" : "Numéro à contacter sur place"
- Bouton "Suivant"

ÉTAPE 2 — Livraison
- Message agent : "Et où livrons-nous le colis ?"
- Même composant carte (Autocomplete + pin + géoloc) pour le lieu de livraison.
- Champ input type="tel" : "Numéro à contacter à la livraison"
- Bouton "Suivant"

ÉTAPE 3 — Détails de la course
- Message agent : "Dernière étape : quand et quoi ?"
- Champ heure (input type="time" ou sélecteur simple) : "Heure de récupération souhaitée"
- Champ texte court : "Nature du colis" (ex : documents, vêtements, nourriture, autre)
- Bouton "Voir le récapitulatif"

ESTIMATION DES FRAIS (affichée automatiquement après l'étape 2, dès que les deux villes sont connues via reverse geocoding)
Grille simple dans le fichier de config :
- Même ville/zone (ex : Cotonou → Cotonou) : 1 000 FCFA
- Entre deux villes (ex : Cotonou ↔ Calavi) : 1 500 FCFA
Afficher clairement : "Estimation : XXX FCFA" suivi d'une mention explicite : "Le tarif exact vous sera confirmé après validation de votre commande."
Si la ville n'est pas reconnue dans la grille (ex : autre ville), afficher "Estimation non disponible pour cette zone, le tarif exact vous sera communiqué après validation" au lieu d'un chiffre.

RÉCAPITULATIF FINAL
Avant validation, afficher un résumé clair de toutes les infos collectées :
- Lieu de récupération (adresse détectée + lien Maps) + numéro
- Lieu de livraison (adresse détectée + lien Maps) + numéro
- Heure de récupération
- Nature du colis
- Estimation des frais + mention "tarif exact après validation"
Bouton d'action unique : "Lancer la livraison"

ACTION DU BOUTON "LANCER LA LIVRAISON"
Génère un lien wa.me (https://wa.me/NUMERO?text=MESSAGE_ENCODE) où :
- NUMERO vient du fichier de config (placeholder à remplacer plus tard, ex : "22900000000")
- MESSAGE_ENCODE reprend le format du message modèle actuel de IBK Express, pré-rempli avec les données collectées, incluant les deux liens Google Maps cliquables pour la récupération et la livraison.
Le lien s'ouvre dans un nouvel onglet / déclenche l'ouverture de l'app WhatsApp du client, qui n'a plus qu'à appuyer sur envoyer. Bien préciser dans l'UI juste avant le bouton : "Vous allez être redirigé vers WhatsApp pour envoyer votre commande."

SECTION "NOS BONS PLANS"
Section en bas de la landing page (ou accessible depuis un menu) affichant des cartes pour chaque partenaire (restaurants, autres commerces en collaboration) :
- Nom du partenaire
- Courte description ou catégorie
- Image (placeholder si besoin)
- Bouton "Contacter sur WhatsApp" → lien wa.me vers le numéro du partenaire (liste également dans le fichier de config, avec des valeurs d'exemple à remplacer plus tard).

INSTALLATION PWA
- Manifest.json complet (nom, icônes, couleur de thème, display standalone).
- Sur Android/Chrome : détecter l'événement beforeinstallprompt et afficher un bouton "Installer l'app" qui déclenche l'installation en un clic.
- Sur iOS/Safari : détecter la plateforme et afficher à la place un bandeau/modal d'instructions manuelles ("Appuyez sur Partager, puis Sur l'écran d'accueil"), avec captures d'écran ou icônes illustratives si simple à générer.

DESIGN
- Mobile-first (les clients arrivent principalement depuis un lien WhatsApp ou un QR code sur mobile).
- Ton direct, sans superflu, cohérent avec l'identité "flash/rapide" de la marque.
- Pas de fioritures inutiles, l'objectif est la rapidité de complétion du parcours.

CE QUI N'EST PAS DEMANDÉ DANS CE MVP (ne pas construire)
- Pas de compte client, pas d'historique de commandes.
- Pas de compte admin, pas de tableau de bord de gestion des statuts.
- Pas de notifications push.
- Pas de base de données ni de backend/API custom.
- Pas de génération de QR code dans l'app (ce sera fait séparément pour l'impression de cartes de visite).

Le but de cette itération : une démo fonctionnelle et déployée sur Vercel, que le fondateur d'IBK Express peut tester de bout en bout sur son téléphone pour valider le concept avant de passer à la connexion d'une base de données et à la construction des comptes client/admin.
```

---

## 2. Instructions de configuration Google Maps

### Étape 1 — Créer/utiliser un projet Google Cloud
1. Aller sur [console.cloud.google.com](https://console.cloud.google.com).
2. Créer un nouveau projet (ex : `ibk-express`) ou en réutiliser un existant.
3. Un compte de facturation doit être associé au projet (obligatoire même si tu restes dans le crédit gratuit mensuel de Google).

### Étape 2 — Activer les APIs nécessaires
Dans **APIs & Services > Library**, activer :
- **Maps JavaScript API** (affichage de la carte)
- **Places API** (autocomplete d'adresse)
- **Geocoding API** (conversion adresse ↔ coordonnées, et détection de la ville pour l'estimation)

### Étape 3 — Créer une clé API
1. **APIs & Services > Credentials > Create Credentials > API Key**.
2. Copier la clé générée.

### Étape 4 — Restreindre la clé (important, à ne pas sauter)
Pour éviter tout usage frauduleux de ta clé si elle fuite dans le code front :
1. Dans les paramètres de la clé, section **Application restrictions** → choisir **HTTP referrers (websites)**.
2. Ajouter les domaines autorisés :
   - `localhost:*` (pour le développement local)
   - `*.vercel.app/*` (pour le déploiement de preview/prod Vercel)
   - Ton futur domaine personnalisé si IBK Express en prend un.
3. Dans **API restrictions**, sélectionner **Restrict key** et cocher uniquement les 3 APIs activées à l'étape 2 (Maps JavaScript API, Places API, Geocoding API).

### Étape 5 — Intégration dans le projet
- Ajouter la clé dans une variable d'environnement Vercel : `VITE_GOOGLE_MAPS_API_KEY`.
- Ne jamais commiter la clé en dur dans le code source, même restreinte.
- Charger le script Google Maps dynamiquement dans le composant carte avec cette variable d'environnement.

### Étape 6 — Suivi de la facturation
- Dans **Billing > Budgets & alerts**, configurer une alerte (ex : à 5$ ou 10$) pour être notifié si l'usage dépasse le crédit gratuit habituel, surtout utile en phase de démo/tests répétés.

### Notes utiles
- La couverture de Places Autocomplete est bonne sur les grands axes de Cotonou et Calavi mais plus faible dans certains quartiers moins référencés : le pin déplaçable sur la carte doit rester la méthode principale et fiable, l'autocomplete un simple raccourci de recherche.
- Le reverse geocoding (étape 5 du prompt) sert à déterminer automatiquement si la commande est intra-ville ou inter-ville (Cotonou ↔ Calavi) pour appliquer la bonne estimation tarifaire.
