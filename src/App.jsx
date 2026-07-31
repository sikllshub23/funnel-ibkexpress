import { useState } from 'react'
import Hero from './components/home/Hero.jsx'
import Footer from './components/home/Footer.jsx'
import BonsPlansSection from './components/bonsplans/BonsPlansSection.jsx'
import ChatFlow from './components/chat/ChatFlow.jsx'
import InstallBanner from './components/pwa/InstallBanner.jsx'
import IosInstallModal from './components/pwa/IosInstallModal.jsx'
import { useInstallPrompt } from './hooks/useInstallPrompt.js'

export default function App() {
  const [view, setView] = useState('home')
  const [installDismissed, setInstallDismissed] = useState(false)
  const { installed, canPromptAndroid, showIosInstructions, promptInstall } = useInstallPrompt()

  const showAndroidBanner = view === 'home' && !installed && canPromptAndroid && !installDismissed
  const showIosBanner = view === 'home' && !installed && showIosInstructions && !installDismissed

  return (
    <div className="min-h-dvh bg-paper">
      {view === 'home' && (
        <main>
          <Hero onStart={() => setView('chat')} />
          <BonsPlansSection />
          <Footer />
        </main>
      )}

      {view === 'chat' && <ChatFlow onClose={() => setView('home')} />}

      {showAndroidBanner && (
        <InstallBanner onInstall={promptInstall} onDismiss={() => setInstallDismissed(true)} />
      )}
      {showIosBanner && <IosInstallModal onDismiss={() => setInstallDismissed(true)} />}
    </div>
  )
}
