//@flow

import {equals, nextId, unique, addToArray, removeFromArray} from '../util'

const empty = {}

test('the equals function checks equality for primitives', () => {
 expect(equals(empty, NaN, NaN)).toEqual(true)
 expect(equals(empty, 4, 2 + 2)).toEqual(true)
 expect(equals(empty, 0, 0)).toEqual(true)
 expect(equals(empty, 'blah', 'bl' + 'ah')).toEqual(true)
})

test('the equals function checks identity but not equality for objects', () => {
 expect(equals(empty, {}, {})).toEqual(false)
 expect(equals(empty, [], [])).toEqual(false)
 const arr = []
 const obj = {}
 expect(equals(empty, arr, arr)).toEqual(true)
 expect(equals(empty, obj, obj)).toEqual(true)
})

test('the equals function uses .equals methods if present', () => {
 expect(
  equals(empty, {equals: () => false}, {equals: () => true}),
 ).toEqual(false)

 expect(
  equals(empty, {equals: () => true}, {equals: () => false}),
 ).toEqual(true)
})

test("the addToArray function adds elements to arrays if they aren't already in there", () => {
 const arr = []
 addToArray(arr, 4)
 expect(arr.length).toEqual(1)
 expect(arr[0]).toEqual(4)

 // should not add it again
 addToArray(arr, 4)
 expect(arr.length).toEqual(1)
 expect(arr[0]).toEqual(4)

 addToArray(arr, 5)
 expect(arr.length).toEqual(2)
 expect(arr).toEqual([4, 5])
})

test('the removeFromArray function removes elements from arrays if they are in there', () => {
 const arr = [4, 5, 6]

 removeFromArray(arr, 5)
 expect(arr).toEqual([4, 6])

 removeFromArray(arr, 5)
 expect(arr).toEqual([4, 6])

 removeFromArray(arr, 6)
 expect(arr).toEqual([4])

 removeFromArray(arr, 4)
 expect(arr).toEqual([])

 removeFromArray(arr, 4)
 expect(arr).toEqual([])
})

test('the nextId function returns a succession of integers', () => {
 let last = nextId()
 expect(typeof last).toEqual('number')
 for (let i = 0; i < 1000; i++) {
  const next = nextId()
  expect(typeof next).toEqual('number')
  expect(next).toBeGreaterThan(last)
  last = next
 }
})

test('the unique object is not equal to anything according to its .equals method', () => {
 expect(unique.equals(unique)).toEqual(false)
})

test('equals uses equality method in context if specified', () => {
 expect(equals({equality: () => true}, 1, 2)).toEqual(true)
 expect(equals({equality: () => false}, 1, 2)).toEqual(false)
})
