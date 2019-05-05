---
id: createEffect
title: createEffect
hide_title: true
---

# `createEffect(name?)`

Creates an [effect](Effect.md)

#### Arguments

1. `name`? _(string)_: [Effect](Effect.md) name
2. `params`? (_Params_): Setup effect
    - `handler` (_Function_): thunk to handle effect calls, also can be set with [`use(thunk)`](#use)

#### Returns

([_`Effect`_](Effect.md)): A container for async function.

#### Example

```js
const getUser = createEffect('get user')

getUser.use(params => {
  return fetch(`https://example.com/get-user/${params.id}`)
    .then(res => res.json())
})

const users = createStore([]) // <-- Default state
  // add reducer for getUser.done event (fires when promise resolved)
  .on(getUser.done, (state, {result: user, params}) => [...state, user])

// subscribe to promise resolve
getUser.done.watch(({result, params}) => {
  console.log(params) // {id: 1}
  console.log(result) // resolved value
})

// subscribe to promise reject (or throw)
getUser.fail.watch(({error, params}) => {
  console.error(params) // {id: 1}
  console.error(error) // rejected value
})

// you can replace function anytime
getUser.use(() => promiseMock)

// call effect with your params
getUser({id: 1})

const data = await getUser({id: 2}) // handle promise
```
