//@flow

import {readKind} from './readKind'

import * as Kind from './index.h'

export function isStore(value: mixed) {
 return readKind(value) === (1: Kind.Store)
}

export function isEvent(value: mixed) {
 return readKind(value) === (2: Kind.Event)
}

export function isEffect(value: mixed) {
 return readKind(value) === (3: Kind.Effect)
}

export function isNone(value: mixed) {
 return readKind(value) === (-1: Kind.None)
}
