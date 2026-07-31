import { useState } from 'react'
import ChatBubble from './ChatBubble.jsx'
import MapPicker from './MapPicker.jsx'
import EstimateBadge from './EstimateBadge.jsx'

export default function StepDelivery({ initialValue, pickupCityKey, onNext }) {
  const [point, setPoint] = useState(initialValue?.point ?? null)
  const [phone, setPhone] = useState(initialValue?.phone ?? '')

  const canContinue = Boolean(point?.address && phone.trim().length >= 8)

  return (
    <div className="space-y-4">
      <ChatBubble from="agent">Et où livrons-nous le colis ?</ChatBubble>

      <MapPicker instruction="Adresse de livraison" onChange={setPoint} />

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-ink">
          Numéro à contacter à la livraison
        </span>
        <input
          type="tel"
          required
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Ex. 01 90 00 00 00"
          className="min-h-[44px] w-full rounded-lg border border-line bg-paper px-3 text-[15px] text-ink placeholder:text-ink-soft/70"
        />
      </label>

      <EstimateBadge pickupCityKey={pickupCityKey} deliveryCityKey={point?.cityKey} />

      <button
        type="button"
        disabled={!canContinue}
        onClick={() => onNext({ point, phone })}
        className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-ink px-6 font-body text-base font-semibold text-paper disabled:opacity-40 sm:w-auto"
      >
        Suivant
      </button>
    </div>
  )
}
