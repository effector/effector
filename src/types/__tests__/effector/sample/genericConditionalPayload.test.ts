import {createEffect, createEvent, sample, Event, EventCallable} from 'effector'

const typecheck = '{global}'

// A payload that is a conditional type over a generic parameter: TypeScript
// cannot decide target compatibility for it, so the check stays deferred.
type Opened<T> = T extends void ? void | {replace?: boolean} : {params: T}

test('generic conditional payload passes from clock to the same target', () => {
  function forward<T>(
    clock: Event<Opened<T>>,
    target: EventCallable<Opened<T>>,
  ) {
    sample({clock, target})
  }
  function toEffect<T>(clock: EventCallable<Opened<T>>) {
    const fx = createEffect((payload: Opened<T>) => payload)
    sample({clock, target: fx})
  }
  function mapped<T>(
    clock: EventCallable<Opened<T>>,
    target: EventCallable<Opened<T>>,
  ) {
    sample({clock, fn: payload => payload, target})
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

// zod v4 defines `output<T>` this way: a conditional type over the schema.
type Output<T> = T extends {_zod: {output: any}} ? T['_zod']['output'] : unknown

test('fn returning a conditional type over a generic does not become a target', () => {
  function track<T extends {_zod: {output: unknown}}>() {
    const evaluation = createEvent<{ready: boolean; data: Output<T>}>()
    return sample({
      clock: evaluation,
      filter: ({ready}) => ready,
      fn: ({data}) => data,
    })
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
