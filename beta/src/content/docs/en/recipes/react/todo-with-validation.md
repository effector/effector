---
title: TODO list with input validation
redirectFrom:
  - /docs/recipes/react/todo-with-validation
  - /recipes/react/todo-with-validation
---

[Try it](https://share.effector.dev/QTvCCXEg)

```js
import { createEvent, createStore, createEffect, restore, combine, sample } from "effector";
import { useUnit, useList } from "effector-react";

const submit = createEvent();
const submitted = createEvent();
const completed = createEvent();
const changed = createEvent();
const removed = createEvent();

const validateFx = createEffect(([todo, todos]) => {
  if (todos.some((item) => item.text === todo)) throw "This todo is already on the list";
  if (!todo.trim().length) throw "Required field";
  return null;
});

const $todo = createStore("");
const $todos = createStore([]);
const $error = createStore("");

$todo.on(changed, (_, todo) => todo);
$error.reset(changed);

$todos.on(completed, (list, index) =>
  list.map((todo, foundIndex) => ({
    ...todo,
    completed: index === foundIndex ? !todo.completed : todo.completed,
  })),
);
$todos.on(removed, (state, index) => state.filter((_, i) => i !== index));

sample({
  clock: submit,
  source: [$todo, $todos],
  target: validateFx,
});

sample({
  clock: validateFx.done,
  source: $todo,
  target: submitted,
});

$todos.on(submitted, (list, text) => [...list, { text, completed: false }]);
$todo.reset(submitted);

$error.on(validateFx.failData, (_, error) => error);

submit.watch((e) => e.preventDefault());

const App = () => {
  const [todo, error] = useUnit([$todo, $error]);
  const list = useList($todos, (todo, index) => (
    <li style={{ textDecoration: todo.completed ? "line-through" : "" }}>
      <input type="checkbox" checked={todo.completed} onChange={() => completed(index)} />
      {todo.text}
      <button type="button" onClick={() => removed(index)} className="delete">
        x
      </button>
    </li>
  ));
  return (
    <div>
      <h1>Todos</h1>
      <form>
        <input
          className="text"
          type="text"
          name="todo"
          value={todo}
          onChange={(e) => changed(e.target.value)}
        />
        <button type="submit" onClick={submit} className="submit">
          Submit
        </button>
        {error && <div className="error">{error}</div>}
      </form>

      <ul style={{ listStyle: "none" }}>{list}</ul>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
```
