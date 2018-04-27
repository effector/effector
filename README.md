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

```js
import { createStore, createEvent, createEffect } from 'effector'

const changeText = createEvent('change todo text')
const clickSave = createEvent('click save')
const toggleComplete = createEvent('toggle complete')
const resetForm = createEvent('reset form')
const addTodo = createEvent('add todo')
const fetchSaveTodo = createEffect('save request')

const todos = createStore([]).on(fetchSaveTodo.done, (state, { params }) => [
 ...state,
 params,
])

const form = createStore({
 text: '',
 complete: false,
})
 .reset(resetForm)
 .on(changeText, (state, text) => ({
  ...state,
  text,
 }))
 .on(toggleComplete, state => ({
  ...state,
  complete: !state.complete,
 }))
```

## Typings

Effector supports both TypeScript and Flow type annotations out of the box.

## API

```js
import { createEvent, createEffect, createDomain, createStore } from 'effector'
```

## Core types

```js
import type { Domain, Event, Effect, Store } from 'effector'
```
