//@flow

import {createEffect} from 'effector'
import {delay} from 'effector/fixtures'

test('effect.create single argument', async() => {
  const effect = createEffect('long request')
  effect.use(async() => {
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

  await expect(effect.create.mock.calls).toMatchSnapshot()
  await expect(baz.mock.calls).toMatchSnapshot()
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

function variadicEffect<Done, Fn:(...params: any[]) => Promise<Done> | Done>(
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

test('effect.create multiple arguments', async() => {
  const useSpy = jest.fn()
  const baz = jest.fn()
  const effect = variadicEffect<
    string,
    *,
    (a: number, b: number) => Promise<string>,
      >('long request')

  effect.use(async(a, b) => {
    useSpy(a, b)
    await delay(500)
    return 'done!'
  })
  effect.done.watch(baz)

  await effect(100, 200)
  await effect(200, 300)
  await effect(300, 400)

  //$todo
  await expect(effect.create.mock.calls).toMatchSnapshot('effect.create')
  await expect(useSpy.mock.calls).toMatchSnapshot('effect.use')
  await expect(baz.mock.calls).toMatchSnapshot('effect.watch')
})
