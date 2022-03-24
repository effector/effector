import type {BrowserObject} from 'webdriverio'
import {createStore, createEvent, restore, combine, sample} from 'effector'
import {
  h,
  using,
  list,
  remap,
  spec,
  variant,
  node,
  handler,
  rec,
  block,
  text,
} from 'forest'

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

it('works', async () => {
  const [s1] = await exec(async () => {
    const store = createStore([{name: 'alice'}, {name: 'bob'}, {name: 'carol'}])
    using(el, () => {
      h('header', () => {
        h('h1', {
          text: 'App title',
        })
      })
      h('ul', () => {
        list(store, ({store}) => {
          h('li', {
            text: remap(store, 'name'),
          })
        })
      })
    })
    await act()
  })
  expect(s1).toMatchInlineSnapshot(`
    "
    <header><h1>App title</h1></header>
    <ul>
      <li>alice</li>
      <li>bob</li>
      <li>carol</li>
    </ul>
    "
  `)
})

it('update content after store update', async () => {
  const [s1, s2] = await exec(async () => {
    const updateText = createEvent<string>()
    const text = restore(updateText, 'text value')
    using(el, () => {
      h('div', {
        text,
      })
    })
    await act()
    await act(() => {
      updateText('updated')
    })
  })
  expect(s1).toMatchInlineSnapshot(`
    "
    <div>text value</div>
    "
  `)
  expect(s2).toMatchInlineSnapshot(`
    "
    <div>updated</div>
    "
  `)
})

it('support reactive style properties', async () => {
  const [s1, s2] = await exec(async () => {
    const updateAlign = createEvent<string>()
    const align = restore(updateAlign, 'start')

    using(el, () => {
      h('div', {
        text: 'content',
        style: {
          justifySelf: align,
        },
      })
    })
    await act()
    await act(() => {
      updateAlign('center')
    })
  })
  expect(s1).toMatchInlineSnapshot(`
    "
    <div style='justify-self: start'>content</div>
    "
  `)
  expect(s2).toMatchInlineSnapshot(`
    "
    <div style='justify-self: center'>content</div>
    "
  `)
})

