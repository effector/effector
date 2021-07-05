import type {Stack} from './kernel'

export const callStackAReg = (stack: any, {fn}: any, {a}: Stack) => fn(stack, a)
export const callARegStack = (stack: any, {fn}: any, {a}: Stack) => fn(a, stack)
export const callStack = (stack: any, {fn}: any, _: Stack) => fn(stack)
