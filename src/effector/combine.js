//@flow

import invariant from 'invariant'
import type {Store} from '../store'
import {createStore} from '../store/createStore'
import {derive, atomically, struct, atom} from '../derive'

export function combine(...args: Array<Store<any>>): Store<any> {
 invariant(args.length > 0, 'at least one argument required')
 const handler: Function = (args[args.length - 1]: any)
 const stores = args.slice(0, -1)
 const rawStore = struct(stores)
 const resultStore = createStore(
  derive(() => {
   let result
   atomically(() => {
    result = handler(...rawStore.get())
   })
   return result
  }),
 )
 return resultStore
}
