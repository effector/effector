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

```js try
import React from 'react'
import ReactDOM from 'react-dom'
import {createGate} from 'effector-react'

const Gate = createGate('gate with props')

const App = () => (
  <section>
    <Gate foo="bar" />
  </section>
)

Gate.state.watch(state => {
  console.log('current state', state)
})
// => current state {}

ReactDOM.render(<App />, document.getElementById('root'))
// => current state {foo: 'bar'}

ReactDOM.unmountComponentAtNode(document.getElementById('root'))
// => current state {}
```
