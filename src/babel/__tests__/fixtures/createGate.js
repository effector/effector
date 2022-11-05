import {createGate} from 'effector-react'
import {createGate as createGateScope} from 'effector-react/scope'

{
  const Empty = createGate()
  const Name = createGate('Foo')
  const ConfigObject = createGate({defaultState: 0})
  const config = {defaultState: 0}
  const ConfigVariable = createGate(config)
}

{
  const Empty = createGateScope()
  const Name = createGateScope('Foo')
  const ConfigObject = createGateScope({defaultState: 0})
  const config = {defaultState: 0}
  const ConfigVariable = createGateScope(config)
}
