---
title: sample
description: Метод для связывания юнитов связью вида "при срабатывании `clock` прочитать значение из `source` и передать в `target`"
lang: ru
---

Метод для связывания [юнитов](/ru/explanation/glossary#common-unit) связью вида _"при срабатывании `clock` прочитать значение из `source` и передать в `target`"_

Типичный вариант использования – когда необходимо обработать какое-либо событие используя данные из стора. Вместо использования `store.getState()`, которое может вызвать несогласованность состояния, лучше использовать метод `sample`

## Формула

```ts
sample({ source?, clock?, filter?, fn?, target?}): target
```

При срабатывании `clock` прочитать значение из `source` и передать в `target`

- Если `clock` не передан, `sample` будет срабатывать при каждом обновлении `source`.
- Если `filter` не передан, продолжить выполнение как есть. Если `filter` возвращает `false` или его значение `Store<false>`, то отменить выполнение, а иначе продолжить
- Если передан `fn`, то при срабатывании передать значения из `source` и `clock` в эту функцию, а в `target` передать результат вычисления
- Если `target` не передан, то `sample` создаст и вернёт новый [юнит](/ru/explanation/glossary#common-unit)

## Иллюстрация принципа работы

![Иллюстрация принципа работы](/images/sample-visualization.gif)

## Тип создаваемого `target`

Если `target` не передан, то он будет создан при вызове. Тип создаваемого юнита описан в данной таблице:

| clock\source                        | [_Store_](/ru/api/effector/Store) | [_Event_](/ru/api/effector/Event) | [_Effect_](/ru/api/effector/Effect) |
| ----------------------------------- | --------------------------------- | --------------------------------- | ----------------------------------- |
| [_Store_](/ru/api/effector/Store)   | `Store`                           | `Event`                           | `Event`                             |
| [_Event_](/ru/api/effector/Event)   | `Event`                           | `Event`                           | `Event`                             |
| [_Effect_](/ru/api/effector/Effect) | `Event`                           | `Event`                           | `Event`                             |

Использование таблицы:

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

Основная запись метода

**Аргументы**

`params` (_Object_): Объект конфигурации

- **`clock?`**: [Юнит](/ru/explanation/glossary#common-unit) или массив юнитов

  **Разновидности**:

  - **событие или эффект**: срабатывание этого события/эффекта будет запускать `target`
  - **стор**: обновление этого стора будет запускать `target`
  - **массив юнитов**: срабатывание любого из юнитов будет запускать `target`. Сокращение для вызова [merge](/ru/api/effector/merge)
  - **поле отсутствует**: `source` будет использоваться в качестве `clock`

- **`source?`**: [Юнит](/ru/explanation/glossary#common-unit) или массив/объект со сторами

  **Разновидности**:

  - **событие или эффект**: при срабатывании `clock` будет взято последнее значение с которым запускался этот юнит (перед этим он должен будет запуститься хотя бы раз)
  - **стор**: при срабатывании `clock` будет взято текущее значение этого стора
  - **массив или объект со сторами**: при срабатывании `clock` будут взяты текущие значения из заданных сторов, объединенных в объект или массив. Сокращение для вызова [combine](/ru/api/effector/combine)
  - **поле отсутствует**: `clock` будет использоваться в качестве `source`

- **`target?`**: [Юнит](/ru/explanation/glossary#common-unit) или массив юнитов

  **Разновидности**:

  - **событие или эффект**: при срабатывании `clock` будет вызван данный юнит
  - **стор**: при срабатывании `clock` состояние юнита будет обновлено
  - **массив юнитов**: при срабатывании `clock` будут запущены все юниты
  - **поле отсутствует**: новый юнит будет создан и возвращен в результате вызова `sample`. Его тип [зависит от типов `clock` и `source`](#тип-создаваемого-target)

- **`fn?`**: `(sourceData, clockData) => result`

  Функция-обработчик, которая будет преобразовывать данные из `source` и `clock` перед отправлением в `target`, [должна быть **чистой**](/ru/explanation/glossary#purity). В случае отсутствия этого поля, данные из `source` будут передаваться в `target` как есть

- **`greedy?`**: `boolean`

  Модификатор, определяющий, будет ли `target` ожидать окончательного значения `clock` прежде чем запуститься самому. При `greedy: false` `target` будет срабатывать только раз после каждой серии идущих подряд обновлений, а при `greedy: true`, `target` сработает по разу при каждом триггере `clock`. Иными словами, эта опция отключает стабилизацию апдейтов `clock` и вынуждает обрабатывать все промежуточные значения. Батчинг обновлений повышает общую эффективность работы системы, поэтому по умолчанию greedy установлен в `false`

:::info
Поддержка массивов юнитов в `target` добавлена в effector 21.8.0
:::

**Возвращает**

([_Event_](/ru/api/effector/Event) | [_Store_](/ru/api/effector/Store)) – Юнит, который будет срабатывать при срабатывании `clock`, если `target` не передан.
Тип возвращаемого юнита [зависит от типов clock и source](#тип-создаваемого-target)

#### Пример

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

Альтернативная запись метода, всегда имеет неявный `target`

**Аргументы**

- **`source`**: [Юнит](/ru/explanation/glossary#common-unit)

  **Разновидности**:

  - **событие или эффект**: при срабатывании `clock` будет взято последнее значение с которым запускался этот юнит (перед этим он должен будет запуститься хотя бы раз)
  - **стор**: при срабатывании `clock` будет взято текущее значение этого стора

- **`clock`**: [Юнит](/ru/explanation/glossary#common-unit)

  **Разновидности**:

  - **событие или эффект**: срабатывание этого события/эффекта будет запускать `target`
  - **стор**: обновление этого стора будет запускать `target`
  - **поле отсутствует**: `source` будет использоваться в качестве `clock`

- **`fn?`**: `(sourceData, clockData) => result`

  Функция-обработчик, которая будет преобразовывать данные из `source` и `clock` перед отправлением в `target`, [должна быть **чистой**](/ru/explanation/glossary#purity). В случае отсутствия этого поля, данные из `source` будут передаваться в `target` как есть. Поскольку этот обработчик призван организовывать поток данных, следует избегать объявления в нём сайд-эффектов. Правильнее будет поместить их в эффекты или в метод `watch` возвращаемого юнита

**Возвращает**

([_Event_](/ru/api/effector/Event) | [_Store_](/ru/api/effector/Store)) – Юнит, который будет срабатывать при срабатывании `clock`, если `target` не передан.
Тип возвращаемого юнита [зависит от типов clock и source](#тип-создаваемого-target).

#### Пример

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

forward({
  from: sampleUnit,
  to: signIn /* 4 */,
});

submitForm(12345678);
// 1. при вызове submitForm с аргументом 12345678
// 2. прочитать значение из стора $userName ('john')
// 3. преобразовать значение из submitForm (1) и $userName (2)
// 4. и передать результат вычислений в эффект signIn
```

[Запустить пример](https://share.effector.dev/nln8pwfj)

## `sample({name?})`

:::info
Добавлено в effector 20.4.0
:::

Любой [юнит](/ru/explanation/glossary#unit) в эффекторе может иметь имя, поле `name` в `sample` позволяет указать имя создаваемому `target`

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

### Объект со сторами

:::info
Добавлено в effector 20.8.0
:::
`sample` может быть вызван с объектом [сторов](/ru/api/effector/Store) в `source`:

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

### Массив сторов

:::info
Добавлено в effector 20.8.0
:::
`sample` может быть вызван с массивом [сторов](/ru/api/effector/Store) в `source`:

```js
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

## Массивы юнитов в `clock`

:::info
Добавлено в effector 21.2.0
:::

Передача массивов юнитов в `clock` работает как вызов [merge](/ru/api/effector/merge)

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

Вася хочет отправить Пете деньги. Вася – отправитель, а Петя – получатель. Чтобы отправить деньги, отправитель должен знать адрес получателя, кроме того транзакция должна быть подписана. Пример показывает как работает `sample` с `filter`. Основные моменты, которые необходимо учесть:

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
