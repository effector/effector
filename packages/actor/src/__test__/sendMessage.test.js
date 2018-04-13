//@flow

import {createActor, readAllIncoming} from '..'

test('send message to itself', async() => {
 const actor = createActor([{value: 'A'}])
 expect({
  state: actor.state[0],
  meta: actor.meta,
 }).toMatchSnapshot('1) initial')
 actor.after(
  (_, e) => {
   if (e === 'hello') return actor
  },
  async(actor, e) => {
   await actor.sendMessage(actor.state[0].value)
   await actor.sendMessage('how r u')
  },
 )
 await actor.sendMessage('hello')
 expect({
  state: actor.state[0],
  meta: actor.meta,
 }).toMatchSnapshot('2) hello')

 await actor.readIncoming()
 expect({
  state: actor.state[0],
  meta: actor.meta,
 }).toMatchSnapshot('3) read incoming')
})

test('to another actor', async() => {
 const actor = createActor([{value: 'A'}])
 const actorB = createActor([{value: 'B'}])
 expect({
  state: {
   a: actor.state[0],
   b: actorB.state[0],
  },
  meta: {
   a: actor.meta,
   b: actorB.meta,
  },
 }).toMatchSnapshot('1) initial')

 await actor.sendMessage('hello', actorB)
 expect({
  state: {
   a: actor.state[0],
   b: actorB.state[0],
  },
  meta: {
   a: actor.meta,
   b: actorB.meta,
  },
 }).toMatchSnapshot('2) hello')

 await actor.sendMessage('how r u', actorB)
 expect({
  state: {
   a: actor.state[0],
   b: actorB.state[0],
  },
  meta: {
   a: actor.meta,
   b: actorB.meta,
  },
 }).toMatchSnapshot('3) how r u')

 await actor.readIncoming()
 expect({
  state: {
   a: actor.state[0],
   b: actorB.state[0],
  },
  meta: {
   a: actor.meta,
   b: actorB.meta,
  },
 }).toMatchSnapshot('4) read incoming A')

 await actorB.readIncoming()
 expect({
  state: {
   a: actor.state[0],
   b: actorB.state[0],
  },
  meta: {
   a: actor.meta,
   b: actorB.meta,
  },
 }).toMatchSnapshot('5) read incoming B')
})

test('talk', async() => {
 const actor = createActor([
  {
   count: 0,
  },
  [],
 ])
 const actorB = createActor([{value: 'none'}])

 actorB.after(
  (_, e) => {
   if (e === 'hello') return actor
  },
  async(sender, e, that) => {
   await that.sendMessage('hi', sender)
   const [obj, history] = sender.state
   history.push(e)
   obj.count += 1
  },
 )
 actor.after(
  (_, e) => {
   if (e === 'hi') return actorB
  },
  async(sender, e, that) => {
   await that.sendMessage('how r u', sender)
   const [obj, history] = that.state
   history.push(e)
   obj.count += 1
  },
 )
 actorB.after(
  (_, e) => {
   if (e === 'how r u') return actor
  },
  async(sender, e, that) => {
   await that.sendMessage("I'm fine", sender)
   const [obj, history] = sender.state
   history.push(e)
   obj.count += 1
   that.state[0].value = 'fine'
  },
 )
 actor.after(
  (_, e) => {
   if (e === "I'm fine") return actorB
  },
  async(sender, e, that) => {
   await that.sendMessage('bye', sender)
   const [obj, history] = that.state
   history.push(e)
   obj.count += 1
   sender.state[0].value = 'bye'
  },
 )
 //  actor.saveHandlers()
 //  actorB.saveHandlers()
 expect({
  state: {
   a: actor.state[0],
   b: actorB.state[0],
  },
  meta: {
   a: actor.meta,
   b: actorB.meta,
  },
 }).toMatchSnapshot('1) initial')

 await actor.readIncoming()
 await actorB.readIncoming()

 expect({
  state: {
   a: actor.state[0],
   b: actorB.state[0],
  },
  meta: {
   a: actor.meta,
   b: actorB.meta,
  },
 }).toMatchSnapshot('2) read incoming (both)')

 await actor.sendMessage('hello', actorB)
 //  await actor.readIncoming()
 await actor.readIncoming()
 await actorB.readIncoming()
 expect({
  state: {
   a: actor.state[0],
   b: actorB.state[0],
  },
  meta: {
   a: actor.meta,
   b: actorB.meta,
  },
 }).toMatchSnapshot('3) hello')

 await actor.readIncoming()
 await actorB.readIncoming()
 expect({
  state: {
   a: actor.state[0],
   b: actorB.state[0],
  },
  meta: {
   a: actor.meta,
   b: actorB.meta,
  },
 }).toMatchSnapshot('4) read incoming')

 await actor.readIncoming()
 await actorB.readIncoming()
 expect({
  state: {
   a: actor.state[0],
   b: actorB.state[0],
  },
  meta: {
   a: actor.meta,
   b: actorB.meta,
  },
 }).toMatchSnapshot('5) read incoming')
})

test('readAllIncoming', async() => {
 const actor = createActor([
  {
   count: 0,
  },
  [],
 ])
 const actorB = createActor([{value: 'none'}])

 actorB.after(
  (_, e) => {
   if (e === 'hello') return actor
  },
  async(sender, e, that) => {
   await that.sendMessage('hi', sender)
   const [obj, history] = sender.state
   history.push(e)
   obj.count += 1
  },
 )
 actor.after(
  (_, e) => {
   if (e === 'hi') return actorB
  },
  async(sender, e, that) => {
   await that.sendMessage('how r u', sender)
   const [obj, history] = that.state
   history.push(e)
   obj.count += 1
  },
 )
 actorB.after(
  (_, e) => {
   if (e === 'how r u') return actor
  },
  async(sender, e, that) => {
   await that.sendMessage("I'm fine", sender)
   const [obj, history] = sender.state
   history.push(e)
   obj.count += 1
   that.state[0].value = 'fine'
  },
 )
 actor.after(
  (_, e) => {
   if (e === "I'm fine") return actorB
  },
  async(sender, e, that) => {
   await that.sendMessage('bye', sender)
   const [obj, history] = that.state
   history.push(e)
   obj.count += 1
   sender.state[0].value = 'bye'
  },
 )
 //  actor.saveHandlers()
 //  actorB.saveHandlers()
 expect({
  state: {
   a: actor.state[0],
   b: actorB.state[0],
  },
  meta: {
   a: actor.meta,
   b: actorB.meta,
  },
 }).toMatchSnapshot('1) initial')
 await readAllIncoming([actor, actorB])

 expect({
  state: {
   a: actor.state[0],
   b: actorB.state[0],
  },
  meta: {
   a: actor.meta,
   b: actorB.meta,
  },
 }).toMatchSnapshot('2) read all incoming')

 await actor.sendMessage('hello', actorB)

 expect({
  state: {
   a: actor.state[0],
   b: actorB.state[0],
  },
  meta: {
   a: actor.meta,
   b: actorB.meta,
  },
 }).toMatchSnapshot('3) hello')
 await readAllIncoming([actor, actorB])

 expect({
  state: {
   a: actor.state[0],
   b: actorB.state[0],
  },
  meta: {
   a: actor.meta,
   b: actorB.meta,
  },
 }).toMatchSnapshot('4) read all incoming')

 expect(actorB.state[0].value).toBe('bye')
})
