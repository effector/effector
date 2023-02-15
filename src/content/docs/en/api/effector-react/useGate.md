---
title: useGate
description: Hook for passing data to Gate
---

## `useGate(GateComponent, props)` {#useGate-props}

Hook for passing data to [_`Gate`_](/api/effector-react/Gate.md).

### Arguments {#useGate-props-arguments}

1. `GateComponent` (_Gate_)
2. `props` (_Props_)

### Returns {#useGate-props-returns}

(_`void`_)

## Example {#useGate-example}

```js
import { createGate, useGate } from "effector-react";
import { Route } from "react-router";

const Page = createGate("page");
Page.state.watch(({ match }) => {
  console.log(match);
});
const Home = (props) => {
  useGate(Page, props);
  return <section>Home</section>;
};

const App = () => <Route component={Home} />;
```
