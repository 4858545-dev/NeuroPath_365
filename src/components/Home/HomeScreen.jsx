import s from './HomeScreen.module.css'
import { SproutSvg } from '../Shared/SproutSvg'

export function HomeScreen({ store, onStartAdventure, onReset }) {
  const { childName, currentDay, leaves, todayDone } = store
  const progress = Math.min((currentDay / 365) * 100, 100)

  const messages = [
    `Привіт, ${childName}! Готова до пригоди?`,
    `${childName}, сьогодні нас чекає щось особливе!`,
    `Ура, ${childName} тут! Починаємо?`,
  ]
  const message = messages[(currentDay - 1) % messages.length]

  return (
    <div className={s.screen}>
      <div className={s.header}>
        <p className={s.greeting}>NeuroPath 365 🌿</p>
        <button className={s.devReset} onClick={onReset}>скинути</button>
      </div>

      <div className={s.progressWrap}>
        <div className={s.progressLabel}>
          <span>День {currentDay} з 365</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className={s.progressBar}>
          <div className={s.progressFill} style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className={s.characterWrap}>
        <div className={s.speechBubble}>{message}</div>
        <SproutSvg className={s.sprout} />
      </div>

      <button
        className={`${s.adventureBtn} ${todayDone ? s.adventureBtnDone : ''}`}
        onClick={onStartAdventure}
      >
        {todayDone ? '✅ Пригода виконана!' : '🌟 Пригода дня'}
      </button>

      <div className={s.garden}>
        <p className={s.gardenTitle}>Мій чарівний садок 🌱</p>
        <div className={s.leaves}>
          {leaves === 0 ? (
            <span className={s.leafEmpty}>Тут з'являться твої листочки...</span>
          ) : (
            Array.from({ length: leaves }).map((_, i) => (
              <span key={i} className={s.leaf}>🍃</span>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
