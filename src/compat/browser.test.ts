import {BrowserObject} from 'webdriverio'
import {
  createStore,
  createEffect,
  createEvent,
  restore,
  combine,
  sample,
} from 'effector'

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
