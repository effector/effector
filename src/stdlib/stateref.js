//@flow
import type {StateRef} from './index.h'
import {stringRefcount} from './refcount'
const nextID = stringRefcount()
export function createStateRef(current: any): StateRef {
  return {
    id: nextID(),
    current,
  }
}
