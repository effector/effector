---
id: scope
title: Scope
---

`Scope` is a fully isolated instance of application.
The primary purpose of scope includes SSR (but is not limited to). Scope contain independent clone of all the units (including connections between them) and basic methods to access them.
Scope can be created by [fork](./fork.md)

```ts
interface Scope {
  getState<T>(store: Store<T>): T
}
```

## Scope methods

### `getState`

Returns store value in given scope

#### Example

Create two instances of application, call events in them and test `$counter` store value in both

```js
import {
  createStore,
  createEvent,
  createDomain,
  forward,
  fork,
  allSettled,
} from 'effector'

const domain = createDomain()
const inc = domain.createEvent()
const dec = domain.createEvent()
const $counter = domain
  .createStore(0)
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
