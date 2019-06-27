//@flow

import {createEffect, createStore, createEvent} from 'effector'
import type {FlowError} from './index.h'

export const typeNode = {
  current: document.createElement('div'),
  show: createEvent<void>(),
  hide: createEvent<void>()
}
typeNode.current.className = 'type-hover'

export const typeHint = createStore<string | null>(null)

export const typeErrors = createStore<Array<FlowError>>([])

export const typeAtPos = createEffect<
  {|
    filename: string,
    body: string,
    line: number,
    col: number,
  |},
  {|
    code: {|c: string, t: number, l: number|} | 'fail',
    success: boolean,
    processTime: number,
    service: 'type-at-pos',
  |},
  mixed,
>()

export const checkContent = createEffect<
  string,
  {|
    code: Array<FlowError> | 'fail',
    success: boolean,
    processTime: number,
    service: 'flow',
  |},
  mixed,
>()
