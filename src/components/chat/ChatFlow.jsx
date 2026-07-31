import { useState } from 'react'
import ChatHeader from './ChatHeader.jsx'
import ProgressTicket from './ProgressTicket.jsx'
import StepPickup from './StepPickup.jsx'
import StepDelivery from './StepDelivery.jsx'
import StepDetails from './StepDetails.jsx'
import RecapTicket from './RecapTicket.jsx'

const RECAP_STEP = 4

export default function ChatFlow({ onClose }) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState({ pickup: null, delivery: null, details: null })

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-surface">
      <ChatHeader onClose={onClose} />
      {step <= 3 && <ProgressTicket step={step} />}

      <div className="flex-1 overflow-y-auto px-6 pb-10 sm:px-10">
        <div className="mx-auto max-w-xl py-4">
          {step === 1 && (
            <StepPickup
              initialValue={data.pickup}
              onNext={(pickup) => {
                setData((prev) => ({ ...prev, pickup }))
                setStep(2)
              }}
            />
          )}

          {step === 2 && (
            <StepDelivery
              initialValue={data.delivery}
              pickupCityKey={data.pickup?.point?.cityKey}
              onNext={(delivery) => {
                setData((prev) => ({ ...prev, delivery }))
                setStep(3)
              }}
            />
          )}

          {step === 3 && (
            <StepDetails
              initialValue={data.details}
              onNext={(details) => {
                setData((prev) => ({ ...prev, details }))
                setStep(RECAP_STEP)
              }}
            />
          )}

          {step === RECAP_STEP && <RecapTicket data={data} onEditStep={setStep} />}
        </div>
      </div>
    </div>
  )
}
