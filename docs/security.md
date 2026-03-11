# docs/security.md — Модель безпеки НейроВітамінки 365

> Останнє оновлення: березень 2026  
> Статус: MVP (localStorage, без backend, без платежів)

---

## 1. Принципи безпеки

**Мінімум даних** — збираємо лише те, що необхідно для роботи застосунку.  
**Дитина не є суб'єктом системи** — акаунт створює батько, батько керує даними.  
**Privacy by design** — захист закладається на етапі архітектури, не додається потім.

---

## 2. Які дані зберігаємо

### localStorage (MVP)
| Поле | Тип | Де зберігається | Чутливість |
|------|-----|----------------|-----------|
| `childName` | string | localStorage | 🟡 Середня |
| `childAge` | number | localStorage | 🟡 Середня |
| `currentDay` | number | localStorage | 🟢 Низька |
| `currentPhase` | number | localStorage | 🟢 Низька |
| `leaves` | number | localStorage | 🟢 Низька |
| `todayDone` | boolean | localStorage | 🟢 Низька |
| `lastOpenDate` | ISO string | localStorage | 🟢 Низька |
| `completedDays` | array | localStorage | 🟢 Низька |

### Що НЕ збираємо в MVP
- ❌ Email дитини
- ❌ Фото або відео дитини
- ❌ Геолокація
- ❌ Ідентифікатор пристрою
- ❌ Поведінкові патерни для реклами
- ❌ Платіжні дані (перші оплати — вручну через переказ)

---

## 3. Захист дітей — GDPR-K / COPPA

Ці регуляції вимагають особливої уваги для застосунків, що обробляють дані неповнолітніх.

### Ключові вимоги для MVP

**Згода батьків** — при реєстрації обов'язковий явний чекбокс:
```
☐ Я підтверджую, що мені виповнилось 18 років і я даю згоду 
  на обробку даних моєї дитини відповідно до Політики конфіденційності
```

**Право на видалення** — батько може видалити всі дані:
- Очистити localStorage через Settings у застосунку
- У майбутньому: кнопка "Видалити акаунт" в Supabase

**Політика конфіденційності** — обов'язкова публічна сторінка з розділом про дані неповнолітніх. Посилання на неї на екрані реєстрації.

**Вік батька** — підтвердження що реєструється повнолітній.

---

## 4. Безпека коду і репозиторію

### Environment Variables
```bash
# .env.local (НІКОЛИ не комітити в git)
VITE_POSTHOG_KEY=ph_...
VITE_SUPABASE_URL=https://...       # Фаза 2
VITE_SUPABASE_ANON_KEY=eyJ...       # Фаза 2
VITE_CLOUDFLARE_ACCOUNT_ID=...      # Фаза 2
```

### .gitignore — обов'язкові рядки
```
.env
.env.local
.env.production
.env*.local
dist/
```

### Перевірка перед кожним комітом
```bash
git status                    # перевірити список файлів
git diff --staged             # перевірити вміст
# Переконатись що .env файлів немає в staged змінах
```

### Якщо ключ потрапив у git
```bash
# 1. Негайно відкликати ключ в сервісі (PostHog / Supabase / Cloudflare)
# 2. Згенерувати новий ключ
# 3. Очистити історію git (git filter-branch або BFG Repo Cleaner)
# 4. Force push в GitHub
```

---

## 5. Безпека контенту (CSP)

Content Security Policy через мета-тег в `index.html`:

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://app.posthog.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  media-src 'self' https://*.cloudflare.com https://*.r2.dev;
  connect-src 'self' https://app.posthog.com;
  img-src 'self' data: blob:;
">
```

Це запобігає XSS атакам і несанкціонованому завантаженню зовнішніх ресурсів.

---

## 6. Безпека медіаконтенту (Фаза 2)

Коли підключимо Cloudflare R2 і Stream:

### Signed URLs для відео
```
Клієнт → Edge Function (перевірка підписки) → 
Cloudflare API генерує signed URL (TTL: 2 год) → 
Клієнт стрімить напряму
```
Прямі посилання на відеофайли не доступні публічно. Без підписки — немає відео.

### R2 Bucket Policy
```json
{
  "public_access": false,
  "cors": {
    "allowed_origins": ["https://neurovitaminka.com.ua"],
    "allowed_methods": ["GET"]
  }
}
```

---

## 7. Моніторинг (мінімальний MVP)

### Що відстежуємо
- Vercel Analytics — аномальний трафік, 4xx/5xx помилки
- PostHog — незвичайні паттерни використання
- GitHub — сповіщення про dependency vulnerabilities (Dependabot)

### Alerting
Налаштувати email-сповіщення від Vercel при:
- Deployment failure
- Edge Function errors > 10/хв (Фаза 2)

---

## 8. Чеклист безпеки перед запуском MVP

### Код і репозиторій
- [ ] `.env` файли в `.gitignore` — перевірено
- [ ] Історія git не містить ключів — перевірено (`git log -p | grep -i "key\|secret\|token"`)
- [ ] `resetForDev()` захищений умовою `import.meta.env.DEV`
- [ ] CSP мета-тег додано в `index.html`

### Контент і дані
- [ ] Ім'я дитини зберігається лише в localStorage (не передається на сервер)
- [ ] `audioUrl: null`, `videoUrl: null` для dev плейсхолдерів
- [ ] Немає хардкоду чутливих даних в JSON файлах контенту

### Юридичне
- [ ] Сторінка Privacy Policy опублікована
- [ ] Розділ про дані неповнолітніх у Privacy Policy
- [ ] Чекбокс згоди батьків на екрані реєстрації
- [ ] Підтвердження повноліття батька при реєстрації
- [ ] Terms of Service (базові) опубліковані

### PWA і хостинг
- [ ] HTTPS працює (Vercel enforces автоматично)
- [ ] PWA manifest не містить чутливих даних
- [ ] Vercel environment variables налаштовані для production

---

## 9. Roadmap безпеки (Фаза 2 — після підключення Supabase)

- [ ] Row Level Security (RLS) на всіх таблицях Supabase
- [ ] JWT токени в httpOnly cookies (не в localStorage)
- [ ] Rate limiting на auth endpoints (реєстрація, вхід)
- [ ] Signed URLs для медіаконтенту через Edge Functions
- [ ] Щоденні автоматичні бекапи бази Supabase
- [ ] Audit log для адмін-дій
- [ ] PCI DSS compliance при підключенні LiqPay (токенізація карток)

---

## 10. Контакти при інциденті

При виявленні вразливості або витоку даних:
1. Негайно відкликати скомпрометовані ключі
2. Повідомити команду (CEO + CTO)
3. Оцінити масштаб — які дані і скільки користувачів
4. Якщо зачіпає дані дітей — юридична консультація щодо GDPR повідомлення
