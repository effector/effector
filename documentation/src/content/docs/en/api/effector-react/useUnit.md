---
title: useUnit
description: Effector React
redirectFrom:
  - /api/effector-react/useUnit
  - /docs/api/effector-react/useUnit
---

```ts
import { useUnit } from "effector-react";
```

:::info{title="since"}
`useUnit` introduced in [effector-react 22.1.0](https://changelog.effector.dev/#effector-react-22-1-0)
:::

React hook, which takes any unit or shape of units.

In the case of [stores](/en/api/effector/Store), it subscribes the component to the provided [store](/en/api/effector/Store) and returns its current value, so when the store updates, the component will update automatically.

In the case of [events](/en/api/effector/Event)/[effects](/en/api/effector/Effect) – it binds to the current [_scope_](/en/api/effector/Scope) to use in DOM event handlers.
Only the `effector-react/scope` version works this way; the `useUnit` of `effector-react` is no-op for events and does not require a `Provider` with scope.

# Methods (#methods)

## `useUnit(unit)` (#methods-useUnit-unit)

Creates function that calls original unit but bounded to [`Scope`](/en/api/effector/Scope) if provided.

### Formulae (#methods-useUnit-unit-formulae)

```ts
useUnit(event: EventCallable<T>): (payload: T) => T;
useUnit(effect: Effect<Params, Done, any>): (payload: Params) => Promise<Done>;
```

### Arguments (#methods-useUnit-unit-arguments)

1. `unit` ([`EventCallable<T>`](/en/api/effector/Event#eventCallable) or [`Effect<Params, Done, Fail>`](/en/api/effector/Effect)): Event or effect which will be bound to the current `scope`.

### Returns (#methods-useUnit-unit-returns)

(Function): Function to pass to event handlers. Will trigger the given unit in the current scope.

### Examples (#methods-useUnit-unit-examples)

#### Basic (#methods-useUnit-unit-examples-basic)

```jsx
import { createEvent, createStore, fork } from "effector";
import { useUnit, Provider } from "effector-react";
import { render } from "react-dom";

const incrementClicked = createEvent();
const $count = createStore(0);

$count.on(incrementClicked, (count) => count + 1);

const App = () => {
  const [count, onIncrement] = useUnit([$count, incrementClicked]);

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => onIncrement()}>increment</button>
    </>
  );
};

const scope = fork();

render(
  () => (
    <Provider value={scope}>
      <App />
    </Provider>
  ),
  document.getElementById("root"),
);
```

## `useUnit($store)` (#methods-useUnit-store)

Reads value from the `$store` and rerenders component when `$store` updates in [`Scope`](/en/api/effector/Scope) if provided.

### Formulae (#methods-useUnit-store-formulae)

```ts
useUnit($store: Store<T>): T;
```

### Arguments (#methods-useUnit-store-arguments)

1. `$store`: effector ([_Store_](/en/api/effector/Store))

### Returns (#methods-useUnit-store-returns)

Current value of the store.

### Examples (#methods-useUnit-store-examples)

#### Basic (#methods-useUnit-store-examples-basic)

```js
import { createStore, createApi } from "effector";
import { useUnit } from "effector-react";

const $counter = createStore(0);

const { incrementClicked, decrementClicked } = createApi($counter, {
  incrementClicked: (count) => count + 1,
  decrementClicked: (count) => count - 1,
});

const App = () => {
  const counter = useUnit($counter);
  const [onIncrement, onDecrement] = useUnit([incrementClicked, decrementClicked]);

  return (
    <div>
      {counter}
      <button onClick={onIncrement}>Increment</button>
      <button onClick={onDecrement}>Decrement</button>
    </div>
  );
};
```

## `useUnit(shape)` (#methods-useUnit-shape)

### Formulae (#methods-useUnit-shape-formulae)

```ts
useUnit({ a: Store<A>, b: Event<B>, ... }): { a: A, b: (payload: B) => B; ... }

useUnit([Store<A>, Event<B>, ... ]): [A, (payload: B) => B, ... ]
```

### Arguments (#methods-useUnit-shape-arguments)

1. `shape`: Object or array of ([`EventCallable`](/en/api/effector/Event#eventCallable), [`Effect`](/en/api/effector/Effect), or [`Store`](/en/api/effector/Store))

### Returns (#methods-useUnit-shape-returns)

(`Object` or `Array`):

- If passed `EventCallable` or `Effect`: Functions with the same names or keys as the argument to pass to event handlers. Will trigger the given unit in the current scope. <br/>
  _Note: events or effects will be bound to `Scope` **only** if component wrapped into [`Provider`](/en/api/effector-react/Provider)._
- If passed `Store`: The current value of the store.

### Examples (#methods-useUnit-shape-examples)

#### Basic (#methods-useUnit-shape-examples-basic)

```jsx
import { createStore, createEvent, fork } from "effector";
import { useUnit, Provider } from "effector-react";

const incremented = createEvent();
const decremented = createEvent();

const $count = createStore(0);

$count.on(incremented, (count) => count + 1);
$count.on(decremented, (count) => count - 1);

const App = () => {
  const count = useUnit($count);
  const on = useUnit({ incremented, decremented });
  // or
  const [a, b] = useUnit([incremented, decremented]);

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => on.incremented()}>increment</button>
      <button onClick={() => on.decremented()}>decrement</button>
    </>
  );
};

const scope = fork();

render(
  () => (
    <Provider value={scope}>
      <App />
    </Provider>
  ),
  document.getElementById("root"),
);
```
