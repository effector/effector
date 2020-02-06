// import {BrowserObject} from 'webdriverio'
import {createStore, createEvent, restore, combine, sample} from 'effector'
import {h, using, list, remap, spec, variant, node} from 'effector-dom'

// let addGlobals: Function
declare const act: (cb?: () => any) => Promise<void>
declare const initBrowser: () => Promise<void>
declare const el: HTMLElement
// let execFun: <T>(cb: (() => Promise<T> | T) | string) => Promise<T>
// let readHTML: () => string
// // let browser: BrowserObject
declare const exec: (cb: () => any) => Promise<string[]>

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
})

test('variant', async () => {
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
        list(
          {source: text, fields: ['type', 'text'], key: 'text'},
          ({fields: [type, text]}) => {
            h('div', () => {
              variant(type, {
                plain() {
                  h('span', {text})
                },
                bold() {
                  h('b', {text})
                },
                italic() {
                  h('i', {text})
                },
              })
            })
          },
        )
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
      `"<div></div><dl><dt>is connected</dt><dd>false</dd><dt>has parent</dt><dd>false</dd></dl>"`,
    )
  })
})
