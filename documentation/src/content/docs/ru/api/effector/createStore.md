---
title: createStore
description: Метод для создания независимого стора
lang: ru
---

Метод для создания независимого [стора](/ru/api/effector/Store)

## Формула (#createStore-formulae)

```ts
createStore<T>(defaultState: T): Store<T>
createStore<T>(defaultState: T, config: {
  name?: string
  updateFilter?: (update: T, current: T) => boolean
  serialize?: 'ignore'
}): Store<T>
```

### Аргументы (#createStore-args)

1. **`defaultState`**: Исходное состояние
2. **`config`**: Опциональный объект конфигурации

   - **`name`**: Имя стора. Babel-plugin может определить его из имени переменной стора, если имя не передано явно в конфигурации
   - **`updateFilter`**: `(update: T, current: T) => boolean`

     Функция, которая предотвращает обновление стора, если она возвращает `false`. Следует использовать для случаев, когда стандартного запрета на обновление (если значение, которое предполагается записать в стор, равняется _undefined_ или текущему значению стора) недостаточно.

     **Аргументы**

     - **`update`**: Значение, которое предлагается записать в стор
     - **`current`**: Текущее значение стора

     **Возвращает**: `boolean`

     Если возвращается _false_, то обновления не будет

   - **`serialize`**: `'ignore'`

     Опция, запрещающая сериализацию стора при вызовах [serialize](/ru/api/effector/serialize)

   - **`serialize`**: Объект конфигурации кастомной сериализации стора. `write` вызывается при вызове [serialize](/ru/api/effector/serialize) и приводит состояние стора к JSON-значению – примитив или простой объект/массив. `read` вызывается при [fork](/ru/api/effector/fork), если предоставленные `values` – результат вызова [serialize](/ru/api/effector/serialize)

### Возвращает (#createStore-return)

Новый [стор](/ru/api/effector/Store)

:::info

- Опция `updateFilter` добавлена в effector 21.8.0
- Опция `serialize` добавлена в effector 22.0.0

:::

## Пример

```js
import { createEvent, createStore } from "effector";

const addTodo = createEvent();
const clearTodos = createEvent();

const $todos = createStore([])
  .on(addTodo, (state, todo) => [...state, todo])
  .reset(clearTodos);

const $selectedTodos = $todos.map((todos) => {
  return todos.filter((todo) => !!todo.selected);
});

$todos.watch((state) => {
  console.log("todos", state);
});
```

[Запустить пример](https://share.effector.dev/tquiUgdq)

#### Пример с кастомной конфигурацией `serialize`

```ts
import { createEvent, createStore, serialize, fork, allSettled } from "effector";

const saveDate = createEvent();
const $date = createStore<null | Date>(null, {
  // Объект Date автоматически приводится в строку ISO-даты при вызове JSON.stringify
  // но не приводится обратно к Date при вызове JSON.parse – результатом будет та же строка ISO-даты
  // Это приведет к расхождению состояния стора при гидрации состояния на клиенте при серверном рендеринге
  //
  // Кастомная конфигурация `serialize` решает эту проблему
  serialize: {
    write: (dateOrNull) => (dateOrNull ? dateOrNull.toISOString() : dateOrNull),
    read: (isoStringOrNull) => (isoStringOrNull ? new Date(isoStringOrNull) : isoStringOrNull),
  },
}).on(saveDate, (_, p) => p);

const serverScope = fork();

await allSettled(saveDate, { scope: serverScope, params: new Date() });

const serverValues = serialize(serverScope);
// `serialize.write` стора `$date` был вызван

console.log(serverValues);
// => { nq1e2rb: "2022-11-05T15:38:53.108Z" }
// Объект Date из стора сохранен как ISO-дата

const clientScope = fork({ values: serverValues });
// `serialize.read` стора `$date` был вызван

const currentValue = clientScope.getState($date);
console.log(currentValue);
// => Date 11/5/2022, 10:40:13 PM
// Строка ISO-даты приведена обратно к объекту Date
```

[Запустить пример](https://share.effector.dev/YFkUlqPv)
