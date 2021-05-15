---
id: useGate
title: useGate
hide_title: true
description: Hook for passing data to Gate
---

# useGate

## `useGate(GateComponent, props)`

Hook for passing data to [_`Gate`_](Gate.md)

**Arguments**

1. `GateComponent` (_Gate_)
2. `props` (_Props_)

**Returns**

(_`void`_)

### Example

```js
import {createGate, useGate} from 'effector-react'
import {Route} from 'react-router'

const Page = createGate('page')
Page.state.watch(({match}) => {
  console.log(match)
})
const Home = props => {
  useGate(Page, props)
  return <section>Home</section>
}

const App = () => <Route component={Home} />
```
