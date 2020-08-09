import {
  Store,
  Event,
  is,
  launch,
  createStore,
  createEvent,
  sample,
  merge,
  restore,
  Fork,
  StateRef,
  Node,
} from 'effector'

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
  RecItemDraft,
  LeafDataRecItem,
  RecDraft,
  LeafDataRec,
  BlockDraft,
  BlockItemDraft,
  LeafDataBlock,
  LeafDataBlockItem,
  NodeDraft,
} from './index.h'
import {beginMark, endMark} from './platform/mark'

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
} from './relation.h'

import {
  pushOpToQueue,
  forceSetOpValue,
  createOpGroup,
  createOp,
  createAsyncValue,
  stopAsyncValue,
  updateAsyncValue,
  createOpQueue,
} from './plan'

import {
  applyStyle,
  applyStyleVar,
  applyDataAttr,
  applyAttr,
  applyText,
  applyStaticOps,
} from './bindings'
import {
  createTemplate,
  spawn,
  currentActor,
  currentTemplate,
  currentLeaf,
  getForkedUnit,
} from './template'
import {
  findParentDOMElement,
  findPreviousVisibleSibling,
  findPreviousVisibleSiblingBlock,
} from './search'
import {
  mountChild,
  appendChild,
  onMount as onMountSync,
  mountChildTemplates,
} from './mountChild'
import {remap} from './remap'

