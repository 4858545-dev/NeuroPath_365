import { useState, useEffect } from 'react'
import s from './OnboardingScreen.module.css'
import { SproutSvg } from '../Shared/SproutSvg'

const RAIN_DROPS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  height: Math.random() * 20 + 10,
  duration: Math.random() * 0.8 + 0.6,
  delay: Math.random() * 2,
}))

const AGES = [3, 4, 5, 6, 7]

export function OnboardingScreen({ onComplete }) {
  const [phase, setPhase] = useState('intro') // 'intro' | 'form'
  const [name, setName] = useState('')
  const [age, setAge] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => setPhase('form'), 5500)
    return () => clearTimeout(timer)
  }, [])

  function handleSubmit() {
    if (!name.trim() || !age) return
    onComplete(name.trim(), age)
  }

  if (phase === 'form') {
    return (
      <div className={s.formWrap}>
        <SproutSvg className={s.formSprout} />
        <p className={s.formTitle}>Мені потрібен друг!</p>
        <p className={s.formSubtitle}>Як звати твого малюка?</p>

        <input
          className={s.input}
          type="text"
          placeholder="Ім'я дитини"
          value={name}
          onChange={e => setName(e.target.value)}
          maxLength={20}
          autoFocus
        />

        <p className={s.ageLabel}>Скільки років?</p>
        <div className={s.ageButtons}>
          {AGES.map(a => (
            <button
              key={a}
              className={`${s.ageBtn} ${age === a ? s.ageBtnActive : ''}`}
              onClick={() => setAge(a)}
            >
              {a}
            </button>
          ))}
        </div>

        <button
          className={`${s.submitBtn} ${(!name.trim() || !age) ? s.submitBtnDisabled : ''}`}
          onClick={handleSubmit}
          disabled={!name.trim() || !age}
        >
          Починаємо пригоду! 🌱
        </button>
      </div>
    )
  }

  return (
    <div className={s.screen}>
      {/* Дощ */}
      <div className={s.rainLayer}>
        {RAIN_DROPS.map(d => (
          <div
            key={d.id}
            className={s.drop}
            style={{
              left: `${d.left}%`,
              height: `${d.height}px`,
              animationDuration: `${d.duration}s`,
              animationDelay: `${d.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Сонячний промінь */}
      <div className={s.sunCircle} />
      <div className={s.sunray} />

      {/* Бульбашка з текстом */}
      <div className={s.bubble}>
        <p className={s.bubbleText}>
          Ой! Привіт! Я нарешті прокинувся 🌱{'\n'}
          Мені потрібен друг!
        </p>
      </div>

      {/* Паросток */}
      <div className={s.sproutWrap}>
        <SproutSvg className={s.sproutSvg} />
      </div>

      {/* Земля */}
      <div className={s.ground} />
    </div>
  )
}
