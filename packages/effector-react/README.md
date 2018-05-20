# Effector-react

React bindings for [effector](https://www.npmjs.com/package/effector)

## Installation

```bash
npm install --save effector effector-react
```

Or using `yarn`

```bash
yarn add effector effector-react
```

## Usage

[![Edit Effector-react example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vmx6wxww43)

```js
import {createStore, createStoreObject, createEvent} from 'effector'

import {createStoreConsumer} from 'effector-react'

const inputText = createEvent('input text')
const text = createStore('').on(inputText, (state, payload) => payload)

const length = createStore(0).on(inputText, (state, payload) => payload.length)

const store = createStoreObject({
 text,
 length,
})

const FormStore = createStoreConsumer(store)

const Form = () => (
 <FormStore>
  {state => (
   <form>
    <input
     type="text"
     onChange={e => inputText(e.currentTarget.value)}
     value={state.text}
    />
    <p>Length: {state.length}</p>
   </form>
  )}
 </FormStore>
)
```
