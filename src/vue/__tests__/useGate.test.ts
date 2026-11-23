/* eslint-disable react-hooks/rules-of-hooks */
import {flushPromises, mount} from 'vue-test-utils-next'
import {
  EffectorScopePlugin,
  createGate,
  useGate,
} from 'effector-vue/composition'
import {
  Suspense,
  createApp,
  defineComponent,
  h,
  nextTick,
  reactive,
  ref,
} from 'vue-next'
import {fork} from 'effector'

import {mountSetup, withEffectScope} from './helpers'

jest.mock('vue', () => require('vue-next'))

describe('scope', () => {
  test('opens the gate in the scope of the plugin', () => {
    const Gate = createGate<{id: number}>()
    const scope = fork()

    const {unmount} = mountSetup(
      () => useGate(Gate, {id: 1}),
      [EffectorScopePlugin({scope})],
    )

    expect(scope.getState(Gate.status)).toBe(true)
    expect(scope.getState(Gate.state)).toEqual({id: 1})
    expect(Gate.status.getState()).toBe(false)

    unmount()

    expect(scope.getState(Gate.status)).toBe(false)
  })

  test('opens the gate in the scope of the options', () => {
    const Gate = createGate<{id: number}>()
    const scope = fork()

    mountSetup(() => useGate(Gate, {id: 1}, {scope}))

    expect(scope.getState(Gate.status)).toBe(true)
    expect(Gate.status.getState()).toBe(false)
  })

  test('closes the gate in the scope it was opened in', () => {
    const Gate = createGate<{id: number}>()
    const scope = fork()

    const {unmount} = mountSetup(() => useGate(Gate, {id: 1}, {scope}))
    unmount()

    expect(scope.getState(Gate.status)).toBe(false)
    expect(scope.getState(Gate.state)).toBe(null)
    /** The units outside the scope keep their initial values. */
    expect(Gate.status.getState()).toBe(false)
    expect(Gate.state.getState()).toBe(null)
  })
})

describe('order of the events', () => {
  test('fires open before set', () => {
    const Gate = createGate<{id: number}>()
    const calls: string[] = []
    Gate.open.watch(() => calls.push('open'))
    Gate.set.watch(() => calls.push('set'))

    mountSetup(() => useGate(Gate, {id: 1}))

    /** The `set` here is the one `open` samples into, not a separate call. */
    expect(calls).toEqual(['open', 'set'])
    expect(Gate.state.getState()).toEqual({id: 1})
  })

  test('does not set the props before the gate is open', async () => {
    const Gate = createGate<{id: number}>()
    const calls: string[] = []
    Gate.open.watch(() => calls.push('open'))
    Gate.set.watch(() => calls.push('set'))
    const props = ref({id: 1})

    let release!: () => void
    const mounted = new Promise<void>(resolve => (release = resolve))
    const Child = defineComponent({
      async setup() {
        useGate(Gate, props)
        await mounted
        return () => h('div')
      },
    })
    const app = createApp({
      render: () => h(Suspense, null, {default: () => h(Child)}),
    })
    app.mount(document.createElement('div'))

    /** The props change while the async setup still waits for its data. */
    props.value = {id: 2}
    await nextTick()
    release()
    await flushPromises()

    expect(calls).toEqual(['open', 'set'])
    expect(Gate.state.getState()).toEqual({id: 2})
  })
})

