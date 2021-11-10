# forest

**UI engine for web**

## Usage

```js
import {createStore, createEvent, sample} from 'effector'
import {using, spec, h} from 'forest'

using(document.body, () => {
  const {change, submit, $fields} = formModel()

  h('section', () => {
    spec({style: {width: '15em'}})

    h('form', () => {
      spec({
        handler: {
          config: {prevent: true},
          on: {submit},
        },
        style: {
          display: 'flex',
          flexDirection: 'column',
        },
      })

      h('input', {
        attr: {placeholder: 'Username'},
        handler: {input: change('username')},
      })

      h('input', {
        attr: {type: 'password', placeholder: 'Password'},
        handler: {input: change('password')},
      })

      h('button', {
        text: 'Submit',
        attr: {
          disabled: $fields.map(fields => !(fields.username && fields.password)),
        },
      })
    })

    h('section', () => {
      spec({style: {marginTop: '1em'}})
      h('div', {text: 'Reactive form debug:'})
      h('pre', {text: $fields.map(stringify)})
    })
  })
})

function formModel() {
  const changed = createEvent()
  const submit = createEvent()

  const $fields = createStore({})
    .on(changed, (fields, {name, value}) => ({
      ...fields, [name]: value
    }))

  const change = name => changed.prepend(e => ({name, value: e.target.value}))

  sample({
    source: $fields,
    clock: submit,
    fn: stringify,
  }).watch(alert)

  return {change, submit, $fields}
}

function stringify(values) {
  return JSON.stringify(values, null, 2)
}
```

