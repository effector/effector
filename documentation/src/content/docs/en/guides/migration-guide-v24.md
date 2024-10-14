---
title: Migration guide
redirectFrom:
  - /guides/migration-guide
  - /en/guides/migration-guide
---

Effector 24 is a major release that introduces couple of breaking changes. This guide will help you to migrate your codebase to the new version.

## Effector 23

First of all, make sure you are using Effector 23. If you are using an older version, you need to [upgrade to Effector 23 first](/en/guides/migration-guide-v23).

## UMD build

The UMD (Universal Module Definition) version of all packages (`effector`, `effector-react`, `effector-vue`, `effector-solid`, `forest`) is removed because current state of the Web is mature enough to use ES modules.

The UMD pattern typically attempts to offer compatibility with the most popular script loaders (e.g RequireJS amongst others). However, in 2024 all modern build tools (and browsers) support ES modules, so there is no need to support UMD.

In case you have to use UMD build for some reason, you can use the ES module version of the package and transpile it to UMD during your build process.

## `effector-vue`

A couple of breaking changes were introduced in `effector-vue` package as well.

### `useStore` is deprecated

`useStore` is deprecated in favor of [`useUnit`](/en/api/effector-solid/useUnit). It will be removed in the next major version of `effector-vue`.

You can replace `useStore` with [`useUnit`](/en/api/effector-solid/useUnit) like this:

```diff
- import {useStore} from 'effector-vue/composition';
+ import {useUnit} from 'effector-vue/composition';

- const value = useStore($store);
+ const value = useUnit($store);
```

Bonus: `useUnit` is more flexible and can be used with any unit, not only stores.

```ts
import { useUnit } from "effector-vue/composition";

const { value, error, onChange } = useUnit({
  value: $value,
  error: $error,
  onChange: changeValue,
});
```
