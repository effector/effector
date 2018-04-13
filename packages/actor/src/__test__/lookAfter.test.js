//@flow

import {createActor, readAllIncoming} from '..'

test('look after', async() => {
 const actorA = createActor([{count: 0}])
 const actorB = createActor([{done: 0, fail: 0}]).after(
  ([state], e) => {
   switch (e) {
    case 'fail':
     return {done: false, state}
    case 'done':
     return {done: true, state}
    default:
     return
   }
  },
  async(ctx, e, that) => {
   if (ctx.done) ctx.state.done += 1
   else ctx.state.fail += 1
  },
 )

 actorB.lookAfter(async(err, e, that) => {
  console.log(e)
  console.log(err)
  await that.sendMessage('fail', that)
 }, actorA)

 actorA.after(
  (_, e) => {
   if (e === 'run fail')
    return () => Promise.reject(new Error('just as planned'))
   if (e === 'run done') return () => Promise.resolve('ok')
  },
  async(fn, e, that) => {
   const isFail = {}
   let realError
   const result = await fn().catch(async err => {
    // console.error(err)
    realError = err
    await actorB.sendMessage('fail')
    return isFail
   })
   if (result === isFail) return
   await actorB.sendMessage('done')
   that.state[0].count += 1
  },
 )
 await readAllIncoming([actorA, actorB])

 expect({
  state: {
   a: actorA.state[0],
   b: actorB.state[0],
  },
  meta: {
   a: actorA.meta,
   b: actorB.meta,
  },
 }).toMatchSnapshot()

 await actorA.sendMessage('run done')
 await readAllIncoming([actorA, actorB])
 await expect(actorA.sendMessage('run fail')).resolves.toBeUndefined()
 await readAllIncoming([actorA, actorB])
 await expect(actorA.sendMessage('run fail')).resolves.toBeUndefined()

 await readAllIncoming([actorA, actorB])

 expect({
  state: {
   a: actorA.state[0],
   b: actorB.state[0],
  },
  meta: {
   a: actorA.meta,
   b: actorB.meta,
  },
 }).toMatchSnapshot()
})
