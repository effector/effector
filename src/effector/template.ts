import type {StateRef, Node} from './index.h'
import {readTemplate} from './region'
import {includes} from './collection'
function onTemplate<T>(fn: (template: any) => T): T | void {
  const template = readTemplate()
  if (template) return fn(template)
}
export const combineTempl = {
  initBase(rawShape: StateRef, isFresh: StateRef) {
    onTemplate(template => {
      template.plain.push(rawShape, isFresh)
    })
  },
  initField(childRef: StateRef, linkNode: Node) {
    onTemplate(template => {
      if (!includes(template.plain, childRef)) {
        linkNode.seq.unshift(template.loader)
      }
    })
  },
}

export const splitTempl = {
  initBase(lastValues: StateRef) {
    onTemplate(template => {
      template.plain.push(lastValues)
    })
  },
  initMatchStore(storeRef: StateRef, linkNode: Node) {
    onTemplate(template => {
      if (!includes(template.plain, storeRef)) {
        linkNode.seq.unshift(template.loader)
      }
    })
  },
}

export const sampleTempl = {
  initStoreSource(sourceRef: StateRef) {
    onTemplate(template => {
      if (
        !includes(template.plain, sourceRef) &&
        !includes(template.closure, sourceRef)
      ) {
        template.closure.push(sourceRef)
      }
    })
  },
  initNonStoreSource(
    hasSource: StateRef,
    sourceState: StateRef,
    clockState: StateRef,
  ) {
    onTemplate(template => {
      template.plain.push(hasSource, sourceState, clockState)
    })
  },
  initTarget(target: Node) {
    onTemplate(template => {
      target.seq.push(template.loader)
    })
  },
  sourceLoader: () => onTemplate(template => template.loader),
  sourceUpward: (isUpward: boolean) =>
    onTemplate(template => isUpward && template.upward),
}
