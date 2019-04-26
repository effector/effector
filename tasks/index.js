//@flow

import bs from './bs'
import babel from './babelPlugins'
import forms from './forms'
import effector from './effector'
import adapters from './adapters'

import hooks from './hooks'

export default {
  tasks: {
    ...effector,
    ...babel,
    ...forms,
    ...adapters,
    ...bs,
  },
  hooks,
}
