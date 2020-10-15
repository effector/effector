export function assert(condition: any, msg: string): asserts condition {
  if (!condition) throw Error(msg)
}

export function assertClosure(
  currentActor: any,
  methodName: string,
): asserts currentActor {
  if (!currentActor)
    throw Error(`${methodName}() called outside from using() closure`)
}
