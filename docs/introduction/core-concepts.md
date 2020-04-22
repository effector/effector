---
id: core-concepts
title: Core Concepts
---

## Event

[_Event_] is an intention to change state.

```js try
const event = createEvent() // unnamed event
const onMessage = createEvent('message') // named event

const socket = new WebSocket('wss://echo.websocket.org')
socket.onmessage = msg => onMessage(msg)

const data = onMessage.map(msg => msg.data).map(JSON.parse)

// Handle side effects
data.watch(console.log)
```

## Effect

[_Effect_] is a container for async function.

It can be safely used in place of the original async function.

The only requirement for the function:

- **Must** have zero or one argument

```js try
const getUserFx = createEffect('get user').use(params => {
  return fetch(`https://example.com/get-user/${params.id}`).then(res =>
    res.json(),
  )
})

// subscribe to effect call
getUserFx.watch(params => {
  console.log(params) // {id: 1}
})

// subscribe to promise resolve
getUserFx.done.watch(({result, params}) => {
  console.log(params) // {id: 1}
  console.log(result) // resolved value
})

// subscribe to promise reject (or throw)
getUserFx.fail.watch(({error, params}) => {
  console.error(params) // {id: 1}
  console.error(error) // rejected value
})

// you can replace function anytime
getUserFx.use(() => promiseMock)

// call effect with your params
getUserFx({id: 1})

const data = await getUserFx({id: 2}) // handle promise
```

## Store

[_Store_] is an object that holds the state tree. There can be multiple stores.

```js try
const users = createStore([]) // <-- Default state
  // add reducer for getUser.doneData event (fires when promise resolved)
  .on(getUserFx.doneData, (state, user) => [...state, user])

const messages = createStore([])
  // from WebSocket
  .on(data, (state, message) => [...state, message])

users.watch(console.log) // [{id: 1, ...}, {id: 2, ...}]
messages.watch(console.log)
```

[_store_]: ../api/effector/Store.md
[_effect_]: ../api/effector/Effect.md
[_event_]: ../api/effector/Event.md
