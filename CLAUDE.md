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

State-based routing in [src/App.jsx](src/App.jsx) — no react-router. Three screens:
- `onboarding` → `OnboardingScreen` (if `childName` is null)
- `home` → `HomeScreen`
- `lesson` → `LessonScreen`

### State management

Zustand store with `persist` in [src/store/useAppStore.js](src/store/useAppStore.js), localStorage key `'neuropath365'`.

State shape:
```js
{ childName, childAge, currentDay, currentPhase, leaves,
  todayDone, lastOpenDate, completedDays, trialExpired, isSubscribed }
```

Store methods: `setChild`, `completePhase`, `completeToday`, `checkNewDay`, `resetForDev`.
Never write to localStorage directly — always go through the store.

### Content system

Day content lives in `src/content/days/day*.json`. Each file has this shape:
```json
{
  "day": 1,
  "phases": [
    { "type": "story",    "text": "...", "audioUrl": null },
    { "type": "exercise", "videoUrl": null, "description": "..." },
    { "type": "task",     "variant": "tap_correct", "question": "...",
      "options": [...], "correct": 1 }
  ]
}
```
`audioUrl`/`videoUrl` are `null` in dev — components show placeholders.
Load content via `src/hooks/useDayContent.js`; progress logic via `src/hooks/useProgress.js`.

### Styling

- [src/styles/theme.css](src/styles/theme.css) — all CSS custom properties (`--color-*`, `--space-*`, `--radius-*`, `--shadow-*`). Import when new variables are needed.
- [src/styles/global.css](src/styles/global.css) — box-sizing reset, `.app-shell` max-width constraint.
- Each screen uses a co-located CSS Module (`ScreenName.module.css`).
- Font: Nunito (loaded via `<link>` in `index.html`, not imported in JS).

### Component conventions

- Each screen lives in `src/components/<ScreenName>/` with `ScreenName.jsx` + `ScreenName.module.css`.
- Shared components go in `src/components/Shared/`.
- [src/components/Shared/SproutSvg.jsx](src/components/Shared/SproutSvg.jsx) — inline SVG of the Паросток character.

### Legacy files

`main.js` and `style.css` at the project root are unused. Entry point is `src/main.jsx`.

## Rules

1. **Не відновлювати попередні версії без підтвердження** — завжди питати перед будь-яким rollback
2. **Не видаляти файли без підтвердження** — завжди питати перед видаленням
3. **Git** — гілка `main`; змістовні commit-повідомлення; перевіряти `git status` + `git diff --staged` перед комітом
4. **Ніколи не комітити `.env` файли** — `.env.local` містить `VITE_POSTHOG_KEY` та інші ключі; вони у `.gitignore`
5. **`resetForDev()` тільки в dev** — обгорнути умовою `import.meta.env.DEV`; не потрапляє в production

## Product context

- [docs/architecture.md](docs/architecture.md) — tech stack, Zustand schema, content JSON schema, PWA config, analytics events, media strategy, roadmap
- [docs/security.md](docs/security.md) — data model, GDPR-K/COPPA вимоги, CSP, pre-launch checklist
- [docs/project.md](docs/project.md) — product spec (screens, phases, open questions)
- [docs/competitors.md](docs/competitors.md) — competitive analysis
- [tasks.md](tasks.md) — development backlog
