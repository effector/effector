//@flow
import {createDomain} from 'effector'

const domain = createDomain()

const a = domain.event()
const f = () => domain.event()