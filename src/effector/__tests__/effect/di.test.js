//@flow

import {createEffect} from 'effector'
import {delay, argumentHistory} from 'effector/fixtures'

test('effect.create single argument', async () => {
  const effect = createEffect()
  effect.use(async () => {
    await delay(500)
    return 'done!'
  })
  const oldCreate = effect.create
  //$off
  effect.create = jest.fn((payload, fullName, args) =>
    oldCreate(payload, fullName, args),
  )
  const baz = jest.fn()
  effect.done.watch(baz)

  await effect(100)
  await effect(200)
  await effect(300)

  await expect(effect.create.mock.calls).toMatchInlineSnapshot(`
          Array [
            Array [
              100,
              Array [],
              Array [],
            ],
            Array [
              200,
              Array [],
              Array [],
            ],
            Array [
              300,
              Array [],
              Array [],
            ],
          ]
        `)
  await expect(argumentHistory(baz)).toMatchInlineSnapshot(`
          Array [
            Object {
              "params": 100,
              "result": "done!",
            },
            Object {
              "params": 200,
              "result": "done!",
            },
            Object {
              "params": 300,
              "result": "done!",
            },
          ]
        `)
})

//eslint-disable-next-line
type ExtractFn<Params, Fn: (...params: Params) => any> = Params

type FnEffect<Params, Done, Fail = Error, +Fn = Function> = {
  /*::
  [[call]]: Fn,
  */
  +done: Event<{|
    params: Params,
    result: Done,
  |}>,
  +fail: Event<{|
    params: Params,
    error: Fail,
  |}>,
  /*::+*/ id: string,
  +use: {|
    (asyncFunction: Fn): void,
    getCurrent(): Fn,
  |},
  create(payload: Params, type: string, args: any[]): Params,
  +watch: (watcher: (payload: Params) => any) => Subscription,
  // getNode(): Vertex<['event', string]>,
  //map<T>(fn: (_: E) => T): Event<T>,
  prepend<Before>(fn: (_: Before) => Params): Event<Before>,
  subscribe(subscriber: Subscriber<Params>): Subscription,
  //prettier-ignore
  //   +to: (
  //   & (<T>(
  //    store: Store<T>,
  //    reducer: (state: T, payload: Params) => T
  //   ) => Subscription)
  //   & ((store: Store<Params>, _: void) => Subscription)
  //  ),
  // epic<T>(fn: (_: Stream<Params>) => Stream<T>): Event<T>,
  getType(): string,
  +kind: kind,
  shortName: string,
  domainName?: CompositeName,
  graphite: Graph,
  compositeName: CompositeName,
  ...
}

function variadicEffect<Done, Fn: (...params: any[]) => Promise<Done> | Done>(
  name?: string,
): FnEffect<ExtractFn<*, Fn>, Done, Error, Fn> {
  const effect = createEffect(name)
  const oldCreate = effect.create
  //$off
  effect.create = jest.fn((payload, fullName, args) =>
    oldCreate([payload, ...args], fullName, []),
  )
  const oldUse = effect.use
  //$off
  effect.use = handler => oldUse(payload => handler(...payload))

  return (effect: any)
}

test('effect.create multiple arguments', async () => {
  const useSpy = jest.fn()
  const baz = jest.fn()
  const effect = variadicEffect<
    string,
    *,
    (a: number, b: number) => Promise<string>,
  >('long request')

  effect.use(async (a, b) => {
    useSpy({a, b})
    await delay(500)
    return 'done!'
  })
  effect.done.watch(baz)

  await effect(100, 200)
  await effect(200, 300)
  await effect(300, 400)

  //$todo
  await expect(effect.create.mock.calls).toMatchInlineSnapshot(`
          Array [
            Array [
              100,
              Array [
                200,
              ],
              Array [
                200,
              ],
            ],
            Array [
              200,
              Array [
                300,
              ],
              Array [
                300,
              ],
            ],
            Array [
              300,
              Array [
                400,
              ],
              Array [
                400,
              ],
            ],
          ]
        `)
  await expect(argumentHistory(useSpy)).toMatchInlineSnapshot(`
          Array [
            Object {
              "a": 100,
              "b": 200,
            },
            Object {
              "a": 200,
              "b": 300,
            },
            Object {
              "a": 300,
              "b": 400,
            },
          ]
        `)
  await expect(argumentHistory(baz)).toMatchInlineSnapshot(`
Array [
  Object {
    "params": Array [
      100,
      200,
    ],
    "result": "done!",
  },
  Object {
    "params": Array [
      200,
      300,
    ],
    "result": "done!",
  },
  Object {
    "params": Array [
      300,
      400,
    ],
    "result": "done!",
  },
]
`)
})
