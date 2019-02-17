# ☄️ Effector

Reactive state manager

[![npm version](https://badge.fury.io/js/effector.svg)](https://badge.fury.io/js/effector) [ ![Codeship Status for zerobias/effector](https://app.codeship.com/projects/67f481f0-2c7e-0136-030e-1a8413355f0c/status?branch=master)](https://app.codeship.com/projects/288022) [![Build Status](https://semaphoreci.com/api/v1/zerobias/effector/branches/master/shields_badge.svg)](https://semaphoreci.com/zerobias/effector) [![Join the chat at https://
.im/effector-js/community](https://badges.gitter.im/effector-js/community.svg)](https://gitter.im/effector-js/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Motivation](#motivation)
- [Installation](#installation)
- [About](#about)
  - [Hello world with events and nodejs](#hello-world-with-events-and-nodejs)
  - [Storages and events](#storages-and-events)
- [Demo](#demo)
- [Documentation](#documentation)
- [Usage](#usage)
  - [Domain hooks](#domain-hooks)
- [Typings](#typings)
- [API](#api)
- [Core types](#core-types)
- [Contributors](#contributors)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Motivation

At the start (early 2018) we had a lot of state-managers, those solve actual problems, but not elegant and with some limitations.

Effector tries to solve all [state-manager's] user problems and most parts of limitations. Primary:

- [x] Developer-friendly, [static] type safe and inference, boilerplate free, insinuating API.
- [x] Maximum update (state and subscribers) performance or minimum library performance cost by compile time / initial runtime computation.
- [x] Modular, isomorphic, flexible.
- [x] Tiny bundle size.

## Installation

```bash
npm install --save effector effector-react
```

Or using `yarn`

```bash
yarn add effector effector-react
```

## About

Effector provides events and reactive storages for node.js and browsers

### Hello world with events and nodejs

[repl](https://runkit.com/zerobias/effector-hello-world)

[example file](/examples/hello-world.js)

```js
const {createEvent} = require('effector')

const messageEvent = createEvent('message event (optional description)')

messageEvent.watch(text => console.log(`new message: ${text}`))

messageEvent('hello world')
// => new message: hello world
```

### Storages and events

[repl](https://runkit.com/zerobias/effector-storages-and-events)

[example file](/examples/storages-and-events.js)

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

## Demo

> [![Edit Effector-react example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vmx6wxww43) Basic example

> [![Edit Effector-react example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/1y6n4r6o57)  SSR example

## Documentation

- [Glossary](https://github.com/zerobias/effector/wiki/Glossary)
- [API Reference](https://github.com/zerobias/effector/wiki/API-Reference)

## Usage

```js
import {createStore, createEvent} from 'effector'
import {createComponent} from 'effector-react'

const increment = createEvent('increment')
const decrement = createEvent('decrement')
const resetCounter = createEvent('reset counter')

const counter = createStore(0)
  .on(increment, state => state + 1)
  .on(decrement, state => state - 1)
  .reset(resetCounter)

counter.watch(console.log)

const Counter = createComponent(counter, (props, counter) => (
  <>
    <div>{counter}</div>
    <button onClick={increment}>+</button>
    <button onClick={decrement}>-</button>
    <button onClick={resetCounter}>reset</button>
  </>
))

const App = () => <Counter />
```

### Domain hooks

- onCreateEvent
- onCreateEffect
- onCreateStore
- onCreateDomain (to handle nested domains)

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

## Typings

Effector supports both TypeScript and Flow type annotations out of the box.

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

> See also [Wiki](https://github.com/zerobias/effector/wiki/Glossary)

## Core types

```js
import type {Domain, Event, Effect, Store} from 'effector'
```

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/15912112?v=4" width="100px;"/><br /><sub><b>Dmitry</b></sub>](https://zerobias.net)<br />[💬](#question-zerobias "Answering Questions") [💻](https://github.com/zerobias/effector/commits?author=zerobias "Code") [📖](https://github.com/zerobias/effector/commits?author=zerobias "Documentation") [💡](#example-zerobias "Examples") [🤔](#ideas-zerobias "Ideas, Planning, & Feedback") [🚇](#infra-zerobias "Infrastructure (Hosting, Build-Tools, etc)") [⚠️](https://github.com/zerobias/effector/commits?author=zerobias "Tests") | [<img src="https://avatars2.githubusercontent.com/u/3275424?v=4" width="100px;"/><br /><sub><b>andretshurotshka</b></sub>](https://github.com/goodmind)<br />[💬](#question-goodmind "Answering Questions") [💻](https://github.com/zerobias/effector/commits?author=goodmind "Code") [📖](https://github.com/zerobias/effector/commits?author=goodmind "Documentation") [📦](#platform-goodmind "Packaging/porting to new platform") [⚠️](https://github.com/zerobias/effector/commits?author=goodmind "Tests") | [<img src="https://avatars0.githubusercontent.com/u/5620073?v=4" width="100px;"/><br /><sub><b>Sergey Sova</b></sub>](https://sergeysova.com)<br />[📖](https://github.com/zerobias/effector/commits?author=sergeysova "Documentation") [💡](#example-sergeysova "Examples") | [<img src="https://avatars0.githubusercontent.com/u/27290320?v=4" width="100px;"/><br /><sub><b>Arutyunyan Artyom</b></sub>](https://t.me/artalar)<br />[📖](https://github.com/zerobias/effector/commits?author=artalar "Documentation") [💡](#example-artalar "Examples") |
| :---: | :---: | :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

[MIT](LICENSE)
