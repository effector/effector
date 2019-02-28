# ☄️ Effector

### Reactive state manager

[![npm version](https://badge.fury.io/js/effector.svg)](https://badge.fury.io/js/effector) [ ![Codeship Status for zerobias/effector](https://app.codeship.com/projects/67f481f0-2c7e-0136-030e-1a8413355f0c/status?branch=master)](https://app.codeship.com/projects/288022) [![Build Status](https://semaphoreci.com/api/v1/zerobias/effector/branches/master/shields_badge.svg)](https://semaphoreci.com/zerobias/effector)
[![Join the chat at https://
.im/effector-js/community](https://img.shields.io/gitter/room/effector-js/community.svg?style=popout)](https://gitter.im/effector-js/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![License](https://img.shields.io/npm/l/effector.svg?colorB=brightgreen&style=popout)

## Introduction

Effector is an effective multi store state manager for Javascript apps __(React/Vue/Node.js)__, that allows you to manage data in complex applications without the risk of inflating the monolithic central store, with clear control flow, good support types and high capacity API. Effector supports both TypeScript and Flow type annotations out of the box.

A more detailed comparison with other state managers can be found [here]()

### Effector follows five basic principles:
- __Application stores should be as light as possible__ - the idea of adding a store for specific needs should not be frightening or damaging to the developer. Stores should be freely combined - the idea is that the data that an application needs can be distributed statically, showing how it will be converted during application operation.
- __Application stores should be freely combined__ - data that the application needs can be statically distributed, showing how it will be converted in runtime.
- __Autonomy from controversial concepts__ - no decorators, no need to use classes or proxies - this is not required to control the state of the application and therefore the api library uses only functions and simple js objects
- __Predictability and clarity of API__ - A small number of basic principles are reused in different cases, reducing the user's workload and increasing recognition. For example, knowing how .watch works in events, you can guess how does function .watch in store.
- __The application is built from simple elements__ - space and way to take any required business logic out of view, maximizing the simplicity of the components.

## Installation

```bash
npm install --save effector
```

Or using `yarn`

```bash
yarn add effector
```

### Additional packages:
* __For Web Framework/Libraries:__

  |               Package              |                                                       Version                                                       |                                                                             Dependencies                                                                             |
  | :--------------------------------: | :-----------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
  | [`effector-react`](effector-react) | [![npm](https://img.shields.io/npm/v/effector-react.svg?maxAge=3600)](https://www.npmjs.com/package/effector-react) | [![Dependency Status](https://david-dm.org/zerobias/effector.svg?path=packages/effector-react)](https://david-dm.org/zerobias/effector?path=packages/effector-react) |
  |   [`effector-vue`](effector-vue)   |   [![npm](https://img.shields.io/npm/v/effector-vue.svg?maxAge=3600)](https://www.npmjs.com/package/effector-vue)   |   [![Dependency Status](https://david-dm.org/zerobias/effector.svg?path=packages/effector-vue)](https://david-dm.org/zerobias/effector?path=packages/effector-vue)   |
* __For another languages:__

  |                  Package                 |                                                          Version                                                          |                                                                                Dependencies                                                                                |
  | :--------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
  |       [`bs-effector`](bs-effector)       |       [![npm](https://img.shields.io/npm/v/bs-effector.svg?maxAge=3600)](https://www.npmjs.com/package/bs-effector)       |       [![Dependency Status](https://david-dm.org/zerobias/effector.svg?path=packages/bs-effector)](https://david-dm.org/zerobias/effector?path=packages/bs-effector)       |
  | [`bs-effector-react`](bs-effector-react) | [![npm](https://img.shields.io/npm/v/bs-effector-react.svg?maxAge=3600)](https://www.npmjs.com/package/bs-effector-react) | [![Dependency Status](https://david-dm.org/zerobias/effector.svg?path=packages/bs-effector-react)](https://david-dm.org/zerobias/effector?path=packages/bs-effector-react) |

## Examples

### Incremet/decremet
```js
import {createStore, createEvent} from "effector";
import {createComponent} from "effector-react";

const increment = createEvent("increment");
const decrement = createEvent("decrement");
const resetCounter = createEvent("reset counter");

const counter = createStore(0)
  .on(increment, state => state + 1)
  .on(decrement, state => state - 1)
  .reset(resetCounter);

counter.watch(console.log);

const Counter = createComponent(counter, (props, counter) => (
  <>
    <div>{counter}</div>
    <button onClick={increment}>+</button>
    <button onClick={decrement}>-</button>
    <button onClick={resetCounter}>reset</button>
  </>
));

const App = () => <Counter />;
```

### Hello world with events and nodejs

```js
const {createEvent} = require('effector')


const messageEvent = createEvent('message event (optional description)')

messageEvent.watch(text => console.log(`new message: ${text}`))

messageEvent('hello world')
// => new message: hello world
```
#### [Run example](https://runkit.com/zerobias/effector-hello-world)

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

turnOff()
turnOn()
turnOff()
turnOff() // Will not trigger watch function because nothing has changed

/*
result:

status changed: offline
status changed: online
status changed: offline
*/

```

#### [Run example](https://runkit.com/zerobias/effector-storages-and-events)

## Demo

> [![Edit Effector-react example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vmx6wxww43) Basic example

> [![Edit Effector-react example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/1y6n4r6o57) SSR example

### More examples/demo you can check [here]()
 

## Core concept
### Core types

```js
import type {Domain, Event, Effect, Store} from 'effector'
```


## [Wiki](https://github.com/zerobias/effector/wiki/Glossary)

### Domain hooks

* onCreateEvent
* onCreateEffect
* onCreateStore
* onCreateDomain (to handle nested domains)

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

## API

```js
import {
 createEvent,
 createEffect,
 createDomain,
 createStore,
 createStoreObject,
} from 'effector'
```

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/15912112?v=4" width="100px;"/><br /><sub><b>Dmitry</b></sub>](https://zerobias.net)<br />[💬](#question-zerobias "Answering Questions") [💻](https://github.com/zerobias/effector/commits?author=zerobias "Code") [📖](https://github.com/zerobias/effector/commits?author=zerobias "Documentation") [💡](#example-zerobias "Examples") [🤔](#ideas-zerobias "Ideas, Planning, & Feedback") [🚇](#infra-zerobias "Infrastructure (Hosting, Build-Tools, etc)") [⚠️](https://github.com/zerobias/effector/commits?author=zerobias "Tests") | [<img src="https://avatars2.githubusercontent.com/u/3275424?v=4" width="100px;"/><br /><sub><b>andretshurotshka</b></sub>](https://github.com/goodmind)<br />[💬](#question-goodmind "Answering Questions") [💻](https://github.com/zerobias/effector/commits?author=goodmind "Code") [📖](https://github.com/zerobias/effector/commits?author=goodmind "Documentation") [📦](#platform-goodmind "Packaging/porting to new platform") [⚠️](https://github.com/zerobias/effector/commits?author=goodmind "Tests") | [<img src="https://avatars0.githubusercontent.com/u/5620073?v=4" width="100px;"/><br /><sub><b>Sergey Sova</b></sub>](https://sergeysova.com)<br />[📖](https://github.com/zerobias/effector/commits?author=sergeysova "Documentation") [💡](#example-sergeysova "Examples") | [<img src="https://avatars0.githubusercontent.com/u/27290320?v=4" width="100px;"/><br /><sub><b>Arutyunyan Artyom</b></sub>](https://t.me/artalar)<br />[📖](https://github.com/zerobias/effector/commits?author=artalar "Documentation") [💡](#example-artalar "Examples") |
| :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

[MIT](LICENSE)
