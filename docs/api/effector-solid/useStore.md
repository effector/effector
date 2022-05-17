---
id: useStore
title: useStore
---

Function, which subscribes to [store](../effector/Store.md) and returns its current value, so when store is updated, the signal will update automatically.

```ts
useStore(store: Store<T>): Accessor<T>
```

**Arguments**

1. `store`: [Store](../effector/Store.md)

**Returns**

(_Accessor\<State>_)

#### Example

```js
import {createStore, createApi} from 'effector'
import {useStore} from 'effector-solid'

const $counter = createStore(0)

const {increment, decrement} = createApi($counter, {
  increment: state => state + 1,
  decrement: state => state - 1,
})

const App = () => {
  const counter = useStore($counter)
  
  return (
    <div>
      {counter}
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  )
}
```
