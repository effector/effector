//@flow

import Emitter from 'eventemitter2'

import {Set, Map} from 'immutable'
import {getActorId, putHead, pullHead, type ActorId, type Route} from './id'

import {emitter} from './pubsub'

type ActorCommandType
  = 'subscribe'
  | 'unsubscribe'

type ActorCommand<Type = ActorCommandType, Event = string> = {
  command: Type,
  event: Event,
  sourceActorId: ActorId,
}

function sendMessage(target: ActorId, message: any) {
  emitter.emit(`message/${target}`, message)
}



const idNameMap: Map<ActorId, string> = new Map
const nameIdMap: Map<string, ActorId> = new Map
const actorMap: Map<ActorId, AbstractActor> = new Map
const actorKindMap: Map<*, Class<AbstractActor>> = new Map

function registerActor(name: string, actorId: ActorId, actor: AbstractActor) {
  if (idNameMap.has(actorId) || actorMap.has(actorId)) {
    throw new Error(`Actor ${actorId} is already registered`)
  }
  if (nameIdMap.has(name)) {
    throw new Error(`Name ${name} is already registered`)
  }
  idNameMap.set(actorId, name)
  nameIdMap.set(name, actorId)
  actorMap.set(actorId, actor)
}

// function confirmMessage(target: ActorId, message: any) {
//   emitter.emit(`message/${target}`, message)
// }

// type ParentRef = <T>(
//   message: {
//     value: T,
//     route: Route,
//   }
// )

export type ActorLifecycle
 = 'mount'
 | 'idle'
 | 'active'
 | 'unmount'

type ActorShape<Kind/*:::string*/ = 'Actor', Props = void> = {
  actorKind: Kind,
  actorId: ActorId,
  status: ActorLifecycle,
  props: Props,
  run(props: Props): void,
  init(): Promise<void>,
}

interface ActorKind<Kind/*:::string*/, Props, Type/*:::ActorShape<Kind, Props>*/> {
  // constructor(that: Type): void,
}
function ensureGet(field, map) {
  const setRaw = map.get(field)
  const set = setRaw
    ? setRaw
    : Set()
  return set
}
export class AbstractActor {
  childrens: Map<string, Set<ActorId>> = Map()
  actorKind: *
  status: ActorLifecycle
  actorId: ActorId = getActorId()
  emitter: Emitter = new Emitter(emitterConfig)
  // pushMessage: ()
  constructor() {
    this.status = 'mount'
    // this.name = name
    registerActor(this.actorKind, this.actorId, this)
    this.status = 'idle'
  }
  onIncomingMessage<Type/*:::ActorCommandType*/, Event/*:::string*/>(message: ActorCommand<Type, Event>) {
    const {
      command,
      event,
      sourceActorId,
    } = message
    let set = this.childrens.get(event, Set())
    switch (command) {
      case 'subscribe': {
        set = set.add(sourceActorId); break
      }
      case 'unsubscribe': {
        set = set.delete(sourceActorId); break
      }
    }
    this.childrens = set.isEmpty()
      ? this.childrens.delete(event)
      : this.childrens.set(event, set)
    emitter.once(`forget/${sourceActorId}`, this.forget(event, sourceActorId))
  }
  forget = (event: string, sourceActorId: ActorId) => () => {
    const set = this.childrens.get(event)
    if (!set) return
    const setCut = set.delete(sourceActorId)
    this.childrens = setCut.isEmpty()
      ? this.childrens.delete(event)
      : this.childrens.set(event, setCut)
  }
  onTerminate = (() => {
    const onIncoming = this.onIncomingMessage.bind(this)
    emitter.on(`command/${this.actorId}`, onIncoming)
    const unsubscribeCommand = () => {
      emitter.off(`command/${this.actorId}`, onIncoming)
      emitter.emit(`forget/${this.actorId}`)
    }
    return unsubscribeCommand
  })()
  run(props: *) { }
  async init() {}
}

function Actor<Kind/*:::string*/, Props>(
  kind: Kind
): Class<AbstractActor> {
  const cachedActor = actorKindMap.get((kind: Kind))
  if (cachedActor) {
    return (cachedActor: Class<AbstractActor>)
  }
  class Actor extends AbstractActor {
    props: Props
    actorKind: Kind
  }
  Actor.prototype.actorKind = kind
  actorKindMap.set(kind, Actor)
  return Actor
}

export class EpicActor<Props = void> extends Actor(('Epic': 'Epic')) {
  props: Props


}

const emitterConfig = {
  delimiter: '/',
  maxListeners: 50,
  wildcard: true,
}
