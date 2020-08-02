import {debounce} from 'patronum/debounce'
import {restore, createEvent, forward} from 'effector'
import {onTextChange} from '~/share/index'
import {keyDown} from '~/share/init'


export const setInput = debounce({source: onTextChange, timeout: 350})
export const resetInput = createEvent()
export const $debouncedInput = restore(setInput, '').reset(resetInput)


forward({
  from: keyDown.Escape,
  to: resetInput
})
