import { useState } from 'react'
import s from './LessonScreen.module.css'

const LESSON = {
  day: 1,
  storyTitle: 'Як Паросток знайшов чарівну колоду',
  storyText: `Одного ранку Паросток прокинувся і побачив, що на Галявині Забутих Насінин з'явилась дивна колода, вкрита мохом і зірочками.

— Ось так диво! — прошепотів він, торкаючись листочками до мокрої кори. — Ця колода напевно чарівна!

Дитинча Лелеки підлетіло ближче:
— Паростку, Старий Дуб-Бібліотекар каже, що хто перестрибне через цю колоду три рази — отримає суперсилу уваги!

Паросток глибоко вдихнув, зосередився... і стрибнув! Раз, два, три!`,
  exerciseTitle: 'Вправа: Перехресні кроки',
  exerciseDescription: `Ця вправа тренує координацію між правою та лівою півкулями мозку.

Як виконувати:
• Стаємо прямо на килимку
• Піднімаємо праве коліно і торкаємось його лівою рукою
• Потім ліве коліно — правою рукою
• Повільно, 10 разів кожну сторону

Уявіть, що ви перестрибуєте через чарівні колоди разом з Паростком!`,
  brainFact: "Сьогодні ви прокачали мозочок і міжпівкульні зв'язки. Це допоможе дитині краще тримати увагу на заняттях і швидше читати!",
}

export function LessonScreen({ onComplete, onBack }) {
  const [step, setStep] = useState(0) // 0 = казка, 1 = вправа, 2 = завершення

  function handleNext() {
    if (step < 2) {
      setStep(s => s + 1)
    } else {
      onComplete()
    }
  }

  return (
    <div className={s.screen}>
      <div className={s.header}>
        <button className={s.backBtn} onClick={step === 0 ? onBack : () => setStep(s => s - 1)}>
          ←
        </button>
        <p className={s.headerTitle}>
          {step === 0 && '🎧 Казка дня'}
          {step === 1 && '🤸 Вправа'}
          {step === 2 && '🎉 Готово!'}
        </p>
      </div>

      <div className={s.steps}>
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className={`${s.step} ${i === step ? s.stepActive : ''} ${i < step ? s.stepDone : ''}`}
          />
        ))}
      </div>

      {step === 0 && (
        <div className={s.content}>
          <div className={s.storyCard}>
            <span className={s.cardIcon}>🌿</span>
            <p className={s.cardTitle}>{LESSON.storyTitle}</p>
            <p className={s.cardText}>{LESSON.storyText}</p>
            <div className={s.audioNote}>
              🎧 Аудіо-версія казки буде доступна скоро
            </div>
          </div>
          <button className={s.nextBtn} onClick={handleNext}>
            До вправи →
          </button>
        </div>
      )}

      {step === 1 && (
        <div className={s.content}>
          <div className={s.exerciseCard}>
            <div className={s.videoPlaceholder}>
              <div className={s.playIcon}>▶️</div>
              <p className={s.videoLabel}>Відео з вправою</p>
            </div>
            <span className={s.cardIcon}>🤸</span>
            <p className={s.cardTitle}>{LESSON.exerciseTitle}</p>
            <p className={s.cardText}>{LESSON.exerciseDescription}</p>
          </div>
          <button className={s.nextBtn} onClick={handleNext}>
            Виконали! ✓
          </button>
        </div>
      )}

      {step === 2 && (
        <div className={s.completionScreen}>
          <span className={s.confetti}>🎊</span>
          <p className={s.completionTitle}>Молодці!</p>
          <p className={s.completionText}>
            Сьогоднішня пригода виконана. Ви чудова команда!
          </p>
          <span className={s.leafReward}>🍃</span>
          <p className={s.cardText} style={{ fontSize: 14 }}>+1 листочок до садку</p>
          <div className={s.completionBrain}>
            🧠 {LESSON.brainFact}
          </div>
          <button className={s.nextBtn} onClick={handleNext}>
            На головну 🏡
          </button>
        </div>
      )}
    </div>
  )
}
