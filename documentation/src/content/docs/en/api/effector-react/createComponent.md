---
title: createComponent
description: Creates a store-based React component
redirectFrom:
  - /api/effector-react/createComponent
  - /docs/api/effector-react/createComponent
---

:::warning{title="Deprecated"}
since [effector-react 23.0.0](https://changelog.effector.dev/#effector-react-23-0-0).

You can use [hooks api](/en/api/effector-react/index#hooks) in `createComponent` since [effector-react@20.3.0](https://changelog.effector.dev/#effector-20-3-0).
:::

## `createComponent(store, render)` {#createComponent}

Creates a store-based React component. The `createComponent` is useful for transferring logic and data of state to your View component.

### Arguments {#createComponent-arguments}

1. `store` (_Store | Object_): `Store` or object of `Store`
2. `render` (_Function_): Render function which will be called with props and state

### Returns {#createComponent-returns}

(_`React.Component`_)

### Example {#createComponent-example}

```jsx
import { createStore, createEvent } from "effector";
import { createComponent } from "effector-react";

const increment = createEvent();

const $counter = createStore(0).on(increment, (n) => n + 1);

const MyCounter = createComponent($counter, (props, state) => (
  <div>
    Counter: {state}
    <button onClick={increment}>increment</button>
  </div>
));

const MyOwnComponent = () => {
  // any stuff here
  return <MyCounter />;
};
```

[Try it](https://share.effector.dev/kJoLGB6g)
