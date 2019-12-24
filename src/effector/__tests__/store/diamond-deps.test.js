//@flow

import {createStore, createEvent, forward, combine} from 'effector'
import {argumentHistory} from 'effector/fixtures'

test('diamonds', async() => {
  const fn = jest.fn()
  const trigger = createEvent('trigger')
  const nodeA = createStore(1).on(trigger, x => x + 1)
  const nodeB = nodeA.map(x => x + 1)
  const nodeC = nodeB.map(x => x + 1)
  const nodeD = nodeA.map(x => x + 1)
  const nodeE = combine(nodeC, nodeD, (c, d) => [c, d])
  nodeE.watch(x => fn(x))
  trigger()
  expect(fn.mock.calls).toEqual([[[3, 2]], [[4, 3]]])
})
/*

                     ┌────┐
                     │ A  │──────────┐
                     └────┘          ▼
                                  ┌────┐
                        ┌─────────│ B  │──────┐
                        │         └────┘      │
in case, when event     │                     ▼
trigger certain         │                  ┌────┐
separate branches       │                  │ C  │
with different amount   │                  └────┘
of steps, there         │                     │
should be no            ▼                     ▼
intermediate steps   ┌────┐                ┌────┐
with partially       │ F  │                │ D  │
updated branches     └────┘                └────┘
                        │                     │
                        ▼                     ▼
                     ┌────┐                ┌────┐
                     │ G  │                │ E  │
                     └────┘                └────┘
                        │       ┌────┐        │
                        └──────▶│ H  │◀───────┘
                                └────┘
                                   │
                                   ▼
                                ┌────┐
                                │ I  │
                                └────┘


wonder why it called "olympic"?

   C   D   E
     F   G

*/
test('olympic', async() => {
  const fn = jest.fn()
  const A = createEvent('A')
  const B = createStore('text')
  const C = B.map(text => text.length)
  const D = C.map(ln => ({isEmpty: ln === 0, ln}))
  const E = D.map(
    ({isEmpty, ln}) => `length: ${ln} empty: ${isEmpty.toString()}`,
  )
  const F = B.map(text => text.trim())
  const G = F.map(text => `text: "${text}"`)
  const H = combine(G, E, (text, stats) => `${text} ${stats}`)
  const I = H.map(result => result)
  I.watch(result => {
    fn(result)
  })
  forward({
    from: A,
    to: B,
  })
  A('word')
  A('')
  A(' ')
  A('end')

  expect(fn.mock.calls).toEqual([
    ['text: "text" length: 4 empty: false'],
    ['text: "word" length: 4 empty: false'],
    ['text: "" length: 0 empty: true'],
    ['text: "" length: 1 empty: false'],
    ['text: "end" length: 3 empty: false'],
  ])
})

test('display name', () => {
  const isFirstNameShortMap = jest.fn()
  const fullNameMap = jest.fn()
  const displayNameMap = jest.fn()
  const view = jest.fn()

  /*
    Short description: `displayName = isFirstNameShort ? fullName : firstName`
    `isFirstNameShort` and `fullName` depends by `firstName`
    so `displayName` has three depends from `firstName`
    and in "classic" EE `displayName` must updates
    three times (what unnecessary) if `firstName` was updated
  */
  const updateFirstName = createEvent()

  const firstName = createStore('John').on(updateFirstName, (_, name) => name)
  const lastName = createStore('Doe')

  const IsFirstNameShort = firstName.map(v => {
    isFirstNameShortMap(v)
    return v.length < 10
  })

  const fullName = combine(firstName, lastName, (fn, ln) => {
    fullNameMap(fn, ln)

    return `${fn} ${ln}`
  })

  const displayName = combine(
    firstName,
    IsFirstNameShort,
    fullName,
    (firstName, isFirstNameShort, fullName) => {
      displayNameMap(firstName, isFirstNameShort, fullName)
      return isFirstNameShort ? fullName : firstName
    },
  )

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

test('combine edge case', () => {
  const fn = jest.fn()
  const event = createEvent()
  const eA = createStore(0).on(event, s => s + 1)
  //prettier-ignore
  const combined = combine([
    eA,
    combine([
      eA.map(d => d + 1)
    ])
  ])
  combined.watch(e => fn(e))
  event()
  expect(argumentHistory(fn)).toEqual([
    [0, [1]],
    [1, [2]],
  ])
})
