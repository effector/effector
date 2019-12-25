/**
 * docusaurus added support for automatic dark theme switcher in v 2.0.0-alpha.40
 * however, automatic switching looks broken in chrome desktop,
 * so we need to explicitly change it in case of chages of user theme preferences
 */

const isDark = window.matchMedia('(prefers-color-scheme: dark)')

function applyTheme(e) {
  if (e.matches) {
    document.querySelector('html').dataset.theme = 'dark'
  } else {
    document.querySelector('html').dataset.theme = ''
  }
}

isDark.addListener(applyTheme)
applyTheme(isDark)
