// Fichier de config isolé : marque, thème, tarifs, WhatsApp, Bons Plans.
// Objectif : tout ce qui est spécifique à IBK Express vit ici, pour permettre
// une réutilisation de l'app (autre marque/ville) sans toucher aux composants.

export const ibkExpress = {
  brand: {
    name: 'IBK Express',
    shortName: 'IBK Express',
    tagline: "IBK Express, c'est flash.",
    description:
      'Livraison de colis rapide à Cotonou et Calavi. Réservez en trois étapes, le reste part sur WhatsApp.',
    hours: 'Ouvert du lundi au samedi, 9h – 22h.'
  },

  theme: {
    paper: '#FFFFFF',
    surface: '#F6F5F2',
    ink: '#15171A',
    inkSoft: '#6B6F76',
    line: '#E6E4E0',
    signal: '#FFCC00',
    whatsapp: '#25D366',
    danger: '#D64545'
  },

  // Numéro WhatsApp de destination (placeholder, format international sans "+").
  whatsappNumber: '22991858381',

  // Villes couvertes et alias reconnus lors du reverse geocoding.
  villesCouvertes: [
    { cle: 'cotonou', alias: ['cotonou'] },
    { cle: 'calavi', alias: ['calavi', 'abomey-calavi', 'abomey calavi'] }
  ],

  // Grille tarifaire simple. "intra" = même ville, "inter" = deux villes couvertes différentes.
  grilleTarifaire: {
    intra: 1000,
    inter: 1500,
    devise: 'FCFA'
  },

  bonsPlans: [
    {
      id: 'partenaire-1',
      nom: 'Diana Shop',
      categorie: 'Vêtements hommes et femmes · Paires · Skincare ',
      description: 'Découvrez la beauté au pluriel chez DianaShop où chaque style raconte une histoire unique et où chaque soin révèle votre éclat naturel',
      image: '/bons-plans/partenaire-1.png',
      whatsapp: '22953011595'
    },
    {
      id: 'partenaire-2',
      nom: 'Konnü',
      categorie: 'Fast food · Yaourts',
      description: 'Savourez un yaourt nature ou aux fruits accompagné d’un bon sandwich jambon-fromage au poulet à la viande hachée ou au poisson :Votre formule gourmande à partir de 2000 FCFA',
      image: '/bons-plans/partenaire-2.png',
      whatsapp: '22991208755'
    },
    {
      id: 'partenaire-3',
      nom: 'Casamisu',
      categorie: 'Fast Food',
      description: 'Découvrez les tiramisus et cheesecakes de Casa Misu, disponibles en plusieurs saveurs gourmandes : Classique, Oreo, Lotus et Kinder. À partir de 2.000 FCFA, avec des suppléments gourmands pour personnaliser votre dessert.',
      image: '/bons-plans/partenaire-1.png',
      whatsapp: '22940131977'
    }
  ]
}
