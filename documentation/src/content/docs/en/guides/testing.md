---
title: Testing effector
redirectFrom:
  - /guides/testing
---

Effector's tests are usually written via [Fork API](/en/api/effector/fork).

Fork creates an independent context instance, which we can use to emulate some specific situation or environment.

## Counter example

For example, we have some typical counter, but with asynchronous checking through our backend. Let's assume we have next requirements:

- When the user clicks a button, we check if the current counter is less than 100, and then check that click through our backend api.
- If the validation is successful, we increase the counter by 1.
- If the validation fails, we have to drop the counter to 0.

```ts
import {createEvent, createStore, createEffect, sample} from 'effector'

export const buttonClicked = createEvent()

export const validateClickFx = createEffect(async () => (/* some api call */))

export const $clicksCount = createStore(0)

sample({
  source: $clicksCount,
  clock: buttonClicked,
  filter: count => count < 100,
  target: validateClickFx,
})

sample({
  source: $clicksCount,
  clock: validateClickFx.done,
  fn: count => count + 1,
  target: $clicksCount,
})

sample({
  clock: validateClickFx.fail,
  fn: () => 0,
  target: $clicksCount,
})
```

### Test setup

Our main scenario is:

1. User clicks the button
2. Validation ends successfully
3. Counter is up by 1

Let's test it:

1. We create a new [Scope](/en/api/effector/Scope) via `fork` call. We can treat it as an independent instance of our effector's app.
2. We check, that initially count is equal to `0`.
3. Then we emulate `buttonClicked` event with `allSettled` – this promise will resolve once all computations are over.
4. We check that we have a desired state in the end.

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

### Custom effect handlers

But this test has a problem — it uses real backend api. But since this is a unit test, we should mock this request somehow.

We can provide custom handler via `fork` configuration.

```ts
test("main case", async () => {
  const scope = fork({
    handlers: [
      // List of [effect, mock handler] pairs
      [validateClickFx, () => mockResponse],
    ],
  });

  expect(scope.getState($clicksCount)).toEqual(0);

  await allSettled(buttonClicked, { scope });

  expect(scope.getState($clicksCount)).toEqual(1);
});
```

### Custom store values

We have another scenario:

1. Count is more than 100 already.
2. User clicks the button.
3. There should be no effect call.

For that case, we will need to mock initial "more than 100" states somehow.

We can provide custom initial value via `fork` configuration too.

```ts
test("bad case", async () => {
  const MOCK_VALUE = 101;
  const mockFunction = testRunner.fn();

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

          return mockResponse;
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

That is how we can test every use case we want to cover.
