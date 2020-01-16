import {createStore} from 'effector'
import {using, h, spec, list, remap} from 'effector-dom'

beforeAll(() => {
  globalThis.requestAnimationFrame = cb => setTimeout(cb, 0)
  globalThis.cancelAnimationFrame = clearTimeout
})
it('works', async () => {
  const el = document.createElement('div')
  const store = createStore([{name: 'alice'}, {name: 'bob'}, {name: 'carol'}])
  using(el, () => {
    h('header', () => {
      h('h1', {
        text: 'App title',
      })
    })
    h('ul', () => {
      list(store, ({store}) => {
        h('li', {
          text: remap(store, ['name'])[0],
        })
      })
    })
  })
  await new Promise(rs => setTimeout(rs, 500))
  expect(el.innerHTML).toMatchInlineSnapshot(
    `"<header><h1>App title</h1></header><ul><li>alice</li><li>bob</li><li>carol</li></ul>"`,
  )
})
