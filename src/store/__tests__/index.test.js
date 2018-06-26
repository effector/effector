//@flow

import {createStore} from '..'
import {createEvent} from 'effector/event'
import {spy} from 'effector/fixtures'

test('.map', () => {
 const newWord = createEvent<string>()
 const a = createStore('word').on(newWord, (_, word) => word)

 const b = a.map(word => word.length)

 const sum = b.map((ln, prevLn) => ln + prevLn, 0)

 sum.watch(spy)

 expect(a.getState()).toBe('word')
 expect(b.getState()).toBe(4)
 expect(sum.getState()).toBe(4)

 newWord('lol')

 expect(a.getState()).toBe('lol')
 expect(b.getState()).toBe(3)
 expect(sum.getState()).toBe(7)

 newWord('long word')

 expect(a.getState()).toBe('long word')
 expect(b.getState()).toBe(9)
 expect(sum.getState()).toBe(16)

 expect(spy).toHaveBeenCalledTimes(3)

 newWord('')

 expect(spy).toHaveBeenCalledTimes(3)
})
