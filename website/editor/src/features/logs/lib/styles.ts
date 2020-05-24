const boldWhiteMixin = {
  color: 'white',
  fontWeight: 800,
}

export const presets = style({
  log: {
    backgroundColor: 'gray',
    ...boldWhiteMixin,
  },
  warn: {
    backgroundColor: 'orange',
    ...boldWhiteMixin,
  },
  error: {
    backgroundColor: 'rgb(155, 9, 9)',
    ...boldWhiteMixin,
  },
})

function style<T extends Record<string, object>>(
  styleMap: T,
): {
  [key in keyof T]: string
} {
  const result: Record<string, string> = {}
  for (const key in styleMap) {
    result[key] = css(styleMap[key])
  }
  return result as {[key in keyof T]: string}
}

function css(styles: object) {
  return parseCssObject(normalizeCssObject(styles))
}

function decamelcase(word: string) {
  return word.replace(/[A-Z]+/g, ch => `-${ch.toLocaleLowerCase()}`)
}

function normalizeCssObject(styles: Record<string, any>) {
  const result: Record<string, string> = {}
  for (const key in styles) {
    result[decamelcase(key)] = String(styles[key])
  }
  return result
}

function parseCssObject(styles: Record<string, any>) {
  const pairs = []
  for (const key in styles) {
    pairs.push(`${key}: ${styles[key]};`)
  }
  return pairs.join(' ')
}
