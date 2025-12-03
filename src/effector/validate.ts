import type {Kind, Unit} from './index.h'
import type {Domain, Effect, Event, Scope, Store} from './unit.h'
import {DOMAIN, STORE, EVENT, EFFECT, SCOPE} from './tag'
import {isObject, isFunction} from './is'
import {getMeta} from './getter'
import { UnitTargetable } from 'effector'

const validKinds: readonly string[] = [STORE, EVENT, EFFECT, DOMAIN, SCOPE]

export const unit = (obj: unknown): obj is Unit<any> =>
  (isFunction(obj) || isObject(obj)) &&
  'kind' in obj &&
  'graphite' in obj &&
  validKinds.includes((obj as any).kind)

const is = (type: Kind) => (obj: unknown) => unit(obj) && obj.kind === type

export const store = is(STORE) as (value: unknown) => value is Store<unknown>
export const event = is(EVENT) as (value: unknown) => value is Event<unknown>
export const effect = is(EFFECT) as (
  value: unknown,
) => value is Effect<unknown, unknown, unknown>
export const targetable = (obj: unknown): obj is UnitTargetable<unknown> => unit(obj) && !!(obj as any).targetable
export const domain = is(DOMAIN) as (value: unknown) => value is Domain
export const scope = is(SCOPE) as (value: unknown) => value is Scope
export const attached = (unit: unknown) =>
  effect(unit) && getMeta(unit, 'attached') === true
