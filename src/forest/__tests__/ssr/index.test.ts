import {
  createEvent,
  createStore,
  createEffect,
  createDomain,
  forward,
  fork,
  allSettled,
  serialize,
  hydrate,
} from 'effector'
import {h, using, block, text, rec} from 'forest'
import {renderStatic} from 'forest/server'
import prettyHtml from 'effector/fixtures/prettyHtml'
//@ts-expect-error
import {provideGlobals} from 'effector/fixtures/dom'

const consoleError = console.error

beforeAll(() => {
  console.error = (message, ...args) => {
    if (String(message).includes('forward')) return
    consoleError(message, ...args)
  }
})

afterAll(() => {
  console.error = consoleError
})

test('fork support', async () => {
  const fetchContent = createEffect(async () => {
    return {title: 'dashboard'}
  })
  const title = createStore('-').on(
    fetchContent.doneData,
    (_, {title}) => title,
  )

  const scope = fork({
    values: [[title, 'loading...']],
    handlers: [[fetchContent, async () => ({title: 'contacts'})]],
  })

  await allSettled(fetchContent, {scope})

  const htmlResult = await renderStatic({
    scope,
    fn() {
      h('h1', {text: title})
    },
  })
  expect(prettyHtml(htmlResult)).toMatchInlineSnapshot(`
    "
    <h1>contacts</h1>
    "
  `)
})

test('hydration support (without html hydration)', async () => {
  const app = createDomain()
  const fetchContent = app.createEffect(async () => {
    return {title: 'dashboard'}
  })
  const title = app
    .createStore('-')
    .on(fetchContent.doneData, (_, {title}) => title)

  const scope = fork(app, {
    values: [[title, 'loading...']],
    handlers: [[fetchContent, async () => ({title: 'contacts'})]],
  })

  await allSettled(fetchContent, {scope})

  hydrate(app, {
    values: serialize(scope),
  })

  const htmlResult = await renderStatic({
    scope,
    fn() {
      h('h1', {text: title})
    },
  })

  expect(prettyHtml(htmlResult)).toMatchInlineSnapshot(`
    "
    <h1>contacts</h1>
    "
  `)
})

test('hydration support (with html hydration)', async () => {
  const app = createDomain()
  const fetchContent = app.createEffect({
    async handler() {
      return {title: 'dashboard'}
    },
  })
  const title = app
    .createStore('-')
    .on(fetchContent.doneData, (_, {title}) => title)

  function App() {
    h('h1', {text: title})
  }

  const scope = fork(app, {
    values: new Map([[title, 'loading...']]),
    handlers: new Map([[fetchContent, async () => ({title: 'contacts'})]]),
  })

  await allSettled(fetchContent, {
    scope,
  })

  const htmlSource = await renderStatic({
    scope,
    fn: App,
  })

  hydrate(app, {
    values: serialize(scope),
  })

  const client = provideGlobals()

  client.el.innerHTML = htmlSource

  // await new Promise(rs => {
  using(client.el, {
    // onComplete: rs,
    hydrate: true,
    fn: App,
    env: {
      document: client.document,
    },
  })
  // })

  await new Promise(rs => setTimeout(rs, 200))

  expect(prettyHtml(client.el.innerHTML)).toMatchInlineSnapshot(`
    "
    <h1>contacts</h1>
    "
  `)

  await fetchContent()

  await new Promise(rs => setTimeout(rs, 200))

  expect(prettyHtml(client.el.innerHTML)).toMatchInlineSnapshot(`
    "
    <h1>dashboard</h1>
    "
  `)
})

