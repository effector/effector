---
title: ToDo creator
redirectFrom:
  - /docs/recipes/react/todo-creator
  - /recipes/react/todo-creator
---

[Try it](https://share.effector.dev/AeiP1Jeb)

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { createStore, createEvent, sample } from "effector";
import { useStore, useList } from "effector-react";

function createTodoListApi(initial: string[] = []) {
  const insert = createEvent<string>();
  const remove = createEvent<number>();
  const change = createEvent<string>();
  const reset = createEvent<void>();

  const $input = createStore<string>("");
  const $todos = createStore<string[]>(initial);

  $input.on(change, (_, value) => value);

  $input.reset(insert);
  $todos.on(insert, (todos, newTodo) => [...todos, newTodo]);

  $todos.on(remove, (todos, index) => todos.filter((_, i) => i !== index));

  $input.reset(reset);

  const submit = createEvent<React.SyntheticEvent>();
  submit.watch((event) => event.preventDefault());

  sample({
    clock: submit,
    source: $input,
    target: insert,
  });

  return {
    submit,
    remove,
    change,
    reset,
    $todos,
    $input,
  };
}

const firstTodoList = createTodoListApi(["hello, world!"]);
const secondTodoList = createTodoListApi(["hello, world!"]);

function TodoList({ label, model }) {
  const input = useStore(model.$input);

  const todos = useList(model.$todos, (value, index) => (
    <li>
      {value}{" "}
      <button type="button" onClick={() => model.remove(index)}>
        Remove
      </button>
    </li>
  ));

  return (
    <>
      <h1>{label}</h1>
      <ul>{todos}</ul>
      <form>
        <label>Insert todo: </label>
        <input
          type="text"
          value={input}
          onChange={(event) => model.change(event.currentTarget.value)}
        />
        <input type="submit" onClick={model.submit} value="Insert" />
      </form>
    </>
  );
}

function App() {
  return (
    <>
      <TodoList label="First todo list" model={firstTodoList} />
      <TodoList label="Second todo list" model={secondTodoList} />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```
