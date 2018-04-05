import { sync } from 'most-subject';
import $$observable from 'symbol-observable';
import { combine, from } from 'most';
import invariant from 'invariant';

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(_next, _throw);
        }
      }

      function _next(value) {
        step("next", value);
      }

      function _throw(err) {
        step("throw", err);
      }

      _next();
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

//@noflow

const counter = () => {
  let id = 0;
  return () => ++id;
};
function toTag(...tags) {
  return tags.filter(str => str.length > 0).join('/');
}
const nextPayloadID = counter();
const nextEventID = counter();

const PING = '@@effector/ping';
const PONG = '@@effector/pong';
const HALT = '@@effector/halt';
function createHaltAction() {
  return {
    type: HALT,
    payload: undefined
  };
}

function isAction(data) {
  return typeof data === 'object' && data != null && typeof data.type === 'string';
}

function safeDispatch(data, dispatch) {
  if (Array.isArray(data)) {
    data.filter(isAction).forEach(action => dispatch(action));
  } else if (isAction(data)) dispatch(data);

  return data;
}
function port(dispatch, state$, action$) {
  return function epic(handler) {
    const result = handler(action$, state$).multicast();
    result.observe(data => safeDispatch(data, dispatch));
    return result;
  };
}

// import {safeDispatch, port} from './port'

function basicCommon(domainName, name) {
  const type = toTag(domainName, name);
  return {
    eventID: nextEventID(),
    nextSeq: counter(),
    getType: () => type
  };
}
function observable(event, action$) {
  function observableState() {
    return {
      /**
          * The minimal observable subscription method.
          * @param {Object} observer Any object that can be used as an observer.
          * The observer object should have a `next` method.
          * @returns {subscription} An object with an `unsubscribe` method that can
          * be used to unsubscribe the observable from the store, and prevent further
          * emission of values from the observable.
          */
      subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        return action$.subscribe(observer);
      },

      [O]() {
        return event;
      }

    };
  }

  const O = $$observable;
  event[O] = observableState;
}

function watchWarn(domainName, name, error) {
  console.warn(`


  Watch function should not fail

  Effect:
    ${name}
  Domain:
    ${domainName}
  Error:
    ${error}

`);
}
function implWarn(domainName, name, props) {
  console.warn(`


  Running an effect without implementation

  Name:
    ${name}
  Domain:
    ${domainName}
  Arguments:
    ${props}


`);
}
function implError(domainName, name, props) {
  const message = `Running an effect without implementation

  Name:
    ${name}
  Domain:
    ${domainName}
  Arguments:
    ${props}


`;
  return new Error(message);
}

function createWatcher({
  event,
  domainName,
  name,
  opts
}) {
  return function watch(fn) {
    event.epic((data$, state$) => combine((data, state) => ({
      data,
      state
    }), data$, state$).sampleWith(data$).map(({
      data,
      state
    }) => {
      try {
        const result = fn(data, state);
        return result;
      } catch (err) {
        watchFailWarn({
          domainName,
          name,
          mode: opts.watchFailCheck()
        }, err);
      }
    }));
  };
}

function watchFailWarn({
  domainName,
  name,
  mode
}, error) {
  switch (mode) {
    case 'throw':
      {
        throw error;
      }

    case 'warn':
      {
        watchWarn(domainName, name, error);
      }

    case 'off':
    default:
      {
        return;
      }
  }
}

