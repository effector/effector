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

## Usage

See examples

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

## Core types

```js
import type {Domain, Event, Effect, Store} from 'effector'
```
