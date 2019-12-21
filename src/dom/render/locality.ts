import {Stack} from './index.h'

export function makeSiblings(left: Stack | null, right: Stack | null) {
  setRightSibling(left, right)
  setLeftSibling(right, left)
}

export function setRightSibling(target: Stack | null, value: Stack | null) {
  if (!target) return
  if (target === value) return
  target.locality.sibling.right.ref = value
}

export function setLeftSibling(target: Stack | null, value: Stack | null) {
  if (!target) return
  if (target === value) return
  target.locality.sibling.left.ref = value
}

export function getRightSibling(target: Stack | null): Stack | null {
  if (!target) return null
  return target.locality.sibling.right.ref
}
