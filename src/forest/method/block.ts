import type {NSType, BlockDraft, BlockItemDraft} from '../index.h'

import {createTemplate, currentTemplate} from '../engine/createTemplate'
import {assertClosure} from '../assert'
import {mountFn} from '../mountFn'
import {setInParentIndex} from '../engine/mountChild'

export function block({
  fn,
  env,
  namespace = 'html',
}: {
  fn: () => void
  env: any
  namespace?: NSType
}): () => void {
  const blockDraft: BlockDraft = {
    type: 'block',
    childTemplates: [],
    childCount: 0,
    inParentIndex: 0,
  }
  const blockTemplate = createTemplate({
    name: 'block',
    isSvgRoot: false,
    namespace,
    env,
    draft: blockDraft,
    isBlock: true,
    fn({}, {mount}) {
      fn()
      mount.watch(mountFn.block)
    },
  })
  return () => {
    assertClosure(currentTemplate, '(block instance)')
    const blockItemDraft: BlockItemDraft = {
      type: 'blockItem',
      childTemplates: [],
      childCount: 0,
      inParentIndex: -1,
      itemOf: blockTemplate,
    }
    const {env, namespace} = currentTemplate
    const blockItemTemplate = createTemplate({
      name: 'blockItem',
      isSvgRoot: false,
      namespace,
      env,
      draft: blockItemDraft,
      fn(_, {mount}) {
        mount.watch(mountFn.blockItem)
      },
    })
    setInParentIndex(blockItemTemplate)
  }
}
