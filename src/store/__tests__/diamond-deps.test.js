//@flow

import {createEvent} from 'effector/event'
import {createStore} from '..'
import {combine} from '../../effector'

describe('diamonds', () => {

  test('synthetic', () => {
    const fn = jest.fn()
    const trigger = createEvent('trigger')
    const nodeA = createStore(1).on(trigger, x => x + 1)
    const nodeB = nodeA.map(x => x + 1)
    const nodeC = nodeB.map(x => x + 1)
    const nodeD = nodeA.map(x => x + 1)
    const nodeE = combine(nodeC, nodeD, (c, d) => c + d)
    nodeE.watch(x => fn(x))
    trigger()
    expect(fn.mock.calls).toEqual([[5], [7]])
  })

  test('display name', () => {
    const updateFirstName = createEvent()

    const firstName = createStore('John').on(updateFirstName, (_, name) => name)
    const lastName = createStore('Doe')

    const isFirstNameShortMap = jest.fn(v => v.length < 10)
    const IsFirstNameShort = firstName.map(isFirstNameShortMap)

    const fullNameMap = jest.fn((fn, ln) => [fn, ln].join(' '))
    const fullName = combine(firstName, lastName, fullNameMap)

    const displayNameMap = jest.fn((firstName, isFirstNameShort, fullName) =>
      isFirstNameShort ? fullName : firstName,
    )
    const displayName = combine(
      firstName,
      IsFirstNameShort,
      fullName,
      displayNameMap,
    )

    const view = jest.fn()
    displayName.watch(view)

    expect(isFirstNameShortMap.mock.calls.length).toBe(1)
    expect(fullNameMap.mock.calls.length).toBe(1)
    expect(displayNameMap.mock.calls.length).toBe(1)
    expect(view.mock.calls.length).toBe(1)

    updateFirstName('Joseph')
    expect(displayName.getState()).toBe('Joseph Doe')
    expect(isFirstNameShortMap.mock.calls.length).toBe(2)
    expect(fullNameMap.mock.calls.length).toBe(2)
    expect(displayNameMap.mock.calls.length).toBe(2)
    expect(view.mock.calls.length).toBe(2)

    updateFirstName('Jooooooooooooooseph')
    expect(displayName.getState()).toBe('Jooooooooooooooseph')
    expect(isFirstNameShortMap.mock.calls.length).toBe(3)
    expect(fullNameMap.mock.calls.length).toBe(3)
    expect(displayNameMap.mock.calls.length).toBe(3)
    expect(view.mock.calls.length).toBe(3)
  })
})
