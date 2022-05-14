import {createDomain} from 'effector'
import {createGate} from 'effector-react'
import {createGate as renamedGate} from 'effector-react/scope'

const Gate1 = createGate()
const Gate2 = createGate('gate2')
const Gate3 = createGate({
  defaultState: {a: 1},
  domain: createDomain(),
  name: 'gate3',
})

const TheGate1 = renamedGate()
const TheGate2 = renamedGate('gate2')
const TheGate3 = renamedGate({
  defaultState: {a: 1},
  domain: createDomain(),
  name: 'gate3',
})
