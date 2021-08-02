export type AsyncValue = {
  /** Init, Active, Terminated and async transitions between them */
  status: 'I' | 'A' | 'T' | 'IA' | 'AA' | 'AT'
  value: {
    active: any
    pending: any
  }
  ops: {
    init: Op
    change: Op
    terminate: Op
  }
}

export type Op = {
  value: {
    active: any
    pending: any
  }
  runOp: (value: any) => void
  status: 'active' | 'pending' | 'suspend'
  priority: 'props' | 'tree' | 'data'
  group: OpGroup
  cursor: {
    prev: Op | null
    next: Op | null
  }
}

export type OpPriorityQueue = {
  props: OpPlainQueue
  tree: OpPlainQueue
  data: OpPlainQueue
  rafID: number | null
  execQueue: () => void
  onDrain?: (() => void) | null
}

type OpPlainQueue = {
  first: OpGroup | null
  last: OpGroup | null
}

export type OpGroup = {
  ops: Op[]
  queue: OpPriorityQueue
  activeChilds: {
    props: {
      first: Op | null
      last: Op | null
    }
    tree: {
      first: Op | null
      last: Op | null
    }
    data: {
      first: Op | null
      last: Op | null
    }
  }
  cursor: {
    props: {
      prev: OpGroup | null
      next: OpGroup | null
    }
    tree: {
      prev: OpGroup | null
      next: OpGroup | null
    }
    data: {
      prev: OpGroup | null
      next: OpGroup | null
    }
  }
}

export type Linkable = {
  cursor: {
    prev: Linkable | null
    next: Linkable | null
  }
}
