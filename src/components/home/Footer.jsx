import { ibkExpress } from '../../../config/ibkExpress.js'

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-8 sm:px-10">
      <div className="mx-auto flex max-w-xl flex-col gap-1 text-sm text-ink-soft">
        <p className="font-display font-bold uppercase tracking-wide text-ink">
          {ibkExpress.brand.name}
        </p>
        <p>Livraison de colis à Cotonou et Calavi.</p>
        <p className="font-mono">{ibkExpress.brand.hours}</p>
      </div>
    </footer>
  )
}
