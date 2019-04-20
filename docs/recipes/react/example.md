---
id: example
title: Example
sidebar_label: Example
---

```js
import React from 'react'
import ReactDOM from 'react-dom'
import {createEvent, createStore, createStoreObject} from 'effector'
import {createComponent, useStore} from 'effector-react'

const plus = createEvent()

const int = createStore(1)
  .on(plus, n => n + 1)
const text = int.map(
  n => `current value = ${n}`
)
const data = createStoreObject({int, text})

const IntView = createComponent(data, ({}, {int, text}) => (
  <div>n = {int}</div>
))

const IntHook = () => {
  const {text} = useStore(data)
  return (
    <div>{text}</div>
  )
}

const App = () => (
  <main>
    <button onClick={plus}>click</button>
    <IntView/>
    <IntHook/>
  </main>
)

const div = document.createElement('div')
document.body.appendChild(div)
ReactDOM.render(
  <App/>,
  div
)
```