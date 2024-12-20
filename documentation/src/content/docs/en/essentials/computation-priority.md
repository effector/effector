---
title: Pure Functions and Computation Order
description: What are pure functions, where they are used in effector, and how computation order works
redirectFrom:
  - /en/advanced-guide/computation-priority
  - /explanation/computation-priority
  - /docs/advanced-guide/computation-priority
  - /docs/explanation/computation-priority
---

# Pure Functions and Computation Order (#pure-functions-and-computation)

Pure functions and proper computation order are fundamental concepts in effector that ensure predictability and reliability of the application.

## Pure Functions (#pure-functions)

### What is a pure function? (#what-is-pure-function)

A pure function is a function that:

- Always returns the same result given the same input
- Has no side effects (doesn't modify data outside its scope)
- Doesn't depend on external state

✅ Example of a pure function:

```ts
const calculateTotal = (a: number, b: number) => {
  return a + b;
};
```

❌ Example of a NON-pure function:

```ts
let globalCounter = 0;

// Not a pure function - depends on external state and modifies it
const calculateTotalWithSideEffect = (a: number, b: number) => {
  globalCounter++; // Side effect!

  return a + b;
};
```

In effector, you should strive to use pure functions wherever possible, except for effects, which are designed for side effects.

### Why does it matter? (#why-pure-functions-matter)

1. Predictability: Pure functions always return the same result for the same input
2. Testability: Pure functions are easy to test as they don't depend on external state
3. Debugging: When using pure functions, it's easier to find the source of problems
4. Optimization: effector can optimize the execution of pure functions

### Common mistakes (#common-pure-function-mistakes)

❌ Accessing external variables:

```ts
let globalValue = 0;

const $store = createStore(0);
// Wrong - dependency on external variable
$store.map((storeValue) => storeValue + globalValue);
```

❌ Direct object mutation:

```ts
const $users = createStore([]);
// Wrong - mutating input data
$users.map((users) => {
  users.push({ id: 1 });
  return users;
});
```

✅ Correct implementations:

```ts
const $store = createStore(0);
const $globalValue = createStore(0);

// Correct - using combine to access another store
const $result = combine(
  $store,
  $globalValue,
  (storeValue, globalValue) => storeValue + globalValue,
);

const $users = createStore([]);
// Correct - creating a new array
$users.map((users) => [...users, { id: 1 }]);
```

## Computation Order (#computation-order)

### Update priorities (#update-priorities)

effector executes updates in a specific order:

1. Pure computations (map, filter)
2. Data combination (combine, sample)
3. Side effects (watch, effect)

This allows:

- Executing all pure computations before side effects
- Guaranteeing consistent state when executing effects
- Optimizing computations

### Computation order example (#computation-order-example)

```ts
import { createStore, createEvent, createEffect, sample } from "effector";

// Create a simple effect for demonstration
const logFx = createEffect((msg: string) => {
  console.log("Effect executed:", msg);
});

const formSubmitted = createEvent();

const $user = createStore({
  name: "John",
  lastName: "Doe",
  age: 16,
});

const $isUserAdult = $user.map((user) => {
  console.log("MAP user age: ", user.age);
  return user.age >= 18;
});

const $fullName = combine($user, ({ name, lastName }) => {
  console.log("COMBINE executed"); // for demonstration
  return `${name} ${lastName}`;
});

sample({
  clock: formSubmitted,
  source: $fullName,
  fn: (fullName) => {
    console.log("SAMPLE fn executed");
    return `Submitting: ${fullName}`;
  },
  target: logFx,
});

$isUserAdult.watch((isUserAdult) => console.log("isUserAdult watch: ", isUserAdult));

$fullName.watch((fullName) => {
  console.log("COMBINE WATCH fullName executed:", fullName);
});

formSubmitted.watch(() => {
  console.log("EVENT WATCH form submitted");
});

formSubmitted();

// MAP user age: 16
// COMBINE executed
// COMBINE WATCH fullName executed: John Doe
// SAMPLE fn executed
// EVENT WATCH form submitted
// Effect executed: Submitting: John Doe
```

In this example, the execution order will be as follows:

1. First, `map` and `combine` are called during base store initialization, and their `watch` handlers are triggered
2. We call the `formSubmitted` event
3. `sample` begins its work and executes its fn
4. After `sample` completes, `formSubmitted.watch` is executed
5. Finally, our effect runs

You can [experiment with this example in the playground](https://share.effector.dev/G8xaDjDZ), change the order of `map` and `combine` calls, or watch handlers for each derived store and see how it affects the logs.

### Advanced Computation Order Example (#advanced-computation-order-example)

In this example, we'll look at a more complex case. We'll skip the type implementations and focus on the computation order.

```ts
import { createEvent, sample, split, createEffect, createStore } from "effector";

const $selectedUser = createStore<User | null>(null);

const $selectedUserFullName = combine($selectedUser, (selectedUser) => {
  console.log("COMBINE called");
  if (!selectedUser) {
    return "";
  }
  return `${selectedUser.name} ${selectedUser.lastName}`;
});

const userSelected = createEvent<User>();

const { sigmaPersonSelected, basePersonSelected } = split(userSelected, {
  sigmaPersonSelected: (user) => {
    console.log("sigmaPersonSelected Inside split log called");
    return user.role === "sigma";
  },
  basePersonSelected: () => {
    console.log("basePersonSelected Inside split log called");
    return user?.role !== "sigma";
  },
});

const fetchUserDataPostsFx = createEffect((userId: number) => {
  console.log("EFFECT called");
  // logic
});

const $selectedUserId = $selectedUser.map((selectedUser) => {
  console.log("MAP $selectedUserId called with user", selectedUser);
  return selectedUser ? selectedUser.id : null;
});

sample({
  clock: userSelected,
  source: $selectedUserId,
  fn: (selectedUserId) => {
    console.log("FIRST SAMPLE fn WITH EFFECT called with ", selectedUserId);
    return selectedUserId;
  },
  target: fetchUserDataPostsFx,
});

sample({
  clock: userSelected,
  fn: (selectedUser) => {
    const newUser = { ...selectedUser };
    if (newUser.name === "Patrick" && newUser.lastName === "Bateman") {
      newUser.mentalIssues = ["psycho"];
    }

    console.log("SECOND SAMPLE fn called, modified data and will return ", newUser);
    return newUser;
  },
  target: $selectedUser,
});

$selectedUser.watch((selectedUser) => console.log("$selectedUser watch called: ", selectedUser));

$selectedUserId.watch((selectedUserId) =>
  console.log("$selectedUserId WATCH called", selectedUserId),
);

$selectedUserFullName.watch((selectedUserFullName) =>
  console.log("COMBINE watch called", selectedUserFullName),
);

sigmaPersonSelected.watch((user) => console.log("sigmaPersonSelected WATCH called:", user));
basePersonSelected.watch((user) => console.log("basePersonSelected WATCH called:", user));

userSelected.watch(() => console.log("userSelected EVENT WATCH called "));

$selectedUser.on(userSelected, (_, newSelectedUser) => {
  console.log("$selectedUser ON called: ", newSelectedUser);
  return newSelectedUser;
});

userSelected({
  id: 2,
  name: "Patrick",
  lastName: "Bateman",
  role: "sigma",
});
```

Let's break down what we have here:

- A base store `selectedUser` and derived stores `selectedUserId`, `selectedUserFullName`
- The `userSelected` event that updates the store when called
- The `fetchUserDataPostsFx` effect that fetches data by userId
- Two `sample` operations that start their work when the `userSelected` event is triggered
- And a `split` that processes the `userSelected` event and returns new events based on the provided data

Let's start:
First, store initialization occurs, and `combine` and `map` are called, followed by `watch` handlers, in the order they were called, for each store.

```ts
// ------Initialization
// COMBINE called
// MAP $selectedUserId called with user null
// $selectedUser watch called:  null
// $selectedUserId WATCH called null
// COMBINE watch called ""
// --------------------------------------
```

Next, we call the userSelected event, which has 4 subscriptions:

1. `split`, for dividing the event into several others
2. `on` for the base `selectedUser` store
3. `sample` with an effect target
4. `sample` with data modification and subsequent `selectedUser` store update via target

First, the `split` method is called, then the store's on method, the store updates, followed by updates of the derived stores `selectedUserId` and `selectedUserFullName`. Then the `sample` methods begin their work, where pure function `fn` calls occur one after another. Since in the second `sample` we modify the base store `selectedUser` data, this triggers updates of the derived stores.

```ts
// ------Initialization
// COMBINE called
// MAP $selectedUserId called with user null
// $selectedUser watch called:  null
// $selectedUserId WATCH called null
// COMBINE watch called ""
// --------------------------------------

// sigmaPersonSelected Inside split log called
// $selectedUser ON called: {id: 2, name: "Patrick", lastName: "Bateman", role: "sigma"}
// MAP $selectedUserId called with user {id: 2, name: "Patrick", lastName: "Bateman", role: "sigma"}
// COMBINE called
// FIRST SAMPLE fn WITH EFFECT called with 2
/* SECOND SAMPLE fn called, modified data and will return,
 {id: 2, name: "Patrick", lastName: "Bateman", role: "sigma", mentalIssues: ['psycho']}
*/
// MAP $selectedUserId called with user {id: 2, name: "Patrick", lastName: "Bateman", role: "sigma", mentalIssues: ['psycho']}
// COMBINE called
```

At this point, all pure functions have been executed, which means that side effects start their work. Since the first call in this code was the `userSelected` event, `userSelected.watch` executes first. At the very beginning, after calling the `userSelected` event, the `split` method ran first, so after `userSelected.watch`, our `sigmaPersonSelected.watch` executes. Following the same logic, `selectedUser.watch` is called next, along with `selectedUserId.watch` and `selectedUserFullName.watch`. Since we updated the base store twice (using `on` and `sample`), `selectedUser.watch` is called again, BUT note that the derived stores `watch` handlers won't be called a second time because their values remained unchanged - Effector optimizes this computation. Finally, `fetchUserDataPostsFx` is called.

```ts
// ------Initialization
// COMBINE called
// MAP $selectedUserId called with user null
// $selectedUser watch called:  null
// $selectedUserId WATCH called null
// COMBINE watch called ""
// --------------------------------------

// sigmaPersonSelected Inside split log called
// $selectedUser ON called: {id: 2, name: "Patrick", lastName: "Bateman", role: "sigma"}
// MAP $selectedUserId called with user {id: 2, name: "Patrick", lastName: "Bateman", role: "sigma"}
// FIRST SAMPLE fn WITH EFFECT called with 2
/* SECOND SAMPLE fn called, modified data and will return
 {id: 2, name: "Patrick", lastName: "Bateman", role: "sigma", mentalIssues: ['psycho']}
*/
// MAP $selectedUserId called with user {id: 2, name: "Patrick", lastName: "Bateman", role: "sigma", mentalIssues: ['psycho']}

// userSelected EVENT WATCH called
// sigmaPersonSelected WATCH called: {...}
// $selectedUser watch called:  {id: 2, name: "Patrick", lastName: "Bateman", role: "sigma"}
// $selectedUserId WATCH called 2
// COMBINE watch called Patrick Bateman
/* $selectedUser watch called:
{id: 2, name: "Patrick", lastName: "Bateman", role: "sigma", mentalIssues: ['pshyco']}
*/
// EFFECT called
```

:::info{title="about updating store"}
In this example, we used different ways to update the state to break down the logic of how call prioritization works.
Use a unified approach in your project to updating the store, either through `sample` or `on`.
:::

[Play with this example](https://share.effector.dev/bRj6J35P)

## Key Points to Note (#watch-out)

1. Derived states (`combine`, `map`) are executed immediately during initialization, and their `watch` handlers are triggered as well
2. Unit's own methods (like `store.on`, `store.map`) are called with higher priority than `sample` or `combine`
3. Effector optimizes computations of derived stores, and if it sees that the data hasn't changed, it won't trigger component rerenders
