---
title: effector-react/scope
description: Deprecated separate module of effector-react that enforces library to use Scope
---

```ts
import {} from "effector-react/scope";
```

:::warning{title="Deprecated"}
Since [effector 23.0.0](https://changelog.effector.dev/#effector-23-0-0) the core team recommends using main module of `effector-react` instead.
:::

Provides all exports from [effector-react](/en/api/effector-react), but enforces application to use [Scope](/en/api/effector/scope) for all components.

## Usage (#usage)

You can use this module in the same way as [effector-react](/en/api/effector-react), but it will require passing [Scope](/en/api/effector/scope) to [Provider](/en/api/effector-react/Provider) component.

```jsx
// main.js
import { fork } from "effector";
import { Provider } from "effector-react/scope";

import React from "react";
import ReactDOM from "react-dom/client";

const scope = fork();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider value={scope}>
    <Application />
  </Provider>,
);
```

## Migration (#migration)

Since `effector-react/scope` is deprecated, it is better to migrate to [effector-react](/en/api/effector-react) by removing `scope` from import path.

```diff
+ import { Provider } from "effector-react";
- import { Provider } from "effector-react/scope";
```

:::warning{title="Continues migration"}
`effector-react` and `effector-react/scope` do not share any code, so you have to migrate all your code to `effector-react` in the same time, because otherwise you will get runtime errors. These errors will be thrown because `effector-react` and `effector-react/scope` will use different instances `Provider` and do not have access to each other's `Provider`.
:::

If you use [Babel](https://babeljs.io/), you need to remove parameter [`reactSsr`](/en/api/effector/babel-plugin#reactssr) from `babel-plugin` configuration.

```diff
{
  "plugins": [
    [
      "effector/babel-plugin",
      {
-        "reactSsr": true
      }
    ]
  ]
}
```

If you use [SWC](/en/api/effector/swc-plugin), you need to remove [`bindings.react.scopeReplace`](https://github.com/effector/swc-plugin#bindings) parameter from `@effector/swc-plugin` configuration.

```diff
{
  "$schema": "https://json.schemastore.org/swcrc",
  "jsc": {
    "experimental": {
      "plugins": [
        "@effector/swc-plugin",
        {
          "bindings": {
            "react": {
-             "scopeReplace": true
            }
          }
        }
      ]
    }
  }
}
```

## Scope Enforcement (#scope-enforcement)

All modern hooks of `effector-react` are designed to work with [Scope](/en/api/effector/scope). If you want to imitate the behavior of `effector-react/scope` module, you can use the second parameter of hooks with an option `forceScope: true`. In this case, the hook will throw an error if the [Scope](/en/api/effector/scope) is not passed to [Provider](/en/api/effector-react/Provider).

```diff
- import { useUnit } from 'effector-react/scope'
+ import { useUnit } from 'effector-react'


function Example() {
-  const { text } = useUnit({ text: $text })
+  const { text } = useUnit({ text: $text }, { forceScope: true })

  return <p>{text}</p>
}
```
