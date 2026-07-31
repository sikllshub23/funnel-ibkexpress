export default function InstallBanner({ onInstall, onDismiss }) {
  return (
    <div className="fixed inset-x-4 bottom-4 z-40 flex items-center gap-3 rounded-ticket border border-ink bg-paper px-4 py-3 sm:inset-x-auto sm:right-6 sm:w-96">
      <p className="flex-1 text-sm text-ink">Installez IBK Express, plus rapide qu'un onglet.</p>
      <button
        type="button"
        onClick={onInstall}
        className="shrink-0 rounded-full bg-signal px-4 py-2 text-sm font-semibold text-ink"
      >
        Installer
      </button>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Ignorer"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-soft hover:bg-surface"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M6 6 L18 18 M18 6 L6 18" />
        </svg>
      </button>
    </div>
  )
}
