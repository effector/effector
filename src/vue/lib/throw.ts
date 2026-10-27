const prefix = '[effector-vue] '

export const throwError = (message: string): never => {
  throw Error(`${prefix}${message}`)
}

export const printError = (message: string) => {
  console.error(`${prefix}${message}`)
}
