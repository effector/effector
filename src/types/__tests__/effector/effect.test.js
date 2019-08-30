// @flow
/* eslint-disable no-unused-vars */
import {
  createEffect,
  Effect,
  /*::type*/ CompositeName,
  /*::type*/ kind,
} from 'effector'
import setupLocation from '../../setupLocation'
const typecheck = '{global}'

test('createEffect', () => {
  const createEffect_effect1: Effect<number, string> = createEffect()
  const createEffect_effect2 = createEffect('', {
    handler: createEffect_effect1,
  })

  const createEffect_effect3 = createEffect('', {
    handler() {
      return 'foo'
    },
  })
  const createEffect_effect4: Effect<number, string> = createEffect('fx 4')
  const createEffect_effect5: Effect<number, string> = createEffect({
    name: 'fx 5',
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
  const effect = createEffect()
  const kind1: kind = effect.kind
  const shortName: string = effect.shortName
  const domainName: CompositeName | typeof undefined = effect.domainName
  const compositeName: CompositeName = effect.compositeName

  const computed = effect.map(() => 'hello')
  const kind2: kind = computed.kind
  const shortName1: string = computed.shortName
  const domainName1: CompositeName | typeof undefined = computed.domainName
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

test('#use', () => {
  const effect1 = createEffect()
  const foo = createEffect<number, string, any>()

  effect1.use(params => Promise.resolve('foo'))
  effect1.use(foo)
  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    Argument of type 'Effect<number, string, any>' is not assignable to parameter of type '(params: void) => unknown'.
      Types of parameters 'payload' and 'params' are incompatible.
        Type 'void' is not assignable to type 'number'.

    --flow--
    no errors
    "
  `)
})

describe('void params', () => {
  describe('with handler', () => {
    test('handler returns void', () => {
      const handler = () => {}
      const effect = createEffect('', {handler})
      effect()
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        no errors

        --flow--
        no errors
        "
      `)
    })
    test('handler returns value', () => {
      const handler = () => 'ok'
      const effect = createEffect({handler})
      const result: Promise<string> = effect()
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
  test('with use', () => {
    const handler = () => {}
    const effect = createEffect('').use(handler)
    effect()
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
describe('nested effects', () => {
  describe('with handler', () => {
    it('support nesting (should be ok)', () => {
      const nestedEffect: Effect<string, string> = createEffect()
      const parentEffect: Effect<string, string> = createEffect({
        handler: nestedEffect,
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
    test('no false-positive (should be type error)', () => {
      const nestedEffect: Effect<string, string> = createEffect()
      const parentEffect: Effect<number, number> = createEffect(
        'should not throw',
        {
          handler: nestedEffect,
        },
      )
      expect(typecheck).toMatchInlineSnapshot(`
        "
        --typescript--
        Type 'Effect<string, string, Error>' is not assignable to type 'Effect<number, number, Error>'.
          Types of property 'done' are incompatible.
            Type 'Event<{ params: string; result: string; }>' is not assignable to type 'Event<{ params: number; result: number; }>'.
              Types of property 'watch' are incompatible.
                Type '(watcher: (payload: { params: string; result: string; }) => any) => Subscription' is not assignable to type '(watcher: (payload: { params: number; result: number; }) => any) => Subscription'.
                  Types of parameters 'watcher' and 'watcher' are incompatible.
                    Types of parameters 'payload' and 'payload' are incompatible.
                      Type '{ params: string; result: string; }' is not assignable to type '{ params: number; result: number; }'.


        --flow--
        Cannot assign 'createEffect(...)' to 'parentEffect'
          const parentEffect: Effect<number, number> = createEffect(
                                                       ^^^^^^^^^^^^^...
          number [1] is incompatible with string [2] in type argument 'Params' [3]
              const parentEffect: Effect<number, number> = createEffect(
                                     [1] ^^^^^^
              const nestedEffect: Effect<string, string> = createEffect()
                                     [2] ^^^^^^
              declare export class Effect<Params, Done, Fail = Error>
                                      [3] ^^^^^^
        Cannot assign 'createEffect(...)' to 'parentEffect'
          const parentEffect: Effect<number, number> = createEffect(
                                                       ^^^^^^^^^^^^^...
          string [1] is incompatible with number [2] in type argument 'Done' [3]
              const nestedEffect: Effect<string, string> = createEffect()
                                             [1] ^^^^^^
              const parentEffect: Effect<number, number> = createEffect(
                                             [2] ^^^^^^
              declare export class Effect<Params, Done, Fail = Error>
                                              [3] ^^^^
        "
      `)
    })
  })
  test('with use', () => {})
})
