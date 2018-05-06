//@flow

import {set} from './set'

export function update(instance: any, f: Function, args: any[]) {
 return set(instance, f(instance.get(), ...args))
}
