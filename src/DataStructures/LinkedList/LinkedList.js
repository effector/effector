//@flow

import invariant from 'invariant'

import {LinkedListNode} from './LinkedListNode'

export class LinkedList<T> {
 /*::+*/ compare: (a: T, b: T) => -1 | 0 | 1
 head: LinkedListNode<T> | null = null
 tail: LinkedListNode<T> | null = null
 constructor(comparatorFunction: (a: T, b: T) => -1 | 0 | 1) {
  this.compare = comparatorFunction
 }

 prepend(value: T): this {
  // Make new node to be a head.
  const newNode = new LinkedListNode(value, this.head)
  this.head = newNode

  // If there is no tail yet let's make new node a tail.
  if (!this.tail) {
   this.tail = newNode
  }

  return this
 }

 append(value: T): this {
  const newNode = new LinkedListNode(value)

  // If there is no head yet let's make new node a head.
  if (!this.head) {
   this.head = newNode
   this.tail = newNode

   return this
  }
  const tail = this.tail
  invariant(tail, 'no tail')
  // Attach new node to the end of linked list.
  tail.next = newNode
  this.tail = newNode

  return this
 }

 delete(value: T): LinkedListNode<T> | null {
  if (!this.head) {
   return null
  }

  let deletedNode = null

  // If the head must be deleted then make next node that is differ
  // from the head to be a new head.
  while (this.head && this.compare(this.head.value, value) === 0) {
   deletedNode = this.head
   this.head = this.head.next
  }

  let currentNode = this.head

  if (currentNode !== null) {
   let currentNext
   // If next node must be deleted then make next node to be a next next one.
   while (currentNode.next) {
    currentNext = currentNode.next
    if (this.compare(currentNext.value, value) === 0) {
     deletedNode = currentNext
     currentNode.next = currentNext.next
    } else {
     currentNode = currentNext
    }
   }
  }

  const tail = this.tail
  // Check if tail must be deleted.
  if (tail && this.compare(tail.value, value) === 0) {
   this.tail = currentNode
  }

  return deletedNode
 }
 findValue(value: T): LinkedListNode<T> | null {
  if (!this.head) {
   return null
  }

  let currentNode = this.head

  while (currentNode) {
   if (this.compare(currentNode.value, value) === 0) {
    return currentNode
   }

   currentNode = currentNode.next
  }

  return null
 }
 findCompare(callback: (_: T) => boolean): LinkedListNode<T> | null {
  if (!this.head) {
   return null
  }

  let currentNode = this.head

  while (currentNode) {
   // try to find node by callback.
   if (callback(currentNode.value)) {
    return currentNode
   }

   currentNode = currentNode.next
  }

  return null
 }
 find(
  opts: {value: T, callback: void} | {value: void, callback: (_: T) => boolean},
 ): LinkedListNode<T> | null {
  if (opts.callback) return this.findCompare(opts.callback)
  return this.findValue(opts.value)
 }

 deleteTail(): LinkedListNode<T> | null {
  const deletedTail = this.tail

  if (this.head === this.tail) {
   // There is only one node in linked list.
   this.head = null
   this.tail = null

   return deletedTail
  }

  // If there are many nodes in linked list...

  // Rewind to the last node and delete "next" link for the node before the last one.
  let currentNode = this.head
  if (currentNode) {
   while (currentNode.next) {
    if (!currentNode.next.next) {
     currentNode.next = null
    } else {
     currentNode = currentNode.next
    }
   }
  }

  this.tail = currentNode

  return deletedTail
 }

 /**
  * @return {LinkedListNode}
  */
 deleteHead(): LinkedListNode<T> | null {
  if (!this.head) {
   return null
  }

  const deletedHead = this.head

  if (this.head.next) {
   this.head = this.head.next
  } else {
   this.head = null
   this.tail = null
  }

  return deletedHead
 }

 fromArray(values: Array<T>) {
  for (let i = 0; i < values.length; i++) {
   this.append(values[i])
  }

  return this
 }

 toArray(): Array<LinkedListNode<T>> {
  const nodes = []

  let currentNode = this.head
  while (currentNode) {
   nodes.push(currentNode)
   currentNode = currentNode.next
  }

  return nodes
 }

 toString(callback?: (value: T) => string): string {
  return this.toArray()
   .map(node => node.toString(callback))
   .toString()
 }

 /**
  * Reverse a linked list.
  * @returns {LinkedList}
  */
 reverse(): this {
  let currNode = this.head
  let prevNode = null
  let nextNode = null

  while (currNode) {
   // Store next node.
   nextNode = currNode.next

   // Change next node of the current node so it would link to previous node.
   currNode.next = prevNode

   // Move prevNode and currNode nodes one step forward.
   prevNode = currNode
   currNode = nextNode
  }

  // Reset head and tail.
  this.tail = this.head
  this.head = prevNode

  return this
 }
}
