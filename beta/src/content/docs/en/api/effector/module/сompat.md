---
title: effector/compat
description: Separate module of Effector with compatibility up to IE11 and Chrome 47 (browser for Smart TV devices)
---

The library provides separate module with compatibility up to IE11 and Chrome 47 (browser for Smart TV devices).

## Required polyfills

You need to install polyfills for these objects:

- `Promise`
- `Object.assign`
- `Array.prototype.flat`
- `Map`
- `Set`

In most cases, a bundler can automatically add polyfills.

<details>
<summary>Vite</summary>

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

## Usage

### Manual

You can use it instead of `effector` package if you need to support old browsers.

```diff
- import {createStore} from 'effector'
+ import {createStore} from 'effector/compat'
```

### Automatic

However, you can set up your bundler to automatically replace `effector` with `effector/compat` in your code.

<details>
<summary>Webpack</summary>

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

<details>
<summary>Vite</summary>

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

:::warning{title="Bundler, not transpiler"}
Since third-party libraries can import `effector` directly, you **should not** use transpilers like Babel to replace `effector` with `effector/compat` in your code, because by default Babel will not transform third-party code.

**Use bundler instead**, as it will replace `effector` with `effector/compat` in all modules, including third-party ones.
:::
