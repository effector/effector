---
id: example-forms
title: Forms
---

## Example 1

```js
import React from 'react'
import ReactDOM from 'react-dom'
import {createEffect, createStore, createEvent, sample} from 'effector'
import {useStore, useStoreMap} from 'effector-react'

const sendFormFx = createEffect(params => {
  console.log(params)
})
const submitted = createEvent()
const setField = createEvent()
const handleChange = setField.prepend(e => ({
  key: e.target.name,
  value: e.target.value,
}))

const $form = createStore({}).on(setField, (fields, {key, value}) => ({
  ...fields,
  [key]: value,
}))

sample({
  clock: submitted,
  source: $form,
  target: sendFormFx,
})

const Field = ({name, type, label}) => {
  const value = useStoreMap({
    store: $form,
    keys: [name],
    fn: values => values[name] ?? '',
  })

  return (
    <div>
      {label}{' '}
      <input name={name} type={type} value={value} onChange={handleChange} />
    </div>
  )
}

const App = () => {
  const handleSubmit = e => {
    e.preventDefault()
  }
  return (
    <form onSubmit={handleSubmit}>
      <Field name="login" label="Login" />
      <Field name="password" type="password" label="Password" />
      <button type="submit">Submit!</button>
    </form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

[Try it](https://share.effector.dev/7MLIhEFC)

Let's break down the code above.

These are just events & effects definitions.

```js
const sendFormFx = createEffect(params => {
  console.log(params)
})
const submitted = createEvent() // will be used further, and indicates, we have an intention to submit form
const setField = createEvent() //has intention to change $form's state in a way, defined in reducer further
const $form = createStore({}).on(setField, (fields, {key, value}) => ({
  ...fields,
  [key]: value,
}))
```

Next piece of code shows how we can obtain a state in effector in a right way. This kind of state retrieving provides state consistency, and removes any possible race conditions, which can occur in some cases, when using `getState`.

```js
sample({
  clock: submitted, // when `submitted` is triggered
  source: $form, // Take LATEST state from $form, and
  target: sendFormFx, // pass it to `sendFormFx`, in other words -> sendFormFx(state)
  //fn: (sourceState, clockParams) => transformedData // we could additionally transform data here, but if we need just pass source's value, we may omit this property
})
```

So far, so good, we've almost set up our model (events, effects and stores). Next thing is to create event, which will be used as `onChange` callback, which requires some data transformation, before data appear in `setField` event.

```js
const handleChange = setField.prepend(e => ({
  key: e.target.name,
  value: e.target.value,
})) // upon trigger `handleChange`, passed data will be transformed in a way, described in function above, and returning value will be passed to original `setField` event.
```

Next, we have to deal with how inputs should work. [`useStoreMap`](/api/effector-react/useStoreMap.md) hook here prevents component rerender upon non-relevant changes.

```jsx
const Field = ({name, type, label}) => {
  const value = useStoreMap({
    store: $form, // take $form's state
    keys: [name], // watch for changes of `name`
    fn: values => values[name] || '', // retrieve data from $form's state in this way (note: there will be an error, if undefined is returned)
  })

  return (
    <div>
      {label}{' '}
      <input
        name={name}
        type={type}
        value={value}
        onChange={handleChange /*note, bound event is here!*/}
      />
    </div>
  )
}
```

And, finally, the `App` itself! Note, how we got rid of any business-logic in view layer. It's simpler to debug, to share logic, and even more: logic is framework independent now.

```js
const App = () => {
  const handleSubmit = e => {
    e.preventDefault()
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <Field name="login" label="Login" />
      <Field name="password" type="password" label="Password" />
      <button type="submit">Submit!</button>
    </form>
  )
}
```
## Example 2

This example shows, how you can manage state with uncontrolled form, handling loading of data, create components which dependend on stores, transform data passed between events.

```js
import React from 'react'
import ReactDOM from 'react-dom'
import {createEffect} from 'effector'
import {useStore, createComponent} from 'effector-react'

//defining simple Effect, which results a string in 3 seconds
const sendFormFx = createEffect(
  formData =>
    new Promise(resolve =>
      setTimeout(resolve, 1000, `Signed in as [${formData.get('name')}]`)
    )
)

const onSubmit = sendFormFx.prepend(e => new FormData(e.target)) //transforming upcoming data, from DOM Event to FormData

//applying side-effect, upon sendFormFx `doneData`
sendFormFx.doneData.watch(result => {
  console.log(result)
})

const Loader = () => {
  //approach #1: explicit store usage, with hook `useStore`
  const loading = useStore(sendFormFx.pending) //typeof loading === "boolean"

  return loading ? <div>Loading...</div> : null
}

const SubmitButton = createComponent(sendFormFx.pending, (props, loading) => (
  //approach #2: implicit store usage
  <button disabled={loading} type="submit">
    Submit
  </button>
))

const App = () => {
  const handleSubmit = e => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={onSubmit}>
      Login: <input name="name" />
      <br />
      Password: <input name="password" type="password" />
      <br />
      <Loader />
      <SubmitButton />
    </form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

[Try it](https://share.effector.dev/7MCCii5k)