export function h(tag: string): void
export function h(tag: string, cb: () => void): void
export function h(
  tag: string,
  spec: {
    fn?: () => void
    attr?: PropertyMap
    data?: PropertyMap
    text?: StoreOrData<DOMProperty> | Array<StoreOrData<DOMProperty>>
    visible?: Store<boolean>
    style?: StylePropertyMap
    styleVar?: PropertyMap
    handler?:
      | {
          config?: {
            passive?: boolean
            capture?: boolean
            prevent?: boolean
            stop?: boolean
          }
          on: Partial<
            {[K in keyof HTMLElementEventMap]: Event<HTMLElementEventMap[K]>}
          >
        }
      | Partial<
          {[K in keyof HTMLElementEventMap]: Event<HTMLElementEventMap[K]>}
        >
  },
): void
export function h(tag: string, opts?: any) {
  let hasCb = false
  let hasOpts = false
  let cb: () => void
  if (typeof opts === 'function') {
    hasCb = true
    cb = opts
  } else {
    if (opts) {
      hasOpts = true
      if (opts.fn) {
        hasCb = true
        cb = opts.fn
      }
      if (opts.ɔ) {
        if (typeof opts.ɔ === 'function') {
          hasCb = true
          cb = opts.ɔ
        } else if (typeof opts.ɔ.fn === 'function') {
          hasCb = true
          cb = opts.ɔ.fn
        }
      }
    }
  }
  if (!currentActor) throw Error('h() called outside from using() closure')
  const env = currentActor!.env
  const parentNS = currentActor!.namespace
  let ns: NSType = parentNS
  let type = 'html'
  ns = type = parentNS === 'svg' ? 'svg' : 'html'
  if (tag === 'svg') {
    type = 'svg'
    ns = 'svg'
  }
  let node: DOMElement
  if (!currentActor!.isBlock) {
    node =
      type === 'svg'
        ? env.document.createElementNS('http://www.w3.org/2000/svg', tag)
        : env.document.createElement(tag)
  }
  //@ts-ignore
  const stencil = node
  const draft: ElementDraft = {
    type: 'element',
    tag,
    attr: [],
    data: [],
    text: [],
    styleProp: [],
    styleVar: [],
    handler: [],
    stencil,
    seq: [],
    staticSeq: [],
    childTemplates: [],
    childCount: 0,
    inParentIndex: -1,
    opsAmount: 1,
    node: [],
  }
  if (parentNS === 'foreignObject') {
    draft.attr.push({
      xmlns: 'http://www.w3.org/1999/xhtml',
    })
    ns = 'html'
  } else if (tag === 'svg') {
    draft.attr.push({
      xmlns: 'http://www.w3.org/2000/svg',
    })
    ns = 'svg'
  } else if (tag === 'foreignObject') {
    ns = 'foreignObject'
  }

  const elementTemplate = createTemplate({
    name: 'element',
    draft,
    isSvgRoot: tag === 'svg',
    namespace: ns,
    fn(_, {mount, unmount}) {
      const domElementCreated = createEvent<Leaf>()
      function valueElementMutualSample(value: Store<DOMProperty>) {
        return mutualSample({
          mount: domElementCreated,
          state: value,
          onMount: (value, leaf) => ({leaf, value}),
          onState: (leaf, value) => ({leaf, value}),
        })
      }
      const leaf = mount.map(({leaf}) => leaf)
      if (hasCb) {
        cb()
      }
      if (hasOpts) {
        spec(opts)
      }
      const merged: MergedBindings = {
        attr: {},
        data: {},
        text: draft.text,
        styleProp: {},
        styleVar: {},
        visible: draft.visible || null,
        handler: draft.handler,
      }
      for (let i = 0; i < draft.attr.length; i++) {
        const map = draft.attr[i]
        for (const key in map) {
          if (key === 'xlink:href') {
            merged.attr.href = map[key]
          } else {
            merged.attr[key] = map[key]
          }
        }
      }
      for (let i = 0; i < draft.data.length; i++) {
        const map = draft.data[i]
        for (const key in map) {
          merged.data[key] = map[key]
        }
      }
      for (let i = 0; i < draft.styleProp.length; i++) {
        const map = draft.styleProp[i]
        for (const key in map) {
          if (key.startsWith('--')) {
            merged.styleVar[key.slice(2)] = map[key]!
          } else {
            merged.styleProp[key] = map[key]
          }
        }
      }
      for (let i = 0; i < draft.styleVar.length; i++) {
        const map = draft.styleVar[i]
        for (const key in map) {
          merged.styleVar[key] = map[key]
        }
      }
      if (merged.visible) {
        draft.seq.push({
          type: 'visible',
          value: merged.visible,
        })
      }
      for (const attr in merged.attr) {
        const value = merged.attr[attr]
        if (is.unit(value)) {
          draft.seq.push({
            type: 'attr',
            field: attr,
            value,
          })
        } else {
          draft.staticSeq.push({
            type: 'attr',
            field: attr,
            value,
          })
        }
      }
      for (const data in merged.data) {
        const value = merged.data[data]
        if (is.unit(value)) {
          draft.seq.push({
            type: 'data',
            field: data,
            value,
          })
        } else {
          draft.staticSeq.push({
            type: 'data',
            field: data,
            value,
          })
        }
      }
      for (const propName in merged.styleProp) {
        const value = merged.styleProp[propName]
        if (is.unit(value)) {
          draft.seq.push({
            type: 'style',
            field: propName,
            value,
          })
        } else {
          draft.staticSeq.push({
            type: 'style',
            field: propName,
            value: value!,
          })
        }
      }
      for (const field in merged.styleVar) {
        const value = merged.styleVar[field]
        if (is.unit(value)) {
          draft.seq.push({
            type: 'styleVar',
            field,
            value,
          })
        } else {
          draft.staticSeq.push({
            type: 'styleVar',
            field,
            value,
          })
        }
      }
      for (let i = 0; i < merged.text.length; i++) {
        const item = merged.text[i]
        if (item.value === null) continue
        if (is.unit(item.value)) {
          draft.seq.push({
            type: 'dynamicText',
            value: item.value,
            childIndex: item.index,
          })
          //@ts-ignore
          const ref = item.value.stateRef
          const templ: Template = currentTemplate!
          if (!templ.plain.includes(ref) && !templ.closure.includes(ref)) {
            templ.closure.push(ref)
          }
        } else {
          draft.seq.push({
            type: 'staticText',
            value: String(item.value),
            childIndex: item.index,
          })
        }
      }
      for (let i = 0; i < merged.handler.length; i++) {
        const item = merged.handler[i]
        for (const key in item.map) {
          draft.seq.push({
            type: 'handler',
            for: key,
            //@ts-ignore
            handler: item.map[key],
            options: item.options,
            domConfig: item.domConfig,
          })
        }
      }
      if (merged.visible) {
        const {onMount, onState} = mutualSample({
          mount: leaf,
          state: merged.visible,
          onMount: (value, leaf) => ({leaf, value, hydration: leaf.hydration}),
          onState: (leaf, value) => ({leaf, value, hydration: false}),
        })
        onMount.watch(({leaf, value, hydration}) => {
          const leafData = leaf.data as LeafDataElement
          const visibleOp = leafData.ops.visible
          const parentBlock = leafData.block
          if (hydration) {
            forceSetOpValue(value, visibleOp)
            if (value) {
              const visibleSibling = findPreviousVisibleSibling(parentBlock)
              let foundElement: DOMElement
              if (visibleSibling) {
                foundElement = visibleSibling.nextSibling! as DOMElement
              } else {
                foundElement = findParentDOMElement(parentBlock)!
                  .firstChild! as DOMElement
              }
              if (foundElement.nodeName === '#text') {
                const emptyText = foundElement
                foundElement = foundElement.nextSibling! as DOMElement
                emptyText.remove()
              }
              parentBlock.value = foundElement
              parentBlock.visible = true
            }
          }
          const svgRoot = elementTemplate.isSvgRoot
            ? (parentBlock.value as any)
            : null
          mountChildTemplates(draft, {
            parentBlockFragment: parentBlock.child,
            leaf,
            node: parentBlock.value,
            svgRoot,
          })
          if (value) {
            if (leafData.needToCallNode) {
              leafData.needToCallNode = false
              launch({
                target: onMountSync,
                params: {
                  element: leafData.block.value,
                  fns: draft.node,
                },
                page: leaf.spawn,
                defer: true,
                //@ts-ignore
                forkPage: leaf.forkPage,
              })
            }
          }
          launch({
            target: domElementCreated,
            params: leaf,
            defer: true,
            page: leaf.spawn,
            //@ts-ignore
            forkPage: leaf.forkPage,
          })
        })
        merge([onState, onMount]).watch(({leaf, value, hydration}) => {
          const leafData = leaf.data as LeafDataElement
          const visibleOp = leafData.ops.visible
          if (!hydration) {
            pushOpToQueue(value, visibleOp)
          }
        })
      }
      if (stencil) applyStaticOps(stencil, draft.staticSeq)
      for (let i = 0; i < draft.seq.length; i++) {
        const item = draft.seq[i]
        switch (item.type) {
          case 'visible':
            break
          case 'attr': {
            const {field} = item
            const immediate =
              field === 'value' ||
              field === 'checked' ||
              field === 'min' ||
              field === 'max'
            const {onMount, onState} = valueElementMutualSample(item.value)
            if (immediate) {
              merge([onState, onMount]).watch(({leaf, value}) => {
                applyAttr(readElement(leaf), field, value)
              })
            } else {
              const opID = draft.opsAmount++
              onMount.watch(({value, leaf}) => {
                const element = readElement(leaf)
                const op = createOp({
                  value,
                  priority: 'props',
                  runOp(value) {
                    applyAttr(element, field, value)
                  },
                  group: leaf.ops.group,
                })
                leaf.ops.group.ops[opID] = op
                applyAttr(element, field, value)
              })
              onState.watch(({value, leaf}) => {
                pushOpToQueue(value, leaf.ops.group.ops[opID])
              })
            }
            break
          }
          case 'data': {
            const {field} = item
            const {onMount, onState} = valueElementMutualSample(item.value)
            const opID = draft.opsAmount++
            onMount.watch(({value, leaf}) => {
              const element = readElement(leaf)
              const op = createOp({
                value,
                priority: 'props',
                runOp(value) {
                  applyDataAttr(element, field, value)
                },
                group: leaf.ops.group,
              })
              leaf.ops.group.ops[opID] = op
              applyDataAttr(element, field, value)
            })
            onState.watch(({value, leaf}) => {
              pushOpToQueue(value, leaf.ops.group.ops[opID])
            })
            break
          }
          case 'style': {
            const opID = draft.opsAmount++
            const {field} = item
            const {onMount, onState} = valueElementMutualSample(item.value)

            onMount.watch(({value, leaf}) => {
              const element = readElement(leaf)
              const op = createOp({
                value,
                priority: 'props',
                runOp(value) {
                  applyStyle(element, field, value)
                },
                group: leaf.ops.group,
              })
              leaf.ops.group.ops[opID] = op
              applyStyle(element, field, value)
            })
            onState.watch(({value, leaf}) => {
              pushOpToQueue(value, leaf.ops.group.ops[opID])
            })
            break
          }
          case 'styleVar': {
            const {field} = item
            const {onMount, onState} = valueElementMutualSample(item.value)
            const opID = draft.opsAmount++
            onMount.watch(({value, leaf}) => {
              const element = readElement(leaf)
              const op = createOp({
                value,
                priority: 'props',
                runOp(value) {
                  applyStyleVar(element, field, value)
                },
                group: leaf.ops.group,
              })
              leaf.ops.group.ops[opID] = op
              applyStyleVar(element, field, value)
            })
            onState.watch(({value, leaf}) => {
              pushOpToQueue(value, leaf.ops.group.ops[opID])
            })
            break
          }
          case 'staticText': {
            domElementCreated
              .map(e => e)
              .watch(leaf => {
                installTextNode(leaf, item.value, item.childIndex)
              })
            break
          }
          case 'dynamicText': {
            const opID = draft.opsAmount++
            const textAndElement = sample({
              source: item.value,
              clock: domElementCreated,
              fn: (text, leaf) => ({value: String(text), leaf}),
              greedy: true,
            })
            textAndElement.watch(({value, leaf}) => {
              const op = createOp({
                value,
                priority: 'props',
                runOp(value) {
                  applyText(textBlock.value, value)
                },
                group: leaf.ops.group,
              })
              leaf.ops.group.ops[opID] = op
              const textBlock = installTextNode(leaf, value, item.childIndex)
            })
            sample({
              source: domElementCreated,
              clock: item.value,
              fn: (leaf, text) => ({leaf, text}),
              greedy: true,
            }).watch(({leaf, text}) => {
              pushOpToQueue(text, leaf.ops.group.ops[opID])
            })
            break
          }
          case 'handler': {
            const handlerTemplate: Template | null =
              //@ts-ignore
              item.handler.graphite.meta.nativeTemplate || null
            domElementCreated.watch(leaf => {
              let page: Spawn | null = null
              if (handlerTemplate) {
                let handlerPageFound = false
                let currentPage: Spawn | null = leaf.spawn
                while (!handlerPageFound && currentPage) {
                  if (currentPage.template === handlerTemplate) {
                    handlerPageFound = true
                    page = currentPage
                  } else {
                    currentPage = currentPage.parent
                  }
                }
              }
              readElement(leaf).addEventListener(
                item.for,
                value => {
                  if (item.options.prevent) value.preventDefault()
                  if (item.options.stop) value.stopPropagation()
                  launch({
                    target: getForkedUnit(item.handler, leaf.forkPage),
                    params: value,
                    page,
                    //@ts-ignore
                    forkPage: leaf.forkPage,
                  })
                },
                item.domConfig,
              )
            })
            break
          }
        }
      }
      sample({
        source: leaf,
        clock: unmount,
        greedy: true,
      }).watch(leaf => {
        const {spawn} = leaf
        removeItem(spawn, spawn.parent!.childSpawns[spawn.template.id])
        function halt(spawn: Spawn) {
          spawn.active = false
          removeItem(spawn, spawn.template.pages)
          for (const id in spawn.childSpawns) {
            spawn.childSpawns[id].forEach(halt)
          }
        }
        halt(spawn)

        const visibleOp = (leaf.data as LeafDataElement).ops.visible
        pushOpToQueue(false, visibleOp)
      })
      mount.watch(({leaf}) => {
        const leafData = leaf.data as LeafDataElement

        if (!draft.visible) {
          const visibleOp = leafData.ops.visible
          const parentBlock = leafData.block
          if (leaf.hydration) {
            forceSetOpValue(true, visibleOp)
            const visibleSibling = findPreviousVisibleSibling(parentBlock)
            let foundElement: DOMElement
            if (visibleSibling) {
              foundElement = visibleSibling.nextSibling! as DOMElement
            } else {
              foundElement = findParentDOMElement(parentBlock)!
                .firstChild! as DOMElement
            }
            if (foundElement.nodeName === '#text') {
              const emptyText = foundElement
              foundElement = foundElement.nextSibling! as DOMElement
              emptyText.remove()
            }
            parentBlock.value = foundElement
            parentBlock.visible = true
          }
          const svgRoot = elementTemplate.isSvgRoot
            ? (parentBlock.value as any)
            : null
          mountChildTemplates(draft, {
            parentBlockFragment: parentBlock.child,
            leaf,
            node: parentBlock.value,
            svgRoot,
          })
          launch({
            target: domElementCreated,
            params: leaf,
            defer: true,
            page: leaf.spawn,
            //@ts-ignore
            forkPage: leaf.forkPage,
          })
          if (leaf.hydration) {
            if (leafData.needToCallNode) {
              leafData.needToCallNode = false
              launch({
                target: onMountSync,
                params: {
                  element: leafData.block.value,
                  fns: draft.node,
                },
                page: leaf.spawn,
                defer: true,
                //@ts-ignore
                forkPage: leaf.forkPage,
              })
            }
          } else {
            pushOpToQueue(true, visibleOp)
          }
        }
      })
    },
    env,
  })
  setInParentIndex(elementTemplate)
  function readElement(leaf: Leaf) {
    return (leaf.data as LeafDataElement).block.value
  }
  function installTextNode(leaf: Leaf, value: string, childIndex: number) {
    const parentBlock = (leaf.data as any).block as ElementBlock
    const parentBlockFragment = parentBlock.child
    const textBlock: TextBlock = {
      type: 'text',
      parent: parentBlockFragment,
      visible: false,
      index: childIndex,
      value: null as any,
    }
    parentBlockFragment.child[childIndex] = textBlock
    if (leaf.hydration) {
      const siblingBlock = findPreviousVisibleSiblingBlock(textBlock)
      if (siblingBlock) {
        switch (siblingBlock.type) {
          case 'text': {
            textBlock.value = leaf.env.document.createTextNode(value)
            siblingBlock.value.after(textBlock.value)
            break
          }
          case 'element': {
            textBlock.value = siblingBlock.value.nextSibling! as Text
            applyText(textBlock.value, value)
            break
          }
        }
      } else {
        const parentElement = findParentDOMElement(textBlock)
        textBlock.value = parentElement!.firstChild! as Text
        applyText(textBlock.value, value)
      }
      textBlock.visible = true
    } else {
      textBlock.value = leaf.env.document.createTextNode(value)
      appendChild(textBlock)
    }
    return textBlock
  }
}

