---
title: useGate
description: Function for passing data to Gate
redirectFrom:
  - /api/effector-solid/useGate
  - /docs/api/effector-solid/useGate
---

# `useGate(GateComponent, props)` {#useGate-props}

Function for passing data to [_Gate_](/en/api/effector-solid/Gate).

## Arguments {#useGate-props-arguments}

1. `GateComponent` (_Gate_)
2. `props` (_Props_)

## Returns {#useGate-props-returns}

(_`void`_)

## Examples {#useGate-props-examples}

### Basic Usage {#useGate-props-examples-basic-usage}

```js
import { createGate, useGate } from "effector-solid";
import { Route, Routes } from "solid-app-router";

const Page = createGate("page");
Page.state.watch(({ match }) => {
  console.log(match);
});
const Home = (props) => {
  useGate(Page, props);
  return <section>Home</section>;
};

const App = () => (
  <Routes>
    <Route element={<Home />} />
  </Routes>
);
```
