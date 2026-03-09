# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Vite dev server (hot reload)
npm run build    # Production build → dist/
```

No test runner is configured.

## Architecture

**НейроВітамінка 365** — Ukrainian mobile-first web app (React 18 + Vite). Daily 10-minute neuropsychological program for children 3–7. Max-width 420px, language `uk`.

### Screen routing

State-based routing in [src/App.jsx](src/App.jsx) — no react-router. Three screens:
- `onboarding` → `OnboardingScreen` (if `childName` is null)
- `home` → `HomeScreen`
- `lesson` → `LessonScreen`

### State management

Single store in [src/store/useAppStore.js](src/store/useAppStore.js), persisted to `localStorage` under key `'neuropath365'`.

State shape:
```js
{ childName, childAge, currentDay, leaves, todayDone, lastOpenDate }
```

Always use store methods (`setChild`, `completeToday`, `resetForDev`) — never write to localStorage directly.

### Styling

- [src/styles/theme.css](src/styles/theme.css) — all CSS custom properties (`--color-*`, `--space-*`, `--radius-*`, `--shadow-*`). Import this whenever new variables are needed.
- [src/styles/global.css](src/styles/global.css) — box-sizing reset, `.app-shell` max-width constraint.
- Each screen component uses a co-located CSS Module (`ScreenName.module.css`).
- Font: Nunito (loaded via `<link>` in `index.html`, not imported in JS).

### Component conventions

- Each screen lives in `src/components/<ScreenName>/` with `ScreenName.jsx` + `ScreenName.module.css`.
- Shared components go in `src/components/Shared/`.
- [src/components/Shared/SproutSvg.jsx](src/components/Shared/SproutSvg.jsx) — inline SVG of the main character (Паросток), scalable via CSS.

### Legacy files

`main.js` and `style.css` at the project root are unused leftovers. Entry point is `src/main.jsx`.

## Rules

1. **Не відновлювати попередні версії без підтвердження** — завжди питати перед будь-яким rollback чи відновленням з backup
2. **Не видаляти файли без підтвердження** — завжди питати перед видаленням
3. **Git** — головна гілка `main`; завжди писати змістовні commit-повідомлення українською або англійською; перевіряти `git status` перед комітом
4. **`resetForDev()` тільки в dev** — кнопка скидання прогресу не повинна потрапити в production

## Product context

- `docs/project.md` — full product spec (screens, phases, open questions)
- `docs/competitors.md` — competitive analysis
- `tasks.md` — development backlog with open architectural questions (missed-day logic, tasks/quiz phase, mid-day exit behavior)

MVP uses localStorage only — no backend, no auth, no payments. Audio and video are placeholders.
