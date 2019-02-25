//@flow

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
  const watcher = I.watch(result => {
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
})
