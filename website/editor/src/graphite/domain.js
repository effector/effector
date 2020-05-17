

import {createEvent, createStore} from 'effector'

import {traverseGraphite} from './traverseGraphite'
import {Cmd} from './index.h'

export const resetGraphiteState = createEvent<void>('reset graphite state')

export const graphite = createStore<{
  [key: string]: Array<Cmd>,
  __shouldReset?: boolean,
}>({})

export const graphiteCode = graphite.map<string>(e => {
  const result = {}
  for (const key in e) {
    result[key] = traverseGraphite(e[key])
  }
  return JSON.stringify(result, null, 2)
})
