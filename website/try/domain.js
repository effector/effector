import {
  createEvent,
  createEffect,
  createStore,
  combine as combineFn,
  createDomain,
  forward,
} from 'effector';

import {traverseGraphite} from './traverseGraphite';
import defaultSourceCode from './defaultSourceCode';

export const realmEvent = createEvent('realm event created');
export const realmStore = createEvent('realm store');
export const realmInvoke = createEvent('realm invoke');
export const realmLog = createEvent('realm console.log call');
export const realmStatus = createEvent('realm status update');

export const evalEffect = createEffect('eval realm code');

export const changeSources = createEvent('change sources');

export const resetGraphiteState = createEvent('reset graphite state');

export const logs = createStore([]);
export const sourceCode = createStore(defaultSourceCode);
export const codeError = createStore({
  isError: false,
  message: null,
  stack: null,
});
export const graphite = createStore({});

export const graphiteCode = graphite.map(e => {
  const result = {};
  for (const key in e) {
    result[key] = traverseGraphite(e[key]);
  }
  return JSON.stringify(result, null, 2);
});

export const stats = createStore({
  event: [],
  store: [],
});
