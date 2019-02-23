//@flow

export const ADD_TODO = 'ADD_TODO'
export const DISPATCH_IN_MIDDLE = 'DISPATCH_IN_MIDDLE'
export const GET_STATE_IN_MIDDLE = 'GET_STATE_IN_MIDDLE'
export const SUBSCRIBE_IN_MIDDLE = 'SUBSCRIBE_IN_MIDDLE'
export const UNSUBSCRIBE_IN_MIDDLE = 'UNSUBSCRIBE_IN_MIDDLE'
export const THROW_ERROR = 'THROW_ERROR'
export const UNKNOWN_ACTION = 'UNKNOWN_ACTION'
test('smoke', () => {})

export function addTodo(text: string) {
  return {type: ADD_TODO, text}
}

export function addTodoAsync(text: string) {
  return (dispatch: Function) =>
    new Promise<*>(resolve =>
      setImmediate(() => {
        dispatch(addTodo(text))
        resolve()
      }),
    )
}

export function addTodoIfEmpty(text: string) {
  return (dispatch: Function, getState: () => any) => {
    if (!getState().length) {
      dispatch(addTodo(text))
    }
  }
}

export function dispatchInMiddle(boundDispatchFn: Function) {
  return {
    type: DISPATCH_IN_MIDDLE,
    boundDispatchFn,
  }
}

export function getStateInMiddle(boundGetStateFn: Function) {
  return {
    type: GET_STATE_IN_MIDDLE,
    boundGetStateFn,
  }
}

export function subscribeInMiddle(boundSubscribeFn: Function) {
  return {
    type: SUBSCRIBE_IN_MIDDLE,
    boundSubscribeFn,
  }
}

export function unsubscribeInMiddle(boundUnsubscribeFn: Function) {
  return {
    type: UNSUBSCRIBE_IN_MIDDLE,
    boundUnsubscribeFn,
  }
}

export function throwError() {
  return {
    type: THROW_ERROR,
  }
}

export function unknownAction() {
  return {
    type: UNKNOWN_ACTION,
  }
}

export const reducers = {
  todos,
  todosReverse,
  dispatchInTheMiddleOfReducer,
  getStateInTheMiddleOfReducer,
  subscribeInTheMiddleOfReducer,
  unsubscribeInTheMiddleOfReducer,
  errorThrowingReducer,
}

export function thunk({dispatch, getState}: *) {
  return (next: *) => (action: *) =>
    typeof action === 'function' ? action(dispatch, getState) : next(action)
}

function id(state = []) {
  return (
    state.reduce((result, item) => (item.id > result ? item.id : result), 0) + 1
  )
}

export function todos(state: * = [], action: *) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: id(state),
          text: action.text,
        },
      ]
    default:
      return state
  }
}

export function todosReverse(state: * = [], action: *) {
  switch (action.type) {
    case ADD_TODO:
      return [
        {
          id: id(state),
          text: action.text,
        },
        ...state,
      ]
    default:
      return state
  }
}

export function dispatchInTheMiddleOfReducer(state: * = [], action: *) {
  switch (action.type) {
    case DISPATCH_IN_MIDDLE:
      action.boundDispatchFn()
      return state
    default:
      return state
  }
}

export function getStateInTheMiddleOfReducer(state: * = [], action: *) {
  switch (action.type) {
    case GET_STATE_IN_MIDDLE:
      action.boundGetStateFn()
      return state
    default:
      return state
  }
}

export function subscribeInTheMiddleOfReducer(state: * = [], action: *) {
  switch (action.type) {
    case SUBSCRIBE_IN_MIDDLE:
      action.boundSubscribeFn()
      return state
    default:
      return state
  }
}

export function unsubscribeInTheMiddleOfReducer(state: * = [], action: *) {
  switch (action.type) {
    case UNSUBSCRIBE_IN_MIDDLE:
      action.boundUnsubscribeFn()
      return state
    default:
      return state
  }
}

export function errorThrowingReducer(state: * = [], action: *) {
  switch (action.type) {
    case THROW_ERROR:
      throw new Error()
    default:
      return state
  }
}
