//@flow

import {createEvent, createStore, Store} from 'effector'
import type {Methods} from '../components/Console/methods'

export const realmLog = createEvent<{|
  method: Methods,
  args: any[]
|}>(
  'realm console.log call',
)

export const logs = createStore<Array<{|id: number, method: Methods, data: any[]|}>>([])
