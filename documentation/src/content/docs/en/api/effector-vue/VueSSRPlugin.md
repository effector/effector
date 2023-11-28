---
title: VueSSRPlugin
redirectFrom:
  - /api/effector-vue/VueSSRPlugin
  - /docs/api/effector-vue/VueSSRPlugin
---

:::warning{title="Deprecated"}
Since [effector 23.0.0](https://changelog.effector.dev/#effector-23-0-0) `VueSSRPlugin` is deprecated. Use [`EffectorScopePlugin`](./EffectorScopePlugin) instead.
:::

The Plugin provides a general scope which needs for read and update effector's stores, call effector's events. Required for SSR.

### Arguments {#VueSSRPlugin-arguments}

1. `scope` [Scope](/en/api/effector/Scope)
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
