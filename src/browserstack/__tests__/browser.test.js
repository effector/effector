/* eslint-disable prefer-arrow-callback,no-var,space-before-function-paren */
test('load localhost', async () => {
  jest.setTimeout(30000)
  await browser.url('/src/browserstack/page.html')
  await browser.getUrl()
  await browser.execute(function() {
    if (!window.__addScript__) {
      console.error('no __addScript__', document.title)
      return
    }
    window.__addScript__('/npm/effector/effector.umd.js')
  })
  await new Promise(rs => setTimeout(rs, 500))
  await browser.execute(function() {
    if (!window.__runCode__) {
      console.error('no __runCode__', document.title)
      return
    }
    window.__runCode__(function() {
      if (!window.effector) return
      var createStore = window.effector.createStore
      /*prettier-ignore*/
      var store = createStore({
        message: 'hello',
        isError: false
      })
      store.watch(function(state) {
        window.__setText__(state.message, state.isError)
      })
      /*prettier-ignore*/
      store.setState({
        message: 'effector works as expected',
        isError: false
      })
    })
  })
  await new Promise(rs => setTimeout(rs, 500))
  const results = await browser.execute(function() {
    var logs = window.__errorLogs__
    window.__errorLogs__ = []
    return logs
  })
  expect(results).toEqual([])
})
