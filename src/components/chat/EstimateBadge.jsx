import { computeEstimate, formatFcfa } from '../../utils/pricing.js'

export default function EstimateBadge({ pickupCityKey, deliveryCityKey }) {
  if (!pickupCityKey || !deliveryCityKey) return null

  const estimate = computeEstimate(pickupCityKey, deliveryCityKey)

  return (
    <div className="rounded-ticket border border-line bg-surface p-4">
      {estimate ? (
        <p className="font-display text-2xl font-bold text-ink">
          Estimation : {formatFcfa(estimate.amount, estimate.devise)}
        </p>
      ) : (
        <p className="text-sm font-medium text-ink">Estimation non disponible pour cette zone.</p>
      )}
      <p className="mt-1 text-xs text-ink-soft">
        Le tarif exact vous sera confirmé après validation de votre commande.
      </p>
    </div>
  )
}
