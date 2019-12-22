# Effector-DOM

## Declarative stack-based DOM api

### Usage

```js
import {createStore, createEvent} from 'effector'
import {using, Data, Text, Handler, h} from 'effector-dom'

using(document.body, () => {
  const addLine = createEvent()
  const code = createStore('let foo = 0;')
    .on(addLine, code => `${code}\nfoo += ${Math.random()}`)
  
  
  h('section', () => {
    Data({timelineNames: true})
    List(timelineRows, ({store}) => {
      h('div', () => {
        Data({timelineName: true})
        Text(store)
      })
    })
  })
  h('section', () => {
    Data({section: 'controls'})
    h('button', () => {
      Handler({click: addLine})
      Text('Add line')
    })
  })
})
```

**Component is just a plain function**
```js
function VizionSectionHeader(text) {
  h('header', () => {
    Data({vizionSectionHeader: true})
    h('h4', () => {
      Text(text)
    })
  })
}
```
