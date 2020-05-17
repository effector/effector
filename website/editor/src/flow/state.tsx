import {createStore} from 'effector'
import {FlowError} from './index.h'

export const typeHint = createStore<string | null>(null)
export const typeErrors = createStore<Array<FlowError>>([])

export const typeNode = document.createElement('div')
