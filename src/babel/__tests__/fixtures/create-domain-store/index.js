//@flow
import {createDomain} from 'effector'

const domain = createDomain()

const a = domain.store('bar')
const b = domain.store('h', {option: 'test', ['na' + 'me']: 'LOL'})
const c = domain.store('h', {name: 'test'})
//$off
const d = domain.store('h', null)
//$off
const e = domain.store('h', 4234)
const f = domain.store('h', {})
