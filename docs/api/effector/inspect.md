---
id: inspect
title: inspect
---

# Inspect API

Special API methods designed to handle debugging and monitoring use cases without giving too much access to internals of your actual app.

Useful to create developer tools and production monitoring and observability instruments.

:::note since
effector 22.6.1
:::

## Inspect

Allows to track any computations, that have happened in the effector's kernel.

```ts
import {inspect, type Message} from 'effector/inspect'

import {someEvent} from './app-code'

function logInspectMessage(m: Message) {
  const {name, value, kind} = m

  return console.log(`[${kind}] ${name} ${value}`)
}

inspect({
  fn: m => {
    logInspectMessage(m)
  },
})

someEvent(42)
// will log something like
// [event] someEvent 42
// [on] 42
// [store] $count 1337
// ☝️ let's say that reducer adds 1295 to provided number
//
// and so on, any triggers
```

Computations tracking is restricted by [Scope](./Scope.md).
If no scope is provided - default out-of-scope mode computations will be tracked.

```ts
import {fork, allSettled} from 'effector'
import {inspect, type Message} from 'effector/inspect'

import {someEvent} from './app-code'

function logInspectMessage(m: Message) {
  const {name, value, kind} = m

  return console.log(`[${kind}] ${name} ${value}`)
}

const myScope = fork()

inspect({
  scope: myScope,
  fn: m => {
    logInspectMessage(m)
  },
})

someEvent(42)
// ☝️ No logs! That's because tracking was restricted by myScope

allSettled(someEvent, {scope: myScope, params: 42})
// [event] someEvent 42
// [on] 42
// [store] $count 1337
```

### Tracing

Adding `trace: true` setting allows to look up previous computations, that led to this specific one.
It is useful to debug the specific reason of some event happening

```ts
import {fork, allSettled} from 'effector'
import {inspect, type Message} from 'effector/inspect'

import {someEvent, $count} from './app-code'

function logInspectMessage(m: Message) {
  const {name, value, kind} = m

  return console.log(`[${kind}] ${name} ${value}`)
}

const myScope = fork()

inspect({
  scope: myScope,
  trace: true, // <- explicit setting is needed
  fn: m => {
    if (m.kind === 'store' && m.sid === $count.sid) {
      m.trace.forEach(tracedMessage => {
        logInspectMessage(tracedMessage)
        // ☝️ here we are loggin the trace of specific store update
      })
    }
  },
})

allSettled(someEvent, {scope: myScope, params: 42})
// [on] 42
// [event] someEvent 42
// ☝️ traces are provided in backwards order, because we are looking back in time
```

### Errors

Effector does not allow exceptions in pure functions. In such case branch computation is stopped and exception is logged.

There is also a special message type in such case:

```ts
inspect({
  fn: m => {
    if (m.type === 'error') {
      // do something about it
      console.log(`${m.kind} ${m.name} computation has failed with ${m.error}`)
    }
  },
})
```

## Inspect Graph

Allows to track declarations of units, [factories](./babel-plugin.md#factories) and [regions](./withRegion.md)

```ts
import {createStore} from "effector"
import { inspectGraph, type Declaration } from "effector/inspect"

function printDeclaration(d: Declaration) {
  console.log(`${d.kind} ${d.name}`)
}

inspectGraph({
  fn: (d) => {
    printDeclaration(d)
  }
})

const $count = createStore(0)
// logs "store $count" to console
```

## withRegion

Meta-data provided via region's root node is available on declaration.

```ts
import {createNode, withRegion, createStore} from "effector"
import { inspectGraph, type Declaration } from "effector/inspect"

function createCustomSomething(config) {
  const $something = createStore(0)

  withRegion(createNode({meta: {hello: 'world'}}), () => {
    // some code
  })

  return $something
}
inspectGraph({
  fn: (d) => {
    if (d.type === "region")
    console.log(d.meta.hello)
  }
})

const $some = createCustomSomething({})
// logs "world"
```
