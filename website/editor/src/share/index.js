import {createEffect, createEvent} from 'effector'


export const saveShare = createEvent()
export const removeShare = createEvent()
export const addShare = createEvent()
export const getShareList = createEffect()
export const setCurrentShareId = createEvent()
export const copyToClipboard = createEvent()
export const handleInput = createEvent()
export const onTextChange = handleInput.map(e => e.target.value)
export const handleKeyDown = createEvent()
export const onKeyDown = handleKeyDown.map(e => e.key)
