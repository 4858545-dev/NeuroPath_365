import day1 from '../../content/days/day1.json'
import s from './LessonScreen.module.css'

const phase = day1.phases[0] // story

export function LessonScreen({ onBack }) {
  function handleNext() {
    console.log('completePhase(1, 1) → перехід до фази 2')
  }

  return (
    <div className={s.screen}>

      <header className={s.header}>
        <button className={s.backBtn} onClick={onBack}>← Назад</button>
        <p className={s.title}>{phase.uiLabel}</p>
        <div className={s.headerSpacer} />
      </header>

      <div className={s.progress}>
        <div className={`${s.segment} ${s.segmentActive}`} />
        <div className={s.segment} />
        <div className={s.segment} />
      </div>

      <div className={s.tablet}>
        <div className={s.storyContent}>
          {phase.text.split('\n\n').map((para, i) => (
            <p key={i} className={s.para}>{para}</p>
          ))}
        </div>

        <div className={s.audioBar}>
          {phase.audioUrl === null ? (
            <span className={s.audioNote}>🎧 Аудіо буде незабаром</span>
          ) : (
            <button className={s.playBtn}>▶ Слухати казку</button>
          )}
        </div>
      </div>

      <button className={s.nextBtn} onClick={handleNext}>
        {phase.buttonLabel}
      </button>

    </div>
  )
}
