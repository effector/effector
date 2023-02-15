---
title: createGate
description: Creates a gate to consume data from view. Designed for vue 3
---

# createGate

## `createGate(config?: {defaultState?, domain?, name?})` {#createGate-config}

Creates a [_`Gate`_]/apieffector-vue/Gate.md) to consume data from view, designed for vue 3.
If `defaultState` is defined, [Gate.state]/apieffector-vue/Gate.md#state) will be created with passed value

### Arguments {#createGate-config-arguments}

`config` (_Object_): Optional configuration object

- `defaultState?`: Optional default state for [Gate.state](/api/effector-vue/Gate.md#state)
- `domain?` ([_Domain_](/api/effector/Domain.md)): Optional domain which will be used to create gate units ([Gate.open](/api/effector-vue/Gate.md#open) event, [Gate.state](/api/effector-vue/Gate.md#state) store and so on)
- `name?` (_string_): Optional name which will be used as name of created react component

### Returns {#createGate-config-returns}

[_Gate_](/api/effector-vue/Gate.md)

### Example {#createGate-config-example}

```js
import { createGate, useGate } from "effector-vue/composition";

const ListGate = createGate({
  name: "Gate with required props",
});

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
    useGate(ListGate, () => props.id);
  },
};

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
    const id = ref("1");
    return { id };
  },
};

Gate.state.watch((state) => {
  console.log("current state", state);
});
// => current state null

app.mount("#app");
// => current state 1

app.unmount();
// => current state null
```
