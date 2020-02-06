# Effector-DOM

## Declarative stack-based DOM api

### Usage

```js
import {createStore, createEvent} from 'effector'
import {using, spec, list, h} from 'effector-dom'

using(document.body, () => {
  const addLine = createEvent()
  const code = createStore(['let foo = 0']).on(addLine, list => [
    ...list,
    `foo += ${Math.random()}`,
  ])
  const color = createStore('cornsilk').on(addLine, color => {
    switch (color) {
      case 'cornsilk':
        return 'aliceblue'
      case 'aliceblue':
        return 'cornsilk'
    }
  })

  h('section', () => {
    spec({
      style: {
        backgroundColor: color,
        padding: '1em',
      },
    })
    list(code, ({store}) => {
      h('div', {text: store})
    })
  })
  h('section', () => {
    spec({data: {section: 'controls'}})
    h('button', {
      handler: {click: addLine},
      text: 'Add line',
      style: {padding: '1em'},
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

[Try it](https://share.effector.dev/f5JeF7Mb)
