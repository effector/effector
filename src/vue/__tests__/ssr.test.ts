/* eslint-disable react-hooks/rules-of-hooks */
import {
  EffectorScopePlugin,
  useProvidedScope,
  useStore,
  useUnit,
} from 'effector-vue/composition'
import {
  allSettled,
  createEffect,
  createEvent,
  createStore,
  fork,
  scopeBind,
} from 'effector'
import {defineComponent, h, nextTick, onServerPrefetch} from 'vue-next'

import {hydrateInto, linksCount, mountSetup, renderSSR} from './helpers'

jest.mock('vue', () => require('vue-next'))

let warn: jest.SpyInstance

beforeEach(() => {
  warn = jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  warn.mockRestore()
})

describe('server render', () => {
  test('renders the state of the scope without subscribing to it', async () => {
    const $value = createStore('global')
    const scope = fork({values: [[$value, 'scoped']]})

    const App = defineComponent({
      setup() {
        const value = useUnit($value)
        return () => h('p', value.value)
      },
    })

    const html = await renderSSR(App, {scope})

    expect(html).toBe('<p>scoped</p>')
    expect(linksCount(scope)).toBe(0)
    expect(warn).not.toHaveBeenCalled()
  })

  test('useStore renders the state of the scope', async () => {
    const $value = createStore('global')
    const scope = fork({values: [[$value, 'scoped']]})

    const App = defineComponent({
      setup() {
        const value = useStore($value)
        return () => h('p', value.value)
      },
    })

    const html = await renderSSR(App, {scope})

    expect(html).toBe('<p>scoped</p>')
    expect(linksCount(scope)).toBe(0)
  })

  test('renders the data loaded in onServerPrefetch', async () => {
    const loadFx = createEffect(async () => 'loaded')
    const $data = createStore('empty').on(loadFx.doneData, (_, data) => data)
    const scope = fork()

    const App = defineComponent({
      setup() {
        const data = useUnit($data)
        const appScope = useProvidedScope({forceScope: true})
        onServerPrefetch(() => allSettled(loadFx, {scope: appScope}))
        return () => h('p', data.value)
      },
    })

    const html = await renderSSR(App, {scope})

    expect(html).toBe('<p>loaded</p>')
    expect(scope.getState($data)).toBe('loaded')
    expect($data.getState()).toBe('empty')
  })

  test('server ref: a ref made in setup renders the state onServerPrefetch set', async () => {
    /**
     * Nothing subscribes on the server, so a snapshot taken in setup would
     * render 'before'. The server ref of subscribeStores reads the scope
     * when the template asks for it.
     */
    const update = createEvent<string>()
    const $value = createStore('before').on(update, (_, value) => value)
    const scope = fork()

    const App = defineComponent({
      setup() {
        const value = useUnit($value)
        const stored = useStore($value)
        const appScope = useProvidedScope({forceScope: true})
        onServerPrefetch(() => {
          scopeBind(update, {scope: appScope})('after')
        })
        return () => h('p', `${value.value} ${stored.value}`)
      },
    })

    const html = await renderSSR(App, {scope})

    expect(html).toBe('<p>after after</p>')
    expect(linksCount(scope)).toBe(0)
    expect($value.getState()).toBe('before')
  })

  test('parallel renders do not mix their scopes', async () => {
    const $value = createStore('global')
    const first = fork({values: [[$value, 'first']]})
    const second = fork({values: [[$value, 'second']]})

    const App = defineComponent({
      setup() {
        const value = useUnit($value)
        return () => h('p', value.value)
      },
    })

    const html = await Promise.all([
      renderSSR(App, {scope: first}),
      renderSSR(App, {scope: second}),
    ])

    expect(html).toEqual(['<p>first</p>', '<p>second</p>'])
  })
})

describe('the live option of the plugin', () => {
  test('false turns the subscription off where there is no render context', () => {
    const setValue = createEvent<string>()
    const $value = createStore('value').on(setValue, (_, value) => value)
    const scope = fork()

    const {result} = mountSetup(() => useUnit($value), [
      EffectorScopePlugin({scope, live: false}),
    ])

    expect(linksCount(scope)).toBe(0)
    expect(result.value).toBe('value')

    scopeBind(setValue, {scope})('updated')

    /** Nothing pushes the update, the ref reads the scope when asked. */
    expect(result.value).toBe('updated')
    expect(warn).not.toHaveBeenCalled()
  })

  test('true keeps the subscription', () => {
    const $value = createStore('value')
    const scope = fork()
    const plugin = EffectorScopePlugin({scope, live: true})

    mountSetup(() => useUnit($value), [plugin])

    expect(linksCount(scope)).toBe(1)
  })
})

describe('hydration', () => {
  test('hydrates the server html and subscribes on the client', async () => {
    const setValue = createEvent<string>()
    const $value = createStore('global').on(setValue, (_, value) => value)
    const server = fork({values: [[$value, 'scoped']]})
    const client = fork({values: [[$value, 'scoped']]})

    const App = defineComponent({
      setup() {
        const value = useUnit($value)
        return () => h('p', value.value)
      },
    })

    const html = await renderSSR(App, {scope: server})
    const {container, unmount} = hydrateInto(html, App, {scope: client})

    expect(container.innerHTML).toBe('<p>scoped</p>')
    expect(warn).not.toHaveBeenCalled()

    scopeBind(setValue, {scope: client})('hydrated')
    await nextTick()

    expect(container.innerHTML).toBe('<p>hydrated</p>')

    unmount()

    expect(linksCount(client)).toBe(0)
  })
})
