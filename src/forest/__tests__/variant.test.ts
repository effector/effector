import {BrowserObject} from 'webdriverio'
import {createStore, createEvent, createApi} from 'effector'
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

test('nested variants', async () => {
  const [s1, s2, s3] = await exec(async () => {
    const currentRoute = createStore({name: 'main'})
    const {goMain, goLogin} = createApi(currentRoute, {
      goMain: () => ({name: 'main'}),
      goLogin: () => ({name: 'login'}),
    })

    const step = createStore({name: 'email'})

    using(el, () => {
      h('header', () => {
        h('button', {
          attr: {id: 'go_main'},
          text: 'Go /main',
          handler: {click: goMain as any},
        })
        h('button', {
          attr: {id: 'go_login'},
          text: 'Go /login',
          handler: {click: goLogin as any},
        })
      })
      variant({
        source: currentRoute,
        key: 'name',
        cases: {
          main() {
            h('h1', {text: 'Main page'})
          },
          login() {
            h('header', () => {
              h('h1', {text: 'Login page'})
            })
            variant({
              source: step,
              key: 'name',
              cases: {
                email() {
                  h('div', {text: 'email'})
                },
                pass() {
                  h('div', {text: 'pass'})
                },
              },
            })
          },
        },
      })
    })
    await act()
    await act(() => {
      document.getElementById('go_login')!.click()
    })
    await act(() => {
      document.getElementById('go_main')!.click()
    })
  })
  expect(s1).toMatchInlineSnapshot(`
    "
    <header>
      <button id='go_main'>Go /main</button
      ><button id='go_login'>Go /login</button>
    </header>
    <h1>Main page</h1>
    "
  `)
  expect(s2).toMatchInlineSnapshot(`
    "
    <header>
      <button id='go_main'>Go /main</button
      ><button id='go_login'>Go /login</button>
    </header>
    <header><h1>Login page</h1></header>
    <div>email</div>
    "
  `)
  expect(s3).toMatchInlineSnapshot(`
    "
    <header>
      <button id='go_main'>Go /main</button
      ><button id='go_login'>Go /login</button>
    </header>
    <h1>Main page</h1>
    "
  `)
})

test('list in variant', async () => {
  const [s1, s2, s3] = await exec(async () => {
    const messages = createStore(['first message', 'second message'])
    const currentRoute = createStore({name: 'main'})
    const {goMain, goChat} = createApi(currentRoute, {
      goMain: () => ({name: 'main'}),
      goChat: () => ({name: 'chat'}),
    })

    using(el, () => {
      h('header', () => {
        h('button', {
          attr: {id: 'go_main'},
          text: 'Go /main',
          handler: {click: goMain as any},
        })
        h('button', {
          attr: {id: 'go_chat'},
          text: 'Go /chat',
          handler: {click: goChat as any},
        })
      })
      variant({
        source: currentRoute,
        key: 'name',
        cases: {
          main() {
            h('h1', {text: 'Main page'})
          },
          chat() {
            h('h1', {text: 'Chat page'})
            list(messages, ({store}) => {
              h('div', {text: store})
            })
          },
        },
      })
    })
    await act()
    await act(() => {
      document.getElementById('go_chat')!.click()
    })
    await act(() => {
      document.getElementById('go_main')!.click()
    })
  })
  expect(s1).toMatchInlineSnapshot(`
    "
    <header>
      <button id='go_main'>Go /main</button
      ><button id='go_chat'>Go /chat</button>
    </header>
    <h1>Main page</h1>
    "
  `)
  expect(s2).toMatchInlineSnapshot(`
    "
    <header>
      <button id='go_main'>Go /main</button
      ><button id='go_chat'>Go /chat</button>
    </header>
    <h1>Chat page</h1>
    <div>first message</div>
    <div>second message</div>
    "
  `)
  expect(s3).toMatchInlineSnapshot(`
    "
    <header>
      <button id='go_main'>Go /main</button
      ><button id='go_chat'>Go /chat</button>
    </header>
    <h1>Main page</h1>
    "
  `)
})
