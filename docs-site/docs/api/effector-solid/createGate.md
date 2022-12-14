---
id: createGate
title: createGate
hide_title: true
description: Creates a gate to consume data from view
---

# createGate

## `createGate(config?: {defaultState?, domain?, name?})`

Creates a [_`Gate`_](docs/api/effector-solid/Gate.md), if `defaultState` is defined, [Gate.state](docs/api/effector-solid/Gate.md#state) will be created with passed value

**Arguments**

`config` (_Object_): Optional configuration object

- `defaultState?`: Optional default state for [Gate.state](docs/api/effector-solid/Gate.md#state)
- `domain?` ([_Domain_](docs/api/effector/Domain.md)): Optional domain which will be used to create gate units ([Gate.open](docs/api/effector-solid/Gate.md#open) event, [Gate.state](docs/api/effector-solid/Gate.md#state) store and so on)
- `name?` (_string_): Optional name which will be used as name of created solid component

**Returns**

[_Gate_](docs/api/effector-solid/Gate.md)

## `createGate(name?)`

Creates a [_`Gate`_](docs/api/effector-solid/Gate.md)

**Arguments**

1. `name`? (_string_): Optional name which will be used as name of created solid component

**Returns**

[_Gate_](docs/api/effector-solid/Gate.md)

#### Example

```js
import {createGate} from 'effector-solid'
import {render} from 'solid-js/web'

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

const unmount = render(() => <App />, document.getElementById('root'))
// => current state {foo: 'bar'}

unmount()
// => current state {}
```