function EventConstructor(domainName, dispatch, getState, state$, events, name, action$ = sync(), config = {
  isPlain: false,
  watchFailCheck: 'warn'
}) {
  const _basicCommon = basicCommon(domainName, name),
        eventID = _basicCommon.eventID,
        nextSeq = _basicCommon.nextSeq,
        getType = _basicCommon.getType;

  const handlers = new Set();
  if (!config.isPlain) handlers.add((payload
  /*::, state*/
  ) => action$.next(payload)); // handlers.add((payload, state) => state$.next(state))

  const create = payload => ({
    type: getType(),
    payload,
    meta: {
      index: nextPayloadID(),
      eventID,
      seq: nextSeq(),
      passed: false,
      plain: config.isPlain
    }
  });

  function eventInstance(payload) {
    const toSend = Promise.resolve(payload);
    const result = create(payload);
    let canDispatch = true;
    return _objectSpread({}, result, {
      raw() {
        return result;
      },

      send(dispatchHook) {
        if (canDispatch) {
          const dispatcher = dispatchHook ? dispatchHook : dispatch;
          canDispatch = false;
          dispatcher(result);
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = handlers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              const handler = _step.value;
              handler(payload, getState());
            } // action$.next(payload)

          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }

        return toSend;
      }

    });
  }

  eventInstance.getType = getType; //$off

  eventInstance.toString = getType;
  eventInstance.watch = createWatcher({
    event: eventInstance,
    domainName,
    name,
    opts: {
      watchFailCheck: () => config.watchFailCheck
    }
  });
  eventInstance.epic = port(dispatch, state$, action$);

  eventInstance.subscribe = subscriber => action$.subscribe(subscriber); // eventInstance.port = function port<R>(events$: Stream<R>) {
  //   return events$.observe(data => safeDispatch(data, dispatch))
  // }


  eventInstance.trigger = function trigger(query, eventName = 'trigger') {
    const triggerEvent = EventConstructor(domainName, dispatch, getState, state$, events, [name, eventName].join(' '));
    triggerEvent.watch((_, state) => {
      const queryResult = query(state);
      return eventInstance(queryResult);
    });
    return triggerEvent;
  };

  observable(eventInstance, action$);
  events.set(getType(), eventInstance);
  return eventInstance;
}

function EffectConstructor(domainName, dispatch, getState, state$, events, name, opts, action$ = sync()) {
  const handlers = new Set();

  const _basicCommon = basicCommon(domainName, name),
        eventID = _basicCommon.eventID,
        nextSeq = _basicCommon.nextSeq,
        getType = _basicCommon.getType;

  handlers.add((payload, state) => action$.next(payload));
  let using = getWarn({
    domainName,
    name,
    mode: () => opts.unused()
  });

  function use(thunk) {
    using = thunk;
  }

  const create = payload => ({
    type: getType(),
    payload,
    meta: {
      index: nextPayloadID(),
      eventID,
      seq: nextSeq(),
      passed: false
    }
  });

  const effect = params => {
    let run = () => {
      run = () => {};

      const runned = runUsing(params, using);
      runned.then(result => {
        const data = {
          params,
          result
        };
        dispatcher(done(data), dispatch);
        resolve(data);
      }, error => {
        const data = {
          params,
          error
        };
        dispatcher(fail(data), dispatch);
        reject(data);
      });
    };

    const runner = dispatchHook => {
      if (canDispatch) {
        canDispatch = false;
        dispatcher(result, dispatch, dispatchHook);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = handlers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            const handler = _step.value;
            handler(params, getState());
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        run(); // action$.next(params)
      }
    };

    let resolve = val => {};

    let reject = val => {};

    const doneP = new Promise(rs => resolve = rs);
    const failP = new Promise(rs => reject = rs);
    const toSend = Promise.resolve(params);
    const result = create(params);
    let canDispatch = true;
    return _objectSpread({}, result, {
      raw() {
        return result;
      },

      send(dispatchHook) {
        runner(dispatchHook);
        return toSend;
      },

      done() {
        runner();
        return doneP;
      },

      fail() {
        runner();
        return failP;
      },

      promise() {
        runner();
        return Promise.race([doneP, failP.then(data => Promise.reject(data))]);
      }

    });
  };

  const done = EventConstructor(domainName, dispatch, getState, state$, events, [name, 'done'].join(' '));
  const fail = EventConstructor(domainName, dispatch, getState, state$, events, [name, 'fail'].join(' '));
  effect.use = use;
  effect.getType = getType;
  setToString(effect, getType);
  effect.done = done;
  effect.fail = fail;
  effect.epic = port(dispatch, state$, action$);
  effect.watch = createWatcher({
    event: effect,
    domainName,
    name,
    opts
  });

  effect.trigger = function trigger(query, eventName = 'trigger') {
    const triggerEvent = EventConstructor(domainName, dispatch, getState, state$, events, [name, eventName].join(' '));
    triggerEvent.watch((_, state) => {
      const queryResult = query(state);
      return effect(queryResult);
    });
    return triggerEvent;
  };

  effect.subscribe = subscriber => action$.subscribe(subscriber);

  observable(effect, action$);
  return effect;
}

