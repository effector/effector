import {presets} from './stylePresets'
import {realmLog} from './domain'

const CLEAR_CONSOLE = false
const PRINT_IN_GROUP = false

export function consoleMap() {
  const console = {}

  for (const method in global.console) {
    console[method] = logger.bind(method)
  }
  return console
}

function logger(...args) {
  realmLog({method: this.toString(), args})
}

export function printLogs(logs) {
  PRINT_IN_GROUP && console.group('runtime')
  CLEAR_CONSOLE && console.clear()

  for (const {method, args} of logs) {
    const styleArgs = []
    if (method in presets) {
      styleArgs.push('%c%s', presets[method], ` ${method.toLocaleUpperCase()} `)
    }
    const resultArgs = styleArgs.concat(args)
    switch (method) {
      case 'log':
      case 'warn':
        console.log(...resultArgs)
        break
      default:
        console[method](...resultArgs)
        break
    }
  }
  PRINT_IN_GROUP && console.groupEnd('runtime')
}
