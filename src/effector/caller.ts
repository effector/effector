import type {Stack} from './kernel'

export const callStackAReg = (
  stack: any,
  {fn}: {[key: string]: any},
  {a}: Stack,
) => fn(stack, a)
export const callARegStack = (
  stack: any,
  {fn}: {[key: string]: any},
  {a}: Stack,
) => fn(a, stack)
export const callStack = (stack: any, {fn}: {[key: string]: any}, _: Stack) =>
  fn(stack)
