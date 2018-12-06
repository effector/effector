//@flow

export type Subscriber<A> = {
  next(value: A): void,
  // error(err: Error): void,
  //complete(): void,
}

export type Subscription = {
  (): void,
  unsubscribe(): void,
}

export type Unsubscribe = () => void
