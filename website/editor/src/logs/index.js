// @flow

import {createEvent} from 'effector'
import type {Methods} from '../components/Console/methods'
import {presets} from './stylePresets'
import {CLEAR_CONSOLE, PRINT_IN_GROUP} from './env'

export const realmLog = createEvent<{|
  method: Methods,
  args: any[],
|}>('realm console.log call')

export function consoleMap() {
  const console = {}

  for (const method in global.console) {
    console[method] = logger.bind(method)
  }
  return console
}

function logger(...args) {
  const method: $off = this.toString()
  realmLog({method, args})
}

//$todo
export function printLogs(logs) {
  PRINT_IN_GROUP && console.group('runtime')
  CLEAR_CONSOLE && console.clear()

  for (const {method, args} of logs) {
    const styleArgs = []
    if (method in presets) {
      //$todo
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
  //$todo
  PRINT_IN_GROUP && console.groupEnd('runtime')
}

export const clearConsole = createEvent('clear console')
