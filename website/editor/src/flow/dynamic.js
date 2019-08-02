//@flow

import {flow, typeAtPos as _typeAtPos} from '@zerobias/codebox'
import {sourceCode, performLint} from '../domain'
import {flowToggle, typeHoverToggle} from '../settings/domain'
import {checkContent, typeAtPos, typeHint, typeErrors, typeNode} from './domain'

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
    checkContent.use(async() => ({
      code: 'fail',
      processTime: 0,
      success: true,
      service: 'flow',
    }))
    typeAtPos.use(async() => Promise.reject())
  }
  performLint()
})

typeErrors
  .on(checkContent.done, (state, {result}) => {
    if (result.code === 'fail') return state
    return result.code
  })
  .reset(checkContent.fail)

typeHint
  .on(typeAtPos.done, (_, {result}) => result.code.c)
  .reset(typeAtPos.fail)

typeHoverToggle.watch(enabled => {
  if (enabled) {
    typeNode.show.watch(() => {
      typeNode.current.style.opacity = '1'
      typeNode.current.style.visibility = 'inherit'
    })
    typeNode.hide.watch(() => {
      typeNode.current.style.opacity = '0'
      typeNode.current.style.visibility = 'hidden'
    })

    typeAtPos.fail.watch(() => typeNode.hide())

    typeHint
      .map(data => {
        if (data === null) return 'Loading...'
        return data
      })
      .watch(hint => {
        typeNode.current.innerText = hint
      })
  }
})
