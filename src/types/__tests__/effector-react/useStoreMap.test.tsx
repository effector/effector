/* eslint-disable no-unused-vars */
import React from 'react'

import {createStore} from 'effector'
import {useStoreMap} from 'effector-react'

const typecheck = '{global}'

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
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    it('should fail typecheck', () => {
      const UserProperty = ({id, field}: Props) => {
        const value = useStoreMap({
          store: users,
          keys: [id] as const,
          //@ts-expect-error
          fn: (users, [id, field]) => null,
        })
        return <div>{value}</div>
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Tuple type 'readonly [number]' of length '1' has no element at index '1'.
        "
      `)
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
      expect(typecheck).toMatchInlineSnapshot(`
        "
        no errors
        "
      `)
    })
    it('should fail typecheck', () => {
      const UserProperty = ({id, field}: Props) => {
        const value = useStoreMap({
          store: users,
          //@ts-expect-error
          keys: [id, field] as [number, keyof User],
          fn: (users, [id, field]: [number, number]) => null,
        })
        //@ts-expect-error
        return <div>{value}</div>
      }
      expect(typecheck).toMatchInlineSnapshot(`
        "
        Type '[number, keyof User]' is not assignable to type '[number, number]'.
          Type at position 1 in source is not compatible with type at position 1 in target.
            Type 'string' is not assignable to type 'number'.
              Type 'string' is not assignable to type 'number'.
        Type 'unknown' is not assignable to type 'ReactNode'.
          Type 'unknown' is not assignable to type 'ReactPortal'.
        "
      `)
    })
  })
  it('can infer tuple type without `as`', () => {
    const UserProperty = ({id, field}: Props) => {
      const value = useStoreMap({
        store: users,
        keys: [id, field],
        fn: (users, [id, field]) => users[id][field] || null,
      })
      return <div>{value}</div>
    }
    expect(typecheck).toMatchInlineSnapshot(`
      "
      no errors
      "
    `)
  })
})

test('useStoreMap(store, fn)', () => {
  const store = createStore({foo: 0, bar: 'ok'})
  const Foo = () => {
    const value = useStoreMap(store, ({foo}) => foo)
    return <div>{value}</div>
  }
  expect(typecheck).toMatchInlineSnapshot(`
    "
    no errors
    "
  `)
})
