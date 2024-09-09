---
title: useStoreMap
redirectFrom:
  - (_Result_)
  - (_Result_)
---

```ts
**Возвращает**
```

:::info{title="since"}
ru
:::

Реакт-хук, который подписывается на [стор](/ru/api/effector/Store) и трансформирует его значение с переданной функцией. Компонент будет обновляться только когда результат функции будет отличаться от предыдущего

You can read the motivation in the [issue](https://github.com/effector/effector/issues/118).

# Methods (#methods)

## Типичный вариант использования: подписаться на изменения отдельного поля в сторе

:::info{title="since"}
Краткая форма `useStoreMap` добавлена в `effector-react@21.3.0`
:::

Common use case: subscribe to changes in selected part of store only

### Formulae (#methods-useStoreMap-store-fn-formulae)

```ts
useStoreMap<State, Result>(
  store: Store<State>,
  fn: (state: State) => Result
): Result
```

### Arguments (#methods-useStoreMap-store-fn-arguments)

1. `store`: Используемый [стор](/ru/api/effector/Store)
2. `fn` (_(state) => result_): Функция-селектор

### Returns (#methods-useStoreMap-store-fn-returns)

(`Result`): Value from the `fn` function call.

### Examples (#methods-useStoreMap-store-fn-examples)

TBD

## `useStoreMap(config)` (#methods-useStoreMap-config)

Перегрузка для случаев, когда требуется передать зависимости в React (для обновления элементов при изменении этих зависимостей)

### Formulae (#methods-useStoreMap-config-formulae)

```ts
useStoreMap<Source, Result>({
  store: Store<Source>;
  keys: any[];
  fn: (state: Source, keys: any[]) => Result;
  updateFilter?: (newResult: Result, oldResult: Result) => boolean;
  defaultValue?: Result;
}): Result
```

### Arguments (#methods-useStoreMap-config-arguments)

1. `params` (_Object_): Объект конфигурации
   - `store`: Используемый [стор](/ru/api/effector/Store)
   - `keys` (_Array_): Массив, который будет передан в React.useMemo
   - `fn` (_(state, keys) => result_): Функция-селектор
   - `updateFilter` (_(newResult, oldResult) => boolean_): _Опционально_ функция, используемая для сравнения старого и нового результата работы хука, предназначено для избежания лишних ререндеров. Реализация опции для работы использует [createStore updateFilter](/ru/api/effector/createStore)
   - `defaultValue`: Опциональное значение по умолчанию, используется когда `fn` возвращает undefined

:::info{title="since"}
Опция `updateFilter` добавлена в `effector-react@21.3.0`
:::

:::info{title="since"}
Опция `defaultValue` добавлена в `effector-react@22.1.0`
:::

### Returns (#methods-useStoreMap-config-returns)

(`Result`): Value from the `fn` function call, or the `defaultValue`.

### Examples (#methods-useStoreMap-config-examples)

#### Basic (#methods-useStoreMap-config-examples-basic)

Этот хук полезен для работы со списками, особенно с большими

```jsx
import { createStore } from "effector";
import { useUnit, useStoreMap } from "effector-react";

const data = [
  {
    id: 1,
    name: "Yung",
  },
  {
    id: 2,
    name: "Lean",
  },
  {
    id: 3,
    name: "Kyoto",
  },
  {
    id: 4,
    name: "Sesh",
  },
];

const $users = createStore(data);
const $ids = createStore(data.map(({ id }) => id));

const User = ({ id }) => {
  const user = useStoreMap({
    store: $users,
    keys: [id],
    fn: (users, [userId]) => users.find(({ id }) => id === userId),
  });

  return (
    <div>
      <strong>[{user.id}]</strong> {user.name}
    </div>
  );
};

const UserList = () => {
  const ids = useUnit($ids);
  return ids.map((id) => <User key={id} id={id} />);
};
```

[Запустить пример](https://share.effector.dev/gIuUl8fF)
