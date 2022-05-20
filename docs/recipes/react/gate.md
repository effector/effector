---
id: gate
title: Gate - a bridge between props and store
---

Imagine you have the task of transferring something from react props to the effector store.
Suppose you pass the history object from the react-router to the store, or pass some callbacks from render-props.
In a such situation [`Gate`](https://effector.dev/docs/api/effector-react/gate) will help.

```js
import {createStore, createEffect, forward} from 'effector'
import {useStore, createGate} from 'effector-react'

// Effect for api request
const getTodoFx = createEffect(async ({id}) => {
  const req = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
  return req.json()
})

// Our main store
const $todo = createStore(null).on(getTodoFx.doneData, (_, todo) => todo)

const TodoGate = createGate()

// We callgetTodoFx effect every time Gate updates its state.
forward({from: TodoGate.state, to: getTodoFx})

TodoGate.open.watch(() => {
  //called each time when TodoGate is mounted
})
TodoGate.close.watch(() => {
  //called each time when TodoGate is unmounted
})

function Todo() {
  const todo = useStore($todo)
  const loading = useStore(getTodoFx.pending)

  if (loading) {
    return <div>Loading...</div>
  }

  if (!todo || Object.keys(todo).length === 0) {
    return <div>empty</div>
  }

  return (
    <div>
      <p>title: {todo.title}</p>
      <p>id: {todo.id}</p>
    </div>
  )
}

const App = () => {
  // value which need to be accessed outside from react
  const [id, setId] = React.useState(0)

  return (
    <>
      <button onClick={() => setId(id + 1)}>Get next Todo</button>
      {/*In this situation, we have the ability to simultaneously
      render a component and make a request, rather than wait for the component*/}
      <TodoGate id={id} />
      <Todo />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

[Try it](https://share.effector.dev/u6YeYVaM)