function getDefaultEnv(): {
  document: Document
} {
  if (typeof document !== 'undefined') return {document}
  throw Error('your environment has no document')
}
function collectScopeRefs(scope?: any) {
  if (!scope) return
  if (!scope.nodeMap) {
    const nodeMap: Record<string, any> = {}
    for (const node of scope.clones) {
      nodeMap[node.meta.forkOf.id] = node
    }
    scope.nodeMap = nodeMap
  }
  return scope.reg
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
    onRoot?: (config: {template: Actor<{mount: any}>; leaf: Leaf}) => void
    scope?: Fork
  },
): void
export function using(node: DOMElement, opts: any): void {
  let cb: () => any
  let onComplete: (() => void) | undefined
  let env: {
    document: Document
  }
  let hydrate: boolean
  let onRoot:
    | ((config: {template: Actor<{mount: any}>; leaf: Leaf}) => void)
    | undefined
  let scope: Fork
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
  if (!node) throw Error('using() first argument is missing')
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
    draft: draft as any,
    isSvgRoot: tag === 'svg',
    namespace: ns,
    fn(_, {mount}) {
      cb()
      mount.watch(({node, leaf}) => {
        const parentBlock = (leaf.data as any).block as UsingBlock
        mountChildTemplates(draft, {
          parentBlockFragment: parentBlock.child,
          leaf,
          node,
        })
      })
    },
    env,
  })

  const usingBlock: UsingBlock = {
    type: 'using',
    child: {
      type: 'fragment',
      parent: null as any,
      child: [],
    },
    value: node,
  }
  usingBlock.child.parent = usingBlock

  const queue = createOpQueue({onComplete})
  const rootLeaf = spawn(usingTemplate, {
    parentLeaf: currentLeaf || null,
    mountNode: node,
    svgRoot: usingTemplate.isSvgRoot
      ? (node as any)
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
    refMap: collectScopeRefs(scope!),
    forkPage: scope!,
    env,
  })

  if (onRoot) {
    onRoot({
      template: usingTemplate,
      leaf: rootLeaf,
    })
  }
}

