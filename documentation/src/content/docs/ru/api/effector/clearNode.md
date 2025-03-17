---
title: clearNode
description: Низкоуровневый метод для уничтожения юнитов и их связей
lang: ru
---

Низкоуровневый метод для уничтожения юнитов и их связей

## Формула

```ts
clearNode(unit: Unit): void
clearNode(unit: Unit, config: {deep?: boolean}): void
```

### Аргументы

1. **`unit`**: Любой [юнит](/ru/explanation/glossary#unit) включая [домены](/ru/api/effector/Domain) и [scope](/ru/api/effector/Scope). Переданный юнит будет уничтожен и удалён из памяти
2. **`config?`**: Объект конфигурации

   - **`deep?`**: _boolean_

     Глубокое удаление. Уничтожает юнит и _все_ его производные

### Возвращает

_void_

## Примеры

### Пример удаления стора

```js
import { createStore, createEvent, clearNode } from "effector";

const inc = createEvent();
const store = createStore(0).on(inc, (x) => x + 1);
inc.watch(() => console.log("inc called"));
store.watch((x) => console.log("store state: ", x));
// => store state: 0
inc();
// => inc called
// => store state: 1
clearNode(store);
inc();
// => inc called
```

[Запустить пример](https://share.effector.dev/WjuSl6aN)

### Пример с deep

```js
import { createStore, createEvent, clearNode } from "effector";

const inc = createEvent();
const trigger = inc.prepend(() => {});
const store = createStore(0).on(inc, (x) => x + 1);
trigger.watch(() => console.log("trigger called"));
inc.watch(() => console.log("inc called"));
store.watch((x) => console.log("store state: ", x));
// => store state: 0
trigger();
// => trigger called
// => inc called
// => store state: 1
clearNode(trigger, { deep: true });
trigger();
// no reaction
inc();
// no reaction!
// all units, which depend on trigger, are erased
// including inc and store, because it depends on inc
```

[Запустить пример](https://share.effector.dev/EkETZtKI)
