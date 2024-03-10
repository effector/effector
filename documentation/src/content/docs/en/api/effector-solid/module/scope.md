---
title: effector-solid/scope
description: Deprecated separate module of effector-solid that enforces library to use Scope
---

```ts
import {} from "effector-solid/scope";
```

:::warning{title="Deprecated"}
Since [effector 23.0.0](https://changelog.effector.dev/#effector-23-0-0) the core team recommends using the main module of `effector-solid` instead.
:::

Provides all exports from [effector-solid](/en/api/effector-solid), but enforces the application to use [Scope](/en/api/effector/scope) for all components.

## Usage (#usage)

You can use this module in the same way as [effector-solid](/en/api/effector-solid), but it will require passing [Scope](/en/api/effector/scope) to [Provider](/en/api/effector-solid/Provider) component.

```jsx
// main.js
import { fork } from "effector";
import { Provider } from "effector-solid/scope";
import { render } from "solid-js/web";

const scope = fork();

render(
  <Provider value={scope}>
    <Application />
  </Provider>,
  document.getElementById("root"),
);
```

## Migration (#migration)

Since `effector-solid/scope` is deprecated, it is recommended to migrate to [effector-solid](/en/api/effector-solid) by removing `scope` from the import path.

```diff
+ import { Provider } from "effector-solid";
- import { Provider } from "effector-solid/scope";
```

:::warning{title="Continued migration"}
`effector-solid` and `effector-solid/scope` do not share any code, so you have to migrate all your code to `effector-solid` at the same time, because otherwise, you will get runtime errors. These errors will occur because `effector-solid` and `effector-solid/scope` will use different instances of `Provider` and do not have access to each other's `Provider`.
:::

## Scope enforcement (#scope-enforcement)

All modern hooks of `effector-solid` are designed to work with [Scope](/en/api/effector/scope). If you want to imitate the behavior of the `effector-solid/scope` module, you can pass a second parameter to hooks with an option `forceScope: true`. In this case, the hook will throw an error if the [Scope](/en/api/effector/scope) is not passed to [Provider](/en/api/effector-solid/Provider).

```diff
- import { useUnit } from 'effector-solid/scope'
+ import { useUnit } from 'effector-solid'


function MyComponent() {
-  const { test } = useUnit({ text: $text })
+  const { test } = useUnit({ text: $text }, { forceScope: true })

  return <p>{text}</p>
}
```
