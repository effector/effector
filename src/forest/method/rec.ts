import {Store, launch, createEvent} from 'effector'

import type {RecItemDraft, LeafDataRecItem, RecDraft} from '../index.h'

import {createTemplate, currentTemplate} from '../template'
import {mountChild, setInParentIndex} from '../mountChild'
import {iterateChildLeafs} from '../iterateChildLeafs'
import {assertClosure} from '../assert'
import {mountFn} from '../mountFn'
import {mutualSample} from '../mutualSample'

export function rec<T>(config: {
  fn(config: {store: Store<T>}): void
}): (opts: {store: Store<T>}) => void
export function rec<T>(
  fn: (config: {store: Store<T>; state?: Store<T>}) => void,
): (opts: {store: Store<T>; state?: Store<T>}) => void
export function rec<T>(
  fnOrConfig:
    | {
        fn(config: {store: Store<T>}): void
      }
    | ((config: {store: Store<T>; state?: Store<T>}) => void),
): (opts: {store: Store<T>; state?: Store<T>}) => void {
  const fn = typeof fnOrConfig === 'function' ? fnOrConfig : fnOrConfig.fn
  const recDraft: RecDraft = {
    type: 'rec',
    childTemplates: [],
    childCount: 0,
    inParentIndex: 0,
  }
  const recTemplate = createTemplate<{
    itemUpdater: any
  }>({
    name: 'rec',
    state: {store: null},
    isSvgRoot: false,
    //@ts-expect-error
    namespace: null,
    //@ts-expect-error
    env: null,
    draft: recDraft,
    defer: true,
    isBlock: true,
    fn({store}, {mount}) {
      fn({store, state: store})
      //@ts-expect-error
      const itemUpdater = createEvent<any>({named: 'itemUpdater'})
      store.on(itemUpdater, (_, e) => e)
      mount.watch(mountFn.rec)
      return {itemUpdater}
    },
  })
  return ({store, state = store}) => {
    assertClosure(currentTemplate, '(rec instance)')
    const {env, namespace} = currentTemplate
    if (recTemplate.deferredInit) recTemplate.deferredInit()

    const recItemDraft: RecItemDraft = {
      type: 'recItem',
      childTemplates: [],
      childCount: 0,
      inParentIndex: -1,
    }
    const recItemTemplate = createTemplate({
      name: 'rec item',
      isSvgRoot: false,
      namespace,
      env,
      draft: recItemDraft,
      fn(_, {mount}) {
        const {onMount, onState} = mutualSample({
          state,
          mount,
          onMount: (state, leaf) => ({state, leaf}),
          onState: (leaf, state) => ({state, leaf}),
        })
        onState.watch(({state, leaf}) => {
          iterateChildLeafs(leaf, child => {
            launch({
              target: child.template.api.itemUpdater,
              params: state,
              defer: true,
              page: leaf,
              //@ts-expect-error
              forkPage: leaf.root.forkPage,
            })
          })
        })
        onMount.watch(({leaf, state}) => {
          const data = leaf.data as LeafDataRecItem
          mountChild({
            parentBlockFragment: data.block,
            leaf,
            actor: recTemplate,
            values: {store: state},
          })
        })
      },
    })
    setInParentIndex(recItemTemplate)
  }
}
