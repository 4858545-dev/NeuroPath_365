const MALE_NAMES = new Set([
  'Олексій', 'Максим', 'Дмитро', 'Іван', 'Богдан',
  'Андрій', 'Микола', 'Василь', 'Ростік', 'Марк', 'Лев', 'Тимур',
  'Артем', 'Нікіта', 'Денис', 'Владислав', 'Кирило', 'Євген', 'Олег',
  'Ігор', 'Роман', 'Сергій', 'Юрій', 'Павло', 'Петро', 'Степан',
])

const FEMALE_ENDINGS = ['ія', 'іна', 'іла', 'ela', 'а', 'я', 'і']

export function getGender(name) {
  if (!name) return 'neutral'
  const normalized = name.trim()
  if (MALE_NAMES.has(normalized)) return 'male'
  const lower = normalized.toLowerCase()
  for (const ending of FEMALE_ENDINGS) {
    if (lower.endsWith(ending)) return 'female'
  }
  return 'neutral'
}
