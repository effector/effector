# forest

## UI engine for web

### Usage

```js
import {createStore, createEvent, sample} from 'effector'
import {using, spec, h} from 'forest'

using(document.body, () => {
  const {change, submit, state} = formModel()

  h('section', () => {
    spec({style: {width: '15em'}})

    h('form', () => {
      spec({
        handler: {submit},
        style: {
          display: 'flex',
          flexDirection: 'column'
        }
      })

      h('input', {
        attr: {placeholder: 'Username'},
        handler: {input: change('username')}
      })

      h('input', {
        attr: {type: 'password', placeholder: 'Password'},
        handler: {input: change('password')}
      })

      h('button', {
        text: 'Submit',
        attr: {
          disabled: state.map(values => !(values.username && values.password))
        }
      })
    })

    h('section', () => {
      spec({style: {marginTop: '1em'}})
      h('div', {text: 'Reactive form debug:'})
      h('pre', {text: state.map(stringify)})
    })
  })
})

function formModel() {
  const state = createStore({})
  const changed = createEvent()
  const submit = createEvent()

  state.on(changed, (data, {name, value}) => ({...data, [name]: value}))

  const change = name =>
    changed.prepend(e => ({name, value: e.target.value}))

  sample({
    source: state,
    clock: submit,
    fn: stringify
  }).watch(alert)

  return {change, submit, state}
}

function stringify(values) {
  return JSON.stringify(values, null, 2)
}
```
