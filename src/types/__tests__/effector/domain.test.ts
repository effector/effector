// @flow
/* eslint-disable no-unused-vars */
import {combine, createDomain, clearNode, Effect} from 'effector'

const typecheck = '{global}'

test('createDomain', () => {
  const domain = createDomain()
  const domain2 = createDomain('hello')
  const domain3 = createDomain(234)
  const domain4 = createDomain({foo: true})
  expect(typecheck).toMatchInlineSnapshot(`
    "
    Argument of type '234' is not assignable to parameter of type 'string | undefined'.
    Argument of type '{ foo: boolean; }' is not assignable to parameter of type 'string'.
    "
  `)
})

describe('#event', () => {
  it('works without arguments', () => {
    const domain = createDomain()
    const event = domain.event<string>()
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  it('works with name', () => {
    const domain = createDomain()
    const event = domain.event<string>('event')
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  it('works with config', () => {
    const domain = createDomain()
    const event = domain.event<string>({name: 'event'})
    expect(typecheck).toMatchInlineSnapshot(`
      "
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
      no errors
      "
    `)
  })
  it('works with name', () => {
    const domain = createDomain()
    const event = domain.createEvent<string>('event')
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  it('works with config', () => {
    const domain = createDomain()
    const event = domain.createEvent<string>({name: 'event'})
    expect(typecheck).toMatchInlineSnapshot(`
      "
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
    const handler: any = () => {}
    effect1.use(handler)
    effect2(20)
    const effect3 = domain.effect('', {
      handler: effect1,
    })
    effect3(20)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type 'number' is not assignable to parameter of type 'string'.
      Argument of type 'number' is not assignable to parameter of type 'string'.
      "
    `)
  })
  it('works without arguments', () => {
    const domain = createDomain()
    const fx = domain.effect()
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  it('works with name', () => {
    const domain = createDomain()
    const fx = domain.effect('fx')
    expect(typecheck).toMatchInlineSnapshot(`
      "
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
    const handler: any = () => {}
    effect1.use(handler)
    effect2(20)
    const effect3 = domain.createEffect('', {
      handler: effect1,
    })
    effect3(20)
    expect(typecheck).toMatchInlineSnapshot(`
      "
      Argument of type 'number' is not assignable to parameter of type 'string'.
      Argument of type 'number' is not assignable to parameter of type 'string'.
      "
    `)
  })
  it('works without arguments', () => {
    const domain = createDomain()
    const fx = domain.createEffect()
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
  it('works with name', () => {
    const domain = createDomain()
    const fx = domain.createEffect('fx')
    expect(typecheck).toMatchInlineSnapshot(`
      "
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
      Parameter 'params' implicitly has an 'any' type.
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
      no errors
      "
    `)
  })
})

test('#onCreateStore', () => {
  const root = createDomain()
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
    const object = combine({foo})
    object.watch(data => {
      data.foo
    })

    clearNode(foo)
  })
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
