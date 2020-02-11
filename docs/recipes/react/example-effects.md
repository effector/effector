---
id: example-effects
title: Effects
---

```js try
import React from 'react'
import ReactDOM from 'react-dom'

import {createEffect, createStore} from 'effector'
import {createComponent} from 'effector-react'

const asyncActionFx = createEffect('your async action')

asyncActionFx.use(url => fetch(url).then(req => req.json()))

const currentUser = createStore(null).on(
  asyncActionFx.done,
  (state, {result}) => result.username,
)

const CurrentUser = createComponent(currentUser, (props, user) =>
  user ? <div>current user: {user}</div> : <div>no current user</div>,
)

const url =
  'https://gist.githubusercontent.com/' +
  'zerobias/24bc72aa8394157549e0b566ac5059a4/raw/' +
  'b55eb74b06afd709e2d1d19f9703272b4d753386/data.json'

ReactDOM.render(
  <>
    <button onClick={() => asyncActionFx(url)}>load user</button>
    <CurrentUser />
  </>,
  document.getElementById('root'),
)
```
