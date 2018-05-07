//@flow

import invariant from 'invariant'
import type {Store} from '../store'
import {createStoreObject} from '../store/createStore'
// import {derive, atomically, struct, lens, atom} from '../derive'

export function combine(...args: Array<Store<any>>): Store<any> {
 invariant(args.length > 0, 'at least one argument required')
 const handler: Function = (args[args.length - 1]: any)
 const stores = args.slice(0, -1)
 const structStore = createStoreObject(stores)

 return structStore.map(list => handler(...list))
}
