# Effector-DOM

## Declarative stack-based DOM api

### Usage

```js
import {createStore, createEvent} from 'effector'
import {using, spec, list, h} from 'effector-dom'

using(document.body, () => {
  const addLine = createEvent()
  const code = createStore('let foo = 0;').on(
    addLine,
    code => `${code}\nfoo += ${Math.random()}`,
  )

  h('section', () => {
    spec({data: {timelineNames: true}})
    list(timelineRows, ({store}) => {
      h('div', {
        data: {timelineName: true},
        text: store,
      })
    })
  })
  h('section', () => {
    spec({data: {section: 'controls'}})
    h('button', {
      handler: {click: addLine},
      text: 'Add line',
    })
  })
})
```

**Component is just a plain function**

```js
function VizionSectionHeader(text) {
  h('header', () => {
    spec({data: {vizionSectionHeader: true}})
    h('h4', {
      text,
    })
  })
}
```
