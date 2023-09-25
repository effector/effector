---
title: createStoreConsumer
description: Creates store-based component with render-props
redirectFrom:
  - /api/effector-react/createStoreConsumer
  - /docs/api/effector-react/createStoreConsumer
---

:::warning{title="Deprecated"}
since [effector-react 23.0.0](https://changelog.effector.dev/#effector-react-23-0-0).

Consider using [hooks api](/en/api/effector-react/index#hooks) in modern projects.
:::

## `createStoreConsumer(store)` {#createStoreConsumer-store}

Creates a store-based React component which is watching for changes in the store. Based on _Render Props_ technique.

### Arguments {#createStoreConsumer-store-arguments}

1. `store` (_Store_)

### Returns {#createStoreConsumer-store-returns}

(_`React.Component`_)

### Example {#createStoreConsumer-store-example}

```jsx
import { createStore } from "effector";
import { createStoreConsumer } from "effector-react";

const $firstName = createStore("Alan");

const FirstName = createStoreConsumer($firstName);

const App = () => <FirstName>{(name) => <h1>{name}</h1>}</FirstName>;
```

[Try it](https://share.effector.dev/HbH1tpzQ)
