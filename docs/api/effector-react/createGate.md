---
id: createGate
title: createGate
hide_title: true
---

# `createGate(name?)`

Creates a [_`Gate`_](Gate.md)

#### Arguments

1. `name`? (_string_)

#### Returns

(_`Gate`_)

#### Example

```js
import React from 'react'
import ReactDOM from 'react-dom'
import {createGate} from 'effector-react'

const Gate = createGate('gate with props')

const App = () => (
  <section>
    <Gate foo="bar"/>
  </section>
	)

ReactDOM.render(<App />, document.getElementById('root'))

console.log(Gate.state.getState()) // -->  {foo: 'bar'}
console.log(Gate.current) // -->  {foo: 'bar'}

ReactDOM.unmountComponentAtNode(document.getElementById('root'))

console.log(Gate.state.getState()) // --> {}
console.log(Gate.current) // -->  {}
```
