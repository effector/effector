---
id: createGate
title: createGate
hide_title: true
---

# createGate

## `createGate(config?: {defaultState?, name?})`

Creates a [_`Gate`_](./Gate.md), if `defaultState` is defined, [Gate.state](./Gate.md#state) will be created with passed value

#### Arguments

`config` (_Object_): Optional configuration object

- `defaultState`: Optional default state for [Gate.state](./Gate.md#state)
- `name` (_string_): Optional name which will be used as name of created react component

#### Returns

[_Gate_](./Gate.md)

## `createGate(name?)`

Creates a [_`Gate`_](Gate.md)

#### Arguments

1. `name`? (_string_): Optional name which will be used as name of created react component

#### Returns

[_Gate_](./Gate.md)

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

[Try it](https://share.effector.dev/mMZSQclh)
