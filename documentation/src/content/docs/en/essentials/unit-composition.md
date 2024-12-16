---
title: Unit Composition
description: How to connect units using sample and attach
---

# Unit Composition in effector

Effector has two powerful tools for connecting units together: `sample` and `attach`. While they might seem similar, each has its own features and use cases.

## Sample: connecting data and events

`sample` is a universal tool for connecting units. Its main purpose is to take data from one place `source` and pass it to another place `target` when a specific trigger `clock` fires.

### Basic sample usage

```typescript
import { createStore, createEvent, sample, createEffect } from "effector";

const buttonClicked = createEvent();
const $userName = createStore("Bob");
const fetchUserFx = createEffect((userName) => {
  // logic
});

// When button is clicked, get current name
sample({
  clock: buttonClicked,
  source: $userName,
  target: fetchUserFx,
});
```

As trigger in `sample` also could be `source`.

```ts
import { createStore, sample } from "effector";

const $currentUser = createStore({ name: "Bob", age: 25 });

// creates derived store which updates when source changes
const $userAge = sample({
  source: $currentUser,
  fn: (user) => user.age,
});
```

When to use `sample`:

1. When you need to get data from a store at the moment of an event
2. For data transformation before sending
3. For conditional processing using filter
4. For synchronizing multiple data sources

### Advanced sample features

#### Data transformation

Often you need not just to pass data, but transform it. For this, the `fn` parameter is used:

```ts
import { createEvent, createStore, sample } from "effector";

const buttonClicked = createEvent();

const $user = createStore({ name: "Bob", age: 25 });

const $userInfo = createStore("");

sample({
  clock: buttonClicked,
  source: $user,
  fn: (user) => `${user.name} is ${user.age} years old`,
  target: $userInfo,
});
```

#### Event Filtering

`sample` allows filtering events using the `filter` parameter:

```ts
import { createEvent, createStore, sample, createEffect } from "effector";

type UserFormData = {
  username: string;
  age: number;
};

const submitForm = createEvent();
const $formData = createStore<UserFormData>({ username: "", age: 0 });
const submitToServerFx = createEffect((formData: UserFormData) => {
  // logic
});

sample({
  clock: submitForm,
  source: $formData,
  filter: (form) => form.age >= 18 && form.username.length > 0,
  target: submitToServerFx,
});

submitForm();
```

When `submitForm` is called, we take data from `source`, check conditions in `filter`, if check passes successfully, we return true, otherwise false. If check passes successfully, the `target` is called.

:::warning{title="Important information"}
The fn and filter functions must be pure functions!
:::

#### Combining Multiple Sources

You can use multiple stores as a data source:

```ts
import { createEvent, createStore, sample, createEffect } from "effector";

type SubmitSearch = {
  query: string;
  filters: Array<string>;
};

const submitSearchFx = createEffect((params: SubmitSearch) => {
  /// logic
});

const searchClicked = createEvent();
const $searchQuery = createStore("");
const $filters = createStore<string[]>([]);

sample({
  clock: searchClicked,
  source: {
    query: $searchQuery,
    filters: $filters,
  },
  target: submitSearchFx,
});
```

### Sample Return Value

`sample` returns a unit whose type depends on the configuration:

#### With target

If `target` is specified, `sample` will return new unit, but same as same target:

```ts
import { createEvent, createStore, sample, createEffect } from "effector";

const $store = createStore(0);
const submitted = createEvent();
const sendData = createEvent<number>();

// result will have type Event<number>
const result = sample({
  clock: submitted,
  source: $store,
  target: sendData,
});
```

#### Without target

When `target` is not specified, the return type depends on the provided parameters.<br/>
If `filter` is **NOT** specified, and both `clock` and `source` are **stores**, then the result will also be a [store](/api/effector/Store) with the data type from `source`.<br/>

```ts
import { createStore, sample } from "effector";

const $store = createStore("");
const $secondStore = createStore(0);

const $derived = sample({
  clock: $secondStore,
  source: $store,
});
// $derived will be Store<string>

const $secondDerived = sample({
  clock: $secondStore,
  source: $store,
  fn: () => false,
});
// $secondDerived will be Store<boolean>
```

If `fn` is used, the return type will correspond to the function's result.

In other cases, the return value will be an event with a type depending on the `source`.

```ts
import { createStore, createEvent, sample } from "effector";

const $store = createStore(0);
const submitted = createEvent<string>();

const event = sample({
  clock: submitted,
  source: $store,
});
// event has type Event<number>

const secondSampleEvent = sample({
  clock: submitted,
  source: $store,
  fn: () => true,
});
// Event<true>
```

### Practical Example

```ts
import { createStore, createEvent, sample } from "effector";

const userSelected = createEvent<number>();

const $users = createStore<User[]>([]);
const $selectedUserId = createStore<number | null>(null);
$selectedUserId.on(userSelected, (_, userId) => userId);

// Create a derived store that will hold the selected user
const $selectedUser = sample({
  clock: $selectedUserId,
  source: $users,
  fn: (users, id) => users.find((user) => user.id === id) || null,
});
// $selectedUser has type Store<User | null>

// Create an event that will only trigger for admins
const adminSelected = sample({
  clock: userSelected,
  source: $users,
  fn: (users, id) => users.find((user) => user.id === id && user.role === "admin"),
  filter: Boolean, // will only trigger if user is found and is admin
});
// adminSelected has type Event<User>
```

## Attach: Effects Specialization

`attach` is a tool for creating new effects based on existing ones, with access to data from stores. This is especially useful when you need to:

- Add context to an effect
- Reuse effect logic with different parameters
- Encapsulate store access

```ts
import { attach, createEffect, createStore } from "effector";

type SendMessageParams = { text: string; token: string };

// Base effect for sending data
const baseSendMessageFx = createEffect<SendMessageParams, void>(async ({ text, token }) => {
  await fetch("/api/messages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });
});

// Store with auth token
const $authToken = createStore("default-token");

// Create a specialized effect that automatically uses the token
const sendMessageFx = attach({
  effect: baseSendMessageFx,
  source: $authToken,
  mapParams: (text: string, token) => ({
    text,
    token,
  }),
});

// Now you can call the effect with just the message text
sendMessageFx("Hello!"); // token will be added automatically
```

It's very convenient to use `attach` for logic reuse:

```ts
const fetchDataFx = createEffect<{ endpoint: string; token: string }, any>();

// Create specialized effects for different endpoints
const fetchUsersFx = attach({
  effect: fetchDataFx,
  mapParams: (_, token) => ({
    endpoint: "/users",
    token,
  }),
  source: $authToken,
});

const fetchProductsFx = attach({
  effect: fetchDataFx,
  mapParams: (_, token) => ({
    endpoint: "/products",
    token,
  }),
  source: $authToken,
});
```
