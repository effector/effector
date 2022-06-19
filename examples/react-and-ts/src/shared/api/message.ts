import { createEffect } from "effector";
import { createOid } from "shared/lib/oid";
import { wait } from "shared/lib/wait";

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

// Here effect defined with static types. void defines no arguments.
// Second type argument defines a successful result type.
// Third argument is optional and defines a failure result type.
export const messagesLoadFx = createEffect<void, Message[], Error>(async () => {
  const history = loadHistory();
  await wait();
  return history ?? [];
});

interface SendMessage {
  text: string;
  author: Author;
}

// But we can use type inferring and set arguments types in the handler defintion.
// Hover your cursor on `messagesLoadFx` to see the inferred types:
// `Effect<{ text: string; authorId: string; authorName: string }, void, Error>`
export const messageSendFx = createEffect(
  async ({ text, author }: SendMessage) => {
    const message: Message = {
      id: createOid(),
      author,
      timestamp: Date.now(),
      text,
    };
    const history = await messagesLoadFx();
    saveHistory([...history, message]);
    await wait();
    return message;
  }
);

// Please, note that we will `wait()` for `messagesLoadFx` and `wait()` in the current effect
// Also, note that `saveHistory` and `loadHistory` can throw exceptions,
// in that case effect will trigger `messageDeleteFx.fail` event.
export const messageDeleteFx = createEffect(async (message: Message) => {
  const history = await messagesLoadFx();
  const updated = history.filter((found) => found.id !== message.id);
  await wait();
  saveHistory(updated);
});
