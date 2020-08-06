import {argumentHistory} from 'effector/fixtures'
import {
  createDomain,
  forward,
  combine,
  attach,
  fork,
  allSettled,
  serialize,
  hydrate,
} from 'effector'
import {
  h,
  using,
  list,
  node,
  spec,
  rec,
  variant,
  remap,
  block,
  text,
} from 'forest'
import {renderStatic} from 'forest/server'
import prettyHtml from 'effector/fixtures/prettyHtml'

test('block with rec and list', async () => {
  //prettier-ignore
  type User = {id: number; login: string};

  const fn = jest.fn()

  const app = createDomain()

  const users = app.createStore<User[]>([{id: 0, login: 'alice'}])

  const App = block({
    fn() {
      list({
        source: users,
        key: 'id',
        fn({store}) {
          const login = store.map(val => {
            fn(val)
            return val ? val.login : ''
          })
          h('div', {text: login})
        },
      })
    },
  })

  const scope = fork(app, {
    values: new Map().set(users, [
      {id: 0, login: 'alice'},
      {id: 1, login: 'bob'},
    ]),
  })

  const renderedRaw = await renderStatic({
    scope,
    fn: App,
  })
  expect(prettyHtml(renderedRaw)).toMatchInlineSnapshot(`
    "
    <div>alice</div>
    <div>bob</div>
    "
  `)
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      null,
      Object {
        "id": 0,
        "login": "alice",
      },
      Object {
        "id": 0,
        "login": "alice",
      },
      Object {
        "id": 1,
        "login": "bob",
      },
      Object {
        "id": 1,
        "login": "bob",
      },
    ]
  `)
})
