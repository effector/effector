---
id: usage-with-typescript
title: Usage with TypeScript
sidebar_label: Usage with TypeScript
---

# Usage with TypeScript

**TypeScript** is a typed superset of JavaScript. It has become popular
recently in applications due to the benefits it can bring. If you are new to
TypeScript it is highly recommended to become familiar with it first before
proceeding. You can check out its documentation 
[here.](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

TypeScript has the potential to bring the following benefits to application:

1. Type safety for state, stores and events
2. Easy refactoring of typed code
3. A superior developer experience in a team environment

## A Practical Example

We will be going through a simplistic chat application to demonstrate a
possible approach to include static typing. This chat application will have
two domains. The _Chat domain_ will focus on working with the chat history and
the _system domain_ will focus on working with session information.

The full source code is available on 
[codesandbox here](https://codesandbox.io/embed/react-ts-effector-example-ho5q6). Note that by going
through this example yourself you will experience some of the benefits of
 using TypeScript.

## Type checking state

Adding types to each slice of state is a good place to start since it does
not rely on other types. In this example we start by describing
the chat store's slice of state:

```typescript
// src/effector/chat/types.ts

export interface Message {
  id: string;
  user: string
  message: string
  timestamp: number
}

export interface ChatState {
  messages: Message[]
}
```

And then do the same for the system store's slice of state:

```typescript
// src/effector/system/types.ts

export interface SystemState {
  loggedIn: boolean
  session: string
  userName: string
}
```

Note that we are exporting these interfaces to reuse them later in stores and
events.

## Organize yous domains

To effectively structure the project code, you can break the application
logic into separate domains that combine all the logic of working with this
part of the application.

```typescript
// src/effector/chat/domain.ts

export const ChatDomain = createDomain(); 
```

```typescript
// src/effector/system/domain.ts

export const SystemDomain = createDomain(); 
```

## Type checking events and effects

All events can be typed through their payload. Effects used  to handle async
reactions and events for sync reactions. 

```typescript
// src/effector/chat/events.ts


export const sendMessage = ChatDomain.effect<Message, Message, Error>();

export const deleteMessage = ChatDomain.effect<Message, Message, Error>();
```

Each effect must be provided with a handler function that will provide final 
processing. You can connect them at any time, so leave it for further action.

```typescript
// src/effector/system/events.ts


export const updateSession = SystemDomain.event<SystemState>();
```

## Type checking for stores

Keep yours stores as simple as possible. Let each store be responsible for its 
part of the state in the general state of the application or domain.

```typescript
// src/effector/chat/store.ts

const initialState: Message[] = [
  {
    id: oid(),
    user: "system",
    message: "this message from initial state",
    timestamp: new Date().getTime()
  }
];

export const MessageList = ChatDomain.store<Message[]>(initialState)
  .on(sendMessage.done, (state, { result }) => [...state, result])
  .on(deleteMessage.done, (state, { result }) =>
    state.filter(message => message.id !== result.id)
  );

```

The closest comparison for an event handler is a reducer that processes exactly 
one event. In this example, there is no need to declare the types with which 
the handler will be called, since the vehicle has enough information to deduce 
all the necessary types, it can also guarantee the correctness of the return 
value from this handler.

```typescript
// src/effector/system/store.ts

const initialState: SystemState = {
  loggedIn: false,
  session: '',
  userName: ''
};

export const SystemStore = SystemDomain.store<SystemState>(initialState)
  .on(updateSession, (state, payload) => ({ ...state, ...payload }));
```

## Usage with `effector-react`

While Effector React is a separate library from effector itself, it is commonly
used with react. For this reason, we will go through how Effector React
works with TypeScript using the same example used previously in this section.

Events and effects you can use directly in yours components and to get access
to store data you can use `useStore` hook from `effector-react` package.

Let start with implement effect backend

```typescript
// src/api/MessageApi.ts

export class MessageApi {
  public static sendMessage = (message: Message) => 
    new Promise<Message>(resolve => setTimeout(
      () => resolve(message), 
      2000
    ));
  
  public static deleteMessage = (message: Message) => 
    new Promise<Message>(resolve => setTimeout(
      () => resolve(message), 
      2000
    ));
} 
```

Then bind created handlers to effects

```typescript
// src/index.tsx

sendMessage.use(MessageApi.sendMessage);
deleteMessage.use(MessageApi.deleteMessage);

```

Then we can implement components which uses data from stores. And start
 operate with our effects.

```typescript jsx
// src/ChatHistory.tsx

export const ChatHistory: React.FC = () => {
  const messages = useStore(MessageList);

  return (
    <div className="chat-history">
      {messages.map(message => (
        <div className="message-item" key={message.timestamp}>
          <h3>From: {message.user}</h3>
          <p>{message.message}</p>
          <button onClick={() => deleteMessage(message)}>delete</button>
        </div>
      ))}
    </div>
  );
};
``` 

Also, close attention should be paid to the moment that the data from the
local state can be transmitted to the final effect. For these purposes, 
the forward method is used. Here is an example of such use in the component.

```typescript jsx

// src/ChatInterface.tsx

const onSend = ChatDomain.event<string>();

forward({
  from: onSend.map<Message>(message => ({
    id: oid(),
    user: SystemStore.getState().userName,
    timestamp: new Date().getTime(),
    message,
  })),
  to: sendMessage
});

const ChatInterface: React.FC = () => {
  const { userName } = useStore(SystemStore);

  const [message, updateMessage] = useState("");

  const keyPress = (e: React.KeyboardEvent<any>) => {
    if (e.key === "Enter") {
      send();
    }
  };

  const send = () => onSend(message);

  return (
    <div className="chat-interface">
      <h3>User: {userName} </h3>
      <input
        value={message}
        onChange={e => updateMessage(e.target.value)}
        onKeyPress={keyPress}
        className="chat-input"
        placeholder="Type a message..."
      />
      <button onClick={send}>Send</button>
    </div>
  );
};

```

