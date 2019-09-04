# ☄️ Effector

> Reactive state manager

[![npm version](https://badge.fury.io/js/effector.svg)](https://badge.fury.io/js/effector) [ ![Codeship Status for zerobias/effector](https://app.codeship.com/projects/67f481f0-2c7e-0136-030e-1a8413355f0c/status?branch=master)](https://app.codeship.com/projects/288022) [![Build Status](https://semaphoreci.com/api/v1/zerobias/effector/branches/master/shields_badge.svg)](https://semaphoreci.com/zerobias/effector)
[![Join the chat at https://
.im/effector-js/community](https://img.shields.io/gitter/room/effector-js/community.svg?style=popout)](https://gitter.im/effector-js/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![License](https://img.shields.io/npm/l/effector.svg?colorB=brightgreen&style=popout)

<a href="https://www.patreon.com/zero_bias/overview"><img src="https://c5.patreon.com/external/logo/become_a_patron_button.png"/></a>

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Introduction](#introduction)
  - [Effector follows five basic principles:](#effector-follows-five-basic-principles)
- [Installation](#installation)
  - [Additional packages:](#additional-packages)
- [Press](#press)
- [Online playground](#online-playground)
- [Examples](#examples)
  - [Increment/decrement with React](#incrementdecrement-with-react)
  - [Hello world with events and nodejs](#hello-world-with-events-and-nodejs)
  - [Storages and events](#storages-and-events)
  - [Client-server interaction with effects](#client-server-interaction-with-effects)
  - [Reddit reader](#reddit-reader)
  - [Lists rendering](#lists-rendering)
  - [More examples](#more-examples)
- [API](#api)
  - [Event](#event)
  - [Effect](#effect)
  - [Store](#store)
    - [Store composition/decomposition](#store-compositiondecomposition)
  - [Domain](#domain)
  - [Learn more](#learn-more)
- [Tested with browserstack](#tested-with-browserstack)
- [Contributors](#contributors)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

Effector is an effective multi store state manager for Javascript apps **(React/React Native/Vue/Node.js)**, that allows you to manage data in complex applications without the risk of inflating the monolithic central store, with clear control flow, good type support and high capacity API. Effector supports both **TypeScript** and **Flow** type annotations out of the box.

### Effector follows five basic principles:

- **Application stores should be as light as possible** - the idea of adding a store for specific needs should not be frightening or damaging to the developer.
- **Application stores should be freely combined** - data that the application needs can be statically distributed, showing how it will be converted in runtime.
- **Autonomy from controversial concepts** - no decorators, no need to use classes or proxies - this is not required to control the state of the application and therefore the api library uses only functions and simple js objects
- **Predictability and clarity of API** - A small number of basic principles are reused in different cases, reducing the user's workload and increasing recognition. For example, if you know how .watch works for events, you already know how .watch works for stores.
- **The application is built from simple elements** - space and way to take any required business logic out of the view, maximizing the simplicity of the components.

## Installation

```bash
npm install --save effector
```

Or using `yarn`

```bash
yarn add effector
```

### Additional packages:

- **For Web Framework/Libraries:**

  |                                           Package                                            |                                                       Version                                                       |                                                                             Dependencies                                                                             |
  | :------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
  | [`effector-react`](https://github.com/zerobias/effector/tree/master/packages/effector-react) | [![npm](https://img.shields.io/npm/v/effector-react.svg?maxAge=3600)](https://www.npmjs.com/package/effector-react) | [![Dependency Status](https://david-dm.org/zerobias/effector.svg?path=packages/effector-react)](https://david-dm.org/zerobias/effector?path=packages/effector-react) |
  |   [`effector-vue`](https://github.com/zerobias/effector/tree/master/packages/effector-vue)   |   [![npm](https://img.shields.io/npm/v/effector-vue.svg?maxAge=3600)](https://www.npmjs.com/package/effector-vue)   |   [![Dependency Status](https://david-dm.org/zerobias/effector.svg?path=packages/effector-vue)](https://david-dm.org/zerobias/effector?path=packages/effector-vue)   |

- **For another languages:**

  |                                              Package                                               |                                                          Version                                                          |                                                                                Dependencies                                                                                |
  | :------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
  |       [`bs-effector`](https://github.com/zerobias/effector/tree/master/packages/bs-effector)       |       [![npm](https://img.shields.io/npm/v/bs-effector.svg?maxAge=3600)](https://www.npmjs.com/package/bs-effector)       |       [![Dependency Status](https://david-dm.org/zerobias/effector.svg?path=packages/bs-effector)](https://david-dm.org/zerobias/effector?path=packages/bs-effector)       |
  | [`bs-effector-react`](https://github.com/zerobias/effector/tree/master/packages/bs-effector-react) | [![npm](https://img.shields.io/npm/v/bs-effector-react.svg?maxAge=3600)](https://www.npmjs.com/package/bs-effector-react) | [![Dependency Status](https://david-dm.org/zerobias/effector.svg?path=packages/bs-effector-react)](https://david-dm.org/zerobias/effector?path=packages/bs-effector-react) |

## Press

- [Why I choose Effector instead of Redux or MobX](https://dev.to/lessmess/why-i-choose-effector-instead-of-redux-or-mobx-3dl7)
- [Effector — State Manager You Should Give a Try](https://itnext.io/effector-state-manager-you-should-give-a-try-b46b917e51cc)
- [Powerful and fast 5kb state manager](https://codeburst.io/effector-state-manager-6ee2e72e8e0b)

## Online playground

You can try effector in [our repl](https://share.effector.dev)

Code sharing, Typescript and react supported out of the box; and of course, it [built with effector](https://github.com/zerobias/effector/tree/master/website/editor/src)

## Examples

### Increment/decrement with React

```js
import {createStore, createEvent} from 'effector'
import {useStore} from 'effector-react'

const increment = createEvent('increment')
const decrement = createEvent('decrement')
const resetCounter = createEvent('reset counter')

const counter = createStore(0)
  .on(increment, state => state + 1)
  .on(decrement, state => state - 1)
  .reset(resetCounter)

counter.watch(console.log)

const Counter = () => {
  const value = useStore(counter)
  return <div>{value}</div>
}

const App = () => {
  const value = useStore(counter)

  return (
    <>
      <Counter />
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={resetCounter}>reset</button>
    </>
  )
}
```

[Run example](https://share.effector.dev/3R0iqNYe)

<hr />

### Hello world with events and nodejs

```js
const {createEvent} = require('effector')

const messageEvent = createEvent()

messageEvent.watch(text => console.log(`new message: ${text}`))

messageEvent('hello world')
// => new message: hello world
```

[Run example](https://share.effector.dev/CSKJUI4E)

<hr />

### Storages and events

```js
const {createStore, createEvent} = require('effector')

const turnOn = createEvent()
const turnOff = createEvent()

const status = createStore('offline')
  .on(turnOn, () => 'online')
  .on(turnOff, () => 'offline')

status.watch(newStatus => {
  console.log(`status changed: ${newStatus}`)
})
// for store watchs callback invokes immediately
// "status changed: offline"

turnOff() // nothing has changed, callback is not triggered
turnOn() // "status changed: online"
turnOff() // "status changed: offline"
turnOff() // nothing has changed
```

[Run example](https://share.effector.dev/iXQVXIEv)

<hr />

### Client-server interaction with effects

[see source code](https://github.com/zerobias/effector/tree/master/examples/worker-rpc)

### Reddit reader

[Run example](https://share.effector.dev/T5CyxSFl)

With effects for data fetching and effector-react hooks

### Lists rendering

[Run example](https://share.effector.dev/OlakwECa)

With `useList` hook

> [![Edit Effector-react example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vmx6wxww43) Basic example

### [More examples](https://github.com/zerobias/effector/network/dependents)

## API

### Event

Event is an intention to change state.

```js
import {createEvent} from 'effector'
const send = createEvent() // unnamed event
const onMessage = createEvent('message') // named event

const socket = new WebSocket('wss://echo.websocket.org')
socket.onmessage = msg => onMessage(msg)
socket.onopen = () => send('{"text": "hello"}')

const onMessageParse = onMessage.map(msg => JSON.parse(msg.data))

onMessageParse.watch(data => {
  console.log('Message from server ', data)
})

send.watch(data => {
  socket.send(data)
})
```

[Run example](https://share.effector.dev/8rZm1G6k)

### Effect

**Effect** is a container for async function.
It can be safely used in place of the original async function.

```js
import {createEffect} from 'effector'

const fetchUserRepos = createEffect({
  async handler({name}) {
    const url = `https://api.github.com/users/${name}/repos`
    const req = await fetch(url)
    return req.json()
  },
})

// subscribe to pending store status
fetchUserRepos.pending.watch(pending => {
  console.log(pending) // false
})

// subscribe to handler resolve
fetchUserRepos.done.watch(({params, result}) => {
  console.log(params) // {name: 'zerobias'}
  console.log(result) // resolved value
})

// subscribe to handler reject or throw error
fetchUserRepos.fail.watch(({params, error}) => {
  console.error(params) // {name: 'zerobias'}
  console.error(error) // rejected value
})

// subscribe to both cases
fetchUserRepos.finally.watch(data => {
  if (data.status === 'done') {
    const {params, result} = data
    console.log(params) // {name: 'zerobias'}
    console.log(result) // resolved value
  } else {
    const {params, error} = data
    console.error(params) // {name: 'zerobias'}
    console.error(error) // rejected value
  }
})

// you can replace handler anytime
fetchUserRepos.use(requestMock)

// calling effect will return a promise
const result = await fetchUserRepos({name: 'zerobias'})
```

[Run example](https://share.effector.dev/hlNcL8ma)

### Store

**Store** is an object that holds the state tree. There can be multiple stores.

```js
// `getUsers` - is an effect
// `addUser` - is an event
const defaultState = [{ name: Joe }];
const users = createStore(defaultState)
  // subscribe store reducers to events
  .on(getUsers.done, (oldState, payload) => payload)
  .on(addUser, (oldState, payload) => [...oldState, payload]))

// subscribe side-effects
const callback = (newState) => console.log(newState)
users.watch(callback) // `.watch` for a store is triggered immediately: `[{ name: Joe }]`
// `callback` will be triggered each time when `.on` handler returns the new state
```

#### Store composition/decomposition

Most profit thing of stores.

Get smaller part of the store:

```js
// `.map` accept state of parent store and return new memoized store. No more reselect ;)
const firstUser = users.map(list => list[0])
firstUser.watch(newState => console.log(`first user name: ${newState.name}`)) // "first user name: Joe"

addUser({name: Joseph}) // `firstUser` is not updated
getUsers() // after promise resolve `firstUser` is updated and call all watchers (subscribers)
```

Compose stores:

```js
import {createStore, createStoreObject} from 'effector'

const a = createStore(1)
const b = createStore('b')

const c = createStoreObject({a, b})

c.watch(console.log)
// => {a: 1, b: "b"}
```

[Run example](https://share.effector.dev/MuLF8xGB)

### Domain

**Domain** is a namespace for your events, stores and effects.
Domain can subscribe to event, effect, store or nested domain creation with **onCreateEvent**, **onCreateStore**, **onCreateEffect**, **onCreateDomain(to handle nested domains)** methods.

```js
import {createDomain} from 'effector'
const mainPage = createDomain('main page')
mainPage.onCreateEvent(event => {
  console.log('new event: ', event.getType())
})
mainPage.onCreateStore(store => {
  console.log('new store: ', store.getState())
})
const mount = mainPage.event('mount')
// => new event: main page/mount

const pageStore = mainPage.store(0)
// => new store: 0
```

[Run example](https://share.effector.dev/PgwRuYja)

### Learn more

> [Core concepts](https://effector.now.sh/en/introduction/core-concepts)

> [API docs](https://effector.now.sh/en/api/effector/effector)

> [Usage with TypeScript](https://effector.now.sh/en/recipes/usage-with-typescript)

![Effector Diagram](./diagram.png)

## Tested with browserstack

[![Tested with browserstack](https://raw.githubusercontent.com/zerobias/effector/master/website/media/Browserstack-logo.svg?sanitize=true)](https://BrowserStack.com)

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://zerobias.net"><img src="https://avatars0.githubusercontent.com/u/15912112?v=4" width="100px;" alt="Dmitry"/><br /><sub><b>Dmitry</b></sub></a><br /><a href="#question-zerobias" title="Answering Questions">💬</a> <a href="https://github.com/zerobias/effector/commits?author=zerobias" title="Code">💻</a> <a href="https://github.com/zerobias/effector/commits?author=zerobias" title="Documentation">📖</a> <a href="#example-zerobias" title="Examples">💡</a> <a href="#ideas-zerobias" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-zerobias" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/zerobias/effector/commits?author=zerobias" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/goodmind"><img src="https://avatars2.githubusercontent.com/u/3275424?v=4" width="100px;" alt="andretshurotshka"/><br /><sub><b>andretshurotshka</b></sub></a><br /><a href="#question-goodmind" title="Answering Questions">💬</a> <a href="https://github.com/zerobias/effector/commits?author=goodmind" title="Code">💻</a> <a href="https://github.com/zerobias/effector/commits?author=goodmind" title="Documentation">📖</a> <a href="#platform-goodmind" title="Packaging/porting to new platform">📦</a> <a href="https://github.com/zerobias/effector/commits?author=goodmind" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://sergeysova.com"><img src="https://avatars0.githubusercontent.com/u/5620073?v=4" width="100px;" alt="Sergey Sova"/><br /><sub><b>Sergey Sova</b></sub></a><br /><a href="https://github.com/zerobias/effector/commits?author=sergeysova" title="Documentation">📖</a> <a href="#example-sergeysova" title="Examples">💡</a></td>
    <td align="center"><a href="https://t.me/artalar"><img src="https://avatars0.githubusercontent.com/u/27290320?v=4" width="100px;" alt="Arutyunyan Artyom"/><br /><sub><b>Arutyunyan Artyom</b></sub></a><br /><a href="https://github.com/zerobias/effector/commits?author=artalar" title="Documentation">📖</a> <a href="#example-artalar" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/Komar0ff"><img src="https://avatars2.githubusercontent.com/u/10588170?v=4" width="100px;" alt="Ilya"/><br /><sub><b>Ilya</b></sub></a><br /><a href="https://github.com/zerobias/effector/commits?author=Komar0ff" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/dpr-dev"><img src="https://avatars3.githubusercontent.com/u/23157659?v=4" width="100px;" alt="Arthur Irgashev"/><br /><sub><b>Arthur Irgashev</b></sub></a><br /><a href="https://github.com/zerobias/effector/commits?author=dpr-dev" title="Documentation">📖</a> <a href="https://github.com/zerobias/effector/commits?author=dpr-dev" title="Code">💻</a> <a href="#example-dpr-dev" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/hexagon141"><img src="https://avatars0.githubusercontent.com/u/15704394?v=4" width="100px;" alt="Igor Ryzhov"/><br /><sub><b>Igor Ryzhov</b></sub></a><br /><a href="https://github.com/zerobias/effector/commits?author=hexagon141" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><img src="https://avatars1.githubusercontent.com/u/22044607?v=4" width="100px;" alt="Egor Guscha"/><br /><sub><b>Egor Guscha</b></sub><br /><a href="https://github.com/zerobias/effector/commits?author=egorguscha" title="Documentation">📖</a></td>
    <td align="center"><img src="https://avatars0.githubusercontent.com/u/47696795?v=4" width="100px;" alt="bakugod"/><br /><sub><b>bakugod</b></sub><br /><a href="https://github.com/zerobias/effector/commits?author=bakugod" title="Documentation">📖</a> <a href="#example-bakugod" title="Examples">💡</a></td>
    <td align="center"><img src="https://avatars0.githubusercontent.com/u/29141708?v=4" width="100px;" alt="Ruslan"/><br /><sub><b>Ruslan</b></sub><br /><a href="https://github.com/zerobias/effector/commits?author=doasync" title="Documentation">📖</a> <a href="https://github.com/zerobias/effector/commits?author=doasync" title="Code">💻</a> <a href="#ideas-doasync" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/zerobias/effector/commits?author=doasync" title="Tests">⚠️</a></td>
    <td align="center"><img src="https://avatars2.githubusercontent.com/u/7874664?v=4" width="100px;" alt="Maxim Alyoshin"/><br /><sub><b>Maxim Alyoshin</b></sub><br /><a href="https://github.com/zerobias/effector/commits?author=mg901" title="Documentation">📖</a></td>
    <td align="center"><img src="https://avatars0.githubusercontent.com/u/25362218?v=4" width="100px;" alt="Andrey Gopienko"/><br /><sub><b>Andrey Gopienko</b></sub><br /><a href="https://github.com/zerobias/effector/commits?author=tehSLy" title="Documentation">📖</a></td>
    <td align="center"><img src="https://avatars2.githubusercontent.com/u/13759065?v=4" width="100px;" alt="Vadim Ivanov"/><br /><sub><b>Vadim Ivanov</b></sub><br /><a href="https://github.com/zerobias/effector/commits?author=ivanov-v" title="Documentation">📖</a></td>
    <td align="center"><img src="https://avatars3.githubusercontent.com/u/14825383?v=4" width="100px;" alt="Aleksandr Anokhin"/><br /><sub><b>Aleksandr Anokhin</b></sub><br /><a href="https://github.com/zerobias/effector/commits?author=sanohin" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><img src="https://avatars2.githubusercontent.com/u/4208480?v=4" width="100px;" alt="Anton Kosykh"/><br /><sub><b>Anton Kosykh</b></sub><br /><a href="https://github.com/zerobias/effector/commits?author=Kelin2025" title="Code">💻</a></td>
    <td align="center"><img src="https://avatars0.githubusercontent.com/u/1109562?v=4" width="100px;" alt="Konstantin Lebedev"/><br /><sub><b>Konstantin Lebedev</b></sub><br /><a href="#example-RubaXa" title="Examples">💡</a></td>
    <td align="center"><img src="https://avatars3.githubusercontent.com/u/1121997?v=4" width="100px;" alt="Pavel Tereschenko"/><br /><sub><b>Pavel Tereschenko</b></sub><br /><a href="https://github.com/zerobias/effector/commits?author=bigslycat" title="Code">💻</a></td>
    <td align="center"><img src="https://avatars2.githubusercontent.com/u/29819102?v=4" width="100px;" alt="Satya Rohith"/><br /><sub><b>Satya Rohith</b></sub><br /><a href="https://github.com/zerobias/effector/commits?author=satyarohith" title="Documentation">📖</a></td>
    <td align="center"><img src="https://avatars1.githubusercontent.com/u/13378944?v=4" width="100px;" alt="Vladislav Melnikov"/><br /><sub><b>Vladislav Melnikov</b></sub><br /><a href="https://github.com/zerobias/effector/commits?author=vladmelnikov" title="Code">💻</a></td>
    <td align="center"><img src="https://avatars3.githubusercontent.com/u/15311091?v=4" width="100px;" alt="Grigory Zaripov"/><br /><sub><b>Grigory Zaripov</b></sub><br /><a href="https://github.com/zerobias/effector/commits?author=gzaripov" title="Code">💻</a></td>
    <td align="center"><img src="https://avatars1.githubusercontent.com/u/37388187?v=4" width="100px;" alt="Marina Miyaoka"/><br /><sub><b>Marina Miyaoka</b></sub><br /><a href="https://github.com/zerobias/effector/commits?author=miyaokamarina" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><img src="https://avatars2.githubusercontent.com/u/35740512?v=4" width="100px;" alt="Evgeny Zakharov"/><br /><sub><b>Evgeny Zakharov</b></sub><br /><a href="https://github.com/zerobias/effector/commits?author=risenforces" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

[MIT](LICENSE)
