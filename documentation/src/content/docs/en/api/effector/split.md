---
title: split
redirectFrom:
  - /api/effector/split
  - /docs/api/effector/split
---

```ts
import { split } from "effector";
```

Choose one of cases by given conditions. It "splits" source unit into several events, which fires when payload matches their conditions. Works like pattern matching for payload values and external stores

# Concepts (#concepts)

## Case mode (#concepts-case-mode)

Mode in which target case is selected by the name of its field. Case could be selected from data in `source` by [case function](/en/api/effector/split#case-function) or from external [case store](/en/api/effector/split#case-store) which kept current case name. After selection data from `source` will be sent to corresponding `cases[fieldName]` (if there is one), if none of the fields matches, then the data will be sent to `cases.__` (if there is one).

**See also**:

- [case store](/en/api/effector/split#case-store)
- [case function](/en/api/effector/split#case-function)

## Matching mode (#concepts-matching-mode)

Mode in which each case is sequentially matched by stores and functions in fields of `match` object.
If one of the fields got `true` from store value or return of function, then the data from `source` will be sent to corresponding `cases[fieldName]` (if there is one), if none of the fields matches, then the data will be sent to `cases.__` (if there is one)

**See also**:

- [matcher store](/en/api/effector/split#matcher-store)
- [matcher function](/en/api/effector/split#matcher-function)

## Case store (#concepts-case-store)

Store with a string which will be used to choose the case by its name. Placed directly in `match` field.

```ts
split({
  source: Unit<T>
  // case store
  match: Store<'first' | 'second'>,
  cases: {
    first: Unit<T>,
    second: Unit<T>,
    __?: Unit<T>
  }
})
```

## Case function (#concepts-case-function)

String-returning function which will be called with value from `source` to choose the case by its name. Placed directly in `match` field, [should be **pure**](/en/explanation/glossary#purity)

```ts
split({
  source: Unit<T>
  // case function
  match: (value: T) => 'first' | 'second',
  cases: {
    first: Unit<T>,
    second: Unit<T>,
    __?: Unit<T>
  }
})
```

## Matcher store (#concepts-matcher-store)

Boolean store which indicates whether to choose the particular case or try the next one. Placed in fields of `match` object, might be mixed with [matcher functions](/en/api/effector/split#matcher-function)

```ts
split({
  source: Unit<T>
  match: {
    // matcher store
    first: Store<boolean>,
    second: Store<boolean>
  },
  cases: {
    first: Unit<T>,
    second: Unit<T>,
    __?: Unit<T>
  }
})
```

## Matcher function (#concepts-matcher-function)

:::info
Case store, case function and matcher store are supported since [effector 21.8.0](https://changelog.effector.dev/#effector-21-8-0)
:::

Boolean-returning function which indicates whether to choose the particular case or try the next one. Placed in fields of `match` object, might be mixed with [matcher stores](/en/api/effector/split#matcher-store), [should be **pure**](/en/explanation/glossary#purity)

```ts
split({
  source: Unit<T>
  match: {
    // matcher function
    first: (value: T) => boolean,
    second: (value: T) => boolean
  },
  cases: {
    first: Unit<T>,
    second: Unit<T>,
    __?: Unit<T>
  }
})
```

# Methods (#methods)

## `split({ source, match, cases })` (#methods-split-source-match-cases)

:::info{title="since"}
[effector 21.0.0](https://changelog.effector.dev/#effector-21-0-0)
:::

### Formulae (#methods-split-source-match-cases-formulae)

```ts
split({ source, match, cases });
```

```ts
split({
  source: Unit<T>
  // case function
  match: (data: T) => 'a' | 'b',
  cases: {
    a: Unit<T>,
    b: Unit<T>,
    __?: Unit<T>
  }
})
split({
  source: Unit<T>
  // case store
  match: Store<'a' | 'b'>,
  cases: {
    a: Unit<T>,
    b: Unit<T>,
    __?: Unit<T>
  }
})
split({
  source: Unit<T>
  match: {
    // matcher function
    a: (data: T) => boolean,
    // matcher store
    b: Store<boolean>
  },
  cases: {
    a: Unit<T>,
    b: Unit<T>,
    __?: Unit<T>
  }
})
```

### Arguments (#methods-split-source-match-cases-arguments)

- `source`: [Unit](/en/explanation/glossary#common-unit) which will trigger computation in `split`
- `match`: Single [store with string](/en/api/effector/split#case-store), single [function which returns string](/en/api/effector/split#case-function) or object with [boolean stores](/en/api/effector/split#matching-store) and [functions which returns boolean](/en/api/effector/split#matching-function)
- `cases`: Object with [units](/en/explanation/glossary#common-unit) to which data will be passed from `source` after case selection

### Returns (#methods-split-source-match-cases-returns)

`void`

### Examples (#methods-split-source-match-cases-examples)

#### Basic (#methods-split-source-match-cases-examples-basic)

```js
import { split, createEffect, createEvent } from "effector";
const messageReceived = createEvent();
const showTextPopup = createEvent();
const playAudio = createEvent();
const reportUnknownMessageTypeFx = createEffect(({ type }) => {
  console.log("unknown message:", type);
});

split({
  source: messageReceived,
  match: {
    text: (msg) => msg.type === "text",
    audio: (msg) => msg.type === "audio",
  },
  cases: {
    text: showTextPopup,
    audio: playAudio,
    __: reportUnknownMessageTypeFx,
  },
});

showTextPopup.watch(({ value }) => {
  console.log("new message:", value);
});

messageReceived({
  type: "text",
  value: "Hello",
});
// => new message: Hello
messageReceived({
  type: "image",
  imageUrl: "...",
});
// => unknown message: image
```

[Try it](https://share.effector.dev/W6VYZbfH)

#### Direct match (#methods-split-source-match-cases-examples-direct-match)

You can match directly to store api as well:

```js
import { split, createStore, createEvent, createApi } from "effector";

const messageReceived = createEvent();

const $textContent = createStore([]);

split({
  source: messageReceived,
  match: {
    text: (msg) => msg.type === "text",
    audio: (msg) => msg.type === "audio",
  },
  cases: createApi($textContent, {
    text: (list, { value }) => [...list, value],
    audio: (list, { duration }) => [...list, `audio ${duration} ms`],
    __: (list) => [...list, "unknown message"],
  }),
});

$textContent.watch((messages) => {
  console.log(messages);
});

messageReceived({
  type: "text",
  value: "Hello",
});
// => ['Hello']
messageReceived({
  type: "image",
  imageUrl: "...",
});
// => ['Hello', 'unknown message']
messageReceived({
  type: "audio",
  duration: 500,
});
// => ['Hello', 'unknown message', 'audio 500 ms']
```

[Try it](https://share.effector.dev/32FNNk8H)

## `split(source, match)` (#methods-split-source-match)

:::info{title="since"}
[effector 20.0.0](https://changelog.effector.dev/#effector-20-0-0)
:::

### Formulae (#methods-split-source-match-formulae)

```ts
split(source, match);
```

### Arguments (#methods-split-source-match-arguments)

1. `source`: [Unit](/en/explanation/glossary#common-unit) which will trigger computation in `split`
2. `match` (_Object_): Schema of cases, which uses names of resulting events as keys, and matching function*((value) => Boolean)*

### Returns (#methods-split-source-match-returns)

(Object) – Object, having keys, defined in `match` argument, plus `__`(two underscores) – which stands for `default` (no matches met) case.

### Examples (#methods-split-source-match-examples)

#### Basic (#methods-split-source-match-examples-basic)

```js
import { createEvent, split } from "effector";

const message = createEvent();

const messageByAuthor = split(message, {
  bob: ({ user }) => user === "bob",
  alice: ({ user }) => user === "alice",
});
messageByAuthor.bob.watch(({ text }) => {
  console.log("[bob]: ", text);
});
messageByAuthor.alice.watch(({ text }) => {
  console.log("[alice]: ", text);
});

message({ user: "bob", text: "Hello" });
// => [bob]: Hello
message({ user: "alice", text: "Hi bob" });
// => [alice]: Hi bob

/* default case, triggered if no one condition met */
const { __: guest } = messageByAuthor;
guest.watch(({ text }) => {
  console.log("[guest]: ", text);
});
message({ user: "unregistered", text: "hi" });
// => [guest]: hi
```

[Try it](https://share.effector.dev/QXZsR5yM)

:::info
Only the first met match will trigger resulting event
:::

#### Another (#methods-split-source-match-examples-another)

```js
import { createEvent, split } from "effector";

const message = createEvent();

const { short, long, medium } = split(message, {
  short: (m) => m.length <= 5,
  medium: (m) => m.length > 5 && m.length <= 10,
  long: (m) => m.length > 10,
});

short.watch((m) => console.log(`short message '${m}'`));
medium.watch((m) => console.log(`medium message '${m}'`));
long.watch((m) => console.log(`long message '${m}'`));

message("Hello, Bob!");
// => long message 'Hello, Bob!'

message("Hi!");
// => short message 'Hi!'
```

[Try it](https://share.effector.dev/ke2tM78I)

## `split({ source, clock?, match, cases })` (#methods-split-source-clock-match-cases)

:::info{title="since"}
[effector 22.2.0](https://changelog.effector.dev/#effector-22-2-0)
:::

It works the same as [split with cases](/en/api/effector/split#methods-split-source-match-cases), however computations in `split` will be started after `clock` is triggered.

### Formulae (#methods-split-source-clock-match-cases-formulae)

```js
split({source, clock?, match, cases})
```

### Arguments (#methods-split-source-clock-match-cases-arguments)

TBD

### Examples (#methods-split-source-clock-match-cases-examples)

```js
const options = ["save", "delete", "forward"];
const $message = createStore({ id: 1, text: "Bring me a cup of coffee, please!" });
const $mode = createStore("");
const selectedMessageOption = createEvent();
const saveMessageFx = createEffect(() => "save");
const forwardMessageFx = createEffect(() => "forward");
const deleteMessageFx = createEffect(() => "delete");

$mode.on(selectedMessageOption, (_, opt) => options.find((item) => item === opt));

split({
  source: $message,
  clock: selectedMessageOption,
  match: $mode,
  cases: {
    save: saveMessageFx,
    delete: deleteMessageFx,
    forward: forwardMessageFx,
  },
});

selectedMessageOption("delet"); // nothing happens
selectedMessageOption("delete");
```

[Try it](https://share.effector.dev/VJmD5KdN)
