---
title: Effector Core concepts
description: Core concepts of effector - store, effect, event and how it works together
redirectFrom:
  - /docs/introduction/core-concepts
---

# Core concepts (#core-concepts)

Effector includes three core elements that enable efficient state management and reactivity within applications.

## Units (#units)

A unit is a fundamental concept in Effector. [Store](/en/api/effector/Store), [Event](/en/api/effector/Event), and [Effect](/en/api/effector/Effect) are all units, which are basic building blocks for creating application business logic. Each unit represents an independent entity that can be:

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

// All units can be connected with each other
$counter.on(event, (counter) => counter + 1);
sample({
  clock: event,
  target: fx,
});
```

### Event (#event)

[Event](/en/api/effector/Event) — serves as the entry point to the reactive data flow. It represents changes or an intention to do something: start a computation, send a message to another application section, such as stores and effects, or update state, enabling flexible and controlled data handling.

#### Event features (#event-features)

- Simplicity: Events are minimalistic and can be easily created using [`createEvent`](/en/api/effector/createEvent).
- Reactivity: Events instantly notify all subscribers upon triggering.
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

[Store](/en/api/effector/Store) — is the key unit for state management element in Effector. It represents a reactive value, ensuring strict control over mutations and data flow.

#### Store features (#store-features)

- You can have as many stores as you need.
- It supports reactivity — changes propagate automatically to all subscribed components.
- Effector optimizes component re-renders by minimizing unnecessary updates.
- Store data is immutable by default.

  ```js
  import { createStore, createEvent } from "effector";

  // Create an event
  const userAdded = createEvent();

  // Create a store and derive a reactive value
  const $users = createStore([
    {
      id: 1,
      name: "Bob",
      age: 16,
    },
  ]);
  const $adultUsers = $users.map((users) => users.age >= 18);

  // Update the store on event trigger
  $users.on(userAdded, (users, newUser) => [...users, newUser]);

  // Subscribe to store changes
  $users.watch((users) => console.log(`All users: ${users}`));
  $adultUsers.watch((adultUsers) => console.log(`Adult users: ${adultUsers}`));

  // Console output:
  // All users:  [{ id: 1, name: "Bob", age: 16 }]
  // Adult users: []

  // Trigger the event
  userAdded({
    id: 2,
    name: "Shulya",
    age: 19,
  });

  // Console output:
  // All users:  [{ id: 1, name: "Bob", age: 16 }, { id: 2, name: "Shulya", age: 19 }]
  // Adult users: [{ id: 2, name: "Shulya", age: 19 }]
  ```

### Effect (#effect)

[Effect](/en/api/effector/Effect) — is designed to handle side effects (async or not) — operations that interact with external systems.

#### Effect features (#effect-features)

- Effects have built-in states like `pending` and emit events such as `done` and `fail`, making it easier to track operation statuses.
- Logic related to external interactions is isolated, improving testability and making the code more predictable.

Effects help isolate the logic of interacting with external systems from the rest of the code, making the application more predictable and easier to test.
You should always use effect for cases that can both succeed and fail.

```js
import { createEffect } from "effector";

// Create an effect
const fetchUserFx = createEffect(async (userId) => {
  const response = await fetch(`/api/user/${userId}`);
  return response.json();
});

// Subscribe to effect results
fetchUserFx.done.watch(({ result }) => console.log("User data:", result));
fetchUserFx.fail.watch(({ error }) => console.log("Error occurred! ", error));

// Trigger effect
fetchUserFx(1);
```

## Function purity (#purity)

Most functions in the effector API should not call other events or effects directly. This makes the application's data flow more understandable when imperative triggers are grouped inside `watch` and effect handlers rather than scattered throughout the business logic.

Correct, imperative approach:

```ts
import { createStore, createEvent } from "effector";

const submitLoginSize = createEvent();

const $login = createStore("guest");
const $loginSize = $login.map((login) => login.length);

$loginSize.watch((size) => {
  submitLoginSize(size);
});
```

✅ **Better**, declarative approach:

```ts
import { createStore, createEvent, sample } from "effector";

const submitLoginSize = createEvent();

const $login = createStore("guest");
const $loginSize = $login.map((login) => login.length);

sample({
  clock: $loginSize,
  target: submitLoginSize,
});
```

❌ This should NOT be done:

```ts
import { createStore, createEvent } from "effector";

const submitLoginSize = createEvent();

const $login = createStore("guest");
// Don't do this!
const $loginSize = $login.map((login) => {
  // Don't call events inside map! Use sample instead
  submitLoginSize(login.length);
  return login.length;
});
```

:::info{title="Important note"}
Calling events or effects inside transformation functions (e.g., in `map`, `sample.filter`, or on handlers) can lead to unpredictable behavior and complicates debugging. Always use the declarative approach with `sample` for such cases.
:::

## How it all works together? (#how-units-work-together)

These concepts combine to create a powerful, reactive data flow:

1. **Events** initiate changes (e.g., button clicks).
2. These changes update **Stores**, which manage application state.
3. **Effects** handle side effects like interacting with external APIs.

```ts
import { createEvent, createStore, createEffect } from "effector";

// Create event
const buttonClicked = createEvent();

// Create store
const $clickCount = createStore(0);

// Update the store when the event is triggered
$clickCount.on(buttonClicked, (clickCount) => clickCount + 1);

// Watch the store for changes
$clickCount.watch((clickCount) => console.log(clickCount));
// Outputs 0 initially

// Create an effect
const fetchUserDataFx = createEffect(async (userId) => {
  const response = await fetch(`/api/user/${userId}`);
  return response.json();
});

// Trigger event
buttonClicked(); // Increments clickCount to 1
fetchUserDataFx(1);
```

:::info{title="Why use $ and Fx?"}
Effector naming conventions use $ for stores (e.g., $counter) and Fx for effects (e.g., fetchUserDataFx). Learn more about naming conventions [here](/en/conventions/naming).
:::

### Adding `sample` for orchestration (#adding-sample)

What's left to do is to connect the store change and the effect call, and this is where the beautiful [`sample`](/en/api/effector/sample) method begins.

<!-- [How to work with `sample`](/en/essentials/unit-composition) -->

```ts
import { createStore, createEvent, createEffect, sample } from "effector";

type Todo = {
  taskName: string;
  completed: boolean;
};

const $todos = createStore<Array<Todo>>([]);
const $error = createStore("");

const formSubmitted = createEvent<Todo>();
const setError = createEvent<string>();

const validateFormFx = createEffect((taskValues: Todo) => {
  // validate logic ...
  if (validationFailed) {
    throw new Error("validation failed");
  }

  return values;
});

const saveTodoFx = createEffect(async (task: Todo) => {
  // simulate api call
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { id: Date.now(), text: task, completed: false };
});

sample({
  clock: formSubmitted,
  target: validateFormFx,
});

sample({
  clock: validateFormFx.doneData,
  target: saveTodoFx,
});

sample({
  clock: validateFormFx.failData,
  target: setError,
});

$todos.on(saveTodoFx.doneData, (todos, newTodo) => [...todos, newTodo]);
$todos.on(taskToggled, (todos, todoId) => {
  return todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }

    return todo;
  });
});

$error.on(setError, (_, error) => error);
$error.reset(validateFormFx.doneData);

formSubmitted({
  taskName: "Lean effector",
  completed: true,
});

$todos.watch((todos) => console.log("Todos updated:", todos));
```

In just a few lines of code, we’ve created a fully functional, reactive, and predictable data flow — with no boilerplate code.

Effector focuses on application logic, allowing you to build scalable systems with ease. Try it out and experience its power!
