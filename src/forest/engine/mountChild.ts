import {launch, createEvent} from 'effector'

import type {
  DOMElement,
  Leaf,
  BindingsDraft,
  LeafData,
  Env,
  LeafDataElement,
  Template,
} from '../index.h'

import type {
  ElementBlock,
  ListBlock,
  TextBlock,
  RouteBlock,
  FragmentParent,
  RecItemBlock,
  RecBlock,
  BlockBlock,
  BlockItemBlock,
} from '../relation.h'

import {createOpGroup, createOp} from '../plan'

import {currentTemplate} from './createTemplate'
import {spawn} from './spawn'
import {findParentDOMElement, findPreviousVisibleSibling} from './search'
import {applyStaticOps} from '../bindings'
import {assert} from '../assert'

export function setInParentIndex(template: Template) {
  if (!currentTemplate) return
  const {draft} = template
  if (draft.type === 'listItem') return
  if (draft.type === 'rec') return
  switch (currentTemplate.draft.type) {
    case 'element':
    case 'using':
    case 'route':
    case 'list':
    case 'rec':
    case 'recItem':
    case 'block':
    case 'blockItem':
      draft.inParentIndex = currentTemplate.draft.childCount
      currentTemplate.draft.childCount += 1
      currentTemplate.draft.childTemplates.push(template)
      break
    default:
      console.warn(
        `unexpected currentTemplate type ${currentTemplate.draft.type}`,
      )
  }
}

