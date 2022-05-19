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

import {useStore} from 'effector-solid'

const inputText = createEvent()

const $text = createStore('').on(inputText, (_, text) => text)

const $size = createStore(0).on(inputText, (_, text) => text.length)

const Form = () => {
  const size = useStore($size)
  const text = useStore($text)

  return (
    <form>
      <input
        type="text"
        onChange={e => inputText(e.currentTarget.value)}
        value={text()}
      />
      <p>Length: {size}</p>
    </form>
  )
}
```

[useStore](https://effector.dev/docs/api/effector-solid/useStore) in docs
[createStore](https://effector.dev/docs/api/effector/createStore) in docs
[combine](https://effector.dev/docs/api/effector/combine) in docs
[createEvent](https://effector.dev/docs/api/effector/createEvent) in docs
