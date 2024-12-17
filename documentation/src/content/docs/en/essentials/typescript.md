---
title: TypeScript in effector
description: Using TypeScript with effector and typing examples
---

# TypeScript in effector

Effector provides first-class TypeScript support out of the box, giving you reliable typing and excellent developer experience when working with the library. In this section, we'll look at both basic typing concepts and advanced techniques for working with types in effector.<br/>

## Basic Typing

### Events (#events)

Events in effector can be typed by passing a type to the function's generic:

```ts
import { createEvent } from "effector";

// Event without parameters
const clicked = createEvent();
// Event<void>

// Event with a parameter
const userNameChanged = createEvent<string>();
// Event<string>

// Event with a complex parameter
const formSubmitted = createEvent<{
  username: string;
  password: string;
}>();
```

:::info{title="Automatic Type Inference"}
If you don't explicitly specify a type, TypeScript will automatically infer the type Event<void> for events without parameters.
:::

### Stores (#stores)

Stores can also be typed by passing a type to the function's generic:

```ts
import { createStore } from "effector";

// Basic store with a primitive value
const $counter = createStore(0);
// Store<number>

// Store with a complex object type
interface User {
  id: number;
  name: string;
  role: "admin" | "user";
}

const $user = createStore<User>({
  id: 1,
  name: "Bob",
  role: "user",
});

// Store with a generic type
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
}

const $users = createStore<PaginatedResponse<User>>({
  data: [],
  total: 0,
  page: 1,
});
```

### Effects (#effects)

Effects support typing of input parameters, return values, and errors:

```ts
import { createEffect } from "effector";
// Basic effect
const fetchUserFx = createEffect<string, User>(async (userId) => {
  const response = await fetch(`/api/users/${userId}`);

  return response.json();
});
// Effect<string, User>

// Effect with error handling
interface ApiError {
  code: number;
  message: string;
}

const fetchUserFx = createEffect<string, User, ApiError>(async (userId) => {
  const response = await fetch(`/api/users/${userId}`);

  if (!response.ok) {
    throw (await response.json()) as ApiError;
  }

  return response.json();
});
```

#### Error Typing with `createEffect`

Some code may throw exceptions of only certain types, for example, the axios library uses only `AxiosError` for errors. In effects, the Fail generic is used to describe error types.<br/>

To specify it when the argument type and result type are set explicitly (as the first and second generics of the `createEffect` method respectively), use the third generic of the method:

```ts
const fetchUserFx = createEffect<string, User, AxiosError>(async ({ warn }) => {
  // ...
  return "ok";
});
// => Effect<string, User, AxiosError>
```

When the effect handler is defined before the effect itself, TypeScript can determine the `Params` and `Done` types using `typeof handler` in the first generic, without explicitly specifying the types. In this case, the error type description can be passed as an optional second generic of the method:

```ts
const sendMessage = async (params: { text: string }) => {
  // ...
  return "ok";
};

const sendMessageFx = createEffect<typeof sendMessage, AxiosError>(sendMessage);
// => Effect<{text: string}, string, AxiosError>
```

:::info{title="Version Note"}
`Fail` as a second generic was added in effector 21.6.0
:::

## Advanced Typing Techniques

### Combines and Derived Units

#### event.prepend

To add types to events created using `event.prepend`, you need to add the type either to the prepend function argument or as a generic

```ts
const message = createEvent<string>();

const userMessage = message.prepend(({ text }: { text: string }) => text);
// userMessage has type Event<{text: string}>

const warningMessage = message.prepend<{ warn: string }>(({ warn }) => warn);
// warningMessage has type Event<{warn: string}>
```

#### Typing attach

To allow TypeScript to infer the types of the created effect, you can add a type to the first argument of `mapParams`, which will become the Params generic in the result

```ts
const sendTextFx = createEffect<{ text: string }, "ok">();

const sendWarningFx = attach({
  effect: sendTextFx,
  mapParams: ({ warn }: { warn: string }) => ({ text: warn }),
});
// sendWarningFx has type Effect<{warn: string}, 'ok'>
```

#### Typing split

TypeScript type predicates can be used to split the original event type into several variants (hence the name)

```ts
type UserMessage = { kind: "user"; text: string };
type WarnMessage = { kind: "warn"; warn: string };

const message = createEvent<UserMessage | WarnMessage>();

const { userMessage, warnMessage } = split(message, {
  userMessage: (msg): msg is UserMessage => msg.kind === "user",
  warnMessage: (msg): msg is WarnMessage => msg.kind === "warn",
});
// userMessage has type Event<UserMessage>
// warnMessage has type Event<WarnMessage>
```

### Type Utilities

Effector provides a set of utility types for working with unit types:

#### UnitValue

The `UnitValue` type is used to extract the data type from units:

```ts
import { UnitValue, createEffect, createStore, createEvent } from "effector";

const event = createEvent<{ id: string; name?: string } | { id: string }>();
type UnitEventType = UnitValue<typeof event>;
// {id: string; name?: string | undefined} | {id: string}

const $store = createStore([false, true]);
type UnitStoreType = UnitValue<typeof $store>;
// boolean[]

const effect = createEffect<{ token: string }, any, string>(() => {});
type UnitEffectType = UnitValue<typeof effect>;
// {token: string}

const scope = fork();
type UnitScopeType = UnitValue<typeof scope>;
// any
```

#### StoreValue

`StoreValue` is essentially similar to `UnitValue`, but works only with stores:

```ts
import { createStore, StoreValue } from "effector";

const $store = createStore(true);

type StoreValueType = StoreValue<typeof $store>;
// boolean
```

#### EventPayload

Extracts the data type from events.
Similar to `UnitValue`, but only for events:

```ts
import { createEvent, EventPayload } from "effector";

const event = createEvent<{ id: string }>();

type EventPayloadType = EventPayload<typeof event>;
// {id: string}
```

#### EffectParams

Takes an effect type as a generic parameter, allows getting the parameter type of an effect.

```ts
import { createEffect, EffectParams } from "effector";

const fx = createEffect<
  { id: string },
  { name: string; isAdmin: boolean },
  { statusText: string; status: number }
>(() => {
  // ...
  return { name: "Alice", isAdmin: false };
});

type EffectParamsType = EffectParams<typeof fx>;
// {id: string}
```

#### EffectResult

Takes an effect type as a generic parameter, allows getting the return value type of an effect.

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

#### EffectError

Takes an effect type as a generic parameter, allows getting the error type of an effect.

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
