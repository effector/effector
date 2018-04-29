//@flow

import {createRootDomain} from './domain'

const defaultDomain = createRootDomain()

export function createEvent<Payload>(name: string) {
 return defaultDomain.event(name)
}

export function createEffect<Params, Done, Fail>(name: string) {
 return defaultDomain.effect(name)
}
