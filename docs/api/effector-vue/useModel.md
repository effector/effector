---
id: useModel
title: useModel
hide_title: true
---

# `useModel(store)`

Creates a hook function, which subscribes to watcher, that observes changes in the current store, so when recording results, the component will update automatically.
Basically this hook use when need to work with forms (`v-model`)

#### Arguments

1. `store` (_Store_)

#### Returns

(_State_)

#### Example

```js
import {createStore, createApi} from 'effector'
import {useModel} from 'effector-vue/composition'

const $user = createStore({
  name: '',
  surname '',
  skills: ['CSS', 'HTML']
})

export default {
  setup() {
    const user = useModel($user);

    return {
      user
    }
  }
}
```

```html
<div id="app">
  <input type="text" v-model="user.name">
  <input type="text" v-model="user.surname">

  <div>
    <input type="checkbox" v-model="user.skills" value="HTML">
    <input type="checkbox" v-model="user.skills" value="CSS">
    <input type="checkbox" v-model="user.skills" value="JS">
  </div>
</div>