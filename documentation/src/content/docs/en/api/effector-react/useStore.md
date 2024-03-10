---
title: useStore
redirectFrom:
  - /api/effector-react/useStore
  - /docs/api/effector-react/useStore
---

```ts
import { useStore } from "effector-react";
```

React hook, which subscribes to a [store](/en/api/effector/Store) and returns its current value, so when the store is updated, the component will update automatically.

:::warning{title="This is API is deprecated"}

Prefer [`useUnit`](/api/effector-react/useUnit) hook instead.
:::

# Methods (#methods)

## `useStore($store): State` (#methods-useStore-store)

### Formulae (#methods-useStore-store-formulae)

```ts
useStore($store: Store<State>): State
```

### Arguments (#methods-useStore-store-arguments)

1. `$store`: [Store](/en/api/effector/Store)

### Returns (#methods-useStore-store-returns)

(_`State`_): The value from the store

### Examples (#methods-useStore-store-examples)

```jsx
import { createStore } from "effector";
import { useStore, useEvent } from "effector-react";

const $counter = createStore(0);

const { incrementClicked, decrementClicked } = createApi($counter, {
  incrementClicked: (state) => state + 1,
  decrementClicked: (state) => state - 1,
});

const App = () => {
  const counter = useStore($counter);
  const [onIncrement, onDecrement] = useEvent([incrementClicked, decrementClicked]);

  return (
    <div>
      {counter}
      <button onClick={onIncrement}>Increment</button>
      <button onClick={onDecrement}>Decrement</button>
    </div>
  );
};
```

[Try it](https://share.effector.dev/DHzp3z4r)
