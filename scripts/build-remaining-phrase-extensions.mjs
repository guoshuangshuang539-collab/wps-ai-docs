/**
 * Builds nl, pl, th, vi, ms, ru phrase extension JSON from ordered translation arrays.
 * Keys must match scripts/phrases-en.json order exactly (255 items).
 */
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const phrases = JSON.parse(readFileSync(join(root, 'scripts/phrases-en.json'), 'utf8'))

function build(lang, values) {
  if (values.length !== phrases.length) {
    throw new Error(`${lang}: expected ${phrases.length} values, got ${values.length}`)
  }
  const out = {}
  phrases.forEach((key, i) => {
    out[key] = values[i]
  })
  writeFileSync(
    join(root, 'src/data/phraseExtensions', `${lang}.json`),
    `${JSON.stringify(out, null, 2)}\n`,
    'utf8',
  )
  console.log(`wrote ${lang}.json (${values.length} keys)`)
}

// Import translation arrays from separate modules
const { nl } = await import('./phrase-vals/nl.mjs')
const { pl } = await import('./phrase-vals/pl.mjs')
const { th } = await import('./phrase-vals/th.mjs')
const { vi } = await import('./phrase-vals/vi.mjs')
const { ms } = await import('./phrase-vals/ms.mjs')
const { ru } = await import('./phrase-vals/ru.mjs')

build('nl', nl)
build('pl', pl)
build('th', th)
build('vi', vi)
build('ms', ms)
build('ru', ru)
