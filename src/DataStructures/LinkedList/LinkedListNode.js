//@flow

export class LinkedListNode<T> {
 /*::+*/ value: T
 next: LinkedListNode<T> | null
 constructor(value: T, next: LinkedListNode<T> | null = null) {
  this.value = value
  this.next = next
 }

 toString(callback?: (value: T) => string): string {
  return callback ? callback(this.value) : String(this.value)
 }
}
