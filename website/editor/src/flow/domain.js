//@flow

import {createEffect, createStore} from 'effector'

export const typeHint = createStore<string>('')

export const typeAtPos = createEffect<
  {|
    filename: string,
    body: string,
    line: number,
    col: number,
  |},
  {|code: any, success: boolean, processTime: number, service: 'type-at-pos'|},
  mixed,
>()

export const checkContent = createEffect<
  string,
  {|code: Array<any>, success: boolean, processTime: number, service: 'flow'|},
  mixed,
>()
