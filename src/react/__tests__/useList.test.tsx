import * as React from 'react'
//@ts-expect-error
import {render, container, act} from 'effector/fixtures/react'

import {
  createStore,
  createEvent,
  restore,
  createApi,
  createEffect,
} from 'effector'

import {useList, useStore} from 'effector-react'
import {argumentHistory} from 'effector/fixtures'

it('should render store items', async () => {
  const list = createStore(['foo', 'bar', 'baz'])

  const List = () => (
    <div>
      {useList(list, (item, index) => (
        <div>
          {item}
          {index}
        </div>
      ))}
    </div>
  )

  await render(<List />)
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div>
      <div>
        foo
        0
      </div>
      <div>
        bar
        1
      </div>
      <div>
        baz
        2
      </div>
    </div>
  `)
})

it('should handle updates without dull re-renders', async () => {
  const fn = jest.fn()
  const update = createEvent<{key: number; value: string}>()
  const list = createStore(['foo', 'bar', 'baz']).on(
    update,
    (list, {key, value}) => {
      const upd = [...list]
      upd[key] = value
      return upd
    },
  )

  const List = () => (
    <div>
      {useList(list, (item, index) => {
        fn(item)
        return (
          <div>
            {item}
            {index}
          </div>
        )
      })}
    </div>
  )
  await render(<List />)
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div>
      <div>
        foo
        0
      </div>
      <div>
        bar
        1
      </div>
      <div>
        baz
        2
      </div>
    </div>
  `)
  expect(fn).toBeCalledTimes(3)
  await act(async () => {
    update({key: 1, value: 'update'})
  })
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div>
      <div>
        foo
        0
      </div>
      <div>
        update
        1
      </div>
      <div>
        baz
        2
      </div>
    </div>
  `)
  expect(fn).toBeCalledTimes(4)
})

it('should handle inserts without dull re-renders', async () => {
  const fn = jest.fn()
  const insert = createEvent<string>()
  const list = createStore(['foo', 'bar', 'baz']).on(insert, (list, value) => [
    ...list,
    value,
  ])

  const List = () => (
    <div>
      {useList(list, (item, index) => {
        fn(item)
        return (
          <div>
            {item}
            {index}
          </div>
        )
      })}
    </div>
  )

  await render(<List />)
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div>
      <div>
        foo
        0
      </div>
      <div>
        bar
        1
      </div>
      <div>
        baz
        2
      </div>
    </div>
  `)
  expect(fn).toBeCalledTimes(3)
  await act(async () => {
    insert('update')
  })
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div>
      <div>
        foo
        0
      </div>
      <div>
        bar
        1
      </div>
      <div>
        baz
        2
      </div>
      <div>
        update
        3
      </div>
    </div>
  `)
  expect(fn).toBeCalledTimes(4)
})

it('should update when keys are changed', async () => {
  const changeDependency = createEvent<string>()
  const list = createStore(['foo', 'bar', 'baz'])
  const dependency = restore(changeDependency, 'dep')

  const List = () => {
    const dep = useStore(dependency)
    return (
      <div>
        {useList(list, {
          keys: [dep],
          fn: item => (
            <div>
              {item} {dep}
            </div>
          ),
        })}
      </div>
    )
  }

  await render(<List />)
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div>
      <div>
        foo
         
        dep
      </div>
      <div>
        bar
         
        dep
      </div>
      <div>
        baz
         
        dep
      </div>
    </div>
  `)
  await act(async () => {
    changeDependency('changed')
  })
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div>
      <div>
        foo
         
        changed
      </div>
      <div>
        bar
         
        changed
      </div>
      <div>
        baz
         
        changed
      </div>
    </div>
  `)
})

describe('zombie childrens are not allowed', () => {
  test('fast remount', async () => {
    const fn = jest.fn()
    const members = createStore([{name: 'alice'}, {name: 'bob'}])
    const {removeMember, addMember} = createApi(members, {
      addMember: (list, name: string) => [...list, {name}],
      removeMember: (list, name: string) =>
        list.filter(item => item.name !== name),
    })
    const sendWelcomeMessage = createEffect(fn)

    const List = () => (
      <div>
        {useList(members, {
          getKey: ({name}) => name,
          fn({name}) {
            React.useLayoutEffect(() => {
              sendWelcomeMessage(name)
            }, [])
            return <div>{name}</div>
          },
        })}
      </div>
    )

    await render(<List />)
    await act(async () => {
      removeMember('bob')
      addMember('carol')
      // await 0
      addMember('bob')
    })
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <div>
          alice
        </div>
        <div>
          carol
        </div>
        <div>
          bob
        </div>
      </div>
    `)
    expect(argumentHistory(fn)).toMatchInlineSnapshot(`
      Array [
        "alice",
        "bob",
        "carol",
      ]
    `)
  })
})

