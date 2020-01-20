import {Domain, Store, Unit} from 'effector'

export interface Scope {}

export type ValueMap = Map<Store<any>, any> | {[sid: string]: any}

/**
hydrate state on client

const root = createDomain()
hydrate(root, {
  values: window.__initialState__
})

*/
export function hydrate(domain: Domain, config: {values: ValueMap}): void

/**
serialize state on server
*/
export function serialize(scope: Scope): {[sid: string]: any}

/** bind event to scope from .watch call */
export function scopeBind<T>(unit: Unit<T>): (payload: T) => void

export function fork(domain: Domain, config?: {values?: ValueMap}): Scope

/** run event in scope and wait for all triggered effects */
export function allSettled<T>(
  unit: Unit<T>,
  config: {scope: Scope; params: T},
): Promise<void>
