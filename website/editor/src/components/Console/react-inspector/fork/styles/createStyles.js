import * as themes from './themes'
import base from './base'

const styles = Object.keys(themes).reduce((styles, themeName) => {
  styles[themeName] = base(themes[themeName])
  return styles
}, {})

const createStyles = (key, theme) => {
  // console.debug(styles, theme, styles[theme])
  if (typeof theme === 'string') {
    return styles[theme][key]
  } else if (typeof theme === 'object') {
    return base(theme)[key]
  }
  // Default styles
  return styles['chromeLight'][key]
}

export default createStyles
