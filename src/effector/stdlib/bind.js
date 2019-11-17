//@flow

export const bind = (fn: Function, target: any) => fn.bind(null, target)
export const bind2 = (fn: Function, target: any, arg: any) =>
  fn.bind(null, target, arg)
