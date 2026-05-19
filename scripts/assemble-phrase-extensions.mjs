import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const keys = JSON.parse(readFileSync(join(root, 'scripts/phrases-en.json'), 'utf8'))

for (const lang of ['th', 'vi', 'ms', 'ru']) {
  const values = JSON.parse(readFileSync(join(root, `scripts/phrases-${lang}.json`), 'utf8'))
  if (keys.length !== values.length) {
    throw new Error(`${lang}: expected ${keys.length} values, got ${values.length}`)
  }
  const out = {}
  keys.forEach((key, i) => {
    out[key] = values[i]
  })
  writeFileSync(
    join(root, `src/data/phraseExtensions/${lang}.json`),
    JSON.stringify(out, null, 2) + '\n',
    'utf8',
  )
}

console.log('Wrote th.json, vi.json, ms.json, ru.json')
