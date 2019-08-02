//@flow

import {realmLog, logs} from './domain'
import {changeSources, selectVersion} from '../editor'
import {realmStatus} from '../realm'

let nextID = 0

const parsedLog = realmLog.map(({method, args}) => {
  const id = ++nextID

  switch (method) {
    case 'error': {
      const errors = args.map(error => {
        try {
          return error.stack || error
        } catch (e) {
          return error
        }
      })

      return {
        method,
        id,
        data: errors,
      }
    }

    default: {
      return {
        method,
        id,
        data: args,
      }
    }
  }
})

logs
  .on(parsedLog, (logs, log) => logs.concat(log))
  .on(realmStatus, (logs, {active}) => {
    if (!active) return logs
    return []
  })
  .reset(changeSources)
  .reset(selectVersion)
