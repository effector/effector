import {createStore, createEvent, restore} from 'effector'

import {Method} from './types'
import * as requirements from './requirements'

interface Log {
  id: number
  method: Method
  data: any[]
}

export const logsClear = createEvent()
const logHappened = createEvent<{method: Method; args: any[]}>()
const logParsedAdded = logHappened.map(parseLog)

export const autoScrollEnableClicked = createEvent()
export const autoScrollDisableClicked = createEvent()

logParsedAdded.watch(console.info)

export const $autoScrollLog = restore(requirements.autoScrollLogChanged, true)
export const $logs = createStore<Log[]>([])

$logs
  .on(logParsedAdded, (logs, log) => logs.concat(log))
  .on(requirements.realmActiveChanged, (logs, active) => {
    if (!active) return logs
    return []
  })
  .reset(requirements.sourcesChanged, requirements.versionChanged)
  .reset(logsClear)

window.addEventListener(
  'keydown',
  event => {
    if (
      (event.ctrlKey && event.code === 'KeyL') ||
      (event.metaKey && event.code === 'KeyK')
    ) {
      event.preventDefault()
      event.stopPropagation()
      logsClear()
    }
  },
  true,
)

export function consoleMap(): Console {
  const console = {} as Console

  for (const method in global.console) {
    console[method] = logger.bind(method)
  }
  console.assert = (condition, ...args) => {
    if (!condition) {
      if (args.length === 0) args = ['console.assert']
      console.error('Assertion failed:', ...args)
    }
  }
  return console
}

function logger(this: any, ...args: any[]) {
  const method = this.toString()
  logHappened({method, args})
}

let nextLogId = 0
function parseLog({method, args}: {method: Method; args: any[]}): Log {
  const id = ++nextLogId

  switch (method) {
    case 'error': {
      const errors = args.map(extractStack)
      return {method, id, data: errors}
    }
    default: {
      return {method, id, data: args}
    }
  }
}

function extractStack(error: Error | any): any {
  try {
    return error.stack || error
  } catch (_) {
    return error
  }
}