function setToString(effect, getType) {
  effect.toString = getType;
}

function runUsing(params, using) {
  let response;

  try {
    response = using(params);
  } catch (err) {
    return Promise.reject(err);
  }

  if (typeof response === 'object' && response != null && typeof response.then === 'function') {
    return response;
  }

  return Promise.resolve(response);
}

function dispatcher(value, dispatchDefault, dispatchHook, isBatch = false) {
  if (!isAction$1(value)) {
    return value;
  }

  const dispatch = typeof dispatchHook === 'function' ? dispatchHook : dispatchDefault;
  const result = dispatch(value);
  return result;
}

function isAction$1(data) {
  return typeof data === 'object' && data != null && typeof data.type === 'string';
}

const getWarn = ({
  domainName,
  name,
  mode
}) => function never(props) {
  switch (mode()) {
    case 'throw':
      {
        return Promise.reject(implError(domainName, name, props));
      }

    case 'warn':
      {
        implWarn(domainName, name, props);
      }

    case 'off':
    default:
      {
        return new Promise(() => {});
      }
  }
};

function createDomain(store, domainName = '') {
  const redux = store;
  const config = redux.dispatch({
    type: PING
  }).payload;

  const addPlainHandler = (name, fn) => {
    config.plain.set(name, fn);
  };

  const state$ = from(redux).map(() => store.getState()).multicast();
  return DomainConstructor(domainName, redux.dispatch, store.getState, state$, new Map(), addPlainHandler);
}
function createRootDomain(domainName = '') {
  const addPlainHandler = (name, fn) => {
    config.plain.set(name, fn);
  };

  let redux;
  let reduxStore;
  const config = {
    plain: new Map()
  };

  const dispatch = function dispatch(data) {
    return redux.dispatch(data);
  };

  function getState() {
    return reduxStore.getState();
  }

  const state$ = sync();
  let unsubscribe;

  function disablePrevious(previousDispatch) {
    previousDispatch(createHaltAction());

    if (typeof unsubscribe === 'function') {
      unsubscribe();
    }
  }

  function register(store) {
    const previousDispatch = redux != null ? redux.dispatch : v => v;
    redux = reduxStore = store;
    const pong = redux.dispatch({
      type: PING,
      payload: undefined
    });

    if (pong) {
      const payload = pong.payload;
      const plain = payload.plain;
      const oldPlain = config.plain;
      oldPlain.clear(); // for (const [key, val] of oldPlain.entries()) {
      //   // if (!plain.has(key)) {
      //   plain.set(key, val)
      //   // }
      // }

      config.plain = plain;
    }

    disablePrevious(previousDispatch); //$off

    const unsub = from(store).map(() => getState()).subscribe({
      next(value) {
        state$.next(value);
      },

      error(err) {},

      complete() {}

    });

    unsubscribe = () => unsub.unsubscribe();
  }

  const domain = DomainConstructor(domainName, dispatch, getState, state$, new Map(), addPlainHandler);
  domain.register = register;
  return domain;
}

function optsReducer([key, value]) {
  if (!(key in this)) return;

  const newVal = () => value;
  this[key] = newVal;
}

function mergeEffectOpts(defaults, opts) {
  if (opts === undefined) return _objectSpread({}, defaults);

  if (!(typeof opts === 'object' && opts != null)) {
    throw new Error(`effect options should be object, got ${typeof opts}`);
  }

  const resultObj = _objectSpread({}, defaults);

  Object.keys(opts).map(key => [key, opts[key]]).forEach(optsReducer, resultObj);
  return resultObj;
}

