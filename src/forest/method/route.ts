import {Store, is, launch, createEvent, sample, merge, combine} from 'effector'

import type {LeafDataRoute, RouteDraft} from '../index.h'

import {createTemplate, currentActor} from '../template'
import {mountChild, setInParentIndex} from '../mountChild'
import {assertClosure} from '../assert'
import {mountFn} from '../mountFn'
import {mutualSample} from '../mutualSample'
import {changeChildLeafsVisible} from '../iterateChildLeafs'

export function route<T>(config: {
  source: Store<T>
  visible: (value: T) => boolean
  fn: (config: {store: Store<T>}) => void
}): void
export function route<T, S extends T>(config: {
  source: Store<T>
  visible: (value: T) => value is S
  fn: (config: {store: Store<S>}) => void
}): void
export function route<T>(config: {
  source: Store<T>
  visible: Store<boolean>
  fn: (config: {store: Store<T>}) => void
}): void
export function route<T>({
  source,
  visible,
  fn,
}: {
  source: Store<T>
  visible: Store<boolean> | ((value: T) => boolean)
  fn: (config: {store: Store<T>}) => void
}) {
  assertClosure(currentActor, 'route')
  const draft: RouteDraft = {
    type: 'route',
    childTemplates: [],
    childCount: 0,
    inParentIndex: -1,
  }
  const {env, namespace} = currentActor
  const routeTemplate = createTemplate({
    name: 'route',
    isSvgRoot: false,
    namespace,
    env,
    draft,
    fn(_, {mount}) {
      let state: Store<{
        value: T
        visible: boolean
      }>
      if (is.store(visible)) {
        state = combine({value: source, visible})
      } else {
        const visibleFn = visible as (value: T) => boolean
        state = source.map(value => ({
          value,
          visible: visibleFn(value),
        }))
      }
      const childDraft: RouteDraft = {
        type: 'route',
        childTemplates: [],
        childCount: 0,
        inParentIndex: -1,
      }
      const routeItemTemplate = createTemplate({
        name: 'route item',
        isSvgRoot: false,
        namespace,
        env,
        draft: childDraft,
        state: {store: null},
        fn({store}, {mount}) {
          //@ts-expect-error
          const itemUpdater = createEvent<any>({named: 'itemUpdater'})
          store.on(itemUpdater, (_, upd) => upd)
          fn({store})
          const onValueUpdate = sample({
            source: mount,
            clock: state,
            fn: (leaf, {visible, value}) => ({
              leaf,
              visible,
              value,
            }),
            greedy: true,
          })
          mount.watch(mountFn.routeItem)
          onValueUpdate.watch(({leaf, visible, value}) => {
            const data = leaf.data as LeafDataRoute
            data.block.visible = visible
            if (visible) {
              launch({
                target: itemUpdater,
                params: value,
                defer: true,
                page: leaf,
                //@ts-expect-error
                forkPage: leaf.root.forkPage,
              })
            }
            changeChildLeafsVisible(visible, leaf)
          })
        },
      })
      setInParentIndex(routeItemTemplate)
      const {onMount, onState: onVisibleChange} = mutualSample({
        mount,
        state,
        onMount: ({visible, value}, leaf) => ({
          leaf,
          visible,
          value,
        }),
        onState: (leaf, {visible, value}) => ({
          leaf,
          visible,
          value,
        }),
      })
      merge([onMount, onVisibleChange]).watch(({leaf, visible, value}) => {
        const data = leaf.data as LeafDataRoute
        data.block.visible = visible
        if (visible && !data.initialized) {
          mountChild({
            parentBlockFragment: data.block,
            leaf,
            actor: routeItemTemplate,
            values: {store: value},
          })
          data.initialized = true
        }
      })
    },
  })
  setInParentIndex(routeTemplate)
}
