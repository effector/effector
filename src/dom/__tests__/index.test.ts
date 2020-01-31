// import {BrowserObject} from 'webdriverio'
import {createStore, createEvent, restore, combine} from 'effector'
import {h, using, list, remap, spec} from 'effector-dom'

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
      `"<div>alice</div><div>bob</div><div>carol</div><div>carol</div><div>charlie</div>"`,
    )

    expect(s4).toMatchInlineSnapshot(
      `"<div>alice</div><div>bob</div><div>carol</div><div>charlie</div>"`,
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
        list({source: teamA, key: 'name'}, ({store}) => {
          h('div', {
            text: remap(store, 'name'),
          })
        })
        list({source: teamB, key: 'name'}, ({store}) => {
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
      `"<div>alice</div><div>bob</div><div>carol</div><div>carol</div><div>charlie</div>"`,
    )

    expect(s4).toMatchInlineSnapshot(
      `"<div>alice</div><div>bob</div><div>carol</div><div>charlie</div>"`,
    )
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
          list({source: users, key: 'name'}, ({store}) => {
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
  })
})
