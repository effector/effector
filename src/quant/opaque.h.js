//@flow

/*::export opaque*/
type Unary /*: (input: any, ...none: void[]) => any*/ = (input: any) => any

export function unary<I, O>(fn: (x: I) => O): Unary {
  return fn
}

export const bypass: Unary = x => x
