/** Shared hub search: substring match, case-insensitive, debounced in useModuleHubSearch. */
export const MODULE_HUB_SEARCH_DEBOUNCE_MS = 1000

export function normalizeModuleHubKeyword(raw) {
  return `${raw ?? ''}`.trim().toLowerCase()
}

export function matchModuleHubKeyword(text, keyword) {
  const normalizedKeyword = normalizeModuleHubKeyword(keyword)
  if (!normalizedKeyword) {
    return true
  }
  return `${text ?? ''}`.toLowerCase().includes(normalizedKeyword)
}

export function moduleHubFilterItems(items, keyword, getSearchableStrings) {
  const normalizedKeyword = normalizeModuleHubKeyword(keyword)
  if (!normalizedKeyword) {
    return items
  }
  return items.filter((item) =>
    getSearchableStrings(item).some((value) => matchModuleHubKeyword(value, normalizedKeyword)),
  )
}
