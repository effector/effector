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
export interface Message {
  id: string
  user: string
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

// But we can use type inferring and set arguments types in the handler defintion.
// Hover your cursor on `messagesLoadFx` to see the inferred types:
// `Effect<{ text: string; authorId: string }, void, Error>`
export const messageSendFx = createEffect(
  async ({text, authorId}: {text: string; authorId: string}) => {
    const message: Message = {
      id: createOid(),
      user: authorId,
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
