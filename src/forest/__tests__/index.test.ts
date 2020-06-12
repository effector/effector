import {BrowserObject} from 'webdriverio'
import {createStore, createEvent, restore, combine, sample} from 'effector'
import {h, using, list, remap, spec, variant, node, handler} from 'effector-dom'

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
    <div style='justify-self: start;'>content</div>
    "
  `)
  expect(s2).toMatchInlineSnapshot(`
    "
    <div style='justify-self: center;'>content</div>
    "
  `)
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
    <div style='justify-self: var(--align); --align: start;'>
      content
    </div>
    "
  `)
  expect(s2).toMatchInlineSnapshot(`
    "
    <div style='justify-self: var(--align); --align: center;'>
      content
    </div>
    "
  `)
})

it('remove watch calls after node removal', async () => {
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

describe('handler', () => {
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