function DomainConstructor(domainName, dispatch, getState, state$, events = new Map(), addPlainHandler = () => {}, configGetter) {
  let getConfig;

  if (typeof configGetter !== 'function') {
    const config = {
      unused: () => 'warn',
      watchFailCheck: () => 'warn',
      dispatch
    };

    getConfig = () => config;
  } else getConfig = configGetter;

  const disp = getDispatch(getConfig);
  const effectOpts = {
    unused() {
      return getConfig().unused();
    },

    watchFailCheck() {
      return getConfig().watchFailCheck();
    },

    dispatch: disp
  };

  function recoverable(events$) {
    const str$ = events$.multicast();

    const failureHandler = e => {
      portFailWarn({
        domainName
      }, e);
      return str$;
    };

    return str$.recoverWith(failureHandler);
  }

  return {
    port(events$) {
      return recoverable(events$).observe(data => {
        safeDispatch(data, dispatch);
      });
    },

    register(store) {
      console.warn(`Not implemented`);
    },

    effect(name, opts) {
      const optsFull = mergeEffectOpts(effectOpts, opts);
      return EffectConstructor(domainName, dispatch, getState, state$, events, name, optsFull);
    },

    domain(name) {
      return DomainConstructor(toTag(domainName, name), dispatch, getState, state$, events, addPlainHandler, getConfig);
    },

    event(name) {
      return EventConstructor(domainName, dispatch, getState, state$, events, name);
    },

    typeConstant(name) {
      const action$ = sync();
      addPlainHandler(name, data => {
        if (data.meta == null) data.meta = {};
        data.meta.plain = true;
        const resultEvent = result(data.payload);
        resultEvent.meta.passed = true;
        resultEvent.meta.plain = true;
        action$.next(data.payload);
        getConfig().dispatch(resultEvent);
      });
      const result = EventConstructor('', dispatch, getState, state$, events, name, action$, {
        isPlain: true,
        watchFailCheck: effectOpts.watchFailCheck()
      });
      return result;
    }

  };
}

function getDispatch(getConfig) {
  const dispatch = value => {
    const result = getConfig().dispatch(value);
    return result;
  };

  return dispatch;
}

function portFailWarn({
  domainName
}, error) {
  console.warn(`


  Port stream should not fail.
  Next failure will throw.

  Domain:
    ${domainName}
  Error:
    ${error}

`);
}

function effectorMiddleware() {
  const plainMap = new Map();
  const config = {
    plain: plainMap
  };
  let isActive = true;
  return next => action => {
    if (!isActive) {
      return action;
    }

    if (!(typeof action === 'object' && action != null)) {
      return next(action);
    }

    if (typeof action.type !== 'string') {
      return action;
    }

    if (action.type === PING) {
      return {
        type: PONG,
        payload: config
      };
    }

    if (action.type === HALT) {
      isActive = false;
      plainMap.clear();
      return next(action);
    }

    const handler = plainMap.get(action.type);
    if (!(typeof action.meta === 'object' && action.meta != null)) action.meta = {};
    if (action.meta.passed === true) return action;
    if (handler) action.meta.plain = true;

    if (typeof action.send === 'function') {
      const send = action.send,
            meta = action.meta;

      if (handler) {
        meta.passed = true;
        send(next);
        handler(action);
        return action;
      }

      action.send(next);
      return action;
    } else {
      const meta = action.meta;

      if (handler) {
        if (meta.passed !== true) {
          meta.passed = true;
          const result = next(action);
          handler(action);
          return result;
        }

        action.meta.passed = true;
      }

      action.meta.passed = true;
      return next(action);
    }
  };
}
/*
TODO Replace middleware with store enhancer,
as domains needs access to replaceReducers
to handle reducers on their own.
Also, domain might be storeEnhancer itself
*/

