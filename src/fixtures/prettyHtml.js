// prettier 3 has no sync api, and this helper is called inline from snapshot
// assertions all over the forest tests
const {format} = require('@prettier/sync')

module.exports = function prettyHtml(content) {
  if (typeof content !== 'string') return content
  try {
    const result = format(content, {parser: 'html', printWidth: 60, semi: true})
      .replace(/"/g, "'")
      .trim()
    return `\n${result}\n`
  } catch (error) {
    return content
  }
}
