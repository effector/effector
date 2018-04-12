//@flow

import {compose} from './compose'

export function applyMiddleware(...middlewares: Function[]) {
 return (createStore: Function) => (...args: any[]) => {
  const store = createStore(...args)
  let dispatch = () => {
   throw new Error(
    `Dispatching while constructing your middleware is not allowed. ` +
     `Other middleware would not be applied to this dispatch.`,
   )
  }
  let chain = []

  const middlewareAPI = {
   getState: store.getState,
   dispatch: (...args) => dispatch(...args),
  }
  chain = middlewares.map(middleware => middleware(middlewareAPI))
  dispatch = compose(...chain)(store.dispatch)

  return {
   ...store,
   dispatch,
  }
 }
}
