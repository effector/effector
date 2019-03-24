---
id: useStore
title: useStore
hide_title: true
---

# `useStore(store)`

#### Arguments

1. `store` (_Store_)

#### Returns

(_State_)

#### Example

```js
import {createStore, createApi} from 'effector'
import {useStore} from 'effector-react'

const counter = createStore(0)
const { increment, decrement } = createApi(counter, {
  increment: state => state + 1,
  decrement: state => state - 1
})

const Counter = () => {
  const state = useStore(counter)
  return (
    <div>
      {state}
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  )
}
```
