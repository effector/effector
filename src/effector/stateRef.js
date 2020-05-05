//@flow

import {StateRef} from './index.h'
import {nextStepID} from './id'

export const createStateRef = (current: any): StateRef => ({
  id: nextStepID(),
  current,
})
export const readRef = ({current}: StateRef | {current: any}) => current
