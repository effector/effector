// @flow

import {createEvent, createEffect, type Effect} from 'effector'

export const flowToggleChange = createEvent<SyntheticEvent<HTMLInputElement>>()

export const tsToggleChange = createEvent<SyntheticEvent<HTMLInputElement>>()

export const typeHoverToggleChange = createEvent<
  SyntheticEvent<HTMLInputElement>,
>()

export const clickPrettify = createEvent<any>()
export const prettier: Effect<
  {code: string, parser: 'flow' | 'typescript' | 'babel'},
  string,
  Error,
> = createEffect()

export const enableAutoScroll = createEvent()
export const disableAutoScroll = createEvent()
