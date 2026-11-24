import {createEvent, createStore, sample} from 'effector'
const typecheck = '{global}'

test('remaining native diagnostic families', () => {
  const number = createEvent<number>()
  const text = createEvent<string>()
  const state = createStore({value: 1})
  function invalid() {
    //@ts-expect-error
    sample({
      clock: number,
      source: state,
      fn: (value: string) => value,
      target: text,
    })
    //@ts-expect-error
    sample({clock: number, source: state, fn: () => 'wrong', target: number})
    //@ts-expect-error
    sample({clock: number, source: state, target: text})
    //@ts-expect-error
    sample({clock: number, target: text})
    //@ts-expect-error
    sample({clock: number, target: number.map(value => value)})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Unmarked error at test line 9 'fn: (value: string) => value,'
    lack of expected error at test line 6 'sample({'
    Type '(value: string) => string' is not assignable to type '(src: { value: number; }, clk: number) => any'.
      Types of parameters 'value' and 'src' are incompatible.
        Type '{ value: number; }' is not assignable to type 'string'.
    Type 'string' is not assignable to type 'number'.
    Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
      Types of property '__' are incompatible.
        Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<string>' is not assignable to type 'Unit<{ value: number; }>'.
      Types of property '__' are incompatible.
        Type 'string' is not assignable to type '{ value: number; }'.
    Type 'EventCallable<number>' is not assignable to type 'Unit<string>'.
      Types of property '__' are incompatible.
        Type 'number' is not assignable to type 'string'.
    Type 'EventCallable<string>' is not assignable to type 'UnitTargetable<number>'.
      Types of property '__' are incompatible.
        Type 'string' is not assignable to type 'number'.
    Type 'Event<number>' is missing the following properties from type 'EventCallable<number>': prepend, targetable
    "
  `)
})