export function node(cb: (node: DOMElement) => (() => void) | void) {
  const draft = currentActor!.draft
  switch (draft.type) {
    case 'list':
    case 'listItem':
    case 'using':
    case 'route':
    case 'rec':
    case 'recItem':
    case 'block':
    case 'blockItem':
      console.error('node() hook supported only in h() nodes')
      return
  }
  draft.node.push(cb)
}

export function spec(config: {
  attr?: PropertyMap
  data?: PropertyMap
  text?: StoreOrData<DOMProperty> | Array<StoreOrData<DOMProperty>>
  style?: StylePropertyMap
  styleVar?: PropertyMap
  visible?: Store<boolean>
  handler?:
    | {
        config?: {
          passive?: boolean
          capture?: boolean
          prevent?: boolean
          stop?: boolean
        }
        on: Partial<
          {[K in keyof HTMLElementEventMap]: Event<HTMLElementEventMap[K]>}
        >
      }
    | Partial<{[K in keyof HTMLElementEventMap]: Event<HTMLElementEventMap[K]>}>
  ɔ?: any
}) {
  const draft = currentActor!.draft
  switch (draft.type) {
    case 'list':
      if (config.visible) draft.itemVisible = config.visible
      return
    case 'listItem':
    case 'using':
    case 'route':
    case 'rec':
    case 'recItem':
    case 'block':
    case 'blockItem':
      return
  }
  if (config.attr) draft.attr.push(config.attr)
  if (config.data) draft.data.push(config.data)
  if ('text' in config) {
    const text = config.text
    const firstIndex = draft.childCount
    if (Array.isArray(text)) {
      draft.text.push(
        ...text.map((value, i) => ({
          index: i + firstIndex,
          value,
        })),
      )
      draft.childCount += text.length
    } else {
      draft.text.push({
        index: firstIndex,
        value: text!,
      })
      draft.childCount += 1
    }
  }
  if (config.style) draft.styleProp.push(config.style)
  if (config.styleVar) draft.styleVar.push(config.styleVar)
  if (config.visible) draft.visible = config.visible
  if (config.handler) {
    const handlerDef = config.handler as any
    if (typeof handlerDef.on === 'object') {
      handler(handlerDef.config || {}, handlerDef.on)
    } else {
      handler(handlerDef)
    }
  }
  if (config.ɔ) {
    spec(config.ɔ)
  }
}

