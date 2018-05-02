//@flow

import {
 ADD_TODO,
 DISPATCH_IN_MIDDLE,
 GET_STATE_IN_MIDDLE,
 SUBSCRIBE_IN_MIDDLE,
 UNSUBSCRIBE_IN_MIDDLE,
 THROW_ERROR,
} from './actionTypes'

function id(state: Array<*> = []) {
 return (
  state.reduce((result, item) => (item.id > result ? item.id : result), 0) + 1
 )
}

export function noReducer<T>(state: T, action: *): T {
 return state
}

export function todos(state: Array<*>, action: *, typeRaw: string) {
 let type
 console.log(action)
 if (typeof typeRaw !== 'undefined') type = typeRaw
 else if (
  typeof action === 'object'
  && action !== null
  && typeof action.type !== 'undefined'
 )
  type = action.type
 //else throw new TypeError('type not detected')
 //  if (type === undefined) {
 //   throw new TypeError('undefined type')
 //  }
 switch (type) {
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

export function todosReverse(state: Array<*> = [], action: *) {
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

export function dispatchInTheMiddleOfReducer(state: Array<*> = [], action: *) {
 switch (action.type) {
  case DISPATCH_IN_MIDDLE:
   action.boundDispatchFn()
   return state
  default:
   return state
 }
}

export function getStateInTheMiddleOfReducer(state: Array<*> = [], action: *) {
 switch (action.type) {
  case GET_STATE_IN_MIDDLE:
   action.boundGetStateFn()
   return state
  default:
   return state
 }
}

export function subscribeInTheMiddleOfReducer(state: Array<*> = [], action: *) {
 switch (action.type) {
  case SUBSCRIBE_IN_MIDDLE:
   action.boundSubscribeFn()
   return state
  default:
   return state
 }
}

export function unsubscribeInTheMiddleOfReducer(
 state: Array<*> = [],
 action: *,
) {
 switch (action.type) {
  case UNSUBSCRIBE_IN_MIDDLE:
   action.boundUnsubscribeFn()
   return state
  default:
   return state
 }
}

export function errorThrowingReducer(state: Array<*> = [], action: *) {
 switch (action.type) {
  case THROW_ERROR:
   throw new Error()
  default:
   return state
 }
}
