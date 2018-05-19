//@flow

import {Effect} from './effect'
import type {Effect as EffectType} from '../effector/index.h'

export function createEffect<Payload, Done>(
 name: string,
): EffectType<Payload, Done, *> {
 return Effect({name, domainName: ''})
}
