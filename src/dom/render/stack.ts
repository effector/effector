import {StackRecord, Stack, BindingsDraft} from './index.h'

export const nodeStack: StackRecord[] = []

let currentActiveStack: Stack

export const activeStack = {
  get: () => currentActiveStack,
  replace(stack: Stack) {
    currentActiveStack = stack
  },
  getElementNode: () => currentActiveStack.node as BindingsDraft
}