export function handler(
  map: Partial<
    {[K in keyof HTMLElementEventMap]: Event<HTMLElementEventMap[K]>}
  >,
): void
export function handler(
  options: {
    passive?: boolean
    capture?: boolean
    prevent?: boolean
    stop?: boolean
  },
  map: Partial<
    {[K in keyof HTMLElementEventMap]: Event<HTMLElementEventMap[K]>}
  >,
): void
export function handler(options: any, map?: any) {
  if (!currentActor) return
  const draft = currentActor.draft
  if (draft.type !== 'element') {
    throw Error(
      `"handler" extension can be used only with element nodes, got "${draft.type}"`,
    )
  }
  if (map === undefined) {
    map = options
    options = {}
  }
  for (const key in map) {
    if (!is.unit(map[key])) throw Error(`handler for "${key}" should be event`)
  }
  const {
    passive = false,
    capture = false,
    prevent = false,
    stop = false,
  } = options
  draft.handler.push({
    options: {
      prevent,
      stop,
    },
    domConfig: {
      passive: prevent ? false : passive,
      capture,
    },
    map,
  })
}

export function variant<T, K extends keyof T>({
  source,
  cases,
  key,
}: {
  source: Store<T>
  key: K
  cases: T[K] extends string
    ? Record<T[K], (config: {store: Store<T>}) => void>
    : {
        [caseName: string]: (config: {store: Store<T>}) => void
        __: (config: {store: Store<T>}) => void
      }
}) {
  if (!is.unit(source)) throw Error('variant({source}) should be unit')
  let keyReader: (value: any) => any

  if (typeof key === 'function') keyReader = key
  else if (key == null) keyReader = (value: any) => String(value)
  else keyReader = (value: any) => String(value[key])

  let defaultCase = false

  for (const caseName in cases) {
    if (caseName === '__') {
      defaultCase = true
      continue
    }
    route({
      source,
      visible: value => keyReader(value) === caseName,
      fn: cases[caseName],
    })
  }
  if (defaultCase) {
    const nonDefaultCases = Object.keys(cases)
    route({
      source,
      visible: value => !nonDefaultCases.includes(keyReader(value)),
      fn: (cases as any).__,
    })
  }
}

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
export function route<T>({
  source,
  visible: visibleFn,
  fn,
}: {
  source: Store<T>
  visible: (value: T) => boolean
  fn: (config: {store: Store<T>}) => void
}) {
  const draft: RouteType = {
    type: 'route',
    childTemplates: [],
    childCount: 0,
    inParentIndex: -1,
  }
  if (!currentActor) throw Error('route() called outside from using() closure')
  const routeTemplate = createTemplate({
    name: 'route',
    isSvgRoot: false,
    namespace: currentActor!.namespace,
    env: currentActor!.env,
    draft,
    fn(_, {mount, unmount}) {
      const state = source.map(value => ({
        value,
        visible: visibleFn(value),
      }))
      const childDraft: RouteType = {
        type: 'route',
        childTemplates: [],
        childCount: 0,
        inParentIndex: -1,
      }
      const routeItemTemplate = createTemplate({
        name: 'route item',
        isSvgRoot: false,
        namespace: currentActor!.namespace,
        env: currentActor!.env,
        draft: childDraft,
        state: {store: null},
        fn({store}, {mount, unmount}) {
          const itemUpdater = createEvent<any>()
          store.on(itemUpdater, (_, upd) => upd)
          fn({store})
          const onValueUpdate = sample({
            source: mount,
            clock: state,
            fn: ({leaf, node}, {visible, value}) => ({
              leaf,
              visible,
              node,
              value,
            }),
            greedy: true,
          })
          mount.watch(({leaf, node}) => {
            const data = leaf.data as LeafDataRoute
            data.block.child.visible = true
            mountChildTemplates(childDraft, {
              parentBlockFragment: data.block.child.child,
              leaf,
              node,
            })
          })
          onValueUpdate.watch(({leaf, visible, value}) => {
            const data = leaf.data as LeafDataRoute
            data.block.child.visible = visible
            if (visible) {
              launch({
                target: itemUpdater,
                params: value,
                defer: true,
                page: leaf.spawn,
                //@ts-ignore
                forkPage: leaf.forkPage,
              })
            }
            changeChildLeafsVisible(visible, leaf)
          })
          defineUnmount({
            unmountSelf: true,
            mount,
            unmount,
          })
        },
      })
      setInParentIndex(routeItemTemplate)
      const {onMount, onState: onVisibleChange} = mutualSample({
        mount,
        state,
        onMount: ({visible, value}, {leaf, node}) => ({
          leaf,
          visible,
          node,
          value,
        }),
        onState: ({leaf, node}, {visible, value}) => ({
          leaf,
          visible,
          node,
          value,
        }),
      })
      merge([onMount, onVisibleChange]).watch(
        ({leaf, visible, value, node}) => {
          const data = leaf.data as LeafDataRoute
          data.block.child.visible = visible
          if (visible && !data.initialized) {
            mountChild({
              parentBlockFragment: data.block.child.child,
              leaf,
              node,
              actor: routeItemTemplate,
              values: {store: value},
            })
            data.initialized = true
          }
        },
      )
      defineUnmount({
        unmountSelf: true,
        mount,
        unmount,
      })
    },
  })
  setInParentIndex(routeTemplate)
}

