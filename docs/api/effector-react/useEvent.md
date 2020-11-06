---
id: useEvent
title: useEvent
---

Bind event to current fork to use in dom event handlers. Used **only** with ssr, in application without forks `useEvent` will do nothing

## `useEvent(unit)`

**Arguments**

1. `unit` ([_Event_](../effector/Event.md) or [_Effect_](../effector/Effect.md)): Event or effect which will be binded to current `scope`

**Returns**

(Function): Function to pass to event handlers. Will trigger given unit in current scope

### Example

```jsx
import ReactDOM from 'react-dom'
import {createDomain, fork} from 'effector'
import {useStore, useEvent, Provider} from 'effector-react/ssr'

const app = createDomain()

const inc = app.createEvent()
const $count = app.createStore(0).on(inc, x => x + 1)

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

const scope = fork(app)
ReactDOM.render(
  <Provider value={scope}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
```

[Try it](https://share.effector.dev/GyiJvLdo)
