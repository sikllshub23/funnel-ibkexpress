import { useEffect, useState } from 'react'

const SCRIPT_ID = 'ibk-google-maps-script'
let loadPromise = null

function loadScript(apiKey) {
  if (loadPromise) return loadPromise

  loadPromise = new Promise((resolve, reject) => {
    if (window.google?.maps) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=fr&region=BJ`
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Impossible de charger Google Maps.'))
    document.head.appendChild(script)
  })

  return loadPromise
}

// Charge dynamiquement l'API Google Maps si une clé est disponible.
// Sans clé, ne tente rien : les composants doivent basculer sur un mode manuel.
export function useGoogleMapsScript() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  const [status, setStatus] = useState(apiKey ? 'loading' : 'no-key')

  useEffect(() => {
    if (!apiKey) return

    let cancelled = false
    loadScript(apiKey)
      .then(() => {
        if (!cancelled) setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [apiKey])

  return status // 'no-key' | 'loading' | 'ready' | 'error'
}
