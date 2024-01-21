export function assert(
  condition: unknown,
  message: string,
  errorTitle?: string,
): asserts condition {
  if (!condition)
    throw Error(`${errorTitle ? errorTitle + ': ' : ''}${message}`)
}

export const deprecate = (
  condition: unknown,
  subject: string,
  suggestion?: string,
  errorTitle?: string,
) =>
  !condition &&
  console.error(
    `${errorTitle ? errorTitle + ': ' : ''}${subject} is deprecated${
      suggestion ? `, use ${suggestion} instead` : ''
    }`,
  )
