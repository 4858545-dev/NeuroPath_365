import { useState, useRef, useEffect } from 'react'
import s from './TasksPhase.module.css'
import { KulbabkaSvg } from '../Shared/KulbabkaSvg'

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

// ── Dandelion ─────────────────────────────────────────────

// 5 пушинок рівномірно по дузі навколо голівки Кульбабки (45° між кожною)
// Центр голівки: (160, 162) у SVG 320×420 → (50%, 38.6%)
// Відстань до кінця стебла: ~100px → 31.25% ширини / 23.8% висоти
// rotation: кут повороту SVG навколо центру голівки (22px, 22px)
// так щоб ніжка кожної пушинки вказувала до центру голови
// 5 пушинок рівномірно по верхній дузі навколо голівки Кульбабки
// Центр голівки: (160, 162) у SVG 320×420 → (50%, 38.6%)
const PUFF_POSITIONS = [
  { id: 'p1', left: '18.75%', top: '38.6%', rotation: -90 },
  { id: 'p2', left: '27.8%',  top: '21.7%', rotation: -45 },
  { id: 'p3', left: '50%',    top: '14.8%', rotation:   0 },
  { id: 'p4', left: '72.2%',  top: '21.7%', rotation:  45 },
  { id: 'p5', left: '81.25%', top: '38.6%', rotation:  90 },
]


function Dandelion({ data, onDone }) {
  const [tapped,  setTapped]  = useState(new Set())
  const [qIndex,  setQIndex]  = useState(null)
  const [ready,   setReady]   = useState(false)
  const total = PUFF_POSITIONS.length

  useEffect(() => { setReady(true) }, [])

  function tapPuff(id) {
    if (tapped.has(id) || qIndex !== null) return
    const next = new Set(tapped)
    next.add(id)
    setTapped(next)
    if (next.size === total) {
      setTimeout(() => setQIndex(0), 800)
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
    <div className={s.dandelion}>
      <p className={s.instruction}>{data.instruction}</p>
      <div className={s.dandelionScene}>
        <KulbabkaSvg noSeeds className={s.dandelionChar} />

        {/* Overlay-група з тією ж анімацією sway, що й kb-main */}
        <div className={s.dandelionPuffGroup}>
          {PUFF_POSITIONS.map(({ id, left, top, rotation }) => {
            const gone = tapped.has(id)
            return (
              <div
                key={id}
                className={s.dandelionPuff}
                style={{
                  left, top,
                  // anchor at circle center: 22px from top of 44px element = 50%
                  transform: gone
                    ? 'translate(-50%, calc(-50% - 180px))'
                    : 'translate(-50%, -50%)',
                  opacity: gone ? 0 : 1,
                  transition: ready
                    ? 'transform 600ms ease-out, opacity 500ms ease-out'
                    : 'none',
                  pointerEvents: gone ? 'none' : 'auto',
                }}
                onClick={() => tapPuff(id)}
                onTouchEnd={(e) => { e.preventDefault(); tapPuff(id) }}
              >
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none"
                  style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '22px 22px' }}>
                  {/* Промені — білі, довші */}
                  {Array.from({ length: 8 }, (_, i) => {
                    const a = (i / 8) * 2 * Math.PI
                    return (
                      <line key={i}
                        x1={22 + Math.cos(a) * 10} y1={22 + Math.sin(a) * 10}
                        x2={22 + Math.cos(a) * 26} y2={22 + Math.sin(a) * 26}
                        stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.9"/>
                    )
                  })}
                  {/* Голівка */}
                  <circle cx="22" cy="22" r="14" fill="white" opacity="0.92"/>
                  <circle cx="22" cy="22" r="10" fill="white"/>
                  {/* Мікро-промені на кінцях */}
                  <line x1="22" y1="8"  x2="22" y2="4"  stroke="white" strokeWidth="0.8" opacity="0.7"/>
                  <line x1="32" y1="11" x2="35" y2="8"  stroke="white" strokeWidth="0.8" opacity="0.6"/>
                  <line x1="12" y1="11" x2="9"  y2="8"  stroke="white" strokeWidth="0.8" opacity="0.6"/>
                  <line x1="36" y1="22" x2="40" y2="22" stroke="white" strokeWidth="0.8" opacity="0.6"/>
                  <line x1="8"  y1="22" x2="4"  y2="22" stroke="white" strokeWidth="0.8" opacity="0.6"/>
                  {/* Золота крапка в центрі */}
                  <circle cx="22" cy="22" r="3.5" fill="#e8d898" opacity="0.7"/>
                </svg>
              </div>
            )
          })}
        </div>

        <div className={s.dandelionCounter}>{tapped.size} / {total}</div>
      </div>
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
    const id = setTimeout(() => setStep('task'), 5000)
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
        <div className={s.pretaskScene}>
          <KulbabkaSvg className={s.pretaskChar} />
        </div>
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
      {task.variant === 'dandelion'    && <Dandelion   key={taskIndex} data={task} onDone={nextTask} />}
      {task.variant === 'tap_sequence' && <TapSequence key={taskIndex} data={task} onDone={nextTask} />}
      {task.variant === 'drag_match'   && <DragMatch   key={taskIndex} data={task} onDone={nextTask} />}
      {task.variant === 'tap_letter'   && <TapLetter   key={taskIndex} data={task} onDone={nextTask} />}
      {task.variant === 'trace_letter' && <TraceLetter key={taskIndex} data={task} onDone={nextTask} />}
    </div>
  )
}
