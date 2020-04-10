//@flow
import {createDomain} from 'effector'

const domain = createDomain()

const a = domain.event()
const f = () => domain.event()
const b = domain.event('asm')
const g = () => domain.event('tasm')
const aAlias = domain.createEvent()
const fAlias = () => domain.createEvent()
const bAlias = domain.createEvent('asmAlias')
const gAlias = () => domain.createEvent('tasmAlias')

const {sid} = domain.createEvent()
const {name} = domain.createEvent('foo')
const {shortName} = domain.createEvent({name: 'foo'})
