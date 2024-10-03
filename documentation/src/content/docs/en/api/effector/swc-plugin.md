---
title: SWC plugin
redirectFrom:
  - /api/effector/swc-plugin
  - /docs/api/effector/swc-plugin
---

An official SWC plugin can be used for SSR and easier debugging experience in SWC-powered projects, like [Next.js](https://nextjs.org) or Vite with [vite-react-swc plugin](https://github.com/vitejs/vite-plugin-react-swc).

The plugin has the same functionality as the built-in [`babel-plugin`](/en/api/effector/babel-plugin).
It provides all [Units](/en/explanation/glossary#unit) with unique `SID`s ([Stable Identifier](/en/explanation/sids)) and name, as well as other debug information.

:::warning{title="Unstable"}
This SWC plugin, along with all other SWC plugins, is currently considered experimental and unstable.

SWC and Next.js might not follow semver when it comes to plugin compatibility.
:::

# Installation (#installation)

Install @effector/swc-plugin using your preferred package manager.

```bash
npm install -ED @effector/swc-plugin
```

## Versioning (#installation-versioning)

To avoid compatibility issues caused by breaking changes in SWC or Next.js, this plugin publishes different ['labels'](https://semver.org/#spec-item-9) for different underlying `@swc/core`. Refer to the table below to choose the correct plugin version for your setup.

:::tip
For better stability, we recommend pinning both your runtime (like Next.js or `@swc/core`) and the `@effector/swc-plugin` version.

Use the `--exact`/`--save-exact` option in your package manager to install specific, compatible versions. This ensures updates to one dependency don't break your application.
:::

| `@swc/core` version | Next.js version                          | Correct plugin version |
| ------------------- | ---------------------------------------- | ---------------------- |
| `>=1.3.63 <1.3.106` | `>=13.4.8 <=14.1.4`                      | `@swc1.3.63`           |
| `>=1.3.106 <1.4.0`  |                                          | `@swc1.3.106`          |
| `>=1.4.0 <1.6.0`    | `>=14.2.0 <=14.2.14`                     | `@swc1.4.0`            |
| `>=1.6.0 <1.7.0`    | `>=15.0.0-canary.37 <=15.0.0-canary.116` | `@swc1.6.0`            |
| `>=1.7.0`           | `>=15.0.0-canary.122`                    | `@swc1.7.0`            |

For more information on compatibility, refer to the SWC documentation on [Selecting the SWC Version](https://swc.rs/docs/plugin/selecting-swc-core).

# Usage (#usage)

To use the plugin, simply add it to your tool's configuration.

## Next.js (#usage-nextjs)

If you're using the [Next.js Compiler](https://nextjs.org/docs/architecture/nextjs-compiler) powered by SWC, add this plugin to your `next.config.js`.

```js
const nextConfig = {
  experimental: {
    // even if empty, pass an options object `{}` to the plugin
    swcPlugins: [["@effector/swc-plugin", {}]],
  },
};
```

You'll also need to install the official [`@effector/next`](https://github.com/effector/next) bindings to enable SSR/SSG.

:::warning{title="Turbopack"}
Note that some functionality may be broken when using Turbopack with NextJS, especially with [relative `factories`](#configuration-factories). Use at your own risk.
:::

## .swcrc (#usage-swcrc)

Add a new entry to `jsc.experimental.plugins` option in your `.swcrc`.

```json
{
  "$schema": "https://json.schemastore.org/swcrc",
  "jsc": {
    "experimental": {
      "plugins": [["@effector/swc-plugin", {}]]
    }
  }
}
```

# Configuration (#configuration)

## `factories` (#configuration-factories)

Specify an array of module names or files to treat as [custom factories](/en/explanation/sids/#custom-factories). When using SSR, factories is required for ensuring unique [`SID`](/en/explanation/sids)s across your application.

:::tip
Community packages (`patronum`, `@farfetched/core`, `atomic-router` and [`@withease/factories`](https://github.com/withease/factories)) are always enabled, so you don't need to list them explicitly.
:::

### Formulae (#configuration-factories-formulae)

```json
["@effector/swc-plugin", { "factories": ["./path/to/factory", "factory-package"] }]
```

- Type: `string[]`
- Default: `[]`

If you provide a relative path (starting with `./`), the plugin treats it as a local factory relative to your project's root directory. These factories can only be imported using relative imports within your code.

Otherwise, if you specify a package name or TypeScript alias, it's interpreted as an exact import specifier. You must use such import exactly as specified in configuration.

### Examples (#configuration-factories-examples)

```json
// configuraiton
["@effector/swc-plugin", { "factories": ["./src/factory"] }]
```

```ts
// file: /src/factory.ts
import { createStore } from "effector";

/* createBooleanStore is a factory */
export const createBooleanStore = () => createStore(true);
```

```ts
// file: /src/widget/user.ts
import { createBooleanStore } from "../factory";

const $boolean = createBooleanStore(); /* Treated as a factory! */
```

## `addNames` (#configuration-addNames)

Add names to [Units](/en/explanation/glossary#unit) when calling factories (like `createStore` or `createDomain`). This is helpful for debugging during development and testing, but its recommended to disable it for minification.

### Formulae (#configuration-addNames-formulae)

```json
["@effector/swc-plugin", { "addNames": true }]
```

- Type: `boolean`
- Default: `true`

## `addLoc` (#configuration-addLoc)

Include location information (file paths and line numbers) for [Units](/en/explanation/glossary#unit) and factories. This is useful for debugging with tools like [`effector-logger`](https://github.com/effector/logger).

### Formulae (#configuration-addLoc-formulae)

```json
["@effector/swc-plugin", { "addLoc": false }]
```

- Type: `boolean`
- Default: `false`

## `debugSids` (#configuration-debugSids)

Append the full file path and Unit name to generated `SID`s for easier debugging of SSR issues.

### Formulae (#configuration-debugSids-formulae)

```json
["@effector/swc-plugin", { "debugSids": false }]
```

- Type: `boolean`
- Default: `false`

## `forceScope` (#configuration-forceScope)

Inject `forceScope: true` into all [hooks](/en/api/effector-react/#hooks) or `@effector/reflect` calls to ensure your app always uses `Scope` during rendering. If `Scope` is missing, an error will be thrown, eliminating the need for `/scope` or `/ssr` imports.

:::info{title="Note"}
Read more about [Scope enforcement](/en/api/effector-react/module/scope/#scope-enforcement) in the `effector-react` documentation.
:::

### Formulae (#configuration-forceScope-formulae)

```json
["@effector/swc-plugin", { "forceScope": false }]
```

- Type: `boolean | { hooks: boolean, reflect: boolean }`
- Default: `false`

#### `hooks` (#configuration-forceScope-formulae-hooks)

Enforces all hooks from [`effector-react`](/en/api/effector-react#hooks) and [`effector-solid`](/en/api/effector-solid#reactive-helpers), like `useUnit` and `useList`, to use `Scope` in runtime.

#### `reflect` (#configuration-forceScope-formulae-reflect)

:::info{title="since"}
Supported by `@effector/reflect` since 9.0.0
:::

For [`@effector/reflect`](https://github.com/effector/reflect) users, enforces all components created with `reflect` library use `Scope` in runtime.

## `transformLegacyDomainMethods` (#configuration-transformLegacyDomainMethods)

When enabled (default), this option transforms [Unit creators in Domains](/en/api/effector/Domain#unit-creators), like `domain.event()` or `domain.createEffect()`. However, this transformation can be unreliable and may affect unrelated code. If that's the case for you, disabling this option can fix these issues.

Disabling this option will **stop** adding [`SID`](/en/explanation/sids)s and other debug information to these unit creators. Ensure your code does not depend on domain methods before disabling.

:::tip
Instead of using unit creators directly on domain, consider using the `domain` argument in regular methods.
:::

### Formulae (#configuration-transformLegacyDomainMethods-formulae)

```json
["@effector/swc-plugin", { "transformLegacyDomainMethods": true }]
```

- Type: `boolean`
- Default: `true`
