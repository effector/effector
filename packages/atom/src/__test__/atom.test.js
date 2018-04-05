//@flow

import {atom} from '../atom'

test('atom smoke', () => {
 const str = atom('foo')
 expect(str.get()).toBe('foo')
 str.set('bar')
 expect(str.get()).toBe('bar')
})
