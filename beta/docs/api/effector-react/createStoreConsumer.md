---
title: createStoreConsumer
description: Creates store-based component with render-props
lang: en-US
---

# createStoreConsumer

## `createStoreConsumer(store)` {#createStoreConsumer-store}

Creates store-based react component which is watching for changes in the store. Based on _Render Props_ technique.

### Arguments {#createStoreConsumer-store-arguments}

1. `store` (_Store_)

### Returns {#createStoreConsumer-store-returns}

(_`React.Component`_)

### Example {#createStoreConsumer-store-example}

```jsx
import {createStore} from 'effector'
import {createStoreConsumer} from 'effector-react'

const $firstName = createStore('Alan')

const FirstName = createStoreConsumer($firstName)

const App = () => <FirstName>{name => <h1>{name}</h1>}</FirstName>
```

[Try it](https://share.effector.dev/HbH1tpzQ)
