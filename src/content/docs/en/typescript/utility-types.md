---
title: Utility Types
redirectFrom:
  - /docs/typescript/utility-types
  - /typescript/utility-types
---

Effector provides several utility types to facilitate getting a type of value from the unit.

## `UnitValue<Type>`

Taking out of [Unit](/en/explanation/glossary#common-unit) value type.

### Example

```ts
import { createEffect, createStore, createDomain, createEvent, fork, UnitValue } from "effector";

const event = createEvent<{ id: string; name?: string } | { id: string }>();
const $store = createStore([false, true]);
const effect = createEffect<{ token: string }, any, string>(() => {});
const domain = createDomain();
const scope = fork();

type UnitEventType = UnitValue<typeof event>;
// {id: string; name?: string | undefined} | {id: string}

type UnitStoreType = UnitValue<typeof store>;
// boolean[]

type UnitEffectType = UnitValue<typeof effect>;
// {token: string}

type UnitDomainType = UnitValue<typeof domain>;
// any

type UnitScopeType = UnitValue<typeof scope>;
// any
```

## `StoreValue<Type>`

Taking out of [Store](/en/api/effector/Store) value type.

### Example

```ts
import { createStore, StoreValue } from "effector";

const $store = createStore(true);

type StoreValueType = StoreValue<typeof $store>;
// boolean
```

## `EventPayload<Type>`

Taking out of [Event](/en/api/effector/Event) payload type.

### Example

```ts
import { createEvent, EventPayload } from "effector";

const event = createEvent<{ id: string }>();

type EventPayloadType = EventPayload<typeof event>;
// {id: string}
```

## `EffectParams<Type>`

Taking out of [Effect](/en/api/effector/Effect) params type.

### Example

```ts
import { createEffect, EffectParams } from "effector";

const fx = createEffect<
  { id: string },
  { name: string; isAdmin: boolean },
  { statusText: string; status: number }
>(() => ({ name: "Alice", isAdmin: false }));

type EffectParamsType = EffectParams<typeof fx>;
// {id: string}
```

## `EffectResult<Type>`

Taking out of [Effect](/en/api/effector/Effect) result type.

### Example

```ts
import { createEffect, EffectResult } from "effector";

const fx = createEffect<
  { id: string },
  { name: string; isAdmin: boolean },
  { statusText: string; status: number }
>(() => ({ name: "Alice", isAdmin: false }));

type EffectResultType = EffectResult<typeof fx>;
// {name: string; isAdmin: boolean}
```

## `EffectError<Type>`

Taking out of [Effect](/en/api/effector/Effect) error type.

### Example

```ts
import { createEffect, EffectError } from "effector";

const fx = createEffect<
  { id: string },
  { name: string; isAdmin: boolean },
  { statusText: string; status: number }
>(() => ({ name: "Alice", isAdmin: false }));

type EffectErrorType = EffectError<typeof fx>;
// {statusText: string; status: number}
```
