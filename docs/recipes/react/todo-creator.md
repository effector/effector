---
id: todo-creator
title: TODO creator
---

[Try it](https://share.effector.dev/CKvKkf6j)

```ts
import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, createEvent, sample} from 'effector'
import {useStore, useList} from 'effector-react'

function createTodoListApi(initial: string[] = []) {
  const insert = createEvent<string>()
  const remove = createEvent<number>()
  const change = createEvent<string>()
  const reset = createEvent<void>()

  const $input = createStore<string>('')
    .on(change, (state, value) => value).reset(reset, insert)

  const $todos = createStore<string[]>(initial)
    .on(insert, (state, value) => [...state, value])
    .on(remove, (state, index) => state.filter((_, i) => i !== index))

  const submit = createEvent()
  submit.watch(e => e.preventDefault())

  sample({
    clock: submit,
    source: input,
    target: insert,
  })

  return {
    submit,
    remove,
    change: change.prepend(e => e.currentTarget.value),
    reset,
    $todos,
    $input,
  }
}

const firstTodoList = createTodoListApi(['hello, world!'])
const secondTodoList = createTodoListApi(['hello, world!'])

function TodoList({label, model}) {
  const input = useStore(model.$input)
  
  const todos = useList(model.$todos, (value, index) => (
    <li>
      {value} <button type="button" onClick={() => model.remove(index)}>Remove</button>
    </li>
  ))

  return (
    <>
      <h1>{label}</h1>
      <ul>
        {todos}
      </ul>
      <form>
        <label>Insert todo: </label>
        <input type="text" value={input} onChange={model.change}/>
        <input type="submit" onClick={model.submit} value="Insert"/>
      </form>
    </>
  )
}

function App() {
  return (
    <>
      <TodoList
        label="First todo list"
        model={firstTodoList}
      />
      <TodoList
        label="Second todo list"
        model={secondTodoList}
      />
    </>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))
```
