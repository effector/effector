/**
 * docusaurus added support for automatic dark theme switcher in v 2.0.0-alpha.40
 * however, automatic switching looks broken in chrome desktop,
 * so we need to explicitly change it in case of chages of user theme preferences
 */
const isDark = window.matchMedia('(prefers-color-scheme: dark)')
// theme key used by docusaurus
const THEME = 'theme'
// current system theme
const SYSTEM_THEME = 'theme/system'
// is theme was explicitly changed
const IS_EXPLICIT_THEME = 'theme/explicit'
const EXPLICIT_THEME_DATE = 'theme/explicit/updated'
// one week
const EXPLICIT_THEME_EXPIRE = 1e3 * 60 * 60 * 24 * 7

setItem(SYSTEM_THEME, isDark.matches ? 'dark' : 'light')
if (getItem(IS_EXPLICIT_THEME) === null) {
  setItem(IS_EXPLICIT_THEME, false)
  setItem(EXPLICIT_THEME_DATE, Date.now())
} else {
  const lastUpdated = getItem(EXPLICIT_THEME_DATE)
  if (isFinite(lastUpdated)) {
    const updateTimestamp = +lastUpdated
    if (Date.now() - updateTimestamp > EXPLICIT_THEME_EXPIRE) {
      setItem(IS_EXPLICIT_THEME, false)
      setItem(EXPLICIT_THEME_DATE, Date.now())
    }
  } else {
    setItem(EXPLICIT_THEME_DATE, Date.now())
  }
}
let onSetItem = e => {}
try {
  const setter = localStorage.setItem.bind(localStorage)
  localStorage.setItem = function(key, value) {
    setter(key, value)
    try {
      onSetItem({key, newValue: value})
    } catch (err) {}
  }
} catch (err) {}
window.addEventListener('storage', e => {
  if (e.key !== THEME) return
  document.documentElement.dataset.theme = e.newValue
})
setTimeout(() => {
  onSetItem = e => {
    if (e.key !== THEME) return
    let systemTheme = getItem(SYSTEM_THEME)
    if (systemTheme === 'light') systemTheme = ''
    const isExplicit = e.newValue !== systemTheme
    setItem(IS_EXPLICIT_THEME, isExplicit)
    if (isExplicit) {
      setItem(EXPLICIT_THEME_DATE, Date.now())
    }
  }
  isDark.addListener(applyTheme)
  applyTheme(isDark)
}, 1000)
function applyTheme(e) {
  setItem(SYSTEM_THEME, e.matches ? 'dark' : 'light')
  if (getItem(IS_EXPLICIT_THEME)) return
  const theme = e.matches ? 'dark' : ''
  document.documentElement.dataset.theme = theme
  setItem(THEME, theme)
}
function setItem(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch (err) {}
}
function getItem(key) {
  let result = null
  try {
    result = localStorage.getItem(key)
  } catch (err) {}
  if (result === 'true') result = true
  if (result === 'false') result = false
  return result
}
