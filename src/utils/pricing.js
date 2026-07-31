import { ibkExpress } from '../../config/ibkExpress.js'

// Calcule l'estimation à partir des deux villes détectées (reverse geocoding).
// Retourne { amount, devise } si les deux villes sont couvertes, sinon null.
export function computeEstimate(cityKeyPickup, cityKeyDelivery) {
  if (!cityKeyPickup || !cityKeyDelivery) return null

  const { intra, inter, devise } = ibkExpress.grilleTarifaire
  const amount = cityKeyPickup === cityKeyDelivery ? intra : inter
  return { amount, devise }
}

export function formatFcfa(amount, devise) {
  return `${amount.toLocaleString('fr-FR')} ${devise}`
}
