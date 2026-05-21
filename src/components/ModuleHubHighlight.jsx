export default function ModuleHubHighlight({ text, keyword }) {
  if (!keyword) {
    return text
  }

  const source = `${text ?? ''}`
  const lowerSource = source.toLowerCase()
  const lowerKeyword = keyword.toLowerCase()
  const parts = []
  let cursor = 0
  let matchIndex = lowerSource.indexOf(lowerKeyword)

  while (matchIndex !== -1) {
    if (matchIndex > cursor) {
      parts.push(source.slice(cursor, matchIndex))
    }
    const match = source.slice(matchIndex, matchIndex + keyword.length)
    parts.push(
      <span key={`${match}-${matchIndex}`} className="module-hub-highlight">
        {match}
      </span>,
    )
    cursor = matchIndex + keyword.length
    matchIndex = lowerSource.indexOf(lowerKeyword, cursor)
  }

  if (cursor < source.length) {
    parts.push(source.slice(cursor))
  }

  return parts
}
