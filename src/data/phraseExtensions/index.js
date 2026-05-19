/**
 * Loads all blog/encyclopedia phrase JSON files (14 languages).
 * Single source of truth — do not use generate-blog-encyclopedia-phrases.mjs output.
 */
const modules = import.meta.glob('./*.json', { eager: true })

export const phraseExtensionsByLanguage = Object.fromEntries(
  Object.entries(modules).map(([path, module]) => {
    const language = path.replace(/^\.\//, '').replace(/\.json$/, '')
    return [language, module.default ?? module]
  }),
)
