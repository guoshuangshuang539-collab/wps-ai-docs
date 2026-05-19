import { translateOfflinePhrase } from '../src/data/offlinePhraseTranslations.js'
import { readFileSync } from 'fs'
import { blogPostsByLanguage } from '../src/data/blogData.js'
import { encyclopediaEntriesByLocale } from '../src/data/encyclopediaData.js'

const blogPosts = blogPostsByLanguage.en
const encyclopediaEntriesEn = encyclopediaEntriesByLocale.en

function collectFromPosts(posts) {
  const phrases = []
  posts.forEach((post) => {
    phrases.push(post.title, post.excerpt, post.authorName, post.authorRole, post.imageAlt)
    ;(post.tags ?? []).forEach((tag) => phrases.push(tag))
    ;(post.body ?? []).forEach((paragraph) => phrases.push(paragraph))
  })
  return phrases
}

function collectFromEncyclopedia(entries) {
  const phrases = []
  entries.forEach((entry) => {
    phrases.push(entry.title, entry.summary)
    ;(entry.body ?? []).forEach((paragraph) => phrases.push(paragraph))
  })
  return phrases
}

const phrases = [
  ...new Set(
    [...collectFromPosts(blogPosts), ...collectFromEncyclopedia(encyclopediaEntriesEn)].filter(Boolean),
  ),
]

const langs = ['es', 'de', 'fr', 'ja', 'ko', 'pt', 'ar', 'it', 'nl', 'pl', 'tr', 'id', 'th', 'vi', 'ms', 'ru', 'zh-tw']

for (const lang of langs) {
  const hit = phrases.filter((phrase) => translateOfflinePhrase(lang, phrase) !== phrase).length
  console.log(`${lang}: ${hit}/${phrases.length}`)
}
