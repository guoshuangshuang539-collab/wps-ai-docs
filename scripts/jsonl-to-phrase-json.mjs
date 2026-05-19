import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const lang = process.argv[2]
if (!lang) {
  console.error('Usage: node jsonl-to-phrase-json.mjs <lang>')
  process.exit(1)
}

const phrases = JSON.parse(readFileSync(join(root, 'scripts/phrases-en.json'), 'utf8'))
const lines = readFileSync(join(root, 'scripts/phrase-vals', `${lang}.jsonl`), 'utf8')
  .trim()
  .split(/\r?\n/)
  .map((line) => JSON.parse(line))

if (lines.length !== phrases.length) {
  console.error(`${lang}: expected ${phrases.length} lines, got ${lines.length}`)
  process.exit(1)
}

const out = {}
phrases.forEach((key, i) => {
  out[key] = lines[i]
})

writeFileSync(
  join(root, 'src/data/phraseExtensions', `${lang}.json`),
  `${JSON.stringify(out, null, 2)}\n`,
)
console.log(`wrote ${lang}.json`)
