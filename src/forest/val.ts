import {combine, is} from 'effector'
import {Word, createWordsArray} from './wordsArray'

export function val(x: TemplateStringsArray, ...args: Array<Word>) {
  if (args.every(arg => !is.store(arg)))
    return createWordsArray(x, args).join('')
  return combine(args, args => createWordsArray(x, args).join(''))
}
