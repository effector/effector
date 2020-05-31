import {BrowserObject} from 'webdriverio'
import {createStore, createEvent} from 'effector'
import {h, using, list, spec} from 'effector-dom'

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

it('support visible as dom node property', async () => {
  const [s1, s2] = await exec(async () => {
    const toggleVisible = createEvent<string>()
    const text = createStore([
      {text: 'a', visible: true},
      {text: 'b', visible: false},
      {text: 'c', visible: true},
    ]).on(toggleVisible, (list, text) =>
      list.map(e =>
        e.text === text ? {text: e.text, visible: !e.visible} : e,
      ),
    )

    using(el, () => {
      list(
        {
          source: text,
          key: 'text',
          fields: ['text', 'visible'],
        },
        ({fields: [text, visible]}) => {
          h('p', {text, visible})
        },
      )
    })
    await act()
    await act(() => {
      toggleVisible('b')
    })
  })
  expect(s1).toMatchInlineSnapshot(`"<p>a</p><p>c</p>"`)
  expect(s2).toMatchInlineSnapshot(`"<p>a</p><p>b</p><p>c</p>"`)
})
it('support visible as list item property', async () => {
  const [s1, s2] = await exec(async () => {
    const toggleVisible = createEvent<string>()
    const text = createStore([
      {text: 'a', visible: true},
      {text: 'b', visible: false},
      {text: 'c', visible: true},
    ]).on(toggleVisible, (list, text) =>
      list.map(e =>
        e.text === text ? {text: e.text, visible: !e.visible} : e,
      ),
    )

    using(el, () => {
      h('div', () => {
        list(
          {
            source: text,
            key: 'text',
            fields: ['text', 'visible'],
          },
          ({fields: [text, visible]}) => {
            spec({visible})
            h('p', {text})
          },
        )
      })
    })
    await act()
    await act(() => {
      toggleVisible('b')
    })
  })
  expect(s1).toMatchInlineSnapshot(`"<div><p>a</p><p>c</p></div>"`)
  expect(s2).toMatchInlineSnapshot(`"<div><p>a</p><p>b</p><p>c</p></div>"`)
})
test('re-insertion order', async () => {
  const [s1, s2, s3] = await exec(async () => {
    const toggleVisible = createEvent()
    const visible = createStore(true).on(toggleVisible, visible => !visible)
    using(el, () => {
      h('section', () => {
        h('div', () => {
          spec({
            visible,
            text: 'aside',
          })
        })
        h('div', () => {
          spec({
            text: 'content',
          })
        })
      })
    })
    await act()
    await act(() => {
      toggleVisible()
    })
    await act(() => {
      toggleVisible()
    })
  })
  expect(s1).toMatchInlineSnapshot(
    `"<section><div>aside</div><div>content</div></section>"`,
  )
  expect(s2).toMatchInlineSnapshot(`"<section><div>content</div></section>"`)
  expect(s3).toMatchInlineSnapshot(
    `"<section><div>aside</div><div>content</div></section>"`,
  )
})
