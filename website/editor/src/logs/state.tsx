

import {createStore, Store} from 'effector'
import {Methods} from '../components/Console/methods'

export const logs = createStore<
  Array<{id: number, method: Methods, data: any[]}>,
>([])