export function mountChildTemplates(
  draft: BindingsDraft,
  {
    parentBlockFragment,
    leaf,
    node,
    svgRoot,
    values,
  }: {
    parentBlockFragment: FragmentParent
    leaf: Leaf
    node?: DOMElement
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
const fragmentParentTypes: Array<FragmentParent['type']> = [
  'LF',
  'using',
  'element',
  'recItem',
  'rec',
  'block',
  'blockItem',
  'route',
]

export function mountChild({
  parentBlockFragment,
  leaf,
  node = leaf.mountNode,
  actor,
  svgRoot,
  values,
}: {
  parentBlockFragment: FragmentParent
  leaf: Leaf
  node?: DOMElement
  actor: Template
  svgRoot?: SVGSVGElement | null
  values?: {[name: string]: any}
}) {
  assert(
    fragmentParentTypes.includes(parentBlockFragment.type),
    `incorrect parent ${parentBlockFragment.type}`,
  )
  let leafData: LeafData
  const {draft} = actor
  const {queue} = leaf.root.leafOps[leaf.fullID].group
  const opGroup = createOpGroup(queue)
  const parentDomSubtree = leaf.root.leafOps[leaf.fullID].domSubtree
  let domSubtree = parentDomSubtree
  switch (draft.type) {
    case 'using':
    case 'listItem':
      break
    case 'route': {
      const block: RouteBlock = {
        type: 'route',
        parent: parentBlockFragment,
        child: [],
        visible: false,
        index: draft.inParentIndex,
      }
      parentBlockFragment.child[draft.inParentIndex] = block
      leafData = {
        type: 'route',
        block,
        ops: {},
        initialized: false,
        pendingInit: null,
      }
      break
    }
    case 'element': {
      let element: DOMElement
      if (actor.isBlock) {
        let env: Env | void
        let type: 'html' | 'svg' | void
        let currentLeaf = leaf
        while (currentLeaf && (!type || !env)) {
          if (currentLeaf.template.env) env = currentLeaf.template.env
          const {draft} = currentLeaf
          if (draft.type === 'element') {
            if (draft.tag === 'svg') {
              type = 'svg'
            } else if (draft.tag === 'foreignObject') {
              type = 'html'
            }
          }
          currentLeaf = currentLeaf.parent!
        }
        if (!type) type = 'html'
        if (env) {
          element =
            type === 'svg'
              ? env.document.createElementNS(
                  'http://www.w3.org/2000/svg',
                  draft.tag,
                )
              : env.document.createElement(draft.tag)
          applyStaticOps(element, draft.staticSeq)
        }
      } else {
        element = draft.stencil.cloneNode() as DOMElement
      }
      const block: ElementBlock = {
        type: 'element',
        parent: parentBlockFragment,
        child: [],
        value: element!,
        visible: false,
        index: draft.inParentIndex,
      }
      parentBlockFragment.child[draft.inParentIndex] = block
      leafData = {
        type: 'element',
        block,
        ops: {
          visible: createOp({
            value: false,
            priority: 'tree',
            runOp(value) {
              if (leaf.hydration) {
              }
              if (value) {
                appendChild(block)
                const leafData_ = leafData as LeafDataElement
                if (leafData_.needToCallNode) {
                  leafData_.needToCallNode = false
                  launch({
                    target: onMount,
                    params: {
                      element: block.value,
                      fns: draft.node,
                    },
                    page: childSpawn,
                    //@ts-expect-error
                    scope: leaf.root.scope,
                  })
                }
                block.visible = true
              } else {
                block.value.remove()
                block.visible = false
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
      const block: ListBlock = {
        type: 'list',
        parent: parentBlockFragment,
        child: [],
        lastChild: null,
        visible: true,
        index: draft.inParentIndex,
      }
      parentBlockFragment.child[draft.inParentIndex] = block
      leafData = {
        type: 'list',
        draft,
        block,
        records: [],
        pendingUpdate: null,
      }
      break
    }
    case 'rec': {
      const block: RecBlock = {
        type: 'rec',
        parent: parentBlockFragment,
        child: [],
        visible: true,
        index: draft.inParentIndex,
      }
      parentBlockFragment.child[draft.inParentIndex] = block
      leafData = {
        type: 'rec',
        block,
      }
      break
    }
    case 'recItem': {
      const block: RecItemBlock = {
        type: 'recItem',
        parent: parentBlockFragment,
        child: [],
        visible: true,
        index: draft.inParentIndex,
      }
      parentBlockFragment.child[draft.inParentIndex] = block
      leafData = {
        type: 'recItem',
        block,
      }
      break
    }
    case 'block': {
      const block: BlockBlock = {
        type: 'block',
        parent: parentBlockFragment,
        child: [],
        visible: true,
        index: draft.inParentIndex,
      }
      parentBlockFragment.child[draft.inParentIndex] = block
      leafData = {
        type: 'block',
        block,
      }
      break
    }
    case 'blockItem': {
      const block: BlockItemBlock = {
        type: 'blockItem',
        parent: parentBlockFragment,
        child: [],
        visible: true,
        index: draft.inParentIndex,
      }
      parentBlockFragment.child[draft.inParentIndex] = block
      leafData = {
        type: 'blockItem',
        block: block,
      }
      break
    }
    default: {
      //@ts-expect-error
      console.warn(`unexpected draft type ${draft.type}`)
    }
  }
  const childSpawn = spawn(actor, {
    values,
    parentLeaf: leaf,
    mountNode: node,
    svgRoot: svgRoot ? svgRoot : leaf.svgRoot,
    //@ts-expect-error
    leafData,
    opGroup,
    domSubtree,
    hydration: leaf.hydration,
    root: leaf.root,
  })
}

export function appendChild(block: TextBlock | ElementBlock) {
  const visibleSibling = findPreviousVisibleSibling(block)
  if (visibleSibling) {
    visibleSibling.after(block.value)
  } else {
    const parent = findParentDOMElement(block)
    parent!.prepend(block.value)
  }
  block.visible = true
}

//@ts-expect-error
export const onMount = createEvent<{
  fns: Array<(node: DOMElement) => (() => void) | void>
  element: DOMElement
}>({named: 'onMount'})

onMount.watch(({fns, element}) => {
  fns.forEach(fn => {
    fn(element)
  })
})
