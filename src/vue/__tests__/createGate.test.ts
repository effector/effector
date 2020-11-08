/* eslint-disable react-hooks/rules-of-hooks */
import {shallowMount} from 'vue-test-utils-next'
import {useStore, useGate, createGate} from 'effector-vue/composition'
import {reactive, ref} from 'vue-next'
import {createEvent, createStore} from 'effector'

jest.mock('vue', () => require('vue-next'))

it('plain gate', async () => {
  const Gate = createGate()
  expect(Gate.status.getState()).toBeFalsy()
  const wrapper = shallowMount({
    template: `<div></div>`,
    setup() {
      useGate(Gate)
    }
  })
  expect(Gate.status.getState()).toBeTruthy()
  wrapper.unmount()
  expect(Gate.status.getState()).toBeFalsy()
})

it('gate with props', () => {
  const Gate = createGate({
    defaultState: {
      meet: 'Hello world'
    }
  })

  expect(Gate.state.getState()).toEqual({
    meet: 'Hello world'
  })

  const wrapper = shallowMount({
    template: `<div></div>`,
    setup() {
      useGate(Gate, () => ({
        meet: 'Hello Vue Gate'
      }))
    }
  })

  expect(Gate.state.getState()).toEqual({
    meet: 'Hello Vue Gate'
  })
  wrapper.unmount()
  expect(Gate.state.getState()).toEqual({
    meet: 'Hello world'
  })
})

it('update props to gate from [ref]', async () => {
  const Gate = createGate({
    defaultState: {
      meet: 'Hello world'
    }
  })

  const wrapper = shallowMount({
    template: `
      <button @click="handleClick">Click</button>
    `,
    setup() {
      const meet = ref('Hello Vue Gate')
      const handleClick = () => meet.value = 'Hello effector'
      useGate(Gate, () => ({meet: meet.value}))
      return {handleClick}
    }
  })

  expect(Gate.state.getState()).toEqual({
    meet: 'Hello Vue Gate'
  })

  await wrapper.find('button').trigger('click')

  expect(Gate.state.getState()).toEqual({
    meet: 'Hello effector'
  })
})

it('update props to gate from [reactive]', async () => {
  const Gate = createGate({
    defaultState: {
      meet: 'Hello world'
    }
  })

  const wrapper = shallowMount({
    template: `
      <button @click="handleClick">Click</button>
    `,
    setup() {
      const obj = reactive({
        meet: 'Hello Vue Gate'
      })
      const handleClick = () => obj.meet = 'Hello effector'
      useGate(Gate, () => obj)
      return {handleClick}
    }
  })

  expect(Gate.state.getState()).toEqual({
    meet: 'Hello Vue Gate'
  })

  await wrapper.find('button').trigger('click')

  expect(Gate.state.getState()).toEqual({
    meet: 'Hello effector'
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
    }
  })

  expect(Gate.state.getState()).toBe('John Doe')
  await wrapper.find('button').trigger('click')
  expect(Gate.state.getState()).toBe('Alan Doe')
})