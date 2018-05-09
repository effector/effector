//@flow

export function nextSync<Item, Result>(
 getNextChunk: () => Array<Item>,
 task: Item => Result,
 running: Set<Item>,
 values: Map<Item, Result>,
 queue: Set<Item>,
) {
 const chunk = getNextChunk()
 const promises: Array<mixed> = []
 const apply = key => {
  const result = task(key)
  running.delete(key)
  values.set(key, result)
 }
 for (const key of chunk) {
  running.add(key)
  let result
  try {
   result = apply(key)
  } catch (error) {
   result = error
  }
  promises.push(result)
 }
 if (queue.size) {
  return nextSync(getNextChunk, task, running, values, queue)
 }

 return promises
}

export function nextAsync<Item, Result>(
 getNextChunk: () => Array<Item>,
 task: Item => Result,
 running: Set<Item>,
 values: Map<Item, Result>,
 queue: Set<Item>,
) {
 const chunk = getNextChunk()
 const promises: Array<Promise<mixed>> = []

 for (const key of chunk) {
  running.add(key)
  promises.push(
   Promise.resolve(task(key)).then(result => {
    running.delete(key)
    values.set(key, result)

    if (queue.size) {
     return nextAsync(getNextChunk, task, running, values, queue)
    }
   }),
  )
 }

 return Promise.all(promises)
}
