---
title: EffectorScopePlugin
---

The Plugin provides a general scope which needs for read and update effector's stores, call effector's events. Required for SSR.

# Plugins (#plugins)

## `EffectorScopePlugin({ scope, scopeName })` (#plugins-EffectorScopePlugin-scope-scopeName)

### Arguments (#plugins-EffectorScopePlugin-scope-scopeName-arguments)

1. `scope` [Scope](/en/api/effector/Scope)
2. `scopeName?` custom scopeName (default: `root`)

### Examples (#plugins-EffectorScopePlugin-scope-scopeName-examples)

#### Basic Usage (#plugins-EffectorScopePlugin-scope-scopeName-examples-basic)

```js
import { createSSRApp } from "vue";
import { EffectorScopePlugin } from "effector-vue";
import { fork } from "effector";

const app = createSSRApp(AppComponent);
const scope = fork();

app.use(
  EffectorScopePlugin({
    scope,
    scopeName: "app-scope-name",
  }),
);
```
