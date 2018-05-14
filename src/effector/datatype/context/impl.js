//@flow

import type {Context, RunContext, EmitContext, ComputeContext} from './index.h'
import {type Time, now} from '../../time'

export function computeContext(
 args: Array<any>,
 time: Time = now(),
): ComputeContext {
 return {
  time,
  args,
  meta: {
   isCompute: true,
   isRun: false,
   isEmit: false,
  },
  result: null,
  error: null,
  isError: false,
  isNone: true,
  isChanged: true,
 }
}

export function emitContext(
 payload: any,
 eventName: string,
 time: Time = now(),
): EmitContext {
 return {
  payload,
  eventName,
  meta: {
   isCompute: false,
   isRun: false,
   isEmit: true,
  },
  needToRun: false,
  time,
 }
}

export function runContext(args: Array<any>, time: Time = now()): RunContext {
 return {
  args,
  time,
  meta: {
   isCompute: false,
   isRun: true,
   isEmit: false,
  },
 }
}

export function context(time: Time = now()): Context {
 return {
  time,
  compute: new Map(),
  emit: new Map(),
  run: new Map(),
  multi: new Map(),
  seq: new Map(),
 }
}
