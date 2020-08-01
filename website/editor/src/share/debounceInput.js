import {debounce} from 'patronum/debounce'
import {restore} from 'effector'
import {onTextChange} from '~/share/index'
import {keyDown} from '~/share/init'


export const setInput = debounce({source: onTextChange, timeout: 250})
export const $debouncedInput = restore(setInput, '')
  .on(keyDown.Escape, () => '')
