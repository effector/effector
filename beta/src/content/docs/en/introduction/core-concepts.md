---
title: Core Concepts
redirectFrom:
  - /docs/introduction/core-concepts
---

## Event

[_Event_] is an intention to do something: start a computation, send a message to another application section or update states.

```js
const event = createEvent();
const onMessage = createEvent();

const socket = new WebSocket("wss://echo.websocket.org");
socket.onmessage = (msg) => onMessage(msg);

const data = onMessage.map((msg) => msg.data).map(JSON.parse);

// Handle side effects
data.watch(console.log);
```

## Store

[_Store_] is an object that holds state value. There can be multiple stores.

```js
const $users = createStore([]) // <-- Default state
  // add reducer for getUser.doneData event (fires when promise resolved)
  .on(getUserFx.doneData, (state, user) => [...state, user]);

const $messages = createStore([])
  // from WebSocket
  .on(data, (state, message) => [...state, message]);

$users.watch(console.log); // [{id: 1, ...}, {id: 2, ...}]
$messages.watch(console.log);
```

## Effect

[_Effect_] is a container for side effects, possibly async with linked events and stores to subscribe.

```js
const getUserFx = createEffect(async (params) => {
  const req = await fetch(`https://example.com/get-user/${params.id}`);

  return req.json();
});

// subscribe to effect call
getUserFx.watch((params) => {
  console.log(params); // {id: 1}
});

// subscribe to promise resolve
getUserFx.done.watch(({ result, params }) => {
  console.log(params); // {id: 1}
  console.log(result); // resolved value
});

// subscribe to promise reject (or throw)
getUserFx.fail.watch(({ error, params }) => {
  console.error(params); // {id: 1}
  console.error(error); // rejected value
});

// you can replace function anytime
getUserFx.use(() => "test result");

// call effect with your params
getUserFx({ id: 1 });

const data = await getUserFx({ id: 2 }); // handle promise
```

[_store_]: /en/api/effector/Store
[_effect_]: /en/api/effector/Effect
[_event_]: /en/api/effector/Event
