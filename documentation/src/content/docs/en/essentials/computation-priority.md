---
title: Pure Functions and Computation Order
description: Understanding pure functions, their use in effector, and how computation order works
---

# Pure Functions and Computation Order (#pure-functions-and-computation)

Pure functions and proper computation order are fundamental concepts in effector that ensure application predictability and reliability.

## Pure Functions (#pure-functions)

### What is a Pure Function? (#what-is-pure-function)

A pure function is a function that:

- Always returns the same result for the same input data
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

// Not a pure function - depends on and modifies external state
const calculateTotalWithSideEffect = (items: Array<{ price: number }>) => {
  globalCounter++; // Side effect!
  return items.reduce((sum, item) => sum + item.price, 0);
};
```

In effector, you should try to use pure functions wherever possible, except for [effects](/en/api/effector/Effect), which are designed for side effects.

### Why Does It Matter? (#why-pure-functions-matter)

1. 🎯 Predictability: Pure functions always return the same result for the same input data.
2. 🧪 Testability: Pure functions are easy to test because they don't depend on external state
3. 🔍 Debugging: When using pure functions, it's easier to find the source of problems.
4. ⚡ Optimization: effector can optimize the execution of pure functions.

### Common Mistakes (#common-pure-function-mistakes)

❌ Accessing external variables:

```ts
let globalValue = 0;

const $store = createStore(0);
// Wrong - dependency on external variable
$store.map((value) => value + globalValue);
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

✅ Correct implementations

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

### Update Priorities (#update-priorities)

effector performs updates in a specific order:

1. Pure computations (map, filter, on, etc.)
2. Data combination (combine, sample)
3. Side effects (watch, effect)

This allows:

- Executing all pure computations before side effects
- Guaranteeing consistent state when executing effects
- Optimizing computations

### Computation Order Example (#computation-order-example)

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
// isUserAdult watch: false
// COMBINE WATCH fullName executed: John Doe
// SAMPLE fn executed
// EVENT WATCH form submitted
// Effect executed: Submitting: John Doe
```

In this example, the execution order will be:

1. First, `map` and `combine` are called during base store initialization, and their `watch` is called.
2. We trigger the `formSubmitted` event.
3. `sample` begins its work and executes `fn`.
4. After `sample` completes its work, `formSubmitted.watch` executes.
5. Finally, our effect runs

[You can play with this example in the sandbox](https://share.effector.dev/G8xaDjDZ), change the order of `map` and `combine` calls or `watch` for each derived store and see how it affects the logs.

### Advanced Computation Order Example (#advanced-computation-order-example)

In this example, we'll look at a more complex case. We'll skip the type implementations and code realizations to focus on the computation order.

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
  clock: sigmaPersonSelected,
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

// точка старта
userSelected({
  id: 2,
  name: "Patrick",
  lastName: "Bateman",
  role: "sigma",
});
```

Whew, that's a lot of code, right? Actually, it's quite simple, let's look at what we have:

- We have a base store `selectedUser` and derived stores `selectedUserId`, `selectedUserFullName`
- An event `userSelected`, which updates the store when called
- An effect `fetchUserDataPostsFx` that fetches data by `userId`
- Two `sample` operations that start their work when the `userSelected` and `sigmaPersonSelected` event is called
- And a `split` that executes when the `userSelected` event is called and returns new events depending on the passed data

So, let's break it down:
First, our stores will be initialized, and `combine` and `map` will be called, followed by `watch`, in the order we called them, for each store.

```ts
// ------Initialization
// COMBINE called
// MAP $selectedUserId called with user null
// $selectedUser watch called:  null
// $selectedUserId WATCH called null
// COMBINE watch called ""
// --------------------------------------
```

Next, we call the `userSelected` event, which has 3 subscriptions:

1. `split`, for dividing the event into several others
2. `on` for the base `selectedUser` store
3. `sample` with data modification and subsequent store update through `target`

First, the `split` method will be called, then the store's on method, the store will update, followed by updates of the derived stores `selectedUserId` and `selectedUserFullName`. Then the `sample` methods will start working in the order they were written:

1. First, the one where `clock` = `sigmaPersonSelected` will run, and we'll have a pure function `fn` call
2. Then, the one where `clock` = `userSelected` will run, here we'll also call `fn`, but since we're modifying the base store `selectedUser` data here, this will trigger updates of derived stores

:::info{title="sample writing order"}
The order of writing `sample` is important if you call them on the same event or on a derived event from `split`. In this example, if we change the order of `sample`, they will be called in reverse!
:::

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

At this stage, all our pure functions have executed, which means that side methods now begin their work.<br/>
Since the first call in all this code was the `userSelected` event, `userSelected.watch` will execute first.<br/>
At the very beginning, after calling the `userSelected` event, our `split` method ran first, so after `userSelected.watch`, our `sigmaPersonSelected.watch` will execute.<br/><br/>

Following the same logic, our `selectedUser.watch` will be called next, as well as `selectedUserId.watch` and `selectedUserFullName.watch`. Since we updated the base store twice (using `on` and `sample`), `selectedUser.watch` will be called again, **BUT** note that the derived stores' `watch` won't be called a second time because the store values remained unchanged - effector optimizes this computation.<br/><br/>

Finally, our `fetchUserDataPostsFx` is called.

:::info{title="watch order"}
The order of writing `watch` for the same units matters. In our example, we have two derived stores that depend on one base store. If we change the order of writing `watch`, their call order will change!
:::

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
/*
// EFFECT called
```

:::info{title="Store Updates"}
In this example, we used different ways of updating state to break down the logic of call priority.
In your project, try to use a unified approach to store updates, either through `sample` or through `on`.
:::
[You can play with this example here](https://share.effector.dev/bRj6J35P)

Things to Note (#watch-out)

1. Derived states (`combine`, `map`) execute immediately upon initialization, and their `watch` handlers execute immediately.
2. Unit's own methods (e.g., `store.on`, `store.map`) are called with priority over `sample` or `combine`.
3. Effector optimizes derived store computations, and if it sees that the data hasn't changed, it won't trigger component rerenders.
4. The order of `sample` matters when dealing with the same triggers.
