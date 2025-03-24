---
title: effector/compat
description: Separate module of Effector with compatibility up to IE11 and Chrome 47 (browser for Smart TV devices)
---

```ts
import {} from "effector/compat";
```

The library provides a separate module with compatibility up to IE11 and Chrome 47 (browser for Smart TV devices).

:::warning{title="Bundler, Not Transpiler"}
Since third-party libraries can import `effector` directly, you **should not** use transpilers like Babel to replace `effector` with `effector/compat` in your code because by default, Babel will not transform third-party code.

**Use a bundler instead**, as it will replace `effector` with `effector/compat` in all modules, including those from third parties.

:::

## Required Polyfills (#required-polyfills)

You need to install polyfills for these objects:

- `Promise`
- `Object.assign`
- `Array.prototype.flat`
- `Map`
- `Set`

In most cases, a bundler can automatically add polyfills.

### Vite (#required-polyfills-vite)

<details>
<summary>Vite Configuration Example</summary>

```js
import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  plugins: [
    legacy({
      polyfills: ["es.promise", "es.object.assign", "es.array.flat", "es.map", "es.set"],
    }),
  ],
});
```

</details>

# Usage (#usage)

## Manual Replacement (#usage-manual)

You can use `effector/compat` instead of the `effector` package if you need to support old browsers.

```diff
- import {createStore} from 'effector'
+ import {createStore} from 'effector/compat'
```

## Automatic Replacement (#usage-automatic)

However, you can set up your bundler to automatically replace `effector` with `effector/compat` in your code.

### Webpack (#usage-automatic-webpack)

<details>
<summary>Webpack Configuration Example</summary>

```js
module.exports = {
  resolve: {
    alias: {
      effector: "effector/compat",
    },
  },
};
```

</details>

### Vite (#usage-automatic-vite)

<details>
<summary>Vite Configuration Example</summary>

```js
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      effector: "effector/compat",
    },
  },
});
```

</details>
