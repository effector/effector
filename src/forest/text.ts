import {spec} from './elementHook'
import {Word, createWordsArray} from './wordsArray'

export function text(x: TemplateStringsArray, ...args: Array<Word>) {
  spec({text: createWordsArray(x, args) as any})
}
