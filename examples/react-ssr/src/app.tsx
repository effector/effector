import React from 'react'
import fetch from 'cross-fetch'
import {sample, createDomain, forward, guard} from 'effector'
import {
  useStore,
  useList,
  useStoreMap,
  Provider,
  useEvent,
  scopeBind,
} from 'effector-react/ssr'
import users from './users.json'

export const app = createDomain()

export const startServer = app.event<string>()
export const startClient = app.event()

const isServer = app.store(true)
  .on(startClient, () => false)
  .reset(startServer)

const selectUserEvent = app.event<string>()

const fetchUser = app.effect<string, {name: string; friends: string[]}>({
  async handler(bin: string) {
    return (await fetch('https://api.myjson.com/bins/' + bin)).json()
  },
})

const log = app.effect({
  async handler(data) {
    console.log('data', data)
  },
})

forward({
  from: startServer,
  to: fetchUser,
})

forward({
  from: selectUserEvent,
  to: fetchUser,
})

const user = app.store('guest')
const friends = app.store<string[]>([])
const friendsTotal = friends.map(list => list.length)
const userList = app.store(Object.keys(users))

export const location$ = user.map(user => (user === 'guest' ? '/' : `/${user}`))

user.on(fetchUser.done, (_, {result}) => result.name)
friends.on(fetchUser.done, (_, {result}) => result.friends)

sample({
  source: user,
  clock: fetchUser.done,
  target: log,
})
const Meta = () => (
  <p>
    This page is rendered on <b>{useStore(isServer) ? 'server' : 'client'}</b>
  </p>
)
const User = () => <h2>{useStore(user)}</h2>
const Friends = () => useList(friends, friend => <li>{friend}</li>)
const Total = () => <small>Total: {useStore(friendsTotal)}</small>
const FetchingStatus = () => {
  const pending = useStore(fetchUser.pending)
  return (
    <p>
      <small>Status: {pending ? 'fetching...' : 'ready'}</small>
    </p>
  )
}
const UserList = () => {
  const selectUser = useEvent(selectUserEvent)
  return useList(userList, userName => {
    const isSelected = useStoreMap({
      store: user,
      keys: [userName],
      fn: (selected, [current]) => selected === current,
    })
    return (
      <>
        <br />
        <button
          onClick={() => selectUser(users[userName])}
          disabled={isSelected}>
          {userName}
        </button>
      </>
    )
  })
}
export const App = ({root}) => (
  <Provider value={root}>
    <User />
    <FetchingStatus />
    <h3>Friends:</h3>
    <ol>
      <Friends />
    </ol>
    <Total />
    <h3>Users:</h3>
    <UserList />
    <Meta />
  </Provider>
)

export const installHistory = app.event<any>()
const changeLocation = app.event<string>()

// triggered when current location not equal new location
// and new location is valid user ID
const onValidLocation = guard(changeLocation, {
  filter: sample({
    source: location$,
    clock: changeLocation,
    fn: (loc, path) => loc !== path && path.slice(1) in users,
  }),
})

installHistory.watch(history => {
  const locationUpdate = scopeBind(changeLocation)
  history.listen(location => {
    locationUpdate(location.pathname)
  })
})

forward({
  from: startClient,
  to: installHistory,
})

sample({
  source: onValidLocation,
  fn: path => users[path.slice(1)],
  target: fetchUser,
})
