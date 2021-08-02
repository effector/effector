import {Store, is, launch, createStore, createEvent, sample} from 'effector'

import type {ListItemType, ListType, LeafDataList} from '../index.h'
import type {LF} from '../relation.h'

import {beginMark, endMark} from '../platform/mark'
import {
  createOpGroup,
  createAsyncValue,
  stopAsyncValue,
  updateAsyncValue,
} from '../plan'
import {createTemplate, spawn, currentTemplate} from '../template'
import {mountChildTemplates, setInParentIndex} from '../mountChild'
import {unmountLeafTree} from '../unmount'
import {assertClosure} from '../assert'
import {mountFn} from '../mountFn'
import {mutualSample} from '../mutualSample'
import {changeChildLeafsVisible} from '../iterateChildLeafs'
import {remap} from './remap'

export function list<T, K extends keyof T>(config: {
  source: Store<T[]>
  fn: (opts: {store: Store<T>; id: Store<T[K]>}) => void
  key: T[K] extends string | number | symbol ? K : never
}): void
export function list<T>(config: {
  source: Store<T[]>
  fn: (opts: {store: Store<T>; id: Store<number>}) => void
}): void
export function list<T>(
  source: Store<T[]>,
  fn: (opts: {store: Store<T>; id: Store<number>}) => void,
): void
export function list<T>(opts: any, maybeFn?: any) {
  assertClosure(currentTemplate, 'list')
  if (typeof maybeFn === 'function') {
    if (is.unit(opts)) {
      opts = {source: opts, fn: maybeFn}
    } else {
      opts.fn = maybeFn
    }
  }
  const {fn: cb, key, source, fields = []} = opts
  const getID: (item: T, i: number) => string | number | symbol =
    key !== undefined
      ? typeof key === 'function'
        ? key
        : (item: any, i: number) => item[key]
      : (item, i) => i
  const draft: ListType = {
    type: 'list',
    key: is.store(opts) ? {type: 'index'} : {type: 'key', key: opts.key},
    childTemplates: [],
    childCount: 0,
    inParentIndex: -1,
  }
  const {env, namespace} = currentTemplate

  const listTemplate = createTemplate({
    name: 'list',
    draft,
    isSvgRoot: false,
    namespace,
    fn(_, {mount}) {
      const listItemTemplate = createTemplate<{
        itemUpdater: any
      }>({
        name: 'list item',
        state: {id: -1, store: null},
        draft,
        isSvgRoot: false,
        namespace,
        fn({id, store}, {mount}) {
          cb({store, key: id, fields: remap(store, fields)})
          //@ts-expect-error
          const itemUpdater = createEvent<any>({named: 'itemUpdater'})
          store.on(itemUpdater, (_, e) => e)
          if (draft.itemVisible) {
            const {onMount: mountAndVisible, onState: onVisibleChanges} =
              mutualSample({
                mount,
                state: draft.itemVisible,
                onMount: (visible, leaf) => ({visible, leaf}),
                onState: (leaf, visible) => ({visible, leaf}),
              })
            mountAndVisible.watch(({visible, leaf}) => {
              const parentBlock = leaf.data.block as LF
              parentBlock.visible = visible
              parentBlock.childInitialized = visible
              if (visible) {
                mountChildTemplates(draft, {
                  parentBlockFragment: parentBlock,
                  leaf,
                })
              }
            })
            onVisibleChanges.watch(({visible, leaf}) => {
              const parentBlock = leaf.data.block as LF
              parentBlock.visible = visible
              if (!parentBlock.childInitialized) {
                if (visible) {
                  parentBlock.childInitialized = true
                  mountChildTemplates(draft, {
                    parentBlockFragment: parentBlock,
                    leaf,
                  })
                }
                return
              }
              changeChildLeafsVisible(visible, leaf)
            })
          } else {
            mount.watch(mountFn.listItem)
          }
          return {
            itemUpdater,
          }
        },
        env,
      })
      const updates = createStore<ListItemType[]>([])
      const mappedUpdates = source.map((x: any) => x)
      const mountData = sample({
        source: source as Store<T[]>,
        clock: mount,
        fn: (data, leaf) => {
          return {
            updates: data,
            leaf,
            hydration: leaf.hydration,
          }
        },
        greedy: true,
      })

      const parentNodeUpdateSpawn = sample({
        source: mountData,
        clock: mappedUpdates,
        fn: ({leaf}, updates: T[]) => ({
          updates,
          leaf,
          hydration: false,
        }),
        greedy: true,
      })
      sample({
        source: updates,
        clock: [mountData, parentNodeUpdateSpawn],
        greedy: true,
        fn(records: ListItemType[], {updates: input, leaf, hydration}) {
          const listData = leaf.data as LeafDataList
          const parentBlock = listData.block
          beginMark('list update [' + source.shortName + ']')
          const skipNode: boolean[] = Array(input.length).fill(false)
          const keys = input.map(getID)
          const resultRecords: ListItemType[] = []
          for (let i = 0; i < records.length; i++) {
            const record = records[i]
            const index = keys.indexOf(record.key)
            if (index !== -1) {
              resultRecords.push(record)
              skipNode[index] = true
              updateAsyncValue(input[index], record.asyncValue)
            } else {
              record.active = false
              if (record.instance) {
                unmountLeafTree(record.instance)
              }
              stopAsyncValue(record.asyncValue)
            }
          }
          for (let i = 0; i < input.length; i++) {
            if (skipNode[i]) continue
            const value = input[i]
            const id = keys[i]
            const group = createOpGroup(
              leaf.root.leafOps[leaf.fullID].group.queue,
            )
            const listItemBlock: LF = {
              type: 'LF',
              parent: parentBlock,
              child: [],
              childInitialized: false,
              visible: false,
              left: null,
              right: null,
            }
            const item: ListItemType = {
              type: 'listItem',
              key: id as string,
              index: id as number,
              active: true,
              leafData: {
                type: 'list item',
                block: listItemBlock,
                listDraft: draft,
              },
              asyncValue: createAsyncValue({
                value,
                group,
                onChange(value) {
                  if (item.instance) {
                    launch({
                      target: item.instance.template.api.itemUpdater,
                      params: value,
                      defer: true,
                      page: item.instance,
                      //@ts-expect-error
                      forkPage: item.instance.root.forkPage,
                    })
                  }
                },
                onInit(value) {
                  if (!item.active) return
                  if (hydration) return
                  item.instance = spawn(listItemTemplate, {
                    values: {
                      id,
                      store: value,
                    },
                    parentLeaf: leaf,
                    mountNode: leaf.mountNode,
                    svgRoot: leaf.svgRoot,
                    leafData: item.leafData,
                    opGroup: group,
                    domSubtree: leaf.root.leafOps[leaf.fullID].domSubtree,
                    hydration,
                    root: leaf.root,
                  })
                },
              }),
            }
            const inParentIndex = resultRecords.length
            resultRecords.push(item)
            const leftSibling =
              inParentIndex > 0
                ? resultRecords[inParentIndex - 1].leafData
                : null

            parentBlock.child.push(listItemBlock)
            if (leftSibling) {
              const leftBlock = leftSibling.block
              listItemBlock.left = leftBlock
              const rightBlock = leftBlock.right
              if (rightBlock) {
                rightBlock.left = listItemBlock
                listItemBlock.right = rightBlock
              } else {
                parentBlock.lastChild = listItemBlock
              }
              leftBlock.right = listItemBlock
            } else {
              parentBlock.lastChild = listItemBlock
            }
            if (hydration) {
              item.instance = spawn(listItemTemplate, {
                values: {
                  id,
                  store: value,
                },
                parentLeaf: leaf,
                mountNode: leaf.mountNode,
                svgRoot: leaf.svgRoot,
                leafData: item.leafData,
                opGroup: group,
                domSubtree: leaf.root.leafOps[leaf.fullID].domSubtree,
                hydration,
                root: leaf.root,
              })
            }
          }
          endMark('list update [' + source.shortName + ']')
          if (resultRecords.length === 0) {
            parentBlock.lastChild = null
          }
          listData.records = resultRecords
          return resultRecords
        },
        target: updates,
      })
    },
    env,
  })
  setInParentIndex(listTemplate)
}
