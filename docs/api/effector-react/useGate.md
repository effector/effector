---
id: useGate
title: useGate
hide_title: true
---

# `useGate(GateComponent, props)`

Creates a [_`Gate`_](Gate.md)

#### Arguments

1. `GateComponent` (_Gate_)
2. `props` (_Props_)

#### Returns

(_`void`_)

#### Example

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

<Route component={Home} />
```
