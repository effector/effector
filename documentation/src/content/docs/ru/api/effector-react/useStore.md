---
title: useStore
redirectFrom:
  - ru
  - Реакт-хук для подписки компонента на стор
---

```ts
import { useStore } from "effector-react";
```

Реакт-хук, который подписывается на [стор](/ru/api/effector/Store) и возвращает его текущее значение, поэтому при обновлении стора, компонент также будет автоматически обновлён

:::warning{title="This API "}

Рекомендуется использовать хук [`useUnit`](/ru/api/effector-react/useUnit).
:::

# Methods (#methods)

## **Аргументы**

### Formulae (#methods-useStore-store-formulae)

```ts
useStore(store: Store<T>): T
```

### Arguments (#methods-useStore-store-arguments)

1. `store`: [Store](/ru/api/effector/Store)

### Returns (#methods-useStore-store-returns)

(_`State`_): Значение из стора

### Examples (#methods-useStore-store-examples)

```jsx
import { createStore, createApi } from "effector";
import { useStore } from "effector-react";

const $counter = createStore(0);

const { increment, decrement } = createApi($counter, {
  increment: (state) => state + 1,
  decrement: (state) => state - 1,
});

const App = () => {
  const counter = useStore($counter);
  return (
    <div>
      {counter}
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};
```

[Запустить пример](https://share.effector.dev/DHzp3z4r)
