---
title: Installation
description: How to install and setup effector
redirectFrom:
  - /docs/introduction/installation
  - /introduction/installation
---

## Via package manager

Effector doesn't depend on NPM, you can use any package manager you want.<br/>
For example: [yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/).

```bash
npm install effector
```

### React

```bash
npm install effector effector-react
```

Also, you can start from [Stackblitz template](https://stackblitz.com/fork/github/effector/vite-react-template) with [TypeScript](https://typescriptlang.org/), [ViteJS](https://vitejs.dev/), and [React](https://reactjs.org/) already set up.

### Vue

```bash
npm install effector effector-vue
```

### Solid

```bash
npm install effector effector-solid
```

### Svelte

Svelte works with effector out of the box, no additional packages needed.

## Online playground

Examples in this documentation are running in [our online playground](https://share.effector.dev), which allows someone to test and share ideas quickly, without install. Code sharing, TypeScript and React supported out of the box. [Project repository](https://github.com/effector/repl).

## Deno

:::info{title="since"}
[effector 21.0.0](https://changelog.effector.dev/#effector-21-0-0)
:::

Just import `effector.mjs` from any CDN.

```typescript
import { createStore } from "https://cdn.jsdelivr.net/npm/effector/effector.mjs";
```

Sample CDNS:

- https://www.jsdelivr.com/package/npm/effector
- https://cdn.jsdelivr.net/npm/effector/effector.cjs.js
- https://cdn.jsdelivr.net/npm/effector/effector.mjs
- https://cdn.jsdelivr.net/npm/effector-react/effector-react.cjs.js
- https://cdn.jsdelivr.net/npm/effector-vue/effector-vue.cjs.js

## DevTools

Use [effector-logger](https://github.com/effector/logger) for printing updates to console, displaying current store values with browser ui and connecting application to familiar redux devtools.

For server-side rendering and writing test you may need plugins for your compiler toolkit:

### Babel

To use Babel plugin, you don't need to install additional packages, plugin bundled to `effector` package.

[Read this for more details](/en/api/effector/babel-plugin).

### SWC

```bash
npm install --development @effector/swc-plugin @swc/core
```

[Documentation](https://github.com/effector/swc-plugin).

## Compatibility

The library provides separate modules with compatibility up to IE11 and Chrome 47 (browser for Smart TV devices): `effector/compat`, `effector-react/compat`, and `effector-vue/compat`

Usage with manual import replacement:

```diff
- import {createStore} from 'effector'
+ import {createStore} from 'effector/compat'
```

Usage with [babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver) in your `.babelrc`:

```json
{
  "plugins": [
    [
      "babel-plugin-module-resolver",
      {
        "alias": {
          "^effector$": "effector/compat",
          "^effector-react$": "effector-react/compat"
        }
      }
    ]
  ]
}
```

### Polyfills

Effector uses some APIs and objects that older browsers may not have, so you may need to install them yourself if you intend to support such browsers.

You may need to install the following polyfills:

- `Promise`
- `Object.assign`
- `Array.prototype.flat`
