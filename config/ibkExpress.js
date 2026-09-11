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
      description: 'Découvrez la beauté au pluriel chez Diana
Shop, où chaque style raconte une histoire unique et où chaque soin révèle votre éclat naturel',
      image: '/bons-plans/partenaire-1.svg',
      whatsapp: '22953011595'
    },
    {
      id: 'partenaire-2',
      nom: 'Boutique Aïcha',
      categorie: 'Mode & accessoires',
      description: 'Tissus et prêt-à-porter, commande directe sur WhatsApp.',
      image: '/bons-plans/partenaire-2.svg',
      whatsapp: '22900000002'
    },
    {
      id: 'partenaire-3',
      nom: 'Fast Food Zogbo',
      categorie: 'Fast Food',
      description: 'Chawarma, Burgers, livraison prioritaire.',
      image: '/bons-plans/partenaire-1.svg',
      whatsapp: '22900000003'
    }
  ]
}
