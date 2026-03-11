import { useState, useEffect } from 'react'

const STORAGE_KEY = 'neuropath365'

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

const defaultState = {
  childName: null,
  childAge: null,
  currentDay: 1,
  leaves: 0,
  todayDone: false,
  lastOpenDate: null,
}

export function useAppStore() {
  const [store, setStore] = useState(() => {
    const saved = loadState()
    return saved ? { ...defaultState, ...saved } : defaultState
  })

  useEffect(() => {
    saveState(store)
  }, [store])

  // Новий календарний день — скидаємо todayDone, але НЕ чіпаємо currentDay.
  // currentDay зростає лише після завершення уроку (у completeToday).
  useEffect(() => {
    const today = new Date().toDateString()
    if (!store.lastOpenDate) {
      setStore(s => ({ ...s, lastOpenDate: today }))
    } else if (store.lastOpenDate !== today) {
      setStore(s => ({ ...s, todayDone: false, lastOpenDate: today }))
    }
  }, [])

  function setChild(name, age) {
    setStore(s => ({ ...s, childName: name, childAge: age }))
  }

  function completeToday() {
    setStore(s => ({
      ...s,
      todayDone: true,
      leaves: s.leaves + 1,
      currentDay: s.currentDay + 1,
    }))
  }

  function resetForDev() {
    localStorage.removeItem(STORAGE_KEY)
    setStore(defaultState)
  }

  const isOnboarded = Boolean(store.childName)

  return { store, isOnboarded, setChild, completeToday, resetForDev }
}
