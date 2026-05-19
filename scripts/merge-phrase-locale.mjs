import { readFileSync, writeFileSync } from 'fs'

const en = JSON.parse(readFileSync(new URL('./phrases-en.json', import.meta.url), 'utf8'))
const lang = process.argv[2]
if (!lang) {
  console.error('Usage: node scripts/merge-phrase-locale.mjs <lang>')
  process.exit(1)
}
const values = JSON.parse(
  readFileSync(new URL(`./phrase-values/${lang}.json`, import.meta.url), 'utf8'),
)
if (values.length !== en.length) {
  console.error(`${lang}: expected ${en.length} values, got ${values.length}`)
  process.exit(1)
}
const map = Object.fromEntries(en.map((key, index) => [key, values[index]]))
const out = new URL(`../src/data/phraseExtensions/${lang}.json`, import.meta.url)
writeFileSync(out, `${JSON.stringify(map, null, 2)}\n`, 'utf8')
console.log(`Wrote ${out.pathname} (${values.length} entries)`)
