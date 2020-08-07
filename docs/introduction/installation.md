---
id: installation
title: Installation
---

```bash
npm install --save effector
```

```bash
yarn add effector
```

## Complementary packages

### For react

```bash
npm install --save effector-react
```

```bash
yarn add effector-react
```

### For vue

```bash
npm install --save effector-vue
```

```bash
yarn add effector-vue
```

### For svelte

Svelte works with effector out of the box, no additional packages needed. See [word chain](https://github.com/today-/citycatch) game application written with svelte and effector.

### For old devices
:::note since
effector 20.1.0
:::

Add `effector/compat` module to use with Smart TV (Chrome 47) apps without babel.
Starting with this release, the library code is tested by browserstack.com for compatibility with our targets, including smart tv

```diff
- import {} from 'effector'
+ import {} from 'effector/compat'
```