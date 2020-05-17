import {guard} from 'effector'
//$todo
import {flow, typeAtPos as _typeAtPos} from '@zerobias/codebox'
import {performLint} from '../editor'
import {sourceCode} from '../editor/state'
import {flowToggle, typeHoverToggle} from '../settings/state'
import {checkContent, typeAtPos, showTypeNode, hideTypeNode} from '.'
import {typeHint, typeErrors, typeNode} from './state'

typeNode.className = 'type-hover'

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
  //$todo
  .on(typeAtPos.done, (_, {result}) => result.code.c)
  .reset(typeAtPos.fail)
guard({
  source: showTypeNode,
  filter: typeHoverToggle,
}).watch(() => {
  typeNode.style.opacity = '1'
  typeNode.style.visibility = 'inherit'
})
guard({
  source: hideTypeNode,
  filter: typeHoverToggle,
}).watch(() => {
  typeNode.style.opacity = '0'
  typeNode.style.visibility = 'hidden'
})
guard({
  source: typeAtPos.fail,
  filter: typeHoverToggle,
  target: hideTypeNode,
})
guard({
  source: typeHint.map(data => {
    if (data === null) return 'Loading...'
    return data
  }),
  filter: typeHoverToggle,
}).watch(hint => {
  typeNode.innerText = hint
})
