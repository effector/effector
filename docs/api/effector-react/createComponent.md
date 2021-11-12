---
id: createComponent
title: createComponent
hide_title: true
description: Creates store-based React component
---

# createComponent

## `createComponent(store, render)`

Creates store-based React component. The `createComponent` is useful for transfering logic and data of state to your View component.

:::tip
You can use hooks in `createComponent` since effector-react@20.3.0.
:::

**Arguments**

1. `store` (_Store | Object_): `Store` or object of `Store`
2. `render` (_Function_): Render function which will be called with props and state

**Returns**

(_`React.Component`_)

### Example

```js
import ReactDOM from 'react-dom'
import {createStore, createEvent} from 'effector'
import {createComponent} from 'effector-react'

const increment = createEvent()
const $counter = createStore(0)
  .on(increment, n => n + 1)

const MyCounter = createComponent($counter, (props, state) => (
  <div>
    Counter: {state}
    <button onClick={increment}>increment</button>
  </div>
))

const MyOwnComponent = () => {
  // any stuff here
  return <MyCounter />
}

ReactDOM.render(<MyOwnComponent />, document.getElementById('root'))
```

[Try it](https://share.effector.dev/h62lN72F)