describe('classList', () => {
  it('supports setting static object class without class attr', async () => {
    const [s1] = await exec(async () => {
      using(el, () => {
        h('div', {
          text: 'content',
          classList: {example: true, another: true},
        })
      })
      await act()
    })
    expect(s1).toMatchInlineSnapshot(`
      "
      <div class='example another'>content</div>
      "
    `)
  })
  it('supports setting static object class without class attr', async () => {
    const [s1] = await exec(async () => {
      using(el, () => {
        h('div', {
          text: 'content',
          classList: ['example', 'another'],
        })
      })
      await act()
    })
    expect(s1).toMatchInlineSnapshot(`
      "
      <div class='example another'>content</div>
      "
    `)
  })
  it('supports setting static object class with class attr', async () => {
    const [s1] = await exec(async () => {
      using(el, () => {
        h('div', {
          text: 'content',
          classList: {example: true, another: true},
          attr: {class: 'foreign'},
        })
      })
      await act()
    })
    expect(s1).toMatchInlineSnapshot(`
      "
      <div class='foreign example another'>content</div>
      "
    `)
  })
  it('supports setting static object class with class attr', async () => {
    const [s1] = await exec(async () => {
      using(el, () => {
        h('div', {
          text: 'content',
          classList: ['example', 'another'],
          attr: {class: 'foreign'},
        })
      })
      await act()
    })
    expect(s1).toMatchInlineSnapshot(`
      "
      <div class='foreign example another'>content</div>
      "
    `)
  })
  it('supports setting dynamic object class', async () => {
    const [s1, s2] = await exec(async () => {
      const setClass = createEvent<boolean>()
      const $class = restore(setClass, false)
      using(el, () => {
        h('div', {
          text: 'content',
          classList: {example: $class},
          attr: {class: 'foreign'},
        })
      })
      await act()
      await act(() => {
        setClass(true)
      })
    })
    expect(s1).toMatchInlineSnapshot(`
      "
      <div class='foreign'>content</div>
      "
    `)
    expect(s2).toMatchInlineSnapshot(`
      "
      <div class='foreign example'>content</div>
      "
    `)
  })
  it('supports setting dynamic array class', async () => {
    const [s1, s2] = await exec(async () => {
      const setClass = createEvent<string>()
      const $class = restore(setClass, null)
      using(el, () => {
        h('div', {
          text: 'content',
          classList: [$class],
          attr: {class: 'foreign'},
        })
      })
      await act()
      await act(() => {
        setClass('example')
      })
    })
    expect(s1).toMatchInlineSnapshot(`
      "
      <div class='foreign'>content</div>
      "
    `)
    expect(s2).toMatchInlineSnapshot(`
      "
      <div class='foreign example'>content</div>
      "
    `)
  })
  it('supports setting dynamic object class without class property', async () => {
    const [s1, s2] = await exec(async () => {
      const setClass = createEvent<boolean>()
      const $class = restore(setClass, false)
      using(el, () => {
        h('div', {
          text: 'content',
          classList: {example: $class},
        })
      })
      await act()
      await act(() => {
        setClass(true)
      })
    })
    expect(s1).toMatchInlineSnapshot(`
      "
      <div>content</div>
      "
    `)
    expect(s2).toMatchInlineSnapshot(`
      "
      <div class='example'>content</div>
      "
    `)
  })
  it('supports setting dynamic array class without class property', async () => {
    const [s1, s2] = await exec(async () => {
      const setClass = createEvent<string>()
      const $class = restore(setClass, null)
      using(el, () => {
        h('div', {
          text: 'content',
          classList: [$class],
        })
      })
      await act()
      await act(() => {
        setClass('example')
      })
    })
    expect(s1).toMatchInlineSnapshot(`
      "
      <div>content</div>
      "
    `)
    expect(s2).toMatchInlineSnapshot(`
      "
      <div class='example'>content</div>
      "
    `)
  })

  it('supports merging static classList h with spec', async () => {
    const [s1] = await exec(async () => {
      using(el, () => {
        h('div', {
          text: 'content',
          classList: ['first'],
          fn() {
            spec({classList: ['second']})
          },
        })
      })
      await act()
    })
    expect(s1).toMatchInlineSnapshot(`
      "
      <div class='second first'>content</div>
      "
    `)
  })

  it('supports merging static classList h with spec of different types', async () => {
    const [s1] = await exec(async () => {
      using(el, () => {
        h('div', {
          text: 'content',
          classList: ['first'],
          fn() {
            spec({classList: ['second']})
            spec({classList: {third: true}})
          },
        })
      })
      await act()
    })
    expect(s1).toMatchInlineSnapshot(`
      "
      <div class='second third first'>content</div>
      "
    `)
  })

  it('supports merging dynamic spec classList', async () => {
    const [s1, s2, s3] = await exec(async () => {
      const setClassA = createEvent<string>()
      const $classA = restore(setClassA, null)
      const setClassB = createEvent<boolean>()
      const $classB = restore(setClassB, false)
      using(el, () => {
        h('div', {
          text: 'content',
          fn() {
            spec({classList: [$classA]})
            spec({classList: {third: $classB}})
          },
        })
      })
      await act()
      await act(() => {
        setClassA('demo')
      })
      await act(() => {
        setClassB(true)
      })
    })
    expect(s1).toMatchInlineSnapshot(`
      "
      <div>content</div>
      "
    `)
    expect(s2).toMatchInlineSnapshot(`
      "
      <div class='demo'>content</div>
      "
    `)
    expect(s3).toMatchInlineSnapshot(`
      "
      <div class='third demo'>content</div>
      "
    `)
  })
})

describe('node(event) + upward store update', () => {
  test('with units inside using', async () => {
    const result = await execFunc(async () => {
      let result = '--'
      using(el, () => {
        const update = createEvent<string>()
        const target = createStore('--').on(update, (_, upd) => upd)
        target.watch(value => {
          result = value
        })
        h('div', () => {
          node(node => {
            update(node.tagName)
          })
        })
      })
      await act()
      return result
    })
    expect(result).toMatchInlineSnapshot(`"DIV"`)
  })
  test('with units in root', async () => {
    const result = await execFunc(async () => {
      let result = '--'
      const update = createEvent<string>()
      const target = createStore('--').on(update, (_, upd) => upd)
      target.watch(value => {
        result = value
      })
      using(el, () => {
        h('div', () => {
          node(node => {
            update(node.tagName)
          })
        })
      })
      await act()
      return result
    })
    expect(result).toMatchInlineSnapshot(`"DIV"`)
  })
})
test('node() is called exactly once', async () => {
  const result = await execFunc(async () => {
    let result = 0
    using(el, () => {
      h('div', () => {
        node(() => {
          result += 1
        })
      })
    })
    await act()
    return result
  })
  expect(result).toBe(1)
})

