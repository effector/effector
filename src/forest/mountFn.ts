import type {
  Leaf,
  LeafDataRoute,
  RouteDraft,
  RecDraft,
  LeafDataRec,
  BlockDraft,
  BlockItemDraft,
  LeafDataBlock,
  LeafDataBlockItem,
  LeafDataUsing,
  LeafDataListItem,
} from './index.h'

import {mountChild, mountChildTemplates} from './engine/mountChild'

export const mountFn = {
  using(leaf: Leaf) {
    const data = leaf.data as LeafDataUsing
    const block = data.block
    mountChildTemplates(data.draft, {
      parentBlockFragment: block,
      leaf,
    })
  },
  routeItem(leaf: Leaf) {
    const draft = leaf.draft as RouteDraft
    const data = leaf.data as LeafDataRoute
    data.block.visible = true
    mountChildTemplates(draft, {
      parentBlockFragment: data.block,
      leaf,
    })
  },
  block(leaf: Leaf) {
    const draft = leaf.draft as BlockDraft
    const data = leaf.data as LeafDataBlock
    mountChildTemplates(draft, {
      parentBlockFragment: data.block,
      leaf,
    })
  },
  blockItem(leaf: Leaf) {
    const draft = leaf.draft as BlockItemDraft
    const data = leaf.data as LeafDataBlockItem
    mountChild({
      parentBlockFragment: data.block,
      leaf,
      actor: draft.itemOf,
    })
  },
  rec(leaf: Leaf) {
    const draft = leaf.draft as RecDraft
    const data = leaf.data as LeafDataRec
    mountChildTemplates(draft, {
      parentBlockFragment: data.block,
      leaf,
    })
  },
  listItem(leaf: Leaf) {
    const data = leaf.data as LeafDataListItem
    const block = data.block
    block.visible = true
    block.childInitialized = true
    mountChildTemplates(data.listDraft, {
      parentBlockFragment: block,
      leaf,
    })
  },
}
