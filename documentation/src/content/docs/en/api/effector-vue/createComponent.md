---
title: createComponent
redirectFrom:
  - /api/effector-vue/createComponent
---

# Methods (#methods)

## `createComponent(options, store?)` (#methods-createComponent-options-store)

### Arguments (#methods-createComponent-options-store-arguments)

1. `options` (_Object_): component options (hooks, methods, computed properties)
2. `store` (_Object_): Store object from effector

### Returns (#methods-createComponent-options-store-returns)

(_`vue component`_)

### Example (#methods-createComponent-options-store-example)

```html
<template> {{ $counter }} </template>
```

```js
// component.vue
import { createComponent } from "effector-vue";

const $counter = createStore(0);
const { update } = createApi($counter, {
  update: (_, value: number) => value,
});

export default createComponent(
  {
    name: "Counter",

    methods: {
      update,
      handleClick() {
        const value = this.$counter + 1; // this.$counter <- number ( typescript tips )
        this.update(value);
      },
    },
  },
  { $counter },
);
```
