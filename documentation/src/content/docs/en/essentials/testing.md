---
title: Testing in Effector
description: How to write tests for validating logic in Effector
---

# Writing Tests (#writing-test-in-effector)

Testing state management logic is one of Effector’s strengths. Thanks to isolated contexts (fork) and controlled asynchronous processes `allSettled`, you can test application behavior without having to emulate the entire lifecycle.

:::info{title="What does fork do?"}
By calling the fork function, we create a scope, which can be considered an independent instance of our Effector application.
:::

## Basics of Testing (#basics-of-testing)

Effector provides built-in tools for:

- State isolation: Each testable state can be created in its own context, preventing side effects.
- Asynchronous execution: All effects and events can be executed and verified using allSettled.

### Store Testing (#store-testing)

Testing stores in Effector is straightforward since they are pure functions that manage state.

```ts
// counter.js
import { createStore, createEvent } from "effector";

const counterIncremented = createEvent();

const $counter = createStore(0);

$counter.on(counterIncremented, (counter) => counter + 1);
```

```ts
// counter.test.js
import { counterIncremented, $counter } from "./counter.js";

test("counter should increase by 1", async () => {
  const scope = fork();

  expect(scope.getState($counter)).toEqual(0);

  await allSettled(counterIncremented, { scope });

  expect(scope.getState($counter)).toEqual(1);
});
```

For isolated state logic testing, fork is used. This allows testing stores and events without affecting global state.

### Effect Testing (#effects-testing)

Effects can be tested by verifying their successful execution or error handling. In unit testing, we often want to prevent effects from making real API calls. This can be achieved by passing a configuration object with a handlers property to fork, where you define mock handlers for specific effects.

```ts
// effect.js
import { createEffect } from "effector";

const getUserProjectsFx = async () => {
  const result = await fetch("/users/projects/2");

  return result.json();
};

// effect.test.js
import { fork, allSettled } from "effector";
import { getUserProjectsFx } from "./effect.js";

test("effect executes correctly", async () => {
  const scope = fork({
    handlers: [
      // List of [effect, mock handler] pairs
      [getUserProjectsFx, () => "user projects data"],
    ],
  });

  const result = await allSettled(getUserProjectsFx, { scope });

  expect(result.status).toBe("done");
  expect(result.value).toBe("user projects data");
});
```

## A Complete Example of Testing (#complete-test-example)

Let’s consider a typical counter with asynchronous validation via our backend. Suppose we have the following requirements:

- When a user clicks a button, we check if the counter is less than 100, then validate the click through our backend API.
- If validation succeeds, increment the counter by 1.
- If validation fails, reset the counter to zero.

```ts
import { createEvent, createStore, createEffect, sample } from "effector";

export const buttonClicked = createEvent();

export const validateClickFx = createEffect(async () => {
  /* external API call */
});

export const $clicksCount = createStore(0);

sample({
  clock: buttonClicked,
  source: $clicksCount,
  filter: (count) => count < 100,
  target: validateClickFx,
});

sample({
  clock: validateClickFx.done,
  source: $clicksCount,
  fn: (count) => count + 1,
  target: $clicksCount,
});

sample({
  clock: validateClickFx.fail,
  fn: () => 0,
  target: $clicksCount,
});
```

### Test Setup (#complete-test-example-setup)

Here’s our main scenario:

1. The user clicks the button.
2. Validation completes successfully.
3. The counter increments by 1.

Let’s test it:

1. Create a new [Scope](/en/api/effector/Scope) instance by calling fork.
2. Check that the initial counter value is 0.
3. Simulate the buttonClicked event using allSettled—a promise that resolves once all computations finish.
4. Verify that the final state is as expected.

```ts
import { fork, allSettled } from "effector";

import { $clicksCount, buttonClicked, validateClickFx } from "./model";

test("main case", async () => {
  const scope = fork(); // 1

  expect(scope.getState($clicksCount)).toEqual(0); // 2

  await allSettled(buttonClicked, { scope }); // 3

  expect(scope.getState($clicksCount)).toEqual(1); // 4
});
```

However, this test has an issue—it uses a real backend API. Since this is a unit test, we should mock the backend call.

### Custom Effect Handlers (#complete-test-example-effect-handlers)

To avoid real server requests, we can mock the server response by providing a custom handler via the fork configuration.

```ts
test("main case", async () => {
  const scope = fork({
    handlers: [
      // List of [effect, mock handler] pairs
      [validateClickFx, () => true],
    ],
  });

  expect(scope.getState($clicksCount)).toEqual(0);

  await allSettled(buttonClicked, { scope });

  expect(scope.getState($clicksCount)).toEqual(1);
});
```

### Custom Store Values (#complete-test-example-custom-store-values)

Another scenario:

1. The counter already exceeds 100.
2. The user clicks the button.
3. The effect should not be triggered.

In this case, we need to set an initial state where the counter is greater than 100. This can be done using custom initial values via the fork configuration.

```ts
test("bad case", async () => {
  const MOCK_VALUE = 101;
  const mockFunction = jest.fn();

  const scope = fork({
    values: [
      // List of [store, mockValue] pairs
      [$clicksCount, MOCK_VALUE],
    ],
    handlers: [
      // List of [effect, mock handler] pairs
      [
        validateClickFx,
        () => {
          mockFunction();

          return false;
        },
      ],
    ],
  });

  expect(scope.getState($clicksCount)).toEqual(MOCK_VALUE);

  await allSettled(buttonClicked, { scope });

  expect(scope.getState($clicksCount)).toEqual(MOCK_VALUE);
  expect(mockFunction).toHaveBeenCalledTimes(0);
});
```

This is how you can test every use case you want to validate.
