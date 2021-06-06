type item<T> = Item<T> | null

type Item<T> = {
  right: item<T>
  left: item<T>
  value: T
}

type Heap<T> = {
  top: item<T>
  size: number
  isAafterB: (a: T, b: T) => boolean
}

export function sortListBySkewHeap<T>(
  list: T[],
  isAafterB: (a: T, b: T) => boolean,
) {
  const heap = create(isAafterB)
  list.forEach(e => {
    push(e, heap)
  })
  const result = []
  let value
  while ((value = pop(heap))) {
    result.push(value)
  }
  return result
}

function merge<T>(a: item<T>, b: item<T>, isAafterB: (a: T, b: T) => boolean) {
  if (!a) return b
  if (!b) return a

  let ret
  if (!isAafterB(a.value, b.value) && isAafterB(b.value, a.value)) {
    ret = a
    a = b
    b = ret
  }
  ret = merge(a.right, b, isAafterB)
  a.right = a.left
  a.left = ret
  return a
}
function push<T>(value: T, queue: Heap<T>) {
  queue.top = merge(
    queue.top,
    {value, left: null, right: null},
    queue.isAafterB,
  )
  queue.size += 1
}
function pop<T>(queue: Heap<T>) {
  if (queue.size === 0) return
  queue.size -= 1
  const top = queue.top!
  const value = top.value
  queue.top = merge(top.left, top.right, queue.isAafterB)
  return value
}
function create<T>(isAafterB: (a: T, b: T) => boolean): Heap<T> {
  return {top: null, size: 0, isAafterB}
}
