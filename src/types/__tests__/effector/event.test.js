// @flow
/* eslint-disable no-unused-vars */
import {
  createEvent,
  Event,
  /*::type*/ CompositeName,
  /*::type*/ kind,
} from 'effector'

const typecheck = '{global}'

test('createEvent', () => {
  const createEvent_event1: Event<number> = createEvent()
  const createEvent_event2: Event<number> = createEvent('event name [1]')
  const createEvent_event3: Event<number> = createEvent({
    name: 'event name [2]',
  })
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors

    --flow--
    no errors
    "
  `)
})
test('#(properties)', () => {
  const event = createEvent()
  const kind1: kind = event.kind
  const shortName: string = event.shortName
  const compositeName: CompositeName = event.compositeName

  const computed = event.map(() => 'hello')
  const kind2: kind = computed.kind
  const shortName1: string = computed.shortName
  const compositeName1: CompositeName = computed.compositeName
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors

    --flow--
    no errors
    "
  `)
})
test('#map', () => {
  const event: Event<number> = createEvent()
  const computed = event.map(() => 'foo')

  //const check1: Event<string> = computed
  const event_map_check2: Event<number> = computed
  event(2)
  computed('')
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    Type 'Event<string>' is not assignable to type 'Event<number>'.
      Types of property 'watch' are incompatible.
        Type '(watcher: (payload: string) => any) => Subscription' is not assignable to type '(watcher: (payload: number) => any) => Subscription'.
          Types of parameters 'watcher' and 'watcher' are incompatible.
            Types of parameters 'payload' and 'payload' are incompatible.
              Type 'string' is not assignable to type 'number'.

    --flow--
    Cannot assign 'computed' to 'event_map_check2'
      const event_map_check2: Event<number> = computed
                                              ^^^^^^^^
      string [1] is incompatible with number [2] in type argument 'Payload' [3]
          const computed = event.map(() => 'foo')
                                       [1] ^^^^^
          const event_map_check2: Event<number> = computed
                                    [2] ^^^^^^
          declare export class Event<Payload> implements Unit<Payload> {
                                 [3] ^^^^^^^
    Cannot assign 'computed' to 'event_map_check2'
      const event_map_check2: Event<number> = computed
                                              ^^^^^^^^
      string [1] is incompatible with number [2] in type argument 'Payload' [3]
          computed('')
               [1] ^^
          const event_map_check2: Event<number> = computed
                                    [2] ^^^^^^
          declare export class Event<Payload> implements Unit<Payload> {
                                 [3] ^^^^^^^
    "
  `)
})
test('#watch', () => {
  const event: Event<number> = createEvent()
  event.watch(state => {
    const check1: number = state
    return state
  })
  event.watch(state => 'foo')
  event.watch(state => {})
  event.watch(state => {})
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors

    --flow--
    no errors
    "
  `)
})
describe('#filterMap', () => {
  test('#filterMap ok', () => {
    const event: Event<number> = createEvent()
    const filteredEvent_ok: Event<string> = event.filterMap(n => {
      if (n % 2) return n.toString()
    })
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
  test('#filterMap incorrect', () => {
    const event: Event<number> = createEvent()
    const filteredEvent_error: Event<number> = event.filterMap(n => {
      if (n % 2) return n.toString()
    })
    expect(typecheck).toMatchInlineSnapshot(`
"
--typescript--
Type 'Event<string>' is not assignable to type 'Event<number>'.

--flow--
Cannot assign 'event.filterMap(...)' to 'filteredEvent_error'
  if (n % 2) return n.toString()
                    ^^^^^^^^^^^^
  string [1] is incompatible with number [2] in type argument 'Payload' [3]
  <BUILTINS>/core.js
      toString(radix?: number): string;
                            [1] ^^^^^^
      const filteredEvent_error: Event<number> = event.filterMap(n => {
                                   [2] ^^^^^^
      declare export class Event<Payload> implements Unit<Payload> {
                             [3] ^^^^^^^
"
`)
  })
})
