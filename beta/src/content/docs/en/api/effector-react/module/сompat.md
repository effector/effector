---
title: effector-react/compat
description: Separate module of effector-react with compatibility up to IE11 and Chrome 47 (browser for Smart TV devices)
---

The library provides separate module with compatibility up to IE11 and Chrome 47 (browser for Smart TV devices).

## effector/compat

Since `effector-react` uses `effector` under the hood, you need to use compat-version of `effector` as well. Please, read [`effector/compat`](/en/api/effector/module/сompat) for the details.

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

You can use it instead of `effector-react` package if you need to support old browsers.

```diff
- import {useUnit} from 'effector-react'
+ import {useUnit} from 'effector-react/compat'
```

### Automatic

However, you can set up your bundler to automatically replace `effector` with `effector/compat` in your code.

<details>
<summary>Webpack</summary>

```js
module.exports = {
  resolve: {
    alias: {
      "effector-react": "effector-react/compat",
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
      "effector-react": "effector-react/compat",
    },
  },
});
```

</details>

:::warning{title="Bundler, not transpiler"}
Since third-party libraries can import `effector-react` directly, you **should not** use transpilers like Babel to replace `effector-react` with `effector-react/compat` in your code, because by default Babel will not transform third-party code.

**Use bundler instead**, as it will replace `effector-react` with `effector-react/compat` in all modules, including third-party ones.
:::
