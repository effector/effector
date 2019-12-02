//@flow

export const callStackAReg = (stack, {fn}, {a}) => fn(stack, a)
export const callARegStack = (stack, {fn}, {a}) => fn(a, stack)
export const callStack = (stack, {fn}) => fn(stack)
