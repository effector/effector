---
title: fromObservable
lang: ru
---

Создаёт [событие](/ru/api/effector/Event), которое будет срабатывать при каждом обновлении переданного observable. Применяется для реализации взаимодействия с библиотеками на основе стримов, например `rxjs` и `most`

Для обратного действия подписки стримов на юниты эффектора можно воспользоваться методами вроде `from` из `rxjs`: юниты эффектора распознаются как сущности, на которые можно подписаться

## Формула

```ts
function fromObservable(stream: Observable<T>): Event<T>;
```

### Аргументы

1. **`observable`**: Observable

### Возвращает

Новое [событие](/ru/api/effector/Event)

## Пример

```js
import { interval } from "rxjs";
import { fromObservable } from "effector";

//emit value in sequence every 1 second
const source = interval(1000);

const event = fromObservable(source);

//output: 0,1,2,3,4,5....
event.watch(console.log);
```
