---
title: EffectorScopePlugin
---

The Plugin provides a general scope which needs for read and update effector's stores, call effector's events. Required for SSR.

### Arguments {#EffectorScopePlugin-arguments}

1. `scope` [Scope](/en/api/effector/Scope)
2. `scopeName?` custom scopeName (default: `root`)

```js
import {createSSRApp} from "vue"
import {EffectorScopePlugin} from "effector-vue
import {fork} from "effector"

const app = createSSRApp(AppComponent)
const scope = fork()

app.use(EffectorScopePlugin({
  scope,
  scopeName: "app-scope-name"
}))
```
