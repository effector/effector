---
title: fromObservable
redirectFrom:
  - /api/effector/fromObservable
  - /docs/api/effector/fromObservable
---

```ts
import { fromObservable, type Observable } from "effector";
```

# Methods (#methods)

## `fromObservable()` (#methods-fromObservable)

Creates an event containing all items from an Observable.

### Formulae (#methods-fromObservable-formulae)

```ts
fromObservable<T>(source: Observable<T>): Event<T>
```

### Arguments (#methods-fromObservable-arguments)

1. `observable` (_Observable_)

### Returns (#methods-fromObservable-returns)

[_Event_](/en/api/effector/Event): New event

### Examples (#methods-fromObservable-examples)

#### Basic use case (#methods-fromObservable-examples-basic-use-case)

```js
import { interval } from "rxjs";
import { fromObservable } from "effector";

//emit value in sequence every 1 second
const source = interval(1000);

const event = fromObservable(source);

//output: 0,1,2,3,4,5....
event.watch(console.log);
```
