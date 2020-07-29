//@flow

import babel from './babelPlugins'
import forms from './forms'
import effector from './effector'

import hooks from './hooks'

export default {
  tasks: {
    ...effector,
    ...babel,
    ...forms,
  },
  hooks,
}
