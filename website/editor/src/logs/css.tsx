//$todo
export function css(obj) {
  return parseCssObject(normalizeCssObject(obj))
}

function decamelcase(word: string) {
  return word.replace(/[A-Z]+/g, ch => `-${ch.toLocaleLowerCase()}`)
}
function normalizeCssObject(obj) {
  const result = {}
  for (const key in obj) {
    result[decamelcase(key)] = String(obj[key])
  }
  return result
}
function parseCssObject(obj) {
  const pairs = []
  for (const key in obj) {
    pairs.push(`${key}: ${obj[key]};`)
  }
  return pairs.join(' ')
}
