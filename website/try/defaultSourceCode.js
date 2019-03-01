//@flow

export default `const trigger = createEvent('trigger update')
const repeat = createEvent('repeat')
const fooStore = createStore(10)
	.on(trigger, n => n + 1)
setStoreName(fooStore, 'foo')
const asText = fooStore.map(n => n.toString(36))
setStoreName(asText, 'asText')
const s3 = combine(fooStore, asText, (foo, text) => ({
  foo, text,
}))

s3.watch(e => {
  console.log('s3', e)
})

trigger.watch(e => {
  console.warn('trigger', e)
})

trigger('first')
trigger('second')

`
