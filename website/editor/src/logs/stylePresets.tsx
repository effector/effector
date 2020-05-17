import {css} from './css'

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

function style(styleMap) {
  const result = {}
  for (const key in styleMap) {
    result[key] = css(styleMap[key])
  }
  return result
}
