import type {Stack} from './kernel'

export const callStackAReg = (stack, {fn}, {a}: Stack) => fn(stack, a)
export const callARegStack = (stack, {fn}, {a}: Stack) => fn(a, stack)
export const callStack = (stack, {fn}, _: Stack) => fn(stack)
