---
id: createStoreConsumer
title: createStoreConsumer
hide_title: true
---

# `createStoreConsumer(store)`

The `createStoreConsumer` creates a consumer who is watching for changes in the store. Based on _Render Props_ technique.


#### Arguments

1. `store` (_Store_)

#### Returns

(_`React.Component`_)

#### Example

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'effector'
import { createStoreConsumer } from 'effector-react'


const firstName = createStore('Alan')

const FirstName = createStoreConsumer(firstName)

const App = () => (
      <FirstName>{name => <h1>{name}</h1>}</FirstName>
)

ReactDOM.render(<App />, document.getElementById('root'))
```
