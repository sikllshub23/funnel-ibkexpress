import BoltMark from '../BoltMark.jsx'
import RouteFlash from './RouteFlash.jsx'
import { ibkExpress } from '../../../config/ibkExpress.js'

export default function Hero({ onStart }) {
  return (
    <header className="relative overflow-hidden px-6 pb-14 pt-10 sm:px-10 sm:pt-14">
      <div className="mx-auto flex max-w-xl flex-col gap-8">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-signal">
            <BoltMark className="h-4 w-4" />
          </span>
          <span className="font-display text-lg font-bold uppercase tracking-[0.14em] text-ink">
            {ibkExpress.brand.name}
          </span>
        </div>

        <div className="space-y-4">
          <h1 className="font-display text-[2.75rem] font-bold uppercase leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Avec Nous,
            <br />
            Votre colis part <span className="bg-signal px-1">maintenant</span>.
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-ink-soft">
            Pour une course rapide, nous vous prions de bien remplir les informations de livraison s’il vous plaît.
          </p>
        </div>

        <RouteFlash />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onStart}
            className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-ink px-7 font-body text-base font-semibold text-paper transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0"
          >
            Démarrer ma commande
          </button>
          <a
            href="#bons-plans"
            className="inline-flex min-h-[52px] items-center justify-center px-2 font-body text-sm font-medium text-ink-soft underline decoration-line decoration-2 underline-offset-4 hover:text-ink"
          >
            Voir nos Bons Plans
          </a>
        </div>

        <p className="font-mono text-sm text-ink-soft">{ibkExpress.brand.hours}</p>
      </div>
    </header>
  )
}
