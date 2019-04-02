//@flow
import * as fs from 'fs-extra'
import {resolve} from 'path'
import {createEvent, forward} from 'effector/event'
import {createStore} from '..'
import {combine} from '../../effector'

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
    console.log(result)
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

  const path = resolve(__dirname, '../../..', 'tools/viz/src', 'out.json')
  await fs.outputJSON(path, A.graphite.seq, {spaces: 2})
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
  console.log(displayNameMap.mock.calls)
  expect(displayNameMap.mock.calls.length).toBe(2)
  expect(view.mock.calls.length).toBe(2)

  updateFirstName('Jooooooooooooooseph')
  console.log('displayNameMap.mock.calls')
  console.table(
    displayNameMap.mock.calls.map(
      ([firstName, isFirstNameShort, fullName]) => ({
        firstName,
        isFirstNameShort,
        fullName,
      }),
    ),
  )
  expect(displayName.getState()).toBe('Jooooooooooooooseph')
  expect(isFirstNameShortMap.mock.calls.length).toBe(3)
  expect(fullNameMap.mock.calls.length).toBe(3)
  expect(displayNameMap.mock.calls.length).toBe(3)
  expect(view.mock.calls.length).toBe(3)
})
