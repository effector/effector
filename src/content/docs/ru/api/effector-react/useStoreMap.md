---
title: useStoreMap
lang: ru
---

Реакт-хук, который подписывается на [стор](/ru/api/effector/Store) и трансформирует его значение с переданной функцией. Компонент будет обновляться только когда результат функции будет отличаться от предыдущего

Типичный вариант использования: подписаться на изменения отдельного поля в сторе

```ts
useStoreMap<State, Result>(
  store: Store<State>,
  fn: (state: State) => Result
): Result
```

:::info
Краткая форма `useStoreMap` добавлена в `effector-react@21.3.0`
:::

**Аргументы**

1. `store`: Используемый [стор](/ru/api/effector/Store)
2. `fn` (_(state) => result_): Функция-селектор

**Возвращает**

(_Result_)

```ts
useStoreMap<Source, Result>({
  store: Store<Source>;
  keys: any[];
  fn: (state: Source, keys: any[]) => Result;
  updateFilter?: (newResult: Result, oldResult: Result) => boolean;
  defaultValue?: Result;
}): Result
```

Перегрузка для случаев, когда требуется передать зависимости в React (для обновления элементов при изменении этих зависимостей)

**Аргументы**

1. `params` (_Object_): Объект конфигурации
   - `store`: Используемый [стор](/ru/api/effector/Store)
   - `keys` (_Array_): Массив, который будет передан в React.useMemo
   - `fn` (_(state, keys) => result_): Функция-селектор
   - `updateFilter` (_(newResult, oldResult) => boolean_): _Опционально_ функция, используемая для сравнения старого и нового результата работы хука, предназначено для избежания лишних ререндеров. Реализация опции для работы использует [createStore updateFilter](/ru/api/effector/createStore)
   - `defaultValue`: Опциональное значение по умолчанию, используется когда `fn` возвращает undefined

**Возвращает**

(_Result_)

:::info
Опция `updateFilter` добавлена в `effector-react@21.3.0`
:::

:::info
Опция `defaultValue` добавлена в `effector-react@22.1.0`
:::

#### Пример

Этот хук полезен для работы со списками, особенно с большими

```jsx
import { createStore } from "effector";
import { useStore, useStoreMap } from "effector-react";

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
  const ids = useStore($ids);
  return ids.map((id) => <User key={id} id={id} />);
};
```

[Запустить пример](https://share.effector.dev/cAZWHCit)
