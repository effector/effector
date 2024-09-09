---
title: useEvent
redirectFrom:
  - Реакт-хук, который привязывает событие к текущему [scope](/ru/api/effector/Scope) для использования в обработчиках событий
  - "**`list`**: Массив [событий](/ru/api/effector/Event) или [эффектов](/ru/api/effector/Effect)"
---

```ts
import { useEvent } from "effector-react";
```

:::info{title="since"}
`useEvent` introduced in [effector-react 20.9.0](https://changelog.effector.dev/#effector-20-9-0)
:::

:::warning{title="This API "}

Рекомендуется использовать хук [`useUnit`](/ru/api/effector-react/useUnit).
:::

import ReactDOM from "react-dom";
import { createEvent, createStore, fork } from "effector";
import { useStore, useEvent, Provider } from "effector-react";const inc = createEvent();
const dec = createEvent();
const $count = createStore(0)
.on(inc, (x) => x + 1)
.on(dec, (x) => x - 1);const App = () => {
const count = useStore($count);
const [incFn, decFn] = useEvent([inc, dec]);
return (
<> <p>Count: {count}</p>
\<button onClick={() => incFn()}>increment</button>
\<button onClick={() => decFn()}>decrement</button>
\</>
);
};const scope = fork();ReactDOM.render( <Provider value={scope}> <App /> </Provider>,
document.getElementById("root"),
);

:::info{title="Note"}
Useful only if you have server-side rendering or writing tests for React-components.
:::

# Methods (#methods)

## _useEvent(unit)_ (#useEvent-unit)

### Аргументы (#useEvent-unit-args)

1. **`unit`**: [Событие](/ru/api/effector/Event) или [эффект](/ru/api/effector/Effect) для привязки к скоупу компонента

### Возвращает (#useEvent-unit-return)

(Function): Function to pass to event handlers. Will trigger a given unit in the current scope.

### Пример (#useEvent-unit-usage-example)

#### Пример (#useEvent-list-usage-example)

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

## _useEvent({a, b})_ (#useEvent-shape)

### Аргументы (#useEvent-shape-args)

1. **`shape`**: Объект [событий](/ru/api/effector/Event) или [эффектов](/ru/api/effector/Effect)

### Возвращает (#useEvent-shape-return)

(Object or Array): List of functions with the same names or keys as an argument to pass to event handlers. Will trigger a given unit in the current scope.

### Пример (#useEvent-shape-usage-example)

#### Формула (#useEvent-shape-formulae)

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
