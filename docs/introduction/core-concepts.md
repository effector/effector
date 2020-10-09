---
id: core-concepts
title: Core Concepts
---

How to build applications? What are they all about?

Looking inside it is possible to make an observation that applications are actually systems.
System which just reacts on events occurrance.

What do we need to build a system?

- Store object to save values around
- Events that take data and send it further
- And some other kind of events which occurrance dependant from external circumstances (e.g. a successful or unsuccessful request to the server)

## Event
 
`Event` is a function with arbitrary values which represents intention to change the state or messaging between system parts.

## Store

`Store` is a memoized event which is able to skip duplicate values. 

## Effect

Effect is a container for any kind of side effects(network requests, third-party APIs etc.), possibly async with linked events and stores to subscribe



Any of these elements is a `regular unit` which effector are based on.

<!-- ## Event

[_Event_] is an intention to change state.

```js
const event = createEvent()
const onMessage = createEvent()

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

```js
const getUserFx = createEffect(async params => {
  const req = await fetch(`https://example.com/get-user/${params.id}`)
  return req.json()
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
getUserFx.use(() => 'test result')

// call effect with your params
getUserFx({id: 1})

const data = await getUserFx({id: 2}) // handle promise
```

## Store

[_Store_] is an object that holds the state tree. There can be multiple stores.

```js
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
[_event_]: ../api/effector/Event.md -->
