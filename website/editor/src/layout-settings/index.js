const cssVars = [
  '--outline-width',
  '--right-panel-width',
  '--console-height',
]

export const loadLayoutSettings = () => {
  try {
    const settings = JSON.parse(localStorage.getItem('layout-settings'))
    Object.keys(settings).forEach(key => {
      if (cssVars.includes(key)) {
        document.body.style
          .setProperty(key, settings[key])
      }
    })
  } catch (e) {
    // console.error(e)
  }
}
