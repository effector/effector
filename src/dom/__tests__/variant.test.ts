import {BrowserObject} from 'webdriverio'
import {createStore, createEvent} from 'effector'
import {h, using, list, remap, variant} from 'effector-dom'

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

test('with string key', async () => {
  const [s1, s2] = await exec(async () => {
    type Text = {
      type: 'plain' | 'bold' | 'italic'
      text: string
    }
    const toItalic = createEvent()
    const text = createStore<Text[]>([
      {type: 'plain', text: 'Bold: '},
      {type: 'bold', text: 'text'},
    ])
    text.on(toItalic, list =>
      list.map(e => (e.type === 'bold' ? {type: 'italic', text: e.text} : e)),
    )
    using(el, () => {
      h('p', () => {
        list({source: text, key: 'text'}, ({store}) => {
          h('div', () => {
            const text = remap(store, 'text')
            variant({
              source: store,
              key: 'type',
              cases: {
                plain() {
                  h('span', {text})
                },
                bold() {
                  h('b', {text})
                },
                italic() {
                  h('i', {text})
                },
              },
            })
          })
        })
      })
    })
    await act()
    await act(() => {
      toItalic()
    })
  })
  expect(s1).toMatchInlineSnapshot(
    `"<p><div><span>Bold: </span></div><div><b>text</b></div></p>"`,
  )
  expect(s2).toMatchInlineSnapshot(
    `"<p><div><span>Bold: </span></div><div><i>text</i></div></p>"`,
  )
})
test('with key function', async () => {
  const [s1, s2] = await exec(async () => {
    type Text = {
      type: 'plain' | 'bold' | 'italic'
      text: string
    }
    const toItalic = createEvent()
    const text = createStore<Text[]>([
      {type: 'plain', text: 'Bold: '},
      {type: 'bold', text: 'text'},
    ])
    text.on(toItalic, list =>
      list.map(e => (e.type === 'bold' ? {type: 'italic', text: e.text} : e)),
    )
    using(el, () => {
      h('p', () => {
        list({source: text, key: 'text'}, ({store}) => {
          h('div', () => {
            const text = remap(store, 'text')
            variant({
              source: store,
              //@ts-ignore
              key: ({type}) => type,
              cases: {
                plain() {
                  h('span', {text})
                },
                bold() {
                  h('b', {text})
                },
                italic() {
                  h('i', {text})
                },
              },
            })
          })
        })
      })
    })
    await act()
    await act(() => {
      toItalic()
    })
  })
  expect(s1).toMatchInlineSnapshot(
    `"<p><div><span>Bold: </span></div><div><b>text</b></div></p>"`,
  )
  expect(s2).toMatchInlineSnapshot(
    `"<p><div><span>Bold: </span></div><div><i>text</i></div></p>"`,
  )
})
