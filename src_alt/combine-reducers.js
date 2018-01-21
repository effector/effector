//@flow
/*eslint-disable no-redeclare */
import type {Reducer} from 'redux'
import * as Mono from 'monocle-ts'

function warning(...args: any) {}

function isPlainObject(value): boolean %checks {
  return true
}
const ActionTypes = {
  INIT: 'INIT',
}

function getUndefinedStateErrorMessage(key, action) {
  const actionType = action && action.type
  const actionName = (actionType && `"${actionType.toString()}"`) || 'an action'

  return (
    `Given action ${actionName}, reducer "${key}" returned undefined. ` +
    `To ignore an action, you must explicitly return the previous state. ` +
    `If you want this reducer to hold no value, you can return null instead of undefined.`
  )
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  const reducerKeys = Object.keys(reducers)
  const argumentName =
    action && action.type === ActionTypes.INIT
      ? 'preloadedState argument passed to createStore'
      : 'previous state received by the reducer'

  if (reducerKeys.length === 0) {
    return (
      'Store does not have a valid reducer. Make sure the argument passed ' +
      'to combineReducers is an object whose values are reducers.'
    )
  }

  if (!isPlainObject(inputState)) {
    const matched = {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)

    return (
      `The ${argumentName} has unexpected type of "${
        (matched || ['', ''])[1]
      }". Expected argument to be an object with the following ` +
      `keys: "${reducerKeys.join('", "')}"`
    )
  }

  const unexpectedKeys = Object.keys(inputState).filter(
    key => !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key],
  )

  unexpectedKeys.forEach(key => {
    unexpectedKeyCache[key] = true
  })

  if (unexpectedKeys.length > 0) {
    return (
      `Unexpected ${unexpectedKeys.length > 1 ? 'keys' : 'key'} ` +
      `"${unexpectedKeys.join('", "')}" found in ${argumentName}. ` +
      `Expected to find one of the known reducer keys instead: ` +
      `"${reducerKeys.join('", "')}". Unexpected keys will be ignored.`
    )
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(key => {
    const reducer = reducers[key]
    const initialState = reducer(undefined, {type: ActionTypes.INIT})

    if (typeof initialState === 'undefined') {
      throw new Error(
        `Reducer "${key}" returned undefined during initialization. ` +
          `If the state passed to the reducer is undefined, you must ` +
          `explicitly return the initial state. The initial state may ` +
          `not be undefined. If you don't want to set a value for this reducer, ` +
          `you can use null instead of undefined.`,
      )
    }

    const type =
      `@@redux/PROBE_UNKNOWN_ACTION_${
        Math.random()
          .toString(36)
          .substring(7)
          .split('')
          .join('.')}`
    if (typeof reducer(undefined, {type}) === 'undefined') {
      throw new Error(
        `Reducer "${key}" returned undefined when probed with a random type. ` +
          `Don't try to handle ${ActionTypes.INIT} or other actions in "redux/*" ` +
          `namespace. They are considered private. Instead, you must return the ` +
          `current state for any unknown actions, unless it is undefined, ` +
          `in which case you must return the initial state, regardless of the ` +
          `action type. The initial state may not be undefined, but can be null.`,
      )
    }
  })
}

import {array, store, state} from 'fp-ts'

type StateExample = {
  foo: 'bar' | 'foobar',
  black: 'white',
  colors: ('black' | 'white' | 'green')[],
  substate: {
    foo: 'sub',
    deep: {
      ok: 'got it',
    }
  }
}

declare export class Combine<S, /*::+*/R = $ObjMap<S,
  <T>(val: Reducer<T>) => T>> {
    extend(): R,
  }

declare function traverseReducerObject<S>(
  state: S
): Reducer<$ObjMap<S, <T>(val: Reducer<T>) => T>>

declare var com: Combine<{
  foo: Reducer<'bar'>,
}> 

declare var trav: () => {
  foo: Reducer<'bar'>,
}
declare function o2<A, B, C>(
  f2: (b: B) => C
): (
  & ((f1: (a: A) => B) => ((a: A) => C))
  & ((f1: (a: A) => B, x: A) => C)
)
declare function o2<A, B, C>(
  f2: (b: B) => C,
  f1: (a: A) => B
): ((a: A) => C)

declare function o2<A, B, C>(
  f2: (b: B) => C,
  f1: (a: A) => B,
  x: A
): C

const getSetSubstate = o2(
  (focus: $PropertyType<StateExample, 'substate'>) =>
    (state: StateExample): StateExample => ({
      ...state,
      substate: focus,
    }),
  (state: StateExample) => state.substate
)

// declare class Restate<I = {}, II = I> {
//   state: I;
//   restateReducer<III>(
//     defaults: III, reducer: (
//       state: this, data: III
//     ) => II
//   ): Restate<I, III>
// }

// const redTrav = traverseReducerObject(trav())
// redTrav.foo
// const rawCom = () => com

// const coms = rawCom().extend()

// coms.foo

// const store1 = state.gets(
//   (x: StateExample): StateExample => x
// )

// store1

// const mono1 = Mono

const lensFoo: Mono.Lens<StateExample, 'foobar' | 'bar'> = new Mono.Lens(
  (state: StateExample) => state.foo,
  (foo: 'foobar' | 'bar') =>
    (state: StateExample): StateExample => ({
      ...state,
      foo,
    })
)
lensFoo
const getFoo = new mono1.Getter(
  (state: StateExample) => state.foo
)

declare var swapFoo: (
  (i: 'foobar' | 'bar') => ('foobar' | 'bar')
)

const setFoo = new mono1.Setter(
  (f: typeof swapFoo) => ({foo, ...state}: StateExample): StateExample => ({
    foo: f(foo),
    ...state,
  })
)
import {Fold, fromFoldable} from 'monocle-ts'

import {monoidProduct, monoidSum} from 'fp-ts/lib/Monoid'
import {identity} from 'fp-ts/lib/function'

const xs = ['a', 'bb']
const fold: Mono.Fold<string[], string> = fromFoldable(array.array)()
const len = (s: string) => s.length

console.log(fold.foldMap(monoidSum)(len)(xs))
console.log(fold.foldMap(monoidProduct)(len)(xs))

import {either} from 'fp-ts'

const fold2: Mono.Fold<either.Either<boolean, string>, any> = fromFoldable(either.either)()
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
export default function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers)
  const finalReducers = {}
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i]

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning(`No reducer provided for key "${key}"`)
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }
  const finalReducerKeys = Object.keys(finalReducers)

  let unexpectedKeyCache
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {}
  }

  let shapeAssertionError
  try {
    assertReducerShape(finalReducers)
  } catch (e) {
    shapeAssertionError = e
  }

  return function combination(state = {}, action) {
    if (shapeAssertionError) {
      throw shapeAssertionError
    }

    if (process.env.NODE_ENV !== 'production') {
      const warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache)
      if (warningMessage) {
        warning(warningMessage)
      }
    }

    let hasChanged = false
    const nextState = {}
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i]
      const reducer = finalReducers[key]
      const previousStateForKey = state[key]
      const nextStateForKey = reducer(previousStateForKey, action)
      if (typeof nextStateForKey === 'undefined') {
        const errorMessage = getUndefinedStateErrorMessage(key, action)
        throw new Error(errorMessage)
      }
      nextState[key] = nextStateForKey
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    return hasChanged ? nextState : state
  }
}
