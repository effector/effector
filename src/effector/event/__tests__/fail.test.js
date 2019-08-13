// @flow

import {createEvent, is} from 'effector'
import {argumentHistory, delay} from 'effector/fixtures'

test('watcher.fail is event', () => {
  const foo = createEvent('foo')
  const sub = foo.watch(() => {})
  //$todo
  expect(is.event(sub.fail)).toBe(true)
})

it('triggers after failed .watch', () => {
  const fn = jest.fn()
  const foo = createEvent()
  const sub = foo.watch(() => {
    throw new Error('Unknown error')
  })
  //$todo
  sub.fail.watch(e => fn(e))

  expect(fn).not.toBeCalled()
  foo('bar')
  expect(fn).toBeCalledTimes(1)
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          Object {
            "error": [Error: Unknown error],
            "params": "bar",
          },
        ]
    `)
})

it('triggers after failed async .watch', async () => {
  const fn = jest.fn()
  const foo = createEvent()
  const sub = foo.watch(async () => {
    throw new Error('Unknown error')
  })
  //$todo
  sub.fail.watch(e => {
    fn(e)
  })

  expect(fn).not.toBeCalled()
  foo('bar')
  await delay(500)
  expect(fn).toBeCalledTimes(1)
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          Object {
            "error": [Error: Unknown error],
            "params": "bar",
          },
        ]
    `)
})

it('triggers after successful async .watch', async () => {
  const fn = jest.fn()
  const foo = createEvent()
  const sub = foo.watch(async () => {
    return Promise.resolve(200)
  })
  //$todo
  sub.done.watch(e => {
    fn(e)
  })

  expect(fn).not.toBeCalled()
  foo('bar')
  await delay(500)
  expect(fn).toBeCalledTimes(1)
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
        Array [
          Object {
            "params": "bar",
            "result": 200,
          },
        ]
    `)
})
