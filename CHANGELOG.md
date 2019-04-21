# Changelog

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
