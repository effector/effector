For sure you've been noticed that function [should be pure](../glossary.md#pureness)... or watch there is a place for side effect. Yes and we will tell about this in that section - **Computation priority**

A real example of queue priority - people awaiting medical treatment hospital, extreme emergency cases will have the highest priority and move on the start of the queue less significant at the end.

The main of the reason for creating Computation priority was to occur side effects:

- Letting go first pure functions
- Side effects follow a consistent state of an application
- Batching of pure computation in `combine()`

Actually, pure computation cannot observe out of scope, therefore the definition of **_pure computation_** by the library gives an opportunity to optimized grouping.

Priority:

[Source code](https://github.com/zerobias/effector/blob/master/src/effector/kernel.js#L171)

```
1. child -> forward
2. pure -> map, on
3. barrier -> combine, createStoreObject
4. sampler -> sample, guard
5. effect -> watch, effect handler
```

> Whenever you will allow fact occurs of side effects, the library will work by worst scenario. Thereby the increase non-consistency of application, where side effects occur inside pure computation, therefore, breaking them and themselves. Don't ignore that.

Let's consider prioritize in the example below.

```js try
let count = 0
const sideEffect = createEffect({
  handler() {
    // side effect 1
    count += 1
  },
})

sideEffect.done.watch(() => {
  // side effect 1 already executed
  console.log('expect count to be 1', count === 1)
  // side effect 2
  count += 1
})

sideEffect()
// side effect 1 already executed
// side effect 2 already executed as well
// that's what we expected to happen
// that's watchmen effect
console.log('expect count to be 2', count === 2)
// example which violated that agreement: setState in react
// which defer any side effect long after setState call itself
```

[Try it](https://share.effector.dev/cyzh0THS)

> **Note:** Whenever library notice side effect in the pure function it move him in the end of a [**priority queue**](https://en.wikipedia.org/wiki/Priority_queue).

We hope that this description has given you more clarity about how the library works.
