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

## Применяется для реализации взаимодействия с библиотеками на основе стримов, например `rxjs` и `most`

Creates an event containing all items from an Observable.

### Formulae (#methods-fromObservable-formulae)

```ts
function fromObservable(stream: Observable<T>): Event<T>;
```

### Arguments (#methods-fromObservable-arguments)

1. **`observable`**: Observable

### Returns (#methods-fromObservable-returns)

Новое [событие](/ru/api/effector/Event)

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
