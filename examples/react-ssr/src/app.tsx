import React from 'react'
import fetch from 'cross-fetch'
import {sample, createDomain, sample} from 'effector'
import {scopeBind} from 'effector/fork'
import {
  useStore,
  useList,
  useStoreMap,
  Provider,
  useEvent,
} from 'effector-react/ssr'
import users from './users.json'

export const app = createDomain()

export const startServer = app.createEvent<string>()
export const startClient = app.createEvent()

const $isServer = app
  .createStore(true)
  .on(startClient, () => false)
  .reset(startServer)

const selectUserEvent = app.createEvent<string>()

const fetchUser = app.createEffect<string, {name: string; friends: string[]}>({
  async handler(bin: string) {
    return (await fetch('https://api.myjson.com/bins/' + bin)).json()
  },
})

const logFx = app.createEffect({
  async handler(data) {
    console.log('data', data)
  },
})

sample({
  clock: startServer,
  target: fetchUser,
})

sample({
  clock: selectUserEvent,
  target: fetchUser,
})

const $user = app
  .createStore('guest')
  .on(fetchUser.doneData, (_, user) => user.name)

const $friends = app
  .createStore<string[]>([])
  .on(fetchUser.doneData, (_, friends) => friends)

const friendsTotal = $friends.map(list => list.length)
const $userList = app.createStore(Object.keys(users))

export const $location = $user.map(user =>
  user === 'guest' ? '/' : `/${user}`,
)

sample({
  source: $user,
  clock: fetchUser.done,
  target: logFx,
})

const Meta = () => (
  <p>
    This page is rendered on <b>{useStore($isServer) ? 'server' : 'client'}</b>
  </p>
)

const User = () => <h2>{useStore($user)}</h2>
const Friends = () => useList($friends, friend => <li>{friend}</li>)
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

  return useList($userList, userName => {
    const isSelected = useStoreMap({
      store: $user,
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

export const installHistory = app.createEvent<any>()
const changeLocation = app.createEvent<string>()

// triggered when current location not equal new location
// and new location is valid user ID
const onValidLocation = sample({
  clock: changeLocation,
  source: $location,
  filter: (loc, path) => loc !== path && path.slice(1) in users,
})

installHistory.watch(history => {
  const locationUpdate = scopeBind(changeLocation)
  history.listen(location => {
    locationUpdate(location.pathname)
  })
})

sample({
  clock: startClient,
  target: installHistory,
})

sample({
  source: onValidLocation,
  fn: path => users[path.slice(1)],
  target: fetchUser,
})
