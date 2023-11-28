---
id: createGate
title: createGate
hide_title: true
description: Creates a gate to consume data from view. Designed for vue 3
---

# createGate

## `createGate(config?: {defaultState?, domain?, name?})`

Creates a [_`Gate`_](./Gate.md) to consume data from view, designed for vue 3.
If `defaultState` is defined, [Gate.state](./Gate.md#state) will be created with passed value

**Arguments**

`config` (_Object_): Optional configuration object

- `defaultState?`: Optional default state for [Gate.state](./Gate.md#state)
- `domain?` ([_Domain_](../effector/Domain.md)): Optional domain which will be used to create gate units ([Gate.open](./Gate.md#open) event, [Gate.state](./Gate.md#state) store and so on)
- `name?` (_string_): Optional name which will be used as name of created react component

**Returns**

[_Gate_](./Gate.md)

### Example

```js
import {createGate, useGate} from 'effector-vue/composition'

const ListGate = createGate({
  name: 'Gate with required props',
})

const ListItem = {
  template: `
    <div>
      {{id}}
    </div>
  `,
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    useGate(ListGate, () => props.id)
  },
}

const app = {
  template: `
    <div>
      <ListItem :id="id" />
    </div>
  `,
  components: {
    ListItem,
  },
  setup() {
    const id = ref('1')
    return {id}
  },
}

Gate.state.watch(state => {
  console.log('current state', state)
})
// => current state null

app.mount('#app')
// => current state 1

app.unmount()
// => current state null
```
