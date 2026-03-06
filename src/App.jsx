import { useState } from 'react'
import { useAppStore } from './store/useAppStore'
import { OnboardingScreen } from './components/Onboarding/OnboardingScreen'
import { HomeScreen } from './components/Home/HomeScreen'
import { LessonScreen } from './components/Lesson/LessonScreen'

export function App() {
  const { store, isOnboarded, setChild, completeToday, resetForDev } = useAppStore()
  const [screen, setScreen] = useState('home') // 'home' | 'lesson'

  if (!isOnboarded) {
    return (
      <div className="app-shell">
        <OnboardingScreen
          onComplete={(name, age) => setChild(name, age)}
        />
      </div>
    )
  }

  return (
    <div className="app-shell">
      {screen === 'home' && (
        <HomeScreen
          store={store}
          onStartAdventure={() => setScreen('lesson')}
          onReset={resetForDev}
        />
      )}
      {screen === 'lesson' && (
        <LessonScreen
          onComplete={() => {
            completeToday()
            setScreen('home')
          }}
          onBack={() => setScreen('home')}
        />
      )}
    </div>
  )
}
