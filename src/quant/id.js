//@flow

const counter = () =>
  (() => {
    let i = 0
    return () => ++i
  })()

const nextIndex = counter()
const nextBranch = counter()

export class ID {
  index = nextIndex()
  branch: number
  seq: number
  inc() {
    const result = new ID()
    result.branch = this.branch
    result.seq = this.seq + 1
    return result
  }
}

export function create() {
  const result = new ID()
  result.branch = nextBranch()
  result.seq = 0
  return result
}