it('support reactive style variables', async () => {
  const [s1, s2] = await exec(async () => {
    const updateAlign = createEvent<string>()
    const align = restore(updateAlign, 'start')

    using(el, () => {
      h('div', {
        text: 'content',
        style: {
          justifySelf: 'var(--align)',
        },
        styleVar: {
          align,
        },
      })
    })
    await act()
    await act(() => {
      updateAlign('center')
    })
  })
  expect(s1).toMatchInlineSnapshot(`
    "
    <div style='justify-self: var(--align); --align: start'>
      content
    </div>
    "
  `)
  expect(s2).toMatchInlineSnapshot(`
    "
    <div style='justify-self: var(--align); --align: center'>
      content
    </div>
    "
  `)
})

it.skip('remove watch calls after node removal', async () => {
  const [s1, s2, s3, s4] = await exec(async () => {
    const tick = createEvent<number>()
    const logRecord = createEvent<string>()
    const removeUser = createEvent<string>()
    let id = 0
    const log = createStore<{id: number; value: string}[]>([]).on(
      logRecord,
      (list, rec) => [...list, {value: rec, id: ++id}],
    )

    const users = createStore(['alice', 'bob', 'carol']).on(
      removeUser,
      (list, user) => list.filter(e => e !== user),
    )

    using(el, () => {
      h('section', () => {
        list(users, ({store}) => {
          h('div', {text: store})
          sample({
            source: store,
            clock: tick,
            fn: (user, tick) => ({user, tick}),
          }).watch(({user, tick}) => {
            logRecord(`[${tick}] ${user}`)
          })
        })
      })
      h('section', () => {
        list(
          {source: log, key: 'id', fields: ['value']},
          ({fields: [value]}) => {
            h('div', {text: value})
          },
        )
      })
    })
    await act()
    await act(() => {
      tick(0)
    })
    await act(() => {
      removeUser('bob')
    })
    await act(() => {
      tick(1)
    })
  })
  expect(s1).toMatchInlineSnapshot(`
    "
    <section>
      <div>alice</div>
      <div>bob</div>
      <div>carol</div>
    </section>
    <section></section>
    "
  `)
  expect(s2).toMatchInlineSnapshot(`
    "
    <section>
      <div>alice</div>
      <div>bob</div>
      <div>carol</div>
    </section>
    <section>
      <div>[0] alice</div>
      <div>[0] bob</div>
      <div>[0] carol</div>
    </section>
    "
  `)
  expect(s3).toMatchInlineSnapshot(`
    "
    <section>
      <div>alice</div>
      <div>carol</div>
    </section>
    <section>
      <div>[0] alice</div>
      <div>[0] bob</div>
      <div>[0] carol</div>
    </section>
    "
  `)
  expect(s4).toMatchInlineSnapshot(`
    "
    <section>
      <div>alice</div>
      <div>carol</div>
    </section>
    <section>
      <div>[0] alice</div>
      <div>[0] bob</div>
      <div>[0] carol</div>
      <div>[1] alice</div>
      <div>[1] carol</div>
    </section>
    "
  `)
})

