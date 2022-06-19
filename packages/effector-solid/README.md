# effector-solid

SolidJS bindings for [effector](https://www.npmjs.com/package/effector)

## Installation

```bash
npm install --save effector effector-solid
```

Or using `yarn`

```bash
yarn add effector effector-solid
```

Or using `pnpm`

```bash
pnpm add effector effector-solid
```

## Usage

```js
import {createStore, combine, createEvent} from 'effector'

import {useUnit} from 'effector-solid'

const inputText = createEvent()

const $text = createStore('').on(inputText, (_, text) => text)

const $size = createStore(0).on(inputText, (_, text) => text.length)

const Form = () => {
  const {
    text,
    size
  } = useUnit({
    size: $size,
    text: $text
  })

  return (
    <form>
      <input
        type="text"
        onInput={e => inputText(e.currentTarget.value)}
        value={text()}
      />
      <p>Length: {size}</p>
    </form>
  )
}
```

- [useUnit](https://effector.dev/docs/api/effector-solid/useUnit) in docs
- [createStore](https://effector.dev/docs/api/effector/createStore) in docs
- [combine](https://effector.dev/docs/api/effector/combine) in docs
- [createEvent](https://effector.dev/docs/api/effector/createEvent) in docs
