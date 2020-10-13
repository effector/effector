import {createDomain, attach, fork, allSettled} from 'effector'

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