function changeChildLeafsVisible(visible: boolean, leaf: Leaf) {
  const childLeafIterator = (child: Leaf) => {
    const data = child.data
    switch (data.type) {
      case 'element':
        pushOpToQueue(visible, data.ops.visible)
        break
      case 'route':
      case 'list':
      case 'list item':
        iterateChildLeafs(child, childLeafIterator)
        break
      default:
        console.log('unsupported type', data.type)
    }
  }
  iterateChildLeafs(leaf, childLeafIterator)
}

function defineUnmount({
  unmountSelf = false,
  mount,
  unmount,
}: {
  unmountSelf?: boolean
  mount: Event<LeafMountParams>
  unmount: Event<void>
}) {
  sample({
    source: mount,
    clock: unmount,
    greedy: true,
  }).watch(
    unmountSelf
      ? ({leaf}) => {
          unmountChildLeafs(leaf)
          unmountOwnSpawn(leaf)
        }
      : ({leaf}) => {
          unmountChildLeafs(leaf)
        },
  )
}

function unmountOwnSpawn({spawn}: Leaf) {
  removeItem(spawn, spawn.parent!.childSpawns[spawn.template.id])
  removeItem(spawn, spawn.template.pages)
}
function unmountChildLeafs(leaf: Leaf) {
  leaf.spawn.active = false
  iterateChildLeafs(leaf, child => {
    child.api.unmount()
  })
}

function iterateChildLeafs(leaf: Leaf, cb: (child: Leaf) => void) {
  const {spawn: page} = leaf
  for (const key in page.childSpawns) {
    const childs = page.childSpawns[key]
    for (let i = 0; i < childs.length; i++) {
      const childSpawn = childs[i]
      //@ts-ignore
      cb(childSpawn.leaf)
    }
  }
}

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
    fn({}, {mount, unmount}) {
      fn()
      mount.watch(({node, leaf}) => {
        const data = leaf.data as LeafDataBlock
        mountChildTemplates(blockDraft, {
          parentBlockFragment: data.block.child,
          leaf,
          node,
        })
      })
      defineUnmount({
        mount,
        unmount,
      })
    },
  })
  return () => {
    const blockItemDraft: BlockItemDraft = {
      type: 'blockItem',
      childTemplates: [],
      childCount: 0,
      inParentIndex: -1,
      itemOf: blockDraft,
    }
    const {env, namespace} = currentActor!
    const blockItemTemplate = createTemplate({
      name: 'block item',
      isSvgRoot: false,
      namespace,
      env,
      draft: blockItemDraft,
      fn(_, {mount, unmount}) {
        defineUnmount({
          mount,
          unmount,
        })
        mount.watch(({node, leaf}) => {
          const data = leaf.data as LeafDataBlockItem
          mountChild({
            parentBlockFragment: data.block.child,
            leaf,
            node,
            actor: blockTemplate,
          })
        })
      },
    })
    setInParentIndex(blockItemTemplate)
  }
}

