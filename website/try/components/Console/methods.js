//@flow

const methods = [
  'log',
  'debug',
  'info',
  'warn',
  'error',
  'table',
  'clear',
  'time',
  'timeEnd',
  'count',
  'assert',
]

export default methods

export type Methods =
  | 'log'
  | 'debug'
  | 'info'
  | 'warn'
  | 'error'
  | 'table'
  | 'clear'
  | 'time'
  | 'timeEnd'
  | 'count'
  | 'assert'
