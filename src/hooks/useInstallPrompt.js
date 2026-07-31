import { useEffect, useState } from 'react'

function isStandalone() {
  return (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  )
}

function isIos() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent)
}

// Capte l'événement Android/Chrome et détecte iOS pour afficher les instructions manuelles.
export function useInstallPrompt() {
  const [deferredEvent, setDeferredEvent] = useState(null)
  const [installed, setInstalled] = useState(isStandalone())

  useEffect(() => {
    function onBeforeInstall(event) {
      event.preventDefault()
      setDeferredEvent(event)
    }
    function onInstalled() {
      setInstalled(true)
      setDeferredEvent(null)
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  async function promptInstall() {
    if (!deferredEvent) return
    await deferredEvent.prompt()
    setDeferredEvent(null)
  }

  return {
    installed,
    canPromptAndroid: Boolean(deferredEvent),
    showIosInstructions: isIos() && !isStandalone(),
    promptInstall
  }
}
