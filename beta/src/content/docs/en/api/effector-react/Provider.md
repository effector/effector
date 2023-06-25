---
title: Provider
description: Effector React
redirectFrom:
  - /api/effector-react/Provider
  - /docs/api/effector-react/Provider
---

React Context.Provider component, which takes any [Scope](/en/api/effector/Scope) in its `value` prop and makes all hooks in the subtree to work with this scope:

- `useUnit($store)` (and etc.) will read state and subscribe to updates of the `$store` in this scope
- `useUnit(event)` (and etc.) will [bind](/en/api/effector/scopeBind) provided event or effect to this scope

# Usage

Here is an example of `<Provider />` usage.

```tsx
import { createEvent, createStore, fork } from "effector";
import { useUnit, Provider } from "effector-react";

const buttonClicked = createEvent();
const $count = createStore(0).on(buttonClicked, (x) => x + 1);

const App = () => {
  const [count, click] = useUnit([$count, buttonClicked]);

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => click()}>increment</button>
    </>
  );
};

const myScope = fork({
  values: [[$count, 42]],
});

render(
  () => (
    <Provider value={myScope}>
      <App />
    </Provider>
  ),
  document.getElementById("root"),
);
```

The `<App />` component is placed in the subtree of `<Provider value={myScope} />`, so its `useUnit([$count, inc])` call will return

- State of the `$count` store in the `myScope`
- Version of `buttonClicked` event, which is binded to the `myScope`, which is, if called, updates the `$count` state in the `myScope`

There can be as much `<Provider />` instances in the tree, as you may need.

```tsx
const scopeA = fork()
const scopeB = fork()

const ParallelWidgets = () => (
    <Provider value={scopeA}>
     <App />
    </Provider>
    <Provider value={scopeB}>
     <App />
    </Provider>
);
```

# Provider properties {#Provider-properties}

## `value` {#Provider-value}

`Scope`: any [Scope](/en/api/effector/Scope). All hooks in the subtree will work with this scope
