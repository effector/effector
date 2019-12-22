//@flow
import {createDomain, type Effect} from 'effector'

export const domain = createDomain()

export const workerMessage = domain.effect<string, string[]>()
export const failure = domain.effect<void, any>()
export const ping: Effect<{now: number}, {ping: number}> = domain.effect()
