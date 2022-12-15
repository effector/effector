---
title: useGate
description: Function for passing data to Gate
lang: en-US
---

# useGate

## `useGate(GateComponent, props)` {#useGate-props}

Function for passing data to [_`Gate`_](/api/effector-solid/Gate.md)

### Arguments {#useGate-props-arguments}

1. `GateComponent` (_Gate_)
2. `props` (_Props_)

### Returns {#useGate-props-returns}

(_`void`_)

### Example {#useGate-props-example}

```js
import {createGate, useGate} from 'effector-solid'
import {Route, Routes} from 'solid-app-router'

const Page = createGate('page')
Page.state.watch(({match}) => {
  console.log(match)
})
const Home = props => {
  useGate(Page, props)
  return <section>Home</section>
}

const App = () => (
  <Routes>
    <Route element={<Home />} />
  </Routes>
)
```
