// @flow
/* eslint-disable no-unused-vars */
import {createStoreObject, createDomain, clearNode, Effect} from 'effector'

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

describe('#event', () => {
  it('works without arguments', () => {
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
  it('works with name', () => {
    const domain = createDomain()
    const event = domain.event<string>('event')
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
  it('works with config', () => {
    const domain = createDomain()
    const event = domain.event<string>({name: 'event'})
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
describe('#createEvent', () => {
  it('works without arguments', () => {
    const domain = createDomain()
    const event = domain.createEvent<string>()
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
  it('works with name', () => {
    const domain = createDomain()
    const event = domain.createEvent<string>('event')
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
  it('works with config', () => {
    const domain = createDomain()
    const event = domain.createEvent<string>({name: 'event'})
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

describe('#effect', () => {
  test('type inference', () => {
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
  it('works without arguments', () => {
    const domain = createDomain()
    const fx = domain.effect()
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
  it('works with name', () => {
    const domain = createDomain()
    const fx = domain.effect('fx')
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
  it('works with config', () => {
    const domain = createDomain()
    const fx = domain.effect({
      name: 'fx',
      async handler(params) {},
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
  it('works with name and config', () => {
    const domain = createDomain()
    const fx = domain.effect('fx', {
      async handler(params) {},
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
})

describe('#createEffect', () => {
  test('type inference', () => {
    const domain = createDomain()
    const effect1: Effect<string, number, Error> = domain.createEffect()
    const effect2 = domain.createEffect('', {
      handler(params: string) {
        return 256
      },
    })
    effect2(20)
    const effect3 = domain.createEffect('', {
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
            const effect1: Effect<string, number, Error> = domain.createEffect()
                              [2] ^^^^^^
      "
    `)
  })
  it('works without arguments', () => {
    const domain = createDomain()
    const fx = domain.createEffect()
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
  it('works with name', () => {
    const domain = createDomain()
    const fx = domain.createEffect('fx')
    expect(typecheck).toMatchInlineSnapshot(`
      "
      --typescript--
      no errors

      --flow--
      no errors
      "
    `)
  })
  it('works with config', () => {
    const domain = createDomain()
    const fx = domain.createEffect({
      name: 'fx',
      async handler(params) {},
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
  it('works with name and config', () => {
    const domain = createDomain()
    const fx = domain.createEffect('fx', {
      async handler(params) {},
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
