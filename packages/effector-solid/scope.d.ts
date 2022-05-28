import {FlowComponent} from 'solid-js'
import {Domain, Scope} from 'effector'
import {Gate} from 'effector-solid'

export {useUnit, useStoreMap, useGate} from 'effector-solid'

export const Provider: FlowComponent<{
  value: Scope
}>

export function createGate<State>(config: {
  domain?: Domain
  defaultState?: State
  name?: string
  sid?: string
}): Gate<State>

