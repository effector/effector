//@flow
import {createDomain} from 'effector'

const domain = createDomain()

const a = domain.effect()
const f = () => domain.effect()
const b = domain.effect('hello')
const g = () => domain.effect('baz')
