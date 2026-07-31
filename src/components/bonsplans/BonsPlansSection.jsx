import { ibkExpress } from '../../../config/ibkExpress.js'
import PartnerCard from './PartnerCard.jsx'

export default function BonsPlansSection() {
  return (
    <section id="bons-plans" className="bg-surface px-6 py-14 sm:px-10">
      <div className="mx-auto max-w-xl">
        <h2 className="font-display text-3xl font-bold uppercase text-ink">Nos Bons Plans</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Une envie rapide ? Accéder à notre sélection de Bons plans. Nous vous livrons rapidement.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {ibkExpress.bonsPlans.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  )
}
