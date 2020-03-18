---
id: is
title: is
hide_title: true
---

Namespace for unit validators

# `is.store(value)`

Checks if the passed object is [_store_](Store.md)

#### Returns

boolean

```js
import {
  is,
  createStore,
  createEvent,
  createEffect,
  createDomain,
} from 'effector'

const store = createStore(null)
const event = createEvent()
const fx = createEffect()

is.store(store)
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

is.store(store.updates)
// => false

is.store(null)
// => false
```

[Try it](https://share.effector.dev/4vzdWan1)

# `is.event(value)`

Checks if the passed object is [_event_](Event.md)

#### Returns

boolean

```js
import {
  is,
  createStore,
  createEvent,
  createEffect,
  createDomain,
} from 'effector'

const store = createStore(null)
const event = createEvent()
const fx = createEffect()

is.event(store)
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

is.event(store.updates)
// => true

is.event(null)
// => false
```

[Try it](https://share.effector.dev/hB0JEiIo)

# `is.effect(value)`

Checks if the passed object is [_effect_](Effect.md)

#### Returns

boolean

```js
import {
  is,
  createStore,
  createEvent,
  createEffect,
  createDomain,
} from 'effector'

const store = createStore(null)
const event = createEvent()
const fx = createEffect()

is.effect(store)
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

[Try it](https://share.effector.dev/ZdZ2N6VG)

# `is.domain(value)`

Checks if the passed object is [_domain_](Domain.md)

#### Returns

boolean

```js
import {
  is,
  createStore,
  createEvent,
  createEffect,
  createDomain,
} from 'effector'

const store = createStore(null)
const event = createEvent()
const fx = createEffect()

is.domain(store)
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

[Try it](https://share.effector.dev/Iea0gmfD)

# `is.unit(value)`

Checks if the passed object is [_event_](Event.md), [_store_](Store.md), [_effect_](Effect.md) or [_domain_](Domain.md)

#### Returns

boolean

```js
import {
  is,
  createStore,
  createEvent,
  createEffect,
  createDomain,
} from 'effector'

const store = createStore(null)
const event = createEvent()
const fx = createEffect()

is.unit(store)
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

is.unit(store.updates)
// => true

is.unit(null)
// => false
```

[Try it](https://share.effector.dev/1A3dObyT)
