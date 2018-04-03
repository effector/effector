//@flow

//import invariant from 'invariant'

import {
 clearListeners,
 listenerCount,
 on,
 off,
 once,
 onAny,
 offAny,
} from './listner'

import {Scope} from './scope'
import type {LongCb, SideEffect} from './index.h'
import {emitSerial, emit, emitSync, dispatchSync} from './emit'

let id = 0

const defaultScope = new Scope()

export class Emittery {
 /*::+*/ id = ++id
 on(
  eventName: Emittery,
  listener: LongCb,
  scope: Scope = defaultScope,
 ): SideEffect {
  return on(scope, this, eventName, listener)
 }

 off(eventName: Emittery, listener: LongCb, scope: Scope = defaultScope) {
  off(scope, this, eventName, listener)
 }

 once(eventName: Emittery, scope: Scope = defaultScope): Promise<mixed> {
  return once(scope, this, eventName)
 }

 emit(
  eventName: Emittery,
  eventData: mixed,
  scope: Scope = defaultScope,
 ): Promise<void[]> {
  return emit(scope, this, eventName, eventData)
 }

 emitSerial(
  eventName: Emittery,
  eventData: mixed,
  scope: Scope = defaultScope,
 ): Promise<void> {
  return emitSerial(scope, this, eventName, eventData)
 }

 emitSync(
  eventName: Emittery,
  eventData: any,
  scope: Scope = defaultScope,
 ): void {
  return emitSync(scope, this, eventName, eventData)
 }
 dispatchSync<T>(eventData: T, scope: Scope = defaultScope): void {
  return dispatchSync(scope, this, eventData)
 }

 onAny(listener: LongCb, scope: Scope = defaultScope): SideEffect {
  return onAny(scope, this, listener)
 }

 offAny(listener: LongCb, scope: Scope = defaultScope) {
  offAny(scope, this, listener)
 }

 clearListeners(eventName?: Emittery, scope: Scope = defaultScope) {
  clearListeners(scope, this, eventName)
 }

 listenerCount(eventName?: Emittery, scope: Scope = defaultScope) {
  return listenerCount(scope, this, eventName)
 }
}