describe('node reader', () => {
  it('called after dom node mounting', async () => {
    const [s1] = await exec(async () => {
      type Log = {
        id: number
        key: string
        value: string
      }
      const addLog = createEvent<{key: any; value: any}>()
      const logs = createStore<Log[]>([]).on(addLog, (list, {key, value}) => [
        ...list,
        {
          id: list.length,
          key: String(key),
          value: String(value),
        },
      ])

      using(el, () => {
        h('div', () => {
          node(node => {
            addLog({
              key: 'is connected',
              value: node.isConnected,
            })
            addLog({
              key: 'has parent',
              value: !!node.parentElement,
            })
          })
        })
        h('dl', () => {
          list(
            {source: logs, key: 'id', fields: ['key', 'value']},
            ({fields: [key, value]}) => {
              h('dt', {text: key})
              h('dd', {text: value})
            },
          )
        })
      })
      await act()
    })
    expect(s1).toMatchInlineSnapshot(`
      "
      <div></div>
      <dl>
        <dt>is connected</dt>
        <dd>true</dd>
        <dt>has parent</dt>
        <dd>true</dd>
      </dl>
      "
    `)
  })
})

it('support multiply text nodes', async () => {
  const [s1, s2] = await exec(async () => {
    const trigger = createEvent()
    const foo = createStore('aaa').on(trigger, () => 'cccc')
    const bar = createStore('bbb').on(trigger, () => 'dddd')
    using(el, () => {
      h('div', () => {
        spec({text: foo})
        spec({text: bar})
      })
    })
    await act()
    await act(() => {
      trigger()
    })
  })
  expect(s1).toMatchInlineSnapshot(`
    "
    <div>aaabbb</div>
    "
  `)
  expect(s2).toMatchInlineSnapshot(`
    "
    <div>ccccdddd</div>
    "
  `)
})

describe('dom namespaces', () => {
  test('svg support', async () => {
    const [s1] = await exec(async () => {
      using(el, () => {
        h('div', () => {
          h('svg', {
            attr: {width: 500},
            fn() {
              h('g', {
                attr: {transform: 'translate(5 10)'},
              })
            },
          })
        })
      })
      await act()
    })
    expect(s1).toMatchInlineSnapshot(`
      "
      <div>
        <svg xmlns='http://www.w3.org/2000/svg' width='500'>
          <g transform='translate(5 10)'></g>
        </svg>
      </div>
      "
    `)
  })
  test('foreignObject support', async () => {
    const [s1] = await exec(async () => {
      using(el, () => {
        h('div', () => {
          h('svg', {
            attr: {width: 500},
            fn() {
              h('g', {
                attr: {transform: 'translate(5 10)'},
                fn() {
                  h('foreignObject', () => {
                    h('div', {
                      attr: {title: 'foreign child'},
                      fn() {
                        h('div', {
                          attr: {title: 'nested child'},
                        })
                      },
                    })
                  })
                },
              })
            },
          })
        })
      })
      await act()
    })
    expect(s1).toMatchInlineSnapshot(`
      "
      <div>
        <svg xmlns='http://www.w3.org/2000/svg' width='500'>
          <g transform='translate(5 10)'>
            <foreignObject
              ><div
                xmlns='http://www.w3.org/1999/xhtml'
                title='foreign child'
              >
                <div title='nested child'></div></div
            ></foreignObject>
          </g>
        </svg>
      </div>
      "
    `)
  })
})

test('hydrate', async () => {
  const [s1, s2] = await exec(async () => {
    const inc = createEvent()
    const count = createStore(0).on(inc, x => x + 1)
    const rootItem = createStore(null)
    const Item = rec<any>({
      fn() {
        h('div', {
          text: 'root',
        })
      },
    })
    const Tag = block({
      fn() {
        h('span', {
          text: 'SPAN',
        })
      },
    })
    const App = block({
      fn() {
        Tag()
        h('h1', {text: 'List'})
        Item({store: rootItem})
        h('p', {
          text: ['count = ', count],
        })
      },
    })

    el.innerHTML = `
      <span>SPAN</span>
      <h1>List</h1>
      <div>root</div>
      <p>count = 0</p>
    `
    using(el, {
      fn: App,
      hydrate: true,
    })
    await act()
    await act(async () => {
      inc()
    })
  })
  expect(s1).toMatchInlineSnapshot(`
    "
    <span>SPAN</span>
    <h1>List</h1>
    <div>root</div>
    <p>count = 0</p>
    "
  `)
  expect(s2).toMatchInlineSnapshot(`
    "
    <span>SPAN</span>
    <h1>List</h1>
    <div>root</div>
    <p>count = 1</p>
    "
  `)
})

