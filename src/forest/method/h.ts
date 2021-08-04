import {Store, Event, is, launch, createEvent, sample, merge} from 'effector'

import type {StateRef} from '../../effector/index.h'

import type {
  DOMElement,
  ElementDraft,
  NSType,
  PropertyMap,
  StoreOrData,
  DOMProperty,
  StylePropertyMap,
  Leaf,
  LeafDataElement,
  Template,
  HandlerRecord,
  PropertyOperationDef,
  PropertyOperationKind,
} from '../index.h'

import type {ElementBlock, TextBlock} from '../relation.h'

import {pushOpToQueue, forceSetOpValue, createOp} from '../plan'

import {
  applyStyle,
  applyStyleVar,
  applyDataAttr,
  applyAttr,
  applyText,
  applyStaticOps,
} from '../bindings'
import {createTemplate, currentTemplate} from '../template'
import {
  findParentDOMElement,
  findPreviousVisibleSibling,
  findPreviousVisibleSiblingBlock,
} from '../search'
import {
  appendChild,
  onMount as onMountSync,
  mountChildTemplates,
  setInParentIndex,
} from '../mountChild'
import {assertClosure} from '../assert'
import {mutualSample} from '../mutualSample'
import {forIn} from '../forIn'
import {spec} from './spec'

function createPropsOp<T, S>(
  draft: ElementDraft,
  {
    initCtx,
    runOp,
    hooks: {onMount, onState},
  }: {
    initCtx(value: T, leaf: Leaf): S
    runOp(value: T, ctx: S): void
    hooks: {
      onMount: Event<{leaf: Leaf; value: T}>
      onState: Event<{leaf: Leaf; value: T}>
    }
  },
) {
  const opID = draft.opsAmount++
  onMount.watch(({value, leaf}) => {
    const op = createOp({
      value,
      priority: 'props',
      runOp(value) {
        runOp(value, ctx)
      },
      group: leaf.root.leafOps[leaf.fullID].group,
    })
    leaf.root.leafOps[leaf.fullID].group.ops[opID] = op
    const ctx = initCtx(value, leaf)
  })
  onState.watch(({value, leaf}) => {
    pushOpToQueue(value, leaf.root.leafOps[leaf.fullID].group.ops[opID])
  })
}

const syncOperations: Array<{
  field: string
  type: PropertyOperationKind
}> = [
  {type: 'attr', field: 'value'},
  {type: 'attr', field: 'checked'},
  {type: 'attr', field: 'min'},
  {type: 'attr', field: 'max'},
]

const propertyOperationBinding: Record<
  PropertyOperationKind,
  (
    element: DOMElement,
    field: string,
    value: string | number | boolean | null,
  ) => void
> = {
  attr: applyAttr,
  data: applyDataAttr,
  style: applyStyle,
  styleVar: applyStyleVar,
}

const readElement = (leaf: Leaf) => (leaf.data as LeafDataElement).block.value

/** operation family for things represented as <el "thing"="value" /> */
function propertyMapToOpDef(
  draft: ElementDraft,
  type: PropertyOperationKind,
  ops: {
    attr: PropertyMap
    data: PropertyMap
    style: StylePropertyMap
    styleVar: PropertyMap
  },
) {
  draft[type].forEach(record => {
    forIn(record as unknown as PropertyMap, (value, key) => {
      switch (type) {
        case 'data':
        case 'styleVar':
          ops[type][key] = value
          break
        case 'attr':
          ops.attr[key === 'xlink:href' ? 'href' : key] = value
          break
        case 'style':
          if (key.startsWith('--')) {
            ops.styleVar[key.slice(2)] = value
          } else {
            //@ts-expect-error inconsistency in StylePropertyMap key type
            ops.style[key] = value
          }
          break
      }
    })
  })
}

