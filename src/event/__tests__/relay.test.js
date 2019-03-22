//@flow

import {createEvent, relay, relayShape} from 'effector/event'

test.skip('relay', () => {
  const fnA = jest.fn()
  const fnB = jest.fn()
  const fnC = jest.fn()
  const a = createEvent<string>('a')
  const b = createEvent<string>('b')
  const c = createEvent<string>('c')

  a.watch(e => fnA(e))
  b.watch(e => fnB(e))
  c.watch(e => fnC(e))

  const source = createEvent<{names: string[], message: string}>('source')

  const q1 = relay(source, ({names, message}) => ({
    arg: message,
    list: [a, b, c].filter(e => names.includes(e.shortName)),
  }))

  source({
    message: 'first',
    names: ['a', 'b'],
  })
  source({
    message: 'second',
    names: ['b', 'c'],
  })
  source({
    message: 'third',
    names: [],
  })
  q1()
  source({
    message: 'fourth',
    names: ['a', 'b', 'c'],
  })

  expect(fnA.mock.calls).toEqual([['first']])
  expect(fnB.mock.calls).toEqual([['first'], ['second']])
  expect(fnC.mock.calls).toEqual([['second']])
})

test.skip('relayShape', () => {
  const fnA = jest.fn()
  const fnB = jest.fn()
  const fnC = jest.fn()
  const a = createEvent<string>('a')
  const b = createEvent<{+field: string}>('b')

  const source = createEvent<{toB: boolean, data: string}>('source')

  a.watch(e => fnA(e))
  b.watch(e => fnB(e))

  const q1 = relayShape({
    from: source,
    shape: {left: a, right: b},
    query(val) {
      fnC(val)
      const {toB, data} = val
      if (toB)
        return {
          left: data,
          right: {field: data},
        }
      return {
        left: data,
      }
    },
  })

  source({data: 'first', toB: false})
  source({data: 'second', toB: true})
  q1()
  source({data: 'third', toB: false})

  // expect(fnC.mock.calls).toEqual([[]])
  console.log('fnA', ...fnA.mock.calls)
  console.log('fnB', ...fnB.mock.calls)
  console.log('fnC', ...fnC.mock.calls)
  expect(fnA.mock.calls).toEqual([['first'], ['second']])
  expect(fnB.mock.calls).toEqual([[{field: 'second'}]])
})
