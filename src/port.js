//@flow

import type {Stream} from 'most'
// import {type Subject, async as subject} from 'most-subject'

function isAction(data): boolean %checks {
  return (
    typeof data === 'object'
    && data != null
    && typeof data.type === 'string'
  )
}

export function safeDispatch<R>(
  data: R,
  dispatch: <T>(value: T) => T
) {
  if (Array.isArray(data)) return data.filter(isAction).forEach(action => dispatch(action))
  if (isAction(data)) return dispatch(data)
  return
}

export function port<State, Payload>(
  dispatch: <T>(value: T) => T,
  state$: Stream<State>,
  action$: Stream<Payload>
): (<R>(handler: (
  data$: Stream<Payload>,
  state$: Stream<State>
) => Stream<R>) => Stream<R>) {
  return function epic<R>(
    handler: (
      data$: Stream<Payload>,
      state$: Stream<State>
    ) => Stream<R>
  ): Stream<R> {
    const result = handler(action$, state$)
      .multicast()
    result.observe(data => safeDispatch(data, dispatch))
    return result
  }
}

