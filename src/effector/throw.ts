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

export const printErrorWithStack = (
  message: string,
  stack: string | undefined,
) => {
  const error = Error(message)
  if (stack) {
    error.stack = stack
  } else {
    console.log(
      'Add "import "effector/enable_debug_traces" to your code entry module to see full stack traces',
    )
  }
  console.error(error)
}
