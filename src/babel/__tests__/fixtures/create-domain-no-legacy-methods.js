import {createDomain} from 'effector'
import {importedDomain} from './local-file'

const created = createDomain('created')

const event = created.createEvent()
const eventShort = created.event()
const eventImported = importedDomain.event('name')

const effect = created.createEffect(() => 0)
const effectShort = created.effect({handler: () => 0})
const effectImported = importedDomain.effect(() => 0, {name: 'name'})

const store = created.createStore(0)
const storeShort = created.store(0, {name: 'short'})
const storeImported = importedDomain.store('value')

const domain = created.createDomain()
const domainShort = created.domain('name')
const domainImported = importedDomain.domain()

createDomain({name: 'second', domain: created})