function normalizeType(typeOrActionCreator) {
  if (typeOrActionCreator && typeOrActionCreator.getType) {
    return typeOrActionCreator.toString();
  }

  return typeOrActionCreator;
}

function createReducer(defaultState, handlers = {}, thisType) {
  const opts = {
    fallback: null,
    defaultState
  };
  const reducer = Object.assign(reduce, {
    has,
    on,
    off,
    options,
    reset
  });
  const returnType = thisType ? thisType : reducer;

  function has(typeOrActionCreator) {
    return !!handlers[normalizeType(typeOrActionCreator)];
  }

  function reset(typeOrActionCreator) {
    on(typeOrActionCreator, (state, payload, meta) => opts.defaultState);
    return returnType;
  }

  function on(typeOrActionCreator, handler) {
    if (Array.isArray(typeOrActionCreator)) {
      typeOrActionCreator.forEach(action => {
        on(action, handler);
      });
    } else {
      handlers[normalizeType(typeOrActionCreator)] = handler;
    }

    return returnType;
  }

  function off(typeOrActionCreator) {
    if (Array.isArray(typeOrActionCreator)) {
      typeOrActionCreator.forEach(off);
    } else {
      delete handlers[normalizeType(typeOrActionCreator)];
    }

    return returnType;
  }

  function options(newOpts) {
    // $off
    Object.keys(newOpts).forEach(name => opts[name] = newOpts[name]);
    return returnType;
  }

  if (typeof handlers === 'function') {
    const factory = handlers; // $off

    handlers = {};
    factory(on, off);
  }

  function reduce(stateRaw, action) {
    const state = stateRaw === undefined ? opts.defaultState : stateRaw;

    if (!action || typeof action.type !== 'string') {
      return state;
    }

    if (action.type.startsWith('@@redux/')) {
      return state;
    }

    const handler = handlers[String(action.type)] || opts.fallback;

    if (handler) {
      const result = handler(state, action.payload, action.meta);
      if (result === undefined) return opts.defaultState;
      return result;
    }

    return state;
  }

  return reducer;
}

//@noflow
function combine$1(combine$$1, ...reducers) {
  const values = reducers.map(reducer => reducer(undefined, {
    type: '@@effector/void'
  }));
  const defaultValues = [...values];
  const defaultState = combine$$1(...values);
  let lastState = defaultState;
  const combined = createReducer(defaultState, {}, combinedReducer);

  function combinedReducer(state, action) {
    const changed = new Set();

    for (let i = 0; i < reducers.length; i++) {
      const prevValue = values[i];
      const value = reducers[i](prevValue, action);

      if (value !== prevValue) {
        changed.add(i);
        values[i] = value === undefined ? defaultValues[i] : value;
      }
    }

    const notChanged = changed.size === 0;
    let rawResult;
    if (notChanged) rawResult = lastState;else {
      lastState = rawResult = combine$$1(...values);
    }
    if (rawResult === undefined) lastState = rawResult = defaultState;
    const result = combined(rawResult, action);
    if (result === undefined) return lastState = defaultState;
    return result;
  }

  Object.assign(combinedReducer, combined);
  return combinedReducer;
}

let defaultDomain;

function domainGetter() {
  if (defaultDomain === undefined) {
    const res = createRootDomain();
    defaultDomain = res;
  }

  return defaultDomain;
} // export function


function createEvent$1(name) {
  const domain = domainGetter();
  const event = domain.event(name);
  return event;
}
function createEffect(name) {
  const domain = domainGetter();
  const effect = domain.effect(name);
  return effect;
}

class Collect {
  and(red) {
    return new Collect([...this.parts, red]);
  }

  combine(fn) {
    const reducers = this.parts.length === 0 ? [createReducer()] : this.parts;
    const join = combine$1;
    const joined = join(fn, ...reducers);
    return joined;
  }

  joint(fn) {
    return this.combine(fn);
  }

  constructor(parts = []) {
    this.parts = void 0;
    this.parts = parts;
  }

}
function collect() {
  return new Collect();
}

