---
title: useUnit
description: Effector React
redirectFrom:
  - /api/effector-react/useUnit
  - /docs/api/effector-react/useUnit
---

```ts
React hook, который принимает любой юнит (стор, событие или эффект) или любой объект с юнитами в качестве значений.
```

:::info{title="since"}
Метод `useUnit` добавлен в effector-react 22.1.0
:::

React hook, which takes any unit or shape of units.

В случае [сторов](/ru/api/effector/Store) этот хук подписывает компонент на предоставленный [стор](/ru/api/effector/Store) и возвращает его текущее значение, поэтому при обновлении стора компонент будет обновлен автоматически.

В случае [событий](/ru/api/effector/Event) или [эффектов](/ru/api/effector/Effect) – привязка к текущему [_scope_](/ru/api/effector/Scope) для использования в обработчиках браузерных событий.
Только версия `effector-react/scope` работает таким образом, `useUnit` из `effector-react` является no-op для событий и не требует `Provider` с scope.

# Methods (#methods)

## `useUnit(unit)`

Creates function that calls original unit but bounded to [`Scope`](/en/api/effector/Scope) if provided.

### Текущее значение стора.

```ts
useUnit(event: EventCallable<T>): (payload: T) => T;
useUnit(effect: Effect<Params, Done, any>): (payload: Params) => Promise<Done>;
```

### Arguments (#methods-useUnit-unit-arguments)

1. `unit` [Событие](/ru/api/effector/Event) или [эффект](/ru/api/effector/Effect) для привязки к скоупу.

### **Returns**

(Function): Function to pass to event handlers. Will trigger the given unit in the current scope.

### Example

#### (Function): Функция для запуска юнита в скоупе компонента

```jsx
import { createEvent, createStore, fork } from "effector";
import { useUnit, Provider } from "effector-react";

const inc = createEvent();
const $count = createStore(0).on(inc, (x) => x + 1);

const App = () => {
  const [count, incFn] = useUnit([$count, inc]);

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => incFn()}>increment</button>
    </>
  );
};

const scope = fork();

render(
  () => (
    <Provider value={scope}>
      <App />
    </Provider>
  ),
  document.getElementById("root"),
);
```

## `useUnit(store)`

Эти функции запустят события и эффекты в текущем скоупе.

### Formulae (#methods-useUnit-store-formulae)

```ts
ru
```

### Arguments (#methods-useUnit-store-arguments)

1. `store` ([_Store_](/ru/api/effector/Store))

### **Returns**

Current value of the store.

### Example

#### Arguments

```js
import { createStore, createApi } from "effector";
import { useUnit } from "effector-react";

const $counter = createStore(0);

const { increment, decrement } = createApi($counter, {
  increment: (state) => state + 1,
  decrement: (state) => state - 1,
});

const App = () => {
  const counter = useUnit($counter);

  return (
    <div>
      {counter}
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};
```

## `useUnit(shape)`

### Arguments

```ts
useUnit({ a: Store<A>, b: Event<B>, ... }): { a: A, b: (payload: B) => B; ... }

useUnit([Store<A>, Event<B>, ... ]): [A, (payload: B) => B, ... ]
```

### Arguments (#methods-useUnit-shape-arguments)

1. `shape` Объект или массив содержащий любые ([_событий_](/ru/api/effector/Event), [_эффекты_](/ru/api/effector/Effect) или [_сторы_](/ru/api/effector/Store))

### **Returns**

(Объект или Массив):

- В случае событий и эффектов: функции с теми же именами или ключами в качестве аргумента для передачи обработчикам событий. Will trigger the given unit in the current scope. _Примечание: события или эффекты будут привязаны к скоупу **только**, если `useUnit` импортирован из `effector-react/scope`_.
- В случае сторов: текущее значение стора.

### Example

#### Arguments

```jsx
import { createStore, createEvent, fork } from "effector";
import { useUnit, Provider } from "effector-react";

const inc = createEvent();
const dec = createEvent();

const $count = createStore(0)
  .on(inc, (x) => x + 1)
  .on(dec, (x) => x - 1);

const App = () => {
  const count = useUnit($count);
  const handler = useUnit({ inc, dec });
  // or
  const [a, b] = useUnit([inc, dec]);

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => handler.inc()}>increment</button>
      <button onClick={() => handler.dec()}>decrement</button>
    </>
  );
};

const scope = fork();

render(
  () => (
    <Provider value={scope}>
      <App />
    </Provider>
  ),
  document.getElementById("root"),
);
```
