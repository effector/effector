export function assert(condition, message: string): asserts condition {
  if (!condition) throw Error(message)
}

export const deprecate = (condition, subject: string, suggestion: string) =>
  !condition &&
  console.error(`${subject} is deprecated, use ${suggestion} instead`)
