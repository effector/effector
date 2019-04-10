//@flow

import {createEvent, createStore} from 'effector'

it.skip('should not call one watcher twice during a walk', () => {
  const fn = jest.fn()
  const e1 = createEvent('e1')
  const e2 = e1.map(() => 'e2')
  const st1 = createStore('str')
    .on(e1, (_, x) => x)
    .on(e2, (_, x) => x)

  st1.watch(x => {
    console.warn('st1', x)
    fn(x)
  })
  e1('first call')
  e1('second call')
  expect(fn).toBeCalledTimes(3)
})

it('should avoid data races', () => {
  const fnIdx = jest.fn()
  const routePush = createEvent()

  const history = createStore([]).on(routePush, (state, route) => {
    console.log('history.on routePush; history = ', state)
    return [...state, route]
  })
  const currentIdx = createStore(-2).on(routePush, () => {
    console.log('currentIdx.on routePush; history = ', history.getState())
    return history.getState().length - 1
  })

  history.watch(e => console.log('history', e))
  currentIdx.watch(e => {
    console.log('currentIdx', e)
    fnIdx(e)
  })

  routePush('v 1')
  routePush('v 2')
  expect(fnIdx.mock.calls).toEqual([[-2], [0], [1]])
})
