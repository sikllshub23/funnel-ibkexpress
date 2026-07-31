import BoltMark from '../BoltMark.jsx'
import { ibkExpress } from '../../../config/ibkExpress.js'

export default function ChatHeader({ onClose }) {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-paper px-6 py-3 sm:px-10">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-signal">
          <BoltMark className="h-3.5 w-3.5" />
        </span>
        <span className="font-display text-sm font-bold uppercase tracking-wide text-ink">
          {ibkExpress.brand.name}
        </span>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer et revenir à l'accueil"
        className="flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-surface"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M6 6 L18 18 M18 6 L6 18" />
        </svg>
      </button>
    </div>
  )
}
