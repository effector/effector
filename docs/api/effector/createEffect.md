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
  handler: ({name}) => {
    return fetch(`https://api.github.com/users/${user}/repos`)
      .then(res => res.json())
  }
})
```

Create named effect

```js
import {createEffect} from 'effector'

const fetchUserRepos = createEffect('fetch user repositories', {
  handler: ({name}) => {
    return fetch(`https://api.github.com/users/${user}/repos`)
      .then(res => res.json())
  }
})
```

Set handler to effect after creating

```js
import {createEffect} from 'effector'

const fetchUserRepos = createEffect()

fetchUserRepos.use(({name}) => {
  return fetch(`https://api.github.com/users/${user}/repos`)
    .then(res => res.json())
})
```

Watch effect status

```js
import {createEffect} from 'effector'

const fetchUserRepos = createEffect({
  handler: ({name}) => {
    return fetch(`https://api.github.com/users/${name}/repos`)
      .then(res => res.json())
  }
})

fetchUserRepos.pending.watch(pending => {
  return console.log(`effect is pending?: ${pending ? 'yes' : 'no'}`)
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
  handler: ({name}) => {
    return fetch(`https://api.github.com/users/${name}/repos`)
      .then(res => res.json())
  }
})

const repos = createStore([])
    .on(fetchUserRepos.done, (_, {result: repos}) => repos)

```


