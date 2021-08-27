export function assert(condition: any, message: string): asserts condition {
  if (!condition) throw Error(message)
}

export const deprecate = (
  condition: any,
  subject: string,
  suggestion: string,
) =>
  !condition &&
  console.error(`${subject} is deprecated, use ${suggestion} instead`)
