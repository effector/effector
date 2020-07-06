---
id: fork
title: fork
hide_title: true
---

# fork

```ts
fork(domain: Domain, { values?, handlers? }?): Scope
```

Creates a copy of a provied domain allowing multiple instances of the same logic in the application.
The primary purpose of fork includes SSR (but is not limited to). Fork clones all the units and connections between them leading to completly independent copy of all logic defined within domain.

### Arguments

1. `domain` ([_Domain_](Domain.md)): Original domain to clone, required
2. `values` Optional object with either a mapping from store sids ([_babel-plugin_](babel-plugin.md) is required to allow `sid` generation) to store values or a Map where keys are [_Store_](Store.md) objects and values contains initial store value
3. `handlers` Optional object with either a mapping from effect sids ([_babel-plugin_](babel-plugin.md) is required to allow `sid` generation) to effect handlers or a Map where keys are [_Effect_](Effect.md) objects and values contains handlers
### Returns

`Scope` object containing information about cloned domain

```ts
interface Scope {
  getState<T>(store: Store<T>): T
}
```

### Example

Create two instances with indepented counter state

```js try
import { createStore, createEvent, createDomain, forward, fork, allSettled } from 'effector'

const domain = createDomain()
const inc = domain.createEvent()
const dec = domain.createEvent()
const $counter = domain.createStore(0)
    .on(inc, value => value + 1)
    .on(dec, value => value - 1)

const scopeA = fork(domain)
const scopeB = fork(domain)

await allSettled(inc, {scope: scopeA})
await allSettled(dec, {scope: scopeB})

console.log($counter.getState()) // => 0
console.log(scopeA.getState($counter)) // => 1
console.log(scopeB.getState($counter)) // => -1

```

[Try it](https://share.effector.dev/0grlV3bA)
