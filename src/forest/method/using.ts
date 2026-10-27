import type {Scope} from '../../effector/unit.h'

import type {
  DOMElement,
  NSType,
  UsingDraft,
  Leaf,
  Root,
  Template,
} from '../index.h'

import type {UsingBlock} from '../relation.h'

import {createOpGroup, createOpQueue} from '../plan'

import {createTemplate} from '../engine/createTemplate'
import {spawn, currentLeaf} from '../engine/spawn'
import {assert} from '../assert'
import {mountFn} from '../mountFn'

function getDefaultEnv(): {
  document: Document
} {
  if (typeof document !== 'undefined') return {document}
  throw Error('your environment has no document')
}
export function using(node: DOMElement, cb: () => any): void
export function using(
  node: DOMElement,
  opts: {
    fn: () => void
    hydrate?: boolean
    env?: {
      document: Document
    }
    onComplete?: () => void
    onRoot?: (config: {template: Template; leaf: Leaf}) => void
    scope?: Scope
  },
): void
export function using(node: DOMElement, opts: any): void {
  let cb: () => any
  let onComplete: (() => void) | undefined
  let env: {
    document: Document
  }
  let hydrate: boolean
  let onRoot: ((config: {template: Template; leaf: Leaf}) => void) | undefined
  let scope: Scope
  if (typeof opts === 'function') {
    cb = opts
    env = getDefaultEnv()
    hydrate = false
  } else if (opts) {
    cb = opts.fn
    env = opts.env ? opts.env : getDefaultEnv()
    hydrate = opts.hydrate
    onComplete = opts.onComplete
    onRoot = opts.onRoot
    scope = opts.scope
  } else throw Error('using() second argument is missing')
  assert(node, 'using() first argument is missing')
  const root: Root = {
    scope: scope!,
    env,
    activeSpawns: new Set(),
    childSpawns: {},
    leafOps: {},
  }
  const namespaceURI = node.namespaceURI
  const tag = node.tagName.toLowerCase()
  const ns: NSType =
    namespaceURI === 'http://www.w3.org/2000/svg'
      ? 'svg'
      : tag === 'foreignobject'
      ? 'foreignObject'
      : 'html'
  const draft: UsingDraft = {
    type: 'using',
    childTemplates: [],
    childCount: 0,
    inParentIndex: -1,
  }
  const usingTemplate = createTemplate({
    name: 'using',
    draft,
    isSvgRoot: tag === 'svg',
    namespace: ns,
    fn(_, {mount}) {
      cb()
      mount.watch(mountFn.using)
    },
    env,
  })

  const usingBlock: UsingBlock = {
    type: 'using',
    child: [],
    value: node,
  }
  const queue = createOpQueue({onComplete})
  const rootLeaf = spawn(usingTemplate, {
    parentLeaf: currentLeaf || null,
    mountNode: node,
    svgRoot: usingTemplate.isSvgRoot
      ? (node as SVGSVGElement)
      : currentLeaf
      ? currentLeaf.svgRoot
      : null,
    leafData: {
      type: 'using',
      draft,
      element: node,
      block: usingBlock,
    },
    opGroup: createOpGroup(queue),
    domSubtree: createOpGroup(queue),
    hydration: hydrate,
    root,
  })

  if (onRoot) {
    onRoot({
      template: usingTemplate,
      leaf: rootLeaf,
    })
  }
  if (queue.onDrain && !queue.rafID) {
    const rs = queue.onDrain
    queue.onDrain = null
    rs()
  }
}
