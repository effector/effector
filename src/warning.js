//@flow

import warning from 'warning'

export function notImplemented(message: string, ...args: any[]) {
 warning(false, `[Not implemented]: ${message}`, ...args)
}

export function toDo(message: string, ...args: any[]) {
 warning(false, `[TODO]: ${message}`, ...args)
}