export function rec<T>(
  fn: (config: {state: Store<T>}) => void,
): (opts: {state: Store<T>}) => void {
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
    namespace: null as any,
    env: null as any,
    draft: recDraft,
    defer: true,
    isBlock: true,
    fn({store}, {mount, unmount}) {
      fn({state: store})
      const itemUpdater = createEvent<any>()
      store.on(itemUpdater, (_, e) => e)
      mount.watch(({node, leaf}) => {
        const data = leaf.data as LeafDataRec
        mountChildTemplates(recDraft, {
          parentBlockFragment: data.block.child,
          leaf,
          node,
        })
      })
      defineUnmount({
        mount,
        unmount,
      })
      return {itemUpdater}
    },
  })
  return ({state}) => {
    if (recTemplate.deferredInit) recTemplate.deferredInit()
    // const {mount, unmount} = currentActor!.trigger
    const {env, namespace} = currentActor!
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
      fn(_, {mount, unmount}) {
        const {onMount, onState} = mutualSample({
          state,
          mount,
          onMount: (state, {leaf, node}) => ({state, leaf, node}),
          onState: ({leaf, node}, state) => ({state, leaf, node}),
        })
        defineUnmount({
          mount,
          unmount,
        })
        onState.watch(({state, leaf}) => {
          iterateChildLeafs(leaf, child => {
            child.api.itemUpdater(state)
          })
        })
        onMount.watch(({node, leaf, state}) => {
          const data = leaf.data as LeafDataRecItem
          mountChild({
            parentBlockFragment: data.block.child,
            leaf,
            node,
            actor: recTemplate,
            values: {store: state},
          })
        })
      },
    })
    setInParentIndex(recItemTemplate)
  }
}

export function tree<
  T,
  ChildField extends keyof T
  // KeyField extends keyof T
