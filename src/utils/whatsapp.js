import { ibkExpress } from '../../config/ibkExpress.js'
import { formatFcfa } from './pricing.js'

export function buildOrderMessage({ pickup, delivery, details, estimate }) {
  const lines = [
    'Nouvelle commande IBK Express 📦',
    '',
    '📍 Récupération',
    pickup.address,
    pickup.mapsLink,
    `📞 ${pickup.phone}`,
    '',
    '📍 Livraison',
    delivery.address,
    delivery.mapsLink,
    `📞 ${delivery.phone}`,
    '',
    `🕐 Heure de récupération souhaitée : ${details.time}`,
    `📦 Nature du colis : ${details.nature}`,
    '',
    estimate
      ? `💰 Estimation : ${formatFcfa(estimate.amount, estimate.devise)} (tarif exact confirmé après validation)`
      : '💰 Estimation non disponible pour cette zone, tarif exact confirmé après validation.'
  ]

  return lines.filter((line) => line !== undefined && line !== null).join('\n')
}

export function buildWhatsAppLink(message) {
  return `https://wa.me/${ibkExpress.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function buildPartnerWhatsAppLink(partnerNumber, partnerName) {
  const message = `Bonjour ${partnerName}, je vous contacte via IBK Express Bons Plans.`
  return `https://wa.me/${partnerNumber}?text=${encodeURIComponent(message)}`
}
