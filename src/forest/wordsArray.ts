import {StoreOrData, DOMProperty} from './index.h'

export type Word =
  | StoreOrData<DOMProperty>
  | StoreOrData<string>
  | StoreOrData<number>

export function createWordsArray(x: TemplateStringsArray, args: Array<Word>) {
  const words: Array<Word> = [x[0]]
  for (let i = 0; i < args.length; i++) {
    words.push(args[i], x[i + 1])
  }
  return words
}
