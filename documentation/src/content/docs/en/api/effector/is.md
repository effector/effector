---
title: is
redirectFrom:
  - /api/effector/is
  - /docs/api/effector/is
---

```ts
import { is, type Unit } from "effector";
```

Namespace for unit validators.

# Methods (#methods)

## `is.store(value)` (#methods-isStore)

Checks if given value is [_store_](/en/api/effector/Store)

### Returns (#methods-isStore-returns)

`boolean` — Type-guard

### Examples (#methods-isStore-examples)

```js
import { is, createStore, createEvent, createEffect, createDomain } from "effector";

const $store = createStore(null);
const event = createEvent();
const fx = createEffect();

is.store($store);
// => true

is.store(event);
// => false

is.store(fx);
// => false

is.store(createDomain());
// => false

is.store(fx.pending);
// => true

is.store(fx.done);
// => false

is.store($store.updates);
// => false

is.store(null);
// => false
```

[Try it](https://share.effector.dev/4vzdWan1)

## `is.event(value)` (#methods-isEvent)

Checks if given value is [_event_](/en/api/effector/Event)

### Returns (#methods-isEvent-returns)

`boolean` — Type-guard

### Examples (#methods-isEvent-examples)

```js
import { is, createStore, createEvent, createEffect, createDomain } from "effector";

const $store = createStore(null);
const event = createEvent();
const fx = createEffect();

is.event($store);
// => false

is.event(event);
// => true

is.event(fx);
// => false

is.event(createDomain());
// => false

is.event(fx.pending);
// => false

is.event(fx.done);
// => true

is.event($store.updates);
// => true

is.event(null);
// => false
```

[Try it](https://share.effector.dev/hB0JEiIo)

## `is.effect(value)` (#methods-isEffect)

Checks if given value is [_effect_](/en/api/effector/Effect)

### Returns (#methods-isEffect-returns)

`boolean` — Type-guard

### Examples (#methods-isEffect-examples)

```js
import { is, createStore, createEvent, createEffect, createDomain } from "effector";

const $store = createStore(null);
const event = createEvent();
const fx = createEffect();

is.effect($store);
// => false

is.effect(event);
// => false

is.effect(fx);
// => true

is.effect(createDomain());
// => false

is.effect(null);
// => false
```

[Try it](https://share.effector.dev/ZdZ2N6VG)

## `is.targetable` (#methods-isTargetable)

Checks if given value can be used in operators target (or be called as a function in case of events)

### Returns (#methods-isTargetable-returns)

`boolean` — Type-guard

### Examples (#methods-isTargetable-examples)

```js
import { is, createStore, createEvent, createEffect } from "effector";

const $store = createStore(null);
const $mapped = $store.map((x) => x);
const event = createEvent();
const mappedEvent = event.map((x) => x);
const fx = createEffect();

is.targetable($store);
// => true

is.targetable($mapped);
// => false

is.targetable(event);
// => true

is.targetable(mappedEvent);
// => false

is.targetable(fx);
// => true
```

## `is.domain(value)` (#methods-isDomain)

Checks if given value is [_domain_](/en/api/effector/Domain)

### Returns (#methods-isDomain-returns)

`boolean` — Type-guard

### Examples (#methods-isDomain-examples)

```js
import { is, createStore, createEvent, createEffect, createDomain } from "effector";

const $store = createStore(null);
const event = createEvent();
const fx = createEffect();

is.domain($store);
// => false

is.domain(event);
// => false

is.domain(fx);
// => false

is.domain(createDomain());
// => true

is.domain(null);
// => false
```

[Try it](https://share.effector.dev/Iea0gmfD)

## `is.scope(value)` (#methods-isScope)

:::info{title="since"}
[effector 22.0.0](https://changelog.effector.dev/#effector-22-0-0)
:::

Checks if given value is [_scope_](/en/api/effector/Scope) since [effector 22.0.0](https://changelog.effector.dev/#effector-22-0-0).

### Returns (#methods-isScope-returns)

`boolean` — Type-guard

### Examples (#methods-isScope-examples)

```js
import { fork } from "effector";

const $store = createStore(null);
const event = createEvent();
const fx = createEffect();
const scope = fork();

is.scope(scope);
// => true

is.scope($store);
// => false

is.scope(event);
// => false

is.scope(fx);
// => false

is.scope(createDomain());
// => false

is.scope(null);
// => false
```

[Try it](https://share.effector.dev/hF0krFUK)

## `is.unit(value)` (#methods-isUnit)

Checks if given value is [Unit](/en/explanation/glossary#unit): [Store](/en/api/effector/Store), [Event](/en/api/effector/Event), [Effect](/en/api/effector/Effect), [Domain](/en/api/effector/Domain) or [Scope](/en/api/effector/Scope)

### Returns (#methods-isUnit-returns)

`boolean` — Type-guard

### Examples (#methods-isUnit-examples)

```js
import { is, createStore, createEvent, createEffect, createDomain, fork } from "effector";

const $store = createStore(null);
const event = createEvent();
const fx = createEffect();
const scope = fork();

is.unit(scope);
// => true

is.unit($store);
// => true

is.unit(event);
// => true

is.unit(fx);
// => true

is.unit(createDomain());
// => true

is.unit(fx.pending);
// => true

is.unit(fx.done);
// => true

is.unit($store.updates);
// => true

is.unit(null);
// => false
```

[Try it](https://share.effector.dev/iOpDvweB)

## `is.attached(value)` (#methods-isAttached)

:::info{title="since"}
[effector 22.4.0](https://changelog.effector.dev/#effector-22-4-0)
:::

Checks if given value is [_effect_](/en/api/effector/Effect) created via [_attach_](/en/api/effector/attach) method. If passed not an effect, returns `false`.

### Returns (#methods-isAttached-returns)

`boolean` — Type-guard

### Usage (#methods-isAttached-usage)

Sometimes you need to add an error log on effects failures, but only on effects that have been "localized" via `attach`.
If you leave `onCreateEffect` as it is, without checks, the error log will be duplicated, because it will happen on the parent and the child effect.

```js
import { createDomain, attach, is } from "effector";

const logFailuresDomain = createDomain();

logFailuresDomain.onCreateEffect((effect) => {
  if (is.attached(effect)) {
    effect.fail.watch(({ params, error }) => {
      console.warn(`Effect "${effect.compositeName.fullName}" failed`, params, error);
    });
  }
});

const baseRequestFx = logFailuresDomain.createEffect((path) => {
  throw new Error(`path ${path}`);
});

const loadDataFx = attach({
  mapParams: () => "/data",
  effect: baseRequestFx,
});

const loadListFx = attach({
  mapParams: () => "/list",
  effect: baseRequestFx,
});

loadDataFx();
loadListFx();
```

[Try it](https://share.effector.dev/NxQseHOR)

### Examples (#methods-isAttached-examples)

```js
import { is, createStore, createEvent, createEffect, createDomain, attach } from "effector";

const $store = createStore(null);
const event = createEvent();
const fx = createEffect();

const childFx = attach({
  effect: fx,
});

is.attached(childFx);
// => true

is.attached(fx);
// => false

is.attached($store);
// => false

is.attached(event);
// => false

is.attached(createDomain());
// => false

is.attached(null);
// => false
```

[Try it](https://share.effector.dev/qsdTF7og)
