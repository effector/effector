---
title: useEvent
---

:::info{title="since"}
`useEvent` introduced in [effector-react 20.9.0](https://changelog.effector.dev/#effector-20-9-0)
:::

Bind event to current [_scope_](/en/api/effector/Scope) to use in dom event handlers.<br/>
Only `effector-react/scope` version works this way, `useEvent` of `effector-react` is no-op and does not require `Provider` with scope.

:::info{title="Note"}
Useful only if you have server-side rendering or writing tests for React-components.
:::

## `useEvent(unit)` {#useEvent-unit}

### Arguments {#useEvent-unit-arguments}

1. `unit` ([_Event_](/en/api/effector/Event) or [_Effect_](/en/api/effector/Effect)): Event or effect which will be binded to current `scope`

### Returns {#useEvent-unit-returns}

(Function): Function to pass to event handlers. Will trigger given unit in current scope

### Example {#useEvent-unit-example}

```jsx
import ReactDOM from "react-dom";
import { createEvent, createStore, fork } from "effector";
import { useStore, useEvent, Provider } from "effector-react/scope";

const inc = createEvent();
const $count = createStore(0).on(inc, (x) => x + 1);

const App = () => {
  const count = useStore($count);
  const incFn = useEvent(inc);

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => incFn()}>increment</button>
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

## `useEvent(shape)` {#useEvent-shape}

### Arguments {#useEvent-shape-arguments}

1. `shape` Object or array of ([_Event_](/en/api/effector/Event) or [_Effect_](/en/api/effector/Effect)): Events or effects as values which will be bound to the current `scope`

### Returns {#useEvent-shape-returns}

(Object or Array): List of functions with the same names or keys as argument to pass to event handlers. Will trigger given unit in current scope

### Example {#useEvent-shape-example}

```jsx
import ReactDOM from "react-dom";
import { createStore, createEvent, fork } from "effector";
import { useStore, useEvent, Provider } from "effector-react/scope";

const inc = createEvent();
const dec = createEvent();

const $count = createStore(0)
  .on(inc, (x) => x + 1)
  .on(dec, (x) => x - 1);

const App = () => {
  const count = useStore($count);
  const handler = useEvent({ inc, dec });
  // or
  const [a, b] = useEvent([inc, dec]);

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => handler.inc()}>increment</button>
      <button onClick={() => handler.dec()}>decrement</button>
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
