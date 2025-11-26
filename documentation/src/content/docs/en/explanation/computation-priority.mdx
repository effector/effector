---
title: Computation priority
description: How effector calculates units
redirectFrom:
  - /en/advanced-guide/computation-priority
  - /explanation/computation-priority
  - /docs/advanced-guide/computation-priority
  - /docs/explanation/computation-priority
---

For sure, you've noticed that function [should be pure](/en/explanation/glossary#purity)... or watch if there is a place
for side effect. We will talk about this in the current section – **Computation priority**

A real example of queue priority — people waiting for medical treatment in a hospital, extreme emergency cases will have
the highest priority and move to the start of the queue and less significant to the end.

Computation priority allows us to have side effects, and it's one of the main reasons to create this concept:

- Letting pure functions to execute first.
- Side effects can follow a consistent state of the application.

Actually, pure computation cannot be observed out of the scope, therefore, the definition of **_pure computation_** used
in this library gives us an opportunity to optimize grouping.

Priority:

[Source code](https://github.com/effector/effector/blob/master/src/effector/kernel.ts#L169)

```
1. child -> forward
2. pure -> map, on
3. sampler -> sample, guard, combine
4. effect -> watch, effect handler
```

> Whenever you allow side effects in pure computations, the library will work by the worst scenario. Thereby, increasing non-consistency of application and breaking pure computations. Don't ignore that.

Let's consider prioritizing in the example below.

```js
let count = 0;
const fx = createEffect(() => {
  // side effect 1
  count += 1;
});

fx.done.watch(() => {
  // side effect 1 already executed
  console.log("expect count to be 1", count === 1);
  // side effect 2
  count += 1;
});

fx();
// side effect 1 already executed
// side effect 2 already executed as well
// that's what we expected to happen
// that's watchmen effect
console.log("expect count to be 2", count === 2);
// example which violated that agreement: setState in react
// which defer any side effect long after setState call itself
```

[Try it](https://share.effector.dev/IRAmt9Uq)

:::info
Whenever a library notices side effect in a pure function it moves it to the end of the [**priority queue**](https://en.wikipedia.org/wiki/Priority_queue).
:::

We hope that this information cleared some things on how the library works.
