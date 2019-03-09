//@flow
import type {StateRef} from './index.h'
let id = 0

export function createStateRef(current: any): StateRef {
  return {
    id: (++id).toString(36),
    current,
  }
}
