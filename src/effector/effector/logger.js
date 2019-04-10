//@flow
export function formatter(message: string, ...args: Array<any>) {
  let argIndex = 0
  return message.replace(/%s/g, () => args[argIndex++])
}
