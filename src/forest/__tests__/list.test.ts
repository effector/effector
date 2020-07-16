import {BrowserObject} from 'webdriverio'
import {createStore, createEvent, restore, combine} from 'effector'
import {h, using, list, remap, spec} from 'forest'

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

it('support list sequences without keys', async () => {
  const [s1, s2, s3, s4] = await exec(async () => {
    const addTeamAMember = createEvent<string>()
    const removeTeamAMember = createEvent<string>()
    const teamA = createStore([{name: 'alice'}, {name: 'bob'}])
    const teamB = createStore([{name: 'carol'}])

    teamA
      .on(addTeamAMember, (list, name) => [...list, {name}])
      .on(removeTeamAMember, (list, name) => list.filter(e => e.name !== name))

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
  expect(s1).toMatchInlineSnapshot(`
    "
    <div>alice</div>
    <div>bob</div>
    <div>carol</div>
    "
  `)

  expect(s2).toMatchInlineSnapshot(`
    "
    <div>alice</div>
    <div>bob</div>
    <div>carol</div>
    <div>carol</div>
    "
  `)

  expect(s3).toMatchInlineSnapshot(`
    "
    <div>alice</div>
    <div>bob</div>
    <div>carol</div>
    <div>charlie</div>
    <div>carol</div>
    "
  `)

  expect(s4).toMatchInlineSnapshot(`
    "
    <div>alice</div>
    <div>bob</div>
    <div>charlie</div>
    <div>carol</div>
    "
  `)
})
it('support list sequences with keys', async () => {
  const [s1, s2, s3, s4] = await exec(async () => {
    const addTeamAMember = createEvent<string>()
    const removeTeamAMember = createEvent<string>()
    const teamA = createStore([{name: 'alice'}, {name: 'bob'}])
    const teamB = createStore([{name: 'carol'}])

    teamA
      .on(addTeamAMember, (list, name) => [...list, {name}])
      .on(removeTeamAMember, (list, name) => list.filter(e => e.name !== name))

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
  expect(s1).toMatchInlineSnapshot(`
    "
    <div>alice</div>
    <div>bob</div>
    <div>carol</div>
    "
  `)

  expect(s2).toMatchInlineSnapshot(`
    "
    <div>alice</div>
    <div>bob</div>
    <div>carol</div>
    <div>carol</div>
    "
  `)

  expect(s3).toMatchInlineSnapshot(`
    "
    <div>alice</div>
    <div>bob</div>
    <div>carol</div>
    <div>charlie</div>
    <div>carol</div>
    "
  `)

  expect(s4).toMatchInlineSnapshot(`
    "
    <div>alice</div>
    <div>bob</div>
    <div>charlie</div>
    <div>carol</div>
    "
  `)
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
  expect(s1).toMatchInlineSnapshot(`
    "

    "
  `)
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
  expect(s1).toMatchInlineSnapshot(`
    "
    <li>alice</li>
    <li>bob</li>
    "
  `)
})
it('insert its items before sibling nodes', async () => {
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
  expect(s1).toMatchInlineSnapshot(`
    "
    <p>alice</p>
    <p>bob</p>
    <footer>Users</footer>
    "
  `)
  expect(s2).toMatchInlineSnapshot(`
    "
    <p>alice</p>
    <p>bob</p>
    <p>carol</p>
    <footer>Users</footer>
    "
  `)
})
