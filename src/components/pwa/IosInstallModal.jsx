export default function IosInstallModal({ onDismiss }) {
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-ink/40 sm:items-center">
      <div className="w-full max-w-sm rounded-t-ticket border border-line bg-paper p-6 sm:rounded-ticket">
        <p className="font-display text-lg font-bold uppercase text-ink">Installer l'app</p>
        <ol className="mt-4 space-y-4 text-sm text-ink">
          <li className="flex items-center gap-3">
            <ShareIcon />
            <span>Appuyez sur <strong>Partager</strong>, dans la barre de Safari.</span>
          </li>
          <li className="flex items-center gap-3">
            <AddHomeIcon />
            <span>
              Choisissez <strong>Sur l'écran d'accueil</strong>.
            </span>
          </li>
        </ol>
        <button
          type="button"
          onClick={onDismiss}
          className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-paper"
        >
          Compris
        </button>
      </div>
    </div>
  )
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0 rounded-lg border border-line p-1.5 text-ink" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 v12 M8 7 l4 -4 4 4" />
      <path d="M5 12 v7 a1 1 0 0 0 1 1 h12 a1 1 0 0 0 1 -1 v-7" />
    </svg>
  )
}

function AddHomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0 rounded-lg border border-line p-1.5 text-ink" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M12 9 v6 M9 12 h6" />
    </svg>
  )
}
