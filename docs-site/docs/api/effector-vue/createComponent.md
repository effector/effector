---
id: create-component
title: createComponent
---

# `createComponent(componentOptions, store?)`

**Arguments**

1. `componentOptions` (_Object_): component options ( hooks, methods, computed properties )
2. `store` (_Object_): Store object from effector

**Returns**

(_`vue component`_)

#### Example

```html
<template>
  {{ $counter }}
</template>
```

```js
// component.vue
import {createComponent} from 'effector-vue'

const $counter = createStore(0)
const {update} = createApi($counter, {
  update: (_, value: number) => value,
})

export default createComponent(
  {
    name: 'Counter',

    methods: {
      update,
      handleClick() {
        const value = this.$counter + 1 // this.$counter <- number ( typescript tips )
        this.update(value)
      },
    },
  },
  {$counter},
)
```
