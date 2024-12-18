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

const $firstName = createStore("John");
const $lastName = createStore("Doe");

const $fullName = combine($firstName, $lastName, (first, last) => {
  console.log("1. Combine executed"); // for demonstration
  return `${first} ${last}`;
});

sample({
  clock: formSubmitted,
  source: $fullName,
  fn: (fullName) => {
    console.log("2. Sample fn executed");
    return `Submitting: ${fullName}`;
  },
  target: logFx,
});

$fullName.watch((fullName) => {
  console.log("3. Watch executed:", fullName);
});

formSubmitted.watch(() => {
  console.log("form submitted");
});

formSubmitted();

// In console we'll see:
// 1. Combine executed
// 2. Sample fn executed
// 3. Watch executed: John Doe
// Effect executed: Submitting: John Doe
```

In this example, the execution order will be:

1. First, we call the event
2. `sample` starts its work and processes $fullName
3. Then fn starts its work
4. Next in queue we have `$fullName.watch`
5. And finally our effect
