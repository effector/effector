/* eslint-disable react-hooks/rules-of-hooks */
import {flushPromises, mount} from 'vue-test-utils-next'
import {
  EffectorScopePlugin,
  useStore,
  useStoreMap,
  useUnit,
} from 'effector-vue/composition'
import {
  Scope,
  createEvent,
  createStore,
  fork,
  launch,
  scopeBind,
} from 'effector'
import {defineComponent, h, nextTick} from 'vue-next'

import {linksCount, mountSetup, withApp, withEffectScope} from './helpers'

jest.mock('vue', () => require('vue-next'))

/** Watcher nodes the composables add to a scope. */
function storeWatchers(scope: Scope) {
  const links = (scope as any).additionalLinks as Record<string, any[]>
  const nodes: any[] = []
  for (const id of Object.keys(links)) {
    for (const node of links[id]) {
      if (node.meta.watchOp === 'store') nodes.push(node)
    }
  }
  return nodes
}

describe('subscription', () => {
  test('one launch of two stores updates both refs at once', () => {
    const inc = createEvent()
    const $a = createStore(1).on(inc, a => a + 1)
    const $b = createStore(2).on(inc, b => b + 1)
    const scope = fork()

    const {result} = mountSetup(
      () => useUnit({a: $a, b: $b, inc}),
      [EffectorScopePlugin({scope})],
    )

    const getState = jest.spyOn(scope, 'getState')
    result.inc()

    /**
     * A single batched subscription reads every store once per launch. One
     * subscription per store would read them twice as often, each time with
     * one of the refs still holding the previous value.
     */
    expect(getState).toHaveBeenCalledTimes(2)
    expect(result.a.value).toBe(2)
    expect(result.b.value).toBe(3)

    getState.mockRestore()
  })

  test('one launch of two stores calls the subscription once', () => {
    const inc = createEvent()
    const $a = createStore(1).on(inc, a => a + 1)
    const $b = createStore(2).on(inc, b => b + 1)

    const {result} = mountSetup(() => useUnit({a: $a, b: $b, inc}))

    /**
     * The shared callback re-reads every store of the call, so one read of
     * one store is one run of the callback. Without the batch the stores of
     * a single launch would call it once each.
     */
    const read = jest.spyOn($a, 'getState')
    result.inc()

    expect(read).toHaveBeenCalledTimes(1)
    expect(result.a.value).toBe(2)
    expect(result.b.value).toBe(3)

    read.mockRestore()
  })

  test('the same store twice takes one node and one ref', () => {
    const $value = createStore('value')
    const scope = fork()

    const {result} = mountSetup(
      () => useUnit({first: $value, second: $value}),
      [EffectorScopePlugin({scope})],
    )

    expect(result.first).toBe(result.second)
    expect(linksCount(scope)).toBe(1)
  })

  test('a shape of events subscribes to nothing', () => {
    const warn = jest.spyOn(console, 'error').mockImplementation(() => {})
    const inc = createEvent()
    const scope = fork()

    withApp(
      () => useUnit({inc}),
      app => app.use(EffectorScopePlugin({scope})),
    )

    expect(linksCount(scope)).toBe(0)
    expect(warn).not.toHaveBeenCalled()
    warn.mockRestore()
  })

  test('a launched subscription node re-reads the store', () => {
    const $value = createStore('value')
    const scope = fork()

    const {result} = mountSetup(
      () => useUnit($value),
      [EffectorScopePlugin({scope})],
    )
    const [node] = storeWatchers(scope)

    launch({target: node, params: null, scope})

    expect(result.value).toBe('value')
  })
})

describe('dispose', () => {
  test.each([
    ['useUnit with a store', ($value: any) => useUnit($value)],
    ['useUnit with a shape', ($value: any) => useUnit({value: $value})],
    ['useStore', ($value: any) => useStore($value)],
    [
      'useStoreMap',
      ($value: any) => useStoreMap({store: $value, fn: value => value}),
    ],
  ])('unmounting stops the subscription of %s', (_, composable) => {
    const $value = createStore('value')
    const scope = fork()

    const {unmount} = mountSetup(
      () => composable($value),
      [EffectorScopePlugin({scope})],
    )

    expect(linksCount(scope)).toBe(1)

    unmount()

    expect(linksCount(scope)).toBe(0)
  })

  test('stopping an effect scope stops the subscription', () => {
    const $value = createStore('value')
    const scope = fork()

    const {stop} = withEffectScope(
      () => useUnit($value),
      app => app.use(EffectorScopePlugin({scope})),
    )

    expect(linksCount(scope)).toBe(1)

    stop()

    expect(linksCount(scope)).toBe(0)
  })

  test('warns when there is no effect scope to dispose in', () => {
    const warn = jest.spyOn(console, 'error').mockImplementation(() => {})
    const $value = createStore('value')
    const scope = fork()

    withApp(
      () => useUnit($value),
      app => app.use(EffectorScopePlugin({scope})),
    )

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('[effector-vue] useUnit:'),
    )
    expect(linksCount(scope)).toBe(1)
    warn.mockRestore()
  })

  test('warns when the setup is resumed after an await', async () => {
    const warn = jest.spyOn(console, 'error').mockImplementation(() => {})
    const $value = createStore('value')

    const Child = defineComponent({
      async setup() {
        await Promise.resolve()
        const value = useUnit($value)
        return () => h('p', value.value)
      },
    })
    const wrapper = mount(
      defineComponent({
        components: {Child},
        template: `<Suspense><Child /></Suspense>`,
      }),
    )
    await flushPromises()

    expect(wrapper.html()).toContain('value')
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('[effector-vue] useUnit:'),
    )
    warn.mockRestore()
  })
})

describe('KeepAlive', () => {
  test('a deactivated component keeps its subscription', async () => {
    const setValue = createEvent<string>()
    const $value = createStore('value').on(setValue, (_, value) => value)
    const scope = fork()

    const Child = defineComponent({
      setup() {
        const value = useUnit($value)
        return () => h('p', value.value)
      },
    })
    const wrapper = mount(
      defineComponent({
        components: {Child},
        data: () => ({shown: true}),
        template: `<KeepAlive><Child v-if="shown" /></KeepAlive>`,
      }),
      {global: {plugins: [EffectorScopePlugin({scope})]}},
    )

    wrapper.vm.shown = false
    await nextTick()

    scopeBind(setValue, {scope})('deactivated')
    wrapper.vm.shown = true
    await nextTick()

    expect(wrapper.html()).toContain('deactivated')
    expect(linksCount(scope)).toBe(1)

    wrapper.unmount()

    expect(linksCount(scope)).toBe(0)
  })
})
