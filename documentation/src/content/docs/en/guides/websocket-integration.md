---
title: Setting up WebSocket with Effector
description: A detailed guide on creating a reliable and scalable WebSocket client using Effector.
---

# Working with WebSocket in Effector (#websocket-integration)

In this guide, we'll look at how to properly organize work with WebSocket connection using Effector.

:::info{title="WebSocket and Data Types"}
WebSocket API supports data transmission in the form of strings or binary data (`Blob`/`ArrayBuffer`). In this guide, we'll focus on working with strings, as this is the most common case when exchanging data. When working with binary data is needed, you can adapt the examples to the required format.
:::

## Basic Model (#basic-model)

Let's create a simple but working WebSocket client model. First, let's define the basic events and states:

```ts
import { createStore, createEvent, createEffect, sample } from "effector";

// Events for working with socket
const disconnected = createEvent();
const messageSent = createEvent<string>();
const messageReceived = createEvent<string>();

const $connection = createStore<WebSocket | null>(null)
  .on(connectWebSocketFx.doneData, (_, ws) => ws)
  .reset(disconnected);
```

Let's create an effect for establishing connection:

```ts
const connectWebSocketFx = createEffect((url: string): Promise<WebSocket> => {
  const ws = new WebSocket(url);

  const scopeDisconnected = scopeBind(disconnected);
  const scopeMessageReceived = scopeBind(messageReceived);

  return new Promise((res, rej) => {
    ws.onopen = () => {
      res(ws);
    };

    ws.onmessage = (event) => {
      scopeMessageReceived(event.data);
    };

    ws.onclose = () => {
      scopeDisconnected();
    };

    ws.onerror = (err) => {
      scopeDisconnected();
      rej(err);
    };
  });
});
```

Note that we used the [`scopeBind`](/en/api/effector/scopeBind) function here to bind units with the current execution scope, as we don't know when `scopeMessageReceived` will be called inside `socket.onmessage`. Otherwise, the event will end up in the global scope.
[Read more](/en/advanced/work-with-scope).

