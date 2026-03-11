# docs/architecture.md — Технічна архітектура НейроВітамінки 365

> Останнє оновлення: березень 2026  
> Статус: MVP (6 днів, localStorage, без backend)

---

## 1. Огляд системи

**НейроВітамінка 365** — mobile-first PWA для дітей 3–7 років.  
Щоденна 10-хвилинна нейропсихологічна програма: казка → дихальна вправа → завдання.

```
Батько (платник)
    ↓ встановлює PWA
Застосунок (React 18 + Vite)
    ↓ читає
Контент (JSON файли / Cloudflare CDN)
    ↓ зберігає прогрес
localStorage → [майбутнє: Supabase]
    ↓ вимірює
PostHog Analytics
    ↓ нагадує
Push Notifications / Brevo Email
```

---

## 2. Стек технологій

| Шар | Технологія | Причина вибору |
|-----|-----------|----------------|
| UI Framework | React 18 | Компонентна архітектура, великий ком'юніті |
| Build Tool | Vite | Швидкий HMR, PWA plugin |
| Стилі | CSS Modules + theme.css | Ізоляція стилів, централізовані змінні |
| State | Zustand + localStorage | Мінімально, persistable, без boilerplate |
| PWA | vite-plugin-pwa | Офлайн-кеш, install prompt, push notifications |
| Відео/Аудіо (prod) | Cloudflare Stream / R2 | Дешево, глобальний CDN, signed URLs |
| Аналітика | PostHog | Self-hostable, funnel аналіз, replay сесій |
| Email | Brevo | Безкоштовно до 300 листів/день, тригерні листи |
| Хостинг | Vercel | Автодеплой з GitHub, глобальний CDN, HTTPS |

### MVP обмеження (навмисні)
- ❌ Немає backend (Node.js / Supabase) — запланований після валідації
- ❌ Немає авторизації — email збирається лише для розсилки
- ❌ Немає платіжної інтеграції — перші підписки обробляються вручну
- ❌ Немає адаптації під вік — один контент для 3–7 років

---

## 3. Структура проєкту

```
NeuroPath_365/
├── src/
│   ├── main.jsx                    # Entry point
│   ├── App.jsx                     # State-based router (onboarding/home/lesson)
│   ├── components/
│   │   ├── OnboardingScreen/
│   │   │   ├── OnboardingScreen.jsx
│   │   │   └── OnboardingScreen.module.css
│   │   ├── HomeScreen/
│   │   │   ├── HomeScreen.jsx
│   │   │   └── HomeScreen.module.css
│   │   ├── LessonScreen/
│   │   │   ├── LessonScreen.jsx
│   │   │   └── LessonScreen.module.css
│   │   └── Shared/
│   │       ├── SproutSvg.jsx       # SVG персонаж Паросток
│   │       ├── PhaseProgress.jsx   # Прогрес-бар фаз (1-2-3)
│   │       ├── AudioPlayer.jsx     # Кастомний плеєр для казки
│   │       └── LeafReward.jsx      # Анімована нагорода-листочок
│   ├── store/
│   │   └── useAppStore.js          # Zustand store
│   ├── content/
│   │   ├── days/
│   │   │   ├── day1.json
│   │   │   ├── day2.json
│   │   │   ├── day3.json
│   │   │   ├── day4.json
│   │   │   ├── day5.json
│   │   │   └── day6.json
│   │   └── schema.md               # Опис структури JSON контенту
│   ├── hooks/
│   │   ├── useProgress.js          # Логіка прогресу і розблокування днів
│   │   └── useDayContent.js        # Завантаження JSON контенту дня
│   ├── utils/
│   │   ├── analytics.js            # Обгортка над PostHog
│   │   └── dateUtils.js            # Логіка визначення нового дня
│   └── styles/
│       ├── theme.css               # CSS custom properties
│       └── global.css              # Box-sizing reset, .app-shell
├── docs/
│   ├── project.md                  # Продуктова специфікація
│   ├── architecture.md             # Цей файл
│   ├── security.md                 # Модель безпеки
│   └── competitors.md              # Конкурентний аналіз
├── public/
│   ├── manifest.json               # PWA manifest
│   ├── sw.js                       # Service Worker (генерується Vite)
│   └── icons/                      # PWA іконки (192x192, 512x512)
├── CLAUDE.md                       # Інструкції для Claude Code
├── tasks.md                        # Backlog розробки
└── vite.config.js
```

---

## 4. State Management

### Zustand Store — повна схема

```js
// src/store/useAppStore.js

const useAppStore = create(persist((set, get) => ({
  // Дані дитини
  childName: null,        // string | null
  childAge: null,         // number (3–7)

  // Прогрес
  currentDay: 1,          // number (1–6 для MVP)
  currentPhase: 0,        // number (0–3) — відновлення після виходу
  leaves: 0,              // number — кількість зароблених листочків
  todayDone: false,       // boolean — поточний день завершено
  lastOpenDate: null,     // ISO string — для визначення нового дня
  completedDays: [],      // number[] — список пройдених днів

  // Монетизація
  trialExpired: false,    // boolean — показати оффер підписки
  isSubscribed: false,    // boolean — вручну виставляється після оплати

  // Методи
  setChild: (name, age) => set({ childName: name, childAge: age }),
  
  completePhase: (day, phase) => set({ currentPhase: phase + 1 }),
  
  completeToday: () => {
    const { currentDay, leaves, completedDays } = get();
    const nextDay = currentDay + 1;
    set({
      todayDone: true,
      leaves: leaves + 1,
      completedDays: [...completedDays, currentDay],
      currentDay: nextDay,
      currentPhase: 0,
      trialExpired: nextDay > 6,
    });
  },

  checkNewDay: () => {
    // Викликається при кожному відкритті застосунку
    const today = new Date().toDateString();
    const { lastOpenDate } = get();
    if (lastOpenDate !== today) {
      set({ todayDone: false, currentPhase: 0, lastOpenDate: today });
    }
  },

  resetForDev: () => set({ /* початковий стан */ }), // тільки в DEV
}), { name: 'neuropath365' }))
```

