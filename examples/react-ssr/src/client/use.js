//@flow

import {loadAll, saveAll} from '../app/store/event'

import type {PersistData} from '../app/index.h'

saveAll.use(data => {
 localStorage.setItem('app:todos', JSON.stringify(data))
})

loadAll.use(() => {
 const str = localStorage.getItem('app:todos')
 if (typeof str !== 'string') throw 'nothing to load'
 const data: PersistData = JSON.parse(str)
 return data
})
