import { useAppStore } from '../../store/useAppStore'
import day1 from '../../content/days/day1.json'
import s from './LessonScreen.module.css'

const storyPhase    = day1.phases[0]
const exercisePhase = day1.phases[1]

function buildRhythm(r) {
  const parts = []
  if (r.exhaleFirst) parts.push('Видих')
  parts.push(`Вдих\u00a0${r.inhaleSeconds}\u00a0сек`)
  if (r.holdSeconds) parts.push(`Пауза\u00a0${r.holdSeconds}\u00a0сек`)
  parts.push(`Видих\u00a0${r.exhaleSeconds}\u00a0сек`)
  return parts.join(' → ') + ` × ${r.repetitions} рази`
}

export function LessonScreen({ onBack }) {
  const { store, completePhase } = useAppStore()
  const phase = store.currentPhase ?? 1

  function handleBack() {
    if (phase === 1) {
      onBack()
    } else {
      completePhase(phase - 1)
    }
  }

  function handleNext() {
    if (phase === 1) {
      completePhase(2)
    } else if (phase === 2) {
      console.log('completePhase(2) → перехід до фази 3')
    }
  }

  const title      = phase === 1 ? storyPhase.uiLabel : exercisePhase.uiLabel
  const buttonLabel = phase === 1 ? storyPhase.buttonLabel : exercisePhase.buttonLabel

  return (
    <div className={s.screen}>

      <header className={s.header}>
        <button className={s.backBtn} onClick={handleBack}>← Назад</button>
        <p className={s.title}>{title}</p>
        <div className={s.headerSpacer} />
      </header>

      <div className={s.progress}>
        <div className={`${s.segment} ${phase === 1 ? s.segmentActive : s.segmentDone}`} />
        <div className={`${s.segment} ${phase === 2 ? s.segmentActive : ''}`} />
        <div className={s.segment} />
      </div>

      {/* ── Фаза 1: Казка ── */}
      {phase === 1 && (
        <div className={s.tablet}>
          <div className={s.storyContent}>
            {storyPhase.text.split('\n\n').map((para, i) => (
              <p key={i} className={s.para}>{para}</p>
            ))}
          </div>
          <div className={s.audioBar}>
            {storyPhase.audioUrl === null ? (
              <span className={s.audioNote}>🎧 Аудіо буде незабаром</span>
            ) : (
              <button className={s.playBtn}>▶ Слухати казку</button>
            )}
          </div>
        </div>
      )}

      {/* ── Фаза 2: Вправа ── */}
      {phase === 2 && (
        <div className={s.tablet}>
          <p className={s.exerciseSource}>{exercisePhase.source}</p>

          {exercisePhase.video.videoUrl === null ? (
            <>
              <ol className={s.stepsList}>
                {exercisePhase.textForParents.variantA.map((step, i) => (
                  <li key={i} className={s.step}>{step}</li>
                ))}
              </ol>
              <div className={s.rhythmHint}>
                <span className={s.rhythmLabel}>🌬️ Ритм:</span>
                <span className={s.rhythmText}>{buildRhythm(exercisePhase.rhythm)}</span>
              </div>
            </>
          ) : (
            <div className={s.videoPlaceholder}>
              <span className={s.playIcon}>▶</span>
            </div>
          )}
        </div>
      )}

      <button className={s.nextBtn} onClick={handleNext}>
        {buttonLabel}
      </button>

    </div>
  )
}
