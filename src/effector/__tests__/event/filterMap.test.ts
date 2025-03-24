import {createEvent} from 'effector'
import {argumentHistory} from 'effector/fixtures'
//@ts-expect-error
import {show} from 'effector/fixtures/showstep'

describe('event.filterMap', () => {
  test('event.filterMap should infer type', () => {
    const fn = jest.fn()
    const num = createEvent<number | '-1'>()

    const evenNum = num.filterMap(n => {
      if (n !== '-1') return n
    })

    evenNum.watch(e => fn(e))

    num(0)
    num('-1')
    num(2)
    num('-1')
    num(4)

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
    const num = createEvent<number>()
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

    //@ts-expect-error
    expect(show(num.graphite)).toMatchSnapshot('num event graph')
    //@ts-expect-error
    expect(show(evenNum.graphite)).toMatchSnapshot('evenNum event graph')
  })
})
