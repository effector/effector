---
id: todo-creator
title: TODO creator
---

```js try
import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, createEvent, sample} from 'effector'
import {useStore, useList} from 'effector-react'

function createTodoListApi(initial: string[] = []) {
	const insert = createEvent<string>('insert');
  const remove = createEvent<number>('remove');
  const change = createEvent<string>('change');
  const reset = createEvent<void>('reset');
  const todos = createStore<string[]>(initial);
  const input = createStore<string>('');
  todos.on(insert, (state, value) => [...state, value]);
  todos.on(remove, (state, index) => state.filter((_, i) => i !== index));
  input.on(change, (state, value) => value);
  input.on(reset, () => '');
  input.on(insert, () => '');

  const submit = createEvent()
  submit.watch(e => e.preventDefault())

  sample({
    source: input,
    clock: submit,
    target: insert,
  })

  return {
    list: todos,
    submit,
    input,
    remove,
    change: change.prepend(e => e.currentTarget.value),
    reset,
	}
}

const firstTodoList = createTodoListApi(['hello, world!'])
const secondTodoList = createTodoListApi(['hello, world!'])

function TodoList({label, model}) {
	const input = useStore(model.input);
  const todos = useList(model.list, (value, index) => (
    <li>
      {value} <button type="button" onClick={() => model.remove(index)}>Remove</button>
    </li>
  ));
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
  );
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