class Scope {
  constructor() {
    this.anyMap = new WeakMap();
    this.dispatchMap = new WeakMap();
    this.eventsMap = new WeakMap();
    this.referenceMap = new WeakMap();
  }

}

function genericSafeGet(store, instance, fabric) {
  const result = store.get(instance);
  if (result !== undefined) return result;
  const value = fabric();
  store.set(instance, value);
  return value;
}

function getFromSetMap(setMap, that) {
  return genericSafeGet(setMap, that, () => new Set());
}

function getFromAnyMap(scope, instance) {
  return getFromSetMap(scope.anyMap, instance);
}
function getFromDispatchMap(scope, instance) {
  return getFromSetMap(scope.dispatchMap, instance);
}
function getFromEventsMap(scope, instance) {
  return genericSafeGet(scope.eventsMap, instance, () => new Map());
}
function getListeners(scope, instance, eventName) {
  const events = getFromEventsMap(scope, instance);
  return getFromSetMap(events, eventName);
}
function getReferences(scope, instance) {
  return getFromSetMap(scope.referenceMap, instance);
}

function clearListeners(scope, instance, eventName) {
  if (eventName !== undefined) {
    getListeners(scope, instance, eventName).clear();
  } else {
    getFromAnyMap(scope, instance).clear();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = getFromEventsMap(scope, instance).values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        const listeners = _step.value;
        listeners.clear();
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
}
function listenerCount(scope, instance, eventName) {
  let count = getFromAnyMap(scope, instance).size;

  if (eventName !== undefined) {
    return count + getListeners(scope, instance, eventName).size;
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = getFromEventsMap(scope, instance).values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      const value = _step2.value;
      count += value.size;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return count;
}
function onDispatch(scope, instance, fn) {
  getFromDispatchMap(scope, instance).add(fn);
  return () => offDispatch(scope, instance, fn);
}

function offDispatch(scope, instance, fn) {
  getFromDispatchMap(scope, instance).delete(fn);
}

function on(scope, instance, eventName, listener) {
  invariant(instance !== eventName, 'circular reference'); //TODO add support for many listers for one event in references

  getReferences(scope, eventName).add(instance);
  getListeners(scope, instance, eventName).add(listener);
  return () => off(scope, instance, eventName, listener);
}
function off(scope, instance, eventName, listener) {
  getReferences(scope, eventName).delete(instance);
  getListeners(scope, instance, eventName).delete(listener);
}
function once(scope, instance, eventName) {
  return new Promise((rs, rj) => {
    try {
      const off = on(scope, instance, eventName, data => {
        off();
        rs(data);
      });
    } catch (err) {
      rj(err);
    }
  });
}
function onAny(scope, instance, listener) {
  getFromAnyMap(scope, instance).add(listener);
  return () => offAny(scope, instance, listener);
}
function offAny(scope, instance, listener) {
  getFromAnyMap(scope, instance).delete(listener);
}

const resolvedPromise = Promise.resolve();

function emitRefs(scope, eventName, refs, eventData) {
  if (refs.size === 0) return;
  invariant(!refs.has(eventName), 'circular reference');
  var _arr = [...refs];

  for (var _i = 0; _i < _arr.length; _i++) {
    const instance = _arr[_i];
    emitSync(scope, instance, eventName, eventData);
  }
}

function emitCallbacks(scope, eventName, eventData) {
  const refs = getFromDispatchMap(scope, eventName); //  console.log(eventName, eventData)

  if (refs.size === 0) return;
  var _arr2 = [...refs];

  for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
    const instance = _arr2[_i2];
    instance(eventData, eventName);
  }
}

function dispatchSync(scope, eventName, eventData) {
  const refs = getReferences(scope, eventName);
  emitRefs(scope, eventName, refs, eventData);
  emitCallbacks(scope, eventName, eventData);
}
function emitSync(scope, instance, eventName, eventData) {
  const listeners = [...getListeners(scope, instance, eventName)];
  const anyListeners = [...getFromAnyMap(scope, instance)];

  for (var _i3 = 0; _i3 < listeners.length; _i3++) {
    const listener = listeners[_i3];
    listener(eventData, eventName);
  }

  for (var _i4 = 0; _i4 < anyListeners.length; _i4++) {
    const listener = anyListeners[_i4];
    listener(eventData, eventName);
  }

  emitCallbacks(scope, eventName, eventData);
}
function emit(_x, _x2, _x3, _x4) {
  return _emit.apply(this, arguments);
}

function _emit() {
  _emit = _asyncToGenerator(function* (scope, instance, eventName, eventData) {
    const listeners = getListeners(scope, instance, eventName);
    const anyListeners = getFromAnyMap(scope, instance);
    const staticListeners = [...listeners];
    const staticAnyListeners = [...anyListeners];
    yield resolvedPromise;
    emitCallbacks(scope, eventName, eventData);
    return Promise.all([...staticListeners.map(
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(function* (listener) {
        if (listeners.has(listener)) {
          return listener(eventData, eventName);
        }
      });

      return function (_x9) {
        return _ref.apply(this, arguments);
      };
    }()), ...staticAnyListeners.map(
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(function* (listener) {
        if (anyListeners.has(listener)) {
          return listener(eventData, eventName);
        }
      });

      return function (_x10) {
        return _ref2.apply(this, arguments);
      };
    }())]);
  });
  return _emit.apply(this, arguments);
}

