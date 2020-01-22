---
id: createEffect
title: createEffect
hide_title: true
---

# `createEffect(name?, { handler })`

Creates an [effect](Effect.md)

#### Arguments

1. `name`? (_string_): Effect name
2. `params`? (_Params_): Setup effect
   - `handler` (_Function_): function to handle effect calls, also can be set with [`use(handler)`](#use)

#### Returns

([_`Effect`_](Effect.md)): A container for async function.

> **Note**: You are not supposed to [`Forward`](forward.md) parts of _Effect_ (even though it consists of _Events_ and _Stores_), since it's a complete entity on its own. This behavior will not be supported

#### Examples

Create unnamed effect

```js try
import {createEffect} from 'effector'

const fetchUserRepos = createEffect({
  handler: async ({name}) => {
    const url = `https://api.github.com/users/${name}/repos`
    const req = await fetch(url)
    return req.json()
  },
})

await fetchUserRepos({name: 'zerobias'})
```

[Try it](https://share.effector.dev/6pNaXVyU)

Create named effect

```js try
import {createEffect} from 'effector'

const fetchUserRepos = createEffect('fetch user repositories', {
  handler: async ({name}) => {
    const url = `https://api.github.com/users/${name}/repos`
    const req = await fetch(url)
    return req.json()
  },
})
```

[Try it](https://share.effector.dev/Oe3zcAgn)

Set handler to effect after creating

```js try
import {createEffect} from 'effector'

const fetchUserRepos = createEffect()

fetchUserRepos.use(async ({name}) => {
  const url = `https://api.github.com/users/${name}/repos`
  const req = await fetch(url)
  return req.json()
})
```

[Try it](https://share.effector.dev/Wp9b9RF4)

Watch effect status

```js try
import {createEffect} from 'effector'

const fetchUserRepos = createEffect({
  handler: async ({name}) => {
    const url = `https://api.github.com/users/${name}/repos`
    const req = await fetch(url)
    return req.json()
  },
})

fetchUserRepos.pending.watch(pending => {
  console.log(`effect is pending?: ${pending ? 'yes' : 'no'}`)
})

fetchUserRepos.done.watch(({params, result}) => {
  console.log(params) // {name: 'zerobias'}
  console.log(result) // resolved value
})

fetchUserRepos.fail.watch(({params, error}) => {
  console.error(params) // {name: 'zerobias'}
  console.error(error) // rejected value
})

fetchUserRepos.finally.watch(({params, status, result, error}) => {
  console.log(params) // {name: 'zerobias'}
  console.log(`handler status: ${status}`)

  if (error) {
    console.log('handler rejected', error)
  } else {
    console.log('handler resolved', result)
  }
})

fetchUserRepos({name: 'zerobias'})
```

[Try it](https://share.effector.dev/8tauAC1P)

Change state

```js try
import {createStore, createEffect} from 'effector'

const fetchUserRepos = createEffect({
  handler: async ({name}) => {
    const url = `https://api.github.com/users/${name}/repos`
    const req = await fetch(url)
    return req.json()
  },
})

const repos = createStore([]).on(
  fetchUserRepos.done,
  (_, {result: repos}) => repos,
)
```

[Try it](https://share.effector.dev/JNeawjtw)
