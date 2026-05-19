import { writeFileSync, readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { th } from './_locale-phrase-values.mjs'
import { vi } from './_locale-phrase-values-vi.mjs'
import { ms } from './_locale-phrase-values-ms.mjs'
import { ru } from './_locale-phrase-values-ru.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const keys = JSON.parse(readFileSync(join(root, 'scripts/phrases-en.json'), 'utf8'))

function writeLocale(lang, values) {
  if (keys.length !== values.length) {
    throw new Error(`${lang}: expected ${keys.length} values, got ${values.length}`)
  }
  const out = {}
  keys.forEach((key, i) => {
    out[key] = values[i]
  })
  const path = join(root, `src/data/phraseExtensions/${lang}.json`)
  writeFileSync(path, `${JSON.stringify(out, null, 2)}\n`, 'utf8')
  console.log(`Wrote ${path} (${values.length} entries)`)
}

writeLocale('th', th)
writeLocale('vi', vi)
writeLocale('ms', ms)
writeLocale('ru', ru)
