---
title: Effector Core concepts
description: Core concepts of effector - store, effect, event and how it works together
redirectFrom:
  - /essentials/reactivity
  - /docs/introduction/core-concepts
  - /docs/reactivity
  - /en/essentials/reactivity
  - /en/docs/reactivity
---

# Core concepts (#core-concepts)

Effector is a modern state management library that enables developers to build scalable and predictable reactive applications.

At its core, Effector is built around the concept of **units**—independent building blocks of an application. Each unit—whether a [store](/en/essentials/manage-states), an [event](/en/essentials/events), or an [effect](/en/essentials/work-with-async) — has a specific role.
By combining these units, developers can construct complex yet intuitive data flows within their applications.

Effector development is based on two key principles:

- 📝 **Declarativity**: You define _what_ should happen, not _how_ it should work.
- 🚀 **Reactivity**: Changes propagate automatically throughout the application.

Effector employs an intelligent dependency-tracking system that ensures only the necessary parts of the application update when data changes. This provides several benefits:

- No need for manual subscription management
- High performance even at scale
- A predictable and clear data flow

## Units (#units)

A unit is a fundamental concept in Effector. [Store](/en/api/effector/Store), [Event](/en/api/effector/Event), and [Effect](/en/api/effector/Effect) are all units—core building blocks for constructing an application's business logic. Each unit is an independent entity that can be:

- Connected with other units
- Subscribed to changes of other units
- Used to create new units

```ts
import { createStore, createEvent, createEffect, is } from "effector";

const $counter = createStore(0);
const event = createEvent();
const fx = createEffect(() => {});

// Check if value is a unit
is.unit($counter); // true
is.unit(event); // true
is.unit(fx); // true
is.unit({}); // false
```

### Event (#event)

An event ([Event](/en/api/effector/Event)) in Effector serves as an entry point into the reactive data flow. Simply put, it is a way to signal that "something has happened" within the application.

#### Event features (#event-features)

- Simplicity: Events are minimalistic and can be easily created using [`createEvent`](/en/api/effector/createEvent).
- Composition: Events can be combined, filtered, transformed, and forwarded to other handlers or stores.

```js
import { createEvent } from "effector";

// create event
const formSubmitted = createEvent();

// subscribe to the event
formSubmitted.watch(() => console.log("Form submitted!"));

// Trigger the event
formSubmitted();

// Output:
// "Form submitted!"
```

### Store (#store)

A store ([Store](/en/api/effector/Store)) holds the application's data. It acts as a reactive value, providing strict control over state changes and data flow.

#### Store features (#store-features)

- You can have as many stores as needed.
- Stores are reactive — changes automatically propagate to all subscribed components.
- Effector optimizes re-renders, minimizing unnecessary updates for subscribed components.
- Store data is immutable.
- There is no `setState`, state changes occur through events.

```js
import { createStore, createEvent } from "effector";

// create event
const superAdded = createEvent();

// create store
const $supers = createStore([
  {
    name: "Spider-man",
    role: "hero",
  },
  {
    name: "Green goblin",
    role: "villain",
  },
]);

// update store on event triggered
$supers.on(superAdded, (supers, newSuper) => [...supers, newSuper]);

// trigger event
superAdded({
  name: "Rhino",
  role: "villain",
});
```

### Effect (#effect)

An effect ([Effect](/en/api/effector/Effect)) is designed to handle side effects — interactions with the external world, such as making HTTP requests or working with timers.

#### Effect features (#effect-features)

- Effects have built-in states like `pending` and emit events such as `done` and `fail`, making it easier to track operation statuses.
- Logic related to external interactions is isolated, improving testability and making the code more predictable.
- Can be either asynchronous or synchronous.

```js
import { createEffect } from "effector";

// Create an effect
const fetchUserFx = createEffect(async (userId) => {
  const response = await fetch(`/api/user/${userId}`);
  return response.json();
});

// Subscribe to effect results
fetchUserFx.done.watch(({ result }) => console.log("User data:", result));
// If effect throw error we will catch it via fail event
fetchUserFx.fail.watch(({ error }) => console.log("Error occurred! ", error));

// Trigger effect
fetchUserFx(1);
```

## Reactivity (#reactivity)

As mentioned at the beginning, Effector is built on the principles of reactivity, where changes **automatically** propagate throughout the application. Instead of an imperative approach, where you explicitly define how and when to update data, Effector allows you to declaratively describe relationships between different parts of your application.

### How Reactivity Works in Effector (#how-reactivity-works)

