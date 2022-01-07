---
id: VueSSRPlugin
title: VueSSRPlugin
---

The Plugin provides a general scope which need for read and update effector's stores, call effector's events. Required for SSR.

**Arguments**

1. `scope` [Scope](../effector/Scope.md)
2. `scopeName?` custom scopeName (default: `root`)

```js
import {createSSRApp} from "vue"
import {VueSSRPlugin} from "effector-vue/ssr
import {fork} from "effector"

const app = createSSRApp(AppComponent)
const scope = fork()

app.use(VueSSRPlugin({
  scope,
  scopeName: "app-scope-name"
}))
```
