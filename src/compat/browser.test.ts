import type {BrowserObject} from 'webdriverio'
import {createStore, createEffect, createEvent, sample, split} from 'effector'

// let addGlobals: Function
declare const act: (cb?: () => any) => Promise<void>
declare const initBrowser: () => Promise<void>
declare const el: HTMLElement
// let execFun: <T>(cb: (() => Promise<T> | T) | string) => Promise<T>
// let readHTML: () => string
declare const browser: BrowserObject
declare const exec: (cb: () => any) => Promise<string[]>
declare const execFunc: <T>(cb: () => Promise<T>) => Promise<T>

beforeEach(async () => {
  await initBrowser()
}, 10e3)

test('compat test', async () => {
  const updates = await execFunc(async () => {
    const updates = [] as any[]
    const store = createStore({
      message: 'hello',
      isError: false,
    })

    store.watch(e => {
      updates.push(e)
    })

    //@ts-ignore
    store.setState({
      message: 'upd',
      isError: false,
    })

    return updates
  })

  expect(updates).toMatchInlineSnapshot(`
    Array [
      Object {
        "isError": false,
        "message": "hello",
      },
      Object {
        "isError": false,
        "message": "upd",
      },
    ]
  `)
})

test('effect support', async () => {
  const updates = await execFunc(async () => {
    const updates = [] as any[]
    const fx = createEffect(async (x: number) => {
      await Promise.resolve()
      return x.toString()
    })
    const store = createStore('hello').on(fx.doneData, (_, res) => res)

    store.watch(e => {
      updates.push(e)
    })

    await fx(1)
    await fx(2)

    return updates
  })
  expect(updates).toMatchInlineSnapshot(`
    Array [
      "hello",
      "1",
      "2",
    ]
  `)
})

test('split support', async () => {
  const updates = await execFunc(async () => {
    try {
      const intervalStore = createStore(Date.now())
      const filter = createStore(true)
      const enumType = 3
      const typeStore = createStore<any>(enumType)
      const source = sample({source: intervalStore, filter})
      const caseA = createEvent<any>()
      const caseB = createEvent<any>()
      split({source, match: typeStore, cases: {[enumType]: caseA, __: caseB}})
    } catch (err) {
      return String(err.message)
    }
    return 'ok'
  })

  expect(updates).toBe('ok')
})
