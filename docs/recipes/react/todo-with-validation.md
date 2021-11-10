---
id: todo-with-validation
title: TODO list with input validation
---

[Try it](https://share.effector.dev/4la2a6lj)

```js
import {createEvent, createStore, createEffect, restore, combine, sample} from 'effector'
import {useStore, useList} from 'effector-react'

const submit = createEvent()
const submitted = createEvent()
const completed = createEvent()
const changed = createEvent()
const removed = createEvent()

const validateFx = createEffect(([todo, todos]) => {
  if (todos.some(item => item.text === todo))
    throw 'This todo is already on the list'

  if (!todo.trim().length) throw 'Required field'
  
  return null
})

const $todo = restore(changed, '').reset(submitted)
const $error = restore(validateFx.failData, '').reset(changed)

const $todos = createStore([])
  .on(submitted, (prev, next) => [...prev, {text: next, completed: false}])
  .on(completed, (state, index) => state.map((item, i) => ({
    ...item,
    completed: index === i ? !item.completed : item.completed,
  })))
  .on(removed, (state, index) => state.filter((_, i) => i !== index))

sample({
  clock: submit,
  source: [$todo, $todos],
  target: validateFx,
})

sample({
  clock: validateFx.done,
  source: $todo,
  target: submitted,
})

submit.watch(e => e.preventDefault())

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
