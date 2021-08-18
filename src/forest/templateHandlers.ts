import type {StateRef, StateRefOp, Node, Cmd} from '../effector/index.h'
import type {TemplateHandlers, Template} from './index.h'

const addRefOp = (ref: StateRef, op: StateRefOp) => {
  if (!ref.before) ref.before = []
  ref.before!.push(op as any)
}

const includes = <T>(arr: T[], value: T) => arr.includes(value)

export const handlers: TemplateHandlers = {
  storeBase(template: Template, plainState: StateRef, oldState: StateRef) {
    template.plain.push(plainState, oldState)
  },
  storeOnMap(
    template: Template,
    plainState: StateRef,
    seq: (Cmd | void)[],
    fromRef: StateRef | false,
  ) {
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
  },
  storeMap(template: Template, plainState: StateRef, linkNode: Node) {
    if (
      !includes(template.plain, plainState) &&
      !includes(linkNode.seq, template.loader)
    ) {
      linkNode.seq.unshift(template.loader)
    }
  },
  storeWatch(
    template: Template,
    plainState: StateRef,
    fn: (value: unknown) => unknown,
  ) {
    template.watch.push({of: plainState, fn})
    return true
  },
  eventPrepend(template: Template, contramapped: Node) {
    contramapped.seq.push(template.upward)
  },
  combineBase(template: Template, rawShape: StateRef, isFresh: StateRef) {
    template.plain.push(rawShape, isFresh)
  },
  combineField(template: Template, childRef: StateRef, linkNode: Node) {
    if (!includes(template.plain, childRef)) {
      linkNode.seq.unshift(template.loader)
    }
  },
  splitBase(template: Template, lastValues: StateRef) {
    template.plain.push(lastValues)
  },
  splitMatchStore(template: Template, storeRef: StateRef, linkNode: Node) {
    if (!includes(template.plain, storeRef)) {
      linkNode.seq.unshift(template.loader)
    }
  },
  sampleStoreSource(template: Template, sourceRef: StateRef) {
    if (
      !includes(template.plain, sourceRef) &&
      !includes(template.closure, sourceRef)
    ) {
      template.closure.push(sourceRef)
    }
  },
  sampleNonStoreSource(
    template: Template,
    hasSource: StateRef,
    sourceState: StateRef,
    clockState: StateRef,
  ) {
    template.plain.push(hasSource, sourceState, clockState)
  },
  sampleTarget(template: Template, target: Node) {
    target.seq.push(template.loader)
  },
  sampleSourceLoader: (template: Template) => template.loader,
  sampleSourceUpward: (template: Template, isUpward: boolean) =>
    isUpward && template.upward,
}
