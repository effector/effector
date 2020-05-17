import {createEffect, createEvent} from 'effector'

export const login = createEvent()
export const logout = createEvent()
export const setToken = createEvent()

export const setApiKeyRemember = createEvent()
