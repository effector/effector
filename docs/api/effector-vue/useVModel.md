---
id: useVModel
title: useVModel
hide_title: true
description: hook function, which subscribes to watcher, that observes changes in the current store. Designed for vue 3
---

# useVModel

## `useVModel(store)`

A hook function, which subscribes to watcher, that observes changes in the current store, so when recording results, the component will update automatically.
Basically this hook use when need to work with forms (`v-model`).

Designed for vue 3

**Arguments**

1. `store` (_Store_)

**Returns**

(_State_)

### Example

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
