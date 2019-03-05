//@flow

import bs from './bs'
import babel from './babelPlugins'
import effector from './effector'

import hooks from './hooks'

export default {
  tasks: {
    ...effector,
    ...babel,
    ...bs,
  },
  hooks,
}
