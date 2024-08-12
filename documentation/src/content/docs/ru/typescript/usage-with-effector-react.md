---
id: usage-with-effector-react
title: Использование с пакетом effector-react
redirectFrom:
  - /ru/docs/typescript/usage-with-effector-react
  - /ru/typescript/usage-with-effector-react
---

**TypeScript** - это типизированное расширение JavaScript. Он стал популярным 
в последнее время благодаря преимуществам, которые он может принести. Если вы новичок в TypeScript, 
рекомендуется сначала ознакомиться с ним, прежде чем продолжить. 
Вы можете ознакомиться с документацей 
[здесь](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html).

Какие преимущества Typescript может принести вашему приложению:

1. Безопасность типов для состояний, сторов и событий
2. Простой рефакторинг типизированного кода
3. Превосходный опыт разработчика в командной среде

**Практический пример**

We will be going through a simplistic chat application to demonstrate a
possible approach to include static typing. This chat application will have API mock that load and saves data from localStorage.

Мы пройдемся по упрощенному приложению чата, 
чтобы продемонстрировать возможный подход к включению статической типизации. Это приложение для чата будет иметь API-модель, которая загружает и сохраняет данные из локального хранилища localStorage.

Полный исходный код можно посмотреть на
[github](https://github.com/effector/effector/tree/master/examples/react-and-ts).
Обратите внимание, что, следуя этому примеру самостоятельно, вы ощутите пользу от использования TypeScript.

## Давайте создадим API-модель

Здесь будет использоваться структура каталогов на основе методологии [feature-sliced](https://feature-sliced.design).

Давайте определим простой тип, который наша импровизированная API будет возвращать.

```ts
// Файл: /src/shared/api/message.ts
interface Author {
  id: string;
  name: string;
}

export interface Message {
  id: string;
  author: Author;
  text: string;
  timestamp: number;
}
```

Наша API будет загружать и сохранять данные в `localStorage`, и нам нужны некоторые функции для загрузки данных:

```ts
// Файл: /src/shared/api/message.ts
const LocalStorageKey = "effector-example-history";

function loadHistory(): Message[] | void {
  const source = localStorage.getItem(LocalStorageKey);
  if (source) {
    return JSON.parse(source);
  }
  return undefined;
}
function saveHistory(messages: Message[]) {
  localStorage.setItem(LocalStorageKey, JSON.stringify(messages));
}
```

Также нам надо создать несколько библиотек для генерации идентификатров и ожидания для имитации сетевых запросов.

```ts
// Файл: /src/shared/lib/oid.ts
export const createOid = () =>
  ((new Date().getTime() / 1000) | 0).toString(16) +
  "xxxxxxxxxxxxxxxx".replace(/[x]/g, () => ((Math.random() * 16) | 0).toString(16)).toLowerCase();
```

```ts
// Файл: /src/shared/lib/wait.ts
export function wait(timeout = Math.random() * 1500) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}
```

Отлично! Теперь мы можем создать эффекты, которые будут загружать сообщения.

```ts
// Файл: /src/shared/api/message.ts
// Здесь эффект определен со статическими типами. Void определяет отсутствие аргументов.
// Второй аргумент в типе определяет тип успешного результата.
// Третий аргумент является необязательным и определяет тип неудачного результата.
export const messagesLoadFx = createEffect<void, Message[], Error>(async () => {
  const history = loadHistory();
  await wait();
  return history ?? [];
});

interface SendMessage {
  text: string;
  author: Author;
}

// Но мы можем использовать вывод типов и задавать типы аргументов в определении обработчика.
// Наведите курсор на `messagesLoadFx`, чтобы увидеть выведенные типы:
// `Effect<{ text: string; authorId: string; authorName: string }, void, Error>`
export const messageSendFx = createEffect(async ({ text, author }: SendMessage) => {
  const message: Message = {
    id: createOid(),
    author,
    timestamp: Date.now(),
    text,
  };
  const history = await messagesLoadFx();
  saveHistory([...history, message]);
  await wait();
});

// Пожалуйста, обратите внимание, что мы будем использовать `wait()` для `messagesLoadFx` и `wait()` в текущем эффекте
// Также, обратите внимание, что `saveHistory` и `loadHistory` могут выбрасывать исключения,
// в этом случае эффект вызовет событие `messageDeleteFx.fail`.
export const messageDeleteFx = createEffect(async (message: Message) => {
  const history = await messagesLoadFx();
  const updated = history.filter((found) => found.id !== message.id);
  await wait();
  saveHistory(updated);
});
```

Отлично, теперь мы закончили с сообщениями, давайте создадим эффекты для управления сессией пользователя.

На самом деле я предпочитаю начинать написание кода с реализации интерфейсов:

```ts
// Файл: /src/shared/api/session.ts
// Это называется сессией, потому что описывает текущую сессию пользователя, а не Пользователя в целом. 
export interface Session {
  id: string;
  name: string;
}
```

Кроме того, чтобы генерировать уникальные имена пользователей и не требовать от них ввода вручную, импортируйте `unique-names-generator`:

```ts
// Файл: /src/shared/api/session.ts
import { uniqueNamesGenerator, Config, starWars } from "unique-names-generator";

const nameGenerator: Config = { dictionaries: [starWars] };
const createName = () => uniqueNamesGenerator(nameGenerator);
```

Создадим эффекты для управления сессией:

```ts
// Файл: /src/shared/api/session.ts
const LocalStorageKey = "effector-example-session";

// Обратите внимание, что в этом случае требуется явное определение типов, поскольку `JSON.parse()` возвращает `any`
export const sessionLoadFx = createEffect<void, Session | null>(async () => {
  const source = localStorage.getItem(LocalStorageKey);
  await wait();
  if (!source) {
    return null;
  }
  return JSON.parse(source);
});

// По умолчанияю, если нет аргументов, не предоставлены явные аргументы типа и нет оператора `return`,
// эффект будет иметь тип: `Effect<void, void, Error>`
export const sessionDeleteFx = createEffect(async () => {
  localStorage.removeItem(LocalStorageKey);
  await wait();
});

// Взгляните на тип переменной `sessionCreateFx`.
// Там будет `Effect<void, Session, Error>` потому что TypeScript может вывести тип из переменной `session`
export const sessionCreateFx = createEffect(async () => {
  // Я явно установил тип для следующей переменной, это позволит TypeScript помочь мне
  // Если я забуду установить свойство, то я увижу ошибку в месте определения
  // Это также позволяет IDE автоматически дополнять и завершать имена свойств
  const session: Session = {
    id: createOid(),
    name: createName(),
  };
  localStorage.setItem(LocalStorageKey, JSON.stringify(session));
  return session;
});
```

Как нам нужно импортировать эти эффекты?

Я настоятельно рекомендую писать короткие импорты и использовать реэкспорты.
Это позволяет безопасно рефакторить структуру кода внутри `shared/api` и тех же слайсов,
и не беспокоиться о рефакторинге других импортов и ненужных изменениях в истории git.

```ts
// Файл: /src/shared/api/index.ts
export * as messageApi from "./message";
export * as sessionApi from "./session";

// Types reexports made just for convenience
export type { Message } from "./message";
export type { Session } from "./session";
```

## Создадим страницу с логикой

Типичная структура страниц:

```
src/
  pages/
    <page-name>/
      page.tsx — только View-слой (представление)
      model.ts — код бизнес-логики (модель)
      index.ts — реэкспорт, иногда здесь может быть связующий код
```

Я рекомендую писать код в слое представления сверху вниз, более общий код - сверху.
Моделируем наш слой представления. На странице у нас будет два основных раздела: история сообщений и форма сообщения.

```tsx
// Файл: /src/pages/chat/page.tsx
export function ChatPage() {
  return (
    <div className="parent">
      <ChatHistory />
      <MessageForm />
    </div>
  );
}

function ChatHistory() {
  return (
    <div className="chat-history">
      <div>Тут будет список сообщений</div>
    </div>
  );
}

function MessageForm() {
  return (
    <div className="message-form">
      <div>Тут будет форма сообщения</div>
    </div>
  );
}
```

Отлично. Теперь мы знаем, какую структуру мы имеем, и мы можем начать моделировать процессы бизнес-логики.
Слой представления должен выполнять две задачи: отображать данные из хранилищ и сообщать события модели.
Слой представления не знает, как загружаются данные, как их следует преобразовывать и отправлять обратно.

```ts
// Файл: /src/pages/chat/model.ts
import { createEvent, createStore } from "effector";

// События просто сообщают о том, что что-то произошло
export const messageDeleteClicked = createEvent<Message>();
export const messageSendClicked = createEvent();
export const messageEnterPressed = createEvent();
export const messageTextChanged = createEvent<string>();
export const loginClicked = createEvent();
export const logoutClicked = createEvent();

// В данный момент есть только сырые данные без каких-либо знаний о том, как их загрузить.
export const $loggedIn = createStore<boolean>(false);
export const $userName = createStore("");
export const $messages = createStore<Message[]>([]);
export const $messageText = createStore("");

// Страница НЕ должна знать, откуда пришли данные.
// Поэтому мы просто реэкспортируем их.
// Мы можем переписать этот код с использованием `combine` или оставить независимые хранилища,
// страница НЕ должна меняться, просто потому что мы изменили реализацию
export const $messageDeleting = messageApi.messageDeleteFx.pending;
export const $messageSending = messageApi.messageSendFx.pending;
```

Теперь мы можем реализовать компоненты.

```tsx
// Файл: /src/pages/chat/page.tsx
import { useList, useUnit } from "effector-react";
import * as model from "./model";

// export function ChatPage { ... }

function ChatHistory() {
  const [messageDeleting, onMessageDelete] = useUnit([model.$messageDeleting, model.messageDeleteClicked]);

  // Хук `useList` позволяет React не перерендерить сообщения, которые действительно не изменились.
  const messages = useList(model.$messages, (message) => (
    <div className="message-item" key={message.timestamp}>
      <h3>From: {message.author.name}</h3>
      <p>{message.text}</p>
      <button onClick={() => onMessageDelete(message)} disabled={messageDeleting}>
        {messageDeleting ? "Deleting" : "Delete"}
      </button>
    </div>
  ));
  // Здесь не нужен `useCallback` потому что мы передаем функцию в HTML-элемент, а не в кастомный компонент

  return <div className="chat-history">{messages}</div>;
}
```

Я разделил `MessageForm` на разные компоненты, чтобы упростить код:

```tsx
// Файл: /src/pages/chat/page.tsx
function MessageForm() {
  const isLogged = useUnit(model.$loggedIn);
  return isLogged ? <SendMessage /> : <LoginForm />;
}

function SendMessage() {
  const [userName, messageText, messageSending] = useUnit([model.$userName, model.$messageText, model.$messageSending]);

  const [handleLogout, handleTextChange, handleEnterPress, handleSendClick] = useUnit([
    model.logoutClicked,
    model.messageTextChanged,
    model.messageEnterPressed,
    model.messageSendClicked,
  ]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleEnterPress();
    }
  };

  return (
    <div className="message-form">
      <h3>{userName}</h3>
      <input
        value={messageText}
        onChange={(event) => handleTextChange(event.target.value)}
        onKeyPress={handleKeyPress}
        className="chat-input"
        placeholder="Type a message..."
      />
      <button onClick={() => handleSendClick()} disabled={messageSending}>
        {messageSending ? "Sending..." : "Send"}
      </button>
      <button onClick={() => handleLogout()}>Log out</button>
    </div>
  );
}

function LoginForm() {
  const handleLogin = useUnit(model.loginClicked);

  return (
    <div className="message-form">
      <div>Please, log in to be able to send messages</div>
      <button onClick={() => handleLogin()}>Login as a random user</button>
    </div>
  );
}
```

## Управляем сессией пользователя как Про

Создадим сущность сессии. Сущность (entity) - это бизнес-юнит.

```ts
// Файл: /src/entities/session/index.ts
import { Session } from "shared/api";
import { createStore } from "effector";

// Сущность просто хранит сессию и некоторую внутреннюю информацию о ней
export const $session = createStore<Session | null>(null);
// Когда стор `$session` обновляется, то стор `$isLogged` тоже будет обновлен
// Они синхронизированы. Производный стор зависит от данных из исходного
export const $isLogged = $session.map((session) => session !== null);
```

Теперь мы можем реализовать функции входа в систему или выхода на странице. Почему не здесь?
Если мы разместим логику входа здесь, у нас будет очень неявная ситуация,
когда вы вызываете `sessionCreateFx` вы не увидите код, который вызывается после эффекта.
Но последствия будут видны в DevTools и поведении приложения.

Попробуйте написать код таким очевидным способом в одном файле,
чтобы вы и любой член команды могли отследить последовательность выполнения.

## Реализуем логику

Отлично. Теперь мы можем загрузить сеанс пользователя и список сообщений на странице.
Но у нас нет никакого события, когда мы можем начать это делать. Давайте исправим это.

Вы можете использовать [Gate](/ru/recipes/react/gate), но я предпочитаю использовать явные события.

```ts
// Файл: /src/pages/chat/model.ts
// Просто добавьте новое событие
export const pageMounted = createEvent();
```

Просто добавте `useEffect` и вызовите связанное событие внутри.

```tsx
// Файл: /src/pages/chat/page.tsx
export function ChatPage() {
  const handlePageMount = useUnit(model.pageMounted);

  React.useEffect(() => {
    handlePageMount();
  }, [handlePageMount]);

  return (
    <div className="parent">
      <ChatHistory />
      <MessageForm />
    </div>
  );
}
```

> Примечание: если вы не планируете писать тесты для кода эффектора и/или реализовывать SSR, вы можете опустить любое использование `useEvent`.

В данный момент мы можем загрузить сеанс и список сообщений.

Просто добавьте реакцию на событие, и любой другой код должен быть написан в хронологическом порядке после каждого события:

```ts
// Файл: /src/pages/chat/model.ts
// Не забудьте про import { sample } from "effector"
import { Message, messageApi, sessionApi } from "shared/api";
import { $session } from "entities/session";

// export stores
// export events

// Здесь место для логики

// Вы можете прочитать этот код так:
// При загрузке страницы, одновременно вызываются загрузка сообщений и сессия пользователя
sample({
  clock: pageMounted,
  target: [messageApi.messagesLoadFx, sessionApi.sessionLoadFx],
});
```

После этого нужно определить реакции на `messagesLoadFx.done` и `messagesLoadFx.fail`, а также то же самое для `sessionLoadFx`.

```ts
// Файл: /src/pages/chat/model.ts
// `.doneData` это сокращение для `.done`, поскольку `.done` returns `{ params, result }`
// Постарайтесь не называть свои аргументы как `state` или `payload`
// Используйте явные имена для содержимого
$messages.on(messageApi.messagesLoadFx.doneData, (_, messages) => messages);

$session.on(sessionApi.sessionLoadFx.doneData, (_, session) => session);
```

Отлично. Сессия и сообщения получены. Давайте позволим пользователям войти.

```ts
// Файл: /src/pages/chat/model.ts
// Когда пользователь нажимает кнопку входа, нам нужно создать новую сессию
sample({
  clock: loginClicked,
  target: sessionApi.sessionCreateFx,
});
// Когда сессия создана, просто положите его в хранилище сессий
sample({
  clock: sessionApi.sessionCreateFx.doneData,
  target: $session,
});
// Если создание сессии не удалось, просто сбросьте сессию
sample({
  clock: sessionApi.sessionCreateFx.fail,
  fn: () => null,
  target: $session,
});
```

Давайте реализуем процесс выхода:

```ts
// Файл: /src/pages/chat/model.ts
// Когда пользователь нажал на кнопку выхода, нам нужно сбросить сессию и очистить наше хранилище
sample({
  clock: logoutClicked,
  target: sessionApi.sessionDeleteFx,
});
// В любом случае, успешно или нет, нам нужно сбросить хранилище сессий
sample({
  clock: sessionApi.sessionDeleteFx.finally,
  fn: () => null,
  target: $session,
});
```

> Примечание: большинство комментариев написано только для образовательных целей. В реальной жизни код приложения будет самодокументируемым

Но если мы запустим dev-сервер и попытаемся войти в систему, то мы ничего не увидим.
Это связано с тем, что мы создали стор `$loggedIn` в модели, но не изменяем его. Давайте исправим:

```ts
// Файл: /src/pages/chat/model.ts
import { $isLogged, $session } from "entities/session";

// В данный момент есть только сырые данные без каких-либо знаний о том, как их загрузить
export const $loggedIn = $isLogged;
export const $userName = $session.map((session) => session?.name ?? "");
```

Здесь мы просто реэкспортировали наш собственный стор из сущности сессии, но слой представления не меняется.
Такая же ситуация и со стором `$userName`. Просто перезагрузите страницу, и вы увидите, что сессия загружена правильно.

## Отправка сообщений

Теперь мы можем войти в систему и выйти из нее. Думаю, что вы захотите отправить сообщение. Это довольно просто:

```ts
// Файл: /src/pages/chat/model.ts
$messageText.on(messageTextChanged, (_, text) => text);

// У нас есть два разных события для отправки сообщения
// Пусть событие `messageSend` реагирует на любое из них
const messageSend = merge([messageEnterPressed, messageSendClicked]);

// Нам нужно взять текст сообщения и информацию об авторе, а затем отправить ее в эффект
sample({
  clock: messageSend,
  source: { author: $session, text: $messageText },
  target: messageApi.messageSendFx,
});
```

Но если в файле `tsconfig.json` вы установите `"strictNullChecks": true`, вы получите ошибку.
Это связано с тем, что стор `$session` содержит `Session | null`, а `messageSendFx` хочет `Author` в аргументах.
`Author` и `Session` совместимы, но не должны быть `null`.

Чтобы исправить странное поведение, нам нужно использовать `filter`:

```ts
// Файл: /src/pages/chat/model.ts
sample({
  clock: messageSend,
  source: { author: $session, text: $messageText },
  filter: (form): form is { author: Session; text: string } => {
    return form.author !== null;
  },
  target: messageApi.messageSendFx,
});
```

Я хочу обратить ваше внимание на тип возвращаемого значения `form is {author: Session; text: string}`.
Эта функция называется [type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards)
и позволяет TypeScript сузить тип `Session | null` до более конкретного `Session` через условие внутри функции.

Теперь мы можем прочитать это так: когда сообщение должно быть отправлено, возьмите сессию и текст сообщения, проверьте, существует ли сессия, и отправьте его.

Отлично. Теперь мы можем отправить новое сообщение на сервер.
Но если мы не вызовем `messagesLoadFx` снова, мы не увидим никаких изменений,
потому что стор `$messages` не обновился. Мы можем написать универсальный код для этого случая.
Самый простой способ - вернуть отправленное сообщение из эффекта.

```ts
// Файл: /src/shared/api/message.ts
export const messageSendFx = createEffect(async ({ text, author }: SendMessage) => {
  const message: Message = {
    id: createOid(),
    author,
    timestamp: Date.now(),
    text,
  };
  const history = await messagesLoadFx();
  await wait();
  saveHistory([...history, message]);
  return message;
});
```

Теперь мы можем просто добавить сообщение в конец списка:

```ts
// Файл: /src/pages/chat/model.ts
$messages.on(messageApi.messageSendFx.doneData, (messages, newMessage) => [
  ...messages,
  newMessage,
]);
```

Но в данный момент отправленное сообщение все еще остается в поле ввода.

```ts
// Файл: /src/pages/chat/model.ts
$messageText.on(messageSendFx, () => "");

// Если отправка сообщения не удалась, просто восстановите сообщение
sample({
  clock: messageSendFx.fail,
  fn: ({ params }) => params.text,
  target: $messageText,
});
```

## Удаление сообщения

Это довольно просто.

```ts
// Файл: /src/pages/chat/model.ts
sample({
  clock: messageDeleteClicked,
  target: messageApi.messageDeleteFx,
});

$messages.on(messageApi.messageDeleteFx.done, (messages, { params: toDelete }) =>
  messages.filter((message) => message.id !== toDelete.id),
);
```

Но вы можете заметить ошибку, когда состояние "Deleting" не отклчено.
Это связано с тем, что `useList` кэширует рендеры, и не знает о зависимости от состояния `messageDeleting`.
Чтобы исправить это, нам нужно предоставить `keys`:

```tsx
// Файл: /src/pages/chat/page.tsx
const messages = useList(model.$messages, {
  keys: [messageDeleting],
  fn: (message) => (
    <div className="message-item" key={message.timestamp}>
      <h3>From: {message.author.name}</h3>
      <p>{message.text}</p>
      <button onClick={() => handleMessageDelete(message)} disabled={messageDeleting}>
        {messageDeleting ? "Deleting" : "Delete"}
      </button>
    </div>
  ),
});
```

## Заключение

Это простой пример приложения на эффекторе с использованием React и TypeScript.

Вы можете склонировать себе репозиторий [effector/examples/react-and-ts](https://github.com/effector/effector/tree/master/examples/react-and-ts) и запустить пример самостоятельно на собственном компьютере.
