/* eslint-disable react-hooks/rules-of-hooks */
import {shallowMount} from 'vue-test-utils-next'
import {
  useStore,
  useVModel,
  useGate,
  createGate,
} from 'effector-vue/composition'
import {reactive, ref, nextTick} from 'vue-next'
import {allSettled, createEvent, createStore, fork} from 'effector'

jest.mock('vue', () => require('vue-next'))

it('plain gate', async () => {
  const Gate = createGate()
  expect(Gate.status.getState()).toBeFalsy()
  const wrapper = shallowMount({
    template: `<div></div>`,
    setup() {
      useGate(Gate)
    },
  })
  expect(Gate.status.getState()).toBeTruthy()
  wrapper.unmount()
  expect(Gate.status.getState()).toBeFalsy()
})

it('close event should be called without arguments to Gate', async () => {
  const spyClose = jest.fn()

  const Gate = createGate()

  Gate.close.watch(spyClose);

  const wrapper = shallowMount({
    template: `<div></div>`,
    setup() {
      useGate(Gate)
    },
  })

  wrapper.unmount()

  expect(spyClose).toHaveBeenCalled()
})

test('works without babel plugin', () => {
  const Gate3 = {_: createGate}._({name: 'name', defaultState: {state: 1}})
  const Gate4 = {_: createGate}._({
    name: 'name',
    defaultState: {state: 1},
    sid: 'custom-sid',
  })

  expect(Gate3.state.shortName).toMatchInlineSnapshot(`"name.state"`)
  expect(Gate3.state.getState()).toEqual({state: 1})

  expect(Gate4.state.shortName).toMatchInlineSnapshot(`"name.state"`)
  expect(Gate4.state.sid).toMatchInlineSnapshot(`"custom-sid"`)
})

it('gate with props', () => {
  const Gate = createGate({
    defaultState: {
      meet: 'Hello world',
    },
  })

  expect(Gate.state.getState()).toEqual({
    meet: 'Hello world',
  })

  const wrapper = shallowMount({
    template: `<div></div>`,
    setup() {
      useGate(Gate, () => ({
        meet: 'Hello Vue Gate',
      }))
    },
  })

  expect(Gate.state.getState()).toEqual({
    meet: 'Hello Vue Gate',
  })
  wrapper.unmount()
  expect(Gate.state.getState()).toEqual({
    meet: 'Hello world',
  })
})

it('update props to gate from [ref]', async () => {
  const Gate = createGate({
    defaultState: {
      meet: 'Hello world',
    },
  })

  const wrapper = shallowMount({
    template: `
      <button @click="handleClick">Click</button>
    `,
    setup() {
      const meet = ref('Hello Vue Gate')
      const handleClick = () => (meet.value = 'Hello effector')
      useGate(Gate, () => ({meet: meet.value}))
      return {handleClick}
    },
  })

  expect(Gate.state.getState()).toEqual({
    meet: 'Hello Vue Gate',
  })

  await wrapper.find('button').trigger('click')

  expect(Gate.state.getState()).toEqual({
    meet: 'Hello effector',
  })
})

it('update props to gate from [reactive]', async () => {
  const Gate = createGate({
    defaultState: {
      meet: 'Hello world',
    },
  })

  const wrapper = shallowMount({
    template: `
      <button @click="handleClick">Click</button>
    `,
    setup() {
      const obj = reactive({
        meet: 'Hello Vue Gate',
      })
      const handleClick = () => (obj.meet = 'Hello effector')
      useGate(Gate, () => obj)
      return {handleClick}
    },
  })

  expect(Gate.state.getState()).toEqual({
    meet: 'Hello Vue Gate',
  })

  await wrapper.find('button').trigger('click')

  expect(Gate.state.getState()).toEqual({
    meet: 'Hello effector',
  })
})

it('works with effector store', async () => {
  const Gate = createGate()
  const $user = createStore('John Doe')
  const updated = createEvent()
  $user.on(updated, () => 'Alan Doe')

  const wrapper = shallowMount({
    template: `
      <div>
        <button @click="updated">Click</button>
      </div>
    `,
    setup() {
      const user = useStore($user)
      useGate(Gate, () => user)
      return {
        updated,
      }
    },
  })

  expect(Gate.state.getState()).toBe('John Doe')
  await wrapper.find('button').trigger('click')
  expect(Gate.state.getState()).toBe('Alan Doe')
})

it('gate used before useStore hook', async () => {
  const Gate = createGate()
  const $loading = createStore(false).on(Gate.open, () => true)

  const wrapper = shallowMount({
    template: `
      <div>
        {{loading}}
      </div>
    `,
    setup() {
      useGate(Gate)
      const loading = useStore($loading)

      return {
        loading,
      }
    },
  })

  await nextTick()
  expect(wrapper.vm.$el.innerHTML).toBeTruthy()
})

it('gate used before useStore hook', async () => {
  const Gate = createGate()
  const $isEnabled = createStore(false).on(Gate.open, () => true)

  const wrapper = shallowMount({
    template: `
      <div>
        <input
          type="checkbox"
          v-model="isEnabled"
          data-test="checkbox"
        >
      </div>
    `,
    setup() {
      useGate(Gate)
      const isEnabled = useVModel($isEnabled)

      return {
        isEnabled,
      }
    },
  })

  await nextTick()
  // @ts-ignore
  expect(wrapper.find('[data-test="checkbox"]').element.checked).toBeTruthy()
})

it('State should be updated if open event triggered manually', async () => {
  const Gate = createGate({defaultState: 'empty'})
  const scope = fork()

  await allSettled(Gate.open, {scope, params: 'data'})

  expect(scope.getState(Gate.state)).toBe('data')
})
