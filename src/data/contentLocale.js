/** Languages with dedicated blog/encyclopedia copy (not translated from English at runtime). */
export const NATIVE_BLOG_CONTENT_LANGUAGES = new Set(['en', 'zh', 'ja', 'ko', 'zh-tw'])

/** Locales with dedicated encyclopedia entry bundles. */
export const NATIVE_ENCYCLOPEDIA_LOCALES = new Set(['en', 'zh', 'ja', 'ko', 'zh-tw'])

export function localizeBlogPostFields(post, language, localize) {
  if (NATIVE_BLOG_CONTENT_LANGUAGES.has(language)) {
    return post
  }

  return {
    ...post,
    authorName: localize(post.authorName),
    authorRole: localize(post.authorRole),
    title: localize(post.title),
    excerpt: localize(post.excerpt),
    imageAlt: localize(post.imageAlt ?? post.title),
    readTime: localize(post.readTime ?? '5 min read'),
    tags: (post.tags ?? []).map((tag) => localize(tag)),
    body: (post.body ?? []).map((paragraph) => localize(paragraph)),
  }
}

export function localizeEncyclopediaEntryFields(entry, locale, localize) {
  if (NATIVE_ENCYCLOPEDIA_LOCALES.has(locale)) {
    return entry
  }

  return {
    ...entry,
    title: localize(entry.title),
    summary: localize(entry.summary),
    body: (entry.body ?? []).map((paragraph) => localize(paragraph)),
  }
}
