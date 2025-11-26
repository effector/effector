---
title: useUnit
description: Effector Solid
redirectFrom:
  - /api/effector-solid/useUnit
  - /docs/api/effector-solid/useUnit
---

```ts
import { useUnit } from "effector-solid";
```

Binds effector stores to the Solid reactivity system or, in the case of events/effects – binds to current [_scope_](/en/api/effector/Scope) to use in dom event handlers.
Only `effector-solid/scope` version works this way, `useUnit` of `effector-solid` is no-op for events and does not require `Provider` with scope.

# Methods (#methods)

## `useUnit(unit)` (#methods-useUnit-unit)

### Arguments (#methods-useUnit-unit-arguments)

```ts
useUnit(event: EventCallable<T>): (payload: T) => T;
useUnit(effect: Effect<Params, Done, any>): (payload: Params) => Promise<Done>;
```

### Arguments (#methods-useUnit-unit-arguments)

1. `unit` ([`EventCallable<T>`](/en/api/effector/Event#eventCallable) or [`Effect<Params, Done, Fail>`](/en/api/effector/Effect)): Event or effect which will be bound to current `scope`.

### Returns (#methods-useUnit-unit-returns)

(`Function`): Function to pass to event handlers. Will trigger the given unit in the current scope.

### Example (#methods-useUnit-unit-example)

A basic Solid component using `useUnit` with events and stores.

```jsx
import { render } from "solid-js/web";
import { createEvent, createStore, fork } from "effector";
import { useUnit, Provider } from "effector-solid";

const incremented = createEvent();
const $count = createStore(0);

$count.on(incremented, (count) => count + 1);

const App = () => {
  const [count, handleIncrement] = useUnit([$count, incremented]);

  return (
    <>
      <p>Count: {count()}</p>
      <button onClick={() => handleIncrement()}>Increment</button>
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

## `useUnit(store)` (#methods-useUnit-store)

### Formulae (#methods-useUnit-store-formulae)

```ts
useUnit($store: Store<State>): Accessor<State>;
```

### Arguments (#methods-useUnit-store-arguments)

1. `$store` effector ([_Store_](/en/api/effector/Store)).

### Returns (#methods-useUnit-store-returns)

(`Accessor<State>`) which will subscribe to store state.

### Example (#methods-useUnit-store-example)

```jsx
import { createStore, createApi } from "effector";
import { useUnit } from "effector-solid";

const $counter = createStore(0);

const { incremented, decremented } = createApi($counter, {
  incremented: (count) => count + 1,
  decremented: (count) => count - 1,
});

const App = () => {
  const counter = useUnit($counter);
  const [handleIncrement, handleDecrement] = useUnit([incremented, decremented]);

  return (
    <div>
      {counter()}
      <button onClick={incremented}>Increment</button>
      <button onClick={decremented}>Decrement</button>
    </div>
  );
};
```

## `useUnit(shape)` (#methods-useUnit-shape)

### Formulae (#methods-useUnit-shape-formulae)

```ts
useUnit({ a: Store<A>, b: Event<B>, ... }): { a: Accessor<A>, b: (payload: B) => B; ... }

useUnit([Store<A>, Event<B>, ... ]): [Accessor<A>, (payload: B) => B, ... ]
```

### Arguments (#methods-useUnit-shape-arguments)

1. `shape` Object or array of ([`EventCallable`](/en/api/effector/Event#eventCallable), [`Effect`](/en/api/effector/Effect), or [`Store`](/en/api/effector/Store)): Events, or effects, or stores as accessors which will be bound to the current `scope`.

### Returns (#methods-useUnit-shape-returns)

(`Object` or `Array`):

- If `EventCallable` or `Effect`: functions with the same names or keys as argument to pass to event handlers. Will trigger given unit in current scope _Note: events or effects will be bound **only** if `useUnit` is imported from `effector-solid/scope`_.
- If `Store`: accessor signals which will subscribe to the store state.

### Examples (#methods-useUnit-shape-examples)

```jsx
import { render } from "solid-js/web";
import { createStore, createEvent, fork } from "effector";
import { useUnit, Provider } from "effector-solid/scope";

const incremented = createEvent();
const decremented = createEvent();

const $count = createStore(0)
  .on(incremented, (count) => count + 1)
  .on(decremented, (count) => count - 1);

const App = () => {
  const count = useUnit($count);
  const on = useUnit({ incremented, decremented });
  // or
  const [a, b] = useUnit([incremented, decremented]);

  return (
    <>
      <p>Count: {count()}</p>
      <button onClick={() => on.incremented()}>Increment</button>
      <button onClick={() => on.decremented()}>Decrement</button>
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