function installTextNode(leaf: Leaf, value: string, childIndex: number) {
  const parentBlock = leaf.data.block as ElementBlock
  const textBlock: TextBlock = {
    type: 'text',
    parent: parentBlock,
    visible: false,
    index: childIndex,
    //@ts-expect-error
    value: null,
  }
  parentBlock.child[childIndex] = textBlock
  if (leaf.hydration) {
    const siblingBlock = findPreviousVisibleSiblingBlock(textBlock)
    if (siblingBlock) {
      switch (siblingBlock.type) {
        case 'text': {
          textBlock.value = leaf.root.env.document.createTextNode(value)
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
    textBlock.value = leaf.root.env.document.createTextNode(value)
    appendChild(textBlock)
  }
  return textBlock
}

function processStoreRef(store: Store<any>) {
  //@ts-expect-error
  const ref: StateRef = store.stateRef
  const templ: Template = currentTemplate!
  if (!templ.plain.includes(ref) && !templ.closure.includes(ref)) {
    templ.closure.push(ref)
  }
}
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
  assertClosure(currentTemplate, 'h')
  const env = currentTemplate.env
  const parentNS = currentTemplate.namespace
  let ns: NSType = parentNS
  let type = 'html'
  ns = type = parentNS === 'svg' ? 'svg' : 'html'
  if (tag === 'svg') {
    type = 'svg'
    ns = 'svg'
  }
  let node: DOMElement
  if (!currentTemplate.isBlock) {
    node =
      type === 'svg'
        ? env.document.createElementNS('http://www.w3.org/2000/svg', tag)
        : env.document.createElement(tag)
  }
  const stencil = node!
  const draft: ElementDraft = {
    type: 'element',
    tag,
    attr: [],
    data: [],
    text: [],
    style: [],
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
    fn(_, {mount}) {
      //@ts-expect-error
      const domElementCreated = createEvent<Leaf>({named: 'domElementCreated'})

      if (hasCb) {
        cb()
      }
      if (hasOpts) {
        spec(opts)
      }
      if (is.unit(draft.visible)) {
        draft.seq.push({type: 'visible', value: draft.visible})
        processStoreRef(draft.visible)
      }
      const ops: {
        attr: PropertyMap
        data: PropertyMap
        style: StylePropertyMap
        styleVar: PropertyMap
      } = {
        attr: {},
        data: {},
        style: {},
        styleVar: {},
      }
      propertyMapToOpDef(draft, 'attr', ops)
      propertyMapToOpDef(draft, 'data', ops)
      propertyMapToOpDef(draft, 'style', ops)
      propertyMapToOpDef(draft, 'styleVar', ops)
      forIn(ops, (opsMap, type) => {
        forIn(opsMap as unknown as PropertyMap, (value, field) => {
          if (is.unit(value)) {
            draft.seq.push({type, field, value})
            processStoreRef(value)
          } else {
            draft.staticSeq.push({type, field, value})
          }
        })
      })
      draft.text.forEach(item => {
        if (item.value === null) return
        if (is.unit(item.value)) {
          draft.seq.push({
            type: 'dynamicText',
            value: item.value,
            childIndex: item.index,
          })
          processStoreRef(item.value)
        } else {
          draft.seq.push({
            type: 'staticText',
            value: String(item.value),
            childIndex: item.index,
          })
        }
      })
      draft.handler.forEach(item => {
        forIn(item.map, (handler, key) => {
          draft.seq.push({
            type: 'handler',
            for: key,
            //@ts-expect-error
            handler,
            options: item.options,
            domConfig: item.domConfig,
          })
        })
      })
      if (stencil) applyStaticOps(stencil, draft.staticSeq)
      draft.seq.forEach(item => {
        switch (item.type) {
          case 'visible': {
            const {onMount, onState} = mutualSample({
              mount,
              state: item.value,
              onMount: (value, leaf) => ({
                leaf,
                value,
                hydration: leaf.hydration,
              }),
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
                ? (parentBlock.value as SVGSVGElement)
                : null
              mountChildTemplates(draft, {
                parentBlockFragment: parentBlock,
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
                    page: leaf,
                    defer: true,
                    //@ts-expect-error
                    forkPage: leaf.root.forkPage,
                  })
                }
              }
              launch({
                target: domElementCreated,
                params: leaf,
                defer: true,
                page: leaf,
                //@ts-expect-error
                forkPage: leaf.root.forkPage,
              })
            })
            merge([onState, onMount]).watch(({leaf, value, hydration}) => {
              const leafData = leaf.data as LeafDataElement
              const visibleOp = leafData.ops.visible
              if (!hydration) {
                pushOpToQueue(value, visibleOp)
              }
            })
            break
          }
          case 'attr':
          case 'data':
          case 'style':
          case 'styleVar': {
            const fn = propertyOperationBinding[item.type]
            const immediate = syncOperations.some(
              ({type, field}) => item.type === type && item.field === field,
            )
            const hooks = mutualSample({
              mount: domElementCreated,
              state: item.value,
              onMount: (value, leaf) => ({leaf, value}),
              onState: (leaf, value) => ({leaf, value}),
            })
            if (immediate) {
              merge([hooks.onState, hooks.onMount]).watch(({leaf, value}) => {
                fn(readElement(leaf), item.field, value)
              })
            } else {
              createPropsOp(draft, {
                initCtx(value: DOMProperty, leaf) {
                  const element = readElement(leaf)
                  fn(element, item.field, value)
                  return element
                },
                runOp(value, element: DOMElement) {
                  fn(element, item.field, value)
                },
                hooks,
              })
            }
            break
          }
          case 'dynamicText':
            createPropsOp(draft, {
              initCtx(value: string, leaf) {
                return installTextNode(leaf, value, item.childIndex)
              },
              runOp(value, ctx: TextBlock) {
                applyText(ctx.value, value)
              },
              hooks: mutualSample({
                mount: domElementCreated,
                state: item.value,
                onMount: (value, leaf) => ({leaf, value: String(value)}),
                onState: (leaf, value) => ({leaf, value: String(value)}),
              }),
            })
            break
          case 'staticText':
            domElementCreated.watch(leaf => {
              installTextNode(leaf, item.value, item.childIndex)
            })
            break
          case 'handler': {
            const handlerTemplate: Template | null =
              //@ts-expect-error
              item.handler.graphite.meta.nativeTemplate || null
            domElementCreated.watch(leaf => {
              let page: Leaf | null = null
              if (handlerTemplate) {
                let handlerPageFound = false
                let currentPage: Leaf | null = leaf
                while (!handlerPageFound && currentPage) {
                  if (currentPage.template === handlerTemplate) {
                    handlerPageFound = true
                    page = currentPage
                  } else {
                    currentPage = currentPage.parent
                  }
                }
              } else {
                page = leaf
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
                    //@ts-expect-error
                    forkPage: leaf.root.forkPage,
                  })
                },
                item.domConfig,
              )
            })
            break
          }
        }
      })
      mount.watch(leaf => {
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
            ? (parentBlock.value as SVGSVGElement)
            : null
          mountChildTemplates(draft, {
            parentBlockFragment: parentBlock,
            leaf,
            node: parentBlock.value,
            svgRoot,
          })
          launch({
            target: domElementCreated,
            params: leaf,
            defer: true,
            page: leaf,
            //@ts-expect-error
            forkPage: leaf.root.forkPage,
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
                page: leaf,
                defer: true,
                //@ts-expect-error
                forkPage: leaf.root.forkPage,
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
}