### Критичне обмеження localStorage
Прогрес прив'язаний до браузера/пристрою. При очищенні кешу — дані втрачаються.  
**Міграційний план:** після MVP підключаємо Supabase, localStorage стає кешем.

---

## 5. Контентна система

### Структура JSON одного дня

```json
{
  "day": 1,
  "title": "День перший: Паросток прокидається",
  "theme": "дихання животом",
  "phases": [
    {
      "type": "story",
      "text": "Повний текст казки...",
      "audioUrl": null,
      "durationSeconds": 150
    },
    {
      "type": "exercise",
      "videoUrl": null,
      "posterUrl": null,
      "description": "Дихання животом: 3 вдихи по 4 секунди",
      "durationSeconds": 120
    },
    {
      "type": "task",
      "variant": "tap_correct",
      "question": "Що робить Паросток щоранку?",
      "options": ["Стрибає", "Дихає глибоко", "Співає"],
      "correct": 1,
      "feedbackCorrect": "Молодець! Глибоке дихання дає силу!",
      "feedbackWrong": "Спробуй ще раз 🌱"
    }
  ]
}
```

### Варіанти завдань (task variants)
| Variant | Опис |
|---------|------|
| `tap_correct` | Натисни правильну відповідь з варіантів |
| `drag_match` | Перетягни об'єкт до відповідної пари |
| `emotion_pick` | Обери емоцію персонажа |

---

## 6. PWA конфігурація

```js
// vite.config.js
import { VitePWA } from 'vite-plugin-pwa'

VitePWA({
  registerType: 'autoUpdate',
  manifest: {
    name: 'НейроВітамінка 365',
    short_name: 'НейроВіт',
    theme_color: '#4CAF50',
    background_color: '#FAFFF5',
    display: 'standalone',
    orientation: 'portrait',
    lang: 'uk',
    icons: [
      { src: '/icons/192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/512.png', sizes: '512x512', type: 'image/png' }
    ]
  },
  workbox: {
    // Кешуємо: shell, шрифти, JSON контент
    globPatterns: ['**/*.{js,css,html,json,woff2}'],
    // НЕ кешуємо: відео (потокове з Cloudflare)
    navigateFallback: '/index.html',
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com/,
        handler: 'CacheFirst',
        options: { cacheName: 'google-fonts', expiration: { maxAgeSeconds: 60 * 60 * 24 * 365 } }
      }
    ]
  }
})
```

---

## 7. Аналітика — воронка

Обов'язкові події PostHog:

```js
// src/utils/analytics.js
export const track = {
  appOpened:       ()         => posthog.capture('app_opened'),
  onboardingDone:  (age)      => posthog.capture('onboarding_completed', { child_age: age }),
  dayStarted:      (day)      => posthog.capture('day_started', { day }),
  phaseCompleted:  (day, ph)  => posthog.capture('phase_completed', { day, phase: ph }),
  dayCompleted:    (day)      => posthog.capture('day_completed', { day }),
  trialExpired:    ()         => posthog.capture('trial_expired'),
  offerShown:      ()         => posthog.capture('offer_shown'),
  offerClicked:    ()         => posthog.capture('offer_clicked'),
}
```

### Ключові метрики MVP
| Метрика | Ціль |
|---------|------|
| День 1 → День 3 retention | > 40% |
| День 3 → День 6 retention | > 25% |
| День 6 → Клік на оффер | > 30% |
| Оффер → Оплата (вручну) | > 15% |

---

## 8. Медіа стратегія

### Dev середовище
`audioUrl: null` і `videoUrl: null` — компоненти показують плейсхолдер.

### Production
- **Аудіо** (казки, ~3 MB/файл): Cloudflare R2 → публічний bucket
- **Відео** (вправи, ~30 MB/файл): Cloudflare Stream → signed URLs через API

```
Запит відео
    → [майбутній] Edge Function перевіряє підписку
    → генерує signed URL (TTL: 2 години)
    → клієнт стрімить напряму з Cloudflare
```

---

## 9. Roadmap після MVP

### Фаза 2 (після 500+ активних користувачів)
- [ ] Supabase backend (авторизація, синхронізація прогресу між пристроями)
- [ ] LiqPay інтеграція (підписки ₴299/міс, ₴1990/рік)
- [ ] Push notifications (щоденне нагадування о 18:00)
- [ ] Контент 7–30 днів

### Фаза 3 (після $1K MRR)
- [ ] Нативний iOS/Android застосунок (React Native або Expo)
- [ ] CMS для контенту (Notion API або Contentful)
- [ ] Адаптація під вік (3–4 / 5–6 / 7 років)
- [ ] Аналітика батьків (звіт про прогрес дитини)

### Фаза 4 (масштабування)
- [ ] Англомовна версія
- [ ] B2B: ліцензії для садочків і шкіл
- [ ] API для партнерів (психологи, логопеди)
