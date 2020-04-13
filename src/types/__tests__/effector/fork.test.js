// @flow
/* eslint-disable no-unused-vars */
import {createDomain, Store} from 'effector'
import {fork, serialize} from 'effector/fork'

const typecheck = '{global}'

describe('serialize cases (should pass)', () => {
  test('serialize(Scope): {[sid: string]: any}', () => {
    const app = createDomain()
    const $a = app.createStore('demo')

    const scope = fork(app)
    const values: {[sid: string]: string} = serialize(scope)

    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })

  test('serialize(Scope, {ignore:[Store<any>]}): {[sid: string]: any}', () => {
    const app = createDomain()
    const $a = app.createStore('demo')
    const $b = app.createStore(5)

    const scope = fork(app)
    const values: {[sid: string]: number} = serialize(scope, {ignore: [$b]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
})

describe('serialize cases (should fail)', () => {
  test('serialize(Scope, {ignore:[Event<any>]}): {[sid: string]: any}', () => {
    const app = createDomain()
    const event = app.createEvent()

    const scope = fork(app)
    const values: {[sid: string]: any} = serialize(scope, {ignore: [event]})

    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
})
