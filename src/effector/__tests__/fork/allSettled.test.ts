import {
  createDomain,
  createEffect,
  createEvent,
  attach,
  fork,
  allSettled,
  sample,
  serialize, createStore,
} from 'effector'

test('allSettled first argument validation', async () => {
  await expect(
    //@ts-expect-error
    allSettled(null, {scope: fork()}),
  ).rejects.toThrowErrorMatchingInlineSnapshot(
    `"first argument should be unit"`,
  )

  await expect(
    allSettled(createEffect(() => {}), { scope: fork() }),
  ).resolves.toEqual({ "status": "done", value: undefined })

  await expect(
    allSettled(createEvent(), { scope: fork() }),
  ).resolves.toBeUndefined()

  await expect(
    // @ts-expect-error
    allSettled(createStore(0), { scope: fork() })
  ).rejects.toThrowErrorMatchingInlineSnapshot(
    `"first argument accepts only effects and units"`
  );

  await expect(
    // @ts-expect-error
    allSettled(createDomain(), { scope: fork() })
  ).rejects.toThrowErrorMatchingInlineSnapshot(
    `"first argument accepts only effects and units"`
  );

})

describe('allSettled return value', () => {
  test('in case of effect resolving', async () => {
    const fx = createEffect(async () => 'ok')
    const scope = fork()
    const result = await allSettled(fx, {scope})
    expect(result).toEqual({status: 'done', value: 'ok'})
  })
  test('in case of effect rejecting', async () => {
    const fx = createEffect(async () => Promise.reject('err'))
    const scope = fork()
    const result = await allSettled(fx, {scope})
    expect(result).toEqual({status: 'fail', value: 'err'})
  })
  test('in case of event call', async () => {
    const event = createEvent()
    const scope = fork()
    const result = await allSettled(event, {scope})
    expect(result).toBe(undefined)
  })
  describe('attach support', () => {
    test('throw in original effect', async () => {
      const original = createEffect<void, any>(async () =>
        Promise.reject('err'),
      )
      const fx = attach({
        effect: original,
        mapParams: (_: void) => {},
      })
      const scope = fork()
      const result = await allSettled(fx, {scope})
      expect(result).toEqual({status: 'fail', value: 'err'})
    })
    test('throw in mapParams', async () => {
      const original = createEffect<void, any>(async () =>
        Promise.reject('err'),
      )
      const fx = attach({
        effect: original,
        mapParams(_: void) {
          throw 'mapParams error'
        },
      })
      const scope = fork()
      const result = await allSettled(fx, {scope})
      expect(result).toEqual({status: 'fail', value: 'mapParams error'})
    })
  })
})

describe('transactions', () => {
  test('add unit to domain during watch', async () => {
    const trigger = createEvent()
    const eff = createEffect(async () => {
      await new Promise(rs => setTimeout(rs, 50))
    })
    eff.done.watch(() => {
      const newEvent = createEvent()
    })
    sample({
      source: trigger,
      target: eff,
    })
    const scope = fork()
    await allSettled(trigger, {scope})
  })
  test('', async () => {
    const app = createDomain()
    const inner1 = app.createEffect(async (x: string) => {
      await new Promise(rs => setTimeout(rs, 50))
    })
    const inner2 = app.createEffect(async (x: string) => {
      await new Promise(rs => setTimeout(rs, 50))
    })
    const req1 = app.createEffect(async (x: string) => {
      await inner1(x)
      await inner2(x)
      await inner1(`${x} 2`)
    })
    const words = app
      .createStore([] as string[])
      .on(inner2.done, (list, {params: word}) => [...list, word])
    const trigger = app.createEvent<string>()
    const str = app.createStore('-').on(trigger, (_, x) => x)

    sample({
      source: str,
      target: req1,
    })

    const scope1 = fork(app)
    const promise1 = allSettled(trigger, {
      scope: scope1,
      params: 'a',
    })
    expect(() => {
      const inner1 = app.createEffect(async (x: string) => {
        await new Promise(rs => setTimeout(rs, 50))
      })
      const inner2 = app.createEffect(async (x: string) => {
        await new Promise(rs => setTimeout(rs, 40))
      })
      const req1 = app.createEffect(async (x: string) => {
        await Promise.all([inner1(x), inner2(x)])
      })
      const words = app
        .createStore([] as string[])
        .on(inner2.done, (list, {params: word}) => [...list, word])
      const str = app.createStore('-').on(trigger, (_, x) => x)

      sample({
        source: str,
        target: req1,
      })
    }).not.toThrow()
    const scope2 = fork(app)
    const promise2 = allSettled(trigger, {
      scope: scope2,
      params: 'b',
    })
    await promise1
    expect(() => {
      const inner1 = app.createEffect(async (x: string) => {
        await new Promise(rs => setTimeout(rs, 50))
      })
      const inner2 = app.createEffect(async (x: string) => {
        await new Promise(rs => setTimeout(rs, 50))
      })
      const req1 = app.createEffect(async (x: string) => {
        await inner1(x)
        await inner2(x)
      })
      const words = app
        .createStore([] as string[])
        .on(inner2.done, (list, {params: word}) => [...list, word])
      const str = app.createStore('-').on(trigger, (_, x) => x)

      sample({
        source: str,
        target: req1,
      })
    }).not.toThrow()
    await promise2
    expect(serialize(scope1)).toMatchInlineSnapshot(`
      Object {
        "w3iw57": Array [
          "a",
        ],
        "z6qtwf": "a",
      }
    `)
    expect(serialize(scope2)).toMatchInlineSnapshot(`
      Object {
        "-44cjly": "b",
        "qv6j32": Array [
          "b",
        ],
        "w3iw57": Array [
          "b",
        ],
        "z6qtwf": "b",
      }
    `)
  })
})