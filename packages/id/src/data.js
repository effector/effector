//@flow

import invariant from 'invariant'

import {ID} from './class'
import type {Shape} from './index.h'
import {fromString} from './int'

export function serialize(id: ID): Shape {
 return {id: id.id}
}

export function deserialize(shape: mixed) {
 invariant(
  typeof shape === 'object' && shape != null && typeof shape.id === 'string',
  'incorrect ID shape',
 )
 return new ID(fromString(shape.id))
}
