//@flow

type Item = string

class Section {
  list: Tree[]
  constructor(list: Tree[]) {
    this.list = list
  }
}

class EmptyList {}
class List<T> {
  head: T
  tail: T[]
  constructor(head: T, tail: T[]) {
    this.head = head
    this.tail = tail
  }
  static of<T>(head: T): List<T> {
    return new List(head, [])
  }
}

type Tree =
  Item
  | Section[]

class Top { }

class Node {
  first: List<Tree>
  middle: Path
  last: List<Tree>
  constructor(first: List<Tree>, middle: Path, last: List<Tree>) {
    this.first = first
    this.middle = middle
    this.last = last
  }
}

type Path =
  Top
  | Node

class Loc {
  tree: Tree
  path: Path
  constructor(tree: Tree, path: Path) {
    this.tree = tree
    this.path = path
  }
  change(tree: Tree) {
    return new Loc(tree, this.path)
  }
}



const lst1 = new Section([
  new Section(['a', '*', 'b']),
  '+',
  new Section(['c', '*', 'd']),
])

function goLeft({ tree, path }: Loc) {
  switch (true) {
    case path instanceof Top: throw new Error('left on top')
  }
}