test('template match bug', async () => {
  const [s1, s2] = await exec(async () => {
    const initial = Array.from({length: 15}, (_, id) => ({
      id: `id_${id}`,
      data: (id * 1000).toString(36),
    }))

    const patch = createEvent<{id: string; data: string}>()
    const $list = createStore(initial).on(patch, (list, {id, data}) => {
      return list.map(item => {
        if (item.id === id) return {id, data}
        return item
      })
    })

    using(el, () => {
      h('ul', () => {
        list($list, ({store}) => {
          const click = createEvent<MouseEvent>()
          sample({
            source: store,
            clock: click,
            fn: ({id}) => ({id, data: 'PATCHED'}),
            target: patch,
          })
          const [id, data] = remap(store, ['id', 'data'] as const)
          h('li', {
            attr: {id},
            handler: {click},
            fn() {
              h('u', {text: data})
            },
          })
        })
      })
    })
    await act()
    await act(async () => {
      const li = el.querySelector('#id_0')! as HTMLElement
      li.click()
    })
  })
  expect(s1).toMatchInlineSnapshot(`
    "
    <ul>
      <li id='id_0'><u>0</u></li>
      <li id='id_1'><u>rs</u></li>
      <li id='id_2'><u>1jk</u></li>
      <li id='id_3'><u>2bc</u></li>
      <li id='id_4'><u>334</u></li>
      <li id='id_5'><u>3uw</u></li>
      <li id='id_6'><u>4mo</u></li>
      <li id='id_7'><u>5eg</u></li>
      <li id='id_8'><u>668</u></li>
      <li id='id_9'><u>6y0</u></li>
      <li id='id_10'><u>7ps</u></li>
      <li id='id_11'><u>8hk</u></li>
      <li id='id_12'><u>99c</u></li>
      <li id='id_13'><u>a14</u></li>
      <li id='id_14'><u>asw</u></li>
    </ul>
    "
  `)
  expect(s2).toMatchInlineSnapshot(`
    "
    <ul>
      <li id='id_0'><u>PATCHED</u></li>
      <li id='id_1'><u>rs</u></li>
      <li id='id_2'><u>1jk</u></li>
      <li id='id_3'><u>2bc</u></li>
      <li id='id_4'><u>334</u></li>
      <li id='id_5'><u>3uw</u></li>
      <li id='id_6'><u>4mo</u></li>
      <li id='id_7'><u>5eg</u></li>
      <li id='id_8'><u>668</u></li>
      <li id='id_9'><u>6y0</u></li>
      <li id='id_10'><u>7ps</u></li>
      <li id='id_11'><u>8hk</u></li>
      <li id='id_12'><u>99c</u></li>
      <li id='id_13'><u>a14</u></li>
      <li id='id_14'><u>asw</u></li>
    </ul>
    "
  `)
})

describe('text``', () => {
  it('support template literals', async () => {
    const [s1] = await exec(async () => {
      const name = createStore('alice')
      const nbsp = '\u00A0'
      using(el, () => {
        h('span', () => {
          text`username${nbsp}: ${name}`
        })
      })
      await act()
    })
    expect(s1).toMatchInlineSnapshot(`
      "
      <span>username&nbsp;: alice</span>
      "
    `)
  })
  test('text(store) edge case', async () => {
    const [s1] = await exec(async () => {
      const name = createStore('alice')
      using(el, () => {
        h('span', () => {
          //@ts-expect-error
          text(name)
        })
      })
      await act()
    })
    expect(s1).toMatchInlineSnapshot(`
      "
      <span>alice</span>
      "
    `)
  })
  test('text(string) edge case', async () => {
    const [s1] = await exec(async () => {
      using(el, () => {
        h('span', () => {
          //@ts-expect-error
          text('alice')
        })
      })
      await act()
    })
    expect(s1).toMatchInlineSnapshot(`
      "
      <span>alice</span>
      "
    `)
  })
  test('text(array) edge case', async () => {
    const [s1] = await exec(async () => {
      const name = createStore('alice')
      using(el, () => {
        h('span', () => {
          //@ts-expect-error
          text(['username: ', name])
        })
      })
      await act()
    })
    expect(s1).toMatchInlineSnapshot(`
      "
      <span>username: alice</span>
      "
    `)
  })
})
