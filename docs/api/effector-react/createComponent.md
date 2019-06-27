---
id: createComponent
title: createComponent
hide_title: true
---

# `createComponent(store, render)`

Creates store-based React component. The `createComponent` is useful to transfer logic and data in state to your View component. You can't use hooks in `createComponent`.

#### Arguments

1. `store` (_Store_)
2. `render` (_Function_)

#### Returns

(_`React.Component`_)

#### Example

```js
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

const MyOwnComponent = () =>{
  //any staff here
	return(
  	<MyCounter />
  )
}

ReactDOM.render(<MyOwnComponent />, document.getElementById("root"));
```
