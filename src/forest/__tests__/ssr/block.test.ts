import {argumentHistory} from 'effector/fixtures'
import {createDomain, forward, fork} from 'effector'
import {h, using, list, spec, rec, variant, remap, block} from 'forest'
import {renderStatic} from 'forest/server'
import prettyHtml from 'effector/fixtures/prettyHtml'
//@ts-ignore
import {provideGlobals} from 'effector/fixtures/dom'

test('block nesting', async () => {
  const app = createDomain()
  const scopeName = app.createStore('--')
  const click = app.createEvent<MouseEvent>()
  const fetchContent = app.createEffect({
    async handler() {
      return {title: 'dashboard'}
    },
  })
  const link = app
    .createStore('#')
    .on(fetchContent.doneData, (_, {title}) => `/${title}`)
  const linkText = app
    .createStore('-')
    .on(fetchContent.doneData, (_, {title}) => title)
  forward({
    from: click,
    to: fetchContent,
  })

  const client = provideGlobals()

  const SameLink = block({
    fn() {
      h('a', {
        attr: {href: link},
        text: ['Open ', linkText],
      })
    },
  })
  const Nav = block({
    fn() {
      h('svg', () => {
        SameLink()
      })
    },
  })

  const App = block({
    fn() {
      SameLink()
      h('nav', {
        fn: Nav,
      })
      h('button', {
        attr: {id: 'click'},
        handler: {click},
        text: scopeName,
      })
    },
  })

  const scopeA = fork(app, {
    values: new Map().set(link, '/').set(scopeName, 'A'),
    handlers: new Map([[fetchContent, async () => ({title: 'contacts'})]]),
  })

  using(client.el, {
    scope: scopeA,
    fn: App,
    env: {
      document: client.document,
    },
  })

  await new Promise(rs => setTimeout(rs, 200))

  client.el.querySelector('#click')?.click()

  await new Promise(rs => setTimeout(rs, 200))

  expect(prettyHtml(client.el.innerHTML)).toMatchInlineSnapshot(`
    "
    <a href='/contacts'>Open contacts</a>
    <nav>
      <svg xmlns='http://www.w3.org/2000/svg'>
        <a href='/contacts'>Open contacts</a>
      </svg>
    </nav>
    <button id='click'>A</button>
    "
  `)
})

test('block with list', async () => {
  type NestedList = {
    id: number
    title: string
    child: NestedList[]
  }
  const app = createDomain()
  const rootItem = app.createStore<NestedList>({
    id: 0,
    title: 'root',
    child: [
      {
        id: 1,
        title: 'foo',
        child: [],
      },
      {
        id: 2,
        title: 'bar',
        child: [],
      },
    ],
  })

  const App = block({
    fn() {
      const Item = rec<NestedList>(({store}) => {
        const [title, child] = remap(store, ['title', 'child'] as const)
        const typedChild = child.map(list =>
          list.length === 0
            ? ({type: 'empty'} as const)
            : ({type: 'list', list} as const),
        )
        h('div', () => {
          spec({text: title})
          variant({
            source: typedChild,
            key: 'type',
            cases: {
              empty() {
                h('span', {text: '...'})
              },
              list({store}) {
                const items = remap(store, 'list')
                h('ul', () => {
                  list({
                    source: items,
                    key: 'id',
                    fn({store}) {
                      Item({store})
                    },
                  })
                })
              },
            },
          })
        })
      })
      h('h1', {text: 'List'})
      Item({store: rootItem})
    },
  })

  const scope = fork(app)

  const result = await renderStatic({
    scope,
    fn: App,
  })

  await new Promise(rs => setTimeout(rs, 200))

  expect(prettyHtml(result)).toMatchInlineSnapshot(`
    "
    <h1>List</h1>
    <div>
      root
      <ul>
        <div>foo<span>...</span></div>
        <div>bar<span>...</span></div>
      </ul>
    </div>
    "
  `)
})

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
