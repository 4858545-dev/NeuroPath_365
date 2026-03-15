import { useAppStore } from '../../store/useAppStore'
import day1 from '../../content/days/day1.json'
import { TasksPhase } from './TasksPhase'
import s from './LessonScreen.module.css'

const storyPhase    = day1.phases[0]
const exercisePhase = day1.phases[1]
const tasksPhase    = day1.phases[2]
const finalePhase   = day1.phases[3]

function buildRhythm(r) {
  const parts = []
  if (r.exhaleFirst) parts.push('Видих')
  parts.push(`Вдих\u00a0${r.inhaleSeconds}\u00a0сек`)
  if (r.holdSeconds) parts.push(`Пауза\u00a0${r.holdSeconds}\u00a0сек`)
  parts.push(`Видих\u00a0${r.exhaleSeconds}\u00a0сек`)
  return parts.join(' → ') + ` × ${r.repetitions} рази`
}

function segClass(phase, seg, s) {
  if (phase > seg) return s.segmentDone
  if (phase === seg) return s.segmentActive
  return ''
}

export function LessonScreen({ onBack }) {
  const { store, completePhase, completeToday } = useAppStore()
  const phase = store.currentPhase ?? 1

  // ── Фаза 4: Фінал ────────────────────────────────────────
  if (phase === 4) {
    return (
      <div className={`${s.screen} ${s.finale}`}>
        <p className={s.finaleDay}>День {store.currentDay} з 6</p>

        <div className={s.finaleCenter}>
          <p className={s.finaleMessage}>{finalePhase.reward.message}</p>
        </div>

        <div className={s.finaleLeaves}>
          {Array.from({ length: store.leaves + 1 }, (_, i) => (
            <span
              key={i}
              className={`${s.leaf} ${i === store.leaves ? s.leafNew : ''}`}
            >
              🍃
            </span>
          ))}
        </div>

        <button
          className={s.nextBtn}
          onClick={() => { completeToday(); onBack() }}
        >
          {finalePhase.buttonLabel}
        </button>
      </div>
    )
  }

  // ── Фази 1–3 ─────────────────────────────────────────────
  const phaseLabel = [storyPhase, exercisePhase, tasksPhase][phase - 1]?.uiLabel

  return (
    <div className={s.screen}>

      <header className={s.header}>
        <button className={s.backBtn} onClick={onBack}>← Назад</button>
        <p className={s.title}>{phaseLabel}</p>
        <div className={s.headerSpacer} />
      </header>

      <div className={s.progress}>
        <div className={`${s.segment} ${segClass(phase, 1, s)}`} />
        <div className={`${s.segment} ${segClass(phase, 2, s)}`} />
        <div className={`${s.segment} ${segClass(phase, 3, s)}`} />
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

      {/* ── Фаза 3: Завдання ── */}
      {phase === 3 && (
        <div className={s.tablet}>
          <TasksPhase
            phase={tasksPhase}
            onComplete={() => completePhase(4)}
          />
        </div>
      )}

      {/* Кнопка лише для фаз 1 і 2 */}
      {(phase === 1 || phase === 2) && (
        <button className={s.nextBtn} onClick={() => completePhase(phase + 1)}>
          {phase === 1 ? storyPhase.buttonLabel : exercisePhase.buttonLabel}
        </button>
      )}

    </div>
  )
}
