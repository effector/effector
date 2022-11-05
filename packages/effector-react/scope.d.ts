import {Domain} from 'effector'
import {Gate} from 'effector-react'

export {
  useStore,
  useStoreMap,
  useList,
  useGate,
  useUnit,
  useEvent,
  Provider,
} from 'effector-react'

export function createGate<State>(config: {
  domain?: Domain
  defaultState?: State
  name?: string
  sid?: string
}): Gate<State>
