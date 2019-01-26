//@flow
import type {ID} from './typedef'
let id = 0

export type StateRef = {
  +id: ID,
  current: any,
}

export function createStateRef(current: any): StateRef {
  return {
    id: (++id).toString(36),
    current,
  }
}
