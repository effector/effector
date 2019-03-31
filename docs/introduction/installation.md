---
id: installation
title: Installation
---

**Prerequisite**: either NPM (comes with [node](https://nodejs.org/en/)) or [Yarn](https://yarnpkg.com/en/).

To install the stable version:

```sh
npm install --save effector
```

```sh
yarn add effector
```

## Complementary packages

If you use React:

```sh
npm install --save effector-react
```

```sh
yarn add effector-react
```

or if you use Vue:

```sh
npm install --save effector-vue
```

```sh
yarn add effector-vue
```

## Usage

### React


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

[try it](https://effector.now.sh/try?version=develop&code=MYewdgzgLgBADgGwK4RgXhsATgUwIZQ4CiAbjmFABQCUAULaJLAJYXqa4E4DKUIulAIx0YMAHThKiFABoYYdAD55MANQxhDcNBiEAHrAysoYgLZ44lWqIVplAA2BIsuNiTzIc7ACQBvMAC+9rR0jDoAJgR47Nj4hLz8OADyAEYAVjjAVL7GcvpQAXRaTDAAkhQAasw4AO4xnIQAwiCmcODkVJFQeHKUvgFyORR5OAaFSjBWogA84cwkirYwQwXTAPRzCyFFYbDlUAASICAA1uw0E77WmNqwvvkB7Cg8fAJdeCIwuFDOClOiMFm80U91Gqw2wOudAC9F2MAAgnA4OdrtNzKxFNcZikkFA+ApwI0EMxgCc0L5pBAAopgMTSescXjwJiAYD9lVamsWQDpvsjqcuai1uiwJidrcYJt2OEQE5TB0xLEuEQEDh5RRKAByTaaugyuUKlIgcIATzEFjg5HCjQAFswEOFKJs6AAlfBZAAiSQAsmJXOEcFh-oi4DJrpsQrQgA)
