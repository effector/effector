import {Domain, Unit} from 'effector'

export interface Scope {}

/**
hydrate state on client

const root = createDomain()
hydrate(root, {
  values: window.__initialState__
})

*/
export function hydrate(
  domain: Domain,
  config: {values: {[sid: string]: any}},
): void

/**
serialize state on server
*/
export function serialize(scope: Scope): {[sid: string]: any}

/** bind event to scope from .watch call */
export function scopeBind<T>(unit: Unit<T>): (payload: T) => void

export function fork(domain: Domain): Scope

/** run event in scope and wait for all triggered effects */
export function waitAll<T>(
  unit: Unit<T>,
  config: {scope: Scope; params: T},
): Promise<void>
