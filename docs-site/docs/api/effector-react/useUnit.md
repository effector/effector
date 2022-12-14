---
title: useUnit
lang: en-US
---

# useUnit

::: info since
`useUnit` introduced in [effector-react 22.1.0](https://changelog.effector.dev/#effector-react-22-1-0)
:::

React hook, which takes any unit or shape of units.

In case of [stores](/api/effector/Store.md) it subscribes component to provided [store](/api/effector/Store.md) and returns its current value, so when store is updated, the component will update automatically.

In the case of [events](/api/effector/Event.md)/[effects](/api/effector/Effect.md) - bind to current [_scope_](/api/effector/Scope.md) to use in dom event handlers.
Only `effector-react/scope` version works this way, `useUnit` of `effector-react` is no-op for events and does not require `Provider` with scope.

## `useUnit(unit)`

### Arguments {#useUnit-unit-arguments}

1. `unit` ([_Event_](/api/effector/Event.md) or [_Effect_](/api/effector/Effect.md)): Event or effect which will be binded to current `scope`.

### Returns {#useUnit-unit-returns}

(Function): Function to pass to event handlers. Will trigger given unit in current scope

### Example {#useUnit-unit-example}

```jsx
import {createEvent, createStore, fork} from 'effector'
import {useUnit, Provider} from 'effector-react/scope'

const inc = createEvent()
const $count = createStore(0).on(inc, x => x + 1)

const App = () => {
  const [count, incFn] = useUnit([$count, inc])

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => incFn()}>increment</button>
    </>
  )
}

const scope = fork()

render(
  () => (
    <Provider value={scope}>
      <App />
    </Provider>
  ),
  document.getElementById('root'),
)
```

## `useUnit(store)`

### Arguments {#useUnit-store-arguments}

1. `store` Effector ([_Store_](/api/effector/Store.md))

### Returns {#useUnit-store-returns}

Current value of the store.

### Example {#useUnit-store-example}

```js
import {createStore, createApi} from 'effector'
import {useUnit} from 'effector-react'

const $counter = createStore(0)

const {increment, decrement} = createApi($counter, {
  increment: state => state + 1,
  decrement: state => state - 1,
})

const App = () => {
  const counter = useUnit($counter)

  return (
    <div>
      {counter}
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  )
}
```

## `useUnit(shape)`

### Arguments {#useUnit-shape-arguments}

1. `shape` Object or array of ([_Event_](/api/effector/Event.md) or [_Effect_](/api/effector/Effect.md) or [_Store_](/api/effector/Store.md))

### Returns {#useUnit-shape-returns}

(Object or Array):

- if event or effect: functions with the same names or keys as argument to pass to event handlers. Will trigger given unit in current scope _Note: events or effects will be bound **only** if `useUnit` is imported from `effector-react/scope`_
- if store: current value of the store.

### Example {#useUnit-shape-example}

```jsx
import {createStore, createEvent, fork} from 'effector'
import {useUnit, Provider} from 'effector-react/scope'

const inc = createEvent()
const dec = createEvent()

const $count = createStore(0)

$count.on(inc, x => x + 1)
$count.on(dec, x => x - 1)

const App = () => {
  const count = useUnit($count)
  const handler = useUnit({inc, dec})
  // or
  const [a, b] = useUnit([inc, dec])

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => handler.inc()}>increment</button>
      <button onClick={() => handler.dec()}>decrement</button>
    </>
  )
}

const scope = fork()

render(
  () => (
    <Provider value={scope}>
      <App />
    </Provider>
  ),
  document.getElementById('root'),
)
```
