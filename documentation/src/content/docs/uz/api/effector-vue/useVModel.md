---
title: useVModel
description: hook function, which subscribes to watcher, that observes changes in the current store. Designed for vue 3
redirectFrom:
  - /api/effector-vue/useVModel
  - /docs/api/effector-vue/useVModel
---

```ts
import { useVModel } from "effector-vue/composition";
```

A hook function, which subscribes to a watcher that observes changes in the current store, so when recording results, the component will automatically update. It is primarily used when working with forms (`v-model`) in Vue 3.

# Methods (#methods)

## `useVModel($store)` (#methods-useVModel-store)

### Formulae (#methods-useVModel-store-formulae)

```ts
useVModel($store: Store<State>): Ref<UnwrapRef<State>>;
```

Designed for Vue 3.

### Arguments (#methods-useVModel-store-arguments)

1. `$store` ([_Store_](/en/api/effector/Store))
2. `shape of Stores` ([_Store_](/en/api/effector/Store))

### Returns (#methods-useVModel-store-returns)

(`State`)

### Examples (#methods-useVModel-examples)

#### Single Store (#methods-useVModel-examples-singleStore)

```js
import { createStore, createApi } from "effector";
import { useVModel } from "effector-vue/composition";

const $user = createStore({
  name: "",
  surname: "",
  skills: ["CSS", "HTML"],
});

export default {
  setup() {
    const user = useVModel($user);

    return { user };
  },
};
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

#### Store Shape (#methods-useVModel-examples-storeShape)

```js
import { createStore, createApi } from "effector";
import { useVModel } from "effector-vue/composition";

const $name = createStore("");
const $surname = createStore("");
const $skills = createStore([]);

const model = {
  name: $name,
  surname: $surname,
  skills: $skills,
};

export default {
  setup() {
    const user = useVModel(model);

    return { user };
  },
};
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
