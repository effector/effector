import {createStore, combine} from 'effector'

export const baseStoreForSimpleDerived = createStore<any>(0, {skipVoid: false})
const b = createStore<any>(0)

export const simpleCombine = combine(
  {
    a: baseStoreForSimpleDerived,
    b,
  },
  ({a}) => a,
)

export const simpleDerived = baseStoreForSimpleDerived.map(x => x)
