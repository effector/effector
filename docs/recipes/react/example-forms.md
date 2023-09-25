---
id: example-forms
title: Forms
---

## Example 1

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {createEffect, createStore, createEvent, sample} from 'effector'
import {useStore, useStoreMap} from 'effector-react'

const submitted = createEvent()
const setField = createEvent()

const sendFormFx = createEffect(params => {
  console.log(params)
})

const $form = createStore({}).on(setField, (s, {key, value}) => ({
  ...s,
  [key]: value,
}))

sample({
  clock: submitted,
  source: $form,
  target: sendFormFx,
})

const handleChange = setField.prepend(e => ({
  key: e.target.name,
  value: e.target.value,
}))

const Field = ({name, type, label}) => {
  const value = useStoreMap({
    store: $form,
    keys: [name],
    fn: values => values[name] || '',
  })
  return (
    <div>
      {label}{' '}
      <input name={name} type={type} value={value} onChange={handleChange} />
    </div>
  )
}

const App = () => (
  <form onSubmit={submitted}>
    <Field name="login" label="Login" />
    <Field name="password" type="password" label="Password" />
    <button type="submit">Submit!</button>
  </form>
)

submitted.watch(e => {
  e.preventDefault()
})

ReactDOM.render(<App />, document.getElementById('root'))
```

[Try it](https://share.effector.dev/G2WBDwZP)

Let's break down the code above.

These are just events & effects definitions.

```js
const sendFormFx = createEffect(params => {
  console.log(params)
})
const submitted = createEvent() // will be used further, and indicates, we have an intention to submit form
const setField = createEvent() //has intention to change $form's state in a way, defined in reducer further
const $form = createStore({}).on(setField, (s, {key, value}) => ({
  ...s,
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

```jsx
const App = () => (
  <form
    onSubmit={submitted /*note, there is an event, which is clock for sample*/}>
    <Field name="login" label="Login" />
    <Field name="password" type="password" label="Password" />
    <button type="submit">Submit!</button>
  </form>
)
```

Prevent default html form submit behavior using react event from `submitted`

```js
submitted.watch(e => {
  e.preventDefault()
})
```

## Example 2

This example demonstrates how to manage state using an uncontrolled form, handle data loading, create components that depend on stores, and transform data passed between events.

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import {createEffect, createStore} from 'effector'
import {useStore, createComponent} from 'effector-react'

//defining simple Effect, which results a string in 3 seconds
const sendFormFx = createEffect(
  formData =>
    new Promise(rs =>
      setTimeout(rs, 1000, `Signed in as [${formData.get('name')}]`),
    ),
)

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

const onSubmit = sendFormFx.prepend(e => new FormData(e.target)) //transforming upcoming data, from DOM Event to FormData

onSubmit.watch(e => {
  e.preventDefault()
})

const App = () => (
  <form onSubmit={onSubmit}>
    Login: <input name="name" />
    <br />
    Password: <input name="password" type="password" />
    <br />
    <Loader />
    <SubmitButton />
  </form>
)

ReactDOM.render(<App />, document.getElementById('root'))
```

[Try it](https://share.effector.dev/yhE6HfCt)
