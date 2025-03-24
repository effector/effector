---
title: useEvent
redirectFrom:
  - /api/effector-react/useEvent
  - /docs/api/effector-react/useEvent
---

```ts
import { useEvent } from "effector-react";
```

:::info{title="since"}
`useEvent` introduced in [effector-react 20.9.0](https://changelog.effector.dev/#effector-20-9-0)
:::

:::warning{title="This is API is deprecated"}

Prefer [`useUnit`](/api/effector-react/useUnit) hook instead.
:::

Bind event to current [_scope_](/en/api/effector/Scope) to use in dom event handlers.<br/>
Only `effector-react/scope` version works this way, `useEvent` of `effector-react` is a no-op and does not require `Provider` with scope.

:::info{title="Note"}
Useful only if you have server-side rendering or writing tests for React-components.
:::

# Methods (#methods)

## `useEvent(unit)` (#methods-useEvent-unit)

### Arguments (#methods-useEvent-unit-arguments)

1. `unit` ([_Event_](/en/api/effector/Event) or [_Effect_](/en/api/effector/Effect)): Event or effect which will be bound to current `scope`

### Returns (#methods-useEvent-unit-returns)

(Function): Function to pass to event handlers. Will trigger a given unit in the current scope.

### Examples (#methods-useEvent-unit-examples)

#### Basic Usage (#methods-useEvent-unit-examples-basic)

```jsx
import ReactDOM from "react-dom";
import { createEvent, createStore, fork } from "effector";
import { useStore, useEvent, Provider } from "effector-react";

const incremented = createEvent();
const $count = createStore(0);

$count.on(incremented, (counter) => counter + 1);

const App = () => {
  const count = useStore($count);
  const handleIncrement = useEvent(incremented);

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => handleIncrement()}>increment</button>
    </>
  );
};

const scope = fork();

ReactDOM.render(
  <Provider value={scope}>
    <App />
  </Provider>,
  document.getElementById("root"),
);
```

[Try it](https://share.effector.dev/GyiJvLdo)

## `useEvent(shape)` (#methods-useEvent-shape)

### Arguments (#methods-useEvent-shape-arguments)

1. `shape` Object or array of ([_Event_](/en/api/effector/Event) or [_Effect_](/en/api/effector/Effect)): Events or effects as values which will be bound to the current `scope`

### Returns (#methods-useEvent-shape-returns)

(Object or Array): List of functions with the same names or keys as an argument to pass to event handlers. Will trigger a given unit in the current scope.

### Examples (#methods-useEvent-shape-examples)

#### Object Usage (#methods-useEvent-shape-examples-object)

```jsx
import ReactDOM from "react-dom";
import { createStore, createEvent, fork } from "effector";
import { useStore, useEvent, Provider } from "effector-react";

const incremented = createEvent();
const decremented = createEvent();

const $count = createStore(0);

$count.on(incremented, (counter) => counter + 1);
$count.on(decremented, (counter) => counter - 1);

const App = () => {
  const counter = useStore($count);
  const handler = useEvent({ incremented, decremented });
  // or
  const [handleIncrement, handleDecrement] = useEvent([incremented, decremented]);

  return (
    <>
      <p>Count: {counter}</p>
      <button onClick={() => handler.incremented()}>increment</button>
      <button onClick={() => handler.decremented()}>decrement</button>
    </>
  );
};

const scope = fork();

ReactDOM.render(
  <Provider value={scope}>
    <App />
  </Provider>,
  document.getElementById("root"),
);
```
