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
  expect(s1).toMatchInlineSnapshot(
    `"<header><h1>App title</h1></header><ul><li>alice</li><li>bob</li><li>carol</li></ul>"`,
  )
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
  expect(s1).toMatchInlineSnapshot(`"<div>text value</div>"`)
  expect(s2).toMatchInlineSnapshot(`"<div>updated</div>"`)
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
  expect(s1).toMatchInlineSnapshot(
    `"<div style=\\"justify-self: start;\\">content</div>"`,
  )
  expect(s2).toMatchInlineSnapshot(
    `"<div style=\\"justify-self: center;\\">content</div>"`,
  )
})

it('works with browserstack', async () => {
  const [s1] = await exec(async () => {
    const text = createStore('effector-dom app')

    using(el, () => {
      h('div', {
        text,
      })
    })
    await act()
  })
  expect(s1).toBe('<div>effector-dom app</div>')
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
  expect(s1).toMatchInlineSnapshot(
    `"<div style=\\"justify-self: var(--align); --align:start;\\">content</div>"`,
  )
  expect(s2).toMatchInlineSnapshot(
    `"<div style=\\"justify-self: var(--align); --align:center;\\">content</div>"`,
  )
})

describe('list', () => {
  it('support list sequences without keys', async () => {
    const [s1, s2, s3, s4] = await exec(async () => {
      const addTeamAMember = createEvent<string>()
      const removeTeamAMember = createEvent<string>()
      const teamA = createStore([{name: 'alice'}, {name: 'bob'}])
      const teamB = createStore([{name: 'carol'}])

      teamA
        .on(addTeamAMember, (list, name) => [...list, {name}])
        .on(removeTeamAMember, (list, name) =>
          list.filter(e => e.name !== name),
        )

      using(el, () => {
        list(teamA, ({store}) => {
          h('div', {
            text: remap(store, 'name'),
          })
        })
        list(teamB, ({store}) => {
          h('div', {
            text: remap(store, 'name'),
          })
        })
      })
      await act()
      await act(() => {
        addTeamAMember('carol')
      })
      await act(() => {
        addTeamAMember('charlie')
      })
      await act(() => {
        removeTeamAMember('carol')
      })
    })
    expect(s1).toMatchInlineSnapshot(
      `"<div>alice</div><div>bob</div><div>carol</div>"`,
    )

    expect(s2).toMatchInlineSnapshot(
      `"<div>alice</div><div>bob</div><div>carol</div><div>carol</div>"`,
    )

    expect(s3).toMatchInlineSnapshot(
      `"<div>alice</div><div>bob</div><div>carol</div><div>charlie</div><div>carol</div>"`,
    )

    expect(s4).toMatchInlineSnapshot(
      `"<div>alice</div><div>bob</div><div>charlie</div><div>carol</div>"`,
    )
  })
  it('support list sequences with keys', async () => {
    const [s1, s2, s3, s4] = await exec(async () => {
      const addTeamAMember = createEvent<string>()
      const removeTeamAMember = createEvent<string>()
      const teamA = createStore([{name: 'alice'}, {name: 'bob'}])
      const teamB = createStore([{name: 'carol'}])

      teamA
        .on(addTeamAMember, (list, name) => [...list, {name}])
        .on(removeTeamAMember, (list, name) =>
          list.filter(e => e.name !== name),
        )

      using(el, () => {
        list(
          {source: teamA, key: 'name', fields: ['name']},
          ({fields: [name]}) => {
            h('div', {text: name})
          },
        )
        list(
          {source: teamB, key: 'name', fields: ['name']},
          ({fields: [name]}) => {
            h('div', {text: name})
          },
        )
      })
      await act()
      await act(() => {
        addTeamAMember('carol')
      })
      await act(() => {
        addTeamAMember('charlie')
      })
      await act(() => {
        removeTeamAMember('carol')
      })
    })
    expect(s1).toMatchInlineSnapshot(
      `"<div>alice</div><div>bob</div><div>carol</div>"`,
    )

    expect(s2).toMatchInlineSnapshot(
      `"<div>alice</div><div>bob</div><div>carol</div><div>carol</div>"`,
    )

    expect(s3).toMatchInlineSnapshot(
      `"<div>alice</div><div>bob</div><div>carol</div><div>charlie</div><div>carol</div>"`,
    )

    expect(s4).toMatchInlineSnapshot(
      `"<div>alice</div><div>bob</div><div>charlie</div><div>carol</div>"`,
    )
  })
  it('support text nodes', async () => {
    const [s1] = await exec(async () => {
      const text = createStore(['foo', 'bar'])
      using(el, () => {
        list(text, ({store}) => {
          spec({text: store})
        })
      })
      await act()
    })
    expect(s1).toMatchInlineSnapshot(`""`)
  })
  describe('support visible changes', () => {
    it('works with non-keyed list', async () => {
      const [s1, s2] = await exec(async () => {
        const setTeam = createEvent<'a' | 'b'>()
        const currentTeam = restore(setTeam, 'a')
        const users = createStore([
          {name: 'alice', team: 'a'},
          {name: 'bob', team: 'b'},
          {name: 'carol', team: 'b'},
          {name: 'dave', team: 'a'},
          {name: 'eve', team: 'a'},
        ])

        using(el, () => {
          list(users, ({store}) => {
            h('p', () => {
              spec({
                visible: combine(
                  currentTeam,
                  store,
                  (current, {team}) => team === current,
                ),
              })
              h('div', {
                text: remap(store, 'name'),
              })
              h('div', {
                text: remap(store, 'team'),
              })
            })
          })
        })
        await act()
        await act(() => {
          setTeam('b')
        })
      })
      expect(s1).toMatchInlineSnapshot(
        `"<p><div>alice</div><div>a</div></p><p><div>dave</div><div>a</div></p><p><div>eve</div><div>a</div></p>"`,
      )
      expect(s2).toMatchInlineSnapshot(
        `"<p><div>bob</div><div>b</div></p><p><div>carol</div><div>b</div></p>"`,
      )
    })
    it('works with keyed list', async () => {
      const [s1, s2] = await exec(async () => {
        type User = {
          team: 'a' | 'b'
          name: string
        }
        const setTeam = createEvent<'a' | 'b'>()
        const currentTeam = restore(setTeam, 'a')
        const users = createStore<User[]>([
          {name: 'alice', team: 'a'},
          {name: 'bob', team: 'b'},
          {name: 'carol', team: 'b'},
          {name: 'dave', team: 'a'},
          {name: 'eve', team: 'a'},
        ])

        using(el, () => {
          list(
            {source: users, key: 'name', fields: ['name', 'team']},
            ({fields: [name, team]}) => {
              h('p', () => {
                spec({
                  visible: combine(
                    currentTeam,
                    team,
                    (current, team) => team === current,
                  ),
                })
                h('div', {text: name})
                h('div', {text: team})
              })
            },
          )
        })
        await act()
        await act(() => {
          setTeam('b')
        })
      })
      expect(s1).toMatchInlineSnapshot(
        `"<p><div>alice</div><div>a</div></p><p><div>dave</div><div>a</div></p><p><div>eve</div><div>a</div></p>"`,
      )
      expect(s2).toMatchInlineSnapshot(
        `"<p><div>bob</div><div>b</div></p><p><div>carol</div><div>b</div></p>"`,
      )
    })
  })
  it('create list from [fn] option', async () => {
    const [s1] = await exec(async () => {
      const users = createStore([
        {name: 'alice', id: 1},
        {name: 'bob', id: 2},
      ])

      using(el, () => {
        list({
          source: users,
          key: 'id',
          fn: ({store}) => {
            h('li', {text: store.map(v => v.name)})
          },
        })
      })
      await act()
    })
    expect(s1).toMatchInlineSnapshot(`"<li>alice</li><li>bob</li>"`)
  })
  it.skip('insert its items before sibling nodes', async () => {
    const [s1, s2] = await exec(async () => {
      const addUser = createEvent<string>()
      const users = createStore(['alice', 'bob']).on(addUser, (list, user) => [
        ...list,
        user,
      ])
      using(el, () => {
        list(users, ({store}) => {
          h('p', {text: store})
        })
        h('footer', {text: 'Users'})
      })
      await act()
      await act(() => {
        addUser('carol')
      })
    })
    expect(s1).toMatchInlineSnapshot(
      `"<p>alice</p><p>bob</p><footer>Users</footer>"`,
    )
    expect(s2).toMatchInlineSnapshot(
      `"<p>alice</p><p>bob</p><p>carol</p><footer>Users</footer>"`,
    )
  })
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
  expect(s1).toMatchInlineSnapshot(
    `"<section><div>alice</div><div>bob</div><div>carol</div></section><section></section>"`,
  )
  expect(s2).toMatchInlineSnapshot(
    `"<section><div>alice</div><div>bob</div><div>carol</div></section><section><div>[0] alice</div><div>[0] bob</div><div>[0] carol</div></section>"`,
  )
  expect(s3).toMatchInlineSnapshot(
    `"<section><div>alice</div><div>carol</div></section><section><div>[0] alice</div><div>[0] bob</div><div>[0] carol</div></section>"`,
  )
  expect(s4).toMatchInlineSnapshot(
    `"<section><div>alice</div><div>carol</div></section><section><div>[0] alice</div><div>[0] bob</div><div>[0] carol</div><div>[1] alice</div><div>[1] carol</div></section>"`,
  )
})

describe('visible', () => {
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
})
describe('variant', () => {
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
    expect(s1).toMatchInlineSnapshot(
      `"<div></div><dl><dt>is connected</dt><dd>true</dd><dt>has parent</dt><dd>true</dd></dl>"`,
    )
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
        console.log(e, isPrevented)
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
        console.log(e, isPrevented)
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
  expect(s1).toMatchInlineSnapshot(`"<div>aaabbb</div>"`)
  expect(s2).toMatchInlineSnapshot(`"<div>ccccdddd</div>"`)
})
