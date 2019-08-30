// @flow
/* eslint-disable no-unused-vars */
import {createStoreObject, createDomain, clearNode, Effect} from 'effector'
import setupLocation from '../../setupLocation'
const typecheck = '{global}'

test('createDomain', () => {
  const domain = createDomain()
  const domain2 = createDomain('hello')
  const domain3 = createDomain(234)
  const domain4 = createDomain({foo: true})
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    Argument of type '234' is not assignable to parameter of type 'string | undefined'.
    Argument of type '{ foo: boolean; }' is not assignable to parameter of type 'string'.

    --flow--
    Cannot call 'createDomain' with '234' bound to 'domainName'
      const domain3 = createDomain(234)
                                   ^^^
      number [1] is incompatible with string [2]
          const domain3 = createDomain(234)
                                   [1] ^^^
          declare export function createDomain(domainName?: string): Domain
                                                        [2] ^^^^^^
    Cannot call 'createDomain' with object literal bound to 'domainName'
      const domain4 = createDomain({foo: true})
                                   ^^^^^^^^^^^
      object literal [1] is incompatible with string [2]
          const domain4 = createDomain({foo: true})
                                   [1] ^^^^^^^^^^^
          declare export function createDomain(domainName?: string): Domain
                                                        [2] ^^^^^^
    "
  `)
})

test('#event', () => {
  const domain = createDomain()
  const event = domain.event<string>()
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors

    --flow--
    no errors
    "
  `)
})

test('#effect', () => {
  const domain = createDomain()
  const effect1: Effect<string, number, Error> = domain.effect()
  const effect2 = domain.effect('', {
    handler(params: string) {
      return 256
    },
  })
  effect2(20)
  const effect3 = domain.effect('', {
    handler: effect1,
  })
  effect3(20)
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    Argument of type '20' is not assignable to parameter of type 'string'.
    Argument of type '20' is not assignable to parameter of type 'string'.


    --flow--
    Cannot call 'effect2' with '20' bound to 'payload'
      effect2(20)
              ^^
      number [1] is incompatible with string [2]
          effect2(20)
              [1] ^^
          handler(params: string) {
                      [2] ^^^^^^
    Cannot call 'effect3' with '20' bound to 'payload'
      effect3(20)
              ^^
      number [1] is incompatible with string [2]
          effect3(20)
              [1] ^^
          const effect1: Effect<string, number, Error> = domain.effect()
                            [2] ^^^^^^
    "
  `)
})

test('#onCreateStore', () => {
  const root = createDomain('root')
  root.onCreateStore(store => {
    const snapshot = localStorage.getItem(store.shortName)
    if (typeof snapshot === 'string') store.setState(JSON.parse(snapshot))

    let isFirstSkiped = false
    store.watch(newState => {
      if (isFirstSkiped) {
        localStorage.setItem(store.shortName, JSON.stringify(newState))
      }
      isFirstSkiped = true
    })
    return store
  })

  root.onCreateStore(foo => {
    const object = createStoreObject({foo})
    object.watch(data => {
      data.foo
    })

    clearNode(foo)
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
