import {createStore, Store} from 'effector'

import {retrieveCode} from './retrieve'
import defaultVersions from '../versions.json'
import {StackFrame} from '../evaluator/stackframe/stack-frame'

export const version: Store<string> = createStore(defaultVersions[0])
export const packageVersions: Store<string[]> = createStore(defaultVersions)
export const sourceCode: Store<string> = createStore(retrieveCode())
export const compiledCode: Store<string> = createStore('')
export const codeError: Store<
  | {
      isError: true,
      error: Error,
      stackFrames: StackFrame[],
    }
  | {
      isError: false,
      error: null,
      stackFrames: StackFrame[],
    },
> = createStore({
  isError: false,
  error: null,
  stackFrames: [],
})
