---
id: best-practices
title: Best practices
---

Effector provides you pretty powerful tooling to migrate all the remaining logic from views to your models(events, effects, stores and their connections in general)

Here are some advices with code examples:

## Store handlers

To avoid semantic inconsistency  you handle all store updates with original store, not mapped ones since its values will be updated automatically.

```js title="src/models/users/index.js"
import {createStore, createEffect} from 'effector'

export const fetchUsersFx = createEffect()

//imagine initially we have users list as a key-value store
export const $usersMap = createStore({}) 

//we need array representaion for our UI tasks
export const $users = $usersMap.map((usersMap) => Object.values(usersMap))

```



## File Structure

Any business logic could be split by models. You should create a folder for each model by its scope of responsibility in `/models` directory. 

Every model consists of public interface and initialization file. So, public interface is `index.js` and initialization file is `init.js`.
If you feel that your store declarations take up a lot of space then create an extra `state.js` for them. It would be public interface for model stores.

Imagine we have another responsibility scope with bigger public interface, so we added state.js to improve readability 
```
.
├── public/
│   └── index.js
└── src/
    ├── components/
    │   └── App/
    └── models/
        ├── users/
        │   ├── index.js
        │   └── init.js
        ├── auth/
        │   ├── index.js
        │   ├── state.js
        │   └── init.js
        └── init.js
```

Root `init.js` imports **all** init files from models.
```js title="src/models/init.js"
import 'users/init'
import 'auth/init'
```
It should be imported in your app root.
```js title="public/index.js"
import React from 'react'
import ReactDOM from 'react-dom'

//root component
import {App} from '../src/components/App'

import '../src/models/init'

//Here could be any view framework initialization
ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
```

Init file in model exports nothing, it **only** imports events, stores, effects from different models. 
This is a place where you initialize your effects and store handlers, to keep other modules pure. Just after that, you start buildling the dataflow of the model (connecting Units aka `forward`, `sample`, `guard`, `merge`, `split`)
Init files as well could contain imports from another models to deal with cross-model business-logic. 

```js title="src/models/users/init.js"
import {forward} from 'effector'
import {fetchUsersFx, $usersMap} from './'

fetchUsersFx.use(async () => fetch('/users'))

addUserFx.use(async (user) => fetch('/users', {
  method: 'POST', 
  body: JSON.stringify(user)
}))

$usersMap
.on(fetchUsersFx.doneData, (_, users) => users)

forward({
  from: addUserFx.doneData,
  to: fetchUsersFx
})
```
