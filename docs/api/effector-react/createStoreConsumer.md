---
id: createStoreConsumer
title: createStoreConsumer
hide_title: true
---

# `createStoreConsumer(store)`

#### Arguments

1. `store` (_Store_)

#### Returns

(_`React.Component`_)

#### Example

```js
import {createStore} from 'effector'
import {createStoreConsumer} from 'effector-react'

const firstName = createStore('Alan')

const FirstName = createStoreConsumer(firstName)

const App = () => (
  <Layout>
    <Header>
      <FirstName>{name => <h1>{name}</h1>}</FirstName>
    </Header>
  </Layout>
)
```
