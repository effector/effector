---
title: sample
redirectFrom:
  - Пример
  - Пример
---

```ts
import { sample } from "effector";
```

# Methods (#methods)

## **`fn?`**: `(sourceData, clockData) => result` Основная запись метода

This method can be used for linking two nodes, resulting in the third one, which will fire only upon the `clock` node trigger.

Quite a common case, when you need to handle an event with some store's state. Вместо использования `store.getState()`, которое может вызвать несогласованность состояния, лучше использовать метод `sample`

### Formulae (#methods-sample-config-formulae)

```ts
sample({ source?, clock?, filter?, fn?, target?}): target
```

При срабатывании `clock` прочитать значение из `source` и передать в `target`

- Если `clock` не передан, `sample` будет срабатывать при каждом обновлении `source`.
- Если `filter` не передан, продолжить выполнение как есть. Если `filter` возвращает `false` или его значение `Store<false>`, то отменить выполнение, а иначе продолжить
- Если передан `fn`, то при срабатывании передать значения из `source` и `clock` в эту функцию, а в `target` передать результат вычисления
- Если `target` не передан, то `sample` создаст и вернёт новый [юнит](/ru/explanation/glossary#common-unit)

### Schema (#methods-sample-config-schema)

![Иллюстрация принципа работы](/images/sample-visualization.gif)

### Types (#methods-sample-config-types)

#### Тип создаваемого `target`

Если `target` не передан, то он будет создан при вызове. Тип создаваемого юнита описан в данной таблице:

| clock\source                        | [_Store_](/ru/api/effector/Store) | [_Event_](/ru/api/effector/Event) | [_Effect_](/ru/api/effector/Effect) |
| ----------------------------------- | --------------------------------- | --------------------------------- | ----------------------------------- |
| [_Store_](/ru/api/effector/Store)   | `Store`                           | `Event`                           | `Event`                             |
| [_Event_](/ru/api/effector/Event)   | `Event`                           | `Event`                           | `Event`                             |
| [_Effect_](/ru/api/effector/Effect) | `Event`                           | `Event`                           | `Event`                             |

How to read it:

1. Выбираем тип источника `source`, это столбец
2. Тип `clock` – это строка
3. Устанавливаем соответствие между столбцом и строкой

Например:

```ts
const $store = sample({ clock: $store, source: $store });
// Результатом будет стор, так как `source` и `clock` являются сторами

const event = sample({ clock: event, source: $store });
// Результатом будет эвент, так как `clock` – не стор
```

## `sample({clock?, source?, fn?, target?, greedy?})`

### Formulae (#methods-sample-greedy-formulae)

TBD

### Arguments (#methods-sample-greedy-arguments)

`params` (_Object_): Объект конфигурации

- **`clock?`**: [Юнит](/ru/explanation/glossary#common-unit) или массив юнитов
  - **событие или эффект**: срабатывание этого события/эффекта будет запускать `target`
  - If store: trigger `target` upon store is updated
  - If array of units: trigger `target` upon any given unit is called or updated. Сокращение для вызова [merge](/ru/api/effector/merge)
  - **поле отсутствует**: `source` будет использоваться в качестве `clock`
- **`source?`**: [Юнит](/ru/explanation/glossary#common-unit) или массив/объект со сторами
  - If event or effect: take last invocation argument value. That event or effect must be invoked at least once
  - If store: take current state of given store
  - **массив или объект со сторами**: при срабатывании `clock` будут взяты текущие значения из заданных сторов, объединенных в объект или массив. Сокращение для вызова [combine](/ru/api/effector/combine)
  - **поле отсутствует**: `source` будет использоваться в качестве `clock`
- **`target?`**: [Юнит](/ru/explanation/glossary#common-unit) или массив юнитов
  - **событие или эффект**: при срабатывании `clock` будет вызван данный юнит
  - If store: update given store upon `clock` is triggered
  - If array of units: trigger every given unit upon `clock` is triggered
  - **поле отсутствует**: новый юнит будет создан и возвращен в результате вызова `sample`. Type of created target is described [in table above](/en/api/effector/sample#methods-sample-config-types-target)
- Правильнее будет поместить их в эффекты или в метод `watch` возвращаемого юнита
- Функция-обработчик, которая будет преобразовывать данные из `source` и `clock` перед отправлением в `target`, [должна быть **чистой**](/ru/explanation/glossary#purity). В случае отсутствия этого поля, данные из `source` будут передаваться в `target` как есть
- `greedy?` (boolean) Modifier defines whether sampler will wait for resolving calculation result, and will batch all updates, resulting only one trigger, or will be triggered upon every linked node invocation, e.g. if `greedy` is `true`, `sampler` will fire on trigger of every node, linked to `clock`, whereas `non-greedy sampler(greedy: false)` will fire only upon the last linked node trigger

:::warning{title="Deprecated"}
Since [effector 23.0.0](https://changelog.effector.dev/#effector-23-0-0) property `greedy` is deprecated.

Use `batch` instead of `greedy`.
:::

:::info{title="since"}
Поддержка массивов юнитов в `target` добавлена в effector 21.8.0
:::

### Returns (#methods-sample-greedy-returns)

([_Event_](/ru/api/effector/Event) | [_Store_](/ru/api/effector/Store)) – Юнит, который будет срабатывать при срабатывании `clock`, если `target` не передан. Тип возвращаемого юнита [зависит от типов clock и source](#тип-создаваемого-target).

### Examples (#methods-sample-greedy-examples)

```js
const $userName = createStore("john");
const signIn = createEffect((params) => {
  console.log(params);
});
const submitForm = createEvent();

sample({
  clock: submitForm /* 1 */,
  source: $userName /* 2 */,
  fn: (name, password) => ({ name, password }) /* 3 */,
  target: signIn /* 4 */,
});

submitForm(12345678);
// 1. при вызове submitForm с аргументом 12345678
// 2. прочитать значение из стора $userName ('john')
// 3. преобразовать значение из submitForm (1) и $userName (2)
// 4. и передать результат вычислений в эффект signIn
```

[Запустить пример](https://share.effector.dev/PAjWhOJc)

## `sample(source, clock, fn?): Unit`

It is just another form of the `sample` invocation, with the same sense.

### Формула

TBD

### Метод для связывания [юнитов](/ru/explanation/glossary#common-unit) связью вида _"при срабатывании `clock` прочитать значение из `source` и передать в `target`"_

- **`source`**: [Юнит](/ru/explanation/glossary#common-unit)
  - If event or effect. Take last invocation argument value. That event or effect must be invoked at least once
  - If store. Take current store's state
- **`clock`**: [Юнит](/ru/explanation/glossary#common-unit) **поле отсутствует**: `clock` будет использоваться в качестве `source`
  - If event or effect. Trigger the sampled unit, upon event or effect is called
  - If store. Trigger the sampled unit, upon store is updated
- **`fn?`**: `(sourceData, clockData) => result` Поскольку этот обработчик призван организовывать поток данных, следует избегать объявления в нём сайд-эффектов. It's more appropriate to place it in `watch` method for sampled node.

**Возвращает**

([_Event_](/ru/api/effector/Event) | [_Store_](/ru/api/effector/Store)) – Юнит, который будет срабатывать при срабатывании `clock`, если `target` не передан.
Его тип [зависит от типов `clock` и `source`](#тип-создаваемого-target)

### Тип возвращаемого юнита [зависит от типов clock и source](#тип-создаваемого-target)

```js
const $userName = createStore("john");
const signIn = createEffect((params) => {
  console.log(params);
});
const submitForm = createEvent();

const sampleUnit = sample(
  $userName /* 2 */,
  submitForm /* 1 */,
  (name, password) => ({ name, password }) /* 3 */,
);

sample({
  clock: sampleUnit,
  target: signIn /* 4 */,
});

submitForm(12345678);
// 1. при вызове submitForm с аргументом 12345678
// 2. прочитать значение из стора $userName ('john')
// 3. преобразовать значение из submitForm (1) и $userName (2)
// 4. и передать результат вычислений в эффект signIn
```

[Запустить пример](https://share.effector.dev/YCTp2KLe)

### `sample({name?})`

:::info{title="since"}
Добавлено в effector 20.4.0
:::

Любой [юнит](/ru/explanation/glossary#unit) в эффекторе может иметь имя, поле `name` в `sample` позволяет указать имя создаваемому `target`
You now can name sampled entities in the same manner as basic ones.

```js
import { createStore, sample } from "effector";

const foo = createStore(null);

const sampled = sample({
  source: foo,
  name: "sampled foo",
});

console.log(sampled.shortName); // 'sampled foo'
```

## Объекты и массивы в `source`

### Object of Stores (#sample-source-object-stores)

:::info{title="since"}
Добавлено в effector 20.8.0
:::

**событие или эффект**: срабатывание этого события/эффекта будет запускать `target`

```js
import { createStore, createEvent, sample } from "effector";
const trigger = createEvent();

const a = createStore("A");
const b = createStore(1);

// target имеет тип `Event<{ a: string, b: number }>`
const target = sample({
  clock: trigger,
  source: { a, b },
});

target.watch((obj) => {
  console.log("sampled object", obj);
});

trigger();
// => sampled object {a: 'A', b: 1}
```

[Запустить пример](https://share.effector.dev/Wp9nq14k)

### Array of Stores (#sample-source-array-stores)

:::info{title="since"}
Добавлено в effector 20.8.0
:::

Передача массивов юнитов в `clock` работает как вызов [merge](/ru/api/effector/merge)

> Note: Typescript requires adding `as const` after the array is entered.

```ts
import { createStore, createEvent, sample } from "effector";
const trigger = createEvent();

const a = createStore("A");
const b = createStore(1);

// target имеет тип `Event<[string, number]>`
const target = sample({
  clock: trigger,
  source: [a, b],
});

target.watch((obj) => {
  console.log("sampled array", obj);
});

// Можно деструктурировать аргументы, чтобы задать явные имена
target.watch(([a, b]) => {
  console.log("explicit names", a, b);
});

trigger();
// => sampled array ["A", 1]
// => explicit names "A" 1
```

[Запустить пример](https://share.effector.dev/duqTwRgT)

### Массивы юнитов в `clock`

:::info{title="since"}
Добавлено в effector 21.2.0
:::

`clock` field in `sample` supports passing arrays of units, acting similarly to a `merge` call.

```js
import {createStore, createEvent, createEffect, sample, merge} from 'effector'

const showNotification = createEvent<string>()
const trigger = createEvent()
const fx = createEffect()
const store = createStore('')

// массив юнитов в `clock`
sample({
  clock: [trigger, fx.doneData],
  source: store,
  target: showNotification,
})

// объединённый юнит в `clock`
sample({
  clock: merge([trigger, fx.doneData]),
  source: store,
  target: showNotification,
})
```

[Запустить пример](https://share.effector.dev/1YEHUFs7)

## Пример с `filter`

:::info{title="since"}
[effector 22.2.0](https://changelog.effector.dev/#effector-22-2-0)
:::

Новый вариант использования `sample` работает так же, но с одним дополнительным методом `filter`. Когда `filter` возвращает `true` продолжить выполнение, иначе отменить. Взглянем на пример ниже.

Henry wants to send money to William. Henry – sender and William – recipient. Чтобы отправить деньги, отправитель должен знать адрес получателя, кроме того транзакция должна быть подписана. Пример показывает как работает `sample` с `filter`. Основные моменты, которые необходимо учесть:

1. Убедиться, что баланс положительный и больше чем отправляемая сумма.
2. Наличие адреса получателя
3. Подписанная транзакция
4. Убедиться, что баланс отправителя изменился

```js
import { createStore, createEvent, createEffect, sample } from "effector";

const sign = createEvent();
const sentMoney = createEvent();

const $recipientAddress = createStore("a23x3xd");
const $balance = createStore(20000);
const $isSigned = createStore(false);

const transactionFx = createEffect(
  ({ amountToSend, recipientAddress }) =>
    new Promise((res) =>
      setTimeout(res, 3000, {
        amount: amountToSend,
        recipientAddress,
      }),
    ),
);

$isSigned.on(sign, () => true).reset(transactionFx);
$balance.on(transactionFx.doneData, (balance, { amount }) => balance - amount);

sample({
  source: {
    recipientAddress: $recipientAddress,
    isSigned: $isSigned,
    balance: $balance,
  },
  clock: sentMoney,
  filter: ({ isSigned, balance }, amountToSend) => isSigned && balance > amountToSend,
  fn({ recipientAddress }, amountToSend) {
    return { recipientAddress, amountToSend };
  },
  target: transactionFx,
});

$balance.watch((balance) => console.log("balance: ", balance));
$isSigned.watch((isSigned) => console.log("is signed: ", isSigned));

sign();
sentMoney(1000);
```

[Запустить пример](https://share.effector.dev/XTxkCYC0)

<!-- ## Other examples

### Example 2

```js
import {createEvent, createStore, sample} from 'effector'

const clickButton = createEvent()
const closeModal = clickButton.map(() => 'close modal')

const lastEvent = createStore(null)
  .on(clickButton, (_, data) => data)
  .on(closeModal, () => 'modal')

lastEvent.updates.watch(data => {
  // here we need everything
  //console.log(`sending important analytics event: ${data}`)
})

lastEvent.updates.watch(data => {
  //here we need only final value
  //console.log(`render <div class="yourstatus">${data}</div>`)
})

const analyticReportsEnabled = createStore(false)

const commonSampling = sample({
  clock: merge([clickButton, closeModal]),
  source: analyticReportsEnabled,
  fn: (isEnabled, data) => ({isEnabled, data}),
})

const greedySampling = sample({
  clock: merge([clickButton, closeModal]),
  source: analyticReportsEnabled,
  fn: (isEnabled, data) => ({isEnabled, data}),
  greedy: true,
})

commonSampling.watch(data => console.log('non greedy update', data))
greedySampling.watch(data => console.log('greedy update', data))

clickButton('click A')
clickButton('click B')
```

[Try it](https://share.effector.dev/RCo60EEK)

### Example `sample(sourceEvent, clockEvent, fn?)`

```js
import {createEvent, sample} from 'effector'

const event1 = createEvent()
const event2 = createEvent()

const sampled = sample(event1, event2, (a, b) => `${a} ${b}`)
sampled.watch(console.log)

event1('Hello')
event2('World') // => Hello World
event2('effector!') // => Hello effector!

sampled('Can be invoked too!') // => Can be invoked too!
```

[Try it](https://share.effector.dev/vXKWDhwL)

### Example `sample(event, store, fn?)`

```js
import {createEvent, createStore, sample} from 'effector'

const event = createEvent()
const inc = createEvent()
const count = createStore(0).on(inc, state => state + 1)

const sampled = sample(
  event,
  count,
  (c, i) => `Current count is ${i}, last event invocation: ${c}`,
)
sampled.watch(console.log)

inc() // => nothing

event('foo')
inc() // => Current count is 2, last event invocation: foo

event('bar')
inc() // => Current count is 3, last event invocation: bar
```

[Try it](https://share.effector.dev/L4nbGjxM)

### Example `sample(sourceStore, clockStore, fn?)`

```js
import {createEvent, createStore, sample} from 'effector'

const inc = createEvent()
const setName = createEvent()

const name = createStore('John').on(setName, (_, v) => v)

const clock = createStore(0).on(inc, i => i + 1)

const sampled = sample(name, clock, (name, i) => `${name} has ${i} coins`)
sampled.watch(console.log)
// => John has 0 coins (initial store update triggered sampled store)

setName('Doe')
inc() // => Doe has 1 coins
```

[Try it](https://share.effector.dev/h3zED3yW) -->
