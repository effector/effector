---
title: useList
redirectFrom:
  - /api/effector-react/useList
  - /docs/api/effector-react/useList
---

```ts
import { useList } from "effector-react";
```

:::info{title="since"}
`useList` introduced in [effector-react 20.1.1](https://changelog.effector.dev/#effector-react-20-1-1)
:::

Hook function for efficient rendering of list store.
Every item will be memoized and updated only when their data change.

# Methods (#methods)

## `useList($store, fn)` (#methods-useList-store-fn)

Using `index` as `key` for each element in the list.

### Formulae (#methods-useList-store-fn-formulae)

```ts
useList(
  $store: Store<T[]>,
  fn: (value: T, index: number) => React.ReactNode,
): React.ReactNode;
```

### Arguments (#methods-useList-store-fn-arguments)

1. `$store` ([`Store<T>`](/en/api/effector/Store)): Store with an array of items
2. `fn` (_Function_): Render function which will be called for every item in list

### Returns (#methods-useList-store-fn-returns)

(`React.Node`)

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
  // we don't need keys here any more
  const list = useList($users, ({ name }, index) => (
    <li>
      [{index}] {name}
    </li>
  ));

  return <ul>{list}</ul>;
};
```

[Try it](https://share.effector.dev/dV9dmuz3)

#### With store updates (#methods-useList-store-fn-examples-with-store-updates)

```jsx
import { createStore, createEvent } from "effector";
import { useList, useUnit } from "effector-react";

const todoSubmitted = createEvent();
const todoToggled = createEvent();

const $todoList = createStore([
  { text: "write useList example", done: true },
  { text: "update readme", done: false },
]);

$todoList.on(todoToggled, (list, id) =>
  list.map((todo, index) => {
    if (index === id)
      return {
        ...todo,
        done: !todo.done,
      };
    return todo;
  }),
);

$todoList.on(todoSubmitted, (list, text) => [...list, { text, done: false }]);

todoSubmitted.watch((e) => {
  e.preventDefault();
});

const TodoList = () => {
  const [onTodoToggle] = useUnit([todoToggled]);
  return useList($todoList, ({ text, done }, index) => {
    const todo = done ? (
      <del>
        <span>{text}</span>
      </del>
    ) : (
      <span>{text}</span>
    );

    return <li onClick={() => onTodoToggle(index)}>{todo}</li>;
  });
};

const App = () => {
  const [onTodoSubmit] = useUnit([todoSubmitted]);

  function handleSubmit(e) {
    e.preventDefault();
    onTodoSubmit(e.currentTarget.elements.content.value);
  }

  return (
    <div>
      <h1>todo list</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="content">New todo</label>
        <input type="text" name="content" required />
        <input type="submit" value="Add" />
      </form>
      <ul>
        <TodoList />
      </ul>
    </div>
  );
};
```

[Try it](https://share.effector.dev/dUay9F3U)

## `useList($store, config)` (#methods-useList-store-config)

Used when you need to pass dependencies to react (to update items when some of its dependencies are changed).

By default, `useList` rerenders only when some of its items were changed.
However, sometimes we need to update items when some external value (e.g. props field or state of another store) changes.
In such case, we need to tell React about our dependencies and pass keys explicitly.

### Formulae (#methods-useList-store-config-formulae)

```ts
useList(
  $store: Store<T[]>,
  config: {
    keys: any[],
    getKey?: (value: T) => React.Key,
    fn: (value: T, index: number) => React.ReactNode,
    placeholder?: React.ReactNode,
  }
): React.ReactNode;
```

### Arguments (#methods-useList-store-config-arguments)

1. `$store` ([`Store<T>`](/en/api/effector/Store)): Store with an array of items
2. `config` (`Object`)
   - `keys` (`Array`): Array of dependencies, which will be passed to react by `useList`
   - `fn` (`(value: T) => React.ReactNode`): Render function which will be called for every item in list
   - `getKey` (`(value) => React.Key`): Optional function to compute key for every item of list
   - `placeholder` (`React.ReactNode`): Optional react node to render instead of an empty list

:::info{title="since"}
`getKey` option introduced in [effector-react@21.3.0](https://changelog.effector.dev/#effector-react-21-3-0)
:::

:::info{title="since"}
`placeholder` option introduced in [effector-react@22.1.0](https://changelog.effector.dev/#effector-react-22-1-0)
:::

### Returns (#methods-useList-store-config-returns)

(`React.Node`)

### Examples (#methods-useList-store-config-examples)

#### Basic (#methods-useList-store-config-examples-config)

```jsx
import ReactDOM from "react-dom";
import { createEvent, createStore, restore } from "effector";
import { useUnit, useList } from "effector-react";

const renameUser = createEvent();

const $user = createStore("alice");
const $friends = createStore(["bob"]);

$user.on(renameUser, (_, name) => name);

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

[Try it](https://share.effector.dev/ijRS5TYh)
