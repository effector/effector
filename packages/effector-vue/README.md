# effector-vue

Vue bindings for [effector](https://www.npmjs.com/package/effector)

## Installation

```bash
npm install --save effector effector-vue
```

Or using `yarn`

```bash
yarn add effector effector-vue
```

## Usage

```js
import {createStore, createEvent} from 'effector'

export const inputText = createEvent()

export const $text = createStore('').on(inputText, (_, text) => text)

export const $size = $text.map(text => text.length)
```

```html
<script lang="ts" setup>
  import {useUnit} from 'effector-vue/composition'
  import {$text, $size, inputText} from './model'

  const text = useUnit($text)
  const size = useUnit($size)

  const handleTextChange = useUnit(inputText)
</script>

<template>
  <form>
    <input
      type="text"
      @input="(e) => handleTextChange(e.currentTarget.value)"
      :value="text"
    />
    <p>Length: {{ size }}</p>
  </form>
</template>
```

[Try it](https://playcode.io/1914159)

[useUnit](https://effector.dev/docs/api/effector-react/useUnit) in docs
[Units](https://effector.dev/docs/glossary#unit) in docs
[createStore](https://effector.dev/docs/api/effector/createStore) in docs
[createEvent](https://effector.dev/docs/api/effector/createEvent) in docs
