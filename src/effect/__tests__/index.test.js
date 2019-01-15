//@flow
import {createEffect} from '..'

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
      }
    })
    await expect(effect('ok')).resolves.toBe('done!')
  })
})

it('should return itself at .use call', () => {
  const effect = createEffect('long request')
  expect(effect.use((_: any) => 'done!')).toBe(effect)
})