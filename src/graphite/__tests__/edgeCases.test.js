//@flow

import {forward, createEvent, createStore} from 'effector'

it('should not call one watcher twice during a walk', () => {
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
