import {createStore, combine} from 'effector'

export const $baseStore = createStore<any>(0, {skipVoid: false})

const aliasedCombine = combine

export const $sidlessCombine = aliasedCombine($baseStore, x => x)

const aliasedMap = $baseStore.map

export const $sidlessMap = aliasedMap(x => x)
