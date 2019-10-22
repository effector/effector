// @flow

import {createEvent, createEffect, type Effect} from 'effector'

export const flowToggleChange = createEvent<SyntheticEvent<HTMLInputElement>>()

export const tsToggleChange = createEvent<SyntheticEvent<HTMLInputElement>>()

export const typeHoverToggleChange = createEvent<
  SyntheticEvent<HTMLInputElement>,
>()

export const clickPrettify = createEvent<any>()
export const prettier: Effect<string, string, Error> = createEffect()
