---
title: Provider
description: Effector React
redirectFrom:
  - /api/effector-react/Provider
  - /docs/api/effector-react/Provider
---

React `Context.Provider` component, which takes any [Scope](/en/api/effector/Scope) in its `value` prop and makes all hooks in the subtree work with this scope:

- `useUnit($store)` (and etc.) will read the state and subscribe to updates of the `$store` in this scope
- `useUnit(event)` (and etc.) will [bind](/en/api/effector/scopeBind) provided event or effect to this scope

# Usage (#usage)

## Example Usage (#usage-example)

Here is an example of `<Provider />` usage.

```tsx
import { createEvent, createStore, fork } from "effector";
import { useUnit, Provider } from "effector-react";
import { render } from "react-dom";

const buttonClicked = createEvent();
const $count = createStore(0);

$count.on(buttonClicked, (counter) => counter + 1);

const App = () => {
  const [count, handleClick] = useUnit([$count, buttonClicked]);

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => handleClick()}>increment</button>
    </>
  );
};

const myScope = fork({
  values: [[$count, 42]],
});

render(
  <Provider value={myScope}>
    <App />
  </Provider>,
  document.getElementById("root"),
);
```

The `<App />` component is placed in the subtree of `<Provider value={myScope} />`, so its `useUnit([$count, inc])` call will return

- State of the `$count` store in the `myScope`
- Version of `buttonClicked` event, which is bound to the `myScope`, which, if called, updates the `$count` state in the `myScope`

## Multiple Providers Usage (#usage-multiple-providers)

There can be as many `<Provider />` instances in the tree, as you may need.

```tsx
import { fork } from "effector";
import { Provider } from "effector-react";
import { App } from "@/app";

const scopeA = fork();
const scopeB = fork();

const ParallelWidgets = () => (
  <>
    <Provider value={scopeA}>
      <App />
    </Provider>
    <Provider value={scopeB}>
      <App />
    </Provider>
  </>
);
```

# Provider Properties (#properties)

## `value` (#properties-value)

`Scope`: any [Scope](/en/api/effector/Scope). All hooks in the subtree will work with this scope.
