---
title: Reactivity in Effector
description: Let's explore what reactivity is and how it works in Effector
redirectFrom:
  - /docs/reactivity
  - /essentials/reactivity
---

# Reactivity in Effector (#reactivity-in-effector)

Reactivity is a fundamental concept in Effector that allows data to be automatically updated when its dependencies change. Instead of manually managing updates, you describe the relationships between different parts of your application, and Effector takes care of their synchronization.

## What is Reactivity? (#what-is-reactivity)

At the core of reactivity lies the principle of automatic change propagation. When the value of one store changes, all parts of the application that depend on it are automatically updated.

```ts
import { createStore, createEvent, combine } from "effector";

const firstWordChanged = createEvent<string>();

const $firstWord = createStore("Imperative");
const $secondWord = createStore("Programming");

const $fullSentence = combine($firstWord, $secondWord, (firstWord, secondWord) => {
  return `${firstWord} ${secondWord}`;
});

const $fullSentenceLength = $fullSentence.map((fullSentence) => fullSentence.length);

// Subscribe the store to event
$firstWord.on(firstWordChanged, (_, newWord) => newWord);

// Event call will update the store and all subscribers
firstWordChanged("Reactive");
```

In this example, when the state of the `$firstWord` store changes, both `$fullSentence` and `$fullSentenceLength` will automatically update as well, so you don't need to manually update the values – Effector will handle this.

## What Makes Effector Reactive? (#what-makes-effector-is-reactive)

1. Automatic change propagation. When a store's value changes, Effector automatically notifies all dependent units:

```ts
import { createStore } from "effector";

const $users = createStore<User[]>([]);
const $userCount = $users.map((users) => users.length);
const $hasUsers = $users.map((users) => users.length > 0);

// $userCount and $hasUsers will automatically update
// with any change to $users
```

2. Declarative connections. Instead of imperatively describing what should happen and when, we declaratively describe the relationships between data:

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

// Updates will happen in the order of declaration
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

## How Units Communicate (#how-units-communicate)

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

// Create dependencies
$isLoading
  .on(buttonClicked, () => true)
  // Reset state when loading completes
  .reset([fetchDataFx.done, fetchDataFx.fail]);

// Start loading on click
sample({
  clock: buttonClicked,
  target: fetchDataFx,
});

buttonClicked();
```

## Real-life Example (#effector-reactivity-example-1)

Let's take a look at an example of a search bar with automatic result updates:

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

1. Somewhere in the application, searchQueryChanged was called.
2. Update the $searchQuery store.
3. Using sample, we declaratively call the target (searchFx) with data from the source.
4. The searchFx effect executes.
5. In case of successful searchFx effect, we update the data in the searchResults store.
