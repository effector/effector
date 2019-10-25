---
id: gate
title: Gate: props to store
sidebar_label: Example: props to store
---

Imagine you have the task of transferring something from react props to the effector store.   
Suppose you pass the history object from the react-router to the store, or pass some callbacks from render-props.  
In such a situation [`Gate`](https://effector.now.sh/en/api/effector-react/gate) will help.  

In this example we will write code which will not go beyond our sandbox
```js try
const getTodo = ({id}) =>
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then(response =>
    response.json()
  )

// The effect that makes some kind of api request
const fxGetTodo = createEffect().use(getTodo)

// Our main store
const $todo = createStore(null).on(fxGetTodo.done, (_, {result}) => result)

// Our gate
const TodoGate = createGate('gate with props')

// We call for an effect every time Gate updates its state.
forward({from: TodoGate.state, to: fxGetTodo})


function Todo() {
  const todo = useStore($todo)
  const loading = useStore(fxGetTodo.pending)
  if (loading) {
    return <div>Loading...</div>
  }

  if (Object.keys(todo).length === 0) {
    return <div>empty</div>
  }
  return (
    <div>
      <p>title: {todo.title}</p>
      <p>id: {todo.id}</p>
    </div>
  )
}

// Something that's not easy to get out of react
function ComponentWithRenderProp({ children }) {
  return children(React.useState(0))
}

function App() {
  return (
    <ComponentWithRenderProp>
      {([id, setId]) => (
      	<>
          <button onClick={() => setId(id + 1)}>Get next Todo</button>
          <TodoGate id={id} /> // In this situation, we have the ability to simultaneously render a component and make a request, rather than wait for the component.
          <Todo />
        </>
      )}
    </ComponentWithRenderProp>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```
