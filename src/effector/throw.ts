import {getMeta} from './getter'
import {Node} from './index.h'

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

export const getFinalMessage = (
  message: string,
  node: Node,
): [message: string, stack: string | undefined] => {
  const stack = getMeta(node, 'unitTrace') as string | undefined
  const config = getMeta(node, 'config')
  const locString = config?.loc ? ` at ${config.loc.file}` : null
  const op = getMeta(node, 'op') as string | undefined
  const name = config?.name || op

  let finalMessage = message
  if (name) {
    finalMessage = `${name}: ${message}`
  }
  if (locString) {
    finalMessage = `${name}${locString}: ${message}`
  }

  if (!stack && !name && !locString) {
    console.log(
      `Add effector's Babel or SWC plugin to your config for more detailed debug information or "import "effector/enable_debug_traces" to your code entry module to see full stack traces`,
    )
  }
  return [finalMessage, stack]
}

export const printErrorWithNodeDetails = (message: string, node: Node) => {
  const [finalMessage, stack] = getFinalMessage(message, node)

  const error = Error(finalMessage)

  if (stack) {
    error.stack = stack
  }
  console.error(error)
}
