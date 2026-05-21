import { startTransition, useEffect, useState } from 'react'
import { MODULE_HUB_SEARCH_DEBOUNCE_MS, normalizeModuleHubKeyword } from '../utils/moduleHubSearch'

function useDebouncedValue(value, delayMs = MODULE_HUB_SEARCH_DEBOUNCE_MS) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    if (!`${value}`.trim()) {
      setDebounced(value)
      return undefined
    }
    const timerId = window.setTimeout(() => setDebounced(value), delayMs)
    return () => window.clearTimeout(timerId)
  }, [value, delayMs])

  return debounced
}

export function useModuleHubSearch(initialValue = '') {
  const [input, setInput] = useState(initialValue)
  const debouncedInput = useDebouncedValue(input)
  const [keyword, setKeyword] = useState(() => normalizeModuleHubKeyword(initialValue))

  useEffect(() => {
    const nextKeyword = normalizeModuleHubKeyword(debouncedInput)
    startTransition(() => {
      setKeyword(nextKeyword)
    })
  }, [debouncedInput])

  const isPending = normalizeModuleHubKeyword(input) !== keyword
  const showStatus = Boolean(input.trim()) || Boolean(keyword)

  return {
    input,
    setInput,
    keyword,
    isPending,
    showStatus,
  }
}
