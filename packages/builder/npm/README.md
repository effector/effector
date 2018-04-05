# Effector

Side-effect manager for redux

## Installation

```bash
npm install --save effector
```

Or using `yarn`

```bash
yarn add effector
```

## Usage

See examples

[![Edit Effective redux](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/5k41l10xpl?module=%2Fsrc%2Flogic.js)
[![Edit 7ykkowx82j](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/7ykkowx82j?module=%2Fsrc%2Flogic.js)


```js
import {createStore, applyMiddleware} from 'redux'

import {
  createRootDomain,
  createReducer,
  joint,
  type Domain,
  type Event,
  type Effect,
  effectorMiddleware,
} from 'effector'

const domain: Domain<Store> = createRootDomain()

const changeText: Event<string> = domain.event('change todo text')
const clickSave = domain.event('click save')
const toggleComplete = domain.event('toggle complete')
const resetForm = domain.event('reset form')
const addTodo: Event<{text: string, complete: boolean}> =
  domain.event('add todo')
const fetchSaveTodo: Effect<Todo, 'saved', Error> =
  domain.effect('save request')

const todos = createReducer([])
  .on(fetchSaveTodo.done, (state, {params}) => [
    ...state,
    params,
  ])

const form = createReducer({
  text: '',
  complete: false,
}).reset(resetForm)
  .on(changeText, (state, text) => ({
    ...state,
    text,
  }))
  .on(toggleComplete, state => ({
    ...state,
    complete: !state.complete,
  }))

fetchSaveTodo.use(
  params => fetch(params)
)

fetchSaveTodo.done.watch(() => resetForm())

clickSave.epic(
  (data$, state$) => state$
    .sampleWith(data$)
    .throttle(500)
    .map(({form}) => form)
    .map(addTodo)
)

addTodo.watch(
  (params, state) => fetchSaveTodo({
    text: params.text,
    complete: params.complete,
    date: new Date(),
  })
)



const stateReducer: Reducer<Store> = joint(
  (form, todos) => ({form, todos}),
  form,
  todos,
)

const store = createStore(
  stateReducer,
  applyMiddleware(effectorMiddleware),
)

domain.register(store)

type Store = {
  todos: Todo[],
  form: {
    text: string,
    complete: boolean,
  },
}

type Todo = {
  text: string,
  date: Date,
  complete: boolean,
}

```

## Typings
Effector supports both TypeScript and Flow type annotations out of the box.

## API

```js
import {
  effectorMiddleware,
  createRootDomain,
  createReducer,
  joint,
} from 'effector'

```

## Core types

```js
import type {Domain, Event, Effect, Reducer} from 'effector'
```
