export function assert(
  condition: any,
  message?: string | (() => string),
): asserts condition {
  if (!condition) {
    let finalMessage: string | void
    if (typeof message === 'function') {
      try {
        finalMessage = message()
      } catch (err) {
        console.error(err)
      }
    } else finalMessage = message
    throw Error(finalMessage as string)
  }
}
