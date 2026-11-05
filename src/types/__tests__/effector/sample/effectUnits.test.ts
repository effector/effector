/* eslint-disable no-unused-vars */
import {createEffect, createEvent, sample} from 'effector'

const typecheck = '{global}'

test('effects and effect lifecycle events (should pass)', () => {
  const fx = createEffect<number, string, Error>()
  const paramsTarget = createEvent<number>()
  const doneTarget = createEvent<{params: number; result: string}>()
  const failTarget = createEvent<Error>()

  sample({clock: fx, target: paramsTarget})
  sample({clock: fx.done, target: doneTarget})
  sample({clock: fx.failData, target: failTarget})
  sample({clock: paramsTarget, target: fx})

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('incompatible effect params and derived targets (should fail)', () => {
  const trigger = createEvent<{id: string}>()
  const fx = createEffect<{id: number}, void>()
  const derived = trigger.map(({id}) => id)

  function factory() {
    sample({
      //@ts-expect-error
      clock: trigger,
      //@ts-expect-error
      target: fx,
    })
    sample({
      clock: trigger,
      //@ts-expect-error
      fn: ({id}) => id,
      //@ts-expect-error
      target: derived,
    })
  }

  expect(typecheck).toMatchInlineSnapshot(`
    "
    Type 'EventCallable<{ id: string; }>' is not assignable to type 'Unit<{ id: number; }>'.
      The types of '__.id' are incompatible between these types.
        Type 'string' is not assignable to type 'number'.
    Type 'Effect<{ id: number; }, void, Error>' is not assignable to type 'UnitTargetable<{ id: string; }>'.
      The types of '__.id' are incompatible between these types.
        Type 'number' is not assignable to type 'string'.
    Binding element 'id' implicitly has an 'any' type.
    Type 'EventAsReturnType<string>' is not assignable to type 'EventCallable<string>'.
      Type 'Event<string>' is missing the following properties from type 'EventCallable<string>': prepend, targetable
    "
  `)
})
