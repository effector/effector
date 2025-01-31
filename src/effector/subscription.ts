import type {Subscription, NodeUnit} from './index.h'
import {clearNode} from './clearNode'

export const createSubscription = (node: NodeUnit): Subscription =>
  addUnsubscribe(() => clearNode(node))

export function addUnsubscribe(callback: () => void): Subscription {
  const subscription: Subscription = () => callback()
  subscription.unsubscribe = () => callback()

  return subscription
}
