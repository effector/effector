/* eslint-disable no-unused-vars */
import React from 'react'

import {createStore} from 'effector'
import {useStoreMap} from 'effector-react'

type User = {
  username: string
  email: string
  bio: string
}
type Props = {
  id: number
  field: keyof User
}
describe('useStoreMap', () => {
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
  describe('infer type with `as const`', () => {
    it('should pass typecheck', () => {
      const UserProperty = ({id, field}: Props) => {
        const value = useStoreMap({
          store: users,
          keys: [id, field] as const,
          fn: (users, [id, field]) => users[id][field] || null,
        })
        return <div>{value}</div>
      }
    })
    it('should fail typecheck', () => {
      const UserProperty = ({id, field}: Props) => {
        const value = useStoreMap({
          store: users,
          keys: [id] as const,
          fn: (users, [id, field]) => null,
        })
        return <div>{value}</div>
      }
    })
  })
  describe('infer type with `as [explicit, tuple]`', () => {
    it('should pass typecheck', () => {
      const UserProperty = ({id, field}: Props) => {
        const value = useStoreMap({
          store: users,
          keys: [id, field] as [number, keyof User],
          fn: (users, [id, field]) => users[id][field] || null,
        })
        return <div>{value}</div>
      }
    })
    it('should fail typecheck', () => {
      const UserProperty = ({id, field}: Props) => {
        const value = useStoreMap({
          store: users,
          keys: [id, field] as [number, keyof User],
          fn: (users, [id, field]: [number, number]) => null,
        })
        return <div>{value}</div>
      }
    })
  })
  it('unable to infer tuple type without `as`', () => {
    const UserProperty = ({id, field}: Props) => {
      const value = useStoreMap({
        store: users,
        keys: [id, field],
        fn: (users, [id, field]) => users[id][field] || null,
      })
      return <div>{value}</div>
    }
  })
})
