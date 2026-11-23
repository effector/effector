import {createEffect, createEvent, sample, Effect} from 'effector'

const typecheck = '{global}'
type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
    ? true
    : false
const exact = <T extends true>() => {}

test('inline target return types retain handler inference', () => {
  const clock = createEvent<void>()
  const numbers = createEvent<number>()
  const a = sample({clock, target: [createEffect(() => {})]})
  const b = sample({
    clock: numbers,
    target: [createEffect(async (value: number) => String(value))],
  })
  const c = sample({
    source: numbers,
    target: [createEffect((value: number) => String(value))],
  })
  const d = sample({
    clock: numbers,
    fn: value => String(value),
    target: [createEffect((value: string) => value.length)],
  })
  exact<Equal<typeof a, readonly [Effect<void, void, Error>]>>()
  exact<Equal<typeof b, readonly [Effect<number, string, Error>]>>()
  exact<Equal<typeof c, readonly [Effect<number, string, Error>]>>()
  exact<Equal<typeof d, readonly [Effect<string, number, Error>]>>()
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
