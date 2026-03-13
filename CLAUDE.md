# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Vite dev server (hot reload)
npm run build    # Production build → dist/
```

No test runner is configured.

## Architecture

**НейроВітамінка 365** — Ukrainian mobile-first PWA (React 18 + Vite). Daily 10-minute neuropsychological program for children 3–7. Max-width 420px, language `uk`.

### Screen routing

State-based routing in [src/App.jsx](src/App.jsx) — no react-router. Four screens:
- `onboarding` → `OnboardingScreen` (if `childName` is null)
- `home` → `HomeScreen` (or `OfferScreen` if `trialExpired === true`)
- `lesson` → `LessonScreen`
- `offer` → `OfferScreen`

Full UI spec: **[docs/screens.md](docs/screens.md)** — read before creating any screen component.

### State management

Custom React hook (`useState` + `useEffect`) in [src/store/useAppStore.js](src/store/useAppStore.js), manually persisted to localStorage under key `'neuropath365'`.

State shape:
```js
{ childName, childAge, currentDay, currentPhase, leaves,
  todayDone, lastOpenDate, completedDays, trialExpired }
```

Methods: `setChild`, `completePhase(phase)`, `completeToday`, `checkNewDay`, `resetForDev`.
Never write to localStorage directly — always go through the hook.
`resetForDev` is guarded by `import.meta.env.DEV` — never runs in production.
`trialExpired` becomes `true` automatically when `currentDay > 6`.

### Content system

Day content lives in `src/content/days/day*.json`. Each file has **4 phases**:

| `phaseNumber` | `type` | Notes |
|---|---|---|
| 1 | `story` | `text`, `audioUrl` (null in dev) |
| 2 | `exercise` | `video.videoUrl` (null in dev), `textForParents`, `rhythm` |
| 3 | `tasks` | array of `items` with variants: `tap_correct`, `tap_sequence`, `drag_match`, `tap_letter`, `trace_letter` |
| 4 | `finale` | reward, button → `completeToday()` |

`audioUrl`/`videoUrl` are `null` in dev — components show placeholders. See `src/content/days/day1.json` as the reference implementation.

### Styling

- [src/styles/theme.css](src/styles/theme.css) — all CSS custom properties (`--color-*`, `--space-*`, `--radius-*`, `--shadow-*`). Import when new variables are needed.
- [src/styles/global.css](src/styles/global.css) — box-sizing reset, `.app-shell` max-width constraint.
- Each screen uses a co-located CSS Module (`ScreenName.module.css`).
- Font: Nunito (loaded via `<link>` in `index.html`, not imported in JS).

### Component conventions

- Each screen lives in `src/components/<ScreenName>/` with `ScreenName.jsx` + `ScreenName.module.css`.
- Shared components go in `src/components/Shared/`.
- [src/components/Shared/SproutSvg.jsx](src/components/Shared/SproutSvg.jsx) — inline SVG of the main character. Name: **Ростік** (use this name everywhere in UI text).

### Legacy files

`main.js` and `style.css` at the project root are unused. Entry point is `src/main.jsx`.

## Rules

1. **Не відновлювати попередні версії без підтвердження** — завжди питати перед будь-яким rollback
2. **Не видаляти файли без підтвердження** — завжди питати перед видаленням
3. **Git** — гілка `main`; змістовні commit-повідомлення; перевіряти `git status` + `git diff --staged` перед комітом
4. **Ніколи не комітити `.env` файли** — `.env.local` містить `VITE_POSTHOG_KEY` та інші ключі; вони у `.gitignore`
5. **`resetForDev()` тільки в dev** — обгорнути умовою `import.meta.env.DEV`; не потрапляє в production

## Product context

- [docs/screens.md](docs/screens.md) — **UI spec** (єдина точка правди для розробки екранів)
- [docs/architecture.md](docs/architecture.md) — tech stack, content JSON schema, PWA config, analytics, roadmap
- [docs/security.md](docs/security.md) — data model, GDPR-K/COPPA, CSP, pre-launch checklist
- [docs/project.md](docs/project.md) — product spec (персонажі, світ, бізнес-модель)
- [docs/competitors.md](docs/competitors.md) — competitive analysis
- [tasks.md](tasks.md) — development backlog з відкритими питаннями
