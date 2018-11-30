//@flow

import invariant from 'invariant'

type Pointer = [number, () => any, (_: any) => void, (_: void) => void]

const createMemory = (capacity: number) => {
  const registry: Array<any> = new Array(capacity)
  const avialable = Array.from({length: capacity}, (_, i) => i)
  let freeCount = capacity
  function get() {
    return registry[this[0]]
  }
  function set(val: any) {
    registry[this[0]] = val
  }
  function clear() {
    avialable.push(this[0])
    freeCount += 1
    this.length = 0
  }
  declare function malloc(n: 1): [Pointer]
  declare function malloc(n: 2): [Pointer, Pointer]
  declare function malloc(n: 3): [Pointer, Pointer, Pointer]
  declare function malloc(n: 4): [Pointer, Pointer, Pointer, Pointer]
  declare function malloc(n: number): Array<Pointer>
  function malloc(n: number) {
    invariant(n < freeCount, 'memory limit')
    freeCount -= n
    const result: Array<Pointer> = new Array(n)
    for (let i = 0; i < n; i++) {
      result[i] = [avialable[avialable.length - (1 + i)], get, set, clear]
    }
    avialable.length -= n
    return result
  }
  const addRegisters = (n: number) => {
    for (let i = registry.length, upto = registry.length + n; i < upto; i++) {
      avialable.push(i)
    }
    registry.length += n
  }
  function smalloc(n: number) {
    const result: Array<Pointer> = new Array(n)
    if (n > freeCount) {
      addRegisters(n - freeCount)
      freeCount = 0
    } else {
      freeCount -= n
    }

    for (let i = 0; i < n; i++) {
      result[i] = [avialable[avialable.length - (1 + i)], get, set, clear]
    }
    avialable.length -= n
    return result
  }
  const GET: 1 = 1
  const SET: 2 = 2
  const CLEAR: 3 = 3
  const alias = {
    GET,
    SET,
    CLEAR,
  }

  const struct = (values: $ReadOnlyArray<any>) => {
    const result = smalloc(values.length)
    for (let i = 0; i < values.length; i++) {
      result[i][SET](values[i])
    }
    return result
  }
  const structSet = (
    index: number,
    field: number,
    value: any,
    list: Array<Pointer>,
    structSize: number,
  ) => {
    list[index * structSize + field + 1][SET](value)
  }
  const setListItem = (
    index: number,
    item: Array<any>,
    list: Array<Pointer>,
  ) => {
    const structSize = list[0][GET]()
    for (let i = 0; i < item.length; i++) {
      structSet(index, i, item[i], list, structSize)
    }
  }
  const list = (size: number, structSize: number) => {
    const result = smalloc(size * structSize + 1)
    result[0][SET](structSize)
    return result
  }

  return {
    freeBytes: () => freeCount,
    malloc,
    smalloc,
    struct,
    structSet,
    setListItem,
    alias,
    list,
    free(pointers: $ReadOnlyArray<Pointer>) {
      for (let i = 0; i < pointers.length; i++) {
        if (pointers[i].length !== 0) {
          pointers[i][CLEAR]()
        }
      }
      ;(pointers: any).length = 0
    },
  }
}

const createMemoryConsumer = () => {
  const {
    malloc,
    alias,
    struct,
    structSet,
    freeBytes,
    list,
    free,
    setListItem,
  } = createMemory(20)
  const user1 = malloc(2)
  user1[0][alias.SET]('John')
  user1[1][alias.SET](18)

  const user2 = struct(['Jack', 23])

  console.log('unallocated %d bytes', freeBytes())
  free(user1)
  const lst = list(2, 3)
  structSet(0, 0, 'John', lst, 2)
  structSet(0, 1, 18, lst, 2)

  setListItem(1, ['Jack', 23], lst)
  console.log(freeBytes())
  free(user2)
  console.log(freeBytes())

  return lst
}

console.log(createMemoryConsumer())
