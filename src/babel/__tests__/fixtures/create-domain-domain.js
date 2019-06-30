//@flow
import {createDomain} from 'effector'

const domain = createDomain()
const foo = domain.domain()
const bar = domain.domain('baz')
