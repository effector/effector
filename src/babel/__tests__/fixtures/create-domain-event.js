//@flow
import {createDomain} from 'effector'

const domain = createDomain()

const a = domain.event()
const f = () => domain.event()
const b = domain.event('asm')
const g = () => domain.event('tasm')
