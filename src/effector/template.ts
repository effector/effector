import type {StateRef, Node, Cmd} from './index.h'
import {readTemplate} from './region'
import {includes} from './collection'
import type {Template} from '../forest/index.h'
import {addRefOp} from './stateRef'

function onTemplate<T>(fn: (template: Template) => T): T | void {
  const template = readTemplate()
  if (template) return fn(template)
}
export const storeTempl = {
  initStore(plainState: StateRef, oldState: StateRef) {
    onTemplate(template => {
      template.plain.push(plainState, oldState)
    })
  },
  initOnMap(
    plainState: StateRef,
    seq: (Cmd | void)[],
    fromRef: StateRef | false,
  ) {
    onTemplate(template => {
      seq.unshift(template.loader)
      seq.push(template.upward)
      if (fromRef) {
        if (!includes(template.plain, fromRef)) {
          //if (!includes(seq, template.loader)) {
          //  seq.unshift(template.loader)
          //}
          if (!includes(template.closure, fromRef)) {
            template.closure.push(fromRef)
          }
          addRefOp(plainState, {
            type: 'closure',
            of: fromRef,
          })
        }
      } else {
        //if (!includes(seq, template.loader)) {
        //  seq.unshift(template.loader)
        //}
      }
    })
  },
  initMap(plainState: StateRef, linkNode: Node) {
    onTemplate(template => {
      if (
        !includes(template.plain, plainState) &&
        !includes(linkNode.seq, template.loader)
      ) {
        linkNode.seq.unshift(template.loader)
      }
    })
  },
  initWatch(plainState: StateRef, fn: (value: unknown) => unknown) {
    return onTemplate(template => {
      template.watch.push({of: plainState, fn})
      return true
    })
  },
}
export const eventTempl = {
  initPrepend(contramapped: Node) {
    onTemplate(template => {
      contramapped.seq.push(template.upward)
    })
  },
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
