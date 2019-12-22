//@flow

import {createEvent, createEffect, type Event, type Effect} from 'effector'

export const evalEffect: Effect<string, any, any> = createEffect()

export const performLint: Event<void> = createEvent()
export const changeSources: Event<string> = createEvent()

export const selectVersion: Event<string> = createEvent()

export const codeSetCursor: Event<any> = createEvent()
export const codeCursorActivity: Event<any> = createEvent()
export const codeMarkLine: Effect<any, any, any> = createEffect()
