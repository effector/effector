//@flow
import {createEffect} from '..'
import type {Event, Effect, Store} from '../../effector/index.h'

import {delay, spy} from '../../fixtures/test-utils'

const effect = createEffect('long request')

describe('effect({...}).promise()', () => {
 test(`if used function will resolve`, async() => {
  effect.use(async params => {
   await delay(500)
   spy(params)
   return 'done!'
  })
  await expect(effect('ok').promise()).resolves.toBe('done!')
 })

 test('if used function will throw', async() => {
  effect.use(async params => {
   await delay(500)
   spy(params)
   throw 'fail!'
  })
  await expect(effect('will throw').promise()).rejects.toBe('fail!')
 })
})

test('effect({...}).fail()', async() => {
 effect.use(async params => {
  await delay(500)
  spy(params)
  throw 'fail!'
 })
 await expect(effect('will throw').fail()).resolves.toMatchObject({
  error: 'fail!',
  params: 'will throw',
 })
})
