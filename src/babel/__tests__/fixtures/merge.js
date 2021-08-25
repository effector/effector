import {createEvent, merge} from 'effector'

const foo = createEvent()

const a = merge([foo])
const b = merge([foo], {})
const {sid} = merge([foo])

merge([foo])

const args = [[foo]]

const c = merge(...args)
