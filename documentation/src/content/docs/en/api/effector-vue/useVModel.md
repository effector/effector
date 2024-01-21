---
title: useVModel
description: hook function, which subscribes to watcher, that observes changes in the current store. Designed for vue 3
redirectFrom:
  - /api/effector-vue/useVModel
  - /docs/api/effector-vue/useVModel
---

## useVModel(store) {#useVModel-store}

A hook function, which subscribes to watcher, that observes changes in the current store, so when recording results, the component will update automatically.
Basically this hook use when need to work with forms (`v-model`).

### Formulae {#useVModel-store-formulae}

```ts
useVModel($store);
```

Designed for vue 3

### Arguments {#useVModel-store-arguments}

1. `store` ([_Store_](/en/api/effector/Store))
2. `shape of Stores` ([_Store_](/en/api/effector/Store))

### Returns {#useVModel-store-returns}

(State)

## Examples {#useVModel-examples}

### Example 1 (Single Store) {#useVModel-store-example-single}

```js
import {createStore, createApi} from 'effector'
import {useVModel} from 'effector-vue/composition'

const $user = createStore({
  name: '',
  surname '',
  skills: ['CSS', 'HTML']
})

export default {
  setup() {
    const user = useVModel($user);

    return {
      user
    }
  }
}
```

```html
<div id="app">
  <input type="text" v-model="user.name" />
  <input type="text" v-model="user.surname" />

  <div>
    <input type="checkbox" v-model="user.skills" value="HTML" />
    <input type="checkbox" v-model="user.skills" value="CSS" />
    <input type="checkbox" v-model="user.skills" value="JS" />
  </div>
</div>
```

### Example 2 (Store Shape) {#useVModel-store-example-shape}

```js
import {createStore, createApi} from 'effector'
import {useVModel} from 'effector-vue/composition'

const $name = createStore('')
const $surname = createStore('')
const $skills = createStore([])

const model = {
  name: $name,
  surname: $surname
  skills: $skills
}

export default {
  setup() {
    const user = useVModel(model);

    return {
      user
    }
  }
}
```

```html
<div id="app">
  <input type="text" v-model="user.name" />
  <input type="text" v-model="user.surname" />

  <div>
    <input type="checkbox" v-model="user.skills" value="HTML" />
    <input type="checkbox" v-model="user.skills" value="CSS" />
    <input type="checkbox" v-model="user.skills" value="JS" />
  </div>
</div>
```
