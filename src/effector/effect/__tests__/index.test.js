//@flow
import {createEffect} from '..'
import {forward} from '../../event'
import {delay, spy} from 'effector/fixtures'

const effect = createEffect('long request')

describe('effect({...})', () => {
  test(`if used function will resolve`, async() => {
    effect.use(async params => {
      await delay(500)
      spy(params)
      return 'done!'
    })
    await expect(effect('ok')).resolves.toBe('done!')
  })

  test('if used function will throw', async() => {
    effect.use(async params => {
      await delay(500)
      spy(params)
      throw 'fail!'
    })
    //eslint-disable-next-line max-len
    await expect(effect('will throw')).rejects.toBe('fail!')
  })
})

describe('future', () => {
  test(`if used function will resolve`, async() => {
    effect.use(async params => {
      await delay(500)
      spy(params)
      return 'done!'
    })
    await expect(effect('ok')).resolves.toBe('done!')
  })

  test('if used function will throw', async() => {
    effect.use(async params => {
      await delay(500)
      spy(params)
      throw 'fail!'
    })
    await expect(effect('will throw')).rejects.toBe('fail!')
  })
})

describe('effect({..}).anyway() aka .finally()', () => {
  test(`if used function will resolve`, async() => {
    effect.use(async params => {
      await delay(500)
      spy(params)
      return 'done!'
    })
    //$todo
    await expect(effect('ok').anyway()).resolves.toBe(undefined)
  })

  test('if used function will throw', async() => {
    effect.use(async params => {
      await delay(500)
      spy(params)
      throw 'fail!'
    })
    //$todo
    await expect(effect('will throw').anyway()).resolves.toBe(undefined)
  })
})
describe('createEffect with config', () => {
  it('supports empty config as second argument', async() => {
    const effect = createEffect('long request', {})

    await expect(effect('ok')).resolves.toBe(undefined)
  })
  it('supports default handler with config', async() => {
    const effect = createEffect('long request', {
      async handler(params) {
        await delay(500)
        spy(params)
        return 'done!'
      },
    })
    await expect(effect('ok')).resolves.toBe('done!')
  })
  it('supports default handler without name', async() => {
    const effect = createEffect({
      async handler(params) {
        await delay(500)
        spy(params)
        return 'done!'
      },
    })
    await expect(effect('ok')).resolves.toBe('done!')
  })
})

it('should return itself at .use call', () => {
  const effect = createEffect('long request')
  expect(effect.use((_: any) => 'done!')).toBe(effect)
})

it('should support forward', async() => {
  const fnHandler = jest.fn()
  const fnWatcher = jest.fn()
  const fetchData = createEffect('fetch', {
    async handler(payload) {
      return 'fetchData result'
    },
  })

  const logRequest = createEffect('log', {
    async handler(payload) {
      fnHandler(payload)
      console.warn('logRequest', payload)
      return 'logRequest result'
    },
  })

  logRequest.done.watch(d => {
    fnWatcher(d)
    console.log(d)
  })

  forward({
    from: fetchData,
    to: logRequest,
  })

  await fetchData({url: 'xxx'})
  expect(fnHandler.mock.calls).toEqual([[{url: 'xxx'}]])
  expect(fnWatcher.mock.calls).toEqual([
    [{params: {url: 'xxx'}, result: 'logRequest result'}],
  ])
})
