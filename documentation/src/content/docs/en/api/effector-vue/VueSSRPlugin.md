---
title: VueSSRPlugin
redirectFrom:
  - /api/effector-vue/VueSSRPlugin
  - /docs/api/effector-vue/VueSSRPlugin
---

The Plugin provides a general scope which needs for read and update effector's stores, call effector's events. Required for SSR.

# Plugins (#plugins)

## `VueSSRPlugin({ scope, scopeName })` (#plugins-VueSSRPlugin-scope-scopeName)

:::warning{title="Deprecated"}
Since [effector 23.0.0](https://changelog.effector.dev/#effector-23-0-0) `VueSSRPlugin` is deprecated. Use [`EffectorScopePlugin`](./EffectorScopePlugin) instead.
:::

## Arguments (#plugins-VueSSRPlugin-scope-scopeName-arguments)

1. `scope` [Scope](/en/api/effector/Scope)
2. `scopeName?` custom scopeName (default: `root`)

## Examples (#plugins-VueSSRPlugin-scope-scopeName-examples)

### Basic usage (#plugins-VueSSRPlugin-scope-scopeName-examples-basicUsage)

```js
import { createSSRApp } from "vue";
import { VueSSRPlugin } from "effector-vue/ssr";
import { fork } from "effector";

const app = createSSRApp(AppComponent);
const scope = fork();

app.use(
  VueSSRPlugin({
    scope,
    scopeName: "app-scope-name",
  }),
);
```
