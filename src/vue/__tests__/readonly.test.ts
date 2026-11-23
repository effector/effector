/* eslint-disable react-hooks/rules-of-hooks */
import {createEvent, createStore, fork} from 'effector'
import {EffectorScopePlugin, useStore, useUnit} from 'effector-vue/composition'
import {isProxy, isReadonly, isShallow, readonly, shallowRef} from 'vue-next'

import {withSetup} from './helpers'

jest.mock('vue', () => require('vue-next'))

class Account {
  #balance: number

  constructor(balance: number) {
    this.#balance = balance
  }

  get balance() {
    return this.#balance
  }
}

describe('the exposed value is the state itself', () => {
  const states: Array<[string, any]> = [
    ['plain object', {user: {name: 'alice'}}],
    ['array', [{id: 1}]],
    ['Map', new Map([['id', {value: 1}]])],
    ['class instance with a private field', new Account(100)],
    ['Date', new Date('2020-02-02')],
  ]

  test.each(states)('%s', (_name, state) => {
    const $state = createStore(state)
    const scope = fork()

    const single = withSetup(() => useUnit($state), [
      EffectorScopePlugin({scope}),
    ])
    const [inList] = withSetup(() => useUnit([$state]), [
      EffectorScopePlugin({scope}),
    ])
    const {inShape} = withSetup(() => useUnit({inShape: $state}), [
      EffectorScopePlugin({scope}),
    ])
    const legacy = withSetup(() => useStore($state), [
      EffectorScopePlugin({scope}),
    ])

    expect(single.value).toBe(scope.getState($state))
    expect(inList.value).toBe(scope.getState($state))
    expect(inShape.value).toBe(scope.getState($state))
    expect(legacy.value).toBe(scope.getState($state))
  })

  test('a private field is still readable through the getter', () => {
    const $account = createStore(new Account(100))
    const scope = fork()

    const account = withSetup(() => useUnit($account), [
      EffectorScopePlugin({scope}),
    ])

    expect(account.value.balance).toBe(100)
  })

  test('a deep readonly ref would have handed out a proxy instead', () => {
    const state = {user: {name: 'alice'}}
    const deep = readonly(shallowRef(state))

    expect(deep.value).not.toBe(state)
    expect(isProxy(deep.value)).toBe(true)
  })
})

describe('the exposed ref is still readonly', () => {
  test('a write to .value warns and leaves the ref alone', () => {
    const $count = createStore(0)
    const scope = fork()
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})

    const count = withSetup(() => useUnit($count), [
      EffectorScopePlugin({scope}),
    ])
    ;(count as any).value = 1

    expect(count.value).toBe(0)
    expect(warn.mock.calls[0][0]).toContain('target is readonly')

    warn.mockRestore()
  })

  test('the ref is readonly and shallow', () => {
    const $state = createStore({user: {name: 'alice'}})
    const scope = fork()

    const state = withSetup(() => useUnit($state), [
      EffectorScopePlugin({scope}),
    ])

    expect(isReadonly(state)).toBe(true)
    expect(isShallow(state)).toBe(true)
  })
})

test('an event called with the value does not put a proxy into the store', () => {
  const $source = createStore({name: 'alice'})
  const send = createEvent<{name: string}>()
  const $received = createStore<{name: string} | null>(null).on(
    send,
    (_, payload) => payload,
  )
  const scope = fork()

  const shape = withSetup(() => useUnit({source: $source, send}), [
    EffectorScopePlugin({scope}),
  ])
  shape.send(shape.source.value)

  expect(scope.getState($received)).toBe(scope.getState($source))
  expect(isProxy(scope.getState($received))).toBe(false)
})
