import {createStore} from 'effector'

const aliasedFactory = createStore

export const sidlessStore = aliasedFactory<any>(0)
