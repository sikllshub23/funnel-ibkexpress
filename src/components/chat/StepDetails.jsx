import { useState } from 'react'
import ChatBubble from './ChatBubble.jsx'

export default function StepDetails({ initialValue, onNext }) {
  const [time, setTime] = useState(initialValue?.time ?? '')
  const [nature, setNature] = useState(initialValue?.nature ?? '')

  const canContinue = Boolean(time && nature.trim().length >= 2)

  return (
    <div className="space-y-4">
      <ChatBubble from="agent">Dernière étape : quand, et quoi ?</ChatBubble>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-ink">Heure de récupération souhaitée</span>
        <input
          type="time"
          required
          value={time}
          onChange={(event) => setTime(event.target.value)}
          className="min-h-[44px] w-full rounded-lg border border-line bg-paper px-3 text-[15px] text-ink"
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-ink">Nature du colis</span>
        <input
          type="text"
          required
          value={nature}
          onChange={(event) => setNature(event.target.value)}
          placeholder="Ex. documents, vêtements, nourriture…"
          className="min-h-[44px] w-full rounded-lg border border-line bg-paper px-3 text-[15px] text-ink placeholder:text-ink-soft/70"
        />
      </label>

      <button
        type="button"
        disabled={!canContinue}
        onClick={() => onNext({ time, nature })}
        className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-ink px-6 font-body text-base font-semibold text-paper disabled:opacity-40 sm:w-auto"
      >
        Voir le récapitulatif
      </button>
    </div>
  )
}
