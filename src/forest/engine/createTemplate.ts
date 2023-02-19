import {
  Store,
  Event,
  launch,
  step,
  createNode,
  withRegion,
  restore,
  createEvent,
} from 'effector'
import type {Stack} from '../../effector/index.h'
import type {Leaf, NSType, Template, NodeDraft} from '../index.h'
import {handlers} from '../templateHandlers'

let templateID = 0
export let currentTemplate: Template | null = null

export function createTemplate<Api extends {[method: string]: any}>(config: {
  fn: (
    state: {
      [field: string]: Store<any>
    },
    triggers: {
      mount: Event<Leaf>
    },
  ) => {[K in keyof Api]: Event<Api[K]>}
  state?: {[field: string]: any}
  defer?: boolean
  name: string
  isSvgRoot: boolean
  draft: NodeDraft
  namespace: NSType
  env: {
    document: Document
  }
  isBlock?: boolean
}): Template
//@ts-expect-error
export function createTemplate(config: {
  fn: (
    state: {
      [field: string]: Store<any>
    },
    triggers: {
      mount: Event<Leaf>
    },
  ) => void
  state?: {[field: string]: any}
  defer?: boolean
  name: string
  isSvgRoot: boolean
  draft: NodeDraft
  namespace: NSType
  env: {
    document: Document
  }
  isBlock?: boolean
}): Template
export function createTemplate<Api extends {[method: string]: any}>({
  fn,
  state: values = {},
  defer = false,
  name = '',
  draft,
  isSvgRoot,
  namespace,
  env,
  isBlock = false,
}: {
  fn: (
    state: {
      [field: string]: Store<any>
    },
    triggers: {
      mount: Event<Leaf>
    },
  ) => {[K in keyof Api]: Event<Api[K]>}
  state?: {[field: string]: any}
  defer?: boolean
  name: string
  isSvgRoot: boolean
  draft: NodeDraft
  namespace: NSType
  env: {
    document: Document
  }
  isBlock?: boolean
}): Template {
  const parent = currentTemplate
  const template: Template = {
    id: ++templateID,
    name,
    plain: [],
    watch: [],
    nameMap: {},
    pages: [],
    closure: [],
    childTemplates: [],
    handlers,
    // @ts-expect-error
    upward: step.filter({
      //@ts-expect-error
      fn(upd, scope, stack: Stack) {
        if (!stack.page) {
          if (stack.parent && stack.parent.page) {
            stack.page = stack.parent.page
          } else {
            // console.error('context lost', stack)
            return true
          }
        }
        if (!stack.page.root.activeSpawns.has(stack.page.fullID)) {
          console.count('inactive page upward')
          return false
        }
        const stackTemplates = [stack.page.template]
        const stackPages = [stack.page]
        {
          let currentStackPage = stack.page.parent
          while (currentStackPage) {
            stackPages.push(currentStackPage)
            stackTemplates.push(currentStackPage.template)
            currentStackPage = currentStackPage.parent
          }
        }
        stack.node.next.forEach(node => {
          /**
           * node.meta.nativeTemplate is used in units
           * it represents template in which unit was created (belongs to)
           */
          const targetTemplate: Template | void = node.meta.nativeTemplate
          if (targetTemplate) {
            if (stackTemplates.includes(targetTemplate)) {
              const page = stackPages[stackTemplates.indexOf(targetTemplate)]
              //@ts-expect-error
              launch({
                target: node,
                params: upd,
                defer: true,
                page,
                stack,
                scope: stack.scope,
              })
            } else {
              console.error('context drift', {stack, node})
            }
          } else {
            //@ts-expect-error
            launch({
              target: node,
              params: upd,
              defer: true,
              page: stack.page,
              stack,
              scope: stack.scope,
            })
          }
        })
        return false
      },
    }),
    // @ts-expect-error
    loader: step.filter({
      //@ts-expect-error
      fn(upd, scope, stack: Stack) {
        if (stack.parent) {
          const forkId = stack.scope ? stack.scope.graphite.id : null
          if (stack.page) {
            if (!stack.page.root.activeSpawns.has(stack.page.fullID)) {
              console.count('inactive page loader')
              return false
            }
            if (stack.page.template === template) {
              return true
            }

            if (stack.page.root.childSpawns[stack.page.fullID][template.id]) {
              const fullID = stack.page!.fullID
              stack.page.root.childSpawns[fullID][template.id].forEach(page => {
                if (forkId) {
                  if (
                    !page.root.scope ||
                    forkId !== page.root.scope.graphite.id
                  )
                    return
                }
                //@ts-expect-error
                launch({
                  params: upd,
                  target: stack.node,
                  page,
                  defer: true,
                  scope: stack.scope,
                })
              })
            } else {
              const fullID = stack.page.fullID
              const isRecTemplate = stack.page.template.name === 'rec'

              template.pages.forEach(page => {
                if (forkId) {
                  if (
                    !page.root.scope ||
                    forkId !== page.root.scope.graphite.id
                  )
                    return
                }
                if (
                  page.fullID === fullID ||
                  page.fullID.startsWith(`${fullID}_`)
                ) {
                  let validTarget = true
                  if (isRecTemplate) {
                    const recID = stack.page!.template.id
                    let parentPage = page.parent
                    while (parentPage) {
                      if (parentPage === stack.page) {
                        break
                      }
                      if (parentPage.template.id === recID) {
                        validTarget = false
                        break
                      }
                      parentPage = parentPage.parent
                    }
                  }
                  if (validTarget) {
                    //@ts-expect-error
                    launch({
                      params: upd,
                      target: stack.node,
                      page,
                      defer: true,
                      scope: stack.scope,
                    })
                  }
                } else {
                  if (fullID.startsWith(`${page.fullID}_`)) {
                    //@ts-expect-error
                    launch({
                      params: upd,
                      target: stack.node,
                      page: stack.page,
                      defer: true,
                      scope: stack.scope,
                    })
                  } else {
                    // console.count('no page match')
                  }
                }
              })
            }
          } else {
            template.pages.forEach(page => {
              if (forkId) {
                if (!page.root.scope || forkId !== page.root.scope.graphite.id)
                  return
              }
              //@ts-expect-error
              launch({
                params: upd,
                target: stack.node,
                page,
                defer: true,
                scope: stack.scope,
              })
            })
          }
          return false
        }
        return true
      },
    }),
    parent,
    node: null as any,
    api: null as any,
    trigger: {
      //@ts-expect-error
      mount: createEvent<Leaf>({named: 'mount'}),
    },
    draft,
    isSvgRoot,
    namespace,
    env,
    isBlock: isBlock || !!(parent && parent.isBlock),
  }
  if (parent) {
    parent.childTemplates.push(template)
  }
  const node = createNode({
    meta: {
      template,
    },
  })
  // @ts-expect-error internal and public Node types are different
  template.node = node
  currentTemplate = template
  if (!defer) {
    withRegion(node, () => {
      const state = restore(values)
      template.api = fn(state, template.trigger)
      template.nameMap = state
    })
  } else {
    template.deferredInit = () => {
      const prevTemplate = currentTemplate
      currentTemplate = template
      template.deferredInit = null
      try {
        withRegion(node, () => {
          const state = restore(values)
          template.api = fn(state, template.trigger)
          template.nameMap = state
        })
      } finally {
        currentTemplate = prevTemplate
      }
    }
  }
  currentTemplate = parent
  return template
}
