// @flow

import {createEvent, is} from 'effector'
import {argumentHistory} from 'effector/fixtures'

test('watcher.fail is event', () => {
  const foo = createEvent('foo')
  const sub = foo.watch(() => {})
  expect(is.event(sub.fail)).toBe(true)
})

it('triggers after failed .watch', () => {
  const fn = jest.fn()
  const foo = createEvent()
  const sub = foo.watch(() => {
    throw new Error('Unknown error')
  })
  sub.fail.watch(e => fn(e))

  expect(fn).not.toBeCalled()
  foo()
  expect(fn).toBeCalledTimes(1)
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          Object {
            "error": [Error: Unknown error],
          },
        ]
    `)
})
