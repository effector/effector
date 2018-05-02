//@flow

import invariant from 'invariant'
import {type Store, createStore} from '../store'
import {derive, atom} from '../derive'

export function combine(...args: Array<Store<any>>): Store<any> {
 invariant(args.length > 0, 'at least one argument required')
 const handler: Function = (args[args.length - 1]: any)
 const stores = args.slice(0, -1)
 const getState = () => handler(...stores.map(store => store.getState()))
 const resultStore = createStore(getState())
 const combined = derive(() =>
  handler(...stores.map(store => store.getState())),
 )
 combined.react(update => {
  resultStore.setState(update)
 })
 return resultStore
}