:::warning{title="Working in 'scope-less' mode"}
If you're working in scope-less mode for some reason, you don't need to use `scopeBind`.<br/>
Keep in mind that [working with scope is the recommended way](/en/guides/best-practices#use-scope)!
:::

## Message Handling (#message-handling)

Let's create a store for the last received message:

```ts
const $lastMessage = createStore("");

$lastMessage.on(messageReceived, (_, newMessage) => newMessage);
```

And also implement an effect for sending messages:

```ts
const sendMessageFx = createEffect((params: { socket: WebSocket; message: string }) => {
  params.socket.send(params.message);
});

// Link message sending with current socket
sample({
  clock: messageSent,
  source: $connection,
  filter: Boolean, // Send only if connection exists
  fn: (socket, message) => ({
    socket,
    message,
  }),
  target: sendMessageFx,
});
```

:::tip{title="Connection States"}
WebSocket has several connection states (`CONNECTING`, `OPEN`, `CLOSING`, `CLOSED`). In the basic model, we simplify this to a simple Boolean check, but in a real application, more detailed state tracking might be needed.
:::

## Error Handling (#error-handling)

When working with WebSocket, it's important to properly handle different types of errors to ensure application reliability.

Let's extend our basic model by adding error handling:

```ts
const TIMEOUT = 5_000;

// Add events for errors
const socketError = createEvent<Error>();

const connectWebSocketFx = createEffect((url: string): Promise<WebSocket> => {
  const ws = new WebSocket(url);

  const scopeDisconnected = scopeBind(disconnected);
  const scopeMessageReceived = scopeBind(messageReceived);
  const scopeSocketError = scopeBind(socketError);

  return new Promise((res, rej) => {
    const timeout = setTimeout(() => {
      const error = new Error("Connection timeout");

      socketError(error);
      reject(error);
      socket.close();
    }, TIMEOUT);

    ws.onopen = () => {
      clearTimeout(timeout);
      res(ws);
    };

    ws.onmessage = (event) => {
      scopeMessageReceived(event.data);
    };

    ws.onclose = () => {
      disconnected();
    };

    ws.onerror = (err) => {
      const error = new Error("WebSocket error");
      scopeDisconnected();
      scopeSocketError(error);
      rej(err);
    };
  });
});

// Store for error storage
const $error = createStore("")
  .on(socketError, (_, error) => error.message)
  .reset(connectWebSocketFx.done);
```

:::warning{title="Error Handling"}
Always handle WebSocket connection errors, as they can occur for many reasons: network issues, timeouts, invalid data, etc.
:::

## Working with `Socket.IO` (#socket-io)

[Socket.IO](https://socket.io/) provides a higher-level API for working with WebSocket, adding many useful features "out of the box".

:::info{title="Socket.IO Advantages"}

- Automatic reconnection
- Support for rooms and namespaces
- Fallback to HTTP Long-polling if WebSocket is unavailable
- Built-in support for events and acknowledgments
- Automatic data serialization/deserialization

:::

```ts
import { io, Socket } from "socket.io-client";
import { createStore, createEvent, createEffect, sample } from "effector";

const API_URL = "wss://your.ws.server";

// Events
const connected = createEvent();
const disconnected = createEvent();
const socketError = createEvent<Error>();

// Types for events
type ChatMessage = {
  room: string;
  message: string;
  author: string;
};

const messageSent = createEvent<ChatMessage>();
const messageReceived = createEvent<ChatMessage>();
const socketConnected = createEvent();
const connectSocket = createEvent();

const connectFx = createEffect((): Promise<Socket> => {
  const socket = io(API_URL, {
    //... your configuration
  });

  // needed for correct work with scopes
  const scopeConnected = scopeBind(connected);
  const scopeDisconnected = scopeBind(disconnected);
  const scopeSocketError = scopeBind(socketError);
  const scopeMessageReceived = scopeBind(messageReceived);

  return new Promise((resolve, reject) => {
    socket.on("connect", () => {
      scopeConnected();
      resolve(socket);
    });

    socket.on("disconnect", () => scopeDisconnected());
    socket.on("connect_error", (error) => scopeSocketError(error));
    socket.on("chat message", (msg: ChatMessage) => scopeMessageReceived(msg));
  });
});

const sendMessageFx = createEffect(
  ({
    socket,
    name,
    payload,
  }: SocketResponse<any> & {
    socket: Socket;
  }) => {
    socket.emit(name, payload);
  },
);

// States
const $socket = createStore<Socket | null>(null)
  .on(connectFx.doneData, (_, socket) => socket)
  .reset(disconnected);

// initialize connection
sample({
  clock: connectSocket,
  target: connectFx,
});

// trigger event after successful connection
sample({
  clock: connectSocketFx.doneData,
  target: socketConnected,
});
```

## Receive typed socket messages

You can use any runtime validation library, to create strong contracts of your data. In this example we will use Zod.

First create a schema describes all your incoming messages. We assume, that every message is an object contains unique field `type` alongside other fields, so we will use zod's `discriminatedUnion`:

```ts
export const messagesSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('balanceChanged'),
    balance: z.number(),
  }),
  z.object({
    type: z.literal('reportGenerated'),
    reportId: z.string(),
    reportName: z.string(),
  }),
  /// ... any other types
])
```

Next we create some utility types for using in effector units:

```ts
type MessagesSchema = z.infer<typeof messagesSchema>
type MessageType<T extends MessagesSchema['type']> = Extract<MessagesSchema, { type: T }>
```

Now we are ready to parse messages using our schema. Steps are - receive unknown message, parse it in effect and produce typed message for public use:

```ts
const rawMessageReceived = createEvent<unknown>()
const anyMessageReceived = createEvent<MessagesSchema>

const setupFx = createEffect((url: string): Promise<WebSocket> => {
  const socket = new WebSocket(url)

  const scopeRawMessageReceived = scopeBind(rawMessageReceived)

  return new Promise((res, rej) => {
    ws.onopen = () => {
      res(ws)
    }

    ws.onmessage = (event) => {
      scopeRawMessageReceived(event.data)
    }
  })
})

const parseFx = createEffect((message: unknown): MessagesSchema => {
  return messagesSchema.parse(message)
})

sample({
  clock: rawMessageReceived,
  // parse unknown message
  target: parseFx
})

sample({
  clock: parseFx.doneData,
  // we are ready to consume typed messages
  target: anyMessageReceived
})

sample({
  clock: parseFx.failData,
  // do not forget to catch parse error
})
```

But finally, we do not want to check message type every time anyMessageReceived called, so let's create custom operator, which will filter only required type:

```ts
export const messageReceived = <T extends MessageType>(type: T) => {
  return sample({
    clock: anyMessageReceived,
    filter: (message): message is MessageType<T> => {
      return message.type === type
    },
  })
}
```

And use it like

```ts
sample({
  clock: messageReceived('balanceChanged'), // autocomplete message types
  fn: (message) => {
    // message is inferred as { type: 'balanceChanged', balance: number }
  },
  target: doWhateverYouWant
})
```
