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
import {h, using, list, node, spec} from 'forest'
import {renderStatic} from 'forest/server'
import prettyHtml from 'effector/fixtures/prettyHtml'
//@ts-ignore
import {provideGlobals} from 'effector/fixtures/dom'

test('fork support', async () => {
  const app = createDomain()
  const fetchContent = app.createEffect({
    async handler() {
      return {title: 'dashboard'}
    },
  })
  const title = app
    .createStore('-')
    .on(fetchContent.doneData, (_, {title}) => title)

  const scope = fork(app, {
    values: new Map([[title, 'loading...']]),
    handlers: new Map([[fetchContent, async () => ({title: 'contacts'})]]),
  })

  await allSettled(fetchContent, {
    scope,
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

test('hydration support (without html hydration)', async () => {
  const app = createDomain()
  const fetchContent = app.createEffect({
    async handler() {
      return {title: 'dashboard'}
    },
  })
  const title = app
    .createStore('-')
    .on(fetchContent.doneData, (_, {title}) => title)

  const scope = fork(app, {
    values: new Map([[title, 'loading...']]),
    handlers: new Map([[fetchContent, async () => ({title: 'contacts'})]]),
  })

  await allSettled(fetchContent, {
    scope,
  })

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
