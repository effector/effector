---
title: Installation
description: How to install and setup effector
lang: en-US
---

# Installation

### Via package manager

```bash
npm add effector
```

### Deno <Badge type="info" text="Since effector 21.0.0" />

Just import `effector.mjs` from any CDN.

```typescript
import {createStore} from 'https://cdn.jsdelivr.net/npm/effector/effector.mjs'
```

## React

```bash
npm add effector effector-react
```

## Vue

```bash
npm add effector effector-vue
```

## Solid

```bash
npm add effector effector-solid
```

## Svelte

Svelte works with effector out of the box, no additional packages needed.

## DevTools

Use [effector-logger](https://github.com/effector/logger) for printing updates to console, displaying current store values with browser ui and connecting application to familiar redux devtools

## Online playground

Examples in this documentation are running in [our online playground](https://share.effector.dev), which allows someone to test and share ideas quickly, without install. Code sharing, Typescript and react supported out of the box

[Project repository](https://github.com/effector/repl).

## Compatibility

The library provides separate modules with compatibility up to IE11 and Chrome 47 (browser for Smart TV devices): `effector/compat`, `effector-react/compat` and `effector-vue/compat`

Usage with manual import replacement:

```diff
- import {createStore} from 'effector'
+ import {createStore} from 'effector/compat'
```

Usage with [`babel-plugin-module-resolver`](https://github.com/tleunen/babel-plugin-module-resolver) in your `.babelrc`:

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

You need to install polyfills for these objects:

- `Promise`
- `Object.assign`
- `Array.prototype.flat`
