---
id: counter
title: Counter
sidebar_label: Counter
---

```js
import React from 'react'
import ReactDOM from 'react-dom'
import {createEvent, createStore, combine} from 'effector'
import {useStore} from 'effector-react'

const plus = createEvent()

const $counter = createStore(1).on(plus, n => n + 1)
const $counterText = $counter.map(n => `current value = ${n}`)
const $counterCombined = combine({counter: $counter, text: $counterText})

const App = () => {
  const counter = useStore($counter)
  const counterText = useStore($counterText)
  const counterCombined = useStore($counterCombined)
  
  return (
    <div>
      <button onClick={plus}>Plus</button>
      <div>counter: {counter}</div>
      <div>counterText: ${counterText}</div>
      <div>counterCombined: {counterCombined.counter}, {counterCombined.text}</div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

[Try it](https://share.effector.dev/2n8Bh4CZ)