function emitSerial(_x5, _x6, _x7, _x8) {
  return _emitSerial.apply(this, arguments);
}

function _emitSerial() {
  _emitSerial = _asyncToGenerator(function* (scope, instance, eventName, eventData) {
    const listeners = getListeners(scope, instance, eventName);
    const anyListeners = getFromAnyMap(scope, instance);
    const staticListeners = [...listeners];
    const staticAnyListeners = [...anyListeners];
    yield resolvedPromise;

    for (var _i5 = 0; _i5 < staticListeners.length; _i5++) {
      const listener = staticListeners[_i5];

      if (listeners.has(listener)) {
        yield listener(eventData, eventName);
      }
    }

    for (var _i6 = 0; _i6 < staticAnyListeners.length; _i6++) {
      const listener = staticAnyListeners[_i6];

      if (anyListeners.has(listener)) {
        yield listener(eventData, eventName);
      }
    }

    emitCallbacks(scope, eventName, eventData);
  });
  return _emitSerial.apply(this, arguments);
}

//import invariant from 'invariant'
let id = 0;
const defaultScope = new Scope();
class Emittery {
  constructor() {
    this.id = ++id;
  }

  on(eventName, listener, scope = defaultScope) {
    return on(scope, this, eventName, listener);
  }

  off(eventName, listener, scope = defaultScope) {
    off(scope, this, eventName, listener);
  }

  once(eventName, scope = defaultScope) {
    return once(scope, this, eventName);
  }

  emit(eventName, eventData, scope = defaultScope) {
    return emit(scope, this, eventName, eventData);
  }

  emitSerial(eventName, eventData, scope = defaultScope) {
    return emitSerial(scope, this, eventName, eventData);
  }

  emitSync(eventName, eventData, scope = defaultScope) {
    return emitSync(scope, this, eventName, eventData);
  }

  dispatchSync(eventData, scope = defaultScope) {
    return dispatchSync(scope, this, eventData);
  }

  onDispatch(fn, scope = defaultScope) {
    return onDispatch(scope, this, fn);
  }

  onAny(listener, scope = defaultScope) {
    return onAny(scope, this, listener);
  }

  offAny(listener, scope = defaultScope) {
    offAny(scope, this, listener);
  }

  clearListeners(eventName, scope = defaultScope) {
    clearListeners(scope, this, eventName);
  }

  listenerCount(eventName, scope = defaultScope) {
    return listenerCount(scope, this, eventName);
  }

}

function atom(defaultValue) {
  return new Atomic(defaultValue);
}

function remote(baseValue) {
  let value = baseValue;
  return {
    get() {
      return value();
    },

    set(newValue) {
      value = () => newValue;
    }

  };
}

