/* eslint-disable no-unused-vars */
import {
  createEffect,
  createEvent,
  scopeBind,
} from 'effector'

const typecheck = '{global}'

test('scopeBind with Event', () => {
  function dumb() {
    const event1 = createEvent()
    const event1_binded = scopeBind(event1)

    const event2 = createEvent<number>()
    const event2_binded = scopeBind(event2)
  }

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})

test('scopeBind with Effect', () => {
  function dumb() {
    const fx1 = createEffect()
    const fx1_binded = scopeBind(fx1)

    const fx2 = createEffect<number, void>()
    const fx2_binded = scopeBind(fx2)

    const fx3 = createEffect<number, number, string>()
    const fx3_binded = scopeBind(fx3)
  }

  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
