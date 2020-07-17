import {BrowserObject} from 'webdriverio'
import {createStore, createEvent, restore, combine, sample} from 'effector'
import {h, using, list, remap, spec, variant, node, handler} from 'forest'

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

test('click', async () => {
  const clicked = await execFunc(async () => {
    const click = createEvent<MouseEvent>()
    let clicked = false
    click.watch(e => {
      clicked = true
    })
    using(el, () => {
      h('button', () => {
        spec({
          attr: {id: 'btn'},
          handler: {click},
        })
      })
    })
    await act()
    document.getElementById('btn')!.click()
    return clicked
  })

  expect(clicked).toMatchInlineSnapshot(`true`)
})
test('prevented event', async () => {
  const prevented = await execFunc(async () => {
    const click = createEvent<MouseEvent>()
    let isPrevented = false

    click.watch(e => {
      isPrevented = e.defaultPrevented
    })

    using(el, () => {
      h('button', () => {
        handler({prevent: true}, {click})
        spec({attr: {id: 'btn'}})
      })
    })
    await act()
    document.getElementById('btn')!.click()
    return isPrevented
  })

  expect(prevented).toMatchInlineSnapshot(`true`)
})
test('change passive property if prevent is [true]', async () => {
  const prevented = await execFunc(async () => {
    const click = createEvent<MouseEvent>()
    let isPrevented = false

    click.watch(e => {
      isPrevented = e.defaultPrevented
    })

    using(el, () => {
      h('button', () => {
        handler({prevent: true, passive: true}, {click})
        spec({attr: {id: 'btn'}})
      })
    })
    await act()
    document.getElementById('btn')!.click()
    return isPrevented
  })

  expect(prevented).toMatchInlineSnapshot(`true`)
})