describe('props', () => {
  test('accepts a plain value', () => {
    const Gate = createGate<{id: number}>()

    mountSetup(() => useGate(Gate, {id: 1}))

    expect(Gate.state.getState()).toEqual({id: 1})
  })

  test('accepts a ref', async () => {
    const Gate = createGate<{id: number}>()
    const props = ref({id: 1})

    mountSetup(() => useGate(Gate, props))

    expect(Gate.state.getState()).toEqual({id: 1})

    props.value = {id: 2}
    await nextTick()

    expect(Gate.state.getState()).toEqual({id: 2})
  })

  test('accepts a getter', async () => {
    const Gate = createGate<{id: number}>()
    const id = ref(1)

    mountSetup(() => useGate(Gate, () => ({id: id.value})))

    expect(Gate.state.getState()).toEqual({id: 1})

    id.value = 2
    await nextTick()

    expect(Gate.state.getState()).toEqual({id: 2})
  })

  test('accepts a reactive object', async () => {
    const Gate = createGate<{id: number}>()
    const props = reactive({id: 1})

    mountSetup(() => useGate(Gate, props))

    expect(Gate.state.getState()).toEqual({id: 1})

    props.id = 2
    await nextTick()

    expect(Gate.state.getState()).toEqual({id: 2})
  })

  test('closes the gate with the props it has at that moment', async () => {
    const Gate = createGate<{id: number}>()
    const id = ref(1)
    const closed = jest.fn()
    Gate.close.watch(closed)

    const {unmount} = mountSetup(() => useGate(Gate, () => ({id: id.value})))

    id.value = 2
    await nextTick()
    unmount()

    expect(closed).toHaveBeenCalledWith({id: 2})
  })

  test('puts a plain copy of the props into the store', () => {
    const Gate = createGate<{id: number}>()
    const props = reactive({id: 1})

    mountSetup(() => useGate(Gate, props))

    const state = Gate.state.getState()
    expect(state).toEqual({id: 1})
    expect(state).not.toBe(props)

    props.id = 2

    expect(state).toEqual({id: 1})
  })
})

describe('effect scope', () => {
  test('opens the gate without a component and closes it on stop', () => {
    const Gate = createGate<{id: number}>()
    const scope = fork()

    const {stop} = withEffectScope(
      () => useGate(Gate, {id: 1}),
      app => app.use(EffectorScopePlugin({scope})),
    )

    expect(scope.getState(Gate.status)).toBe(true)
    expect(scope.getState(Gate.state)).toEqual({id: 1})

    stop()

    expect(scope.getState(Gate.status)).toBe(false)
  })
})

describe('cleanup', () => {
  test('closes nested gates parent first, the order the scopes stop in', async () => {
    const Outer = createGate({name: 'outer'})
    const Inner = createGate({name: 'inner'})
    const closed: string[] = []
    Outer.close.watch(() => closed.push('outer'))
    Inner.close.watch(() => closed.push('inner'))

    const Child = defineComponent({
      setup() {
        useGate(Inner)
        return () => h('div')
      },
    })
    const wrapper = mount(
      defineComponent({
        setup() {
          useGate(Outer)
          return () => h(Child)
        },
      }),
    )
    await nextTick()
    wrapper.unmount()

    expect(closed).toEqual(['outer', 'inner'])
  })

  test('does not close a gate the component never opened', async () => {
    const Gate = createGate<{id: number}>()
    const closed = jest.fn()
    Gate.close.watch(closed)

    /** An async setup whose data never arrives: the branch is dropped unmounted. */
    const Child = defineComponent({
      async setup() {
        useGate(Gate, {id: 1})
        await new Promise(() => {})
        return () => h('div')
      },
    })
    const app = createApp({
      render: () => h(Suspense, null, {default: () => h(Child)}),
    })
    app.mount(document.createElement('div'))
    await nextTick()
    app.unmount()

    expect(Gate.status.getState()).toBe(false)
    expect(closed).not.toHaveBeenCalled()
  })
})

describe('KeepAlive', () => {
  test('closes the gate on unmount, not on deactivation', async () => {
    const Gate = createGate()
    const scope = fork()
    const opened = jest.fn()
    Gate.open.watch(opened)

    const Child = {
      template: `<div />`,
      setup() {
        useGate(Gate)
      },
    }
    const wrapper = mount(
      {
        components: {Child},
        props: {shown: {type: Boolean, default: true}},
        template: `<KeepAlive><Child v-if="shown" /></KeepAlive>`,
      },
      {global: {plugins: [EffectorScopePlugin({scope})]}},
    )

    expect(scope.getState(Gate.status)).toBe(true)

    await wrapper.setProps({shown: false})

    /** Deactivation keeps the effect scope of the component alive. */
    expect(scope.getState(Gate.status)).toBe(true)

    await wrapper.setProps({shown: true})

    /** Reactivation does not open the gate a second time. */
    expect(opened).toHaveBeenCalledTimes(1)
    expect(scope.getState(Gate.status)).toBe(true)

    wrapper.unmount()

    expect(scope.getState(Gate.status)).toBe(false)
  })
})
