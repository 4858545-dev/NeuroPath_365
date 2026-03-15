import { useState, useRef, useEffect } from 'react'
import s from './TasksPhase.module.css'

// ── TapCorrect ────────────────────────────────────────────

function TapCorrect({ data, onDone }) {
  const [picked, setPicked] = useState(null)
  const [result, setResult] = useState(null)

  function pick(i) {
    if (result === 'ok') return
    const ok = i === Number(data.correct)
    setPicked(i)
    setResult(ok ? 'ok' : 'no')
    if (ok) {
      setTimeout(onDone, 1400)
    } else {
      setTimeout(() => { setPicked(null); setResult(null) }, 1500)
    }
  }

  return (
    <div className={s.tapCorrect}>
      <p className={s.question}>{data.text}</p>
      <div className={s.options}>
        {data.options.map((opt, i) => (
          <button
            key={i}
            className={[
              s.option,
              picked === i && result === 'ok' ? s.optionOk : '',
              picked === i && result === 'no' ? s.optionNo : '',
            ].join(' ')}
            onClick={() => pick(i)}
          >
            {opt}
          </button>
        ))}
      </div>
      {result && (
        <p className={result === 'ok' ? s.feedbackOk : s.feedbackNo}>
          {result === 'ok' ? data.feedbackCorrect : data.feedbackWrong}
        </p>
      )}
    </div>
  )
}

// ── TapSequence ───────────────────────────────────────────

function TapSequence({ data, onDone }) {
  const [tapped, setTapped] = useState([])
  const [qIndex, setQIndex] = useState(null)
  const total = data.scene.items.length

  function tapItem(id) {
    if (tapped.includes(id)) return
    const next = [...tapped, id]
    setTapped(next)
    if (next.length === total) {
      setTimeout(() => setQIndex(0), 700)
    }
  }

  function nextQ() {
    if (qIndex + 1 < data.questions.length) {
      setQIndex(q => q + 1)
    } else {
      onDone()
    }
  }

  if (qIndex !== null) {
    return <TapCorrect key={qIndex} data={data.questions[qIndex]} onDone={nextQ} />
  }

  return (
    <div className={s.tapSequence}>
      <p className={s.instruction}>{data.instruction}</p>
      <div className={s.scene}>
        {data.scene.items.map(item => (
          <button
            key={item.id}
            className={`${s.sceneItem} ${tapped.includes(item.id) ? s.sceneItemGone : ''}`}
            style={{ left: item.position.x, top: item.position.y }}
            onClick={() => tapItem(item.id)}
          >
            🤍
          </button>
        ))}
        <div className={s.sceneCounter}>{tapped.length} / {total}</div>
      </div>
    </div>
  )
}

// ── DragMatch (two-tap) ───────────────────────────────────

function DragMatch({ data, onDone }) {
  const [active,  setActive]  = useState(null)
  const [matched, setMatched] = useState({})
  const [wrong,   setWrong]   = useState(false)
  const total = data.scene.sources.length

  function selectSource(id) {
    if (matched[id]) return
    setActive(a => a === id ? null : id)
  }

  function selectTarget(tgt) {
    if (!active) return
    if (Object.values(matched).includes(tgt.id)) return
    if (tgt.matchId === active) {
      const next = { ...matched, [active]: tgt.id }
      setMatched(next)
      setActive(null)
      if (Object.keys(next).length === total) setTimeout(onDone, 1200)
    } else {
      setWrong(true)
      setActive(null)
      setTimeout(() => setWrong(false), 900)
    }
  }

  const allDone = Object.keys(matched).length === total

  return (
    <div className={s.dragMatch}>
      <p className={s.instruction}>{data.instruction}</p>
      <div className={s.matchRow}>
        {data.scene.sources.map(src => (
          <button
            key={src.id}
            className={[
              s.matchCard,
              active === src.id   ? s.matchCardActive : '',
              matched[src.id]     ? s.matchCardDone   : '',
            ].join(' ')}
            onClick={() => selectSource(src.id)}
          >
            {src.description}
          </button>
        ))}
      </div>
      <p className={s.matchArrow}>↕</p>
      <div className={s.matchRow}>
        {data.scene.targets.map(tgt => (
          <button
            key={tgt.id}
            className={[
              s.matchCard,
              Object.values(matched).includes(tgt.id) ? s.matchCardDone : '',
            ].join(' ')}
            onClick={() => selectTarget(tgt)}
          >
            тінь {tgt.id.replace('t', '')}
          </button>
        ))}
      </div>
      {wrong   && <p className={s.feedbackNo}>{data.feedbackWrong}</p>}
      {allDone && <p className={s.feedbackOk}>{data.feedbackCorrect}</p>}
    </div>
  )
}

