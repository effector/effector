---
title: useGate
description: Function for passing data to Gate
redirectFrom:
  - /api/effector-solid/useGate
  - /docs/api/effector-solid/useGate
---

```ts
import { useGate } from "effector-solid";
```

Function for passing data to [_Gate_](/en/api/effector-solid/Gate).

# Methods (#methods)

## `useGate(Gate, props)` (#methods-useGate-Gate-props)

### Formulae (#methods-useGate-Gate-props-formulae)

```ts
useGate(Gate: Gate<Props>, props: Props): void;
```

### Arguments (#methods-useGate-Gate-props-arguments)

1. `Gate` ([`Gate<Props>`](/en/api/effector-solid/Gate))
2. `props` (_Props_)

### Returns (#methods-useGate-Gate-props-returns)

(`void`)

### Examples (#methods-useGate-Gate-props-examples)

#### Basic Usage (#methods-useGate-Gate-props-examples-basic-usage)

```jsx
import { createGate, useGate } from "effector-solid";
import { Route, Routes } from "solid-app-router";

const PageGate = createGate("page");

const Home = (props) => {
  useGate(PageGate, props);
  return <section>Home</section>;
};

PageGate.state.watch(({ match }) => {
  console.log(match);
});

const App = () => (
  <Routes>
    <Route element={<Home />} />
  </Routes>
);
```
