---
id: usage-with-effector-react
title: Использование с effector-react
---

**TypeScript** это типизированный надмножество JavaScript. 
В последнее время он стал популярным в приложениях из-за преимуществ, которые он может принести. 
Если вы новичок в TypeScript, настоятельно рекомендуется сначала ознакомиться с ним, прежде чем продолжить. 
Вы можете ознакомиться с его документацией [здесь.](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

TypeScript может принести следующие преимущества приложениям:

1. Безопасность типов для состояний, хранилищ и событий
2. Простой рефакторинг типизированного кода
3. Превосходный опыт разработчиков в командной среде

## Практический пример

Мы рассмотрим простейшее приложение для чата, чтобы продемонстрировать возможный подход к включению статической типизации. 
Это приложение чата будет иметь фиктивное API, которое загружает и сохраняет данные из localStorage.

Полный исходный код доступен на
[github](https://github.com/effector/effector/tree/master/examples/react-and-ts).
Обратите внимание, что, пройдя этот пример самостоятельно, вы почувствуете некоторые преимущества использования TypeScript.

### Давайте создадим фиктивное API

Существует структура каталогов, унаследованная от [feature-sliced](https://feature-sliced.design) методологии.

Давайте определим простой тип, который будет возвращать наш импровизированный API.

```ts title=/src/shared/api/message.ts
interface Author {
  id: string
  name: string
}

export interface Message {
  id: string
  author: Author
  text: string
  timestamp: number
}
```

Наш API будет загружать и сохранять данные в `localStorage`, и нам нужны некоторые функции для загрузки данных:

```ts title=/src/shared/api/message.ts
const LocalStorageKey = 'effector-example-history'

function loadHistory(): Message[] | void {
  const source = localStorage.getItem(LocalStorageKey)
  if (source) {
    return JSON.parse(source)
  }
  return undefined
}
function saveHistory(messages: Message[]) {
  localStorage.setItem(LocalStorageKey, JSON.stringify(messages))
}
```

Я также создал несколько библиотек для генерации идентификатора и ожидания для имитации сетевых запросов.

```ts title=/src/shared/lib/oid.ts
export const createOid = () =>
  ((new Date().getTime() / 1000) | 0).toString(16) +
  'xxxxxxxxxxxxxxxx'
    .replace(/[x]/g, () => ((Math.random() * 16) | 0).toString(16))
    .toLowerCase()
```

```ts title=/src/shared/lib/wait.ts
export function wait(timeout = Math.random() * 1500) {
  return new Promise(resolve => setTimeout(resolve, timeout))
}
```

Хорошо. Теперь мы можем создать эффекты, которые будут загружать сообщения.

```ts title=/src/shared/api/message.ts
// Здесь эффект определяется статическими типами. void не имеет аргументов.
// Второй аргумент типа определяет тип успешного результата.
// Третий аргумент является необязательным и определяет тип результата ошибки.
export const messagesLoadFx = createEffect<void, Message[], Error>(async () => {
  const history = loadHistory()
  await wait()
  return history ?? []
})

interface SendMessage {
  text: string
  author: Author
}

// Но мы можем использовать инференцию типов и задавать типы аргументов в определении обработчика.
// Наведите курсор на `messagesLoadFx`, чтобы увидеть выведенные типы:
// `Effect<{ text: string; authorId: string; authorName: string }, void, Error>`
export const messageSendFx = createEffect(
  async ({text, author}: SendMessage) => {
    const message: Message = {
      id: createOid(),
      author,
      timestamp: Date.now(),
      text,
    }
    const history = await messagesLoadFx()
    saveHistory([...history, message])
    await wait()
  },
)

// Пожалуйста, обратите внимание, что мы будем `wait()` для `messagesLoadFx` и `wait()` в текущем эффекте
// Также обратите внимание, что `saveHistory` и `loadHistory` могут вызывать исключения,
// в этом случае эффект вызовет событие `messageDeleteFx.fail`.
export const messageDeleteFx = createEffect(async (message: Message) => {
  const history = await messagesLoadFx()
  const updated = history.filter(found => found.id !== message.id)
  await wait()
  saveHistory(updated)
})
```

Хорошо, теперь мы закончили с сообщениями, давайте создадим эффекты для управления сессией пользователя.

На самом деле, я предпочитаю начинать проектирование кода с реализации интерфейсов:

```ts title=/src/shared/api/session.ts
// Он называется session, потому что описывает текущую сессию пользователя, а не Пользователя вообще.
export interface Session {
  id: string
  name: string
}
```

Также, чтобы генерировать имена пользователей и не набирать их самостоятельно, импортируйте `unique-names-generator`:

```ts title=/src/shared/api/session.ts
import {uniqueNamesGenerator, Config, starWars} from 'unique-names-generator'

const nameGenerator: Config = {dictionaries: [starWars]}
const createName = () => uniqueNamesGenerator(nameGenerator)
```

Давайте создадим эффекты для управления сессией:

```ts title=/src/shared/api/session.ts
const LocalStorageKey = 'effector-example-session'

// Нам нужно явно вернуть `null`, потому что `undefined` - это специальное значение в экосистеме эффекторов,
// которое определяет некоторое "пустое" состояние, и store пропустит обновления, если мы попытаемся передать `undefined` внутрь.
// Всегда используйте `null` для "состояния без значения".
// Обратите внимание, что в этом случае нам нужно явное определение типов, потому что `JSON.parse()` возвращает `any`.
export const sessionLoadFx = createEffect<void, Session | null>(async () => {
  const source = localStorage.getItem(LocalStorageKey)
  await wait()
  if (!source) {
    return null
  }
  return JSON.parse(source)
})

// По умолчанию, если нет аргументов, нет явных аргументов типа и нет возврата,
// эффект будет иметь тип: `Effect<void, void, Error>`.
export const sessionDeleteFx = createEffect(async () => {
  localStorage.removeItem(LocalStorageKey)
  await wait()
})

// Look at the type of the `sessionCreateFx` constant.
// It will be `Effect<void, Session, Error>` because Typescript can infer type from `session` constant
export const sessionCreateFx = createEffect(async () => {
    // Я явно задаю тип для следующей константы, потому что это позволяет Typescript помочь мне.
    // Если я забуду задать свойство, я увижу ошибку в месте определения.
    // Также это позволяет IDE автозаполнять имена свойств
  const session: Session = {
    id: createOid(),
    name: createName(),
  }
  localStorage.setItem(LocalStorageKey, JSON.stringify(session))
  return session
})
```

Как нам нужно импортировать эти эффекты?

Я обязательно рекомендую писать короткие импорты и использовать реэкспорты.
Это позволяет безопасно рефакторить структуру кода внутри `shared/api` и тех же срезов,
и не беспокоиться о рефакторинге других импортов и ненужных изменениях в истории git.

```ts title=/src/shared/api/index.ts
export * as messageApi from './message'
export * as sessionApi from './session'

// Реэкспорт типов, сделанный просто для удобства
export type {Message} from './message'
export type {Session} from './session'
```

### Создайте страницу с логикой

Типичная структура страниц:

```
src/
  pages/
    <page-name>/
      page.tsx — just the View layer
      model.ts — a business-logic code
      index.ts — reexports, sometimes there will be a connection code
```

Я рекомендую писать код в слое представления сверху вниз, более распространенный код - сверху.
Давайте смоделируем наш слой представления. У нас будет два основных раздела на странице: история сообщений и форма сообщений.

```tsx title=/src/pages/chat/page.tsx
import React from 'react'

export function ChatPage() {
  return (
    <div className="parent">
      <ChatHistory />
      <MessageForm />
    </div>
  )
}

function ChatHistory() {
  return (
    <div className="chat-history">
      <div>There will be messages list</div>
    </div>
  )
}

function MessageForm() {
  return (
    <div className="message-form">
      <div>There will be message form</div>
    </div>
  )
}
```

ОК. Теперь мы знаем, какая у нас структура, и можем приступить к моделированию бизнес-логических процессов.
Слой представления должен выполнять две задачи: отрисовывать данные из хранилищ и сообщать о событиях в модель.
Визуальный слой не знает, как загружаются данные, как они должны быть преобразованы и отправлены обратно.

```ts title=/src/pages/chat/model.ts
import {createEvent, createStore} from 'effector'

// На данный момент есть только сырые данные без знания того, как их загрузить
export const $loggedIn = createStore<boolean>(false)
export const $userName = createStore('')
export const $messages = createStore<Message[]>([])
export const $messageText = createStore('')

// Страница НЕ должна знать, откуда взялись данные.
// Поэтому мы просто реэкспортируем их.
// Мы можем переписать этот код в `combine` или независимый стор,
// страница НЕ должна быть изменена, только потому, что мы изменили реализацию.
export const $messageDeleting = messageApi.messageDeleteFx.pending
export const $messageSending = messageApi.messageSendFx.pending

// И события сообщают о том, что произошло
export const messageDeleteClicked = createEvent<Message>()
export const messageSendClicked = createEvent()
export const messageEnterPressed = createEvent()
export const messageTextChanged = createEvent<string>()
export const loginClicked = createEvent()
export const logoutClicked = createEvent()
```

Теперь мы можем реализовать компоненты.

```tsx title=/src/pages/chat/page.tsx
import {useEvent, useList, useStore} from 'effector-react'
import * as model from './model'

// export function ChatPage { ... }

function ChatHistory() {
  const messageDeleting = useStore(model.$messageDeleting)
  const onMessageDelete = useEvent(model.messageDeleteClicked)

  // Хук `useList` позволяет React не рендерить сообщения, которые на самом деле не изменены.
  const messages = useList(model.$messages, message => (
    <div className="message-item" key={message.timestamp}>
      <h3>From: {message.author.name}</h3>
      <p>{message.text}</p>
      <button
        onClick={() => onMessageDelete(message)}
        disabled={messageDeleting}>
        {messageDeleting ? 'Deleting' : 'Delete'}
      </button>
    </div>
  ))
  // Здесь нам не нужен `useCallback`, потому что мы передаем функцию HTML-элементу, а не пользовательскому компоненту

  return <div className="chat-history">{messages}</div>
}
```

Я разделил `MessageForm` на различные компоненты, чтобы упростить код:

```tsx title=/src/pages/chat/page.tsx
function MessageForm() {
  const isLogged = useStore(model.$loggedIn)
  return isLogged ? <SendMessage /> : <LoginForm />
}

function SendMessage() {
  const userName = useStore(model.$userName)
  const messageText = useStore(model.$messageText)
  const messageSending = useStore(model.$messageSending)

  const handleLogout = useEvent(model.logoutClicked)
  const handleTextChange = useEvent(model.messageTextChanged)
  const handleEnterPress = useEvent(model.messageEnterPressed)
  const handleSendClick = useEvent(model.messageSendClicked)

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleEnterPress()
    }
  }

  return (
    <div className="message-form">
      <h3>{userName}</h3>
      <input
        value={messageText}
        onChange={event => handleTextChange(event.target.value)}
        onKeyPress={handleKeyPress}
        className="chat-input"
        placeholder="Type a message..."
      />
      <button onClick={() => handleSendClick()} disabled={messageSending}>
        {messageSending ? 'Sending...' : 'Send'}
      </button>
      <button onClick={() => handleLogout()}>Log out</button>
    </div>
  )
}

function LoginForm() {
  const handleLogin = useEvent(model.loginClicked)
  return (
    <div className="message-form">
      <div>Please, log in to be able to send messages</div>
      <button onClick={() => handleLogin()}>Login as a random user</button>
    </div>
  )
}
```

### Управление сеансами пользователей как профессионал

Давайте создадим сессионную сущность. Сущность - это бизнес-единица.

```ts title=/src/entities/session/index.ts
import {Session} from 'shared/api'
import {createStore} from 'effector'

// Entity just stores session and some internal knowledge about it
export const $session = createStore<Session | null>(null)
// When store `$session` is updated, store `$isLogged` will be updated too
// They are in sync. Derived store are depends on data from original.
export const $isLogged = $session.map(session => session !== null)
```

Теперь на странице мы можем реализовать функции входа или выхода из системы. Почему не здесь?
Если мы разместим логику входа здесь, мы получим очень неявный сценарий,
когда вы вызовете `sessionCreateFx`, вы не увидите кода, вызванного после эффекта.
Но последствия будут видны в DevTools и поведении приложения.

Старайтесь писать код как можно более очевидным образом в одном файле,
чтобы вы и любой член команды могли проследить последовательность выполнения.

### Реализация логики

OK. Теперь мы можем загрузить сессию пользователя и списки сообщений на монтируемой странице.
Но у нас нет никакого события, когда мы можем начать работу. Давайте исправим это.

Вы можете использовать [`Gate`](../recipes/react/gate.md), но я предпочитаю использовать явные события.

```ts title=/src/pages/chat/model.ts
// Просто добавьте новое событие
export const pageMounted = createEvent()
```

Просто добавьте `useEffect` и вызовите связанное событие внутри.

```tsx title=/src/pages/chat/page.tsx
export function ChatPage() {
  const handlePageMount = useEvent(model.pageMounted)
  React.useEffect(() => {
    handlePageMount()
  }, [handlePageMount])

  return (
    <div className="parent">
      <ChatHistory />
      <MessageForm />
    </div>
  )
}
```

> Примечание: если вы не планируете писать тесты для эффекторного кода и/или реализовывать SSR, вы можете не использовать `useEvent`.

На данный момент мы можем загрузить сессию и список сообщений.

Просто добавьте реакцию на событие, а любой другой код следует писать в хронологическом порядке после каждого события:

```ts title=/src/pages/chat/model.ts
// Не забудьте импортировать { sample } из "effector".
import {Message, messageApi, sessionApi} from 'shared/api'
import {$session} from 'entities/session'

// export stores
// export events

// Здесь место для логики

// Вы можете прочитать этот код следующим образом:
// Когда страница смонтирована, сообщения вызова загружаются и сессия загружается одновременно
sample({
  clock: pageMounted,
  target: [messageApi.messagesLoadFx, sessionApi.sessionLoadFx],
})
```

После этого нам нужно определить реакции на `messagesLoadFx.done` и `messagesLoadFx.fail`, и то же самое для `sessionLoadFx`.

```ts title=/src/pages/chat/model.ts
// `.doneData` - это сокращение для `.done`, потому что `.done` возвращает `{параметры, результат }`.
// Не называйте свои аргументы типа `state` или `payload`.
// Используйте явные имена содержимого, которое они содержат
$messages.on(messageApi.messagesLoadFx.doneData, (_, messages) => messages)

$session.on(sessionApi.sessionLoadFx.doneData, (_, session) => session)
```

OK. Сессия и сообщения загружены. Давайте разрешим пользователю войти в систему.

```ts title=/src/pages/chat/model.ts
// При нажатии на кнопку входа нам нужно создать новую сессию
sample({
  clock: loginClicked,
  target: sessionApi.sessionCreateFx,
})
// Когда сессия создана, просто записываем ее в хранилище сессий
sample({
  clock: sessionApi.sessionCreateFx.doneData,
  target: $session,
})
// Если создание сессии не удалось, просто сбросьте сессию
sample({
  clock: sessionApi.sessionCreateFx.fail,
  fn: () => null,
  target: $session,
})
```

Теперь мы реализуем процесс выхода из системы:

```ts title=/src/pages/chat/model.ts
// При нажатии кнопки выхода из системы нам нужно сбросить сессию и очистить наше хранилище
sample({
  clock: logoutClicked,
  target: sessionApi.sessionDeleteFx,
})
// В любом случае, удалось или нет, нам нужно сбросить хранилище сессий
sample({
  clock: sessionApi.sessionDeleteFx.finally,
  fn: () => null,
  target: $session,
})
```

> Примечание: большинство комментариев написано только в образовательных целях. В реальной жизни код приложения будет самоописываемым

Но если мы запустим сервер dev и попытаемся войти в систему, мы увидим, что ничего не изменилось.
Это происходит потому, что мы создали хранилище `$loggedIn` в модели, но не изменяем его. Давайте исправим это:

```ts title=/src/pages/chat/model.ts
import {$isLogged, $session} from 'entities/session'

// На данный момент есть только сырые данные без знания того, как их загрузить
export const $loggedIn = $isLogged
export const $userName = $session.map(session => session?.name ?? '')
```

Здесь мы просто реэкспортировали наше пользовательское хранилище из сущности сессии, но наш слой View не изменился.
Такая же ситуация с хранилищем `$userName`. Просто перезагрузите страницу, и вы увидите, что сессия загрузилась правильно.

### Отправка сообщений

Теперь мы можем войти и выйти. Я думаю, вы хотите отправить сообщение. Это довольно просто:

```ts title=/src/pages/chat/model.ts
$messageText.on(messageTextChanged, (_, text) => text)

// У нас есть два разных события для отправки сообщения.
// Пусть событие `messageSend` реагирует на любое из них
const messageSend = merge([messageEnterPressed, messageSendClicked])

// Нам нужно взять текст сообщения и информацию об авторе, а затем отправить их в эффект
sample({
  clock: messageSend,
  source: {author: $session, text: $messageText},
  target: messageApi.messageSendFx,
})
```

Но если в `tsconfig.json` установить `"strictNullChecks": true`, то вы увидите ошибку.
Это происходит потому, что хранилище `$session` содержит `Session | null`, а `messageSendFx` хочет видеть в аргументах `Author`.
`Author` и `Session` совместимы, но не `null`.

Чтобы исправить это странное поведение, нам нужно использовать `фильтр`:

```ts title=/src/pages/chat/model.ts
sample({
  clock: messageSend,
  source: {author: $session, text: $messageText},
  filter: (form): form is {author: Session; text: string} => {
    return form.author !== null
  },
  target: messageApi.messageSendFx,
})
```

Я хочу обратить ваше внимание на возвращаемый тип `form is {author: Session; text: string}`.
Эта возможность называется [type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards)
и позволяет Typescript сократить тип `Session | null` до более конкретного `Session` через условие внутри функции.

Теперь мы можем прочитать это так: когда сообщение должно быть отправлено, возьмите сессию и текст сообщения, проверьте, существует ли сессия, и отправьте его.

OK. Теперь мы можем написать новое сообщение на сервер.
Но если мы не вызовем `messagesLoadFx` снова, мы не увидим никаких изменений,
потому что хранилище `$messages` не обновлялось. Мы можем написать универсальный код для этого случая.
Самый простой способ - вернуть отправленное сообщение из эффекта.

```ts title=/src/shared/api/message.ts
export const messageSendFx = createEffect(
  async ({text, author}: SendMessage) => {
    const message: Message = {
      id: createOid(),
      author,
      timestamp: Date.now(),
      text,
    }
    const history = await messagesLoadFx()
    await wait()
    saveHistory([...history, message])
    return message
  },
)
```

Теперь мы можем просто добавить сообщение в конец списка:

```ts title=/src/pages/chat/model.ts
$messages.on(messageApi.messageSendFx.doneData, (messages, newMessage) => [
  ...messages,
  newMessage,
])
```

Но на данный момент отправленное сообщение все еще остается на поле для ввода.

```ts title=/src/pages/chat/model.ts
$messageText.on(messageSendFx, () => '')

// Если отправка сообщения не удалась, просто восстановите сообщение
sample({
  clock: messageSendFx.fail,
  fn: ({params}) => params.text,
  target: $messageText,
})
```

### Удаление сообщения

Это довольно просто.

```ts ts title=/src/pages/chat/model.ts
sample({
  clock: messageDeleteClicked,
  target: messageApi.messageDeleteFx,
})

$messages.on(messageApi.messageDeleteFx.done, (messages, {params: toDelete}) =>
  messages.filter(message => message.id !== toDelete.id),
)
```

Но вы можете увидеть ошибку, когда состояние "Deleting" не отключается.
Это происходит потому, что `useList` кэширует рендеры, и не знает о зависимости от состояния `messageDeleting`.
Чтобы исправить это, нам нужно предоставить `keys`:

```tsx ts title=/src/pages/chat/page.tsx
const messages = useList(model.$messages, {
  keys: [messageDeleting],
  fn: message => (
    <div className="message-item" key={message.timestamp}>
      <h3>From: {message.author.name}</h3>
      <p>{message.text}</p>
      <button
        onClick={() => handleMessageDelete(message)}
        disabled={messageDeleting}>
        {messageDeleting ? 'Deleting' : 'Delete'}
      </button>
    </div>
  ),
})
```

### Заключение

Это простой пример приложения на эффекторе с использованием React и TypeScript.

Вы можете клонировать этот [effector/examples/react-and-ts](https://github.com/effector/effector/tree/master/examples/react-and-ts) и запустить этот пример на своем компьютере.
