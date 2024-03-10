---
title: createStoreConsumer
description: Creates store-based component with render-props
redirectFrom:
  - /api/effector-react/createStoreConsumer
  - /docs/api/effector-react/createStoreConsumer
---

```ts
import { createStoreConsumer } from "effector-react";
```

:::warning{title="Deprecated"}
since [effector-react 23.0.0](https://changelog.effector.dev/#effector-react-23-0-0).

Consider using [hooks api](/en/api/effector-react/index#hooks) in modern projects.
:::

# Methods (#methods)

## `createStoreConsumer($store)` (#methods-createStoreConsumer-store)

Creates a store-based React component which is watching for changes in the store. Based on _Render Props_ technique.

### Arguments (#methods-createStoreConsumer-store-arguments)

1. `$store` ([`Store`](/en/api/effector/Store))

### Returns (#methods-createStoreConsumer-store-returns)

(`React.Component`)

### Examples (#methods-createStoreConsumer-store-examples)

```jsx
import { createStore } from "effector";
import { createStoreConsumer } from "effector-react";

const $firstName = createStore("Alan");

const FirstName = createStoreConsumer($firstName);

const App = () => <FirstName>{(name) => <h1>{name}</h1>}</FirstName>;
```

[Try it](https://share.effector.dev/HbH1tpzQ)
