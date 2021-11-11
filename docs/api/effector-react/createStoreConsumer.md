---
id: createStoreConsumer
title: createStoreConsumer
hide_title: true
description: Creates store-based component with render-props
---

# createStoreConsumer

## `createStoreConsumer(store)`

Creates store-based react component which is watching for changes in the store. Based on _Render Props_ technique.

**Arguments**

1. `store` (_Store_)

**Returns**

(_`React.Component`_)

### Example

```jsx
import ReactDOM from 'react-dom'
import {createStore} from 'effector'
import {createStoreConsumer} from 'effector-react'

const $firstName = createStore('Alan')

const FirstName = createStoreConsumer($firstName)

const App = () => <FirstName>{name => <h1>{name}</h1>}</FirstName>

ReactDOM.render(<App />, document.getElementById('root'))
```

[Try it](https://share.effector.dev/6lLn1JhX)
