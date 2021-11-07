---
id: createStore
title: createStore
description: Метод для создания независимого стора
---

Метод для создания независимого [стора](./Store.md)

## Формула {#createStore-formulae}

```ts
createStore<T>(defaultState: T): Store<T>
createStore<T>(defaultState: T, config: {
  name?: string
  updateFilter?: (update: T, current: T) => boolean
  serialize?: 'ignore'
}): Store<T>
```

### Аргументы {#createStore-args}

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

     Опция, запрещающая сериализацию стора при вызовах [serialize](./serialize.md)

### Возвращает {#createStore-return}

Новый [стор](./Store.md)

:::note

- Опция `updateFilter` добавлена в effector 21.8.0
- Опция `serialize` добавлена в effector 22.0.0

:::

## Пример

```js
import {createEvent, createStore} from 'effector'

const addTodo = createEvent()
const clearTodos = createEvent()

const $todos = createStore([])
  .on(addTodo, (state, todo) => [...state, todo])
  .reset(clearTodos)

const $selectedTodos = $todos.map((todos) => {
  return todos.filter((todo) => !!todo.selected)
})

$todos.watch((state) => {
  console.log('todos', state)
})
```

[Запустить пример](https://share.effector.dev/tquiUgdq)