// ── TapLetter ─────────────────────────────────────────────

function TapLetter({ data, onDone }) {
  const [phase,  setPhase]  = useState('letters')
  const [result, setResult] = useState(null)

  function tap(letter) {
    if (result) return
    if (letter.isTarget) {
      setResult('ok')
      if (data.bonusQuestion) {
        setTimeout(() => setPhase('bonus'), 1400)
      } else {
        setTimeout(onDone, 1400)
      }
    } else {
      setResult('no')
      setTimeout(() => setResult(null), 900)
    }
  }

  if (phase === 'bonus') {
    return <TapCorrect data={data.bonusQuestion} onDone={onDone} />
  }

  return (
    <div className={s.tapLetter}>
      <p className={s.instruction}>{data.instruction}</p>
      <div className={s.lettersGrid}>
        {data.scene.letters.map(l => (
          <button
            key={l.id}
            className={`${s.letter} ${l.isTarget ? s.letterTarget : ''}`}
            onClick={() => tap(l)}
          >
            {l.char}
          </button>
        ))}
      </div>
      {result && (
        <p className={result === 'ok' ? s.feedbackOk : s.feedbackNo}>
          {result === 'ok' ? data.feedbackCorrect : data.feedbackWrong}
        </p>
      )}
    </div>
  )
}

// ── TraceLetter ───────────────────────────────────────────

const SZ = 240
const CX = SZ / 2
const CY = SZ / 2
const R  = SZ * 0.38
const N  = 36

const GUIDE = Array.from({ length: N }, (_, i) => {
  const a = (i / N) * 2 * Math.PI - Math.PI / 2
  return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) }
})

