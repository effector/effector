import {
  Store,
  Event,
  is,
  launch,
  createStore,
  createEvent,
  sample,
  merge,
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
} from './index.h'
import {beginMark, endMark} from './platform/mark'

import {
  ElementBlock,
  ListBlock,
  TextBlock,
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
} from './bindings'
import {
  createTemplate,
  spawn,
  currentActor,
  currentTemplate,
  currentLeaf,
} from './template'
import {
  findParentDOMElement,
  findPreviousVisibleSibling,
  findPreviousVisibleSiblingBlock,
} from './search'
import {remap} from './remap'

const onMount = createEvent<{
  fns: Array<(node: DOMElement) => (() => void) | void>
  element: DOMElement
}>()

onMount.watch(({fns, element}) => {
  fns.forEach(fn => {
    fn(element)
  })
})

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
  const env = currentActor!.env
  const parentNS = currentActor!.namespace
  let ns: NSType = parentNS
  let type = 'html'
  ns = type = parentNS === 'svg' ? 'svg' : 'html'
  if (tag === 'svg') {
    type = 'svg'
    ns = 'svg'
  }
  const node =
    type === 'svg'
      ? env.document.createElementNS('http://www.w3.org/2000/svg', tag)
      : env.document.createElement(tag)
  if (parentNS === 'foreignObject') {
    node.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml')
    ns = 'html'
  } else if (tag === 'svg') {
    node.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    ns = 'svg'
  } else if (tag === 'foreignObject') {
    ns = 'foreignObject'
  }
  const stencil = node as DOMElement
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
    childTemplates: [],
    childCount: 0,
    inParentIndex: -1,
    opsAmount: 1,
    node: [],
  }
  const elementTemplate = createTemplate<{}>({
    name: 'element',
    draft,
    isSvgRoot: tag === 'svg',
    namespace: ns,
    fn() {
      const mount = createEvent<LeafMountParams>()
      const domElementCreated = createEvent<Leaf>()
      const leaf = mount.map(({leaf}) => leaf)
      const unmount = createEvent()
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
          applyAttr(stencil, attr, value)
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
          applyDataAttr(stencil, data, value)
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
          applyStyle(stencil, propName, value!)
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
          applyStyleVar(stencil, field, value)
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
        const value = merged.visible
        const onValueUpdate = sample({
          source: leaf,
          clock: value,
          fn: (leaf, value) => ({leaf, value, hydration: false}),
          greedy: true,
        })
        const onDomNodeCreation = sample({
          source: value,
          clock: leaf,
          fn: (value, leaf) => ({leaf, value, hydration: leaf.hydration}),
          greedy: true,
        })
        onDomNodeCreation.watch(({leaf, value, hydration}) => {
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
              parentBlock.parent.visible = true
            }
          }
          const svgRoot = elementTemplate.isSvgRoot
            ? (parentBlock.value as any)
            : null
          draft.childTemplates.forEach(actor => {
            mountChild({
              parentBlockFragment: parentBlock.child.child,
              leaf,
              node: parentBlock.value,
              actor,
              svgRoot,
            })
          })
          if (value) {
            if (leafData.needToCallNode) {
              leafData.needToCallNode = false
              launch({
                target: onMount,
                params: {
                  element: leafData.block.value,
                  fns: draft.node,
                },
                page: leaf.spawn,
                defer: true,
              })
            }
          }
          launch({
            target: domElementCreated,
            params: leaf,
            defer: true,
            page: leaf.spawn,
          })
        })
        merge([onValueUpdate, onDomNodeCreation]).watch(
          ({leaf, value, hydration}) => {
            const leafData = leaf.data as LeafDataElement
            const visibleOp = leafData.ops.visible
            if (!hydration) {
              pushOpToQueue(value, visibleOp)
            }
          },
        )
      }
      for (let i = 0; i < draft.seq.length; i++) {
        const item = draft.seq[i]
        switch (item.type) {
          case 'visible':
            break
          case 'attr': {
            const {field, value} = item
            const immediate =
              field === 'value' ||
              field === 'checked' ||
              field === 'min' ||
              field === 'max'
            const onValueUpdate = sample({
              source: domElementCreated,
              clock: value,
              fn: (leaf, value) => ({leaf, value}),
            })
            const onDomNodeCreation = sample({
              source: value,
              clock: domElementCreated,
              fn: (value, leaf) => ({leaf, value}),
            })
            if (immediate) {
              merge([onValueUpdate, onDomNodeCreation]).watch(
                ({leaf, value}) => {
                  applyAttr(readElement(leaf), field, value)
                },
              )
            } else {
              const opID = draft.opsAmount++
              onDomNodeCreation.watch(({value, leaf}) => {
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
              onValueUpdate.watch(({value, leaf}) => {
                pushOpToQueue(value, leaf.ops.group.ops[opID])
              })
            }
            break
          }
          case 'data': {
            const {field, value} = item
            const onValueUpdate = sample({
              source: domElementCreated,
              clock: value,
              fn: (leaf, value) => ({leaf, value}),
            })
            const onDomNodeCreation = sample({
              source: value,
              clock: domElementCreated,
              fn: (value, leaf) => ({leaf, value}),
            })
            const opID = draft.opsAmount++
            onDomNodeCreation.watch(({value, leaf}) => {
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
            onValueUpdate.watch(({value, leaf}) => {
              pushOpToQueue(value, leaf.ops.group.ops[opID])
            })
            break
          }
          case 'style': {
            const opID = draft.opsAmount++
            const {field, value} = item
            const onValueUpdate = sample({
              source: domElementCreated,
              clock: value,
              fn: (leaf, value) => ({leaf, value}),
            })
            const onDomNodeCreation = sample({
              source: value,
              clock: domElementCreated,
              fn: (value, leaf) => ({leaf, value}),
            })

            onDomNodeCreation.watch(({value, leaf}) => {
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
            onValueUpdate.watch(({value, leaf}) => {
              pushOpToQueue(value, leaf.ops.group.ops[opID])
            })
            break
          }
          case 'styleVar': {
            const {field, value} = item
            const onValueUpdate = sample({
              source: domElementCreated,
              clock: value,
              fn: (leaf, value) => ({leaf, value}),
            })
            const onDomNodeCreation = sample({
              source: value,
              clock: domElementCreated,
              fn: (value, leaf) => ({leaf, value}),
            })
            const opID = draft.opsAmount++
            onDomNodeCreation.watch(({value, leaf}) => {
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
            onValueUpdate.watch(({value, leaf}) => {
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
            }).watch(({leaf, text}) => {
              pushOpToQueue(text, leaf.ops.group.ops[opID])
            })
            break
          }
          case 'handler': {
            const nativeTemplate: Template | null =
              //@ts-ignore
              item.handler.graphite.meta.nativeTemplate || null
            domElementCreated.watch(leaf => {
              let page: Spawn | null = null
              if (nativeTemplate) {
                let nativePageFound = false
                let currentPage: Spawn | null = leaf.spawn
                while (!nativePageFound && currentPage) {
                  if (currentPage.template === nativeTemplate) {
                    nativePageFound = true
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
                    target: item.handler,
                    params: value,
                    page,
                  })
                },
                item.domConfig,
              )
            })
            break
          }
        }
      }
      sample(leaf, unmount).watch(leaf => {
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
            parentBlock.parent.visible = true
          }
          const svgRoot = elementTemplate.isSvgRoot
            ? (parentBlock.value as any)
            : null
          draft.childTemplates.forEach(actor => {
            mountChild({
              parentBlockFragment: parentBlock.child.child,
              leaf,
              node: parentBlock.value,
              actor,
              svgRoot,
            })
          })
          launch({
            target: domElementCreated,
            params: leaf,
            defer: true,
            page: leaf.spawn,
          })
          if (leaf.hydration) {
            if (leafData.needToCallNode) {
              leafData.needToCallNode = false
              launch({
                target: onMount,
                params: {
                  element: leafData.block.value,
                  fns: draft.node,
                },
                page: leaf.spawn,
                defer: true,
              })
            }
          } else {
            pushOpToQueue(true, visibleOp)
          }
        }
      })
      return {
        mount,
        unmount,
      }
    },
    env,
  })
  setInParentIndex(draft, elementTemplate)
  function readElement(leaf: Leaf) {
    return (leaf.data as LeafDataElement).block.value
  }
  function installTextNode(leaf: Leaf, value: string, childIndex: number) {
    const parentBlock = (leaf.data as any).block as ElementBlock
    const parentBlockFragment = parentBlock.child.child
    const textBlock: TextBlock = {
      type: 'text',
      parent: {
        type: 'FT',
        parent: parentBlockFragment,
        child: null as any,
        visible: false,
        index: childIndex,
      },
      value: null as any,
    }
    textBlock.parent.child = textBlock
    parentBlockFragment.child[childIndex] = textBlock.parent
    if (leaf.hydration) {
      const siblingBlock = findPreviousVisibleSiblingBlock(textBlock)
      if (siblingBlock) {
        switch (siblingBlock.type) {
          case 'text': {
            textBlock.value = env.document.createTextNode(value)
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
      textBlock.parent.visible = true
    } else {
      textBlock.value = env.document.createTextNode(value)
      appendChild(textBlock)
    }
    return textBlock
  }
}
function setInParentIndex(draft: BindingsDraft, template: Actor<any>) {
  if (!currentActor) return
  switch (currentActor.draft.type) {
    case 'element':
    case 'using':
    case 'route':
    case 'list':
      draft.inParentIndex = currentActor.draft.childCount
      currentActor.draft.childCount += 1
      currentActor.draft.childTemplates.push(template)
      break
  }
}

function appendChild(block: TextBlock | ElementBlock) {
  const visibleSibling = findPreviousVisibleSibling(block)
  if (visibleSibling) {
    visibleSibling.after(block.value)
  } else {
    findParentDOMElement(block)!.prepend(block.value)
  }
  block.parent.visible = true
}

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
    onRoot?: (config: {template: Actor<{mount: any}>; leaf: Leaf}) => void
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
  if (typeof opts === 'function') {
    cb = opts
    env = getDefaultEnv()
    hydrate = false
  } else {
    cb = opts.fn
    env = opts.env ? opts.env : getDefaultEnv()
    hydrate = opts.hydrate
    onComplete = opts.onComplete
    onRoot = opts.onRoot
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

  const usingTemplate = createTemplate<{mount: any}>({
    name: 'using',
    draft: draft as any,
    isSvgRoot: tag === 'svg',
    namespace: ns,
    fn() {
      const mount = createEvent<LeafMountParams>()
      cb()
      mount.watch(({node, leaf}) => {
        const parentBlock = (leaf.data as any).block as UsingBlock
        draft.childTemplates.forEach(actor => {
          mountChild({
            parentBlockFragment: parentBlock.child.child,
            leaf,
            node,
            actor,
          })
        })
      })
      return {
        mount,
      }
    },
    env,
  })

  const usingBlock: UsingBlock = {
    type: 'using',
    child: {
      type: 'UF',
      parent: null as any,
      child: {
        type: 'fragment',
        parent: null as any,
        child: [],
      },
    },
    value: node,
  }
  usingBlock.child.parent = usingBlock
  usingBlock.child.child.parent = usingBlock.child

  const queue = createOpQueue({onComplete})
  const rootLeaf = spawn(usingTemplate, {
    parentSpawn: currentLeaf ? currentLeaf.spawn : null,
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
  if (draft.type === 'list') return
  if (draft.type === 'listItem') return
  if (draft.type === 'using') return
  if (draft.type === 'route') return
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
  if (draft.type === 'list') {
    if (config.visible) draft.itemVisible = config.visible
    return
  }
  if (draft.type === 'listItem') return
  if (draft.type === 'using') return
  if (draft.type === 'route') return
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
  const draft = currentActor!.draft
  if (draft.type !== 'element') {
    throw Error(
      `"handler" extension can be used only with element nodes, got "${draft.type}"`,
    )
  }
  if (map === undefined) {
    map = options
    options = {}
  }
  const {
    passive = true,
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
  //prettier-ignore
  const keyReader = typeof key === 'function'
    ? key
    : (value: any) => String(value[key])
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
  const routeTemplate = createTemplate<{
    mount: LeafMountParams
    unmount: any
  }>({
    name: 'route',
    isSvgRoot: false,
    namespace: currentActor!.namespace,
    env: currentActor!.env,
    draft,
    fn() {
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
      const routeItemTemplate = createTemplate<{
        mount: LeafMountParams
        unmount: any
      }>({
        name: 'route item',
        isSvgRoot: false,
        namespace: currentActor!.namespace,
        env: currentActor!.env,
        draft: childDraft,
        state: {store: null},
        fn({store}) {
          const mount = createEvent<LeafMountParams>()
          const unmount = createEvent<any>()
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
            childDraft.childTemplates.forEach(actor => {
              mountChild({
                parentBlockFragment: data.block.child.child,
                leaf,
                node,
                actor,
              })
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
              })
            }
            iterateChildLeafs(leaf, child => {
              const data = child.data
              switch (data.type) {
                case 'element':
                  pushOpToQueue(visible, data.ops.visible)
                  break
                default:
                  console.log('unsupported type', data.type)
              }
            })
          })
          sample(mount, unmount).watch(({leaf}) => {
            iterateChildLeafs(leaf, child => {
              child.api.unmount()
            })
            const {spawn: page} = leaf
            page.active = false
            removeItem(page, page.parent!.childSpawns[page.template.id])
            removeItem(page, page.template.pages)
          })
          return {
            mount,
            unmount,
          }
        },
      })
      setInParentIndex(childDraft, routeItemTemplate)
      const mount = createEvent<LeafMountParams>()
      const unmount = createEvent<any>()
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
      const onDomNodeCreation = sample({
        source: state,
        clock: mount,
        fn: ({visible, value}, {leaf, node}) => ({
          leaf,
          visible,
          node,
          value,
        }),
        greedy: true,
      })
      merge([onDomNodeCreation, onValueUpdate]).watch(
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
      sample(mount, unmount).watch(({leaf}) => {
        iterateChildLeafs(leaf, child => {
          child.api.unmount()
        })
        const {spawn: page} = leaf
        page.active = false
        removeItem(page, page.parent!.childSpawns[page.template.id])
        removeItem(page, page.template.pages)
      })
      return {
        mount,
        unmount,
      }
    },
  })
  setInParentIndex(draft, routeTemplate)
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

export function tree<
  T,
  ChildField extends keyof T,
  KeyField extends keyof T
>(config: {
  source: Store<T[]>
  key: T[KeyField] extends string ? KeyField : never
  child: T[ChildField] extends T[] ? ChildField : never
  fn: (config: {store: Store<T>; child: () => void}) => void
}): void
export function tree({
  source,
  key: keyField,
  child: childField,
  fn,
}: {
  source: Store<any[]>
  key: string
  child: string
  fn: Function
}) {
  const env = currentActor!.env
  const namespace = currentActor!.namespace
  const fakeDraft: ListType = {
    type: 'list',
    key: {type: 'key', key: keyField},
    childTemplates: [],
    childCount: 0,
    inParentIndex: -1,
  }
  const treeItemTemplate = createTemplate<{
    itemUpdater: any
    mount: LeafMountParams
    unmount: any
  }>({
    name: 'tree item',
    isSvgRoot: false,
    namespace,
    env,
    draft: fakeDraft,
    state: {store: null},
    fn({store}) {
      const itemUpdater = createEvent<any>()
      const mount = createEvent<LeafMountParams>()
      const unmount = createEvent<any>()

      store.on(itemUpdater, (_, e) => e)

      const childList = remap(store, childField)

      fn({store, child() {}})

      return {
        itemUpdater,
        mount,
        unmount,
      }
    },
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

  const env = currentActor!.env
  const namespace = currentActor!.namespace

  const listTemplate = createTemplate<{
    unmount: any
    mount: LeafMountParams
  }>({
    name: 'list',
    draft,
    isSvgRoot: false,
    namespace,
    fn() {
      const template = createTemplate<{
        itemUpdater: any
        mount: LeafMountParams
        unmount: any
      }>({
        name: 'list item',
        state: {id: -1, store: null},
        draft,
        isSvgRoot: false,
        namespace,
        fn({id, store}) {
          cb({store, key: id, fields: remap(store, fields)})
          const itemUpdater = createEvent<any>()
          const unmount = createEvent<void>()
          store.on(itemUpdater, (_, e) => e)
          const mount = createEvent<LeafMountParams>()
          const spawnState = createStore<{leaf: Leaf}>({
            leaf: null as any,
          })
          const onRemoveFromDOM = sample(spawnState, unmount)
          onRemoveFromDOM.watch(({leaf}) => {
            const listItemBlock = (leaf.data as any).block as LF
            if (listItemBlock.parent.child.includes(listItemBlock)) {
              listItemBlock.parent.child.splice(
                listItemBlock.parent.child.indexOf(listItemBlock),
                1,
              )
            }
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
            iterateChildLeafs(leaf, child => {
              child.api.unmount()
            })
            const {spawn: page} = leaf
            page.active = false
            removeItem(page, page.parent!.childSpawns[page.template.id])
            removeItem(page, page.template.pages)
          })
          if (draft.itemVisible) {
            const mountAndVisible = sample({
              source: draft.itemVisible,
              clock: mount,
              fn: (visible, {node, leaf}) => ({visible, node, leaf}),
            })
            mountAndVisible.watch(({visible, node, leaf}) => {
              //@ts-ignore
              spawnState.setState({leaf})
              const parentBlock = (leaf.data as any).block as LF
              parentBlock.visible = visible
              parentBlock.childInitialized = visible
              if (visible) {
                draft.childTemplates.forEach(actor => {
                  mountChild({
                    parentBlockFragment: parentBlock.child,
                    leaf,
                    node,
                    actor,
                  })
                })
              }
            })
            const onVisibleChanges = sample({
              source: mount,
              clock: draft.itemVisible,
              fn: ({node, leaf}, visible) => ({visible, node, leaf}),
            })
            onVisibleChanges.watch(({visible, node, leaf}) => {
              const parentBlock = (leaf.data as any).block as LF
              parentBlock.visible = visible
              if (!parentBlock.childInitialized) {
                if (visible) {
                  parentBlock.childInitialized = true
                  draft.childTemplates.forEach(actor => {
                    mountChild({
                      parentBlockFragment: parentBlock.child,
                      leaf,
                      node,
                      actor,
                    })
                  })
                }
                return
              }
              iterateChildLeafs(leaf, child => {
                const data = child.data
                switch (data.type) {
                  case 'element':
                    pushOpToQueue(visible, data.ops.visible)
                    break
                  default:
                    console.log('unsupported type', data.type)
                }
              })
            })
          } else {
            mount.watch(({node, leaf}) => {
              //@ts-ignore
              spawnState.setState({leaf})
              const parentBlock = (leaf.data as any).block as LF
              parentBlock.visible = true
              parentBlock.childInitialized = true
              draft.childTemplates.forEach(actor => {
                mountChild({
                  parentBlockFragment: parentBlock.child,
                  leaf,
                  node,
                  actor,
                })
              })
            })
          }
          return {
            itemUpdater,
            mount,
            unmount,
          }
        },
        env,
      })
      const updates = createStore<ListItemType[]>([])
      const mappedUpdates = source.map((x: any) => x)
      const mount = createEvent<LeafMountParams>()
      const mountData = sample({
        source: source as Store<T[]>,
        clock: mount,
        fn: (data, {node, leaf}) => {
          return {
            updates: data,
            node,
            page: leaf.spawn,
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
          page: leaf.spawn,
          leaf,
          hydration: false,
        }),
        greedy: true,
      })
      const updateTriggers = merge([mountData, parentNodeUpdateSpawn])
      sample({
        source: updates,
        clock: updateTriggers,
        greedy: true,
        fn(
          records: ListItemType[],
          {node, page, updates: input, leaf, hydration},
        ) {
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
                  item.instance = spawn(template, {
                    values: {
                      id,
                      store: value,
                    },
                    parentSpawn: page,
                    parentLeaf: leaf,
                    mountNode: node,
                    svgRoot: leaf.svgRoot,
                    leafData: item.leafData,
                    opGroup: group,
                    domSubtree: leaf.ops.domSubtree,
                    hydration,
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
              item.instance = spawn(template, {
                values: {
                  id,
                  store: value,
                },
                parentSpawn: page,
                parentLeaf: leaf,
                mountNode: node,
                svgRoot: leaf.svgRoot,
                leafData: item.leafData,
                opGroup: group,
                domSubtree: leaf.ops.domSubtree,
                hydration,
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
      const unmount = createEvent()
      const onRemove = sample({
        source: mount,
        clock: sample(updates, unmount) as Event<ListItemType[]>,
        fn: ({leaf}, records) => ({leaf, records}),
      })
      onRemove.watch(({leaf, records}) => {
        for (let i = 0; i < records.length; i++) {
          const item = records[i]

          if (item.instance) {
            item.instance.api.unmount()
          }
          item.active = false
        }
        const {spawn: page} = leaf
        page.active = false
        removeItem(page, page.parent!.childSpawns[page.template.id])
        removeItem(page, page.template.pages)
      })
      return {mount, unmount}
    },
    env,
  })
  setInParentIndex(draft, listTemplate)
}

function mountChild({
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
    case 'using':
    case 'listItem':
      break
  }
  const childSpawn = spawn(actor, {
    parentSpawn: leaf.spawn,
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

function removeItem<T>(item: T, list?: T[]) {
  if (!list) return
  const index = list.indexOf(item)
  if (index !== -1) {
    list.splice(index, 1)
  }
}