function createAtom(ref) {
  const active = remote(() => true);
  const emission = new Emittery();
  const set = new Emittery();
  const get = new Emittery();
  const offA = emission.on(set, ref.set);
  const offB = emission.on(get, cb => cb(ref.get()));

  const off = () => {
    active.set(false);
    offA();
    offB();
  };

  return {
    get,
    set,
    off,
    active,
    emission
  };
}

function getSafe(cb, get) {
  get.dispatchSync(cb);
}

function getReturn(defaultValue, get) {
  let value = defaultValue;
  getSafe(newValue => {
    value = newValue;
  }, get);
  return value;
}

class Atomic {
  constructor(defaultValue) {
    this.meta = void 0;
    let defValue = defaultValue instanceof Atomic ? () => {
      const result = defaultValue.get();

      defValue = () => result;

      return result;
    } : () => defaultValue;

    const _createAtom = createAtom(remote(defValue)),
          get = _createAtom.get,
          set = _createAtom.set,
          off = _createAtom.off,
          active = _createAtom.active,
          emission = _createAtom.emission;

    Object.defineProperty(this, 'meta', {
      value() {
        return {
          get,
          set,
          off,
          active,
          emission,
          defaultValue: defValue
        };
      }

    });
  }

  get() {
    const _meta = this.meta(),
          active = _meta.active,
          defaultValue = _meta.defaultValue,
          get = _meta.get;

    invariant(active.get(), 'inactive atom');
    return getReturn(defaultValue(), get);
  }

  set(newValue) {
    const _meta2 = this.meta(),
          active = _meta2.active,
          set = _meta2.set;

    invariant(active.get(), 'inactive atom');
    set.dispatchSync(newValue); //  emission.emitSync(set, newValue)
  }

  isActive() {
    return this.meta().active.get();
  }

  off() {
    this.meta().off();
  }

  watch(fn) {
    return this.meta().set.onDispatch(fn);
  }

  map(fn) {
    return new Reference(_ => [fn(_)], this);
  }

  chain(fn) {
    return new Reference(fn, this);
  }

  sample(b, fn) {
    let bVal = b.get();
    const offB = b.watch(b => {
      bVal = b;
    });
    const offA = iterate(this, {
      next(val) {
        const result = fn(val, bVal);
        atom.set(result);
      },

      complete() {
        atom.off();
        offA();
        offB();
      }

    });
    const atom = new Atomic();
    return atom;
  }

  combine(b, fn) {
    //  const halt = () => this.off()
    const set = (a, b) => {
      const result = fn(a, b);
      atom.set(result);
    };

    const offB = b.watch(b => {
      set(this.get(), b);
    });
    const offA = iterate(this, {
      next(val) {
        set(val, b.get());
      },

      complete() {
        atom.off();
        offA();
        offB();
      }

    });
    const atom = new Atomic();
    return atom;
  }

  update(fn) {
    const oldValue = this.get();
    const newValue = fn(oldValue);
    if (oldValue === newValue) return this;
    if (newValue === undefined) return this;
    this.set(newValue);
    return this;
  }

}

function iterate(ref, observable) {
  const off = ref.watch(_ => observable.next(_));
  return () => {
    observable.complete();
    off();
  };
}

class Reference extends Atomic {
  constructor(transformer, ref) {
    const defs = [...transformer(ref.get())];
    super(defs[defs.length - 1]);

    const halt = () => this.off();

    const set = t => this.set(t);

    const off = iterate(ref, {
      next(val) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = transformer(val)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            const result = _step3.value;
            set(result);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      },

      complete() {
        halt();
        off();
      }

    });
  }

} // export function from<T>(transformer: Generator<T>, ref: Atomic<T>) {}
 // export function map<A, B>

export { createDomain, createRootDomain, effectorMiddleware, createReducer, combine$1 as combine, combine$1 as joint, createHaltAction, createEvent$1 as createEvent, createEffect, collect as mill, collect, Atomic, atom, Reference };