function TraceLetter({ data, onDone }) {
  const canvasRef  = useRef(null)
  const drawing    = useRef(false)
  const prevPos    = useRef(null)
  const covered    = useRef(new Set())
  const onMoveRef  = useRef(null)
  const [result, setResult] = useState(null)
  const threshold  = data.completionThreshold ?? 0.8

  function drawGuide() {
    const ctx = canvasRef.current.getContext('2d')
    ctx.clearRect(0, 0, SZ, SZ)
    ctx.beginPath()
    ctx.arc(CX, CY, R, 0, 2 * Math.PI)
    ctx.setLineDash([8, 6])
    ctx.strokeStyle = '#ddd5c8'
    ctx.lineWidth = 6
    ctx.stroke()
    ctx.setLineDash([])
    ctx.font = 'bold 52px Nunito, sans-serif'
    ctx.fillStyle = '#ddd5c8'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(data.scene.traceTarget.label, CX, CY)
    ctx.beginPath()
    ctx.arc(CX, CY - R, 9, 0, 2 * Math.PI)
    ctx.fillStyle = '#7bb876'
    ctx.fill()
  }

  useEffect(() => { drawGuide() }, [])

  // touchmove реєструємо imperatively з { passive: false },
  // бо React додає synthetic touch listeners як passive — тому
  // e.preventDefault() всередині JSX onTouchMove ігнорується браузером.
  useEffect(() => {
    const canvas = canvasRef.current
    function handleTouchMove(e) {
      e.preventDefault()
      onMoveRef.current(e)
    }
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
    return () => canvas.removeEventListener('touchmove', handleTouchMove)
  }, [])

  function getXY(e) {
    const rect = canvasRef.current.getBoundingClientRect()
    const sx = SZ / rect.width
    const sy = SZ / rect.height
    const src = e.touches ? e.touches[0] : e
    return { x: (src.clientX - rect.left) * sx, y: (src.clientY - rect.top) * sy }
  }

  function distToCircle({ x, y }) {
    return Math.abs(Math.sqrt((x - CX) ** 2 + (y - CY) ** 2) - R)
  }

  function markCovered(pos) {
    GUIDE.forEach((gp, i) => {
      if ((pos.x - gp.x) ** 2 + (pos.y - gp.y) ** 2 <= 32 * 32) covered.current.add(i)
    })
  }

  function onStart(e) {
    e.preventDefault()
    document.body.style.overflow = 'hidden'
    const pos = getXY(e)
    if (distToCircle(pos) > 36) return
    drawing.current = true
    prevPos.current = pos
    markCovered(pos)
  }

  function onMove(e) {
    e.preventDefault()
    if (!drawing.current) return
    const pos = getXY(e)
    if (distToCircle(pos) > 44) { prevPos.current = null; return }
    markCovered(pos)
    if (prevPos.current) {
      const ctx = canvasRef.current.getContext('2d')
      ctx.beginPath()
      ctx.moveTo(prevPos.current.x, prevPos.current.y)
      ctx.lineTo(pos.x, pos.y)
      ctx.strokeStyle = '#7bb876'
      ctx.lineWidth = 8
      ctx.lineCap = 'round'
      ctx.stroke()
    }
    prevPos.current = pos
  }

  function onEnd(e) {
    e.preventDefault()
    document.body.style.overflow = ''
    if (!drawing.current) return
    drawing.current = false
    prevPos.current = null
    const progress = covered.current.size / N
    if (progress >= threshold) {
      setResult('ok')
      setTimeout(onDone, 1400)
    } else if (covered.current.size > 2) {
      setResult('no')
      setTimeout(() => {
        covered.current = new Set()
        drawGuide()
        setResult(null)
      }, 1500)
    } else {
      covered.current = new Set()
      drawGuide()
    }
  }

  // оновлюємо ref на кожному рендері щоб touchmove listener не мав stale closure
  onMoveRef.current = onMove

  return (
    <div className={s.traceLetter}>
      <p className={s.instruction}>{data.instruction}</p>
      <canvas
        ref={canvasRef}
        width={SZ}
        height={SZ}
        className={s.canvas}
        onMouseDown={onStart}
        onMouseMove={onMove}
        onMouseUp={onEnd}
        onTouchStart={onStart}
        onTouchEnd={onEnd}
      />
      {result && (
        <p className={result === 'ok' ? s.feedbackOk : s.feedbackNo}>
          {result === 'ok' ? data.feedbackCorrect : data.feedbackWrong}
        </p>
      )}
    </div>
  )
}

// ── TasksPhase ────────────────────────────────────────────

export function TasksPhase({ phase, onComplete }) {
  const [step,      setStep]      = useState('pretask')
  const [taskIndex, setTaskIndex] = useState(0)
  const tasks = phase.items

  useEffect(() => {
    if (step !== 'pretask') return
    const id = setTimeout(() => setStep('task'), 2500)
    return () => clearTimeout(id)
  }, [step])

  function nextTask() {
    if (taskIndex + 1 < tasks.length) {
      setTaskIndex(i => i + 1)
    } else {
      onComplete()
    }
  }

  if (step === 'pretask') {
    return (
      <div className={s.pretask}>
        <p className={s.pretaskText}>{phase.preTaskAudio}</p>
        <button className={s.pretaskBtn} onClick={() => setStep('task')}>
          Починаємо!
        </button>
      </div>
    )
  }

  const task = tasks[taskIndex]

  return (
    <div className={s.taskWrap}>
      <div className={s.taskMeta}>
        <span className={s.taskSubject}>{task.subject}</span>
        <span className={s.taskNum}>Завдання {taskIndex + 1} з {tasks.length}</span>
      </div>
      <h3 className={s.taskTitle}>{task.title}</h3>
      {task.variant === 'tap_sequence' && <TapSequence key={taskIndex} data={task} onDone={nextTask} />}
      {task.variant === 'drag_match'   && <DragMatch   key={taskIndex} data={task} onDone={nextTask} />}
      {task.variant === 'tap_letter'   && <TapLetter   key={taskIndex} data={task} onDone={nextTask} />}
      {task.variant === 'trace_letter' && <TraceLetter key={taskIndex} data={task} onDone={nextTask} />}
    </div>
  )
}
