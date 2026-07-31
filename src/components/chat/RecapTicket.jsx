import BoltMark from '../BoltMark.jsx'
import { computeEstimate, formatFcfa } from '../../utils/pricing.js'
import { buildOrderMessage, buildWhatsAppLink } from '../../utils/whatsapp.js'
import { cityLabel } from '../../utils/city.js'

export default function RecapTicket({ data, onEditStep }) {
  const estimate = computeEstimate(data.pickup.point.cityKey, data.delivery.point.cityKey)
  const message = buildOrderMessage({
    pickup: { address: data.pickup.point.address, mapsLink: data.pickup.point.mapsLink, phone: data.pickup.phone },
    delivery: { address: data.delivery.point.address, mapsLink: data.delivery.point.mapsLink, phone: data.delivery.phone },
    details: data.details,
    estimate
  })
  const whatsappLink = buildWhatsAppLink(message)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-ink">
        <BoltMark className="h-4 w-4" />
        <p className="font-display text-lg font-bold uppercase tracking-wide">Bon de course</p>
      </div>

      <div className="rounded-ticket border border-ink bg-paper p-5">
        <RecapBlock label="Récupération" onEdit={() => onEditStep(1)}>
          <p className="text-ink">{data.pickup.point.address}</p>
          <RecapLinks mapsLink={data.pickup.point.mapsLink} cityKey={data.pickup.point.cityKey} />
          <p className="mt-1 font-mono text-sm text-ink-soft">{data.pickup.phone}</p>
        </RecapBlock>

        <div className="tear-line my-5" />

        <RecapBlock label="Livraison" onEdit={() => onEditStep(2)}>
          <p className="text-ink">{data.delivery.point.address}</p>
          <RecapLinks mapsLink={data.delivery.point.mapsLink} cityKey={data.delivery.point.cityKey} />
          <p className="mt-1 font-mono text-sm text-ink-soft">{data.delivery.phone}</p>
        </RecapBlock>

        <div className="tear-line my-5" />

        <RecapBlock label="Détails" onEdit={() => onEditStep(3)}>
          <p className="text-ink">Récupération souhaitée à {data.details.time}</p>
          <p className="text-ink-soft">{data.details.nature}</p>
        </RecapBlock>

        <div className="tear-line my-5" />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            {estimate ? (
              <span className="price-stamp">{formatFcfa(estimate.amount, estimate.devise)}</span>
            ) : (
              <span className="text-sm font-semibold text-ink">Estimation non disponible</span>
            )}
            <p className="mt-2 max-w-xs text-xs text-ink-soft">
              Le tarif exact vous sera confirmé après validation de votre commande.
            </p>
          </div>
        </div>
      </div>

      <p className="text-sm text-ink-soft">
        Vous allez être redirigé vers WhatsApp pour valider votre commande.
      </p>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-whatsapp px-6 font-body text-base font-semibold text-paper transition-transform duration-150 hover:-translate-y-0.5 sm:w-auto"
      >
        Lancer la livraison
      </a>
    </div>
  )
}

function RecapBlock({ label, onEdit, children }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-wide text-ink-soft">{label}</p>
        <button type="button" onClick={onEdit} className="text-xs font-medium text-ink underline underline-offset-2">
          Modifier
        </button>
      </div>
      <div className="mt-1 text-[15px] leading-relaxed">{children}</div>
    </div>
  )
}

function RecapLinks({ mapsLink, cityKey }) {
  return (
    <div className="mt-1 flex flex-wrap items-center gap-2">
      <a href={mapsLink} target="_blank" rel="noreferrer" className="text-sm font-medium text-ink underline underline-offset-2">
        Voir sur Google Maps
      </a>
      {cityKey && cityKey !== 'autre' && (
        <span className="font-mono text-xs uppercase text-ink-soft">{cityLabel(cityKey)}</span>
      )}
    </div>
  )
}
