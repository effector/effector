export const callStackAReg = (stack: any, {fn}: any, {a}: any) => fn(stack, a)
export const callARegStack = (stack: any, {fn}: any, {a}: any) => fn(a, stack)
export const callStack = (stack: any, {fn}: any, _: any) => fn(stack)
