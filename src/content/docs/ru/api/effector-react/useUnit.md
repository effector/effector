---
title: useUnit
lang: ru
---

React hook, который принимает любой юнит (стор, событие или эффект) или любой объект с юнитами в качестве значений.

В случае [сторов](/ru/api/effector/Store.md) этот хук подписывает компонент на предоставленный [стор](/ru/api/effector/Store.md) и возвращает его текущее значение, поэтому при обновлении стора компонент будет обновлен автоматически.

В случае [событий](/ru/api/effector/Event.md) или [эффектов](/ru/api/effector/Effect.md) - привязка к текущему [_scope_](/ru/api/effector/Scope.md) для использования в обработчиках браузерных событий.
Только версия `effector-react/scope` работает таким образом, `useUnit` из `effector-react` является no-op для событий и не требует `Provider` с scope.

::: info
Метод `useUnit` добавлен в effector-react 22.1.0
:::

## `useUnit(unit)`

### Arguments

1. `unit` [Событие](/ru/api/effector/Event.md) или [эффект](/ru/api/effector/Effect.md) для привязки к скоупу.

**Returns**

(Function): Функция для запуска юнита в скоупе компонента

### Example

```jsx
import { createEvent, createStore, fork } from "effector";
import { useUnit, Provider } from "effector-react/scope";

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
  document.getElementById("root")
);
```

## `useUnit(store)`

### Arguments

1. `store` ([_Store_](/ru/api/effector/Store.md))

**Returns**

Текущее значение стора.

#### Example

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

1. `shape` Объект или массив содержащий любые ([_событий_](/ru/api/effector/Event.md), [_эффекты_](/ru/api/effector/Effect.md) или [_сторы_](/ru/api/effector/Store.md))

**Returns**

(Объект или Массив):

- В случае событий и эффектов: функции с теми же именами или ключами в качестве аргумента для передачи обработчикам событий. Эти функции запустят события и эффекты в текущем скуопе. _Примечание: события или эффекты будут привязаны к скоупу **только**, если `useUnit` импортирован из `effector-react/scope`_.
- В случае сторов: текущее значение стора.

### Example

```jsx
import { createStore, createEvent, fork } from "effector";
import { useUnit, Provider } from "effector-react/scope";

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
  document.getElementById("root")
);
```
