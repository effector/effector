import React from 'react'
import fetch from 'cross-fetch'
import {sample, createDomain, forward, guard, combine} from 'effector'
import {scopeBind} from 'effector/fork'
import {
  useStore,
  useList,
  useStoreMap,
  Provider,
  useEvent,
} from 'effector-react/ssr'
import domainConfig from '../domain.json'
import {app} from './domain'

export const startServer = app.createEvent<string>()
export const startClient = app.createEvent()

const isServer = app
  .createStore(true)
  .on(startClient, () => false)
  .reset(startServer)

const selectUserEvent = app.createEvent<string>()

const fetchUser = app.createEffect<string, {name: string; friends: string[]}>({
  async handler(user) {
    const req = await fetch(`https://${domainConfig.domainName}/api/${user}`, {
      method: 'POST',
    })
    return req.json()
  },
})

const fetchAllUsers = app.createEffect({
  async handler() {
    const req = await fetch(`https://${domainConfig.domainName}/api`, {
      method: 'POST',
    })
    return req.json()
  },
})

const log = app.createEffect({
  async handler(data) {
    console.log('data', data)
  },
})

forward({
  from: startServer,
  to: [fetchUser, fetchAllUsers],
})

forward({
  from: selectUserEvent,
  to: fetchUser,
})

const user = app.createStore('guest')
const friends = app.createStore<string[]>([])
const friendsTotal = friends.map(list => list.length)
const userList = app
  .createStore([])
  .on(fetchAllUsers.done, (_, {result}) => result)

export const location$ = user.map(user =>
  user === 'guest' ? '/' : `/user/${user}`,
)

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
        <button onClick={() => selectUser(userName)} disabled={isSelected}>
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

export const installHistory = app.createEvent<any>()
const changeLocation = app.createEvent<string>()

// triggered when current location not equal new location
// and new location is valid user ID
const onValidLocation = guard(changeLocation, {
  filter: sample({
    source: combine({loc: location$, users: userList}),
    clock: changeLocation,
    fn: ({loc, users}, path) =>
      loc !== path && users.includes(path.replace('/user/', '')),
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
  fn: path => path.replace('/user/', ''),
  target: fetchUser,
})