Let's revisit the example from the **Stores** section, where we have a store containing an array of superhumans. Now, suppose we need to separate heroes and villains into distinct lists. This can be easily achieved using derived stores:

```ts
import { createStore, createEvent } from "effector";

// Create an event
const superAdded = createEvent();

// Create a store
const $supers = createStore([
  {
    name: "Spider-Man",
    role: "hero",
  },
  {
    name: "Green Goblin",
    role: "villain",
  },
]);

// Create derived stores based on $supers
const $superHeroes = $supers.map((supers) => supers.filter((sup) => sup.role === "hero"));
const $superVillains = $supers.map((supers) => supers.filter((sup) => sup.role === "villain"));

// Update the store when the event is triggered
$supers.on(superAdded, (supers, newSuper) => [...supers, newSuper]);

// Add a new character
superAdded({
  name: "Rhino",
  role: "villain",
});
```

In this example, we created derived stores `$superHeroes` and `$superVillains`, which depend on the original `$supers` store. Whenever the original store updates, the derived stores automatically update as well — this is **reactivity** in action! 🚀

## How it all works together? (#how-units-work-together)

And now let's see how all this works together. All our concepts come together in a powerful, reactive data flow:

1. **Events** initiate changes (e.g., button clicks).
2. These changes update **Stores**, which manage application state.
3. **Effects** handle side effects like interacting with external APIs.

For example, we will take the same code with superheroes as before, but we will modify it slightly by adding an effect to load initial data, just like in real applications:

```ts
import { createStore, createEvent, createEffect } from "effector";

// Define our stores
const $supers = createStore([]);
const $superHeroes = $supers.map((supers) => supers.filter((sup) => sup.role === "hero"));
const $superVillains = $supers.map((supers) => supers.filter((sup) => sup.role === "villain"));

// Create events
const superAdded = createEvent();

// Create effects for fetching data
const getSupersFx = createEffect(async () => {
  const res = await fetch("/server/api/supers");
  if (!res.ok) {
    throw new Error("something went wrong");
  }
  const data = await res.json();
  return data;
});

// Create effects for saving new data
const saveNewSuperFx = createEffect(async (newSuper) => {
  // Simulate saving a new super
  await new Promise((res) => setTimeout(res, 1500));
  return newSuper;
});

// When the data fetch is successful, set the data
$supers.on(getSupersFx.done, ({ result }) => result);
// Add a new super
$supers.on(superAdded, (supers, newSuper) => [...supers, newSuper]);

// Trigger the data fetch
getSupersFx();
```

:::info{title="Why use $ and Fx?"}
Effector naming conventions use `$` for stores (e.g., `$counter`) and `Fx` for effects (e.g., `fetchUserDataFx`). Learn more about naming conventions [here](/en/guides/best-practices#naming).
:::

### Connecting Units into a Single Flow (#adding-sample)

All that remains is to somehow connect the `superAdded` event and its saving via `saveNewSuperFx`, and then request fresh data from the server after a successful save.
<br/>
Here, the [`sample`](/en/essentials/unit-composition) method comes to our aid. If units are the building blocks, then `sample` is the glue that binds your units together.

:::info{title="About sample"}
`sample` is the primary method for working with units, allowing you to declaratively trigger a chain of actions.
:::

```ts ins={27-37}
import { createStore, createEvent, createEffect, sample } from "effector";

const $supers = createStore([]);
const $superHeroes = $supers.map((supers) => supers.filter((sup) => sup.role === "hero"));
const $superVillains = $supers.map((supers) => supers.filter((sup) => sup.role === "villain"));

const superAdded = createEvent();

const getSupersFx = createEffect(async () => {
  const res = await fetch("/server/api/supers");
  if (!res.ok) {
    throw new Error("something went wrong");
  }
  const data = await res.json();
  return data;
});

const saveNewSuperFx = createEffect(async (newSuper) => {
  // Simulate saving a new super
  await new Promise((res) => setTimeout(res, 1500));
  return newSuper;
});

$supers.on(getSupersFx.done, ({ result }) => result);
$supers.on(superAdded, (supers, newSuper) => [...supers, newSuper]);

// when clock triggered called target and pass data
sample({
  clock: superAdded,
  target: saveNewSuperFx,
});

// when saveNewSuperFx successfully done called getSupersFx
sample({
  clock: saveNewSuperFx.done,
  target: getSupersFx,
});

// Trigger the data fetch
getSupersFx();
```

Just like that, we easily and simply wrote part of the business logic for our application, leaving the part that displays this data to the UI framework.
