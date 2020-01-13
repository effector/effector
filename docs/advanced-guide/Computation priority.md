For sure you've been noticed that function must be pure... or watch there is a place for side effect. Yes and we will tell about this in that section - **Computation priority**

A real example of queue priority - people awaiting medical treatment hospital, extreme emergency cases will have the highest priority and move on the start of the queue less significant at the end.

The main of the reason for creating Computation priority was that side effects:

- Letting go first pure functions
- Following consistent state of application
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

> Whenever you will allow fact occurs of side effects, the library will work by worst scenario. Hence your application will have performance problems - progressively. Don't ignore that.

## Side effect

In addition by [side effect](<https://en.wikipedia.org/wiki/Side_effect_(computer_science)>) - these are the consequences of calling a function that can be detected by independent observation.

```js
const event = createEvent('event')

let sideEffect = 0
event.watch(() => {
  sideEffect += 1
})
```

> **Note:** Whenever library notice side effect in the pure function it move him in the end of a [**priority queue**](https://en.wikipedia.org/wiki/Priority_queue).

We hope that this description has given you more clarity about how the library works.
