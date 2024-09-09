---
title: useList
redirectFrom:
  - Полная запись (#useList-full)
  - React-хук для эффективного рендеринга сторов хранящих массивы данных.
---

```ts
**`fn`**: `(item: T, key: React.Key) => React.ReactNode`
```

:::info{title="since"}
`useList` появился в [effector-react 20.1.1](https://changelog.effector.dev/#effector-react-20-1-1)
:::

Hook function for efficient rendering of list store.
Каждый элемент будет мемоизирован и обновлен только при изменении его данных

# Когда нужно использовать `useList`?

`useList` is designed to solve the specific task of efficiently rendering lists. `useList` решает конкретную задачу эффективного рендера списков, с `useList` можно не проставлять key у списков компонентов и там реализован более оптимальный ререндер. Если есть ощущение что требуется что-то еще, то значит фича переросла `useList` и стоит использовать [`useStoreMap`](/ru/api/effector-react/useStoreMap). С `useStoreMap` можно взять конкретные данные из store оптимальным образом, если нужен не весь store а только его часть

# API (#api)

## `useList($store, fn)` (#methods-useList-store-fn)

Using `index` as `key` for each element in the list.

### Формула (#useList-short-formulae)

```ts
function useList(store: Store<T[]>, fn: (item: T, key: number) => React.ReactNode): React.ReactNode;
```

### Аргументы (#useList-full-args)

1. **`store`**: [Стор](/ru/api/effector/Store) с массивом данных
2. `fn` (_Function_): Render function which will be called for every item in list

### Возвращает (#useList-full-return)

`React.ReactNode`

### Examples (#methods-useList-store-fn-examples)

#### Basic (#methods-useList-store-fn-examples-basic)

```jsx
import { createStore } from "effector";
import { useList } from "effector-react";

const $users = createStore([
  { id: 1, name: "Yung" },
  { id: 2, name: "Lean" },
  { id: 3, name: "Kyoto" },
  { id: 4, name: "Sesh" },
]);

const App = () => {
  const list = useList($users, ({ name }, index) => (
    <li>
      [{index}] {name}
    </li>
  ));

  return <ul>{list}</ul>;
};
```

[Запустить пример](https://share.effector.dev/dV9dmuz3)

#### With store updates (#methods-useList-store-fn-examples-with-store-updates)

```jsx
import { createStore, createEvent } from "effector";
import { useList } from "effector-react";

const addTodo = createEvent();
const toggleTodo = createEvent();

const $todoList = createStore([
  { text: "write useList example", done: true },
  { text: "update readme", done: false },
])
  .on(toggleTodo, (list, id) =>
    list.map((todo, i) => {
      if (i === id)
        return {
          ...todo,
          done: !todo.done,
        };
      return todo;
    }),
  )
  .on(addTodo, (list, e) => [
    ...list,
    {
      text: e.currentTarget.elements.content.value,
      done: false,
    },
  ]);

addTodo.watch((e) => {
  e.preventDefault();
});

const TodoList = () =>
  useList($todoList, ({ text, done }, i) => {
    const todo = done ? (
      <del>
        <span>{text}</span>
      </del>
    ) : (
      <span>{text}</span>
    );
    return <li onClick={() => toggleTodo(i)}>{todo}</li>;
  });
const App = () => (
  <div>
    <h1>todo list</h1>
    <form onSubmit={addTodo}>
      <label htmlFor="content">New todo</label>
      <input type="text" name="content" required />
      <input type="submit" value="Add" />
    </form>
    <ul>
      <TodoList />
    </ul>
  </div>
);
```

[Запустить пример](https://share.effector.dev/dUay9F3U)

## `useList($store, config)` (#methods-useList-store-config)

Используется, когда необходимо вычислять ключ элемента или обновлять элементы при изменении какого-либо внешнего значения, доступного только через React (например, поля props из замыкания компонента или состояния другого стора) В таком случае нужно сообщить React о дополнительных зависимостях, в таком случае элемент будет перерендерен и в случае их изменения

По умолчанию `useList` обновляется только тогда, когда некоторые из его элементов были изменены.
Однако иногда необходимо обновлять элементы при изменении какого-либо внешнего значения (например, поля props или состояния другого стора).
In such case, we need to tell React about our dependencies and pass keys explicitly.

### Формула (#useList-full-formulae)

```ts
function useList(
  store: Store<T[]>,
  config: {
    keys: any[];
    fn: (item: T, key: React.Key) => React.ReactNode;
    getKey?: (item: T) => React.Key;
  },
): React.ReactNode;
```

### Аргументы (#useList-short-args)

1. **`store`**: [Стор](/ru/api/effector/Store) с массивом данных
2. **`config`**: Объект конфигурации
   - `keys` (`Array`): Array of dependencies, which will be passed to react by `useList`
   - **`fn`**: `(item: T, key: number) => React.ReactNode`
   - **`getKey?`**: `(item: T) => React.Key`
   - `placeholder` (`React.ReactNode`): Optional react node to render instead of an empty list

:::info{title="since"}
Опция `getKey` добавлена в effector-react 21.3.0
:::

:::info{title="since"}
Опция `placeholder` добавлена в effector-react 22.1.0
:::

### Возвращает (#useList-short-return)

`React.ReactNode`

### Examples (#methods-useList-store-config-examples)

#### Basic (#methods-useList-store-config-examples-config)

```jsx
import ReactDOM from "react-dom";
import { createEvent, createStore, restore } from "effector";
import { useUnit, useList } from "effector-react";

const renameUser = createEvent();
const $user = restore(renameUser, "alice");
const $friends = createStore(["bob"]);

const App = () => {
  const user = useUnit($user);
  return useList($friends, {
    keys: [user],
    fn: (friend) => (
      <div>
        {friend} is a friend of {user}
      </div>
    ),
  });
};

ReactDOM.render(<App />, document.getElementById("root"));
// => <div> bob is a friend of alice </div>

setTimeout(() => {
  renameUser("carol");
  // => <div> bob is a friend of carol </div>
}, 500);
```

[Запустить пример](https://share.effector.dev/joHy2ADJ)
