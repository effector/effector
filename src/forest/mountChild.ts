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
} from './index.h'

import {
  ElementBlock,
  ListBlock,
  TextBlock,
  UsingBlock,
  FF,
  LF,
  RouteBlock,
  Block,
  FragmentBlock,
  RF,
  RecItemBlock,
  RecBlock,
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
    svgRoot?: SVGSVGElement | null
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
  svgRoot?: SVGSVGElement | null
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
        parent: parentBlockFragment,
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
        visible: true,
        index: draft.inParentIndex,
      }
      routeBlock.child.parent = routeBlock
      routeBlock.child.child.parent = routeBlock.child
      parentBlockFragment.child[draft.inParentIndex] = routeBlock
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
        parent: parentBlockFragment,
        child: {
          type: 'fragment',
          parent: null as any,
          child: [],
        },
        value: draft.stencil.cloneNode() as DOMElement,
        visible: false,
        index: draft.inParentIndex,
      }
      elementBlock.child.parent = elementBlock
      parentBlockFragment.child[draft.inParentIndex] = elementBlock
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
                    //@ts-ignore
                    forkPage: leaf.forkPage,
                  })
                }
              } else {
                elementBlock.value.remove()
                elementBlock.visible = false
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
        parent: parentBlockFragment,
        child: [],
        lastChild: null,
        visible: true,
        index: draft.inParentIndex,
      }
      parentBlockFragment.child[draft.inParentIndex] = listBlock
      leafData = {
        type: 'list',
        draft,
        block: listBlock,
      }
      break
    }
    case 'using':
    case 'listItem':
      break
    case 'rec': {
      const recBlock: RecBlock = {
        type: 'rec',
        parent: parentBlockFragment,
        child: {
          type: 'fragment',
          parent: null as any,
          child: [],
        },
        visible: true,
        index: draft.inParentIndex,
      }
      recBlock.child.parent = recBlock
      parentBlockFragment.child[draft.inParentIndex] = recBlock
      leafData = {
        type: 'rec',
        block: recBlock,
      }
      break
    }
    case 'recItem': {
      const recItemBlock: RecItemBlock = {
        type: 'recItem',
        parent: parentBlockFragment,
        child: {
          type: 'fragment',
          parent: null as any,
          child: [],
        },
        visible: true,
        index: draft.inParentIndex,
      }
      recItemBlock.child.parent = recItemBlock
      parentBlockFragment.child[draft.inParentIndex] = recItemBlock
      leafData = {
        type: 'rec item',
        block: recItemBlock,
      }
      break
    }
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
    forkPage: leaf.forkPage,
  })
}

export function appendChild(block: TextBlock | ElementBlock) {
  const visibleSibling = findPreviousVisibleSibling(block)
  if (visibleSibling) {
    visibleSibling.after(block.value)
  } else {
    findParentDOMElement(block)!.prepend(block.value)
  }
  block.visible = true
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
