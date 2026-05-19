import { readFileSync, writeFileSync } from 'fs'

const en = JSON.parse(readFileSync(new URL('./phrases-en.json', import.meta.url), 'utf8'))

function buildMap(values) {
  if (values.length !== en.length) {
    throw new Error(`Expected ${en.length} values, got ${values.length}`)
  }
  return Object.fromEntries(en.map((key, index) => [key, values[index]]))
}

function writeLocale(lang, values) {
  const path = new URL(`../src/data/phraseExtensions/${lang}.json`, import.meta.url)
  writeFileSync(path, `${JSON.stringify(buildMap(values), null, 2)}\n`, 'utf8')
  console.log(`Wrote ${lang}.json (${values.length} entries)`)
}

export { buildMap, writeLocale, en }
