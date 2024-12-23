---
title: Unit Composition
description: How to connect units using sample and attach
---

# Unit Composition in Effector (#unit-composition)

Effector has two powerful methods for connecting units together: `sample` and `attach`. While they may seem similar, each has its own characteristics and use cases.

## Sample: Connecting Data and Events (#sample)

`sample` is a universal method for connecting units. Its main task is to take data from one place `source` and pass it to another place `target` when a specific trigger `clock` fires.

The general pattern of the sample method works as follows:

1. Trigger when `clock` is called
2. Take data from `source`
3. `filter` the data, if everything is correct, return `true` and continue the chain, otherwise `false`
4. Transform the data using `fn`
5. Pass the data to `target`

### Basic Usage of Sample (#sample-basic-example)

```ts
import { createStore, createEvent, sample, createEffect } from "effector";

const buttonClicked = createEvent();

const $userName = createStore("Bob");

const fetchUserFx = createEffect((userName) => {
  // logic
});

// Get current name when button is clicked
sample({
  clock: buttonClicked,
  source: $userName,
  target: fetchUserFx,
});
```

:::tip{title="Versatility of sample"}
If you don't specify `clock`, then `source` can also serve as the trigger. You must use at least one of these properties in the argument!
:::

```ts
import { createStore, sample } from "effector";

const $currentUser = createStore({ name: "Bob", age: 25 });

// creates a derived store that updates when source changes
const $userAge = sample({
  source: $currentUser,
  fn: (user) => user.age,
});
// equivalent to
const $userAgeViaMap = $currentUser.map((currentUser) => currentUser.age);
```

As you can see, the sample method is very flexible and can be used in various scenarios:

- When you need to take data from a store at the moment of an event
- For data transformation before sending
- For conditional processing via filter
- For synchronizing multiple data sources
- Sequential chain of unit launches

### Data Filtering (#sample-data-filtering)

You may need to start a call chain when some conditions occurs. For such situations, the `sample` method allows filtering data using the `filter` parameter:

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

When `submitForm` is called, we take data from `source`, check conditions in `filter`, if the check passes successfully, we return `true` and call `target`, otherwise `false` and do nothing more.

:::warning{title="Important information"}
The `fn` and `filter` functions must be pure functions! A pure function is a function that always returns the same result for the same input data and produces no side effects (doesn't change data outside its scope).
:::

### Data Transformation (#sample-transform-data)

Often you need to not just pass data, but also transform it. The `fn` parameter is used for this:

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

### Multiple Data Sources (#sample-multiple-sources)

You can use multiple stores as data sources:

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

### Multiple triggers for sample (#multiple-clocks-in-sample)

`sample` allows you to use an array of events as a `clock`, which is very convenient when we need to process several different triggers in the same way. This helps avoid code duplication and makes the logic more centralized:

```ts
import { createEvent, createStore, sample } from "effector";

// Events for different user actions
const saveButtonClicked = createEvent();
const ctrlSPressed = createEvent();
const autoSaveTriggered = createEvent();

// Common data storage
const $formData = createStore({ text: "" });

// Save effect
const saveDocumentFx = createEffect((data: { text: string }) => {
  // Save logic
});

// Single point for document saving that triggers from any source
sample({
  // All these events will trigger saving
  clock: [saveButtonClicked, ctrlSPressed, autoSaveTriggered],
  source: $formData,
  target: saveDocumentFx,
});
```

### Array of targets in sample (#multiple-targets-in-sample)

`sample` allows you to pass an array of units to `target`, which is useful when you need to send the same data to multiple destinations simultaneously. You can pass an array of any units - events, effects, or stores to `target`.

```ts
import { createEvent, createStore, createEffect, sample } from "effector";

// Create units where data will be directed
const userDataReceived = createEvent<User>();
const $lastUserData = createStore<User | null>(null);
const saveUserFx = createEffect<User, void>((user) => {
  // Save user
});
const logUserFx = createEffect<User, void>((user) => {
  // Log user actions
});

const userUpdated = createEvent<User>();

// When user is updated:
// - Save data through saveUserFx
// - Send to logging system through logUserFx
// - Update store $lastUserData
// - Trigger userDataReceived event
sample({
  clock: userUpdated,
  target: [saveUserFx, logUserFx, $lastUserData, userDataReceived],
});
```

Key points:

- All units in target must be type-compatible with data from `source`/`clock`
- The execution order of targets is guaranteed - they will be called in the order written
- You can combine different types of units in the target array

### Return Value of Sample (#sample-return-value)

`sample` returns a unit whose type depends on the configuration:

#### With Target (#sample-return-value-with-target)

If `target` is specified, `sample` will return that same `target`:

```ts
const $store = createStore(0);
const submitted = createEvent();
const sendData = createEvent<number>();

// result will have type EventCallable<number>
const result = sample({
  clock: submitted,
  source: $store,
  target: sendData,
});
```

#### Without Target (#sample-return-value-without-target)

<!-- todo add link to Manage stores page about derived stores -->

When `target` is not specified, the return value type depends on the parameters passed.<br/>
If `filter` is **NOT** specified, and both `clock` and `source` **are stores**, then the result will be a **derived [store](/en/api/effector/Store)** with the data type from `source`.

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

If `fn` is used, the return value type will correspond to the function's result.

<!-- todo add link to Events page about derived events -->

In other cases, the return value will be a **derived event** with a data type depending on `source`, which cannot be called manually but can be subscribed to!

:::info{title="sample typing"}
The `sample` method is fully typed and accepts types depending on the parameters passed!
:::

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

### Practical Example (#sample-example)

Let's look at case, when we select user id and we want to check if user is admin, and based on selected user id create new derived store with data about user:

```ts
import { createStore, createEvent, sample } from "effector";

type User = {
  id: number;
  role: string;
};

const userSelected = createEvent<number>();

const $users = createStore<User[]>([]);

// Create derived store, which will be keep selectedUser
const $selectedUser = sample({
  clock: userSelected,
  source: $users,
  fn: (users, id) => users.find((user) => user.id === id) || null,
});
// $selectedUser has type Store<User | null>

// Create derived event, which will fire only for admins
// if selected user is admin, then event will fire instantly
const adminSelected = sample({
  clock: userSelected,
  source: $users,
  // will worked only if user found and he is admin
  filter: (users, id) => !!users.find((user) => user.id === id && user.role === "admin"),
  fn: (users, id) => users[id],
});
// adminSelected has type Event<User>

userSelected(2);
```

[Full API for `sample`](/en/api/effector/sample)

## Attach: Effect Specialization (#attach)

`attach` is a method for creating new effects based on existing ones, with access to data from stores. This is especially useful when you need to:

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

// Store with authentication token
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

[Full API for `attach`](/en/api/effector/attach)
