---
id: is
title: is
hide_title: true
---

# is

Namespace for unit validators

## `is.store(value)`

Checks if given value is [_store_](./Store.md)

**Returns**

boolean

```js
import {
  is,
  createStore,
  createEvent,
  createEffect,
  createDomain,
} from 'effector'

const event = createEvent()
const fx = createEffect()

const $store = createStore(null)

is.store($store)
// => true

is.store(event)
// => false

is.store(fx)
// => false

is.store(createDomain())
// => false

is.store(fx.pending)
// => true

is.store(fx.done)
// => false

is.store($store.updates)
// => false

is.store(null)
// => false
```

[Try it](https://share.effector.dev/Ycx0AeDY)

## `is.event(value)`

Checks if given value is [_event_](./Event.md)

**Returns**

boolean

```js
import {
  is,
  createStore,
  createEvent,
  createEffect,
  createDomain,
} from 'effector'

const event = createEvent()
const fx = createEffect()

const $store = createStore(null)

is.event($store)
// => false

is.event(event)
// => true

is.event(fx)
// => false

is.event(createDomain())
// => false

is.event(fx.pending)
// => false

is.event(fx.done)
// => true

is.event($store.updates)
// => true

is.event(null)
// => false
```

[Try it](https://share.effector.dev/A4wP5Z0a)

## `is.effect(value)`

Checks if given value is [_effect_](./Effect.md)

**Returns**

boolean

```js
import {
  is,
  createStore,
  createEvent,
  createEffect,
  createDomain,
} from 'effector'

const event = createEvent()
const fx = createEffect()

const $store = createStore(null)

is.effect($store)
// => false

is.effect(event)
// => false

is.effect(fx)
// => true

is.effect(createDomain())
// => false

is.effect(null)
// => false
```

[Try it](https://share.effector.dev/v3t5FEGL)

## `is.domain(value)`

Checks if given value is [_domain_](./Domain.md)

**Returns**

boolean

```js
import {
  is,
  createStore,
  createEvent,
  createEffect,
  createDomain,
} from 'effector'

const event = createEvent()
const fx = createEffect()

const $store = createStore(null)

is.domain($store)
// => false

is.domain(event)
// => false

is.domain(fx)
// => false

is.domain(createDomain())
// => true

is.domain(null)
// => false
```

[Try it](https://share.effector.dev/kifqsNiu)

## `is.scope(value)`

:::note since
effector 22.0.0
:::

Checks if given value is [_scope_](./Scope.md)

**Returns**

boolean

```js
import {fork} from 'effector'

const event = createEvent()
const fx = createEffect()

const store = createStore(null)
const scope = fork()

is.scope(scope)
// => true

is.scope(store)
// => false

is.scope(event)
// => false

is.scope(fx)
// => false

is.scope(createDomain())
// => false

is.scope(null)
// => false
```

[Try it](https://share.effector.dev/UIJEqSIh  )

## `is.unit(value)`

Checks if given value is [unit](../../glossary.md#unit): [store](./Store.md), [event](./Event.md), [effect](./Effect.md), [domain](./Domain.md) or [scope](./Scope.md)

**Returns**

boolean

```js
import {
  is,
  createStore,
  createEvent,
  createEffect,
  createDomain,
  fork,
} from 'effector'

const event = createEvent()
const fx = createEffect()

const $store = createStore(null)
const scope = fork()

is.unit(scope)
// => true

is.unit($store)
// => true

is.unit(event)
// => true

is.unit(fx)
// => true

is.unit(createDomain())
// => true

is.unit(fx.pending)
// => true

is.unit(fx.done)
// => true

is.unit($store.updates)
// => true

is.unit(null)
// => false
```

[Try it](https://share.effector.dev/8HExLT7g)
