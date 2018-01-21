//@flow

import type {Message} from './message'
import {getFieldId, getValueId} from './register'

export class Field<State> {
  fieldId: number = getFieldId()
  symbolicId: Symbol = Symbol(`field/${this.fieldId}`)
  messageMap: Map<
    number,
    (state: State, payload: any) => State
  > = new Map()
  on<Payload>(
    message: Message<Payload>,
    reducer: (state: State, payload: Payload) => State
  ): this {
    this.messageMap.set(message.typeId, reducer)
    return this
  }
}

export class Value<Type> {
  currentValue: Type
  nextValue: Type
  valueId: number = getValueId()
  fieldRefId: number
  symbolicId: Symbol = Symbol(`value/${this.valueId}`)
  constructor(fieldRefId: number, defaults: Type) {
    this.currentValue = defaults
    this.nextValue = defaults
    this.fieldRefId = fieldRefId
  }
  incomingMessage<Payload>(
    payload: Payload,
    reducer: (state: Type, payload: Payload) => Type
  ) {
    this.nextValue = reducer(this.nextValue, payload)
  }
  nextTurn() {
    this.currentValue = this.nextValue
  }
}

