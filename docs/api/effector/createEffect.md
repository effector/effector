---
id: createEffect
title: createEffect
hide_title: true
---

# `createEffect(name?, { handler })`

Creates an [effect](Effect.md)

#### Arguments

1. `name`? _(string)_: Effect name
2. `params`? (_Params_): Setup effect
    - `handler` (_Function_): function to handle effect calls, also can be set with [`use(handler)`](#use)

#### Returns

([_`Effect`_](Effect.md)): A container for async function.

#### Examples

Create unnamed effect

```js
import {createEffect} from 'effector'

const fetchUserRepos = createEffect({
  handler: async ({name}) => {
    const url = `https://api.github.com/users/${name}/repos`
    const req = await fetch(url)
    return req.json()
  }
})
```

Create named effect

```js
import {createEffect} from 'effector'

const fetchUserRepos = createEffect('fetch user repositories', {
  handler: async ({name}) => {
    const url = `https://api.github.com/users/${name}/repos`
    const req = await fetch(url)
    return req.json()
  }
})
```

Set handler to effect after creating

```js
import {createEffect} from 'effector'

const fetchUserRepos = createEffect()

fetchUserRepos.use(async ({name}) => {
  const url = `https://api.github.com/users/${name}/repos`
  const req = await fetch(url)
  return req.json()
})
```

Watch effect status

```js
import {createEffect} from 'effector'

const fetchUserRepos = createEffect({
  handler: async ({name}) => {
    const url = `https://api.github.com/users/${name}/repos`
    const req = await fetch(url)
    return req.json()
  }
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

fetchUserRepos.finally.watch(({ params, status, result, error }) => {
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

Change state

```js
import {createStore, createEffect} from 'effector'

const fetchUserRepos = createEffect({
  handler: async ({name}) => {
    const url = `https://api.github.com/users/${name}/repos`
    const req = await fetch(url)
    return req.json()
  }
})

const repos = createStore([])
    .on(fetchUserRepos.done, (_, {result: repos}) => repos)

```


