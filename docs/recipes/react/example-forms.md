---
id: example-forms
title: Forms
---

#### Example 1

```js try
import React from 'react'
import ReactDOM from 'react-dom'
import {createEffect, createStore, createEvent, sample} from 'effector'
import {useStore, useStoreMap} from 'effector-react'

const sendFormFx = createEffect({handler: console.log})
const submitted = createEvent()
const setField = createEvent()
const $form = createStore({}).on(setField, (s, {key, value}) => ({
  ...s,
  [key]: value,
}))

sample({
  source: $form,
  clock: submitted,
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
  <form action="void(0)" onSubmit={submitted}>
    <Field name="login" label="Login" />
    <Field name="password" type="password" label="Password" />
    <button type="submit">Submit!</button>
  </form>
)

ReactDOM.render(<App />, document.getElementById('root'))
```

[Try it](https://share.effector.dev/2ksW0IsZ)

Let's break down the code above.

These are just events & effects definitions. Simple.

```js
const sendFormFx = createEffect({handler: console.log})
const submitted = createEvent() // will be used further, and indicates, we have an intention to submit form
const setField = createEvent() //has intention to change $form's state in a way, defined in reducer further
const $form = createStore({}).on(setField, (s, {key, value}) => ({
  ...s,
  [key]: value,
}))
```

Next piece of code shows how we can obtain a state in Effector in a right way. This kind of state retrieving provides state consistency, and removes any possible race conditions, which can occur in some cases, when using `getState`.

```js
sample({
  source: $form, // Take LATEST state from $form, and
  clock: submitted, // when `submitted` is triggered
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

Next, we have to deal with how inputs should work. [`useStoreMap`](/api/effector-react/useStoreMap) hook here prevents component rerender upon non-relevant changes.

```js
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
const App = () => (
  <form
    action="void(0)"
    onSubmit={submitted /*note, there is an event, which is clock for sample*/}>
    <Field name="login" label="Login" />
    <Field name="password" type="password" label="Password" />
    <button type="submit">Submit!</button>
  </form>
)
```

Of course, there is much simplier way, to implement this, consider:

```js
const sendFormFx = createEffect({handler: () => console.log($store.getState())})
const changed = createEvent()
const $store = createStore({}).on(changed, (s, e) => ({
  ...s,
  [e.target.name]: e.target.value,
}))

const App = () => {
  const values = useStore($store)

  return (
    <form
      action="void(0)"
      onSubmit={sendFormFx /*note, there is an effect itself*/}>
      <input
        name="login"
        label="Login"
        onChange={changed}
        value={values.login || ''}
      />
      <input
        name="password"
        type="password"
        label="Password"
        onChange={changed}
        value={values.password || ''}
      />
      <button type="submit">Submit!</button>
    </form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

[Try it](https://share.effector.dev/GBYkPuX2)

This code is way shorter, yet has code duplication, lower scalability and less reusable. In some cases, usage of `getState` may cause state inconsistence, race conditions.

#### Example 2

This example shows, how you can manage state with uncontrolled form, handling loading of data, create components which dependend on stores, transform data passed between events.

```js try
import React from 'react'
import ReactDOM from 'react-dom'
import {createEffect, createStore} from 'effector'
import {useStore, createComponent} from 'effector-react'

const sendFormFx = createEffect({
  //defining simple Effect, which results a string in 3 seconds
  handler: formData =>
    new Promise(rs =>
      setTimeout(rs, 3000, `Signed in as [${formData.get('name')}]`),
    ),
})

const Loader = () => {
  //approach #1: explicit store usage, with hook `useStore`
  const loading = useStore(sendFormFx.pending) //typeof loading === "boolean"
  return loading ? <div>Loading...</div> : null
}

const SubmitButton = createComponent(sendFormFx.pending, (props, loading) => (
  //approach #2: implicit store usage, hooks are unsupported yet
  <button disabled={loading} type="submit">
    Submit
  </button>
))

const onSubmit = sendFormFx.prepend(e => new FormData(e.target)) //transforming upcoming data, from DOM Event to FormData

const App = () => {
  React.useEffect(() => sendFormFx.done.watch(({result}) => alert(result)), []) //applying side-effect, upon sendFormFx `done`

  return (
    <form action="javascript:void(0)" onSubmit={onSubmit}>
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

[Try it](https://share.effector.dev/hIfXZ1Kg)
