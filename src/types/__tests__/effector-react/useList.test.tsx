/* eslint-disable no-unused-vars */
import React from 'react'

import {createStore} from 'effector'
import {useList} from 'effector-react'

const typecheck = '{global}'

type User = {
  username: string
  email: string
  bio: string
}
test('plain array support', () => {
  const users = createStore<User[]>([
    {
      username: 'alice',
      email: 'alice@example.com',
      bio: '. . .',
    },
    {
      username: 'bob',
      email: 'bob@example.com',
      bio: '~/ - /~',
    },
    {
      username: 'carol',
      email: 'carol@example.com',
      bio: '- - -',
    },
  ])
  const UserList = () => useList(users, ({username}) => <p>{username}</p>)

  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors
    "
  `)
})

test('readonly array support', () => {
  const users = createStore<ReadonlyArray<User>>([
    {
      username: 'alice',
      email: 'alice@example.com',
      bio: '. . .',
    },
    {
      username: 'bob',
      email: 'bob@example.com',
      bio: '~/ - /~',
    },
    {
      username: 'carol',
      email: 'carol@example.com',
      bio: '- - -',
    },
  ])
  const UserList = () => useList(users, ({username}) => <p>{username}</p>)

  expect(typecheck).toMatchInlineSnapshot(`
    "
    --typescript--
    no errors
    "
  `)
})

test("usage as components' return value", () => {
  const users = createStore<User[]>([
    {
      username: 'alice',
      email: 'alice@example.com',
      bio: '. . .',
    },
    {
      username: 'bob',
      email: 'bob@example.com',
      bio: '~/ - /~',
    },
    {
      username: 'carol',
      email: 'carol@example.com',
      bio: '- - -',
    },
  ])
  const UserList = () => useList(users, ({username}) => <p>{username}</p>)
  const App = () => (
    <div>
      <UserList />
    </div>
  )
  expect(typecheck).toMatchInlineSnapshot(`
"
--typescript--
no errors
"
`)
})
