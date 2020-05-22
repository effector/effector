import {StoreOrData, DOMProperty} from './index.h'
import {spec} from './elementHook'

type Word = StoreOrData<DOMProperty> | StoreOrData<string> | StoreOrData<number>

export function text(x: TemplateStringsArray, ...args: Array<Word>) {
  const words: Array<Word> = [x[0]]
  for (let i = 0; i < args.length; i++) {
    words.push(args[i], x[i + 1])
  }
  spec({text: words as any})
}
