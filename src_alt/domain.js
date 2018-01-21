//@flow

import {DiscreteSpace, UniversalSpace, OptionSpace} from './discrete-space'
import {message, Message} from './message'
import {Effect} from './effect'
import {Act, type ActTag} from './act'
import {getDomainId} from './register'

export class Domain {
  path: string[]
  domainId: number = getDomainId()
  symbolicId: Symbol = Symbol(`domain/${this.domainId}`)
  commit: (act: any) => void
  constructor(
    path: string[], commit: (act: any) => void
  ) {
    this.commit = commit
    this.path = path
    //$off
    this.subdomain = this.subdomain.bind(this)
    //$off
    this.message = this.message.bind(this)
    //$off
    this.effect = this.effect.bind(this)
  }
  subdomain(name: string) {
    return new Domain([...this.path, name], (act: any) => this.commit(act))
  }
  message<P>(name: string): Message<P, 'act'> {
    const {domainId} = this
    const type = [...this.path, name].join('/')
    const onMessage = (
      typeId: number,
      type: string,
      payload: P
    ): Act<P> => {
      const act: Act<P> = new Act(typeId, type, payload)
      act.domainId = domainId
      this.commit(act)
      return act
    }
    const destructuring = (act: Act<P>): P => act.payload
    const msg = new Message(
      type,
      onMessage,
      destructuring
    )
    return msg
  }
  effect<A, D, E>(name: string): Effect<A, D, E> {
    return new Effect([...this.path, name].join('/'))
  }
}

export const getRoot = () => new Domain([], (act: any) => {
  console.warn(`Commit into unbounded domain`, act)
})
