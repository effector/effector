export function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw Error(message)
}

export const deprecate = (
  condition: unknown,
  subject: string,
  suggestion?: string,
) =>
  !condition &&
  console.error(
    `${subject} is deprecated${
      suggestion ? `, use ${suggestion} instead` : ''
    }`,
  )
