//@flow

import {from} from 'most'
import {createEvent} from '..'

import {argumentHistory, spy} from 'effector/fixtures'

describe('symbol-observable support', () => {
  test('most.from(event) //stream of events', () => {
    expect(() => {
      from(createEvent(''))
    }).not.toThrow()
    const ev1 = createEvent('ev1')
    const ev2 = createEvent('ev2')
    const ev1$ = from(ev1)
    ev1$.observe(spy)
    ev1(0)
    ev1(1)
    ev1(2)
    ev2('should ignore')
    expect(spy).toHaveBeenCalledTimes(3)

    expect(argumentHistory(spy)).toMatchInlineSnapshot(`
      Array [
        0,
        1,
        2,
      ]
    `)
  })
})

test('event.watch(fn)', () => {
  const click = createEvent('click')
  click.watch(spy)
  click()
  click(1)
  click(2)
  expect(spy).toHaveBeenCalledTimes(3)
  expect(argumentHistory(spy)).toMatchInlineSnapshot(`
    Array [
      undefined,
      1,
      2,
    ]
  `)
})

test('event.prepend(fn)', () => {
  const click = createEvent('click')
  const preclick = click.prepend(([n]) => n)
  click.watch(spy)
  preclick([])
  preclick([1])
  preclick([2])

  expect(spy).toHaveBeenCalledTimes(3)
  expect(argumentHistory(spy)).toMatchInlineSnapshot(`
    Array [
      undefined,
      1,
      2,
    ]
  `)
})

test('event.map(fn)', () => {
  const click = createEvent('click')
  const postclick = click.map(n => [n])
  postclick.watch(spy)
  click()
  click(1)
  click(2)
  expect(spy).toHaveBeenCalledTimes(3)
  expect(argumentHistory(spy)).toMatchInlineSnapshot(`
    Array [
      Array [
        undefined,
      ],
      Array [
        1,
      ],
      Array [
        2,
      ],
    ]
  `)
})

test('event.thru(fn)', () => {
  const click = createEvent('click')
  const postclick = click.thru(event => event)
  expect(postclick).toBe(click)
})
