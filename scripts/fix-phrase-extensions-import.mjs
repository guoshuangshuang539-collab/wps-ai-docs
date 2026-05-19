import { writeFileSync } from 'fs'

const content = `/**
 * Blog/encyclopedia phrase extensions loaded from static JSON (14 languages).
 * Do not replace this file with generate-blog-encyclopedia-phrases.mjs output.
 */
const phraseModules = import.meta.glob('./phraseExtensions/*.json', { eager: true })

export const blogEncyclopediaPhraseExtensionsByLanguage = Object.fromEntries(
  Object.entries(phraseModules).map(([path, module]) => {
    const language = path.replace(/^\\.\\/phraseExtensions\\//, '').replace(/\\.json$/, '')
    return [language, module.default ?? module]
  }),
)
`

writeFileSync(new URL('../src/data/blogEncyclopediaPhraseExtensions.js', import.meta.url), content)
console.log('Fixed blogEncyclopediaPhraseExtensions.js (glob loader)')