[Try it](https://share.effector.dev/e2FuOsag)

## API

### using

Start an application from given root dom node. Can accept forked [Scope](https://effector.dev/docs/api/effector/scope). Set `hydrate: true` to reuse `root` html content (useful for ssr)

```typescript
function using(root: DOMElement, fn: () => void): void

function using(
  root: DOMElement,
  config: {
    fn: () => void
    hydrate?: boolean
    scope?: Scope
  },
): void
```

### h

Declare single dom element.

```typescript
function h(tag: string, fn: () => void): void

function h(
  tag: string,
  config: {
    attr?: PropertyMap
    style?: PropertyMap
    styleVar?: PropertyMap
    data?: PropertyMap
    text?: Property | Property[]
    visible?: Store<boolean>
    handler?:
      | {[domEvent: string]: Event<any>}
      | {
          config: {
            passive?: boolean
            capture?: boolean
            prevent?: boolean
            stop?: boolean
          }
          on: {[domEvent: string]: Event<any>}
        }
    fn?: () => void
  },
): void
```

> See also: [PropertyMap](#propertymap), [Property](#property)

**Config fields**:

- **attr**: add HTML attributes, e.g. `class` or input's `value`. `{value: createStore('initial')}` will become `"value"="initial"`

- **style**: add inline styles. All `style` objects will be merged to single `style` html attribute. Object fields in camel case will be converted to dash-style, e.g. `{borderRadius: '3px'}` will become `"style"="border-radius: 3px"`.

- **styleVar**: add css variables to inline styles. `{themeColor: createStore('red')}` will become `"style"="--themeColor: red"`

- **data**: add [data attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes). Object fields in camel case will be converted to dash-style, e.g. `{buttonType: 'outline'}` will become `"data-button-type"="outline"` and might be queried in css in this way:

```css
[data-button-type='outline'] {
}
```

- **text**: add text to element as [property](#property) or array of properties

- **visible**: node will be presented in dom tree while store value is `true`. Useful for conditional rendering

- **handler**: add event handlers to dom node. In cases when `preventDefault` or `stopPropagation` is needed, extended form with config object can be used

```typescript
const click = createEvent<MouseEvent>()

h('button', {
  text: 'Click me',
  handler: {click},
})

h('a', {
  text: 'Click me',
  handler: {
    config: {prevent: true},
    on: {click},
  },
})
```

> **Handler config fields**:
>
> - **passive**: event handler will be defined as [passive](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners)
> - **capture**: event handler will be defined with [`capture: true`](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture)
> - **prevent**: call [`preventDefault()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) on trigger
> - **stop**: call [`stopPropagation()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation) on trigger

- **fn**: add children to given element by nesting api methods calls

### spec

Add new properties to dom element. Designed to call from [h](#h) callbacks and has the same fields as in `h(tag, config)`. Can be called as many times as needed

```typescript
function spec(config: {
  attr?: PropertyMap
  style?: PropertyMap
  styleVar?: PropertyMap
  data?: PropertyMap
  text?: Property | Property[]
  visible?: Store<boolean>
  handler?:
    | {[domEvent: string]: Event<any>}
    | {
        config: {
          passive?: boolean
          capture?: boolean
          prevent?: boolean
          stop?: boolean
        }
        on: {[domEvent: string]: Event<any>}
      }
}): void
```

### list

Render array of items from store

```typescript
function list<T>(source: Store<T[]>, fn: (config: {store: Store<T>, key: Store<number>}) => void): void

function list<T>(config: {
  source: Store<T[]>,
  key: string
  fields?: string[]
  fn: (config: {store: Store<T>, key: Store<any>, fields: Store<any>[]}) => void): void
}): void
```

**Config fields**:

- **source**: store with an array of items
- **key**: field name which value will be used as key for given item
- **fn**: function which will be used as a template for every list item. Receive item value and item key as stores and `fields` as array of stores if provided. All fields are strongly typed and inferred from config definition
- **fields**: array of item field names which will be passed to `fn` as array of separate stores. Useful to avoid `store.map` and [`remap`](#remap) calls

### variant

Mount one of given cases by selecting a specific one by the current value of the `key` field of `source` store value. Type of `store` in `cases` functions will be inferred from a case type. Optional default case - `__` (like in [split](https://effector.dev/docs/api/effector/split))

```typescript
function variant<T>(config: {
  source: Store<T>
  key: string
  cases: {[caseName: string]: ({store: Store<T>}) => void}
}): void
```

### route

Generalized route is a combination of state and visibility status. `fn` content will be mounted until `visible` called with `source` value will return `true`. In case of store in `visible` field, content will be mounted while that store contain `true`. [variant](#variant) is shorthand for creating several routes at once

```typescript
function route<T>(config: {
  source: Store<T>
  visible: ((value: T) => boolean) | Store<boolean>
  fn: (config: {store: Store<T>}) => void
}): void
```

### text

Use template literals to add text to dom node. Accept any [properties](#property)

```typescript
function text(words: TemplateStringsArray, ...values: Property[]): void
```

**Example**

```typescript
const $username = createStore('guest')

h('h1', () => {
  text`Hello ${$username}!`
})
```

### rec

Provide support for recursive templates. Can be called outside from [using](#using) calls

```typescript
function rec<T>(config: {store: Store<T>}): (config: {store: Store<T>}) => void
```

### block

Allow defining and validate template outside from [using](#using) calls.

```typescript
function block(config: {fn: () => void}): () => void
```

### renderStatic

Method from `forest/server` to render given application to string. Can accept forked [Scope](https://effector.dev/docs/api/effector/scope), in which case `fn` children must be wrapped in [block](#block) to ensure that all units are created before [fork](https://effector.dev/docs/api/effector/fork) call

```typescript
function renderStatic(fn: () => void): Promise<string>

function renderStatic(config: {scope?: Scope; fn: () => void}): Promise<string>
```

### remap

Helper for retrieving value fields from single store. Shorthand for several `store.map(val => val[fieldName])` calls. Infer types when used with either single key or with `as const`: `const [id, name] = remap(user, ['id', 'name'] as const)`

```typescript
function remap<T>(store: Store<T>, keys: string[]): Store<any>[]

function remap<T>(store: Store<T>, key: string): Store<any>
```

### val

Helper for joining [properties](#property) to single string with template literals. If only [plain values](#plainproperty) are passed, the method returns `string`

```typescript
function val(words: TemplateStringsArray, ...values: Property[]): Store<string>

function val(words: TemplateStringsArray, ...values: PlainProperty[]): string
```

**Example**

```typescript
const $store = createStore(10)
const a = 20

h('g', {
  attr: {
    transform: val`translate(${$store} ${a})`,
  },
})
```

## Type terms

### PlainProperty

Value types accepted by methods, which write values to dom properties. Strings are written as is, numbers are converted to strings, `null` and `false` mean no value (property deletion), `true` is used when the specific property value is not needed.

```typescript
type PlainProperty = string | number | null | boolean
```

### Property

In most cases [dom properties](#plainproperty) can be wrapped in stores, thereby making result value dynamic

```typescript
type Property = PlainProperty | Store<PlainProperty>
```

### PropertyMap

Object with [dom properties](#plainproperty), possibly reactive

```typescript
type PropertyMap = {[field: string]: Property}
```
