---
id: useEvent
title: useEvent
---

Bind event to current [_scope_](../effector/Scope.md) to use in dom event handlers.
Only `effector-react/scope` version works this way, `useEvent` of `effector-react` is no-op and does not require `Provider` with scope.
## `useEvent(unit)`

**Arguments**

1. `unit` ([_Event_](../effector/Event.md) or [_Effect_](../effector/Effect.md)): Event or effect which will be bound to current `scope`

**Returns**

(Function): Function to pass to event handlers. Will trigger given unit in current scope

### Example

```jsx
import ReactDOM from 'react-dom'
import {createEvent, createStore, fork} from 'effector'
import {useStore, useEvent, Provider} from 'effector-react/scope'

const inc = createEvent()
const $count = createStore(0)
  .on(inc, x => x + 1)

const App = () => {
  const count = useStore($count)
  const incFn = useEvent(inc)

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => incFn()}>increment</button>
    </>
  )
}

const scope = fork()

ReactDOM.render(
  <Provider value={scope}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
```

[Try it](https://share.effector.dev/GyiJvLdo)

## `useEvent(shape)`

**Arguments**

1. `shape` Object or array of ([_Event_](../effector/Event.md) or [_Effect_](../effector/Effect.md)): Events or effects as values which will be bound to the current `scope`

**Returns**

(Object or Array): List of functions with the same names or keys as argument to pass to event handlers. Will trigger given unit in current scope

### Example

```jsx
import ReactDOM from 'react-dom'
import {createStore, createEvent, fork} from 'effector'
import {useStore, useEvent, Provider} from 'effector-react/scope'

const inc = createEvent()
const dec = createEvent()

const $count = createStore(0)
  .on(inc, x => x + 1)
  .on(dec, x => x - 1)

const App = () => {
  const count = useStore($count)
  const handler = useEvent({inc, dec})
  // or
  const [a, b] = useEvent([inc, dec])
  
  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => handler.inc()}>increment</button>
      <button onClick={() => handler.dec()}>decrement</button>
    </>
  )
}

const scope = fork()

ReactDOM.render(
  <Provider value={scope}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
```
