---
id: usage-with-effector-react
title: Usage with effector-react
redirectFrom:
  - /docs/typescript/usage-with-effector-react
  - /typescript/usage-with-effector-react
---

**TypeScript** is a typed superset of JavaScript. It became popular
recently in applications due to the benefits it can bring. If you are new to
TypeScript, it is highly recommended to become familiar with it first, before
proceeding. You can check out its documentation
[here](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html).

TypeScript has a potential to bring the following benefits to application:

1. Type safety for state, stores and events
2. Easy refactoring of typed code
3. A superior developer experience in a team environment

**A Practical Example**

We will be going through a simplistic chat application to demonstrate a
possible approach to include static typing. This chat application will have API mock that load and saves data from localStorage.

The full source code is available on
[github](https://github.com/effector/effector/tree/master/examples/react-and-ts).
Note that, by going through this example yourself, you will experience some benefits of using TypeScript.

## Let's create API mock

There is a directory structure inherited from the [feature-sliced](https://feature-sliced.design) methodology.

Let's define a simple type, that our improvised API will return.

```ts
// File: /src/shared/api/message.ts
interface Author {
  id: string;
  name: string;
}

export interface Message {
  id: string;
  author: Author;
  text: string;
  timestamp: number;
}
```

Our API will load and save data to `localStorage`, and we need some functions to load data:

```ts
// File: /src/shared/api/message.ts
const LocalStorageKey = "effector-example-history";

function loadHistory(): Message[] | void {
  const source = localStorage.getItem(LocalStorageKey);
  if (source) {
    return JSON.parse(source);
  }
  return undefined;
}
function saveHistory(messages: Message[]) {
  localStorage.setItem(LocalStorageKey, JSON.stringify(messages));
}
```

I also created some libraries to generate identifiers and wait to simulate network requests.

```ts
// File: /src/shared/lib/oid.ts
export const createOid = () =>
  ((new Date().getTime() / 1000) | 0).toString(16) +
  "xxxxxxxxxxxxxxxx".replace(/[x]/g, () => ((Math.random() * 16) | 0).toString(16)).toLowerCase();
```

```ts
// File: /src/shared/lib/wait.ts
export function wait(timeout = Math.random() * 1500) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}
```

OK. Now we can create effects that will load messages.

```ts
// File: /src/shared/api/message.ts
// Here effect defined with static types. void defines no arguments.
// Second type argument defines a successful result type.
// Third argument is optional and defines a failure result type.
export const messagesLoadFx = createEffect<void, Message[], Error>(async () => {
  const history = loadHistory();
  await wait();
  return history ?? [];
});

interface SendMessage {
  text: string;
  author: Author;
}

// But we can use type inferring and set arguments types in the handler defintion.
// Hover your cursor on `messagesLoadFx` to see the inferred types:
// `Effect<{ text: string; authorId: string; authorName: string }, void, Error>`
export const messageSendFx = createEffect(async ({ text, author }: SendMessage) => {
  const message: Message = {
    id: createOid(),
    author,
    timestamp: Date.now(),
    text,
  };
  const history = await messagesLoadFx();
  saveHistory([...history, message]);
  await wait();
});

// Please, note that we will `wait()` for `messagesLoadFx` and `wait()` in the current effect
// Also, note that `saveHistory` and `loadHistory` can throw exceptions,
// in that case effect will trigger `messageDeleteFx.fail` event.
export const messageDeleteFx = createEffect(async (message: Message) => {
  const history = await messagesLoadFx();
  const updated = history.filter((found) => found.id !== message.id);
  await wait();
  saveHistory(updated);
});
```

OK, now we are done with the messages, let's create effects to manage user session.

Really, I prefer to start design code from implementing interfaces:

```ts
// File: /src/shared/api/session.ts
// It is called session because it describes current user session, not the User at all.
export interface Session {
  id: string;
  name: string;
}
```

Also, to generate usernames and don't require to type it by themselves, import `unique-names-generator`:

```ts
// File: /src/shared/api/session.ts
import { uniqueNamesGenerator, Config, starWars } from "unique-names-generator";

const nameGenerator: Config = { dictionaries: [starWars] };
const createName = () => uniqueNamesGenerator(nameGenerator);
```

Let's create effects to manage session:

```ts
// File: /src/shared/api/session.ts
const LocalStorageKey = "effector-example-session";

// Note, that we need explicit types definition in that case, because `JSON.parse()` returns `any`
export const sessionLoadFx = createEffect<void, Session | null>(async () => {
  const source = localStorage.getItem(LocalStorageKey);
  await wait();
  if (!source) {
    return null;
  }
  return JSON.parse(source);
});

// By default, if there are no arguments, no explicit type arguments, and no return statement provided
// effect will have type: `Effect<void, void, Error>`
export const sessionDeleteFx = createEffect(async () => {
  localStorage.removeItem(LocalStorageKey);
  await wait();
});

// Look at the type of the `sessionCreateFx` constant.
// It will be `Effect<void, Session, Error>` because TypeScript can infer type from `session` constant
export const sessionCreateFx = createEffect(async () => {
  // I explicitly set type for the next constant, because it allows TypeScript help me
  // If I forgot to set property, I'll see error in the place of definition
  // Also it allows IDE to autocomplete property names
  const session: Session = {
    id: createOid(),
    name: createName(),
  };
  localStorage.setItem(LocalStorageKey, JSON.stringify(session));
  return session;
});
```

How we need to import these effects?

I surely recommend writing short imports and using reexports.
It allows to securely refactor code structure inside `shared/api` and the same slices,
and don't worry about refactoring other imports and unnecessary changes in the git history.

```ts
// File: /src/shared/api/index.ts
export * as messageApi from "./message";
export * as sessionApi from "./session";

// Types reexports made just for convenience
export type { Message } from "./message";
export type { Session } from "./session";
```

## Create a page with the logic

Typical structure of the pages:

```
src/
  pages/
    <page-name>/
      page.tsx — just the View layer
      model.ts — a business-logic code
      index.ts — reexports, sometimes there will be a connection-glue code
```

I recommend writing code in the view layer from the top to bottom, more common code at the top.
Let's model our view layer. We will have two main sections at the page: messages history and a message form.

```tsx
// File: /src/pages/chat/page.tsx
export function ChatPage() {
  return (
    <div className="parent">
      <ChatHistory />
      <MessageForm />
    </div>
  );
}

function ChatHistory() {
  return (
    <div className="chat-history">
      <div>There will be messages list</div>
    </div>
  );
}

function MessageForm() {
  return (
    <div className="message-form">
      <div>There will be message form</div>
    </div>
  );
}
```

OK. Now we know what kind of structure we have, and we can start to model business-logic processes.
The view layer should do two tasks: render data from stores and report events to the model.
The view layer doesn't know how data are loaded, how it should be converted and sent back.

```ts
// File: /src/pages/chat/model.ts
import { createEvent, createStore } from "effector";

// And the events report just what happened
export const messageDeleteClicked = createEvent<Message>();
export const messageSendClicked = createEvent();
export const messageEnterPressed = createEvent();
export const messageTextChanged = createEvent<string>();
export const loginClicked = createEvent();
export const logoutClicked = createEvent();

// At the moment, there is just raw data without any knowledge how to load
export const $loggedIn = createStore<boolean>(false);
export const $userName = createStore("");
export const $messages = createStore<Message[]>([]);
export const $messageText = createStore("");

// Page should NOT know where the data came from.
// That's why we just reexport them.
// We can rewrite this code to `combine` or independent store,
// page should NOT be changed, just because we changed the implementation
export const $messageDeleting = messageApi.messageDeleteFx.pending;
export const $messageSending = messageApi.messageSendFx.pending;
```

Now we can implement components.

```tsx
// File: /src/pages/chat/page.tsx
import { useList, useUnit } from "effector-react";
import * as model from "./model";

// export function ChatPage { ... }

function ChatHistory() {
  const [messageDeleting, onMessageDelete] = useUnit([model.$messageDeleting, model.messageDeleteClicked]);

  // Hook `useList` allows React not rerender messages really doesn't changed
  const messages = useList(model.$messages, (message) => (
    <div className="message-item" key={message.timestamp}>
      <h3>From: {message.author.name}</h3>
      <p>{message.text}</p>
      <button onClick={() => onMessageDelete(message)} disabled={messageDeleting}>
        {messageDeleting ? "Deleting" : "Delete"}
      </button>
    </div>
  ));
  // We don't need `useCallback` here because we pass function to an HTML-element, not a custom component

  return <div className="chat-history">{messages}</div>;
}
```

I split `MessageForm` to the different components, to simplify code:

```tsx
// File: /src/pages/chat/page.tsx
function MessageForm() {
  const isLogged = useUnit(model.$loggedIn);
  return isLogged ? <SendMessage /> : <LoginForm />;
}

function SendMessage() {
  const [userName, messageText, messageSending] = useUnit([model.$userName, model.$messageText, model.$messageSending]);

  const [handleLogout, handleTextChange, handleEnterPress, handleSendClick] = useUnit([
    model.logoutClicked,
    model.messageTextChanged,
    model.messageEnterPressed,
    model.messageSendClicked,
  ]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleEnterPress();
    }
  };

  return (
    <div className="message-form">
      <h3>{userName}</h3>
      <input
        value={messageText}
        onChange={(event) => handleTextChange(event.target.value)}
        onKeyPress={handleKeyPress}
        className="chat-input"
        placeholder="Type a message..."
      />
      <button onClick={() => handleSendClick()} disabled={messageSending}>
        {messageSending ? "Sending..." : "Send"}
      </button>
      <button onClick={() => handleLogout()}>Log out</button>
    </div>
  );
}

function LoginForm() {
  const handleLogin = useUnit(model.loginClicked);

  return (
    <div className="message-form">
      <div>Please, log in to be able to send messages</div>
      <button onClick={() => handleLogin()}>Login as a random user</button>
    </div>
  );
}
```

## Manage user session like a Pro

Let's create a session entity. An entity is a business unit.

```ts
// File: /src/entities/session/index.ts
import { Session } from "shared/api";
import { createStore } from "effector";

// Entity just stores session and some internal knowledge about it
export const $session = createStore<Session | null>(null);
// When store `$session` is updated, store `$isLogged` will be updated too
// They are in sync. Derived store are depends on data from original.
export const $isLogged = $session.map((session) => session !== null);
```

Now we can implement login or logout features on the page. Why not here?
If we place login logic here, we will have a very implicit scenario,
when you call `sessionCreateFx` you won't see code called after effect.
But consequences will be visible in the DevTools and application behaviour.

Try to write the code in as obvious a way as possible in one file,
so that you and any teammate can trace the sequence of execution.

## Implement logic

OK. Now we can load a user session and the messages lists on the page mount.
But, we don't have any event when we can start. Let's fix it.

You can use [Gate](/en/recipes/react/gate), but I prefer to use explicit events.

```ts
// File: /src/pages/chat/model.ts
// Just add a new event
export const pageMounted = createEvent();
```

Just add `useEffect` and call bound event inside.

```tsx
// File: /src/pages/chat/page.tsx
export function ChatPage() {
  const handlePageMount = useUnit(model.pageMounted);

  React.useEffect(() => {
    handlePageMount();
  }, [handlePageMount]);

  return (
    <div className="parent">
      <ChatHistory />
      <MessageForm />
    </div>
  );
}
```

> Note: if you don't plan to write tests for effector code and/or implement SSR you can omit any usage of `useEvent`.

At the moment we can load a session and the messages list.

Just add reaction to the event, and any other code should be written in chronological order after each event:

```ts
// File: /src/pages/chat/model.ts
// Don't forget to import { sample } from "effector"
import { Message, messageApi, sessionApi } from "shared/api";
import { $session } from "entities/session";

// export stores
// export events

// Here the logic place

// You can read this code like:
// When page mounted, call messages load and session load simultaneously
sample({
  clock: pageMounted,
  target: [messageApi.messagesLoadFx, sessionApi.sessionLoadFx],
});
```

After that we need to define reactions on `messagesLoadFx.done` and `messagesLoadFx.fail`, and the same for `sessionLoadFx`.

```ts
// File: /src/pages/chat/model.ts
// `.doneData` is a shortcut for `.done`, because `.done` returns `{ params, result }`
// Do not name your arguments like `state` or `payload`
// Use explicit names of the content they contain
$messages.on(messageApi.messagesLoadFx.doneData, (_, messages) => messages);

$session.on(sessionApi.sessionLoadFx.doneData, (_, session) => session);
```

OK. Session and messages loaded. Let's allow the users to log in.

```ts
// File: /src/pages/chat/model.ts
// When login clicked we need to create a new session
sample({
  clock: loginClicked,
  target: sessionApi.sessionCreateFx,
});
// When session created, just write it to a session store
sample({
  clock: sessionApi.sessionCreateFx.doneData,
  target: $session,
});
// If session create is failed, just reset the session
sample({
  clock: sessionApi.sessionCreateFx.fail,
  fn: () => null,
  target: $session,
});
```

Now we'll implement a logout process:

```ts
// File: /src/pages/chat/model.ts
// When logout clicked we need to reset session and clear our storage
sample({
  clock: logoutClicked,
  target: sessionApi.sessionDeleteFx,
});
// In any case, failed or not, we need to reset session store
sample({
  clock: sessionApi.sessionDeleteFx.finally,
  fn: () => null,
  target: $session,
});
```

> Note: most of the comments wrote just for educational purpose. In real life, application code will be self-describable

But if we start the dev server and try to log in, we see nothing changed.
This is because we created `$loggedIn` store in the model, but don't change it. Let's fix:

```ts
// File: /src/pages/chat/model.ts
import { $isLogged, $session } from "entities/session";

// At the moment, there is just raw data without any knowledge how to load
export const $loggedIn = $isLogged;
export const $userName = $session.map((session) => session?.name ?? "");
```

Here we just reexported our custom store from the session entity, but our View layer doesn't change.
The same situation with `$userName` store. Just reload the page, and you'll see, that session loaded correctly.

## Send message

Now we can log in and log out. I think you want to send a message. This is pretty simple:

```ts
// File: /src/pages/chat/model.ts
$messageText.on(messageTextChanged, (_, text) => text);

// We have two different events to send message
// Let event `messageSend` react on any of them
const messageSend = merge([messageEnterPressed, messageSendClicked]);

// We need to take a message text and author info then send it to the effect
sample({
  clock: messageSend,
  source: { author: $session, text: $messageText },
  target: messageApi.messageSendFx,
});
```

But if in the `tsconfig.json` you set `"strictNullChecks": true`, you will see the error there.
It is because store `$session` contains `Session | null` and `messageSendFx` wants `Author` in the arguments.
`Author` and `Session` are compatible, but not the `null`.

To fix this strange behaviour, we need to use `filter` there:

```ts
// File: /src/pages/chat/model.ts
sample({
  clock: messageSend,
  source: { author: $session, text: $messageText },
  filter: (form): form is { author: Session; text: string } => {
    return form.author !== null;
  },
  target: messageApi.messageSendFx,
});
```

I want to focus your attention on the return type `form is {author: Session; text: string}`.
This feature called [type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards)
and allows TypeScript to reduce `Session | null` type to more specific `Session` via condition inside the function.

Now we can read this like: when a message should be sent, take session and message text, check that session exists, and send it.

OK. Now we can write a new message to a server.
But if we don't call `messagesLoadFx` again we didn't see any changes,
because `$messages` store didn't update. We can write generic code for this case.
The easiest way is to return the sent message from the effect.

```ts
// File: /src/shared/api/message.ts
export const messageSendFx = createEffect(async ({ text, author }: SendMessage) => {
  const message: Message = {
    id: createOid(),
    author,
    timestamp: Date.now(),
    text,
  };
  const history = await messagesLoadFx();
  await wait();
  saveHistory([...history, message]);
  return message;
});
```

Now we can just append a message to the end of the list:

```ts
// File: /src/pages/chat/model.ts
$messages.on(messageApi.messageSendFx.doneData, (messages, newMessage) => [
  ...messages,
  newMessage,
]);
```

But at the moment, sent a message still left in the input.

```ts
// File: /src/pages/chat/model.ts
$messageText.on(messageSendFx, () => "");

// If message sending is failed, just restore the message
sample({
  clock: messageSendFx.fail,
  fn: ({ params }) => params.text,
  target: $messageText,
});
```

## Deleting the message

It is pretty simple.

```ts
// File: /src/pages/chat/model.ts
sample({
  clock: messageDeleteClicked,
  target: messageApi.messageDeleteFx,
});

$messages.on(messageApi.messageDeleteFx.done, (messages, { params: toDelete }) =>
  messages.filter((message) => message.id !== toDelete.id),
);
```

But you can see the bug, when "Deleting" state doesn't disable.
This is because `useList` caches renders, and doesn't know about dependency on `messageDeleting` state.
To fix it, we need to provide `keys`:

```tsx
// File: /src/pages/chat/page.tsx
const messages = useList(model.$messages, {
  keys: [messageDeleting],
  fn: (message) => (
    <div className="message-item" key={message.timestamp}>
      <h3>From: {message.author.name}</h3>
      <p>{message.text}</p>
      <button onClick={() => handleMessageDelete(message)} disabled={messageDeleting}>
        {messageDeleting ? "Deleting" : "Delete"}
      </button>
    </div>
  ),
});
```

## Conclusion

This is a simple example of an application on effector with React and TypeScript.

You can clone this [effector/examples/react-and-ts](https://github.com/effector/effector/tree/master/examples/react-and-ts) and run this example on your computer.
