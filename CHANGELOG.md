# Changelog

## effector-react 20.3.0

- Add support for react hooks in `createComponent`

## effector-react 20.2.2, effector-vue 20.1.2

- `effector-react`, `effector-vue` and `effector` itself have [compat](https://github.com/zerobias/effector/releases/tag/effector%4020.1.0) builds for compatibility with old devices without babel. In such versions, it should import `effector/compat`, not just `effector` (Fix [#173](https://github.com/zerobias/effector/issues/173))

## effector 20.1.2

- Allow typescript to refine type of payload if `event.filter({fn})` got a predicate function as a callback [PR](https://github.com/zerobias/effector/pull/170)

```typescript
import {createEvent} from 'effector'

const event = createEvent<string | number>()

const isString = (value: any): value is string => typeof value === 'string'
const isNumber = (value: any): value is number => typeof value === 'number'

const str = event.filter({fn: isString}) // Event<string>
const num = event.filter({fn: isNumber}) // Event<number>

str.watch(value => value.slice()) // OK now
num.watch(value => value.toFixed(2)) // OK now
```

- Allow typescript to refine type with `is` methods [PR](https://github.com/zerobias/effector/pull/169)

```typescript
import {is} from 'effector'

//result has type Event<any> | void
function getEvent(obj: unknown) {
  if (is.event(obj)) return obj
  if (is.store(obj)) return obj.updates
}
```

- Add new fields to definition of graph nodes ([discussion](https://github.com/zerobias/effector/issues/91#issuecomment-511397503))

## effector 20.1.1

- Add support for IE11 to `effector/compat`
- Fix flow typings for `sample`
- Allow `effector/babel-plugin` to work in browser

## effector-react 20.2.1, effector-vue 20.1.1

- Add support for IE11 to `effector-react/compat` and `effector-vue/compat`

## effector 20.1.0

- Add `effector/compat` module to use with Smart TV (Chrome 47) apps without babel (fix [#152](https://github.com/zerobias/effector/issues/152)). Starting with this release, the library code is tested by browserstack.com for compatibility with our targets, including smart tv
- Improve typescript typings for `sample` (thanks [@abliarsar](https://github.com/abliarsar)) (PR [#156](https://github.com/zerobias/effector/pull/156))
- Fix webpack issue, which generated incorrect code with some ancient targets (IE10)

## effector-react 20.2.0

- Add `effector-react/compat` module to use with Smart TV (Chrome 47) apps without babel

## effector-vue 20.1.0

- Add `effector-vue/compat` module to use with Smart TV (Chrome 47) apps without babel

## effector-react 20.1.1

- Add `useList` for efficient rendering of store lists

```js
import React from 'react'
import ReactDOM from 'react-dom'

import {createStore} from 'effector'
import {useList} from 'effector-react'

const list = createStore([
  {name: 'alice', age: 21},
  {name: 'bob', age: 20},
  {name: 'carol', age: 22},
])

const List = () => {
  // note that we don't need keys here any more
  const users = useList(list, ({name}, i) => (
    <div>
      {i}) {name}
    </div>
  ))
  return <div>{users}</div>
}

ReactDOM.render(<List />, document.getElementById('root'))
```

[try it](https://share.effector.dev/KJZx0uU5)

## effector-react 20.0.5

- Fix irrelevant react memory leak warning in a few cases

## effector-react 20.0.4

- Fix a bug in `useStore` with lack of store updates triggered by react hooks in children components

## effector-react 20.0.3

- Allow `as const` typescript assertion for `useStoreMap` keys. It helps us to infer type for `fn` arguments

```typescript
import React from 'react'
import {createStore} from 'effector'
import {useStoreMap} from 'effector-react'

type User = {
  username: string
  email: string
  bio: string
}

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

export const UserProperty = ({id, field}: {id: number; field: keyof User}) => {
  const value = useStoreMap({
    store: users,
    keys: [id, field] as const,
    fn: (users, [id, field]) => users[id][field] || null,
  })
  return <div>{value}</div>
}
```

In typescript versions below 3.4, you can still use an explicit type assertion

```typescript
import React from 'react'
import {createStore} from 'effector'
import {useStoreMap} from 'effector-react'

type User = {
  username: string
  email: string
  bio: string
}

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

export const UserProperty = ({id, field}: {id: number; field: keyof User}) => {
  const value = useStoreMap({
    store: users,
    keys: [id, field] as [number, keyof User],
    fn: (users, [id, field]) => users[id][field] || null,
  })
  return <div>{value}</div>
}
```

[as const](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) in typescript docs

## effector-react 20.0.2

- Fix bug with additional rerender in case of `useStore` argument change

## effector-react 20.0.1

- Fix flow typings for `useStoreMap`

## effector 20.0.0

- Add `merge` for merging events

```js
import {createEvent, merge} from 'effector'
const foo = createEvent()
const bar = createEvent()
const baz = merge([foo, bar])
baz.watch(v => console.log('merged event triggered: ', v))

foo(1)
// => merged event triggered: 1
bar(2)
// => merged event triggered: 2
```

[try it](https://share.effector.dev/WxUgr6dZ)

- Add `split` for pattern-matching over events

```js
import {createEvent, split} from 'effector'
const message = createEvent()

const messageByAuthor = split(message, {
  bob: ({user}) => user === 'bob',
  alice: ({user}) => user === 'alice',
})
messageByAuthor.bob.watch(({text}) => {
  console.log('[bob]: ', text)
})
messageByAuthor.alice.watch(({text}) => {
  console.log('[alice]: ', text)
})

message({user: 'bob', text: 'Hello'})
// => [bob]: Hello
message({user: 'alice', text: 'Hi bob'})
// => [alice]: Hi bob

/* default case, triggered if no one condition met */
const {__: guest} = messageByAuthor
guest.watch(({text}) => {
  console.log('[guest]: ', text)
})
message({user: 'unregistered', text: 'hi'})
// => [guest]: hi
```

[try it](https://share.effector.dev/QXZsR5yM)

- Allow `clearNode` to automatically dispose all related intermediate steps

```js
import {createEvent, clearNode} from 'effector'
const source = createEvent()
const target = source.map(x => {
  console.log('intermediate step')
  return x
})
target.watch(x => console.log('target watcher'))
source()
// => intermediate step
// => target watcher
clearNode(target)
source() // ~ no reaction ~
```

[try it](https://share.effector.dev/Ip5FAXiR)

- Fix promise warning for effects

- Add `effect.finally`

```js
import {createEffect} from 'effector'
const fetchApi = createEffect({
  handler: n =>
    new Promise(resolve => {
      setTimeout(resolve, n, `${n} ms`)
    }),
})
fetchApi.finally.watch(response => {
  console.log(response)
})

await fetchApi(10)
// => {status: 'done', result: '10 ms', params: 10}

// or

// => {status: 'fail', error: Error, params: 10}
```

[try it](https://share.effector.dev/9Aoba2lk)

- Add types for createEvent with config instead of string
- Add types for createEffect with config instead of string
- Add `event.filterMap` as new alias for `event.filter(fn)`
- Remove `extract`, `withProps`, `is.*` re-exports

## effector-react 20.0.0

- Removed unstable_createStoreProvider

## effector-vue 20.0.0

Vue adapter for effector 20

## effector-react 19.1.2

- Add `useStoreMap` hook to select part from a store. [Motivation](https://github.com/zerobias/effector/issues/118)

```js
import {createStore} from 'effector'
import {useStore, useStoreMap} from 'effector-react'
import React from 'react'
import ReactDOM from 'react-dom'

const User = ({id}) => {
  const user = useStoreMap({
    store: user$,
    keys: [id],
    fn: (users, [id]) => users[id],
  })
  return (
    <div>
      {user.name} ({user.age})
    </div>
  )
}

const UserList = () => useStore(userID$).map(id => <User id={id} key={id} />)

const user$ = createStore({
  alex: {age: 20, name: 'Alex'},
  john: {age: 30, name: 'John'},
})

const userID$ = user$.map(users => Object.keys(users))

ReactDOM.render(<UserList />, document.getElementById('root'))
```

[try it](https://share.effector.dev/EbyvGcQX)

## effector 19.1.0

- Add support for `event.filter` with common predicate functions

```js
import {createEvent} from 'effector'

const event = createEvent()

// that event will be triggered only when fn returns true
const filtered = event.filter({
  fn: x => x > 0,
})

filtered.watch(x => console.log('x =', x))

event(-2) // nothing happens
event(2) // => x = 2
```

## effector-vue 19.0.1

- Fix typescript typings [#116](https://github.com/zerobias/effector/pull/116)

## effector, effector-react, effector-vue 19.0.0

To indicate the stability of the project, we adopting semantic versioning and happy to announce version 19.0.0 for all packages. And to make the transition easier, that release contains no breaking changes; simple replacement of "^0.18.\*" to "^19.0.0" is safe for sure ☄️

## effector 0.18.10-0.18.11

- Implement event `store.updates`, representing updates of given store. Use case: watchers, which will not trigger immediately after creation (unlike `store.watch`)
  > [see spec for `store.updates` in tests](https://github.com/zerobias/effector/blob/master/src/effector/store/__tests__/updates.test.js)

```js
import {createStore, is} from 'effector'

const clicksAmount = createStore(0)
is.event(clicksAmount.updates) // => true

clicksAmount.watch(amount => {
  console.log('will be triggered with current state, immediately, sync', amount)
})

clicksAmount.updates.watch(amount => {
  console.log('will not be triggered unless store value is changed', amount)
})
```

[try it](https://effector.now.sh/try?version=0.18.10&code=JYWwDg9gTgLgBAbwMZQKYEMaoMo2qgGjmAGcBfOAMyghDgHJVLLUk8p6AoTpCAOxLwkAG2BIA1iQCCICAFc+8ALxwUGLLnwAKAAwBKTqQB0qAG6pFWkWMkz5io3LAATTKhJ64Aei9wlAPjgYKDlUbmsJaVkFGCMAd0wkAAstdGjFP0CETjhVfhIIYVQjYQgAcy16OOBhYTgAI1QgqGAystQ0Z2IQEFRnYDdhAE8iEiG+JHoiNPsYAzIDHlFIuxjHFzcSeMSUmZjMxBy8gULi0oqqmrq+CHhG5tb2zrgFIpISOEF8OFN0YVDiB9kug+O1nFM4HtFPM9EA)

## effector 0.18.9

- Allow `clearNode` to erase information from the node itself, in addition to the existing opportunity to erase subscribers (thanks @artalar)
  > [use cases for `clearNode` checked in tests](https://github.com/zerobias/effector/blob/master/src/effector/__tests__/clearNode.test.js)

## effector 0.18.7-0.18.8

- Add support for passing multiply items at once in `store.reset`

```js
import {createStore, createEvent} from 'effector'

const firstTrigger = createEvent()
const secondTrigger = createEvent()

const target = createStore(0).reset(firstTrigger, secondTrigger)
```

- Add support for `createEvent` and `createEffect` with config (see next code example)

- Add `.pending` property for effects

```js
import {createEffect} from 'effector'
import {createComponent} from 'effector-react'
import React from 'react'
const fetchApi = createEffect({
  handler: n => new Promise(resolve => setTimeout(resolve, n)),
})

fetchApi.pending.watch(console.log)

const Loading = createComponent(
  fetchApi.pending,
  (props, pending) => pending && <div>Loading...</div>,
)

fetchApi(5000)
```

it's a shorthand for common use case

```js
import {createEffect, createStore} from 'effector'

const fetchApi = createEffect()

//now you can use fetchApi.pending instead
const isLoading = createStore(false)
  .on(fetchApi, () => true)
  .on(fetchApi.done, () => false)
  .on(fetchApi.fail, () => false)
```

[try it](https://effector.now.sh/try?version=master&code=FASwtgDg9gTgLgAgN4GMYFMCGd0FEBm+6KcAvgvjFGAgOTqHFyy2iSyKobboDC10AHbpBZClRr1GJWAFpuJVuGjwEAJSwlx1OgrisUUQQGdEROCgAWAQQggEAXgRosOAkRIAKJMAQJLmIIAJgA26DAAXAieggCUjgB8CMIA7ggAChIgxuieGMZQIQBu6IkIOXAAKuDoUACucHnoBcXoADTJsbFtwKSxwMDmVrYgAHQQIkEgggDmoynYVp6GJoXooyFQM-3AK6YIADJQmFOzjs7cOPzswqKeQzZ245PTMx2eEFQQxh0Twa-xBxJTy+BB-U4zBAAMihCAAPBAEkcTq9Rmi4QB6RHALoDB4jTwARgArAAGUk7PaIWwQc6eQHA4AASDhUyKCVBfjhACMGsxBAgjLwQiAUABrBxIellfF2IlkimkBIoEXihDMBB1CBBHiY3lwfkcvxc5EQjFG+EYtkcylGfZUKCIJxBKAoOpgERwUYuHi4MIeu60Nm0fout0Br3cqBBACeo0wEHBvEsIBCQTyUEdOw0mBIABEAPIAWVGGGC4U8cJp5o6DrgsSAA)

- Introduce `sample`. Sample allows to integrate rapidly changed values with common ui states

```js
import {createStore, createEvent, sample} from 'effector'
import {createComponent} from 'effector-react'
import React from 'react'

const tickEvent = createEvent()
const tick = createStore(0).on(tickEvent, n => n + 1)

setInterval(tickEvent, 1000 / 60)

const mouseClick = createEvent()
const clicks = createStore(0).on(mouseClick, n => n + 1)

const sampled = sample(tick, clicks, (tick, clicks) => ({
  tick,
  clicks,
}))

const Monitor = createComponent(sampled, (props, {tick, clicks}) => (
  <p>
    <b>tick: </b>
    {tick}
    <br />
    <b>clicks: </b>
    {clicks}
  </p>
))

const App = () => (
  <div>
    <Monitor />
    <button onClick={mouseClick}>click to update</button>
  </div>
)
```

[see sample in action here](https://effector.now.sh/try?version=master&code=FASwtgDg9gTgLgAgN4GMYFMCGd0GU6zoA0CaWOAogG7oB2cJAzppADboC+CAZjFGAgDk6bt3QoCMQaEixEqDNnQBhftFp04XXvyEixE2AFpFE6eGjwEAJSwSefAYNNxzsq7cwSAIgHkAsg66znZwRgAm-NLAKFC0jIhwICgA1tSaCAC8pIqUNPQAFACUMXEJCEmpWTnkeJLoBQAMJQCQAHRxBZVp+QwIBbRFWQB8CLQIANQIAIwlwIzocACS9OgwVJisXck9miTTjYcIAPQIAGzNwKXxiGBQAK4Lyqw71WRK6YUlsTekL6mMN65OqEJqtDq0Ap3R4qf4pEgDIaZUbjKazK4-crMNjocLVbEQdjbVIkFBwxgI7qk8lI0YFJDABAVHbUnYU4AcIpzTGIfxxECSIG1VSyDSFAnscIIiB8CAU5BUv5szkjfqMhAAHggw3VTI1ACNht0AFya46GpDdDi6zX6mDHHVMvWGsls00a83DVDk61647a4BcjFlRAAQQgEGqxVVBWALQ14RAVEdTo1fNoAtgDptBvucAI4zizx2mSQ0KecI4w1dVQICHuEHCSg9+rzBZTHsTycDwd+fCgiGykRQ9zAmja70o7DHhUEXcEJWHo-H+qg4QAnm1MBG6OFlAALECscIFftwOaeHwBNoYWjhNYFDXhiAOkhnopAA)

[Sampling (signal processing)](<https://en.wikipedia.org/wiki/Sampling_(signal_processing)>)

- Add babel plugin for automatic naming of events, effects and stores (useful for identifying resources with SSR)
- Add babel plugin for automatic displayName for react components

```js
import {createStore, createEvent} from 'effector'
import {createComponent} from 'effector-react'
import React from 'react'

const title = createStore('welcome')

console.log('store.shortName', title.shortName)
// store.shortName title

const clickTitle = createEvent()

console.log('event.shortName', clickTitle.shortName)
// store.shortName clickTitle

const Title = createComponent(title, (props, title) => <h1>{title}</h1>)

console.log('Component.displayName', Title.displayName)
// Component.displayName Title
```

Plugins are available out from a box

`.babelrc`:

```json
{
  "plugins": ["effector/babel-plugin", "effector/babel-plugin-react"]
}
```

[see plugins in action](https://effector.now.sh/try?version=master&code=MYewdgzgLgBFCWUA2BTGBeGwBOKCGUKAylCLgBQDkA7ikqALYqUCUAUG6JCKgHRIgA5lWhkUvCAAsyUAHJ4mlADRxEfKTPlN2ncNCxJ4wANYAVNWkw58hAKIA3FGCjkdXCD3EDhlFI+cS0thyCswqwIYm5sjiGsFaKG56sNGoGFi4BCgAwiAMAA7gTi4IMSrk+dgg+RAqpagsGAB8MORsMDAAPJIAjDDg2ZHG6ADeEUZmFgC+TSP1KFOdAPS9TWwsSdx83lS5BUUBACbwEPlIeACeCcowqeLHp+dXoexAA)

- Add support for passing events and effects to watchers

```js
import {createStore, createEvent} from 'effector'

const updates = createEvent()
const state = createStore(0)
state.watch(updates)
```

- Improve execution order for sync effects
- Improve typescript typings for createApi (#102)

## effector-react 0.18.10

- Add initial props factory to `createComponent`

```js
import {users} from './feature'

const UserItem = createComponent(
  initialProps => users.map(users => users[initialProps.id]),
  (_, user) => {
    return <div>{user.username}</div>
  },
)

const UserList = createComponent(users, (_, users) => {
  return users.map(user => <TodoItem key={user.id} id={user.id} />)
})
```

- Implicitly convert objects to `createStoreObject` in `createComponent`

```js
const deposit = createEvent()
const username = createStore('zerobias')
const balance = createStore(0)

const Profile = createComponent(
  {username, balance},
  (_, {username, balance}) => {
    return (
      <div>
        Hello, {username}. Your balance is {balance}
        <button onClick={deposit}>Deposit</button>
      </div>
    )
  },
)
```

- Add `mounted` and `unmounted` events to components created by `createComponent`

```js
import {counter, increment} from './feature'

const Counter = createComponent(counter, (_, state) => {
  return (
    <div>
      {state}
      <button onClick={increment}>+</button>
    </div>
  )
})

Counter.mounted.watch(({props, state}) => {
  counter.on(increment, s => s + 1)
})

Counter.unmounted.watch(({props, state}) => {
  counter.off(increment)
})
```

- Replace `useLayoutEffect` with `useIsomorphicLayoutEffect` to support server-side rendering

## effector-react 0.18.9

- Replace `useEffect` with `useLayoutEffect` in `useStore` hook to response to state changes immediately

## 0.18.5-0.18.6

- Optimize combined stores: no intermediate steps no more

```js
import {createStore, createEvent, createStoreObject, combine} from 'effector'

const field = createStore('')
const isEmpty = field.map(value => value.length === 0)
const isTooLong = field.map(value => value.length > 12)
const isValid = combine(
  isEmpty,
  isTooLong,
  (isEmpty, isTooLong) => !isEmpty && !isTooLong,
)

const updateField = createEvent('update field value')

field.on(updateField, (state, upd) => upd.trim())

createStoreObject({
  field,
  isEmpty,
  isTooLong,
  isValid,
}).watch(data => {
  console.log(data)
})

// => {field: '', isEmpty: true, isTooLong: false, isValid: false}

updateField('bobby')

// => {field: 'bobby', isEmpty: false, isTooLong: false, isValid: true}
```

- Use the new kernel. Provide improved eventual consistency: any side effects will be triggered only after performing all pure computations

- Add `is` namespace for all type validators

```js
import {createStore, createEvent, is} from 'effector'
const store = createStore('value')
const event = createEvent('some event')

is.store(store) // => true
is.event(store) // => false
is.unit(store) // => true

is.store(event) // => false
is.event(event) // => true
is.unit(event) // => true

is.store(null) // => false
is.event(null) // => false
is.unit(null) // => false
```

- Add `clearNode` to break references and subscriptions between events, stores, etc

- Add support for custom datatypes by making `step` constructors, `createNode` and `launch` functions public

```js
import {createNode, launch, step, createStore} from 'effector'

const target = createStore(0)
target.watch(n => console.log('current n = ', n))
// => current n = 0

const customNode = createNode({
  scope: {max: 100, lastValue: -1, add: 10},
  child: [target], // you can forward later as well
  node: [
    step.compute({
      fn: (arg, {add}) => arg + add,
    }),
    step.filter({
      fn: (arg, {max, lastValue}) => arg < max && arg !== lastValue,
    }),
    step.compute({
      fn(arg, scope) {
        scope.lastValue = arg
        return arg
      },
    }),
  ],
})

launch(customNode, 3)
// => current n = 13
launch(customNode, 95)
// no reaction, as 95 + 10 > 100
launch(customNode, 5)
// => current n = 15
launch(customNode, 5)
// no reaction, as we filtered it out with step.filter
```

- Fix `fromObservable`, ensure it works with `redux` as a typical library with [`Symbol.observable`](https://github.com/benlesh/symbol-observable) support

```js
import {fromObservable} from 'effector'
import * as redux from 'redux'

const INCREMENT_STATE = 'INCREMENT_STATE'
const reduxStore = redux.createStore((state = 1, action) => {
  switch (action.type) {
    case INCREMENT_STATE:
      return state + 1
    default:
      return state
  }
})

const updateEvent = fromObservable(reduxStore)
updateEvent.watch(state => {
  console.log('redux state = ', state)
})

reduxStore.dispatch({type: INCREMENT_STATE})
// => redux state = 1
```

- Fix `version`, now it always equals version in package.json

```js
import {version} from 'effector'
console.log(version)
// => 0.18.6
```

- Add support forwarding to effects

```js
import {createEffect, createEvent, forward} from 'effector'

const trigger = createEvent()

const sideEffect = createEffect('side-effect', {
  async handler(args) {
    await new Promise(rs => setTimeout(rs, 500))
    console.log('args: ', args)
  },
})

forward({
  from: trigger,
  to: sideEffect,
})

trigger('payload')
// ~ after 500 ms
// => args: payload
```

## 0.18.3-0.18.4

- Add version variable to public exports

```js
import {version} from 'effector'
console.log(version)
```

- Add effect handler to domain [4c6ae8](https://github.com/zerobias/effector/commit/4c6ae801b301067473f583b490eefde7b3287afc)

- Add `Unit<T>` as common interface implemented by `Event`, `Effect` and `Store`

- Add `isStore`, `isEvent`, `isEffect` and `isUnit` validators

```js
import {createStore, createEvent, isStore, isEvent, isUnit} from 'effector'
const store = createStore('value')
const event = createEvent('some event')

isStore(store) // => true
isEvent(store) // => false
isUnit(store) // => true

isStore(event) // => false
isEvent(event) // => true
isUnit(event) // => true

isStore(null) // => false
isEvent(null) // => false
isUnit(null) // => false
```

- Add extended `createStore` with config

```js
import {createStore} from 'effector'
const store = createStore('value', {
  name: 'value store',
})
```

- Publish babel-plugins

- Improve naming for chrome performance timeline

- Fix typescript typings [#45](https://github.com/zerobias/effector/issues/45)

- Fix `event.prepend` bug [#35](https://github.com/zerobias/effector/issues/35)

## 0.18.2

- Fix webpack usage issue. To prevent this in a future, webpack integration test was added.

- Improve typescript typings for `createApi`. This code example became type checked

```js
import {createStore, createApi} from 'effector'

const text = createStore('')

const {addMessage, cut} = createApi(text, {
  addMessage: (text, message) => text + `\n` + message
  cut: (text, {fromIndex, size}) => text.slice(fromIndex, fromIndex + size),
})

```

- Add umd bundle to npm. Therefore, you can use cdn to include library without bundlers

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://unpkg.com/effector@0.18.2/effector.umd.js"></script>
  </head>
  <body>
    <script>
      const header = document.createElement('h1')
      document.body.appendChild(header)
      const text = effector.createStore('hello')
      text.watch(str => (header.innerHTML = str))
    </script>
  </body>
</html>
```

## 0.18.1

- Add `forward`: common function for forwarding updates and events

```js
import {forward} from 'effector'
const unsubscribe = forward({
  from: Event | Store,
  to: Event | Store | Effect,
})
```

- add support for storages in `store.on`

```js
import {createStore} from 'effector'
const name = createStore('name')
const counter = createStore(0).on(name, (count, name) => count++)
```

- Allow to pass `{handler: Function}` as second argument to `createEffect`

```js
import {createEffect} from 'effector'
const callApi = createEffect('call api', {
  async handler(url) {
    const res = await fetch(url)
    return res
  },
})
```

- Make `effect.use` return the same effect instead of void (ability to chain method calls)

```js
import {createEffect} from 'effector'
const callApi = createEffect('call api').use(url => fetch(url))
```

## 0.18.0

- Log events into Chrome devtools performance timeline
- Add notifications about errors inside computation chain
- Add `store.defaultState` property
- **effector-react**: Add `createComponent`
- Make `withProps` static function
- Make effect return plain promise

## 0.18.0-beta.10

- Add Gate

```js
import {type Gate, createGate} from 'effector-react'
const AppGate = createGate('app')
const MainPageGate = AppGate.childGate('main page')

export default ({isLoading, meta}) => (
  <div>
    Application
    <AppGate isLoading={isLoading} />
    {!isLoading && (
      <div>
        Main page
        <MainPageGate meta={meta} />
      </div>
    )}
  </div>
)
AppGate.state.watch(({isLoading}) => isLoading)
```

## 0.17.7

- Keep and replay the whole domain history for every new hook

## 0.17.6

- Add domain hooks for handle new events, effects or stores in domain.

```js
import {createDomain} from 'effector'
const mainPage = createDomain('main page')
mainPage.onCreateEvent(event => {
  console.log('new event: ', event.getType())
})
mainPage.onCreateStore(store => {
  console.log('new store: ', store.getState())
})
const mount = mainPage.event('mount')
// => new event: main page/mount

const pageStore = mainPage.store(0)
// => new store: 0
```

- Improve TypeScript typings

## 0.17.5

- Add ability to use createEvent, createEffect and createDomain without arguments (omit name)
- Fix wrong order of effect names
- Add `createWrappedDomain` to watch all nested events and updates
- Add `extract` to watch only part of nested storages
- Deprecate `.epic` method (library supports symbol-observable, so assumed that `most.from(event)` or `Observable.Of(store)` covered all use cases)

## 0.17.4

- **effector-react**: Add check for mounting of store consumer
- Add `effect.use.getCurrent()` method to get current used function
- Improve type inference in flow typing for `createStoreObject`
- Improve public ts and flow typings

## 0.17.3

- Fix effector-react typings
- Build with node 6 target, add engine field to package.json
- Add [warning](https://www.npmjs.com/package/warning) dependency

## 0.17.2

- Memoize store.map and store updates

## 0.17.0

- Added sync graph reduction engine (it's internal)
- Added store updates memoization
- Introduced effector-react

## 0.16.0

- Removed most-subject dependency
- New api

## 0.15.0-rc.2

- Add AVar: low-level interface for asynchronous variables
- Clean up builds before publishing
- Add types dir into npm build

## 0.14.0

- Add independent `createStore` method
- Replace console.warn with console.error in warnings
- Make reducers full-featured store elements (add `.get()`, `.set(x)` and `.map(fn)` methods)
- Add observable declaration to effects, events and reducers, which allow interop in this way: `from(effect)`

## 0.13.0

- Build via rollup
- New module architechture

## 0.12.0

- Exclude coverage from npm build
- Rename `mill` to `collect`
- Rename `joint` to `combine`

## 0.11.1

- Remove source files from npm release

## 0.11.0

- Add support for sync functions in `.use`
- **breaking** Rename config option `effectImplementationCheck` to `unused`

## 0.10.2

- Fix overriding of flow modules

## 0.10.0

- **breaking** Removed `rootDomain` alias for `createRootDomain`
- Fixed duplication of `typeConstant` events
- Added sync event propagation
- Catching of watch function errors
- Added warning to port errors
- Added type aliases `DomainAuto`, `EventAuto` and `EffectAuto`
- Added `mill` fluent "AND" reducer combinator

```js
import {mill, type MillType, type Reducer} from 'effector'

type A = 'foo'
type B = 'bar'
declare var reducerA: Reducer<A>
declare var reducerB: Reducer<B>

const tuple: MillType<A, B> = mill()
  .and(reducerA)
  .and(reducerB)

const union: Reducer<{
  a: A,
  b: B,
  staticField: string,
}> = tuple.joint((a: A, b: B) => ({
  a,
  b,
  staticField: 'its ok',
}))
```

## 0.9.1

- Added hot reload support for root domains
- Added support for dispatching halt action

```js
import {createHaltAction} from 'effector'

store.dispatch(createHaltAction()) //This store will be unsubscribed
```

## 0.9.0

First stable version

## Before 0.9.0

Proof of concept
