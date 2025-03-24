---
title: effector-react/compat
description: Separate module of effector-react with compatibility up to IE11 and Chrome 47 (browser for Smart TV devices)
---

```ts
import {} from "effector-react/compat";
```

The library provides a separate module with compatibility up to IE11 and Chrome 47 (browser for Smart TV devices).

:::warning{title="Bundler, Not Transpiler"}
Since third-party libraries can import `effector-react` directly, you **should not** use transpilers like Babel to replace `effector-react` with `effector-react/compat` in your code because by default, Babel will not transform third-party code.

**Use a bundler instead**, as it will replace `effector-react` with `effector-react/compat` in all modules, including those from third parties.

:::

Since `effector-react` uses `effector` under the hood, you need to use the compat-version of `effector` as well. Please, read [`effector/compat`](/en/api/effector/module/compat) for details.

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

## Manual Usage (#usage-manual)

You can use it instead of the `effector-react` package if you need to support old browsers.

```diff
- import {useUnit} from 'effector-react'
+ import {useUnit} from 'effector-react/compat'
```

## Automatic Replacement (#usage-automatic-replacement)

However, you can set up your bundler to automatically replace `effector` with `effector/compat` in your code.

### Webpack (#usage-automatic-replacement-webpack)

```js
module.exports = {
  resolve: {
    alias: {
      effector: "effector/compat",
      "effector-react": "effector-react/compat",
    },
  },
};
```

### Vite (#usage-automatic-replacement-vite)

```js
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      effector: "effector/compat",
      "effector-react": "effector-react/compat",
    },
  },
});
```
