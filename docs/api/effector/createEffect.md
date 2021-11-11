---
id: createEffect
title: createEffect
description: Method for creating an effect
---

Method for creating an [effect](./Effect.md)

## createEffect with handler

Creates an effect with given handler

```typescript
createEffect(handler?)
```

**Arguments**

1. `handler` (_Function_): function to handle effect calls, also can be set with [`use(handler)`](#use)

**Returns**

[_Effect_](./Effect.md): New effect

:::note
You must provide a handler either in [createEffect](createEffect.md) or in [`.use`](Effect.md#usehandler) method later, otherwise effect will throw with "no handler used in _%effect name%_" error
:::

:::note since
effector 21.3.0
:::

### Examples

#### Create effect with handler

```js
import {createEffect} from 'effector'

const fetchUserReposFx = createEffect(async ({name}) => {
  const url = `https://api.github.com/users/${name}/repos`
  const req = await fetch(url)

  return req.json()
})

fetchUserReposFx.done.watch(({params, result}) => {
  console.log(result)
})

await fetchUserReposFx({name: 'zerobias'})
```

[Try it](https://share.effector.dev/XnFCizrQ)

### Change state on effect completion

```js
import {createStore, createEffect} from 'effector'

const fetchUserReposFx = createEffect(async ({name}) => {
  const url = `https://api.github.com/users/${name}/repos`
  const req = await fetch(url)

  return req.json()
})

const $repos = createStore([])
	.on(fetchUserReposFx.doneData, (_, repos) => repos)

$repos.watch(repos => {
  console.log(`${repos.length} repos`)
})
// => 0 repos

await fetchUserReposFx({name: 'zerobias'})
// => 26 repos
```

[Try it](https://share.effector.dev/9nRLTBSq)

#### Set handler to effect after creating

```js
import {createEffect} from 'effector'

const fetchUserRepos = createEffect()

fetchUserRepos.use(async ({name}) => {
  const url = `https://api.github.com/users/${name}/repos`
  const req = await fetch(url)

  return req.json()
})

await fetchUserRepos({name: 'zerobias'})
```

[Try it](https://share.effector.dev/eymiDSSz)

#### Watch effect status

```js
import {createEffect} from 'effector'

const fetchUserReposFx = createEffect(async ({name}) => {
  const url = `https://api.github.com/users/${name}/repos`
  const req = await fetch(url)
  
  return req.json()
})

fetchUserReposFx.pending.watch(pending => {
  console.log(`effect is pending?: ${pending ? 'yes' : 'no'}`)
})

fetchUserReposFx.done.watch(({params, result}) => {
  console.log(params) // {name: 'zerobias'}
  console.log(result) // resolved value
})

fetchUserReposFx.fail.watch(({params, error}) => {
  console.error(params) // {name: 'zerobias'}
  console.error(error) // rejected value
})

fetchUserReposFx.finally.watch(({params, status, result, error}) => {
  console.log(params) // {name: 'zerobias'}
  console.log(`handler status: ${status}`)

  if (error) {
    console.log('handler rejected', error)
  } else {
    console.log('handler resolved', result)
  }
})

await fetchUserReposFx({name: 'zerobias'})
```

[Try it](https://share.effector.dev/wXNvzyPf)

## createEffect with config

Creates an effect with handler and name from given config object

```typescript
createEffect({handler, name})
```

**Arguments**

1. `config`? (_Params_): effect
   - `handler` (_Function_): function to handle effect calls, also can be set with [`use(handler)`](#use)
   - `name`? (_string_): Optional effect name

**Returns**

[_Effect_](Effect.md): New effect

### Examples

#### Create named effect

```js
import {createEffect} from 'effector'

const fetchUserReposFx = createEffect({
  name: 'fetch user repositories',
  async handler({name}) {
    const url = `https://api.github.com/users/${name}/repos`
    const req = await fetch(url)
    return req.json()
  },
})

await fetchUserReposFx({name: 'zerobias'})
```

[Try it](https://share.effector.dev/tvTwHub0)
