/**
 * DEPRECATED — do not use MyMemory or other free translation APIs here.
 *
 * Blog/encyclopedia phrases are static JSON:
 *   src/data/phraseExtensions/{lang}.json  (255 keys each)
 *   Merged in src/data/blogEncyclopediaPhraseExtensions.js
 *
 * To add or update a language:
 *   1. Edit scripts/phrase-vals/{lang}.jsonl (one JSON string per line, phrases-en order)
 *   2. node scripts/jsonl-to-phrase-json.mjs {lang}
 */
console.error(
  'This script is disabled. Use src/data/phraseExtensions/*.json and scripts/jsonl-to-phrase-json.mjs instead.',
)
process.exit(1)
