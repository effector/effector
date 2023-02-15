---
title: useStore
---

React hook, which subscribes to [store](/api/effector/Store.md) and returns its current value, so when store is updated, the component will update automatically.

## Formulae {#useStore-formulae}

```ts
useStore(store: Store<T>): T
```

### Arguments {#useStore-arguments}

1. `store`: [Store](/api/effector/Store.md)

### Returns {#useStore-returns}

(_`State`_): The value from the store

## Example {#useStore-example}

```js
import { createStore, createApi } from "effector";
import { useStore } from "effector-react";

const $counter = createStore(0);

const { increment, decrement } = createApi($counter, {
  increment: (state) => state + 1,
  decrement: (state) => state - 1,
});

const App = () => {
  const counter = useStore($counter);

  return (
    <div>
      {counter}
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};
```

[Try it](https://share.effector.dev/DHzp3z4r)
