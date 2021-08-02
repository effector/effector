import {spec} from './spec'
import {Word, createWordsArray} from '../wordsArray'

export function text(x: TemplateStringsArray, ...args: Array<Word>) {
  if (Array.isArray(x)) {
    spec({text: createWordsArray(x, args) as any})
  } else {
    spec({text: x as any})
  }
}
