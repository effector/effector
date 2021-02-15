/* eslint-disable no-unused-vars */
import {createStore, createEvent, guard, Store, Event} from 'effector'
const typecheck = '{global}'

test('clock param name in the function', () => {
  const trigger: Event<number> = createEvent()
  const allow: Store<string> = createStore('no')

  const result: Event<string> = guard({
    clock: trigger,
    //@ts-expect-error
    filter: allow,
  })

  expect(typecheck).toMatchInlineSnapshot(`
    "
    No overload matches this call.
      The last overload gave the following error.
        Type 'Store<string>' is not assignable to type 'Store<boolean> | ((clock: number) => boolean)'.
          Type 'Store<string>' is not assignable to type 'Store<boolean>'.
    "
  `)
})
