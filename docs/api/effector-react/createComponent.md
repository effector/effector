---
id: createComponent
title: createComponent
hide_title: true
---

# `createComponent(store, render)`

Creates store-based React component. The `createComponent` is useful to transfer logic and data in state to your View component.

> **Note:** You can use hooks in `createComponent` since effector-react@20.3.0.

#### Arguments

1. `store` (_Store | Object | Function_): `Store` or object of `Store`, or function which will be called with initial props.
2. `render` (_Function_): Render function which will be called with props and state.

#### Returns

(_`React.Component`_)

#### Example

```js try
import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, createEvent} from 'effector'
import {createComponent} from 'effector-react'

const counter = createStore(0)
const incr = createEvent('increment')

counter.on(incr, n => n + 1)

const MyCounter = createComponent(counter, (props, state) => (
  <div>
    Counter: {state}
    <button onClick={incr}>increment</button>
  </div>
))

const MyOwnComponent = () => {
  // any staff here
  return (
    <MyCounter />
  )
}

ReactDOM.render(<MyOwnComponent />, document.getElementById("root"));
```
