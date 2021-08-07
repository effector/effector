import type {BrowserObject} from 'webdriverio'
import {createStore, createEvent, createApi, restore} from 'effector'
import {h, using, list, remap, variant} from 'forest'

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
              //@ts-expect-error
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

describe('list in variant', () => {
  test('#1', async () => {
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
})

describe('dom node insertion', () => {
  test('update list items', async () => {
    const [initial, s2, s3, s4] = await exec(async () => {
      using(el, () => {
        const kindChange = createEvent<'days' | 'months'>()
        const kind$ = restore(kindChange, 'days')
        h('div', () => {
          h('button', {
            text: 'Days',
            handler: {
              click: kindChange.prepend(() => 'days'),
            },
            attr: {id: 'days'},
          })
          h('button', {
            text: 'Months',
            handler: {
              click: kindChange.prepend(() => 'months'),
            },
            attr: {id: 'months'},
          })
          const change = createEvent<MouseEvent>()
          const $source = createStore(7).on(change, () => 3)
          const $items = $source.map(length =>
            Array.from({length}, (_, i) => ({key: i})),
          )

          h('div', () => {
            variant({
              source: kind$.map(view => ({view})),
              key: 'view',
              cases: {
                days() {
                  h('h1', {text: 'Days'})
                  list({
                    source: $items,
                    key: 'key',
                    fields: ['key'],
                    fn: ({fields: [key]}) => h('div', {text: key}),
                  })
                },
                months() {
                  h('h1', {text: 'Months'})
                  h('button', {
                    text: 'Click here',
                    handler: {click: change},
                    attr: {id: 'change'},
                  })
                },
              },
            })
          })
        })
      })
      await act()
      await act(async () => {
        document.getElementById('months')!.click()
      })
      await act(async () => {
        document.getElementById('change')!.click()
      })
      await act(async () => {
        document.getElementById('days')!.click()
      })
    })
    expect(initial).toMatchInlineSnapshot(`
      "
      <div>
        <button id='days'>Days</button
        ><button id='months'>Months</button>
        <div>
          <h1>Days</h1>
          <div>0</div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
        </div>
      </div>
      "
    `)
    expect(s2).toMatchInlineSnapshot(`
      "
      <div>
        <button id='days'>Days</button
        ><button id='months'>Months</button>
        <div>
          <h1>Months</h1>
          <button id='change'>Click here</button>
        </div>
      </div>
      "
    `)
    expect(s3).toMatchInlineSnapshot(`
      "
      <div>
        <button id='days'>Days</button
        ><button id='months'>Months</button>
        <div>
          <h1>Months</h1>
          <button id='change'>Click here</button>
        </div>
      </div>
      "
    `)
    expect(s4).toMatchInlineSnapshot(`
      "
      <div>
        <button id='days'>Days</button
        ><button id='months'>Months</button>
        <div>
          <h1>Days</h1>
          <div>0</div>
          <div>1</div>
          <div>2</div>
        </div>
      </div>
      "
    `)
  })
  test('add new list items', async () => {
    const [initial, s2, s3, s4] = await exec(async () => {
      using(el, () => {
        const kindChange = createEvent<'days' | 'months'>()
        const kind$ = restore(kindChange, 'days')
        h('div', () => {
          h('button', {
            text: 'Days',
            handler: {
              click: kindChange.prepend(() => 'days'),
            },
            attr: {id: 'days'},
          })
          h('button', {
            text: 'Months',
            handler: {
              click: kindChange.prepend(() => 'months'),
            },
            attr: {id: 'months'},
          })
          const change = createEvent<MouseEvent>()
          const $source = createStore(7).on(change, () => 0)
          const $items = $source.map(month => [
            {day: '1-' + month},
            {day: '2-' + month},
          ])

          h('div', () => {
            variant({
              source: kind$.map(view => ({view})),
              key: 'view',
              cases: {
                days() {
                  h('h1', {text: 'Days'})
                  list({
                    source: $items,
                    key: 'day',
                    fields: ['day'],
                    fn: ({fields: [day]}) => h('div', {text: day}),
                  })
                },
                months() {
                  h('h1', {text: 'Months'})
                  h('button', {
                    text: 'change',
                    handler: {click: change},
                    attr: {id: 'change'},
                  })
                },
              },
            })
          })
        })
      })
      await act()
      await act(async () => {
        document.getElementById('months')!.click()
      })
      await act(async () => {
        document.getElementById('change')!.click()
      })
      await act(async () => {
        document.getElementById('days')!.click()
      })
    })
    expect(initial).toMatchInlineSnapshot(`
      "
      <div>
        <button id='days'>Days</button
        ><button id='months'>Months</button>
        <div>
          <h1>Days</h1>
          <div>1-7</div>
          <div>2-7</div>
        </div>
      </div>
      "
    `)
    expect(s2).toMatchInlineSnapshot(`
      "
      <div>
        <button id='days'>Days</button
        ><button id='months'>Months</button>
        <div>
          <h1>Months</h1>
          <button id='change'>change</button>
        </div>
      </div>
      "
    `)
    /**
     * TODO wrong behavior!
     * $items items should not appear
     */
    expect(s3).toMatchInlineSnapshot(`
      "
      <div>
        <button id='days'>Days</button
        ><button id='months'>Months</button>
        <div>
          <div>1-0</div>
          <div>2-0</div>
          <h1>Months</h1>
          <button id='change'>change</button>
        </div>
      </div>
      "
    `)
    expect(s4).toMatchInlineSnapshot(`
      "
      <div>
        <button id='days'>Days</button
        ><button id='months'>Months</button>
        <div>
          <h1>Days</h1>
          <div>1-0</div>
          <div>2-0</div>
        </div>
      </div>
      "
    `)
  })
  test('add new nodes by variant', async () => {
    const [initial, s2, s3, s4] = await exec(async () => {
      using(el, () => {
        const firstLevelChange = createEvent<'A' | 'B'>()
        const $firstLevel = restore(firstLevelChange, 'A')
        h('div', () => {
          h('button', {
            text: 'A',
            handler: {
              click: firstLevelChange.prepend(() => 'A'),
            },
            attr: {id: 'btA'},
          })
          h('button', {
            text: 'B',
            handler: {
              click: firstLevelChange.prepend(() => 'B'),
            },
            attr: {id: 'btB'},
          })
          const change = createEvent<MouseEvent>()
          const $secondLevel = createStore<{level: 'a' | 'b'}>({level: 'a'}).on(
            change,
            () => ({level: 'b'}),
          )
          h('div', () => {
            variant({
              source: $firstLevel.map(level => ({level})),
              key: 'level',
              cases: {
                A() {
                  h('h1', {text: 'A'})
                  variant({
                    source: $secondLevel,
                    key: 'level',
                    cases: {
                      a: () => h('div', {text: 'a'}),
                      b: () => h('div', {text: 'b'}),
                    },
                  })
                },
                B() {
                  h('h1', {text: 'B'})
                  h('button', {
                    text: 'change',
                    handler: {click: change},
                    attr: {id: 'change'},
                  })
                },
              },
            })
          })
        })
      })
      await act()
      await act(async () => {
        document.getElementById('btB')!.click()
      })
      await act(async () => {
        document.getElementById('change')!.click()
      })
      await act(async () => {
        document.getElementById('btA')!.click()
      })
    })
    expect(initial).toMatchInlineSnapshot(`
      "
      <div>
        <button id='btA'>A</button><button id='btB'>B</button>
        <div>
          <h1>A</h1>
          <div>a</div>
        </div>
      </div>
      "
    `)
    expect(s2).toMatchInlineSnapshot(`
      "
      <div>
        <button id='btA'>A</button><button id='btB'>B</button>
        <div>
          <h1>B</h1>
          <button id='change'>change</button>
        </div>
      </div>
      "
    `)
    /**
     * TODO wrong behavior!
     * $secondLevel b case nodes should not appear
     */
    expect(s3).toMatchInlineSnapshot(`
      "
      <div>
        <button id='btA'>A</button><button id='btB'>B</button>
        <div>
          <div>b</div>
          <h1>B</h1>
          <button id='change'>change</button>
        </div>
      </div>
      "
    `)
    /**
     * TODO wrong behavior!
     * $secondLevel a case nodes should not appear
     */
    expect(s4).toMatchInlineSnapshot(`
    "
      <div>
        <button id='btA'>A</button><button id='btB'>B</button>
        <div>
          <h1>A</h1>
          <div>a</div>
          <div>b</div>
        </div>
      </div>
      "
    `)
  })
})
