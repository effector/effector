//@flow

import {stepKind} from './stepKind'

export const child = stepKind('child')
export const effect = stepKind('effect', {
  from: [child],
})
export const barrier = stepKind('barrier', {
  from: [child],
  to: [effect],
})
export const pure = stepKind('pure', {
  from: [child],
  to: [barrier],
})
export const sampler = stepKind('sampler', {
  from: [pure, barrier],
  to: [effect],
})
