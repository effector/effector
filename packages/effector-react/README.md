# effector-react

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

```js
import {createStore, combine, createEvent} from 'effector'
import {useStore} from 'effector-react'

const inputText = createEvent()

const $text = createStore('')
  .on(inputText, (_, text) => text)
const $size = createStore(0)
  .on(inputText, (_, text) => text.length)

const $form = combine({
  text: $text,
  size: $size,
})

const Form = () => {
  const {text, size} = useStore($form)
  const handleChange = e => inputText(e.currentTarget.value)

  return (
    <form>
      <input type="text" onChange={handleChange} value={text} />
      <p>Length: {size}</p>
    </form>
  )
}

ReactDOM.render(<Form />, document.getElementById('root'))
```

[Try it](https://share.effector.dev/dYIeUQ2o)

[useStore](https://effector.dev/docs/api/effector-react/useStore) in docs
[createStore](https://effector.dev/docs/api/effector/createStore) in docs
[combine](https://effector.dev/docs/api/effector/combine) in docs
[createEvent](https://effector.dev/docs/api/effector/createEvent) in docs
