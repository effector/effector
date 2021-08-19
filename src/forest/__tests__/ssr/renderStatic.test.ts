import {createStore} from 'effector'
import {h, list, remap} from 'forest'
import {renderStatic} from 'forest/server'
import prettyHtml from 'effector/fixtures/prettyHtml'

it('works', async () => {
  const store = createStore([{name: 'alice'}, {name: 'bob'}, {name: 'carol'}])
  const htmlResult = await renderStatic({
    fn() {
      h('header', () => {
        h('h1', {
          text: 'App title',
        })
      })
      h('ul', () => {
        list(store, ({store}) => {
          h('li', {
            text: remap(store, 'name'),
          })
        })
      })
    },
  })

  expect(prettyHtml(htmlResult)).toMatchInlineSnapshot(`
    "
    <header><h1>App title</h1></header>
    <ul>
      <li>alice</li>
      <li>bob</li>
      <li>carol</li>
    </ul>
    "
  `)
})
