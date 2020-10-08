---
id: core-concepts
title: Core Concepts
---

How to build applications? What are they all about?

Application itself as a definition not that meaningful word nowadays. 
React.js released at 2013. Seven years from now. 
Back then we had "applications" have it now and still struggling.
The approach is outdated, it's time for developers not only being the king of applications but look inside what is going on
And finally find out that application is actually the system.
System of events which just reacts on events occurrance.

What do we need to build a system? Let's start from naive approach:

- Store object to save values around
- Events that take data and send it further
- And some other kind of events which occurrance dependant from external circumstances (e.g. a successful or unsuccessful request to the server)

But this is still not clear. Getting closer to the point we are inside the system. 
This position is depend on obsersver's point. It's the key to the understanding.

## Event
 
System is like an organism. How does it work? 
`Events` trigger with arbitrary values and our system reacts to them. 
Not actions but events since from an application point of view it receives it from the outside world. 
Internal meaning of events could be different: intention to change the state or message from one responsibility scope of an application to another.

## Store

For sure we need to store values somehow. 
Curious approach that stores are actually memoized events which are able to skip duplicate values. 
Second point is that stores should be as light as possible with possibility to combine them as we need.
Last but not the least, Updates are sent only when need. No selectors around. By design.

## Effect

Last in a trinity but the most important one. 
As mentioned above understanding of observer's point is a key. Effect means any side-effects for the level of business logic(our system).
Rephrasing that in a more technical way of things Effect is anything that could lead to exceptions.

Could network requests lead to exception? For sure.
Could timers lead to exception? Yes.
Could third-party API's(eg. maps) lead to exception? Of course.
Could even for-loops with custom throw inside lead to exception? Yeah!

These situations require a container which could produce `.done` event in case if side-effect managed to avoid exceptions and `.fail` event if not.
For common cases Effect produces `.finally` event to cover behavior completely. 
As side-effects could not be resolved just in time sometimes Effect provides `.pending` boolean store field for managing loading indicators and etc.



Any of these elements is a `regular unit` which are effector fundamentals.

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
