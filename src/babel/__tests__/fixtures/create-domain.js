//@flow
import {createDomain} from 'effector'

const domain = createDomain()
const foo = createDomain('bar')

const {sid} = createDomain()
const {name} = createDomain('foo')
const {shortName} = createDomain({name: 'foo'})
