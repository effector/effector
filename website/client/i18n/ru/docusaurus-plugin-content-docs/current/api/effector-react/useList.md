---
id: useList
title: useList
---

# useList

React-хук для эффективного рендеринга сторов хранящих массивы данных.
Каждый элемент будет мемоизирован и обновлен только при изменении его данных

## Сокращённая запись {#useList-short}

### Формула {#useList-short-formulae}

```ts
function useList(
  store: Store<T[]>,
  fn: (item: T, key: number) => React.Node,
): React.Node
```

### Аргументы {#useList-short-args}

1. **`store`**: [Стор](../effector/Store.md) с массивом данных
2. **`fn`**: `(item: T, key: number) => React.Node`

   Рендер-функция для отображения в ui отдельного элемента массива. Явная простановка `key` реакт-элементам внутри рендер-функции не требуется, ключ элемента проставляется автоматически

   **Аргументы**

   - **`item`**: Элемент массива
   - **`key`**: Индекс элемента, выступает как ключ для react

   **Возвращает**: `React.Node`

### Возвращает {#useList-short-return}

`React.Node`

## Полная запись {#useList-full}

Используется, когда необходимо вычислять ключ элемента или обновлять элементы при изменении какого-либо внешнего значения, доступного только через react (например, поля props из замыкания компонента или состояния другого стора)

По умолчанию `useList` обновляется только тогда, когда некоторые из его элементов были изменены.
Однако иногда необходимо обновлять элементы при изменении какого-либо внешнего значения (например, поля props или состояния другого стора).
В таком случае нужно сообщить react о дополнительных зависимостях, в таком случае элемент будет перерендерен и в случае их изменения

### Формула {#useList-full-formulae}

```ts
function useList(
  store: Store<T[]>,
  config: {
    keys: any[]
    fn: (item: T, key: React.Key) => React.Node
    getKey?: (item: T) => React.Key
  },
): React.Node
```

### Аргументы {#useList-full-args}

1. **`store`**: [Стор](../effector/Store.md) с массивом данных
2. **`config`**: Объект конфигурации

   - **`keys`**: Массив зависимостей, которые будут переданы в react
   - **`fn`**: `(item: T, key: React.Key) => React.Node`

     Рендер-функция для отображения в ui отдельного элемента массива. Явная простановка `key` реакт-элементам внутри рендер-функции не требуется, ключ элемента проставляется автоматически

     **Аргументы**

     - **`item`**: Элемент массива
     - **`key`**: Ключ элемента, вычисляется с помощью `getKey`, если есть, в противном случае используется индекс элемента

     **Возвращает**: `React.Node`

   - **`getKey?`**: `(item: T) => React.Key`

     Функция для вычисления ключа элемента на основе данных. Полученный ключ будет передан в react

     **Аргументы**

     - **`item`**: Элемент массива

     **Возвращает**: `React.Key`

### Возвращает {#useList-full-return}

`React.Node`

:::note
Опция `getKey` добавлена в effector-react 21.3.0
:::

## Примеры

### Пример 1

```jsx
import {createStore} from 'effector'
import {useList} from 'effector-react'

const $users = createStore([
  {id: 1, name: 'Yung'},
  {id: 2, name: 'Lean'},
  {id: 3, name: 'Kyoto'},
  {id: 4, name: 'Sesh'},
])

const App = () => {
  const list = useList($users, ({name}, index) => (
    <li>
      [{index}] {name}
    </li>
  ))

  return <ul>{list}</ul>
}
```

[Запустить пример](https://share.effector.dev/dV9dmuz3)

### Пример 2

```jsx
import {createStore, createEvent} from 'effector'
import {useList} from 'effector-react'

const addTodo = createEvent()
const toggleTodo = createEvent()

const $todoList = createStore([
  {text: 'write useList example', done: true},
  {text: 'update readme', done: false},
])
  .on(toggleTodo, (list, id) =>
    list.map((todo, i) => {
      if (i === id)
        return {
          ...todo,
          done: !todo.done,
        }
      return todo
    }),
  )
  .on(addTodo, (list, e) => [
    ...list,
    {
      text: e.currentTarget.elements.content.value,
      done: false,
    },
  ])

addTodo.watch(e => {
  e.preventDefault()
})

const TodoList = () =>
  useList($todoList, ({text, done}, i) => {
    const todo = done ? (
      <del>
        <span>{text}</span>
      </del>
    ) : (
      <span>{text}</span>
    )
    return <li onClick={() => toggleTodo(i)}>{todo}</li>
  })
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
)
```

[Запустить пример](https://share.effector.dev/dUay9F3U)

### Пример с конфигурацией

```jsx
import ReactDOM from 'react-dom'
import {createEvent, createStore, restore} from 'effector'
import {useStore, useList} from 'effector-react'

const renameUser = createEvent()
const $user = restore(renameUser, 'alice')
const $friends = createStore(['bob'])

const App = () => {
  const user = useStore($user)
  return useList($friends, {
    keys: [user],
    fn: friend => (
      <div>
        {friend} is a friend of {user}
      </div>
    ),
  })
}

ReactDOM.render(<App />, document.getElementById('root'))
// => <div> bob is a friend of alice </div>

setTimeout(() => {
  renameUser('carol')
  // => <div> bob is a friend of carol </div>
}, 500)
```

[Запустить пример](https://share.effector.dev/ijRS5TYh)