test('getKey', async () => {
  const fn = jest.fn()
  const fn2 = jest.fn()
  const renameUser = createEvent<{id: number; name: string}>()
  const removeUser = createEvent<number>()
  const sortById = createEvent()
  const $members = createStore([
    {name: 'alice', id: 1},
    {name: 'bob', id: 3},
    {name: 'carol', id: 2},
  ])
    .on(renameUser, (list, {id, name}) =>
      list.map(e => (e.id === id ? {id, name} : e)),
    )
    .on(removeUser, (list, id) => list.filter(e => e.id !== id))
    .on(sortById, list => [...list].sort((a, b) => a.id - b.id))

  const PlainComponent = React.memo(
    ({name, id}: {name: string; id: number}) => {
      fn2({name, id})
      return <p>{name}</p>
    },
  )
  const ListPlain = () => (
    <div>
      {useStore($members).map(({name, id}) => {
        return <PlainComponent key={id} name={name} id={id} />
      })}
    </div>
  )
  const List = () => (
    <div>
      {useList($members, {
        fn({name}, id) {
          fn({name, id})
          return <p>{name}</p>
        },
        getKey: e => e.id,
      })}
    </div>
  )
  const App = () => (
    <>
      <List />
      <ListPlain />
    </>
  )

  await render(<App />)
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div>
      <p>
        alice
      </p>
      <p>
        bob
      </p>
      <p>
        carol
      </p>
    </div>
  `)
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      Object {
        "id": 1,
        "name": "alice",
      },
      Object {
        "id": 3,
        "name": "bob",
      },
      Object {
        "id": 2,
        "name": "carol",
      },
    ]
  `)
  expect(argumentHistory(fn2)).toMatchInlineSnapshot(`
    Array [
      Object {
        "id": 1,
        "name": "alice",
      },
      Object {
        "id": 3,
        "name": "bob",
      },
      Object {
        "id": 2,
        "name": "carol",
      },
    ]
  `)
  await act(async () => {
    sortById()
  })
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div>
      <p>
        alice
      </p>
      <p>
        carol
      </p>
      <p>
        bob
      </p>
    </div>
  `)
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      Object {
        "id": 1,
        "name": "alice",
      },
      Object {
        "id": 3,
        "name": "bob",
      },
      Object {
        "id": 2,
        "name": "carol",
      },
      Object {
        "id": 2,
        "name": "carol",
      },
      Object {
        "id": 3,
        "name": "bob",
      },
    ]
  `)
  expect(argumentHistory(fn2)).toMatchInlineSnapshot(`
    Array [
      Object {
        "id": 1,
        "name": "alice",
      },
      Object {
        "id": 3,
        "name": "bob",
      },
      Object {
        "id": 2,
        "name": "carol",
      },
    ]
  `)
  await act(async () => {
    renameUser({id: 2, name: 'charlie'})
  })
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div>
      <p>
        alice
      </p>
      <p>
        charlie
      </p>
      <p>
        bob
      </p>
    </div>
  `)
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      Object {
        "id": 1,
        "name": "alice",
      },
      Object {
        "id": 3,
        "name": "bob",
      },
      Object {
        "id": 2,
        "name": "carol",
      },
      Object {
        "id": 2,
        "name": "carol",
      },
      Object {
        "id": 3,
        "name": "bob",
      },
      Object {
        "id": 2,
        "name": "charlie",
      },
    ]
  `)
  expect(argumentHistory(fn2)).toMatchInlineSnapshot(`
    Array [
      Object {
        "id": 1,
        "name": "alice",
      },
      Object {
        "id": 3,
        "name": "bob",
      },
      Object {
        "id": 2,
        "name": "carol",
      },
      Object {
        "id": 2,
        "name": "charlie",
      },
    ]
  `)
  await act(async () => {
    removeUser(2)
  })
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div>
      <p>
        alice
      </p>
      <p>
        bob
      </p>
    </div>
  `)
  expect(argumentHistory(fn)).toMatchInlineSnapshot(`
    Array [
      Object {
        "id": 1,
        "name": "alice",
      },
      Object {
        "id": 3,
        "name": "bob",
      },
      Object {
        "id": 2,
        "name": "carol",
      },
      Object {
        "id": 2,
        "name": "carol",
      },
      Object {
        "id": 3,
        "name": "bob",
      },
      Object {
        "id": 2,
        "name": "charlie",
      },
      Object {
        "id": 3,
        "name": "bob",
      },
    ]
  `)
  expect(argumentHistory(fn2)).toMatchInlineSnapshot(`
    Array [
      Object {
        "id": 1,
        "name": "alice",
      },
      Object {
        "id": 3,
        "name": "bob",
      },
      Object {
        "id": 2,
        "name": "carol",
      },
      Object {
        "id": 2,
        "name": "charlie",
      },
    ]
  `)
})
