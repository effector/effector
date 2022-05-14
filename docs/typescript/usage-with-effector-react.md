---
id: usage-with-effector-react
title: Usage with effector-react
---

**TypeScript** is a typed superset of JavaScript. It became popular
recently in applications due to the benefits it can bring. If you are new to
TypeScript, it is highly recommended to become familiar with it first, before
proceeding. You can check out its documentation
[here.](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

TypeScript has a potential to bring the following benefits to application:

1. Type safety for state, stores and events
2. Easy refactoring of typed code
3. A superior developer experience in a team environment

## A Practical Example

We will be going through a simplistic chat application to demonstrate a
possible approach to include static typing. This chat application will have API mock that load and saves data from localStorage.

The full source code is available on
[codesandbox here](https://codesandbox.io/s/react-and-ts-and-effector-ng5s1l).
Note that, by going through this example yourself, you will experience some benefits of using TypeScript.

### Let's create API mock

There is a directory structure inherited from the [feature-sliced](https://feature-sliced.design) methodology.

Let's define a simple type, that our improvised API will return.

```ts title=/src/shared/api/message.ts
interface Author {
  id: string
  name: string
}

export interface Message {
  id: string
  author: Author
  text: string
  timestamp: number
}
```

Our API will load and save data to `localStorage`, and we need some functions to load data:

```ts title=/src/shared/api/message.ts
const LocalStorageKey = 'effector-example-history'

function loadHistory(): Message[] {
  const source = localStorage.getItem(LocalStorageKey)
  if (source) {
    return JSON.parse(source)
  }
}
function saveHistory(messages: Message[]) {
  localStorage.setItem(LocalStorageKey, JSON.stringify(messages))
}
```

I also created some libraries to generate identifier and wait to simulate network requests.

```ts title=/src/shared/lib/oid.ts
export const createOid = () =>
  ((new Date().getTime() / 1000) | 0).toString(16) +
  'xxxxxxxxxxxxxxxx'
    .replace(/[x]/g, () => ((Math.random() * 16) | 0).toString(16))
    .toLowerCase()
```

```ts title=/src/shared/lib/wait.ts
export function wait(timeout = Math.random() * 1500) {
  return new Promise(resolve => setTimeout(resolve, timeout))
}
```

OK. Now we can create effects that will load messages.

```ts title=/src/shared/api/message.ts
// Here effect defined with static types. void defines no arguments.
// Second type argument defines a successful result type.
// Third argument is optional and defines a failure result type.
export const messagesLoadFx = createEffect<void, Message[], Error>(async () => {
  const history = loadHistory()
  await wait()
  return history ?? []
})

interface SendMessage {
  text: string
  author: Author
}

// But we can use type inferring and set arguments types in the handler defintion.
// Hover your cursor on `messagesLoadFx` to see the inferred types:
// `Effect<{ text: string; authorId: string; authorName: string }, void, Error>`
export const messageSendFx = createEffect(
  async ({text, author}: SendMessage) => {
    const message: Message = {
      id: createOid(),
      author,
      timestamp: Date.now(),
      text,
    }
    const history = await messagesLoadFx()
    history.push(message)
    saveHistory(history)
    await wait()
  },
)

// Please, note that we will `wait()` for `messagesLoadFx` and `wait()` in the current effect
// Also, note that `saveHistory` and `loadHistory` can throw exceptions,
// in that case effect will trigger `messageDeleteFx.fail` event.
export const messageDeleteFx = createEffect(async (message: Message) => {
  const history = await messagesLoadFx()
  const updated = history.filter(found => found.id !== message.id)
  await wait()
  saveHistory(updated)
})
```

OK, now we are done with the messages, let's create effects to manage user session.

Really, I prefer to start design code from implementing interfaces:

```ts title=/src/shared/api/session.ts
// It is called session because it describes current user session, not the User at all.
export interface Session {
  id: string
  name: string
}
```

Also, to generate a usernames and don't require to type it by themselves, import `unique-names-generator`:

```ts title=/src/shared/api/session.ts
import {uniqueNamesGenerator, Config, starWars} from 'unique-names-generator'

const nameGenerator: Config = {dictionaries: [starWars]}
const createName = () => uniqueNamesGenerator(nameGenerator)
```

Let's create effects to manage session:

```ts title=/src/shared/api/session.ts
const LocalStorageKey = 'effector-example-session'

// We need explicitly return `null` because `undefined` is a special value in the effector ecosystem,
// that defines some "empty" state, and store will skip updates if we try to pass `undefined` inside.
// Always use `null` for "no value state".
// Note, that we need explicit types definition in that case, because `JSON.parse()` returns `any`
export const sessionLoadFx = createEffect<void, Session | null>(async () => {
  const source = localStorage.getItem(LocalStorageKey)
  if (!source) {
    return null
  }
  await wait()
  return JSON.parse(source)
})

// By default if no aruments, no explicit type arguments, and no return,
// effect will have type: `Effect<void, void, Error>`
export const sessionDeleteFx = createEffect(async () => {
  localStorage.removeItem(LocalStorageKey)
  await wait()
})

// Look at the type of the `sessionCreateFx` constant.
// It will be `Effect<void, Session, Error>` because Typescript can infer type from `session` constant
export const sessionCreateFx = createEffect(async () => {
  // I explicitly set type for the next constant, because it allows Typescript help me
  // If I forgot to set property, I'll see error in the place of definition
  // Also it allows IDE to autocomplete property names
  const session: Session = {
    id: createOid(),
    name: createName(),
  }
  localStorage.setItem(LocalStorageKey, JSON.stringify(session))
  return session
})
```

How we need to import this effects?

I surely recommend to write short imports and use reexports.
It allows to securely refactor code structure inside `shared/api` and the same slices,
and don't worry about refactoring another imports and unnecessary changes in the git history.

```ts title=/src/shared/api/index.ts
export * as messageApi from './message'
export * as sessionApi from './session'

// Types reexports made just for convenience
export {Message} from './message'
export {Session} from './session'
```

### Create a page with the logic

Typical structure of the pages:

```
src/
  pages/
    <page-name>/
      page.tsx — just the View layer
      model.ts — a business-logic code
      index.ts — reexports, sometimes there will be a connection code
```

I recommend to write code in the view layer from the top to bottom, more common code at the top.
Let's model our view layer. We will have two main sections at the page: messages history and a message form.

```tsx title=/src/pages/chat/page.tsx
import React from 'react'

export function ChatPage() {
  return (
    <div className="parent">
      <ChatHistory />
      <MessageForm />
    </div>
  )
}

function ChatHistory() {
  return (
    <div className="chat-history">
      <div>There will be messages list</div>
    </div>
  )
}

function MessageForm() {
  return (
    <div className="message-form">
      <div>There will be message form</div>
    </div>
  )
}
```

OK. Now we know what kind of structure we have, and we can start to model business-logic processes.
View layer should do two tasks: render data from stores and report events to the model.
View layer doesn't know how data is loaded, how it should be converted and sent back.

```ts title=/src/pages/chat/model.ts
import {createEvent, createStore} from 'effector'

// At the moment, there is just raw data without any knowledge how to load
export const $loggedIn = createStore<boolean>(false)
export const $userName = createStore('')
export const $messages = createStore<Message[]>([])
export const $messageText = createStore('')

// Page should NOT know where the data came from.
// That's why we just reexport them.
// We can rewrite this code to `combine` or independent store,
// page should NOT be changed, just because we changed the implementation
export const $messageDeleting = messageApi.messageDeleteFx.pending
export const $messageSending = messageApi.messageSendFx.pending

// And the events report just what happened
export const messageDeleteClicked = createEvent<Message>()
export const messageSendClicked = createEvent()
export const messageEnterPressed = createEvent()
export const messageTextChanged = createEvent<string>()
export const loginClicked = createEvent()
export const logoutClicked = createEvent()
```

Now we can implement components.

```tsx title=/src/pages/chat/page.tsx
import {useEvent, useList, useStore} from 'effector-react'
import * as model from './model'

// export function ChatPage { ... }

function ChatHistory() {
  const messageDeleting = useStore(model.$messageDeleting)
  const onMessageDelete = useEvent(model.messageDeleteClicked)

  // Hook `useList` allows React not rerender messages really doesn't changed
  const messages = useList(model.$messages, message => (
    <div className="message-item" key={message.timestamp}>
      <h3>From: {message.author.name}</h3>
      <p>{message.text}</p>
      <button
        onClick={() => onMessageDelete(message)}
        disabled={messageDeleting}>
        {messageDeleting ? 'Deleting' : 'Delete'}
      </button>
    </div>
  ))
  // We don't need `useCallback` here because we pass function to an HTML-element, not a custom component

  return <div className="chat-history">{messages}</div>
}
```

I split `MessageForm` to the different components, to simplify code:

```tsx title=/src/pages/chat/page.tsx
function MessageForm() {
  const isLogged = useStore(model.$loggedIn)
  return isLogged ? <SendMessage /> : <LoginForm />
}

function SendMessage() {
  const userName = useStore(model.$userName)
  const messageText = useStore(model.$messageText)
  const messageSending = useStore(model.$messageSending)

  const handleLogout = useEvent(model.logoutClicked)
  const handleTextChange = useEvent(model.messageTextChanged)
  const handleEnterPress = useEvent(model.messageEnterPressed)
  const handleSendClick = useEvent(model.messageSendClicked)

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleEnterPress()
    }
  }

  return (
    <div className="message-form">
      <h3>{userName}</h3>
      <input
        value={messageText}
        onChange={event => handleTextChange(event.target.value)}
        onKeyPress={handleKeyPress}
        className="chat-input"
        placeholder="Type a message..."
      />
      <button onClick={() => handleSendClick()} disabled={messageSending}>
        {messageSending ? 'Sending...' : 'Send'}
      </button>
      <button onClick={() => handleLogout()}>Log out</button>
    </div>
  )
}

function LoginForm() {
  const handleLogin = useEvent(model.loginClicked)
  return (
    <div className="message-form">
      <div>Please, log in to be able to send messages</div>
      <button onClick={() => handleLogin()}>Login as a random user</button>
    </div>
  )
}
```