test('hydrate', async () => {
  const rootItem = createStore(null)
  const Item = rec<any>({
    fn() {
      h('div', {
        text: 'root',
      })
    },
  })
  const Tag = block({
    fn() {
      h('span', {
        text: 'SPAN',
      })
    },
  })
  const App = block({
    fn() {
      Tag()
      h('h1', {text: 'List'})
      Item({store: rootItem})
    },
  })

  const htmlSource = await renderStatic({
    scope: fork(),
    fn: App,
  })
  const client = provideGlobals()

  client.el.innerHTML = htmlSource
  await new Promise(rs => {
    //@ts-expect-error
    using(client.el, {
      scope: fork(),
      onComplete: rs,
      fn: App,
      env: {
        document: client.document,
      },
      hydrate: true,
    })
  })
  expect(prettyHtml(client.el.innerHTML)).toMatchInlineSnapshot(`
    "
    <span>SPAN</span>
    <h1>List</h1>
    <div>root</div>
    "
  `)
})

describe('text content escaping', () => {
  it('escape text content in common tags', async () => {
    const scriptText = createStore('{"foo": "bar"}')
    const result = await renderStatic(() => {
      h('span', () => {
        text`window.__INITIAL_STATE__ = ${scriptText}`
      })
    })
    expect(result).toMatchInlineSnapshot(
      `"<span>window.__INITIAL_STATE__ = {&quot;foo&quot;: &quot;bar&quot;}</span>"`,
    )
  })
  it('not escape text content in script tag', async () => {
    const scriptText = createStore('{"foo": "bar"}')
    const result = await renderStatic(() => {
      h('script', () => {
        text`window.__INITIAL_STATE__ = ${scriptText}`
      })
    })
    expect(result).toMatchInlineSnapshot(
      `"<script>window.__INITIAL_STATE__ = {\\"foo\\": \\"bar\\"}</script>"`,
    )
  })
  it('still escape "</script>" in script tag', async () => {
    const scriptText = createStore(JSON.stringify({foo: `</\nscript>`}))
    const result = await renderStatic(() => {
      h('script', () => {
        text`window.__INITIAL_STATE__ = ${scriptText}; console.log('</script>')`
      })
    })
    expect(result).toMatchInlineSnapshot(
      `"<script>window.__INITIAL_STATE__ = {\\"foo\\":\\"<\\\\/script>\\"}; console.log('<\\\\/script>')</script>"`,
    )
  })
})

test('fork isolation', async () => {
  const scopeName = createStore('--')
  const click = createEvent<MouseEvent>()
  const fetchContent = createEffect(async () => {
    return {title: 'dashboard'}
  })
  const title = createStore('-').on(
    fetchContent.doneData,
    (_, {title}) => title,
  )

  forward({
    from: click,
    to: fetchContent,
  })

  const client = provideGlobals()

  const App = block({
    fn() {
      h('h1', {text: title})
      h('button', {
        attr: {id: 'click'},
        handler: {click},
        text: scopeName,
      })
    },
  })

  const scopeA = fork({
    values: [
      [title, 'loading...'],
      [scopeName, 'A'],
    ],
    handlers: [[fetchContent, async () => ({title: 'contacts'})]],
  })

  const scopeB = fork({
    values: [
      [title, 'loading...'],
      [scopeName, 'B'],
    ],
    handlers: [[fetchContent, async () => ({title: 'profile'})]],
  })

  const elA = client.document.createElement('div')
  const elB = client.document.createElement('div')
  client.el.appendChild(elA)
  client.el.appendChild(elB)

  //@ts-expect-error
  using(elA, {
    scope: scopeA,
    fn: App,
    env: {
      document: client.document,
    },
    onRoot({template, leaf}: any) {},
  })
  using(elB, {
    scope: scopeB,
    fn: App,
    env: {
      document: client.document,
    },
  })

  await new Promise(rs => setTimeout(rs, 200))

  elA.querySelector('#click').click()

  await new Promise(rs => setTimeout(rs, 200))

  expect(prettyHtml(elA.innerHTML)).toMatchInlineSnapshot(`
    "
    <h1>contacts</h1>
    <button id='click'>A</button>
    "
  `)
  expect(prettyHtml(elB.innerHTML)).toMatchInlineSnapshot(`
    "
    <h1>loading...</h1>
    <button id='click'>B</button>
    "
  `)
  expect(title.getState()).toBe('-')
})
