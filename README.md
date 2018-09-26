# Effector

Reactive state manager

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

Hello world with events and nodejs ([repl](https://runkit.com/zerobias/effector-hello-world))
```js
const {createEvent} = require('effector')


const messageEvent = createEvent('message event (optional description)')

messageEvent.watch(text => console.log(`new message: ${text}`))

messageEvent('hello world')
// => new message: hello world
```

## Demo

> [![Edit Effector-react example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vmx6wxww43) Basic example

> [![Edit Effector-react example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/1y6n4r6o57) SSR example

## [Wiki](https://github.com/zerobias/effector/wiki/Glossary)

## Usage

```js
import {
 createStore,
 createEvent,
 createEffect,
 createStoreObject,
} from 'effector'

import {createStoreConsumer} from 'effector-react'

const changeText = createEvent('change todo text')
const clickSave = createEvent('click save')
const toggleComplete = createEvent('toggle complete')
const resetForm = createEvent('reset form')
const addTodo = createEvent('add todo')
const fetchSaveTodo = createEffect('save request')

const todos = createStore([]).on(fetchSaveTodo.done, (state, {params}) => [
 ...state,
 params,
])

const text = createStore('').on(changeText, (_, newText) => newText)
const complete = createStore(false).on(toggleComplete, complete => !complete)

const form = createStoreObject({
 text,
 complete,
}).reset(resetForm)

const FormStore = createStoreConsumer(form)

const Form = () => (
 <FormStore>
  {form => (
   <form onSubmit={resetForm}>
    <input type="text" onChange={e => changeText(e.currentTarget.value)} />
    <button onClick={resetForm}>reset</button>
   </form>
  )}
 </FormStore>
)
```

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
