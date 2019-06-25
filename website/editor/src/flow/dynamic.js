//@flow

import {flow, typeAtPos as _typeAtPos} from '@zerobias/codebox'
import {sourceCode} from '../domain'
import {flowToggle} from '../settings/domain'
import {checkContent, typeAtPos, typeHint} from './domain'

if (process.env.NODE_ENV === 'development') {
  checkContent.fail.watch(data => console.error('checkContent', data))
  checkContent.done.watch(data => console.log('checkContent', data))
  typeAtPos.fail.watch(data => console.error('typeAtPos', data))
  typeAtPos.done.watch(data => console.log('typeAtPos', data))
}

flowToggle.watch(enabled => {
  if (enabled) {
    checkContent.use(body => flow(body))
    typeAtPos.use(({filename, body, line, col}) =>
      _typeAtPos({filename, body, line, col}).then(data => {
        if (data.code === 'fail') return Promise.reject(data)
        return data
      }),
    )
  } else {
    checkContent.use(async () => {
      return {code: 'fail', processTime: 0, success: true, service: 'flow'}
    })
    typeAtPos.use(async () => {
      return Promise.reject()
    })
  }
})

typeHint
  .on(typeAtPos.done, (_, {result}) => result.code.c)
  .reset(typeAtPos.fail)
