//@flow

import {flow, typeAtPos as _typeAtPos} from '@zerobias/codebox'
import {sourceCode} from '../domain'
import {checkContent, typeAtPos, typeHint} from './domain'

checkContent.fail.watch(data => console.error('checkContent', data))
checkContent.done.watch(data => console.log('checkContent', data))
typeAtPos.fail.watch(data => console.error(data))

checkContent.use(body => flow(body))
typeAtPos.use(({filename, body, line, col}) =>
  _typeAtPos({filename, body, line, col}).then(data => {
    if (data.code === 'fail') return Promise.reject(data)
    return data
  }),
)

typeHint
  .on(typeAtPos.done, (_, {result}) => result.code.c)
  .reset(typeAtPos.fail)
