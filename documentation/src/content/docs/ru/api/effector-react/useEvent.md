---
title: useEvent
lang: ru
---

Реакт-хук, который привязывает событие к текущему [scope](/ru/api/effector/Scope) для использования в обработчиках событий

Используется с серверным рендерингом и в тестировании, импортируется из `effector-react/scope`

## _useEvent(unit)_ (#useEvent-unit)

Привязывает юнит к скоупу компонента

### Формула (#useEvent-unit-formulae)

```ts
declare const event: Event<T>
declare const fx: Effect<T, S>

const eventFn = useEvent(/*unit*/ event)
-> (data: T) => T

const fxFn = useEvent(/*unit*/ fx)
-> (data: T) => Promise<S>
```

### Аргументы (#useEvent-unit-args)

1. **`unit`**: [Событие](/ru/api/effector/Event) или [эффект](/ru/api/effector/Effect) для привязки к скоупу компонента

### Возвращает (#useEvent-unit-return)

Функцию для запуска юнита в скоупе компонента

### Пример (#useEvent-unit-usage-example)

```jsx
import ReactDOM from "react-dom";
import { createEvent, createStore, fork } from "effector";
import { useStore, useEvent, Provider } from "effector-react";

const inc = createEvent();
const $count = createStore(0).on(inc, (x) => x + 1);

const App = () => {
  const count = useStore($count);
  const incFn = useEvent(inc);
  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => incFn()}>increment</button>
    </>
  );
};

const scope = fork();

ReactDOM.render(
  <Provider value={scope}>
    <App />
  </Provider>,
  document.getElementById("root"),
);
```

[Запустить пример](https://share.effector.dev/GyiJvLdo)

## _useEvent([a, b])_ (#useEvent-list)

Привязывает массив событий или эффектов к скоупу компонента

### Формула (#useEvent-list-formulae)

```ts
declare const a: Event<T>
declare const bFx: Effect<T, S>

const [aFn, bFn] = useEvent(/*list*/ [a, bFx])
-> [(data: T) => T, (data: T) => Promise<S>]
```

### Аргументы (#useEvent-list-args)

1. **`list`**: Массив [событий](/ru/api/effector/Event) или [эффектов](/ru/api/effector/Effect)

### Возвращает (#useEvent-list-return)

Массив функций для запуска юнитов в скоупе компонента

### Пример (#useEvent-list-usage-example)

```jsx
import ReactDOM from "react-dom";
import { createEvent, createStore, fork } from "effector";
import { useStore, useEvent, Provider } from "effector-react";

const inc = createEvent();
const dec = createEvent();
const $count = createStore(0)
  .on(inc, (x) => x + 1)
  .on(dec, (x) => x - 1);

const App = () => {
  const count = useStore($count);
  const [incFn, decFn] = useEvent([inc, dec]);
  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => incFn()}>increment</button>
      <button onClick={() => decFn()}>decrement</button>
    </>
  );
};

const scope = fork();

ReactDOM.render(
  <Provider value={scope}>
    <App />
  </Provider>,
  document.getElementById("root"),
);
```

[Запустить пример](https://share.effector.dev/tskNc0Pt)

## _useEvent({a, b})_ (#useEvent-shape)

Привязывает объект событий или эффектов к скоупу компонента

### Формула (#useEvent-shape-formulae)

```ts
declare const a: Event<T>
declare const bFx: Effect<T, S>

const {a: aFn, b: bFn} = useEvent(/*shape*/ {a, b: bFx})
-> {a: (data: T) => T, b: (data: T) => Promise<S>}
```

### Аргументы (#useEvent-shape-args)

1. **`shape`**: Объект [событий](/ru/api/effector/Event) или [эффектов](/ru/api/effector/Effect)

### Возвращает (#useEvent-shape-return)

Объект функций для запуска юнитов в скоупе компонента

### Пример (#useEvent-shape-usage-example)

```jsx
import ReactDOM from "react-dom";
import { createEvent, createStore, fork } from "effector";
import { useStore, useEvent, Provider } from "effector-react";

const inc = createEvent();
const dec = createEvent();
const $count = createStore(0)
  .on(inc, (x) => x + 1)
  .on(dec, (x) => x - 1);

const App = () => {
  const count = useStore($count);
  const handlers = useEvent({ inc, dec });
  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => handlers.inc()}>increment</button>
      <button onClick={() => handlers.dec()}>decrement</button>
    </>
  );
};

const scope = fork();

ReactDOM.render(
  <Provider value={scope}>
    <App />
  </Provider>,
  document.getElementById("root"),
);
```

[Запустить пример](https://share.effector.dev/ulRZefVW)
