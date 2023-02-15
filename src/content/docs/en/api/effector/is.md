---
title: is
---

Namespace for unit validators

## `is.store(value)`

Checks if given value is [_store_](/en/api/effector/Store)

**Returns**

boolean

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

## `is.event(value)`

Checks if given value is [_event_](/en/api/effector/Event)

**Returns**

boolean

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

## `is.effect(value)`

Checks if given value is [_effect_](/en/api/effector/Effect)

**Returns**

boolean

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

## `is.domain(value)`

Checks if given value is [_domain_](/en/api/effector/Domain)

**Returns**

boolean

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

## `is.scope(value)`

:::info{title="since"}
[effector 22.0.0](https://changelog.effector.dev/#effector-22-0-0)
:::

Checks if given value is [_scope_](/en/api/effector/Scope).

**Returns**

_boolean_

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

## `is.unit(value)`

Checks if given value is [Unit](/en/explanation/glossary#unit): [Store](/en/api/effector/Store), [Event](/en/api/effector/Event), [Effect](/en/api/effector/Effect), [Domain](/en/api/effector/Domain) or [Scope](/en/api/effector/Scope)

**Returns**

boolean

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

## `is.attached(value)`

:::info{title="since"}
[effector 22.4.0](https://changelog.effector.dev/#effector-22-4-0)
:::

Checks if given value is [_effect_](/en/api/effector/Effect) created via [_attach_](/en/api/effector/attach) method.
If passed not an effect, returns `false`.

**Returns**

boolean

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

### Use case

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
