import {
  createDomain,
  attach,
  fork,
  allSettled,
  sample,
  serialize,
} from 'effector'

test('allSettled first argument validation', async () => {
  const app = createDomain()

  await expect(
    //@ts-ignore
    allSettled(null, {
      scope: fork(app),
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(
    `"first argument should be unit"`,
  )
})

describe('allSettled return value', () => {
  test('in case of effect resolving', async () => {
    const app = createDomain()
    const fx = app.createEffect(async () => 'ok')
    const scope = fork(app)
    const result = await allSettled(fx, {scope})
    expect(result).toEqual({status: 'done', value: 'ok'})
  })
  test('in case of effect rejecting', async () => {
    const app = createDomain()
    const fx = app.createEffect(async () => Promise.reject('err'))
    const scope = fork(app)
    const result = await allSettled(fx, {scope})
    expect(result).toEqual({status: 'fail', value: 'err'})
  })
  test('in case of event call', async () => {
    const app = createDomain()
    const event = app.createEvent()
    const scope = fork(app)
    const result = await allSettled(event, {scope})
    expect(result).toBe(undefined)
  })
  describe('attach support', () => {
    test('throw in original effect', async () => {
      const app = createDomain()
      const original = app.createEffect<void, any>(async () =>
        Promise.reject('err'),
      )
      const fx = attach({
        effect: original,
        mapParams: (_: void) => {},
      })
      const scope = fork(app)
      const result = await allSettled(fx, {scope})
      expect(result).toEqual({status: 'fail', value: 'err'})
    })
    test('throw in mapParams', async () => {
      const app = createDomain()
      const original = app.createEffect<void, any>(async () =>
        Promise.reject('err'),
      )
      const fx = attach({
        effect: original,
        mapParams(_: void) {
          throw 'mapParams error'
        },
      })
      const scope = fork(app)
      const result = await allSettled(fx, {scope})
      expect(result).toEqual({status: 'fail', value: 'mapParams error'})
    })
  })
})

describe('transactions', () => {
  test('add unit to domain during watch', async () => {
    const app = createDomain()
    const trigger = app.createEvent()
    const eff = app.createEffect(async () => {
      await new Promise(rs => setTimeout(rs, 50))
    })
    eff.done.watch(() => {
      const newEvent = app.createEvent()
    })
    sample({
      source: trigger,
      target: eff,
    })
    const scope = fork(app)
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
        "-1jit4f": Array [
          "a",
        ],
        "-m426n2": "a",
      }
    `)
    expect(serialize(scope2)).toMatchInlineSnapshot(`
      Object {
        "-1jit4f": Array [
          "b",
        ],
        "-m426n2": "b",
        "-ufmhgf": Array [
          "b",
        ],
        "9lyhtp": "b",
      }
    `)
  })
})
