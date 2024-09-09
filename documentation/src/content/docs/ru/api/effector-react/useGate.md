---
title: useGate
description: Hook for passing data to Gate
redirectFrom:
  - /api/effector-react/useGate
  - /docs/api/effector-react/useGate
---

```ts
import { useGate } from "effector-react";
```

# Methods (#methods)

## `useGate(Gate, props?)` (#methods-useGate-Gate-props)

Hook for passing data to [_Gate_](/en/api/effector-react/Gate).

### Formulae (#methods-useGate-Gate-props-formulae)

```ts
const CustomGate: Gate<T>;

useGate(CustomGate, props?: T): void;
```

### Arguments (#methods-useGate-Gate-props-arguments)

1. `Gate` ([`Gate<T>`](/en/api/effector-react/Gate))
2. `props` (`T`)

### Returns (#methods-useGate-Gate-props-returns)

(`void`)

### Examples (#methods-useGate-Gate-props-examples)

#### Basic (#methods-useGate-Gate-props-examples-basic)

```js
import { createGate, useGate } from "effector-react";
import { Route } from "react-router";

const PageGate = createGate("page");

PageGate.state.watch(({ match }) => {
  console.log(match);
});

const Home = (props) => {
  useGate(PageGate, props);

  return <section>Home</section>;
};

const App = () => <Route component={Home} />;
```
