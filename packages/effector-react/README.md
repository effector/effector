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

import {useUnit} from 'effector-react'

const inputText = createEvent()

const $text = createStore('').on(inputText, (_, text) => text)

const $size = $text.map(text => text.length)

const Form = () => {
  const {text, size} = useUnit({
    text: $text,
    size: $size,
  })
  const handleTextChange = useUnit(inputText)

  return (
    <form>
      <input
        type="text"
        onChange={e => handleTextChange(e.currentTarget.value)}
        value={text}
      />
      <p>Length: {size}</p>
    </form>
  )
}
```

[Try it](https://share.effector.dev/gjsgk6oh)

[useUnit](https://effector.dev/docs/api/effector-react/useUnit) in docs
[Units](https://effector.dev/docs/glossary#unit) in docs
[createStore](https://effector.dev/docs/api/effector/createStore) in docs
[createEvent](https://effector.dev/docs/api/effector/createEvent) in docs
