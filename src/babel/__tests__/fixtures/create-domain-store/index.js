//@flow
import {createDomain} from 'effector'
const domain = createDomain()
const a = domain.store('bar')
const b = domain.store('h', {option: 'test', ['na' + 'me']: 'LOL'})
const c = domain.store('h', {name: 'test'})