>(config: {
  source: Store<T[]>
  // key: T[KeyField] extends string ? KeyField : never
  child: T[ChildField] extends T[] ? ChildField : never
  fn: (config: {store: Store<T>; child: () => void}) => void
}): void
export function tree({
  source,
  // key: keyField,
  child: childField,
  fn,
}: {
  source: Store<any[]>
  // key: string
  child: string
  fn: Function
}) {
  const treeRec = rec<any[]>(({state}) => {
    list({
      source: state,
      fn({store}) {
        const childList = store.map(value => value[childField] || [])
        fn({
          store,
          child() {
            treeRec({
              state: childList,
            })
          },
        })
      },
    })
  })
  treeRec({
    state: source,
  })
}

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
  if (!currentActor) throw Error('list() called outside from using() closure')
  const env = currentActor!.env
  const namespace = currentActor!.namespace

  const listTemplate = createTemplate({
    name: 'list',
    draft,
    isSvgRoot: false,
    namespace,
    fn(_, {mount, unmount}) {
      const listItemTemplate = createTemplate<{
        itemUpdater: any
      }>({
        name: 'list item',
        state: {id: -1, store: null},
        draft,
        isSvgRoot: false,
        namespace,
        fn({id, store}, {mount, unmount}) {
          cb({store, key: id, fields: remap(store, fields)})
          const itemUpdater = createEvent<any>()
          store.on(itemUpdater, (_, e) => e)
          const onRemoveFromDOM = sample({
            source: mount,
            clock: unmount,
            greedy: true,
          })
          onRemoveFromDOM.watch(({leaf}) => {
            const listItemBlock = (leaf.data as any).block as LF
            removeItem(listItemBlock, listItemBlock.parent.child)
            const leftBlock = listItemBlock.left
            const rightBlock = listItemBlock.right
            if (leftBlock) {
              leftBlock.right = rightBlock
              if (
                !rightBlock &&
                listItemBlock.parent.lastChild === listItemBlock
              ) {
                listItemBlock.parent.lastChild = leftBlock
              }
            }
            if (rightBlock) {
              rightBlock.left = leftBlock
            }
            if (
              !leftBlock &&
              !rightBlock &&
              listItemBlock.parent.lastChild === listItemBlock
            ) {
              listItemBlock.parent.lastChild = null
            }
            listItemBlock.left = null
            listItemBlock.right = null
            unmountChildLeafs(leaf)
            unmountOwnSpawn(leaf)
          })
          if (draft.itemVisible) {
            const {
              onMount: mountAndVisible,
              onState: onVisibleChanges,
            } = mutualSample({
              mount,
              state: draft.itemVisible,
              onMount: (visible, {node, leaf}) => ({visible, node, leaf}),
              onState: ({node, leaf}, visible) => ({visible, node, leaf}),
            })
            mountAndVisible.watch(({visible, node, leaf}) => {
              const parentBlock = (leaf.data as any).block as LF
              parentBlock.visible = visible
              parentBlock.childInitialized = visible
              if (visible) {
                mountChildTemplates(draft, {
                  parentBlockFragment: parentBlock.child,
                  leaf,
                  node,
                })
              }
            })
            onVisibleChanges.watch(({visible, node, leaf}) => {
              const parentBlock = (leaf.data as any).block as LF
              parentBlock.visible = visible
              if (!parentBlock.childInitialized) {
                if (visible) {
                  parentBlock.childInitialized = true
                  mountChildTemplates(draft, {
                    parentBlockFragment: parentBlock.child,
                    leaf,
                    node,
                  })
                }
                return
              }
              changeChildLeafsVisible(visible, leaf)
            })
          } else {
            mount.watch(({node, leaf}) => {
              const parentBlock = (leaf.data as any).block as LF
              parentBlock.visible = true
              parentBlock.childInitialized = true
              mountChildTemplates(draft, {
                parentBlockFragment: parentBlock.child,
                leaf,
                node,
              })
            })
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
        fn: (data, {node, leaf}) => {
          return {
            updates: data,
            node,
            leaf,
            hydration: leaf.hydration,
          }
        },
        greedy: true,
      })

      const parentNodeUpdateSpawn = sample({
        source: mountData,
        clock: mappedUpdates,
        fn: ({node, leaf}, updates: T[]) => ({
          updates,
          node,
          leaf,
          hydration: false,
        }),
        greedy: true,
      })
      sample({
        source: updates,
        clock: [mountData, parentNodeUpdateSpawn],
        greedy: true,
        fn(records: ListItemType[], {node, updates: input, leaf, hydration}) {
          const parentBlock = (leaf.data as any).block as ListBlock
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
                record.instance.api.unmount()
              }
              stopAsyncValue(record.asyncValue)
            }
          }
          for (let i = 0; i < input.length; i++) {
            if (skipNode[i]) continue
            const value = input[i]
            const id = keys[i]
            const group = createOpGroup(leaf.ops.group.queue)
            const listItemBlock: LF = {
              type: 'LF',
              parent: parentBlock,
              child: {
                type: 'fragment',
                parent: null as any,
                child: [],
              },
              childInitialized: false,
              visible: false,
              left: null,
              right: null,
            }
            const item: ListItemType = {
              type: 'listItem',
              key: id as any,
              index: id as any,
              active: true,
              leafData: {
                type: 'list item',
                block: listItemBlock,
              },
              asyncValue: createAsyncValue({
                value,
                group,
                onTerminate(wasActive) {
                  // if (item.instance) {
                  //   item.instance.api.unmount()
                  // }
                },
                onChange(value) {
                  if (item.instance) {
                    item.instance.api.itemUpdater(value)
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
                    mountNode: node,
                    svgRoot: leaf.svgRoot,
                    leafData: item.leafData,
                    opGroup: group,
                    domSubtree: leaf.ops.domSubtree,
                    hydration,
                    forkPage: leaf.forkPage,
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

            listItemBlock.child.parent = listItemBlock
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
                mountNode: node,
                svgRoot: leaf.svgRoot,
                leafData: item.leafData,
                opGroup: group,
                domSubtree: leaf.ops.domSubtree,
                hydration,
                forkPage: leaf.forkPage,
              })
            }
          }
          endMark('list update [' + source.shortName + ']')
          if (resultRecords.length === 0) {
            parentBlock.lastChild = null
          }
          return resultRecords
        },
        target: updates,
      })
      const onRemove = sample({
        source: mount,
        clock: sample({
          source: updates,
          clock: unmount,
          greedy: true,
        }) as Event<ListItemType[]>,
        fn: ({leaf}, records) => ({leaf, records}),
        greedy: true,
      })
      onRemove.watch(({leaf, records}) => {
        for (let i = 0; i < records.length; i++) {
          const item = records[i]

          if (item.instance) {
            item.instance.api.unmount()
          }
          item.active = false
        }
        leaf.spawn.active = false
        unmountOwnSpawn(leaf)
      })
    },
    env,
  })
  setInParentIndex(listTemplate)
}

function setInParentIndex(template: Actor<any>) {
  if (!currentActor) return
  const {draft} = template
  if (draft.type === 'listItem') return
  if (draft.type === 'rec') return
  switch (currentActor.draft.type) {
    case 'element':
    case 'using':
    case 'route':
    case 'list':
    case 'rec':
    case 'recItem':
    case 'block':
    case 'blockItem':
      draft.inParentIndex = currentActor.draft.childCount
      currentActor.draft.childCount += 1
      currentActor.draft.childTemplates.push(template)
      break
    default:
      console.warn(`unexpected currentActor type ${currentActor.draft.type}`)
  }
}

function removeItem<T>(item: T, list?: T[]) {
  if (!list) return
  const index = list.indexOf(item)
  if (index !== -1) {
    list.splice(index, 1)
  }
}

function mutualSample<Mount, State, T>({
  mount,
  state,
  onMount,
  onState,
}: {
  mount: Event<Mount>
  state: Store<State>
  onMount: (state: State, mount: Mount) => T
  onState: (mount: Mount, state: State) => T
}): {
  onMount: Event<T>
  onState: Event<T>
} {
  return {
    onMount: sample({
      source: state,
      clock: mount,
      fn: onMount,
      greedy: true,
    }),
    onState: sample({
      source: mount,
      clock: state,
      fn: onState,
      greedy: true,
    }),
  }
}
