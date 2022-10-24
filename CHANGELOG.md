# Changelog

See also [separate changelogs for each library](https://changelog.effector.dev/)

## effector-react 22.3.4

- Fix useUnit skipping updates when used with useEffect and useGate

## effector-react 22.3.3

- Fix useUnit skipping updates during scope changes (often happens in next.js apps). Big thanks to [@AlexandrHoroshih](https://github.com/AlexandrHoroshih) for investigation

## effector-react 22.3.1

- Fix useUnit skipping updates in react 16-17

## effector-vue 22.2.0

- Add `useStoreMap` hook for Vue 3 composition API to select part from a store ((PR #780)[https://github.com/effector/effector/pull/780]) by @ilajosmanov

## effector-react 22.3.0

- Made hooks `useEvent`, `useStore`, `useStoreMap` and `useList` isomorphic, now they would use `scope` from the `Provider` if it is available and scope-less mode otherwise. For `useUnit` it was done in 22.2.0.
- Added parameter `forceScope` to `useEvent`, `useStore`, `useStoreMap` and `useList` to force usage of scope from `Provider`, it would throw an error if `Provider` is not available, `/scope` module sets `forceScope` to `true` by default

## effector-solid 0.22.6

- Add type of `Provider` to main module

## effector-solid 0.22.5

- Add export of `Provider` from main module

## effector-react 22.2.0

- Made hook `useUnit` isomorphic, now it would use `scope` from the `Provider` if it is available and scope-less mode otherwise (PR [#776](https://github.com/effector/effector/pull/776) and PR [#785](https://github.com/effector/effector/pull/785))
- Added parameter `forceScope` to `useUnit` to force usage of scope from `Provider`, it would throw an error if `Provider` is not available (PR [#776](https://github.com/effector/effector/pull/776) and PR [#785](https://github.com/effector/effector/pull/785)), `/scope` module sets `forceScope` to `true` by default
- Added "type" entry for package exports (PR [#759](https://github.com/effector/effector/pull/759))
- Fixed typing in `useUnit` (PR [#747](https://github.com/effector/effector/pull/747))

## effector-solid 0.22.4

- Made `useUnit` isomorphic, now it would use `scope` from the `Provider` if it is available and scope-less mode otherwise (PR [#782](https://github.com/effector/effector/pull/782))
- Added parameter `forceScope` to `useUnit` to force usage of scope from `Provider`, it would throw an error if `Provider` is not available (PR [#782](https://github.com/effector/effector/pull/782)), `/scope` module sets `forceScope` to `true` by default

## effector-vue 22.1.2

- Added "type" entry for package exports (PR [#759](https://github.com/effector/effector/pull/759))

## effector-solid 0.22.3

- Added "type" entry for package exports (PR [#759](https://github.com/effector/effector/pull/759))

## effector-solid 0.22.2

- Fixed typing in `useUnit` (PR [#747](https://github.com/effector/effector/pull/747))

## forest 0.21.2

- Added "type" entry for package exports (PR [#759](https://github.com/effector/effector/pull/759))

## effector-react 22.1.0

- Added support for react 18 (PR [#655](https://github.com/effector/effector/pull/655))
- Added `useUnit` method to read multiple stores and bind events or effects to scope in a single batched call (PR [#733](https://github.com/effector/effector/pull/733), [#738](https://github.com/effector/effector/pull/738))

```tsx
import {createEvent, createStore, fork} from 'effector'
import {useUnit, Provider} from 'effector-react/scope'

const inc = createEvent()
const $count = createStore(0)
const $title = createStore('useStore example')

$count.on(inc, x => x + 1)

const App = () => {
  const [count, title, incFn] = useUnit([$count, $title, inc])
  return (
    <>
      <h1>{title}</h1>
      <p>Count: {count}</p>
      <button onClick={() => incFn()}>increment</button>
    </>
  )
}

const scope = fork()

render(
  () => (
    <Provider value={scope}>
      <App />
    </Provider>
  ),
  document.getElementById('root'),
)
```

- Added `placeholder` option to `useList` to render in cases of empty list

```tsx
const ChatList = () => (
  <div>
    {useList($chats, {
      fn: chat => <div>Chat {chat.name}</div>,
      keys: [],
      placeholder: <div>You have no chats yet. Add first one?</div>,
    })}
  </div>
)
```

- Added `defaultValue` option to `useStoreMap` to return in cases when `fn` returns undefined

```tsx
const ChatName = ({id}) => {
  const chat = useStoreMap({
    store: $chats,
    keys: [id],
    fn: chats => chats.find(chat => chat.id === id),
    defaultValue: {id: 'default', name: 'Default chat'},
  })
  return <span>{chat.name}</span>
}
```

- Fixed `Gate.status` store being serialized (PR [#683](https://github.com/effector/effector/pull/683))

## effector 22.2.0

- Added `filter` option to `sample`, thereby making `guard` an alias (issue [#521](https://github.com/effector/effector/issues/521))

```ts
sample({
  clock: submitPasswordEvent,
  source: $store,
  filter: (state: AuthFlowState) => state is WaitingPasswordState,
  fn: (waitingPasswordState, clock) => waitingPasswordState.password,
  target: submitPassowrdFx,
})
```

- Added `clock` option to `split` (issue [#537](https://github.com/effector/effector/issues/537))

```ts
split({
  clock: submit,
  source: $form,
  match: $mode,
  cases: {
    draft: saveFormDraftFx,
    send: sendFormToBackendFx,
  },
})
```

- Improved `sample` type checking:
  - Fixed cases when target units becomes compatible with any type (issue [#600](https://github.com/effector/effector/issues/600))
  - Fixed cases when method call being marked as error when it perfectly correct
  - Removed vague "incompatible unit in target" error
  - Error messages now explicitly tells which type is given by source and which one is expected by target
  - 16 overloads was merged into single one to improve clarity of error messages. Will remove a lot of noise from IDE output thereby improving developer expirience
- Improved `split` type checking:
  - Fixed a case when units in cases becomes compatible with any type
  - Removed vague "incompatible unit in target" error
  - Error messages now explicitly tells which type is given by source and which one is expected by failed target case
- Added jsdoc documentation for all top level methods. Will be used by IDE such as VS Code and Webstorm to provide better developer expirience
- Derived units in target of `sample`, `guard`, `split` and `forward` are deprecated (issue [#563](https://github.com/effector/effector/issues/563))
- Imperative calls of derived units created by `merge`, `sample` and `split` are deprecated
- Imperative calls of events and effects in pure functions are deprecated (issue [#541](https://github.com/effector/effector/issues/541))
- `restore($store)` is deprecated (issue [#571](https://github.com/effector/effector/issues/571))
- Effects created by `attach` got correct name for use in developer tools like [effector-logger](https://github.com/effector/logger) (issue [#527](https://github.com/effector/effector/issues/527))
- Fixed a case when `sample/guard` pass obsolete data from it's `source` store (issue [#544](https://github.com/effector/effector/issues/544))
- Fixed data race when using `combine` with fork api (issue [#613](https://github.com/effector/effector/issues/613))
- Fixed cases when `effector/babel-plugin` changes function calls which it should avoid (issue [#603](https://github.com/effector/effector/issues/603))
- Fixed support for multiple passes of `effector/babel-plugin` (issue [#601](https://github.com/effector/effector/issues/601))
- Fixed `combine` support for units with large union types (issue [#531](https://github.com/effector/effector/issues/531))
- Fixed support for calls without payload for `Event<unknown>` (PR [#454](https://github.com/effector/effector/pull/454))
- Fixed circular reference warning during import of typings (issue [#578](https://github.com/effector/effector/issues/578))

## effector-vue 22.1.0

- Add support for Vue 3 SSR via new [useEvent hook](https://effector.dev/docs/api/effector-vue/useEvent) and [VueSSRPlugin](https://effector.dev/docs/api/effector-vue/VueSSRPlugin) ([PR #595](https://github.com/effector/effector/pull/595))

## effector-react 22.0.6

- Fix `Can't perform a React state update on an unmounted component` warning for `useStoreMap` in a few cases (issue [#574](https://github.com/effector/effector/issues/574))

## effector 22.1.2

- Allow to use `effector/babel-plugin` in `patronum/macro`

## effector 22.1.1

- Fix data races that cause obsolete states to appear in the `.on` and `.reset` methods

## effector 22.1.0

- Added option `debugSids` to `effector/babel-plugin`

The option allows adding file path and variable name to a sid for each unit definition.
It allows to easily debug serialized scope using SSR.

## effector 22.0.0

- Add support for plain functions to attach: `attach({source, async effect(source, params) {}})`
- Allow to use fork without domains: `const scope = fork()`
  - `Unit not found in scope` error is no longer exists, any unit could be used in any scope
  - Increase performance of `fork` and `serialize` a hundredfold
- Add support for attached effects to fork handlers
- Add support for tuples to fork values and handlers: `fork({values: [[$user, 'alice'], [$age, 22]]})`
- Add `serialize: 'ignore'` option to `createStore` to declare store as ignored by `serialize` calls
- Make `onlyChanges: true` a default `serialize` option
- Fix babel plugin issue with parsing method calls (e.g. in react native)
- Validate `combine` arguments and throw an error in case of `undefined` and non-store units ([issue #509](https://github.com/effector/effector/issues/509))
- Throw an error when fork handlers or values got units without sid or with duplicate sid
- Deprecate `createStoreObject` alias for `combine`
- Deprecate `effector/fork` module
- Deprecate `.thru`
- Deprecate second argument in `store.map`
- Deprecate direct manipulations with derived units:
  - Deprecate `.on` in derived stores created by `store.map` and `combine`
  - Deprecate calls of derived events created by `event.map`, `event.filterMap` and `event.filter`
  - Deprecate calls of `fx.done`, `fx.doneData` and other events belongs to effects
- Remove `ɔ` (latin small letter open o) symbol to prevent incorrect unicode parsing
- Remove undocumented `scope.find` which is a wrong abstraction for a new fork
- Make `Scope` a unit:
  - Add support for `Scope` to `is.unit`
  - Add `is.scope` method
- Allow to pass a scope to scopeBind: `scopeBind(unit, {scope})`, which is also can be used outside from `.watch`
- Improve es modules support
- Make package size 10% smaller

## effector-react 22.0.0

- Add module `effector-react/scope` and make `effector-react/ssr` an alias for it
- Fix `Cannot update a component` warning in `useGate`
- Allow to return `undefined` in `useStoreMap`
- Make `domain` field in `createGate` optional
- Deprecate `createContextComponent` and `createReactState`
- Improve es modules support

## effector-vue 22.0.0

- Improve es modules support

## forest 0.20.0

- Improve es modules support

## effector-react 21.3.1

- Fixed TypeError in `useStoreMap` with scope ([PR #474](https://github.com/effector/effector/pull/474))

## effector-react 21.3.0

- Add support for `updateFilter` to `useStoreMap`. It helps to control component rerendering, e.g. when component should rerender only when `id` field is changed
- Add `useStoreMap($store, value => result)` shorthand
- Add support for `getKey` to `useList`. Function in this field will be used to compute key for every item of list
- Add support for stores with functions in them to `useStore` ([PR #431](https://github.com/effector/effector/pull/431))
- Add domain name passed to `createGate` to `gate.displayName` and gate units ([issue #449](https://github.com/effector/effector/issues/449))
- Fix unhandled promise rejection in `useEvent` when used effect throw an error

## effector 21.8.0

- Add type support for arrays in `sample` `target` ([PR #284](https://github.com/effector/effector/pull/284), [#445](https://github.com/effector/effector/pull/445))

```js
sample({
  clock: clickValidate,
  source: $formFields,
  target: [validateForm, sendStatsFx],
})
```

- Add support for case functions, case stores and matcher stores to `split`. Case functions and stores will choose target case by its name, matcher stores are boolean stores which indicate whether to choose given case

```typescript
const source = createEvent()
const even = createEvent()

const $odd = createStore(0)

split({
  source,
  // case function
  match(n) {
    if (n % 2 === 0) return 'even'
    return 'odd'
  },
  cases: {
    even,
    odd: $odd,
  },
})

const $currentPage = createStore('dashboard')

split({
  source,
  // case store
  match: $currentPage,
  cases: {
    dashboard: even,
    __: odd,
  },
})

const tryUpdatePage = createEvent()
const updatePageFx = createEffect()

const $hasWriteAccess = createStore(false)

split({
  source: tryUpdatePage,
  match: {
    // matcher store
    admin: $hasWriteAccess,
  },
  cases: {
    admin: updatePageFx,
  },
})
```

- Add `updateFilter` config field to `createStore` to skip arbitrary store updates ([discussion #428](https://github.com/effector/effector/discussions/428))

```js
const $playerPosition = createStore(
  {x: 0, y: 0},
  {
    updateFilter: (update, current) => update.x !== current.x,
  },
)
```

- Add support for `sample` with `clock` without `source`. For example, it useful in cases when `clock` is array of units and no `source` stores is needed

```js
sample({
  clock: [fx1.doneData, fx2.doneData],
  fn: data => ({url: '/stats', data})
  target: fetchFx,
})
```

- Add support for `clock` to `guard` to improve developer expirience in cases when update trigger (`clock` field) and data source (`source` field) are different things

```js
guard({
  clock: validateForm,
  source: $formFields,
  filter: formFields => validator(formFields),
  target: submitFormFx,
})
```

- Add `addNames` field to babel plugin ([PR #450](https://github.com/effector/effector/pull/450))

- Add type support for `Scope` to `clearNode` ([issue #441](https://github.com/effector/effector/issues/441))

- Add `compositeName` to `Domain` typings, making it consistent with other units

- Add `EventPayload` and `UnitValue` type helpers ([PR #434](https://github.com/effector/effector/pull/434))

- Improve various edge cases with fork api and serialization

- Improve typechecking for `attach` ([issue #439](https://github.com/effector/effector/issues/439))

- Fix various type issues in `sample` and `guard` typings

## effector-react 21.2.0

- Add `createGate` implementation to `effector-react/ssr`

```jsx
import {createDomain} from 'effector'
import {createGate, useGate} from 'effector-react/ssr'

const app = createDomain()

const currentRouteGate = createGate({
  domain: app,
  defaultState: 'dashboard',
})

export const Layout = ({routeName, children}) => {
  useGate(currentRouteGate, routeName)
  return (
    <>
      <h1>{routeName}</h1>
      {children}
    </>
  )
}
```

## effector-react 21.1.0

- Add support for object and array of events to `useEvent`. It's a shorthand for calling several `useEvent` at once (PR [#425](https://github.com/effector/effector/pull/425) by [@sergeysova](https://github.com/sergeysova))

```jsx
export function ExampleComponent() {
  const handlers = useEvent({emailChanged, passwordChanged})

  return (
    <div>
      <input onChange={handlers.emailChanged} />
      <input onChange={handlers.passwordChanged} />
    </div>
  )
}
```

```jsx
export function ExampleComponent() {
  const [changeEmail, changePassword] = useEvent([
    emailChanged,
    passwordChanged,
  ])

  return (
    <div>
      <input onChange={changeEmail} />
      <input onChange={changePassword} />
    </div>
  )
}
```

## effector 21.7.0

- Add support for scopes to `hydrate`, to provide a way to fill additional values to existing scope (happens during SSG navigation in next.js)

- Improve `prepend` type inference (PR [#415](https://github.com/effector/effector/pull/415) (thanks [@doasync](https://github.com/doasync)))

## effector-vue 21.1.0

- Add support for vue@next (vue 3)
- `useStore` `useVModel` `useGate` `createGate` [see docs](https://effector.dev/docs/api/effector-vue/effector-vue)

## effector 21.6.0

- Add support for user-defined factories in fork api. Starting from this release, application developers can use their own functions and be sure that their content will be properly serialized and hydrated by fork api.
  New field `factories` in `effector/babel-plugin` accepts array of module names which exports will be treated as custom factories therefore each function call will provide unique prefix for `sid` properties of units inside them

```json title=".babelrc"
{
  "plugins": [
    [
      "effector/babel-plugin",
      {
        "factories": ["src/createEffectStatus", "~/createCommonPending"]
      }
    ]
  ]
}
```

```js title="./src/createEffectStatus.js"
import {rootDomain} from './rootDomain'

export function createEffectStatus(fx) {
  const $status = rootDomain
    .createStore('init')
    .on(fx.finally, (_, {status}) => status)

  return $status
}
```

```js title="./src/statuses.js"
import {createEffectStatus} from './createEffectStatus'
import {fetchUserFx, fetchFriendsFx} from './api'

export const $fetchUserStatus = createEffectStatus(fetchUserFx)
export const $fetchFriendsStatus = createEffectStatus(fetchFriendsFx)
```

Import `createEffectStatus` from `'./createEffectStatus'` was treated as factory function so each store created by it has its own `sid` and will be handled by serialize independently, although without `factories` they will share the same `sid`

[factories in documentation](https://effector.dev/docs/api/effector/babel-plugin#factories)

- Add user-friendly unit name in fork api error messages when given unit is not found in scope. This improves error messages in both `effector` and `effector-react`

- Add validation for `values` and `handlers` fields in `fork` and for `values` field in `hydrate`

- Add type support for `createEffect<typeof handler, Error>(handler)` to infer `Params` and `Done` types from given `handler` and provide custom `Fail` type at the same time

[createEffect and custom errors](https://effector.dev/docs/typescript/typing-effector#createeffect-and-custom-errors) in documentation

- Improve `guard` return type inference (PR [#406](https://github.com/effector/effector/pull/406) (thanks [@doasync](https://github.com/doasync)))

- Fix void params support for `createEffect(name, config)` (issue [#404](https://github.com/effector/effector/issues/404))

- Allow to use `Event<void>` in cases when only `() => void` is accepted (PR [#400](https://github.com/effector/effector/pull/400) (thanks [@doasync](https://github.com/doasync)))

- Add support for `merge` to `effector/babel-plugin`

## effector 21.5.0

- Add support for `attach({effect})` to create effect which will call `effect` with params as it is. That allow to create separate effects with shared behavior (PR [#396](https://github.com/effector/effector/pull/396) and [#397](https://github.com/effector/effector/pull/397) (thanks [@sergeysova](https://github.com/sergeysova) and [@oas89](https://github.com/oas89)))

- Add `reactSsr` option to `effector/babel-plugin` to replace imports from `effector-react` to `effector-react/ssr`. Useful for building both server-side and client-side builds from the same codebase

## effector 21.4.0

- Add support for return status to `allSettled`. When `allSettled` is called with `Effect`, it return object with `value` and `status` fields ([discussion](https://github.com/effector/effector/issues/385))

```js
import {createDomain, fork, allSettled} from 'effector'

const app = createDomain()
const fx = app.createEffect(() => 'ok')
const result = await allSettled(fx, {scope: fork(app)})
// => {status: 'done', value: 'ok'}
```

[Try it](https://share.effector.dev/h8m4zT0k)

- Allow to expicitly define return/error types in `createEffect(handler)`

```typescript
const fx = createEffect<number, string, Error>(x => x.toString())
// fx has type Effect<number, string, Error>
```

- Add types for `domain.effect(handler)`

- Fix effector/babel-plugin behavior in case when methods like `createStore` are imported from unrelated library and should be ignored. Import library could be defined by [importName](https://effector.dev/docs/api/effector/babel-plugin#importname) config field

- Improve fork api support for watchers

## effector 21.3.0

- Add support for `createEffect(handler)`

[createEffect(handler) in documentation](https://effector.dev/docs/api/effector/createEffect#createeffecthandler)

```js
import {createEffect} from 'effector'

const fetchUserReposFx = createEffect(async ({name}) => {
  const url = `https://api.github.com/users/${name}/repos`
  const req = await fetch(url)
  return req.json()
})

fetchUserReposFx.done.watch(({params, result}) => {
  console.log(result)
})

await fetchUserReposFx({name: 'zerobias'})
```

[Try it](https://share.effector.dev/7K23rdej)

- Add support for `attach({source, effect})` without `mapParams`: in case with `source` and `effect` only, inner effect will be triggered with `source` values

[attach({effect, source}) in documentation](https://effector.dev/docs/api/effector/attach#attacheffect-source)

```js
import {createStore, createEffect, attach} from 'effector'

const fx = createEffect()
const $token = createStore('')
const secureRequest = attach({effect: fx, source: $token})
```

it's a shorthand for common use case:

```js
import {createStore, createEffect, attach} from 'effector'

const fx = createEffect()
const $token = createStore('')

const secureRequest = attach({
  effect: fx,
  source: $token,
  mapParams: (_, source) => source,
})
```

[Try it](https://share.effector.dev/lManajHQ)

- Handle throws in `attach` `mapParams` field: errors happened in `mapParams` function will force attached effect to fail
- Add babel plugin support for `split` and `createApi`
- Add `name` field to `attach` typings
- Add `.filter` and `.filterMap` to effect typings ([PR #376](https://github.com/effector/effector/pull/376))
- Improve config validation for `forward`, `attach`, `sample` and `guard`: attempt to call these methods without arguments will lead to error with user-friendly description
- Improve fork api support for stores and events

## effector 21.2.0

- Add array support for sample `clock` field which acts like a `merge` call

```typescript
import {createStore, createEvent, createEffect, sample, merge} from 'effector'

const showNotification = createEvent<string>()
const trigger = createEvent()
const fx = createEffect()

const $store = createStore('')

// array of units in clock
sample({
  source: $store,
  clock: [trigger, fx.doneData],
  target: showNotification,
})

// merged unit in clock
sample({
  source: $store,
  clock: merge([trigger, fx.doneData]),
  target: showNotification,
})
```

- Improve ide type hints support for `sample` in case of config form
- Add `package.json` to package `exports` field (read more in [nodejs documentation](https://nodejs.org/api/esm.html#esm_package_entry_points))

## effector 21.1.0

- Add `onlyChanges` option to `serialize` to ignore stores which didn't changed in fork (prevent default values from being carried over network)

- Add type helpers for stores and effects: `StoreValue`, `EffectParams`, `EffectResult` and `EffectError`

```typescript
import {
  createStore,
  createEffect,
  StoreValue,
  EffectParams,
  EffectResult,
} from 'effector'

const getUserFX = createEffect<number, {name: string}>()

const $username = createStore('guest')

// string
type Username = StoreValue<typeof $username>

// number
type GetUserParams = EffectParams<typeof getUserFX>

// {name: string}
type User = EffectResult<typeof getUserFX>
```

- Allow `domain.createEffect` to infer type from given `handler` (that feature was already implemented for `createEffect` method), this code now typechecked as expected:

```typescript
import {createDomain} from 'effector'

const app = createDomain()

const voidFx = app.createEffect({
  async handler() {},
})

await voidFx()
```

- Allow to call `allSettled` with void units without `params` field, this code now typechecked as expected:

```typescript
import {createDomain, fork, allSettled} from 'effector'

const app = createDomain()

const voidFx = app.createEffect({
  async handler() {},
})

voidFx()

const scope = fork(app)

await allSettled(voidFx, {scope})
```

## effector 21.0.3, effector-react 21.0.4, effector-vue 21.0.3

- Improve native es modules support, add [conditional exports](https://nodejs.org/dist/latest-v14.x/docs/api/esm.html#esm_conditional_exports) declarations

## effector 21.0.0

- Add object form of `split` for pattern-matching without additional forwards

[`split` in documentation](https://effector.dev/docs/api/effector/split#splitsource-match-cases)

```js
import {split, createEffect, createEvent} from 'effector'

const messageReceived = createEvent()
const showTextPopup = createEvent()
const playAudio = createEvent()
const reportUnknownMessageTypeFx = createEffect({
  handler({type}) {
    console.log('unknown message:', type)
  },
})

split({
  source: messageReceived,
  match: {
    text: msg => msg.type === 'text',
    audio: msg => msg.type === 'audio',
  },
  cases: {
    text: showTextPopup,
    audio: playAudio,
    __: reportUnknownMessageTypeFx,
  },
})

showTextPopup.watch(({value}) => {
  console.log('new message:', value)
})

messageReceived({
  type: 'text',
  value: 'Hello',
})
// => new message: Hello
messageReceived({
  type: 'image',
  imageUrl: '...',
})
// => unknown message: image
```

[Try it](https://share.effector.dev/javsk7Hg)

You can match directly to store api as well:

```js
import {split, createStore, createEvent, createApi} from 'effector'

const messageReceived = createEvent()
const $textContent = createStore([])

split({
  source: messageReceived,
  match: {
    text: msg => msg.type === 'text',
    audio: msg => msg.type === 'audio',
  },
  cases: createApi($textContent, {
    text: (list, {value}) => [...list, value],
    audio: (list, {duration}) => [...list, `audio ${duration} ms`],
    __: list => [...list, 'unknown message'],
  }),
})

$textContent.watch(messages => {
  console.log(messages)
})

messageReceived({
  type: 'text',
  value: 'Hello',
})
// => ['Hello']
messageReceived({
  type: 'image',
  imageUrl: '...',
})
// => ['Hello', 'unknown message']
messageReceived({
  type: 'audio',
  duration: 500,
})
// => ['Hello', 'unknown message', 'audio 500 ms']
```

[Try it](https://share.effector.dev/32FNNk8H)

- Merge `effector/fork` into `effector`. Now all methods required for SSR are exported from the library itself, making `effector/fork` an alias
- Make `Scope` type alias for `Fork`
- Add support for es modules: `import {createStore} from 'effector/effector.mjs'`
- Effect without a handler now throws an error during a call instead of calling `console.error` with undefined return, which was violating the type of effect
- Remove `restore` aliases, `event.filter(fn)` alias for `event.filterMap(fn)`, `greedy` in `sample` as separate last argument and unused `blocks` and `Kind`

## effector-react 21.0.0

- Add support for es modules
- Remove experimental `Gate.isOpen` plain property, which was incompatibile with concurrent mode and ssr, use `Gate.status` instead

[Gate.status in documentation](https://effector.dev/docs/api/effector-react/gate#status)

## effector-vue 21.0.0

- Add support for es modules

## effector-react 20.9.0

- Export `useGate` with `fork` support from `effector-react/ssr`

```tsx
import {useGate, useStore, Provider} from 'effector-react/ssr'
import {createGate} from 'effector-react'
import {createDomain, forward} from 'effector'
import {fork} from 'effector/fork'

const app = createDomain()

const activeChatGate = createGate({domain: app})

const getMessagesFx = app.createEffect({
  async handler({chatId}) {
    return ['hi bob!', 'Hello, Alice']
  },
})

const $messagesAmount = app
  .createStore(0)
  .on(getMessagesFx.doneData, (_, messages) => messages.length)

forward({
  from: activeChatGate.open,
  to: getMessagesFx,
})

const ChatPage = ({chatId}) => {
  useGate(activeChatGate, {chatId})

  return (
    <div>
      <header>Chat {chatId}</header>
      <p>Messages total: {useStore($messagesAmount)}</p>
    </div>
  )
}
const App = ({root}) => (
  <Provider value={root}>
    <ChatPage chatId="chat01" />
  </Provider>
)

const scope = fork(app)

ReactDOM.render(<App root={scope} />, document.getElementById('root'))
```

[Try it](https://share.effector.dev/nxtytLnk)

- Add `domain` optional field to `createGate` which will be used to create gate units (useful for ssr)

[createGate({domain}) in documentation](https://effector.dev/docs/api/effector-react/createGate#creategateconfig-defaultstate-domain-name)

- Improve `useList` hook typings for typescript exported from `effector-react/ssr` by allowing usage as components' return value (fix [DefinitelyTyped issue](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20356))

## effector 20.17.2

- Add effects created via `attach` to domain effects, allowing these effects to be called within other effects when using `fork`

```js
import {createDomain, attach} from 'effector'
import {fork, allSettled} from 'effector/fork'

const app = createDomain()
const addFx = app.createEffect({handler: _ => _})

const $count = app.createStore(2).on(addFx.doneData, (x, y) => x + y)

const addWithCurrent = attach({
  source: $count,
  effect: add,
  mapParams: (params, current) => params + current,
})

const startFx = app.createEffect({
  async handler(val) {
    await addWithCurrent(val)
  },
})

const scope = fork(app)

await allSettled(startFx, {
  scope,
  params: 3,
})

console.log(scope.getState(count))
// => 7
```

[Try it](https://share.effector.dev/IiDZW90x)

- Add validation for `combine` first argument which should be store, object with stores or array with stores [PR #362](https://github.com/effector/effector/pull/362) (thanks [@doasync](https://github.com/doasync))

## effector 20.17.1

- Add validation for `event.watch` watcher, this code now throw error as expected:

```js
import {createEvent} from 'effector'

const trigger = createEvent()

trigger.watch(NaN)
// => Error: .watch argument should be a function
```

[Try it](https://share.effector.dev/6PasNTpe)

## effector 20.17.0

- Add support for nested effect calls in forked scope. Parallel requests are supported as well

```js
import {createDomain, forward} from 'effector'
import {fork, allSettled} from 'effector/fork'

const app = createDomain()
const addWordFx = app.createEffect({handler: async word => word})

const words = app
  .createStore([])
  .on(addWordFx.doneData, (list, word) => [...list, word])

const startFx = app.createEffect({
  async handler(word) {
    await addWordFx(`${word}1`)
    await addWordFx(`${word}2`)
    return word
  },
})

const nextFx = app.createEffect({
  async handler(word) {
    await Promise.all([addWordFx(`${word}3`), addWordFx(`${word}4`)])
  },
})

forward({from: startFx.doneData, to: nextFx})

const scopeA = fork(app)
const scopeB = fork(app)
const scopeC = fork(app)

await Promise.all([
  allSettled(startFx, {
    scope: scopeA,
    params: 'A',
  }),
  allSettled(startFx, {
    scope: scopeB,
    params: 'B',
  }),
])

await allSettled(startFx, {
  scope: scopeC,
  params: 'C',
})

console.log(scopeA.getState(words))
// => [A1, A2, A3, A4]
console.log(scopeB.getState(words))
// => [B1, B2, B3, B4]
console.log(scopeC.getState(words))
// => [C1, C2, C3, C4]
```

[Try it](https://share.effector.dev/MB9mMRAz)

- Allow `createNode` to call without arguments

```js
import {createNode} from 'effector'

const node = createNode()
```

- Make `Step` type alias for `Node`

## effector-react 20.8.0

- Add ability to define default `Gate` state in `createGate` via `defaultState` field

[createGate({defaultState}) in documentation](https://effector.dev/docs/api/effector-react/createGate#creategateconfig-defaultstate-domain-name)

- Remove `object` restriction from `createGate` `Props` type in typescript, as it becomes useless with introduction of `useGate`. This code now passes type checking successfully

```typescript
import {createGate} from 'effector-react'

const RouteGate = createGate<string>()

const UserGate = createGate({defaultState: 'guest'})
```

## effector 20.16.1

- Allow typescript to refine type if `guard` got `Boolean` (a function) as `filter`

```typescript
import {createEvent, createStore, guard} from 'effector'

type User = {name: string}

const trigger = createEvent<User | null>()
const user = createStore<User>({name: 'alice'})

guard({
  source: trigger,
  filter: Boolean,
  target: user,
})
```

## effector-react 20.7.4

- Improve [useStore](https://effector.dev/docs/api/effector-react/useStore) support for [React.StrictMode](https://reactjs.org/docs/strict-mode.html)

## effector-vue 20.5.0

- Migrated from Vue.util.defineReactive to Vue.observable
- Effector stores will show in Vue devtools
- Cosmetic improvements for support plugin in the future.

- Now we can add some units to effector object (will be return Store<number>)

```js
const fx = createEffect({...});

export default Vue.extend({
  effector: {
    isCompleted: fx.done
  },
  watch: {
    isCompleted(sid) {
      this.isPopupOpened = false;
    }
  },
  data: () => ({
    isPopupOpened: true,
  })
})
```

- Support v-model directive for scalar values

```js
const $msg = createStore()

export default Vue.extend({
  effector: {
    $msg,
  },
})
```

```html
<template>
  <input v-model="$msg" />
</template>
```

## effector 20.16.0

- Add support for `handlers` to `fork` to change effect handlers for forked scope (useful for testing)

```typescript
import {createDomain} from 'effector'
import {fork, hydrate, serialize, allSettled} from 'effector/fork'

//app
const app = createDomain()
const fetchFriendsFx = app.createEffect<{limit: number}, string[]>({
  async handler({limit}) {
    /* some client-side data fetching */
    return []
  },
})
const $user = app.createStore('guest')
const $friends = app
  .createStore([])
  .on(fetchFriendsFx.doneData, (_, result) => result)

/*
  test to ensure that $friends value is populated
  after fetchFriendsFx call
*/
const testScope = fork(app, {
  values: {
    [$user.sid]: 'alice',
  },
  handlers: {
    [fetchFriendsFx.sid]: () => ['bob', 'carol'],
  },
})

/* trigger computations in scope and await all called effects */
await allSettled(fetchFriendsFx, {
  scope: testScope,
  params: {limit: 10},
})

/* check value of store in scope */
console.log(testScope.getState(friends))
// => ['bob', 'carol']
```

[Try it](https://share.effector.dev/A31Dy2UK)

- Add support for `scope.getState(store)` to access to store values in forked scopes
- Fix `values` support for `fork`

## effector-react 20.7.3, effector-vue 20.4.2

- Fix regression in `effector-react/compat` and `effector-vue/compat` compatibility with IE11

## effector-vue 20.4.1

- Improve typescript typings for usage via `Vue.extend` ([PR #343](https://github.com/effector/effector/pull/343))

## effector 20.15.1

- Fix additional store updates during state hydration

```js
import {createDomain, forward} from 'effector'
import {hydrate} from 'effector/fork'

const app = createDomain()
const saveUserFx = app.createEffect({
  handler(value) {
    console.log('saveUserFx now called only after store update', value)
  },
})

const $username = app.createStore('guest')

forward({
  from: $username,
  to: saveUserFx,
})

$username.updates.watch(value => {
  console.log('event watches now called only after store update', value)
})

hydrate(app, {
  values: {
    [$username.sid]: 'alice',
  },
})
// no event watches triggered yet and no effects called as we just hydrating app state
```

[Try it](https://share.effector.dev/ZKzbh01h)

## effector 20.15.0

- Add support for array of units to `store.on` ([PR #328](https://github.com/effector/effector/pull/328))

```js
import {createEvent, createStore} from 'effector'

const changedA = createEvent()
const changedB = createEvent()

const $store = createStore(0).on(
  [changedA, changedB],
  (state, params) => state + params,
)

$store.watch(value => {
  console.log('updated', value)
})

changedA(2)
// => updated 2

changedB(2)
// => updated 4

// You can unsubscribe from any trigger
$store.off(changedA)
```

[Try it](https://share.effector.dev/iP0oM3NF)

[Documentation for `store.on`](https://effector.dev/docs/api/effector/store#ontriggers-handler)

- Add support for array of units to `store.reset` to make it consistent with [merge](https://effector.dev/docs/api/effector/merge) and [store.on](https://effector.dev/docs/api/effector/store#ontriggers-handler)

```js
import {createEvent, createStore} from 'effector'

const increment = createEvent()
const reset = createEvent()

const $store = createStore(0)
  .on(increment, state => state + 1)
  .reset([reset])

$store.watch(state => console.log('changed', state))
// changed 0
// watch method calls its function immediately

increment() // changed 1
increment() // changed 2
reset() // changed 0
```

[Try it](https://share.effector.dev/ot6R5ePc)

[Documentation for `store.reset`](https://effector.dev/docs/api/effector/store#resettriggersarray)

- Remove units erased with `clearNode(unit)` from their parent domain hooks and history sets

## effector-react 20.7.1

- Improve `useList` hook typings for typescript by allowing usage as components' return value (fix [DefinitelyTyped issue](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20356))

This code now works without type errors:

```tsx
import {createStore} from 'effector'
import {useList} from 'effector-react'

const $users = createStore<User[]>([
  {
    username: 'alice',
    email: 'alice@example.com',
    bio: '. . .',
  },
  {
    username: 'bob',
    email: 'bob@example.com',
    bio: '~/ - /~',
  },
  {
    username: 'carol',
    email: 'carol@example.com',
    bio: '- - -',
  },
])
const UserList = () => useList($users, ({username}) => <p>{username}</p>)

const App = () => (
  <div>
    <UserList />
  </div>
)
```

## effector 20.14.0

- Add `ignore` parameter to `serialize` to skip stores during app state serialization [PR #325](https://github.com/effector/effector/pull/325) (thanks [@sergeysova](https://github.com/sergeysova))

## effector-react 20.7.0

- Use shallow compare for skipping updates with `useGate`, thereby making it consistent with `<Gate />`
- Remove nesting from components, created by `createContextComponent` and `createReactState`, which previously were based on `createComponent`

## effector 20.13.6

- Fix cases with `effector/babel-plugin` when inability to determine unit name led to the absence of `sid` property

## effector 20.13.5

- Extend typescript support for any to void forwarding: add support for forwarding to array of void units

```typescript
import {forward, createEvent, createEffect} from 'effector'

const sourceA = createEvent<string>()
const sourceB = createEvent<number>()

const targetA = createEvent<void>()
const fx = createEffect<void, any>()

forward({
  from: sourceA,
  to: targetA,
})

forward({
  from: sourceA,
  to: [targetA, fx],
})

forward({
  from: [sourceA, sourceB],
  to: targetA,
})

forward({
  from: [sourceA, sourceB],
  to: [targetA, fx],
})
```

- Fix computed stores support for `hydrate`
- Fix `allSettled` support for effects as first argument

## effector 20.13.0

- Introduce `attach`: wrapper for effect, which allow to map effect arguments and use data from stores.

Use cases: declarative passing values from stores to effects and argument preprocessing.

```js
import {createEffect, attach, createStore} from 'effector'

const backendRequestFx = createEffect({
  async handler({token, data, resource}) {
    const req = fetch(`https://example.com/api${resource}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
  },
})

const $requestsSend = createStore(0).on(backendRequestFx, total => total + 1)

$requestsSend.watch(total => {
  console.log(`client analytics: sent ${total} requests`)
})

const $token = createStore('guest_token')

const authorizedRequestFx = attach({
  effect: backendRequestFx,
  source: $token,
  mapParams: ({data, resource}, token) => ({data, resource, token}),
})

const createRequestFx = resource =>
  attach({
    effect: authorizedRequestFx,
    mapParams: data => ({data, resource}),
  })

const getUserFx = createRequestFx('/user')
const getPostsFx = createRequestFx('/posts')

const user = await getUserFx({name: 'alice'})
/*
POST https://example.com/api/user
{"name": "alice"}
Authorization: Bearer guest_token
*/

// => client analytics: sent 1 requests

const posts = await getPostsFx({user: user.id})
/*
POST https://example.com/api/posts
{"user": 18329}
Authorization: Bearer guest_token
*/

// => client analytics: sent 2 requests
```

[Documentation for `attach`](https://effector.dev/docs/api/effector/attach)

- Add `noDefaults` option for `effector/babel-plugin` for making custom unit factories with clean configuration

```json
{
  "plugins": [
    ["effector/babel-plugin", {"addLoc": true}],
    [
      "effector/babel-plugin",
      {
        "importName": "@lib/createInputField",
        "storeCreators": ["createInputField"],
        "noDefaults": true
      },
      "createInputField"
    ]
  ]
}
```

```js
// @lib/createInputField.js
import {createStore} from 'effector'
import {resetForm} from './form'

export function createInputField(defaultState, {sid, name}) {
  return createStore(defaultState, {sid, name}).reset(resetForm)
}

// src/state.js
import {createInputField} from '@lib/createInputField'

const foo = createInputField('-')
/*

will be treated as store creator and compiled to

const foo = createInputField('-', {
  name: 'foo',
  sid: 'z&si65'
})

*/
```

## effector-react 20.6.3

- Add type support for stores with `ReadonlyArray` to `useList` for typescript

## effector 20.12.2

- Add type support for sample with target and without clock (in that case, `source` will become `clock` as well)

```typescript
import {createStore, sample} from 'effector'

const $a = createStore([{foo: 0}])
const $b = createStore(0)

sample({
  source: $a,
  target: $b,
  fn: list => list.length,
})
```

[Try it](https://share.effector.dev/fl50soxD)

## effector-vue 20.4.0

- Add support for vue component watch option ([PR #313](https://github.com/effector/effector/pull/313)) (thanks [@Fl0pZz](https://github.com/Fl0pZz))

```js
import {createStore} from 'effector'
import {createComponent} from 'effector-vue'

const counter = createStore(0)

const component = createComponent(
  {
    template: '<div>{{ counter }}</div>',
    watch: {
      counter() {
        /* side-effects here */
      },
    },
  },
  {counter},
)
```

## effector-react 20.6.2, effector-vue 20.3.3

- Fix umd build of effector-react and effector-vue

[Cdn with umd build of effector-react](https://unpkg.com/effector-react/effector-react.umd.js)
[Cdn with umd build of effector-vue](https://unpkg.com/effector-vue/effector-vue.umd.js)

## effector 20.12.1

- Add support for guard to babel-plugin
- Add support for forward to babel-plugin
- Add support for explicit `domain.hooks` calls as escape hatch for imperative adding units to given domain

## effector 20.12.0

- Add `effect.doneData` and `effect.failData` events with effect result and error values as shorthands for common use cases `effect.done.map(({result}) => result)` and `effect.fail.map(({error}) => error)`

```js
import {createEffect, merge} from 'effector'

const fetchUserFx = createEffect()
const fetchFriendsFx = createEffect()

/* create event with results of any request to api */

/* new way, using .doneData events */

const apiResult = merge([fetchUserFx.doneData, fetchFriendsFx.doneData])

/* old way, using .done events */

const apiResultOld = merge([
  fetchUserFx.done.map(({result}) => result),
  fetchFriendsFx.done.map(({result}) => result),
])
```

[Try it](https://share.effector.dev/Zae5MZHU)

[Documentation for `effect.doneData`](https://effector.dev/docs/api/effector/effect#donedata)

[Documentation for `effect.failData`](https://effector.dev/docs/api/effector/effect#faildata)

## effector 20.11.0

- Add `effect.inFlight` store to effects. It show how many effect calls aren't settled yet. Useful for rate limiting.

```js
import {createEffect} from 'effector'

const fx = createEffect({
  handler: () => new Promise(rs => setTimeout(rs, 500)),
})

fx.inFlight.watch(amount => {
  console.log('in-flight requests:', amount)
})
// => 0

const req1 = fx()
// => 1

const req2 = fx()
// => 2

await Promise.all([req1, req2])

// => 1
// => 0
```

[Try it](https://share.effector.dev/tSAhu4Kt)

[Documentation for `effect.inFlight`](https://effector.dev/docs/api/effector/effect#inflight)

- Introduce `withRegion`: region-based memory management tool, which attach units (stores, events and effects) and watchers, created inside given callback to lifecycle of owner unit to be erased together with it.

```js
import {createEvent, createDomain, withRegion} from 'effector'

const domain = createDomain()
const trigger = createEvent()

withRegion(domain, () => {
  trigger.watch(n => {
    console.log(n)
  })
})

trigger(0)
// => 0
clearNode(domain)
trigger(1)
// no reaction
```

[Try it](https://share.effector.dev/mm3sV32v)

- Add support for `Map<Store, any>` to `values` property in `fork`.
- Fix concurrent requests support in `effect.pending`: it will become `false` only after all pending effect calls becomes settled.

## effector 20.10.0

- Add `launch({target: unit, params})` overload for `launch` - low level method for running computation in units (events, effects or stores). Mostly used by library developers for fine-grained control of computations.

## effector 20.9.0, effector-react 20.6.0

- Introduce `effector/fork` and `effector-react/ssr`: api for server side rendering and managing independent instances of application in general.

```tsx
/**
 * app
 */
import {createDomain, forward, restore} from 'effector'
import {useStore, useList, Provider, useEvent} from 'effector-react/ssr'

export const app = createDomain()

const requestUsernameFx = app.createEffect<{login: string}, string>()
const requestFriendsFx = app.createEffect<string, string[]>()

const $username = restore(requestUsernameFx, 'guest')
const $friends = restore(requestFriendsFx, [])

forward({
  from: requestUserName.done.map(({result: username}) => username),
  to: requestFriends,
})

const Friends = () => (
  <ul>
    {useList($friends, friend => (
      <li>{name}</li>
    ))}
  </ul>
)

const Title = () => <header>Hello {useStore($username)}</header>

export const View = ({root}) => (
  <Provider value={root}>
    <Title />
    <Friends />
  </Provider>
)

/**
 * client
 */
import ReactDOM from 'react-dom'
import {fork} from 'effector/fork'
import {app, View} from './app'

// initialize app with values from server

const clientScope = fork(app, {
  values: window.__initialState__,
})

ReactDOM.hydrate(<View root={clientScope} />, document.getElementById('root'))

/**
 * server
 */
import express from 'express'
import {renderToString} from 'react-dom/server'
import {fork, serialize, allSettled} from 'effector/fork'

import {app, View} from './app'

export const server = express()

server.get('/user/:login', async (req, res) => {
  // clone application
  const scope = fork(app)
  // call requestUsername(req.params) in scope
  // and await all triggered effects
  await allSettled(requestUsername, {
    scope,
    params: req.params, // argument for requestUsername call
  })
  // save all stores in application to plain object
  const data = serialize(scope)
  // render dom content
  const content = renderToString(<View root={scope} />)
  res.send(`
    <body>
      ${content}
      <script>
        window.__initialState__ = ${JSON.stringify(data)};
      </script>
    </body>
  `)
})
```

This solution requires `effector/babel-plugin` in babel configuration:

```json
{
  "plugins": ["effector/babel-plugin"]
}
```

[Example application with express](https://github.com/effector/effector/tree/master/examples/react-ssr)
[Serverless example](https://github.com/effector/effector/tree/master/examples/serverless-ssr)

- Add events created with `createApi`, stores created with `restore` and events created with `.prepend` to domain of given source units

```js
import {createDomain, createApi, restore} from 'effector'

const domain = createDomain()
domain.onCreateStore(store => {
  console.log('store created')
})

domain.onCreateEvent(event => {
  console.log('event created')
})

const $position = domain.createStore({x: 0})
// => store created
const {move} = createApi($position, {
  move: ({x}, payload) => ({x: x + payload}),
})
// => event created
const $lastMove = restore(move, 0)
// => store created
```

[Try it](https://share.effector.dev/d6OVcrCp)

## effector 20.8.2

- Improve `combine` batching in a few edge cases with nested `combine` calls

```js
import {createEvent, createStore, combine} from 'effector'

const event = createEvent()
const $store = createStore(0).on(event, s => s + 1)

const $combined = combine([$store, combine([$store.map(d => d + 1)])])
$combined.watch(e => fn(e))
// => [0, [1]]
event()
// => [1, [2]]
```

[Try it](https://share.effector.dev/gQGceQe6)

## effector-react 20.5.2

- Add ability to infer `fn` argument types without `as const` in `useStoreMap`.
  In [effector-react 20.0.3](https://github.com/effector/effector/blob/master/CHANGELOG.md#effector-react-2003) we introduced an improvement for `useStoreMap` types, which helps to infer types of `fn` arguments from `keys`. And now `useStoreMap` types improved even more: every item in second argument will have its own type even without `as const`, out from a box

[Type tests](https://github.com/effector/effector/blob/5176da5791cc1fa454e89a508e9fc0d5abc3705c/src/types/__tests__/effector-react/useStoreMap.test.tsx#L106)

[useStoreMap in docs](https://effector.dev/api/effector-react/useStoreMap)

[PR #274](https://github.com/effector/effector/pull/274) (thanks [@abliarsar](https://github.com/abliarsar))

```typescript
import React from 'react'
import {createStore} from 'effector'
import {useStoreMap} from 'effector-react'

type User = {
  username: string
  email: string
  bio: string
}

const $users = createStore<User[]>([
  {
    username: 'alice',
    email: 'alice@example.com',
    bio: '. . .',
  },
  {
    username: 'bob',
    email: 'bob@example.com',
    bio: '~/ - /~',
  },
  {
    username: 'carol',
    email: 'carol@example.com',
    bio: '- - -',
  },
])

export const UserProperty = ({id, field}: {id: number; field: keyof User}) => {
  const value = useStoreMap({
    store: $users,
    keys: [id, field],
    fn: (users, [id, field]) => users[id][field] || null,
  })
  return <div>{value}</div>
}
```

## effector 20.8.0

- Allow to use objects and arrays with stores in sample source

```js
import {createStore, createEvent, sample, combine} from 'effector'

const trigger = createEvent()
const objectTarget = createEvent()
const arrayTarget = createEvent()

const $a = createStore('A')
const $b = createStore('B')

sample({
  source: {a: $a, b: $b},
  clock: trigger,
  target: objectTarget,
})

sample({
  source: [$a, $b],
  clock: trigger,
  target: arrayTarget,
})

objectTarget.watch(obj => {
  console.log('sampled object', obj)
})
arrayTarget.watch(array => {
  console.log('sampled array', array)
})

trigger()
// sampled object {a: 'A', b: 'B'}
// sampled array ['A', 'B']

/* old way to do this: */

sample({
  source: combine({a: $a, b: $b}),
  clock: trigger,
  target: objectTarget,
})

sample({
  source: combine([$a, $b]),
  clock: trigger,
  target: arrayTarget,
})
```

[Try it](https://share.effector.dev/GcYoDBf8)

## effector-react 20.5.0

- Pass props to `Gate.open` & `Gate.close` events

```js
import {createGate} from 'effector-react'

const PageMeta = createGate()

PageMeta.open.watch(props => {
  console.log('page meta', props)
})

const App = () => (
  <>
    <PageMeta name="admin page" />
    <div>body</div>
  </>
)
ReactDOM.render(<App />, document.getElementById('root'))
// => page meta {name: 'admin page'}
```

[Try it](https://share.effector.dev/5g7jdANZ)

## effector 20.7.0

- Add `domain.createStore` as alias for `domain.store` ([proposal](https://github.com/effector/effector/issues/186))
- Add `domain.createEvent` as alias for `domain.event`
- Add `domain.createEffect` as alias for `domain.effect`
- Add `domain.createDomain` as alias for `domain.domain`

## effector 20.6.2

- Improve `sample` typings for typescript (PR [#248](https://github.com/effector/effector/pull/248), fix [#247](https://github.com/effector/effector/issues/247)) (thanks [@bloadvenro](https://github.com/bloadvenro))

## effector 20.6.1, effector-react 20.4.1, effector-vue 20.3.2

- Add typescript typings for [compat builds](https://github.com/effector/effector/blob/master/CHANGELOG.md#effector-2010)
- Improve built-in source maps

## effector 20.6.0

- Add support for arrays to `forward`

```js
import {createEvent, forward} from 'effector'

const firstSource = createEvent()
const secondSource = createEvent()
const firstTarget = createEvent()
const secondTarget = createEvent()

forward({
  from: [firstSource, secondSource],
  to: [firstTarget, secondTarget],
})

firstTarget.watch(e => console.log('first target', e))
secondTarget.watch(e => console.log('second target', e))

firstSource('A')
// => first target A
// => second target A
secondSource('B')
// => first target B
// => second target B
```

[Try it](https://share.effector.dev/SRwLtX4l)

## effector-vue 20.3.0

- Add `createComponent` HOC for TypeScript usage. This HOC provides type-safe properties in vue components.

```typescript
// component.vue
import {createStore, createApi} from 'effector'
import {createComponent} from 'effector-vue'

const $counter = createStore(0)
const {update} = createApi($counter, {
  update: (_, value: number) => value,
})

export default createComponent(
  {
    name: 'Counter',
    methods: {
      update,
      handleClick() {
        const value = this.$counter + 1 // this.$counter <- number ( typescript tips )
        this.update(value)
      },
    },
  },
  {$counter},
)
```

## effector 20.5.0

- Merge `createStoreObject` to `combine` to reduce api surface. Wherever `createStoreObject` was used, it can be replaced with `combine`

```js
import {createStore, combine, createStoreObject} from 'effector'

const $r = createStore(255)
const $g = createStore(0)
const $b = createStore(255)

const $color = combine({r: $r, g: $g, b: $b})
$color.watch(console.log)
// => {r: 255, b: 0, b: 255}

const $colorOld = createStoreObject({r, g, b})
$colorOld.watch(console.log)
// => {r: 255, b: 0, b: 255}
```

[Try it](https://share.effector.dev/YmXUET9b)

- Add ability to use arrays of stores with `combine`

```js
import {createStore, combine} from 'effector'

const $r = createStore(255)
const $g = createStore(0)
const $b = createStore(255)

const $color = combine([$r, $g, $b])
$color.watch(console.log)
// => [255, 0, 255]
```

[Try it](https://share.effector.dev/WXJoaXQw)

## effector 20.4.4

- Ensure that both `effect.done` and `effect.fail` are called before `effect.finally` watchers, thereby preventing side-effects from interrupting pure computations

## effector 20.4.3

- Throw expected error in case with `sample({clock: undefined})`

```js
import {createStore, sample} from 'effector'

sample({
  source: createStore(null),
  clock: undefined,
})
// Throw "config.clock should be defined"
```

## effector 20.4.1

- Improve `forward` typings for typescript (PR [#229](https://github.com/effector/effector/pull/229), fix [#174](https://github.com/effector/effector/issues/174)) (thanks [@bloadvenro](https://github.com/bloadvenro))
- Add typescript typings for `clearNode(domain)`, introduced in [effector 20.2.0](https://github.com/effector/effector/blob/master/CHANGELOG.md#effector-2020)

## effector-vue 20.2.1

- Add typescript typings for object shape, introduced in [effector-vue 20.2.0](https://github.com/effector/effector/blob/master/CHANGELOG.md#effector-vue-2020)

```js
const counter = createStore(0)

new Vue({
  effector: {
    counter, // would create `counter` in template
  },
})
```

## effector 20.4.0

- Introduce `guard`: conditional event routing
  Control one event with the help of another: when the condition and the data are in different places, then we can use guard with stores as a filters to trigger events when condition state is true, thereby modulate signals without mixing them

```js
import {createStore, createEffect, createEvent, guard, sample} from 'effector'

const clickRequest = createEvent()
const fetchRequestFx = createEffect({
  handler: n => new Promise(rs => setTimeout(rs, 2500, n)),
})

const $clicks = createStore(0).on(clickRequest, x => x + 1)
const $requests = createStore(0).on(fetchRequestFx, x => x + 1)

const isIdle = fetchRequestFx.pending.map(pending => !pending)

/*
on clickRequest, take current $clicks value,
and call fetchRequestFx with it
if isIdle value is true
*/
guard({
  source: sample($clicks, clickRequest),
  filter: isIdle,
  target: fetchRequestFx,
})
```

See [ui visualization](https://share.effector.dev/zLB4NwNV)

Also, `guard` can accept common function predicate as a filter, to drop events before forwarding them to target

```js
import {createEffect, createEvent, guard} from 'effector'

const searchUserFx = createEffect()
const submitForm = createEvent()

guard({
  source: submitForm,
  filter: user => user.length > 0,
  target: searchUserFx,
})

submitForm('') // nothing happens
submitForm('alice') // ~> searchUserFx('alice')
```

[Type inference](https://github.com/effector/effector/blob/master/src/types/__tests__/effector/guard.test.js)
[Implementation tests](https://github.com/effector/effector/blob/master/src/effector/__tests__/guard.test.js)

- Introduce `name` property in `sample` parameters list

Each basic entity in effector (event/effect/store/domain) may have a name. You now can name sampled entities in the same
manner as basic ones.

```js
import {createStore, sample} from 'effector'

const $store = createStore(null)

const sampled = sample({
  source: $store,
  name: 'sampled $store',
})

console.log(sampled.shortName) // 'sampled foo'
```

## effector 20.3.2

- Allow typescript to refine type with `split` method ([PR](https://github.com/effector/effector/pull/215))
- Improve type inference of effects with optional arguments in Typescript ([PR](https://github.com/effector/effector/pull/214))
- Ensure that effect handler is called only after effect update itself, thereby preventing side-effects from interrupting pure computations

```js
import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, createEvent, createEffect, sample} from 'effector'
import {useList} from 'effector-react'

const updateItem = createEvent()
const resetItems = createEvent()
const processClicked = createEvent()

const processItemsFx = createEffect({
  async handler(items) {
    for (let {id} of items) {
      //event call inside effect
      //should be applied to items$
      //only after processItemsFx itself
      updateItem({id, status: 'PROCESS'})
      await new Promise(r => setTimeout(r, 3000))
      updateItem({id, status: 'DONE'})
    }
  },
})

const $items = createStore([
  {id: 0, status: 'NEW'},
  {id: 1, status: 'NEW'},
])
  .on(updateItem, (items, {id, status}) =>
    items.map(item => (item.id === id ? {...item, status} : item)),
  )
  .on(processItemsFx, items => items.map(({id}) => ({id, status: 'WAIT'})))
  .reset(resetItems)

sample({
  source: $items,
  clock: processClicked,
  target: processItemsFx,
})

const App = () => (
  <section>
    <header>
      <h1>Jobs list</h1>
    </header>
    <button onClick={processClicked}>run tasks</button>
    <button onClick={resetItems}>reset</button>
    <ol>
      {useList($items, ({status}) => (
        <li>{status}</li>
      ))}
    </ol>
  </section>
)

ReactDOM.render(<App />, document.getElementById('root'))
```

[Try it](https://share.effector.dev/viApFDXj)

## effector 20.3.1

- Fix edge case when `clearNode` been called on store belonged to certain domain led to the removal of the entire domain

## effector-react 20.4.0

- Add support for `keys` field in `useList`. By default, `useList` rerenders only when some of its items was changed.
  Howewer, sometimes we need to update items when some external value (e.g. props field or state of another store) is changed.
  In such cases we need to tell react about our dependencies and pass keys explicitly.

```js
import React from 'react'
import ReactDOM from 'react-dom'
import {createEvent, createStore, restore} from 'effector'
import {useStore, useList} from 'effector-react'

const renameUser = createEvent()

const $user = restore(renameUser, 'alice')
const $friends = createStore(['bob'])

const List = () => {
  const userName = useStore($user)

  return useList($friends, {
    keys: [userName],
    fn: friend => (
      <div>
        {friend} is a friend of {userName}
      </div>
    ),
  })
}
ReactDOM.render(<List />, document.getElementById('root'))
// => <div> bob is a friend of alice </div>
setTimeout(() => {
  renameUser('carol')
  // => <div> bob is a friend of carol </div>
}, 500)
```

[Try it](https://share.effector.dev/VSAHPO60)

## effector 20.3.0

- Add `shortName` to domains

```js
import {createDomain} from 'effector'

const domain = createDomain('feature')

console.log(domain.shortName)
// => feature
```

[Try it](https://share.effector.dev/vKObFGtp)

- Add `history` to domains with read-only sets of events, effects, stores and subdomains

```js
import {createDomain} from 'effector'
const domain = createDomain()
const eventA = domain.event()
const $storeB = domain.store(0)

console.log(domain.history)
// => {stores: Set{$storeB}, events: Set{eventA}, domains: Set, effects: Set}
```

[Try it](https://share.effector.dev/HAG9a8nk)

## effector-vue 20.2.0

- Add support for object shape

```js
const counter = createStore(0)

new Vue({
  effector: {
    counter, // would create `counter` in template
  },
})
```

## effector 20.2.0

- Add support for domains to `clearNode`

```js
import {createDomain, clearNode} from 'effector'

const root = createDomain()
const child = root.domain()

clearNode(child)
```

- Add `.sid` - stable hash identifier for events, effects, stores and domains, preserved between environments, to handle client-server interaction within the same codebase.

```js
/* common.js */

import {createEffect} from 'effector'

export const getUserFx = createEffect({sid: 'GET /user'})

console.log(getUsers.sid)
// => GET /user

/* worker.js */

import {getUsers} from './common'

getUsers.use(userID => fetch(userID))

getUsers.done.watch(({result}) => {
  postMessage({sid: getUsers.sid, result})
})

onmessage = async ({data}) => {
  if (data.sid !== getUsers.sid) return
  getUsers(data.userID)
}

/* client.js */

import {createEvent} from 'effector'
import {getUsers} from './common'

const onMessage = createEvent()

const worker = new Worker('worker.js')
worker.onmessage = onMessage

getUsers.use(
  userID =>
    new Promise(rs => {
      worker.postMessage({sid: getUsers.sid, userID})
      const unwatch = onMessage.watch(({data}) => {
        if (data.sid !== getUsers.sid) return
        unwatch()
        rs(data.result)
      })
    }),
)
```

The key is that sid can be autogenerated by `effector/babel-plugin` with default config and it will be stable between builds

See [example project](https://github.com/effector/effector/tree/master/examples/worker-rpc)

- Add support for implicit void params in `createEffect` for typescript [#106](https://github.com/effector/effector/issues/106)

```typescript
const handler = () => console.log()

const fx = createEffect({handler})

fx()
```

- Fix bug with `cannot read property .toString of undefined` error during store initialization

## effector-react 20.3.0

- Add support for react hooks in `createComponent`

## effector-react 20.2.2, effector-vue 20.1.2

- `effector-react`, `effector-vue` and `effector` itself have [compat](https://github.com/effector/effector/releases/tag/effector%4020.1.0) builds for compatibility with old devices without babel. In such versions, it should import `effector/compat`, not just `effector` (Fix [#173](https://github.com/effector/effector/issues/173))

## effector 20.1.2

- Allow typescript to refine type of payload if `event.filter({fn})` got a predicate function as a callback [PR](https://github.com/effector/effector/pull/170)

```typescript
import {createEvent} from 'effector'

const event = createEvent<string | number>()

const isString = (value: any): value is string => typeof value === 'string'
const isNumber = (value: any): value is number => typeof value === 'number'

const str = event.filter({fn: isString}) // Event<string>
const num = event.filter({fn: isNumber}) // Event<number>

str.watch(value => value.slice()) // OK now
num.watch(value => value.toFixed(2)) // OK now
```

- Allow typescript to refine type with `is` methods [PR](https://github.com/effector/effector/pull/169)

```typescript
import {is} from 'effector'

//result has type Event<any> | void
function getEvent(obj: unknown) {
  if (is.event(obj)) return obj
  if (is.store(obj)) return obj.updates
}
```

- Add new fields to definition of graph nodes ([discussion](https://github.com/effector/effector/issues/91#issuecomment-511397503))

## effector 20.1.1

- Add support for IE11 to `effector/compat`
- Fix flow typings for `sample`
- Allow `effector/babel-plugin` to work in browser

## effector-react 20.2.1, effector-vue 20.1.1

- Add support for IE11 to `effector-react/compat` and `effector-vue/compat`

## effector 20.1.0

- Add `effector/compat` module to use with Smart TV (Chrome 47) apps without babel (fix [#152](https://github.com/effector/effector/issues/152)). Starting with this release, the library code is tested by browserstack.com for compatibility with our targets, including smart tv
- Improve typescript typings for `sample` (thanks [@abliarsar](https://github.com/abliarsar)) (PR [#156](https://github.com/effector/effector/pull/156))
- Fix webpack issue, which generated incorrect code with some ancient targets (IE10)

## effector-react 20.2.0

- Add `effector-react/compat` module to use with Smart TV (Chrome 47) apps without babel

## effector-vue 20.1.0

- Add `effector-vue/compat` module to use with Smart TV (Chrome 47) apps without babel

## effector-react 20.1.1

- Add `useList` for efficient rendering of store lists

```js
import React from 'react'
import ReactDOM from 'react-dom'

import {createStore} from 'effector'
import {useList} from 'effector-react'

const $list = createStore([
  {name: 'alice', age: 21},
  {name: 'bob', age: 20},
  {name: 'carol', age: 22},
])

const List = () => {
  // note that we don't need keys here any more
  const users = useList($list, ({name}, i) => (
    <div>
      {i}) {name}
    </div>
  ))
  return <div>{users}</div>
}

ReactDOM.render(<List />, document.getElementById('root'))
```

[Try it](https://share.effector.dev/KJZx0uU5)

## effector-react 20.0.5

- Fix irrelevant react memory leak warning in a few cases

## effector-react 20.0.4

- Fix a bug in `useStore` with lack of store updates triggered by react hooks in children components

## effector-react 20.0.3

- Allow `as const` typescript assertion for `useStoreMap` keys. It helps us to infer type for `fn` arguments

```typescript
import React from 'react'
import {createStore} from 'effector'
import {useStoreMap} from 'effector-react'

type User = {
  username: string
  email: string
  bio: string
}

const $users = createStore<User[]>([
  {
    username: 'alice',
    email: 'alice@example.com',
    bio: '. . .',
  },
  {
    username: 'bob',
    email: 'bob@example.com',
    bio: '~/ - /~',
  },
  {
    username: 'carol',
    email: 'carol@example.com',
    bio: '- - -',
  },
])

export const UserProperty = ({id, field}: {id: number; field: keyof User}) => {
  const value = useStoreMap({
    store: $users,
    keys: [id, field] as const,
    fn: (users, [id, field]) => users[id][field] || null,
  })

  return <div>{value}</div>
}
```

In typescript versions below 3.4, you can still use an explicit type assertion

```typescript
import React from 'react'
import {createStore} from 'effector'
import {useStoreMap} from 'effector-react'

type User = {
  username: string
  email: string
  bio: string
}

const $users = createStore<User[]>([
  {
    username: 'alice',
    email: 'alice@example.com',
    bio: '. . .',
  },
  {
    username: 'bob',
    email: 'bob@example.com',
    bio: '~/ - /~',
  },
  {
    username: 'carol',
    email: 'carol@example.com',
    bio: '- - -',
  },
])

export const UserProperty = ({id, field}: {id: number; field: keyof User}) => {
  const value = useStoreMap({
    store: $users,
    keys: [id, field] as [number, keyof User],
    fn: (users, [id, field]) => users[id][field] || null,
  })

  return <div>{value}</div>
}
```

[as const](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) in typescript docs

## effector-react 20.0.2

- Fix bug with additional rerender in case of `useStore` argument change

## effector-react 20.0.1

- Fix flow typings for `useStoreMap`

## effector 20.0.0

- Add `merge` for merging events

```js
import {createEvent, merge} from 'effector'

const foo = createEvent()
const bar = createEvent()
const baz = merge([foo, bar])

baz.watch(v => console.log('merged event triggered: ', v))

foo(1)
// => merged event triggered: 1
bar(2)
// => merged event triggered: 2
```

[Try it](https://share.effector.dev/WxUgr6dZ)

- Add `split` for pattern-matching over events

```js
import {createEvent, split} from 'effector'

const message = createEvent()

const messageByAuthor = split(message, {
  bob: ({user}) => user === 'bob',
  alice: ({user}) => user === 'alice',
})
messageByAuthor.bob.watch(({text}) => {
  console.log('[bob]: ', text)
})
messageByAuthor.alice.watch(({text}) => {
  console.log('[alice]: ', text)
})

message({user: 'bob', text: 'Hello'})
// => [bob]: Hello
message({user: 'alice', text: 'Hi bob'})
// => [alice]: Hi bob

/* default case, triggered if no one condition met */
const {__: guest} = messageByAuthor
guest.watch(({text}) => {
  console.log('[guest]: ', text)
})
message({user: 'unregistered', text: 'hi'})
// => [guest]: hi
```

[Try it](https://share.effector.dev/QXZsR5yM)

- Allow `clearNode` to automatically dispose all related intermediate steps

```js
import {createEvent, clearNode} from 'effector'

const source = createEvent()
const target = source.map(x => {
  console.log('intermediate step')

  return x
})

target.watch(x => console.log('target watcher'))
source()
// => intermediate step
// => target watcher
clearNode(target)
source() // ~ no reaction ~
```

[Try it](https://share.effector.dev/Ip5FAXiR)

- Fix promise warning for effects

- Add `effect.finally`

```js
import {createEffect} from 'effector'

const fetchApiFx = createEffect({
  handler: n =>
    new Promise(resolve => {
      setTimeout(resolve, n, `${n} ms`)
    }),
})

fetchApiFx.finally.watch(response => {
  console.log(response)
})

await fetchApiFx(10)
// => {status: 'done', result: '10 ms', params: 10}

// or

// => {status: 'fail', error: Error, params: 10}
```

[Try it](https://share.effector.dev/9Aoba2lk)

- Add types for createEvent with config instead of string
- Add types for createEffect with config instead of string
- Add `event.filterMap` as new alias for `event.filter(fn)`
- Remove `extract`, `withProps`, `is.*` re-exports

## effector-react 20.0.0

- Removed unstable_createStoreProvider

## effector-vue 20.0.0

Vue adapter for effector 20

## effector-react 19.1.2

- Add `useStoreMap` hook to select part from a store. [Motivation](https://github.com/effector/effector/issues/118)

```js
import {createStore} from 'effector'
import {useStore, useStoreMap} from 'effector-react'
import React from 'react'
import ReactDOM from 'react-dom'

const User = ({id}) => {
  const user = useStoreMap({
    store: $users,
    keys: [id],
    fn: (users, [id]) => users[id],
  })

  return (
    <div>
      {user.name} ({user.age})
    </div>
  )
}

const UserList = () => useStore(userID$).map(id => <User id={id} key={id} />)

const $user = createStore({
  alex: {age: 20, name: 'Alex'},
  john: {age: 30, name: 'John'},
})

const $userID = $user.map(users => Object.keys(users))

ReactDOM.render(<UserList />, document.getElementById('root'))
```

[Try it](https://share.effector.dev/EbyvGcQX)

## effector 19.1.0

- Add support for `event.filter` with common predicate functions

```js
import {createEvent} from 'effector'

const event = createEvent()

// that event will be triggered only when fn returns true
const filtered = event.filter({
  fn: x => x > 0,
})

filtered.watch(x => console.log('x =', x))

event(-2) // nothing happens
event(2) // => x = 2
```

## effector-vue 19.0.1

- Fix typescript typings [#116](https://github.com/effector/effector/pull/116)

## effector, effector-react, effector-vue 19.0.0

To indicate the stability of the project, we adopting semantic versioning and happy to announce version 19.0.0 for all packages. And to make the transition easier, that release contains no breaking changes; simple replacement of "^0.18.\*" to "^19.0.0" is safe for sure ☄️

## effector 0.18.10-0.18.11

- Implement event `store.updates`, representing updates of given store. Use case: watchers, which will not trigger immediately after creation (unlike `store.watch`)
  > [see spec for `store.updates` in tests](https://github.com/effector/effector/blob/master/src/effector/store/__tests__/updates.test.js)

```js
import {createStore, is} from 'effector'

const $clicksAmount = createStore(0)
is.event($clicksAmount.updates) // => true

$clicksAmount.watch(amount => {
  console.log('will be triggered with current state, immediately, sync', amount)
})

$clicksAmount.updates.watch(amount => {
  console.log('will not be triggered unless store value is changed', amount)
})
```

[Try it](https://share.effector.dev/cHkiPTtQ)

## effector 0.18.9

- Allow `clearNode` to erase information from the node itself, in addition to the existing opportunity to erase subscribers (thanks @artalar)
  > [use cases for `clearNode` checked in tests](https://github.com/effector/effector/blob/master/src/effector/__tests__/clearNode.test.js)

## effector 0.18.7-0.18.8

- Add support for passing multiply items at once in `store.reset`

```js
import {createStore, createEvent} from 'effector'

const firstTrigger = createEvent()
const secondTrigger = createEvent()

const $target = createStore(0).reset(firstTrigger, secondTrigger)
```

- Add support for `createEvent` and `createEffect` with config (see next code example)

- Add `.pending` property for effects

```js
import React from 'react'
import {createEffect} from 'effector'
import {createComponent} from 'effector-react'

const fetchApiFx = createEffect({
  handler: n => new Promise(resolve => setTimeout(resolve, n)),
})

fetchApiFx.pending.watch(console.log)

const Loading = createComponent(
  fetchApiFx.pending,
  (props, pending) => pending && <div>Loading...</div>,
)

fetchApi(5000)
```

it's a shorthand for common use case

```js
import {createEffect, createStore} from 'effector'

const fetchApiFx = createEffect()

//now you can use fetchApiFx.pending instead
const $isLoading = createStore(false)
  .on(fetchApiFx, () => true)
  .on(fetchApiFx.done, () => false)
  .on(fetchApiFx.fail, () => false)
```

[Try it](https://share.effector.dev/AupKHTcS)

- Introduce `sample`. Sample allows to integrate rapidly changed values with common ui states

```js
import React from 'react'
import {createStore, createEvent, sample} from 'effector'
import {createComponent} from 'effector-react'

const tickEvent = createEvent()
const $tick = createStore(0).on(tickEvent, n => n + 1)

setInterval(tickEvent, 1000 / 60)

const mouseClick = createEvent()
const $clicks = createStore(0).on(mouseClick, n => n + 1)

const sampled = sample($tick, $clicks, (tick, clicks) => ({
  tick,
  clicks,
}))

const Monitor = createComponent(sampled, (props, {tick, clicks}) => (
  <p>
    <b>tick: </b>
    {tick}
    <br />
    <b>clicks: </b>
    {clicks}
  </p>
))

const App = () => (
  <div>
    <Monitor />
    <button onClick={mouseClick}>click to update</button>
  </div>
)
```

[see sample in action here](https://share.effector.dev/oyymGkcS)

[Sampling (signal processing)](<https://en.wikipedia.org/wiki/Sampling_(signal_processing)>)

- Add babel plugin for automatic naming of events, effects and stores (useful for identifying resources with SSR)
- Add babel plugin for automatic displayName for react components

```js
import React from 'react'
import {createStore, createEvent} from 'effector'
import {createComponent} from 'effector-react'

const $title = createStore('welcome')

console.log('store.shortName', $title.shortName)
// store.shortName title

const clickTitle = createEvent()

console.log('event.shortName', clickTitle.shortName)
// store.shortName clickTitle

const Title = createComponent({title: $title}, (props, title) => (
  <h1>{title}</h1>
))

console.log('Component.displayName', Title.displayName)
// Component.displayName Title
```

Plugins are available out from a box

`.babelrc`:

```json
{
  "plugins": ["effector/babel-plugin", "effector/babel-plugin-react"]
}
```

[see plugins in action](https://share.effector.dev/pMOmdWFI)

- Add support for passing events and effects to watchers

```js
import {createStore, createEvent} from 'effector'

const updates = createEvent()
const $state = createStore(0)

$state.watch(updates)
```

- Improve execution order for sync effects
- Improve typescript typings for createApi (#102)

## effector-react 0.18.10

- Add initial props factory to `createComponent`

```js
import {users} from './feature'

const UserItem = createComponent(
  initialProps => users.map(users => users[initialProps.id]),
  (_, user) => {
    return <div>{user.username}</div>
  },
)

const UserList = createComponent(users, (_, users) => {
  return users.map(user => <TodoItem key={user.id} id={user.id} />)
})
```

- Implicitly convert objects to `createStoreObject` in `createComponent`

```js
const deposit = createEvent()
const $username = createStore('zerobias')
const $balance = createStore(0)

const Profile = createComponent(
  {username: $username, balance: $balance},
  (_, {username, balance}) => {
    return (
      <div>
        Hello, {username}. Your balance is {balance}
        <button onClick={deposit}>Deposit</button>
      </div>
    )
  },
)
```

- Add `mounted` and `unmounted` events to components created by `createComponent`

```js
import {counter, increment} from './feature'

const Counter = createComponent(counter, (_, state) => {
  return (
    <div>
      {state}
      <button onClick={increment}>+</button>
    </div>
  )
})

Counter.mounted.watch(({props, state}) => {
  counter.on(increment, s => s + 1)
})

Counter.unmounted.watch(({props, state}) => {
  counter.off(increment)
})
```

- Replace `useLayoutEffect` with `useIsomorphicLayoutEffect` to support server-side rendering

## effector-react 0.18.9

- Replace `useEffect` with `useLayoutEffect` in `useStore` hook to response to state changes immediately

## 0.18.5-0.18.6

- Optimize combined stores: no intermediate steps no more

```js
import {createStore, createEvent, createStoreObject, combine} from 'effector'

const updateField = createEvent('update $field value')

const $field = createStore('').on(updateField, (state, upd) => upd.trim())

const $isEmpty = $field.map(value => value.length === 0)
const $isTooLong = $field.map(value => value.length > 12)
const $isValid = combine(
  $isEmpty,
  $isTooLong,
  (isEmpty, isTooLong) => !isEmpty && !isTooLong,
)

createStoreObject({
  field: $field,
  isEmpty: $isEmpty,
  isTooLong: $isTooLong,
  isValid: $isValid,
}).watch(data => {
  console.log(data)
})

// => {field: '', isEmpty: true, isTooLong: false, isValid: false}

updateField('bobby')

// => {field: 'bobby', isEmpty: false, isTooLong: false, isValid: true}
```

- Use the new kernel. Provide improved eventual consistency: any side effects will be triggered only after performing all pure computations

- Add `is` namespace for all type validators

```js
import {createStore, createEvent, is} from 'effector'

const $store = createStore('value')
const event = createEvent('some event')

is.store($store) // => true
is.event($store) // => false
is.unit($store) // => true

is.store(event) // => false
is.event(event) // => true
is.unit(event) // => true

is.store(null) // => false
is.event(null) // => false
is.unit(null) // => false
```

- Add `clearNode` to break references and subscriptions between events, stores, etc

- Add support for custom datatypes by making `step` constructors, `createNode` and `launch` functions public

```js
import {createNode, launch, step, createStore} from 'effector'

const $target = createStore(0)
$target.watch(n => console.log('current n = ', n))
// => current n = 0

const customNode = createNode({
  scope: {max: 100, lastValue: -1, add: 10},
  child: [$target], // you can forward later as well
  node: [
    step.compute({
      fn: (arg, {add}) => arg + add,
    }),
    step.filter({
      fn: (arg, {max, lastValue}) => arg < max && arg !== lastValue,
    }),
    step.compute({
      fn(arg, scope) {
        scope.lastValue = arg
        return arg
      },
    }),
  ],
})

launch(customNode, 3)
// => current n = 13
launch(customNode, 95)
// no reaction, as 95 + 10 > 100
launch(customNode, 5)
// => current n = 15
launch(customNode, 5)
// no reaction, as we filtered it out with step.filter
```

- Fix `fromObservable`, ensure it works with `redux` as a typical library with [`Symbol.observable`](https://github.com/benlesh/symbol-observable) support

```js
import {fromObservable} from 'effector'
import * as redux from 'redux'

const INCREMENT_STATE = 'INCREMENT_STATE'
const reduxStore = redux.createStore((state = 1, action) => {
  switch (action.type) {
    case INCREMENT_STATE:
      return state + 1
    default:
      return state
  }
})

const updateEvent = fromObservable(reduxStore)
updateEvent.watch(state => {
  console.log('redux state = ', state)
})

reduxStore.dispatch({type: INCREMENT_STATE})
// => redux state = 1
```

- Fix `version`, now it always equals version in package.json

```js
import {version} from 'effector'

console.log(version)
// => 0.18.6
```

- Add support forwarding to effects

```js
import {createEffect, createEvent, forward} from 'effector'

const trigger = createEvent()

const fx = createEffect('side-effect', {
  async handler(args) {
    await new Promise(rs => setTimeout(rs, 500))
    console.log('args: ', args)
  },
})

forward({
  from: trigger,
  to: fx,
})

trigger('payload')
// ~ after 500 ms
// => args: payload
```

## 0.18.3-0.18.4

- Add version variable to public exports

```js
import {version} from 'effector'

console.log(version)
```

- Add effect handler to domain [4c6ae8](https://github.com/effector/effector/commit/4c6ae801b301067473f583b490eefde7b3287afc)

- Add `Unit<T>` as common interface implemented by `Event`, `Effect` and `Store`

- Add `isStore`, `isEvent`, `isEffect` and `isUnit` validators

```js
import {createStore, createEvent, isStore, isEvent, isUnit} from 'effector'

const event = createEvent('some event')
const $store = createStore('value')

isStore($store) // => true
isEvent($store) // => false
isUnit($store) // => true

isStore(event) // => false
isEvent(event) // => true
isUnit(event) // => true

isStore(null) // => false
isEvent(null) // => false
isUnit(null) // => false
```

- Add extended `createStore` with config

```js
import {createStore} from 'effector'

const $store = createStore('value', {
  name: 'value store',
})
```

- Publish babel-plugins

- Improve naming for chrome performance timeline

- Fix typescript typings [#45](https://github.com/effector/effector/issues/45)

- Fix `event.prepend` bug [#35](https://github.com/effector/effector/issues/35)

## 0.18.2

- Fix webpack usage issue. To prevent this in a future, webpack integration test was added.

- Improve typescript typings for `createApi`. This code example became type checked

```js
import {createStore, createApi} from 'effector'

const $text = createStore('')

const {addMessage, cut} = createApi($text, {
  addMessage: (text, message) => text + `\n` + message
  cut: (text, {fromIndex, size}) => text.slice(fromIndex, fromIndex + size),
})

```

- Add umd bundle to npm. Therefore, you can use cdn to include library without bundlers

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://unpkg.com/effector@0.18.2/effector.umd.js"></script>
  </head>
  <body>
    <script>
      const header = document.createElement('h1')
      document.body.appendChild(header)
      const $text = effector.createStore('hello')
      $text.watch(str => (header.innerHTML = str))
    </script>
  </body>
</html>
```

## 0.18.1

- Add `forward`: common function for forwarding updates and events

```js
import {forward} from 'effector'

const unsubscribe = forward({
  from: Event | Store,
  to: Event | Store | Effect,
})
```

- add support for storages in `store.on`

```js
import {createStore} from 'effector'

const $name = createStore('name')
const $counter = createStore(0).on(name, (count, name) => count++)
```

- Allow to pass `{handler: Function}` as second argument to `createEffect`

```js
import {createEffect} from 'effector'

const callApiFx = createEffect('call api', {
  async handler(url) {
    const res = await fetch(url)
    return res
  },
})
```

- Make `effect.use` return the same effect instead of void (ability to chain method calls)

```js
import {createEffect} from 'effector'

const callApiFx = createEffect('call api').use(url => fetch(url))
```

## 0.18.0

- Log events into Chrome devtools performance timeline
- Add notifications about errors inside computation chain
- Add `store.defaultState` property
- **effector-react**: Add `createComponent`
- Make `withProps` static function
- Make effect return plain promise

## 0.18.0-beta.10

- Add Gate

```js
import {type Gate, createGate} from 'effector-react'

const AppGate = createGate('app')
const MainPageGate = AppGate.childGate('main page')

export default ({isLoading, meta}) => (
  <div>
    Application
    <AppGate isLoading={isLoading} />
    {!isLoading && (
      <div>
        Main page
        <MainPageGate meta={meta} />
      </div>
    )}
  </div>
)
AppGate.state.watch(({isLoading}) => isLoading)
```

## 0.17.7

- Keep and replay the whole domain history for every new hook

## 0.17.6

- Add domain hooks for handle new events, effects or stores in domain.

```js
import {createDomain} from 'effector'

const mainPage = createDomain('main page')
mainPage.onCreateEvent(event => {
  console.log('new event: ', event.getType())
})
mainPage.onCreateStore(store => {
  console.log('new store: ', store.getState())
})
const mount = mainPage.event('mount')
// => new event: main page/mount

const pageStore = mainPage.store(0)
// => new store: 0
```

- Improve TypeScript typings

## 0.17.5

- Add ability to use createEvent, createEffect and createDomain without arguments (omit name)
- Fix wrong order of effect names
- Add `createWrappedDomain` to watch all nested events and updates
- Add `extract` to watch only part of nested storages
- Deprecate `.epic` method (library supports symbol-observable, so assumed that `most.from(event)` or `Observable.Of(store)` covered all use cases)

## 0.17.4

- **effector-react**: Add check for mounting of store consumer
- Add `effect.use.getCurrent()` method to get current used function
- Improve type inference in flow typing for `createStoreObject`
- Improve public ts and flow typings

## 0.17.3

- Fix effector-react typings
- Build with node 6 target, add engine field to package.json
- Add [warning](https://www.npmjs.com/package/warning) dependency

## 0.17.2

- Memoize store.map and store updates

## 0.17.0

- Added sync graph reduction engine (it's internal)
- Added store updates memoization
- Introduced effector-react

## 0.16.0

- Removed most-subject dependency
- New api

## 0.15.0-rc.2

- Add AVar: low-level interface for asynchronous variables
- Clean up builds before publishing
- Add types dir into npm build

## 0.14.0

- Add independent `createStore` method
- Replace console.warn with console.error in warnings
- Make reducers full-featured store elements (add `.get()`, `.set(x)` and `.map(fn)` methods)
- Add observable declaration to effects, events and reducers, which allow interop in this way: `from(effect)`

## 0.13.0

- Build via rollup
- New module architechture

## 0.12.0

- Exclude coverage from npm build
- Rename `mill` to `collect`
- Rename `joint` to `combine`

## 0.11.1

- Remove source files from npm release

## 0.11.0

- Add support for sync functions in `.use`
- **breaking** Rename config option `effectImplementationCheck` to `unused`

## 0.10.2

- Fix overriding of flow modules

## 0.10.0

- **breaking** Removed `rootDomain` alias for `createRootDomain`
- Fixed duplication of `typeConstant` events
- Added sync event propagation
- Catching of watch function errors
- Added warning to port errors
- Added type aliases `DomainAuto`, `EventAuto` and `EffectAuto`
- Added `mill` fluent "AND" reducer combinator

```js
import {mill, type MillType, type Reducer} from 'effector'

type A = 'foo'
type B = 'bar'
declare var reducerA: Reducer<A>
declare var reducerB: Reducer<B>

const tuple: MillType<A, B> = mill().and(reducerA).and(reducerB)

const union: Reducer<{
  a: A,
  b: B,
  staticField: string,
}> = tuple.joint((a: A, b: B) => ({
  a,
  b,
  staticField: 'its ok',
}))
```

## 0.9.1

- Added hot reload support for root domains
- Added support for dispatching halt action

```js
import {createHaltAction} from 'effector'

store.dispatch(createHaltAction()) //This store will be unsubscribed
```

## 0.9.0

First stable version

## Before 0.9.0

Proof of concept
