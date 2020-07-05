import {createEvent, type Event} from 'effector'
import {argumentHistory} from 'effector/fixtures'
import {show} from 'effector/fixtures/showstep'

describe('event.filterMap', () => {
  test('event.filterMap should infer type', () => {
    const fn = jest.fn()
    const num: Event<number | '-1'> = createEvent()

    const evenNum = num.filterMap(n => {
      if (n !== '-1') return n
    })

    evenNum.watch(e => fn(e))

    num(0)
    num('-1')
    num(2)
    num('-1')
    num(4)
    ;(evenNum: Event<number>) //Should not fail

    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        0,
        2,
        4,
      ]
    `)
  })

  test('event.filterMap should drop undefined values', () => {
    const fn = jest.fn()
    const num: Event<number> = createEvent()
    const evenNum = num.filterMap(n => {
      if (n % 2 === 0) return n * 2
    })

    evenNum.watch(e => fn(e))

    num(0)
    num(1)
    num(2)
    num(3)
    num(4)

    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        0,
        4,
        8,
      ]
    `)

    //$todo
    expect(show(num.graphite)).toMatchSnapshot('num event graph')
    //$todo
    expect(show(evenNum.graphite)).toMatchSnapshot('evenNum event graph')
  })
})
