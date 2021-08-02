import {Store, Event, is, launch, createEvent, sample, merge} from 'effector'

import type {StateRef} from '../../effector/index.h'

import type {
  DOMElement,
  ElementDraft,
  MergedBindings,
  NSType,
  PropertyMap,
  StoreOrData,
  DOMProperty,
  StylePropertyMap,
  Leaf,
  LeafDataElement,
  Template,
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
import {spec} from './spec'

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
    fn(_, {mount}) {
      //@ts-expect-error
      const domElementCreated = createEvent<Leaf>({named: 'domElementCreated'})
      function valueElementMutualSample(value: Store<DOMProperty>) {
        return mutualSample({
          mount: domElementCreated,
          state: value,
          onMount: (value, leaf) => ({leaf, value}),
          onState: (leaf, value) => ({leaf, value}),
        })
      }
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
        processStoreRef(merged.visible)
      }
      for (const attr in merged.attr) {
        const value = merged.attr[attr]
        if (is.unit(value)) {
          draft.seq.push({
            type: 'attr',
            field: attr,
            value,
          })
          processStoreRef(value)
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
          processStoreRef(value)
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
          processStoreRef(value)
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
          processStoreRef(value)
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
          processStoreRef(item.value)
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
            //@ts-expect-error
            handler: item.map[key],
            options: item.options,
            domConfig: item.domConfig,
          })
        }
      }
      if (merged.visible) {
        const {onMount, onState} = mutualSample({
          mount,
          state: merged.visible,
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
                  group: leaf.root.leafOps[leaf.fullID].group,
                })
                leaf.root.leafOps[leaf.fullID].group.ops[opID] = op
                applyAttr(element, field, value)
              })
              onState.watch(({value, leaf}) => {
                pushOpToQueue(
                  value,
                  leaf.root.leafOps[leaf.fullID].group.ops[opID],
                )
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
                group: leaf.root.leafOps[leaf.fullID].group,
              })
              leaf.root.leafOps[leaf.fullID].group.ops[opID] = op
              applyDataAttr(element, field, value)
            })
            onState.watch(({value, leaf}) => {
              pushOpToQueue(
                value,
                leaf.root.leafOps[leaf.fullID].group.ops[opID],
              )
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
                group: leaf.root.leafOps[leaf.fullID].group,
              })
              leaf.root.leafOps[leaf.fullID].group.ops[opID] = op
              applyStyle(element, field, value)
            })
            onState.watch(({value, leaf}) => {
              pushOpToQueue(
                value,
                leaf.root.leafOps[leaf.fullID].group.ops[opID],
              )
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
                group: leaf.root.leafOps[leaf.fullID].group,
              })
              leaf.root.leafOps[leaf.fullID].group.ops[opID] = op
              applyStyleVar(element, field, value)
            })
            onState.watch(({value, leaf}) => {
              pushOpToQueue(
                value,
                leaf.root.leafOps[leaf.fullID].group.ops[opID],
              )
            })
            break
          }
          case 'staticText': {
            domElementCreated.watch(leaf => {
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
                group: leaf.root.leafOps[leaf.fullID].group,
              })
              leaf.root.leafOps[leaf.fullID].group.ops[opID] = op
              const textBlock = installTextNode(leaf, value, item.childIndex)
            })
            sample({
              source: domElementCreated,
              clock: item.value,
              fn: (leaf, text) => ({leaf, text}),
              greedy: true,
            }).watch(({leaf, text}) => {
              pushOpToQueue(
                text,
                leaf.root.leafOps[leaf.fullID].group.ops[opID],
              )
            })
            break
          }
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
      }
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
  function readElement(leaf: Leaf) {
    return (leaf.data as LeafDataElement).block.value
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
}
