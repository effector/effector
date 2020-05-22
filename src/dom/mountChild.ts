import {Store, Event, launch, createEvent} from 'effector'

import {
  DOMElement,
  ElementDraft,
  MergedBindings,
  NSType,
  PropertyMap,
  StoreOrData,
  DOMProperty,
  StylePropertyMap,
  ListItemType,
  UsingDraft,
  Actor,
  ListType,
  Leaf,
  BindingsDraft,
  LeafMountParams,
  LeafData,
  LeafDataElement,
  LeafDataRoute,
  RouteType,
  Template,
  Spawn,
  TreeType,
  TreeItemType,
} from './index.h'

import {
  ElementBlock,
  ListBlock,
  TextBlock,
  TreeBlock,
  UsingBlock,
  FF,
  FE,
  FL,
  FT,
  LF,
  RouteBlock,
  Block,
  FragmentBlock,
  RF,
  FR,
} from './relation.h'

import {createOpGroup, createOp} from './plan'

import {spawn} from './template'
import {findParentDOMElement, findPreviousVisibleSibling} from './search'

export function mountChildTemplates(
  draft: BindingsDraft,
  {
    parentBlockFragment,
    leaf,
    node,
    svgRoot,
    values,
  }: {
    parentBlockFragment: FragmentBlock
    leaf: Leaf
    node: DOMElement
    svgRoot?: SVGSVGElement
    values?: {[name: string]: any}
  },
) {
  draft.childTemplates.forEach(actor => {
    mountChild({
      parentBlockFragment,
      leaf,
      node,
      svgRoot,
      values,
      actor,
    })
  })
}

export function mountChild({
  parentBlockFragment,
  leaf,
  node,
  actor,
  svgRoot,
  values,
}: {
  parentBlockFragment: FragmentBlock
  leaf: Leaf
  node: DOMElement
  actor: Actor<any>
  svgRoot?: SVGSVGElement
  values?: {[name: string]: any}
}) {
  let leafData: LeafData
  const {draft} = actor
  const {queue} = leaf.ops.group
  const opGroup = createOpGroup(queue)
  const parentDomSubtree = leaf.ops.domSubtree
  let domSubtree = parentDomSubtree
  switch (draft.type) {
    case 'route': {
      const routeBlock: RouteBlock = {
        type: 'route',
        parent: {
          type: 'FR',
          parent: parentBlockFragment,
          child: null as any,
          visible: true,
          index: draft.inParentIndex,
        },
        child: {
          type: 'RF',
          parent: null as any,
          child: {
            type: 'fragment',
            parent: null as any,
            child: [],
          },
          visible: false,
        },
      }
      routeBlock.parent.child = routeBlock
      routeBlock.child.parent = routeBlock
      routeBlock.child.child.parent = routeBlock.child
      parentBlockFragment.child[draft.inParentIndex] = routeBlock.parent
      leafData = {
        type: 'route',
        block: routeBlock,
        ops: {
          // visible:
        },
        initialized: false,
      }
      break
    }
    case 'element': {
      const elementBlock: ElementBlock = {
        type: 'element',
        parent: {
          type: 'FE',
          parent: parentBlockFragment,
          child: null as any,
          visible: false,
          index: draft.inParentIndex,
        },
        child: {
          type: 'EF',
          parent: null as any,
          child: {
            type: 'fragment',
            parent: null as any,
            child: [],
          },
        },
        value: draft.stencil.cloneNode() as DOMElement,
      }
      elementBlock.parent.child = elementBlock
      elementBlock.child.parent = elementBlock
      elementBlock.child.child.parent = elementBlock.child
      parentBlockFragment.child[draft.inParentIndex] = elementBlock.parent
      leafData = {
        type: 'element',
        block: elementBlock,
        ops: {
          visible: createOp({
            value: false,
            priority: 'tree',
            runOp(value) {
              if (leaf.hydration) {
                // console.count('hydration')
              }
              if (value) {
                appendChild(elementBlock)
                if ((leafData as any).needToCallNode) {
                  ;(leafData as any).needToCallNode = false
                  launch({
                    target: onMount,
                    params: {
                      element: elementBlock.value,
                      fns: draft.node,
                    },
                    page: childSpawn.spawn,
                  })
                }
              } else {
                elementBlock.value.remove()
                elementBlock.parent.visible = false
              }
            },
            group: parentDomSubtree,
          }),
        },
        needToCallNode: draft.node.length > 0,
      }
      domSubtree = createOpGroup(queue)
      break
    }
    case 'list': {
      const listBlock: ListBlock = {
        type: 'list',
        parent: {
          type: 'FL',
          parent: parentBlockFragment,
          child: null as any,
          visible: true,
          index: draft.inParentIndex,
        },
        child: [],
        lastChild: null,
      }
      listBlock.parent.child = listBlock
      parentBlockFragment.child[draft.inParentIndex] = listBlock.parent
      leafData = {
        type: 'list',
        draft,
        block: listBlock,
      }
      break
    }
    case 'tree': {
      const treeBlock: TreeBlock = {
        type: 'tree',
        parent: {
          type: 'FTree',
          parent: parentBlockFragment,
          child: null as any,
          visible: true,
          index: draft.inParentIndex,
        },
        child: {
          type: 'fragment',
          parent: null as any,
          child: [],
        },
      }
      treeBlock.parent.child = treeBlock
      treeBlock.child.parent = treeBlock
      parentBlockFragment.child[draft.inParentIndex] = treeBlock.parent
      leafData = {
        type: 'tree',
        block: treeBlock,
      }
      break
    }
    case 'using':
    case 'listItem':
      break
    default: {
      //@ts-ignore
      console.warn(`unexpected draft type ${draft.type}`)
    }
  }
  const childSpawn = spawn(actor, {
    values,
    parentLeaf: leaf,
    mountNode: node,
    svgRoot: svgRoot ? svgRoot : leaf.svgRoot,
    //@ts-ignore
    leafData,
    opGroup,
    domSubtree,
    hydration: leaf.hydration,
  })
}

export function appendChild(block: TextBlock | ElementBlock) {
  const visibleSibling = findPreviousVisibleSibling(block)
  if (visibleSibling) {
    visibleSibling.after(block.value)
  } else {
    findParentDOMElement(block)!.prepend(block.value)
  }
  block.parent.visible = true
}

export const onMount = createEvent<{
  fns: Array<(node: DOMElement) => (() => void) | void>
  element: DOMElement
}>()

onMount.watch(({fns, element}) => {
  fns.forEach(fn => {
    fn(element)
  })
})
