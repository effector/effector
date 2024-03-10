---
title: createGate
description: Creates a gate to consume data from view. Designed for vue 3
redirectFrom:
  - /api/effector-vue/createGate
  - /docs/api/effector-vue/createGate
---

Creates a [_Gate_](/apieffector-vue/Gate) to consume data from view, designed for vue 3. If `defaultState` is defined, [Gate.state](/apieffector-vue/Gate#state) will be created with passed value.

# Methods (#methods)

## `createGate(config?: {defaultState?, domain?, name?})` (#methods-createGate-config)

### Arguments (#methods-createGate-config-arguments)

`config` (_Object_): Optional configuration object

- `defaultState?`: Optional default state for [Gate.state](/en/api/effector-vue/Gate#state)
- `domain?` ([_Domain_](/en/api/effector/Domain)): Optional domain which will be used to create gate units ([Gate.open](/en/api/effector-vue/Gate#open) event, [Gate.state](/en/api/effector-vue/Gate#state) store, and so on)
- `name?` (_string_): Optional name which will be used as the name of a created Vue component

### Returns (#methods-createGate-config-returns)

[_Gate_](/en/api/effector-vue/Gate)

### Examples (#methods-createGate-config-examples)

#### Basic Usage (#methods-createGate-config-examples-basic)

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
