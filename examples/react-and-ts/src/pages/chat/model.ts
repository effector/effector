import { createEvent, createStore, merge, sample } from "effector";
import { Message, messageApi, Session, sessionApi } from "shared/api";
import { $isLogged, $session } from "entities/session";
import { messageSendFx } from "../../shared/api/message";

// At the moment, there is just raw data without any knowledge how to load
export const $loggedIn = $isLogged;
export const $userName = $session.map((session) => session?.name ?? "");
export const $messages = createStore<Message[]>([]);
export const $messageText = createStore("");

// Page should NOT know where the data came from.
// That's why we just reexport them.
// We can rewrite this code to `combine` or independent store,
// page should NOT be changed, just because we changed the implementation
export const $messageDeleting = messageApi.messageDeleteFx.pending;
export const $messageSending = messageApi.messageSendFx.pending;

// And the events report just what happened
export const pageMounted = createEvent();
export const messageDeleteClicked = createEvent<Message>();
export const messageSendClicked = createEvent();
export const messageEnterPressed = createEvent();
export const messageTextChanged = createEvent<string>();
export const loginClicked = createEvent();
export const logoutClicked = createEvent();

// Here the logic place

// You can read this code like:
// When page mounted, call messages load and session load simultaneously
sample({
  clock: pageMounted,
  target: [messageApi.messagesLoadFx, sessionApi.sessionLoadFx],
});

// `.doneData` is a shortcut for `.done`, because `.done` returns `{ params, result }`
// Do not name your arguments like `state` or `payload`
// Use explicit names of the content they contain
$messages.on(messageApi.messagesLoadFx.doneData, (_, messages) => messages);

$session.on(sessionApi.sessionLoadFx.doneData, (_, session) => session);

// When login clicked we need to create a new session
sample({
  clock: loginClicked,
  target: sessionApi.sessionCreateFx,
});
// When session created, just write it to a session store
sample({
  clock: sessionApi.sessionCreateFx.doneData,
  target: $session,
});
// If session create is failed, just reset the session
sample({
  clock: sessionApi.sessionCreateFx.fail,
  fn: () => null,
  target: $session,
});

// When logout clicked we need to reset session and clear our storage
sample({
  clock: logoutClicked,
  target: sessionApi.sessionDeleteFx,
});
// In any case, failed or not, we need to reset session store
sample({
  clock: sessionApi.sessionDeleteFx.finally,
  fn: () => null,
  target: $session,
});

$messageText.on(messageTextChanged, (_, text) => text);

// We have two different events to send message
// Let event `messageSend` react on any of them
const messageSend = merge([messageEnterPressed, messageSendClicked]);

// We need to take a message text and author info then send it to the effect
sample({
  clock: messageSend,
  source: { author: $session, text: $messageText },
  filter: (form): form is { author: Session; text: string } => {
    return form.author !== null;
  },
  target: messageApi.messageSendFx,
});

$messages.on(messageApi.messageSendFx.doneData, (messages, newMessage) => [
  ...messages,
  newMessage,
]);

$messageText.on(messageSendFx, () => "");

// If message sending is failed, just restore the message
sample({
  clock: messageSendFx.fail,
  fn: ({ params }) => params.text,
  target: $messageText,
});

sample({
  clock: messageDeleteClicked,
  target: messageApi.messageDeleteFx,
});

$messages.on(
  messageApi.messageDeleteFx.done,
  (messages, { params: toDelete }) =>
    messages.filter((message) => message.id !== toDelete.id)
);
