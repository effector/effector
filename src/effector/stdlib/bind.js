//@flow

export const bind = (fn: Function, target: any) => fn.bind(null, target)
