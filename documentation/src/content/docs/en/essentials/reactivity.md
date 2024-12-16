---
title: Reactivity in effector
description: Let's explore how reactivity works in effector
---

# Reactivity in effector

Reactivity is a fundamental concept in Effector that enables automatic data updates when dependencies change. Instead of manually managing updates, you describe connections between different parts of your application, and Effector handles their synchronization.

## What is reactivity?

At the core of reactivity lies the principle of automatic change propagation. When the value of one store changes, all parts of the application that depend on it update automatically.

```ts
import { createStore, createEvent } from "effector";

// Create store and event
const $name = createStore("John");
const nameChanged = createEvent<string>();

// Connect them
$name.on(nameChanged, (_, newName) => newName);

// When $name changes, this change
// will automatically reflect in all subscribers
$name.watch((name) => console.log(`Name changed: ${name}`));

// Event call will update store and all subscribers
nameChanged("Bob"); // Name changed: Bob
```

## What makes Effector reactive? (#what-makes-effector-is-reactive)

1. Automatic change propagation. When a store's value changes, Effector automatically notifies all dependent units:

```ts
import { createStore } from "effector";

const $users = createStore<User[]>([]);
const $userCount = $users.map((users) => users.length);
const $hasUsers = $users.map((users) => users.length > 0);

// $userCount and $hasUsers will automatically update
// with any change to $users
```

2. Declarative connections. Instead of imperatively describing what should happen and when, we declaratively describe data relationships:

```ts
import { sample, createStore, createEvent, createEffect } from "effector";

const formSubmitted = createEvent();
const $formData = createStore({ name: "", email: "" });
const submitToServerFx = createEffect(({ name, email }: { name: string; email: string }) => {
  // logic
});

sample({
  clock: formSubmitted,
  source: $formData,
  target: submitToServerFx,
});
```

3. Predictable updates. Updates in Effector always occur in a specific order, making application behavior predictable:

```ts
import { createStore, createEvent, sample, createEffect } from "effector";

const $a = createStore(1);
const $b = createStore(2);
const updated = createEvent();

const updateFirstFx = createEffect(() => {
  // logic
});

const updateSecondFx = createEffect(() => {
  // logic
});

// Updates will happen in declaration order
sample({
  clock: updated,
  source: $a,
  target: updateFirstFx,
});

sample({
  clock: updateFirstFx.done,
  source: $b,
  target: updateSecondFx,
});
```

## How unit communicate

Effector manages dependencies between units (stores, events, and effects), ensuring the correct order of updates. When some units depend on others, Effector guarantees that changes propagate predictably:

```ts
import { createStore, createEvent, sample, createEffect } from "effector";

const fetchDataFx = createEffect(async () => {
  // api call
});

// Create units
const buttonClicked = createEvent();
const $isLoading = createStore(false);
const $error = createStore<Error | null>(null);

$isLoading.on(buttonClicked, () => true);
// Reset state when loading completes
$isLoading.reset([fetchDataFx.done, fetchDataFx.fail]);

// On click start loading
sample({
  clock: buttonClicked,
  target: fetchDataFx,
});

buttonClicked();
```

## Real-life example (#example)

Let's look at an example of a search input with automatic results updates:

```ts
import { createStore, createEvent, createEffect, sample } from "effector";

// Events and effects
const searchQueryChanged = createEvent<string>();

// 4
const searchFx = createEffect(async (query: string) => {
  const response = await fetch(`/api/search?q=${query}`);

  return response.json();
});

// States
const $searchQuery = createStore("");
const $searchResults = createStore([]);
const $isSearching = searchFx.pending;

// Connections
$searchQuery.on(searchQueryChanged, (_, query) => query); // 2
// Update results on successful search
// 5
$searchResults.on(searchFx.doneData, (_, results) => results);

// Start search when query changes
// 3
sample({
  clock: searchQueryChanged,
  source: $searchQuery,
  target: searchFx,
});

searchQueryChanged("qwerty"); // 1
```

1. Somewhere in the application `searchQueryChanged` was called.
2. Update the `$searchQuery` store.
3. Using `sample` we declaratively call `target` (searchFx) with data from source.
4. Effect `searchFx` executes.
5. On successful `searchFx` completion we update data in the `$searchResults` store
