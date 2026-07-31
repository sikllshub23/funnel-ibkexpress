const STEP_LABELS = ['Récupération', 'Livraison', 'Détails']

// Bande de progression façon souche de ticket perforée : la numérotation est
// légitime ici, le parcours est réellement séquentiel (3 étapes fixes).
export default function ProgressTicket({ step }) {
  return (
    <div className="px-6 pb-3 pt-4 sm:px-10">
      <div className="mx-auto max-w-xl">
        <div className="flex gap-1.5">
          {STEP_LABELS.map((label, index) => (
            <span
              key={label}
              className="ticket-progress-segment"
              data-filled={index + 1 <= step}
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="mt-2 font-mono text-xs uppercase tracking-wide text-ink-soft">
          Étape {Math.min(step, 3)} / 3 — {STEP_LABELS[Math.min(step, 3) - 1]}
        </p>
      </div>
    </div>
  )
}
