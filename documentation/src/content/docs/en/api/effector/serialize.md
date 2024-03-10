---
title: serialize
description: serialize is a method for serializing application states within a scope
redirectFrom:
  - /api/effector/serialize
  - /docs/api/effector/serialize
---

```ts
import { serialize, type Scope } from "effector";
```

# Methods (#methods)

## `serialize(scope, params)` (#methods-serialize)

A companion method for [_fork_](/en/api/effector/fork). It allows us to get a serialized value for all the store states within a [scope](/en/api/effector/Scope). The main purpose is an application state serialization on the server side during SSR.

:::warning{title="Requirements"}
[_Babel plugin_](/en/api/effector/babel-plugin) or [_SWC plugin_](https://github.com/effector/swc-plugin) is required for using this method, as these plugins provide the SIDs for stores, which are required for stable state serialization.

You can find deep-dive [explanation here](/en/explanation/sids)
:::

### Formulae (#methods-serialize-formulae)

```ts
serialize(scope: Scope, { ignore?: Array<Store<any>>; onlyChanges?: boolean }): {[sid: string]: any}
```

### Arguments (#methods-serialize-arguments)

1. `scope` [_Scope_](/en/api/effector/Scope): a scope object (forked instance)
2. `ignore` Optional array of [_Store_](/en/api/effector/Store) to be omitted during serialization (added 20.14.0)
3. `onlyChanges` Optional boolean flag to ignore stores which didn't change in fork (prevent default values from being carried over network)

:::warning{title="Deprecated"}
Since [effector 23.0.0](https://changelog.effector.dev/#effector-23-0-0) property `onlyChanges` is deprecated.
:::

### Returns (#methods-serialize-returns)

An object with store values using sids as a keys

:::warning{title="Reminder"}
If a store [does not have a sid](/en/api/effector/babel-plugin#sid), its value will be omitted during serialization.
:::

### Examples (#methods-serialize-examples)

#### Serialize forked instance state (#methods-serialize-examples-serializeForkedInstanceState)

```js
import { createDomain, fork, serialize } from "effector";

const domain = createDomain();
const $store = domain.createStore(42);
const scope = fork(domain);

console.log(serialize(scope)); // => {[sid]: 42}
```

[Try it](https://share.effector.dev/zlRJbjei)

#### Using with `onlyChanges` (#methods-serialize-examples-usingWithOnlyChanges)

With `onlyChanges`, this method will serialize only stores which were changed by some trigger during work or defined in `values` field by [fork](/en/api/effector/fork) or [hydrate(scope)](/en/api/effector/hydrate). Once being changed, a store will stay marked as changed in given scope even if it was turned back to the default state during work, otherwise client will not update that store on its side, which is unexpected and inconsistent.
This allows us to hydrate client state several times, for example, during route changes in next.js

```js
import { createDomain, fork, serialize, hydrate } from "effector";

const app = createDomain();

/** store which we want to hydrate by server */
const $title = app.createStore("dashboard");

/** store which is not used by server */
const $clientTheme = app.createStore("light");

/** scope in client app */
const clientScope = fork(app, {
  values: new Map([
    [$clientTheme, "dark"],
    [$title, "profile"],
  ]),
});

/** server side scope of chats page created for each request */
const chatsPageScope = fork(app, {
  values: new Map([[$title, "chats"]]),
});

/** this object will contain only $title data
 * as $clientTheme never changed in server scope */
const chatsPageData = serialize(chatsPageScope, { onlyChanges: true });
console.log(chatsPageData);
// => {'-l644hw': 'chats'}

/** thereby, filling values from a server will touch only relevant stores */
hydrate(clientScope, { values: chatsPageData });

console.log(clientScope.getState($clientTheme));
// => dark
```

[Try it](https://share.effector.dev/BQhzISFV)
