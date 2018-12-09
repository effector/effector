//@flow

import {LinkedList} from '../LinkedList/LinkedList'

export class Stack<T> {
  /*::+*/ linkedList: LinkedList<T>

  constructor(comparator: (a: T, b: T) => -1 | 0 | 1) {
    // We're going to implement Stack based on LinkedList since these
    // structures are quite similar. Compare push/pop operations of the Stack
    // with append/deleteTail operations of LinkedList.
    this.linkedList = new LinkedList(comparator)
  }

  isEmpty() {
    // The stack is empty if its linked list doesn't have a tail.
    return !this.linkedList.tail
  }

  peek(): T | null {
    const tail = this.linkedList.tail
    if (!tail) return null
    // Just read the value from the end of linked list without deleting it.
    return tail.value
  }

  push(value: T) {
    // Pushing means to lay the value on top of the stack. Therefore let's just add
    // the new value at the end of the linked list.
    this.linkedList.append(value)
  }

  pop(): T | null {
    // Let's try to delete the last node (the tail) from the linked list.
    // If there is no tail (the linked list is empty) just return null.
    const removedTail = this.linkedList.deleteTail()
    return removedTail ? removedTail.value : null
  }

  toArray(): Array<T> {
    return this.linkedList
      .toArray()
      .map(linkedListNode => linkedListNode.value)
      .reverse()
  }

  toString(callback?: (value: T) => string): string {
    return this.linkedList.toString(callback)
  }
}
