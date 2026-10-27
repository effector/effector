---
title: hydrateScope
description: hydrateScope is a method for hydrating a scope with serialized values and controlling watcher execution timing
redirectFrom:
  - /api/effector/hydrateScope
  - /docs/api/effector/hydrateScope
---

```ts
import { hydrateScope, type Scope } from "effector";
```

# Methods (#methods)

## `hydrateScope(config)` (#methods-hydrateScope-config)

A companion method for [_serialize_](/en/api/effector/serialize) and [_fork_](/en/api/effector/fork). It allows you to hydrate a scope with serialized values from the server, with fine-grained control over when watchers are executed.

:::info{title="When to use"}

This method is intended for **custom framework integrations** like Next.js App Router, where you need fine-grained control over watcher execution timing.

For most SSR cases where there is no advanced framework routing, it is recommended to use [`fork({values})`](/en/api/effector/fork) instead. See the [Server-Side Rendering guide](/en/guides/server-side-rendering) for more details.

:::

:::info{title="since"}

introduced in [effector 23.0.0](https://changelog.effector.dev/#effector-23-0-0)

:::

:::warning{title="Requirements"}

[_Babel plugin_](/en/api/effector/babel-plugin) or [_SWC plugin_](/en/api/effector/swc-plugin) is required for using this method, as these plugins provide the SIDs for stores, which are required for stable state serialization.

You can find deep-dive [explanation here](/en/explanation/sids)

:::

### Formulae (#methods-hydrateScope-config-formulae)

```ts
hydrateScope(config: {
  scope: Scope
  values: {[sid: string]: any}
  scheduleWatchers?: (run: () => void) => void
}): void
```

### Arguments (#methods-hydrateScope-config-arguments)

1. `config` (_Object_): Configuration object
   - `scope` ([_Scope_](/en/api/effector/Scope)): The target scope to hydrate with values
   - `values` (_Object_): Serialized values object with SIDs as keys (typically from `serialize(scope)`)
   - `scheduleWatchers` (_Function_, optional): Callback to control when watchers are executed. Receives a `run` function that should be called to execute watchers.

### Returns (#methods-hydrateScope-config-returns)

`void`

### Examples (#methods-hydrateScope-config-examples)

#### Basic hydration (#methods-hydrateScope-config-examples-basic)

```js
import { createStore, createEvent, fork, serialize, hydrateScope, allSettled } from "effector";

const inc = createEvent();
const $counter = createStore(0);
$counter.on(inc, (state) => state + 1);

// Server side
const serverScope = fork();
await allSettled(inc, { scope: serverScope });
const values = serialize(serverScope);

// Client side
const clientScope = fork();
hydrateScope({ scope: clientScope, values });

console.log(clientScope.getState($counter)); // => 1
```

[Try it](https://share.effector.dev/example)

#### With custom serialization (#methods-hydrateScope-config-examples-custom-serialization)

```js
import { createStore, createEvent, fork, serialize, hydrateScope, allSettled } from "effector";

const updateDate = createEvent();
const $date = createStore(new Date(0), {
  serialize: {
    write: (value) => value.toISOString(),
    read: (value) => new Date(value),
  },
});

$date.on(updateDate, () => new Date(2023, 0, 1));

// Server side
const serverScope = fork();
await allSettled(updateDate, { scope: serverScope });
const values = JSON.parse(JSON.stringify(serialize(serverScope)));

// Client side
const clientScope = fork();
hydrateScope({ scope: clientScope, values });

console.log(clientScope.getState($date)); // => Date object for 2023-01-01
```

[Try it](https://share.effector.dev/example)

#### With scheduled watchers for React integration (#methods-hydrateScope-config-examples-scheduled-watchers)

Note that only subscriptions created with `createWatch` (used under the hood of e.g. `effector-react`) will be run.

```js
import { createStore, createEvent, fork, serialize, hydrateScope, allSettled, createWatch } from "effector";

const inc = createEvent();
const $counter = createStore(0);
$counter.on(inc, (state) => state + 1);

// Server side
const serverScope = fork();
await allSettled(inc, { scope: serverScope });
const values = serialize(serverScope);

// Client side
const clientScope = fork();

// Hydrate with scheduled watchers
hydrateScope({
  scope: clientScope,
  values,
  scheduleWatchers: (run) => {
    // Delay watchers execution e.g. to avoid React warnings about state updates during render
    queueMicrotask(run);
  },
});
```

[Try it](https://share.effector.dev/example)
