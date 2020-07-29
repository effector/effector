//@flow

import forms from './forms'
import effector from './effector'

import hooks from './hooks'

export default {
  tasks: {
    ...effector,
    ...forms,
  },
  hooks,
}
