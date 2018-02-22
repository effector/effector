//@flow

import {type Stream, combine} from 'most'
import {subject, type Subject} from '../subject'

import {implWarn, implError, watchWarn} from './warn'
export function createWatcher<Params, State>({
  event,
  domainName,
  name,
  opts,
}: {
  event: {
    epic: <R>(handler: (
      data$: Stream<Params>,
      state$: Stream<State>
      ) => Stream<R>) => Stream<R>,
  },
  domainName: string,
  name: string,
  opts: *,
}): (<R>(fn: (params: Params, state: State) => R) => void) {
  return function watch<R>(fn: (params: Params, state: State) => R) {
    event.epic((data$, state$) =>
      combine((data, state) => ({data, state}), data$, state$)
        .sampleWith(data$)
        .map(({data, state}) => {
          try {
            const result = fn(data, state)
            return result
          } catch (err) {
            watchFailWarn(
              {
                domainName,
                name,
                mode: opts.watchFailCheck(),
              },
              err,
            )
          }
        }),
    )
  }
}

function watchFailWarn({domainName, name, mode}, error) {
  switch (mode) {
    case 'throw': {
      throw error
    }
    case 'warn': {
      watchWarn(domainName, name, error)
    }
    case 'off':
    default: {
      return
    }
  }
}
