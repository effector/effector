//@flow

import type {Stream} from 'most'
// import {type Subject, async as subject} from 'most-subject'

export function safeDispatch<R>(
  data: R,
  dispatch: <T>(value: T) => T
) {
  if (
    typeof data === 'object'
    && data != null
    && typeof data.type === 'string'
  ) {
    dispatch(data)
  }
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

