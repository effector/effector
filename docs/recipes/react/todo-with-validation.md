---
id: todo-with-validation
title: TODO list with input validation
---

```js
import {createEvent, createStore, createEffect, restore, combine, sample} from 'effector'
import {useStore, useList} from 'effector-react'

const validate = createEffect()
const submit = createEvent()
const submitted = createEvent()
const completed = createEvent()
const changed = createEvent()
const removed = createEvent()
const $todos = createStore([])
const $todo = restore(changed, '').reset(submitted)
const $error = restore(validate.failData, '').reset(changed)

submit.watch(e => e.preventDefault())

$todos.on(submitted, (prev, next) =>
  prev.concat({text: next, completed: false})
)
$todos.on(completed, (state, index) =>
  state.map((item, i) => ({
    ...item,
    completed: index === i ? !item.completed : item.completed,
  }))
)
$todos.on(removed, (state, index) => state.filter((_, i) => i !== index))

validate.use(([todo, todos]) => {
  if (todos.some(item => item.text === todo))
    throw 'This todo is already on the list'
  if (!todo.trim().length) throw 'Required field'
  return null
})

sample({
  source: combine($todo, $todos),
  clock: submit,
  target: validate,
})

sample({
  source: $todo,
  clock: validate.done,
  target: submitted,
})

const App = () => {
  const tasks = useStore($todos)
  const todo = useStore($todo)
  const error = useStore($error)
  const list = useList($todos, (item, index) => (
    <li style={{textDecoration: item.completed ? 'line-through' : ''}}>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => completed(index)}
      />
      {item.text}
      <button type="button" onClick={() => removed(index)} className="delete">
        x
      </button>
    </li>
  ))
  return (
    <div>
      <h1>Todos</h1>
      <form>
        <input
          className="text"
          type="text"
          name="todo"
          value={todo}
          onChange={e => changed(e.target.value)}
        />
        <button type="submit" onClick={submit} className="submit">
          Submit
        </button>
        {error && <div className="error">{error}</div>}
      </form>

      <ul style={{listStyle: 'none'}}>{list}</ul>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

[Try it](https://share.effector.dev/HuK3aUI8)
