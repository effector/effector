import type {Subscription, Node} from './index.h'
import {clearNodeLight} from './clearNode'

export const createSubscription = (node: Node): Subscription =>
  addUnsubscribe(() => clearNodeLight(node))

export function addUnsubscribe(callback: () => void): Subscription {
  const subscription: Subscription = () => callback()
  subscription.unsubscribe = () => callback()

  return subscription
}
