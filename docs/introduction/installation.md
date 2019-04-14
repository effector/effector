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

### Async requests

```js
import React from 'react'
import ReactDOM from 'react-dom'

import {createEffect, createStore} from 'effector'
import {createComponent} from 'effector-react'

const asyncAction = createEffect('your async action')

asyncAction.use(url => fetch(url).then(req => req.json()))

const currentUser = createStore(null)
	.on(asyncAction.done, (state, {result}) => result.username)

const CurrentUser = createComponent(
  currentUser, (props, user) => user
  	? <div>current user: {user}</div>
  	: <div>no current user</div>
  )

const url = 'https://gist.githubusercontent.com/zerobias/24bc72aa8394157549e0b566ac5059a4/raw/b55eb74b06afd709e2d1d19f9703272b4d753386/data.json' 


const node = document.createElement('div')
document.body.appendChild(node)
ReactDOM.render(<>
    <button onClick={() => asyncAction(url)}>load user</button>
  <CurrentUser/>  
</>, node)

```

[try it](https://effector.now.sh/try?version=develop&code=JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wChRJZFiYARAeQFk5tcCj0YBaAE1zPLho8AN5oOMJAFFMmJBgA0ccakkBlGNCQBfFjjz4ks+ZqhkKwuGIlIAwrkgA7JI5i7WBo3IzQuHEqSkaBCOAM7wKKEAno5oAIIYwCFwALzKNjLeMAAU+FEQAK5QcJExaCWJIfgAlIGlsQkwSY4AdAWhSNlFADapAHwsSDBoABZdUN3VLTAjLtlEAI79cIstAFahIdnVO4HBYfBoRUSuAKodxWkqKOqmnY4F3ZOkAJAtW-Xxla18zkrZ4RuSCUIiIoUebmqyzBELaF0cKBASFqQRC4TgtmOLhg5yQl3SqjsDhC2OypDgyixZwu-zAODAoSU7TxUJSA2ZUHJcBeAH44AAeHjAABufSOUBO8A5AC4rBztPyAPRC0Vcl6ywUivqOCCUiXYuAcpUqvpclH7dE9VIEEYwGAM6WKxUAc2A4RarpmBQARhz9pJXC1giBFQAvPEQb3ASKKgBMABZvWgAOyxlAoAAcAGYAJzxgCMAFZk4X4zmkAAGb2FgBsNfQhYrhZzKHjiqgKAA7orq4WkN7k4mK-XMDxkxXy7GePnpznMDnx1nY6nvfGx4Ws1mMzXlTcUOtNo58HBAqiDnAdTwkNa+EckYHrpIpN0kPecvgVTVSLeCm+Wt6IB4KIWhQMAwBcHhbBGYBuh4bJL2RUhkE4BhGBaE4rygbJ+VNCkKX5X07WSEJbG6YA0AAaxSERtmWT5GmacZJm0PpuggFAeENC4lUIzRHFwgVMX1ak8UVAYTyVPolAQ2ogA)
