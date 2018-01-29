//@flow

export type SeedValue<S, V> = {
  seed: S,
  value: V,
}
export type TimeValue<V> = {
  /*::+*/time: number,
  /*::+*/value: V
}
export type CreateGenerator<A>=
  ((...args: $ReadOnlyArray<mixed>) => Generator<A | Promise<A>, mixed, mixed>)
  | ((...args: $ReadOnlyArray<mixed>) => AsyncGenerator<A, mixed, mixed>)
export type Sink<A> = {
  event(time: number, value: A): void,
  end(time: number, value?: A): void,
  error(time: number, err: Error): void
}
export type Task = {
  run(time: number): void,
  error(time: number, e: Error): void,
  dispose(): void
}
export type ScheduledTask = {
  /*::+*/task: Task,
  run(): void,
  error(err: Error): void,
  dispose(): void
}
export type Scheduler = {
  now(): number,
  asap(task: Task): ScheduledTask,
  delay(task: Task): ScheduledTask,
  periodic(task: Task): ScheduledTask,
  schedule(delay: number, period: number, task: Task): ScheduledTask,
  cancel(task: Task): void,
  cancelAll(predicate: (task: Task) => boolean): void
}
export type Disposable<A> = {
  dispose(): void | Promise<A>
}

export type Subscription<A> = {
  unsubscribe(): void
}

export type Subscriber<A> = {
  next(value: A): void,
  error(err: Error): void,
  complete(value?: A): void
}

export type Observable<A> = {
  subscribe(subscriber: Subscriber<A>): Subscription<A>
}

declare export class Stream<A> {
  run(sink: Sink<A>, scheduler: Scheduler): Disposable<A>,
  reduce<B>(f: (b: B, a: A) => B, b: B): Promise<B>,
  observe<B>(f: (a: A) => B): Promise<B>,
  forEach<B>(f: (a: A) => B): Promise<B>,
  drain(): Promise<void>,
  subscribe(subscriber: Subscriber<A>): Subscription<A>,
  constant<B>(b: B): Stream<B>,
  map<B>(f: (a: A) => B): Stream<B>,
  tap<B>(f: (a: A) => B): Stream<A>,
  chain<B>(f: (a: A) => Stream<B>): Stream<B>,
  flatMap<B>(f: (a: A) => Stream<B>): Stream<B>,
  ap<B>(fs: Stream<(a: A) => B>): Stream<B>,

  // Note: Without higher-kinded types, the types for these
  // cannot be written in a completely safe manner, See https://github.com/Microsoft/TypeScript/issues/1290
  // For better type safety, consider using most.join/switch/switchLatest with thru
  join(): A,
  switchLatest(): A,

  continueWith<B>(f: () => Stream<B>): Stream<A | B>,
  concatMap<B>(f: (a: A) => Stream<B>): Stream<B>,
  mergeConcurrently<B>(concurrency: number): Stream<B>,
  //merge<I>(...ss: I): Stream<A>,
  //mergeArray(streams: $ReadOnlyArray<Stream<A>>): Stream<A>,

  combine<B, R>(
    fn: (a: A, b: B) => R,
    streamB: Stream<B>,
    noc: void,
    nod: void,
    noe: void,
    nof: void
  ): Stream<R>,
  combine<B, C, R>(
    fn: (a: A, b: B, c: C) => R,
    streamB: Stream<B>,
    streamC: Stream<C>,
    nod: void,
    noe: void,
    nof: void
  ): Stream<R>,
  combine<B, C, D, R>(
    fn: (a: A, b: B, c: C, d: D) => R,
    streamB: Stream<B>,
    streamC: Stream<C>,
    streamD: Stream<D>,
    noe: void,
    nof: void
  ): Stream<R>,
  combine<B, C, D, E, R>(
    fn: (a: A, b: B, c: C, d: D, e: E) => R,
    streamB: Stream<B>,
    streamC: Stream<C>,
    streamD: Stream<D>,
    streamE: Stream<E>,
    nof: void
  ): Stream<R>,
  combine<B, C, D, E, F, R>(
    fn: (a: A, b: B, c: C, d: D, e: E, f: F) => R,
    streamB: Stream<B>,
    streamC: Stream<C>,
    streamD: Stream<D>,
    streamE: Stream<E>,
    streamF: Stream<F>
  ): Stream<R>,







  scan<B>(f: (b: B, a: A) => B, b: B): Stream<B>,
  loop<S, B>(f: (seed: S, a: A) => SeedValue<S, B>, seed: S): Stream<B>,

  concat<B>(s2: Stream<B>): Stream<A | B>,
  startWith<B>(a: B): Stream<A | B>,

  filter(p: (a: A) => boolean): Stream<A>,
  skipRepeats(): Stream<A>,
  skipRepeatsWith(eq: (a1: A, a2: A) => boolean): Stream<A>,

  take(n: number): Stream<A>,
  skip(n: number): Stream<A>,
  takeWhile(p: (a: A) => boolean): Stream<A>,
  skipWhile(p: (a: A) => boolean): Stream<A>,
  skipAfter(p: (a: A) => boolean): Stream<A>,
  slice(start: number, end: number): Stream<A>,

  until<B>(signal: Stream<B>): Stream<A>,
  takeUntil<B>(signal: Stream<B>): Stream<A>,
  since<B>(signal: Stream<B>): Stream<A>,
  skipUntil<B>(signal: Stream<B>): Stream<A>,
  during<B>(timeWindow: Stream<Stream<B>>): Stream<A>,
  throttle(period: number): Stream<A>,
  debounce(period: number): Stream<A>,

  timestamp(): Stream<TimeValue<A>>,

  delay(dt: number): Stream<A>,

  // Note: Without higher-kinded types, this type cannot be written properly
  // await<B>(): Stream<B>,

  awaitPromises(): Stream<A>,

  merge<B>(
    b: Stream<B>,
    noc: void,
    nod: void,
    noe: void
  ): Stream<A | B>,
  merge<B, C>(
    b: Stream<B>,
    c: Stream<C>,
    nod: void,
    noe: void
  ): Stream<A | B | C>,
  merge<B, C, D>(
    b: Stream<B>,
    c: Stream<C>,
    d: Stream<D>,
    noe: void
  ): Stream<A | B | C | D>,
  merge<B, C, D, E>(
    b: Stream<B>,
    c: Stream<C>,
    d: Stream<D>,
    e: Stream<E>
  ): Stream<A | B | C | D | E>,

  sample<B, R>(
    fn: (b: B) => R,
    b: Stream<B>,
    noc: void,
    nod: void,
    noe: void
  ): Stream<R>,
  sample<B, C, R>(
    fn: (b: B, c: C) => R,
    b: Stream<B>,
    c: Stream<C>,
    nod: void,
    noe: void
  ): Stream<R>,
  sample<B, C, D, R>(
    fn: (b: B, c: C, d: D) => R,
    b: Stream<B>,
    c: Stream<C>,
    d: Stream<D>,
    noe: void
  ): Stream<R>,
  sample<B, C, D, E, R>(
    fn: (b: B, c: C, d: D, e: E) => R,
    b: Stream<B>,
    c: Stream<C>,
    d: Stream<D>,
    e: Stream<E>
  ): Stream<R>,




  sampleWith<B>(sampler: Stream<B>): Stream<A>,

  zip<B, R>(
    fn: (a: A, b: B) => R,
    b: Stream<B>,
    noc: void,
    nod: void,
    noe: void
  ): Stream<R>,
  zip<B, C, R>(
    fn: (a: A, b: B, c: C) => R,
    b: Stream<B>,
    c: Stream<C>,
    nod: void,
    noe: void
  ): Stream<R>,
  zip<B, C, D, R>(
    fn: (a: A, b: B, c: C, d: D) => R,
    b: Stream<B>,
    c: Stream<C>,
    d: Stream<D>,
    noe: void
  ): Stream<R>,
  zip<B, C, D, E, R>(
    fn: (a: A, b: B, c: C, d: D, e: E) => R,
    b: Stream<B>,
    c: Stream<C>,
    d: Stream<D>,
    e: Stream<E>
  ): Stream<R>,





  recoverWith<B, C>(p: (a: B) => Stream<C>): Stream<C>,
  multicast(): Stream<A>,

  thru<B>(transform: (stream: Stream<A>) => B): B,
}

declare export function awaitPromises<A>(
  a: Stream<Promise<A>>
): Stream<A>
declare export function just<A>(a: A): Stream<A>
declare export function of<A>(a: A): Stream<A>
declare export function empty<A>(): Stream<A>// should be <void>, but this breaks some things
declare export function never<A>(): Stream<A>
declare export function from<A, T/*:::$ReadOnlyArray<A>| Iterable<A> | Iterator<A> | Observable<A>*/>(as: T): Stream<A>
declare export function periodic<A>(period: number, a?: A): Stream<A>
declare export function fromEvent<T, Target>(event: string, target: Target, useCapture?: boolean): Stream<T>
declare export function unfold<A, B, S>(f: (seed: S) => (SeedValue<S, B> | Promise<SeedValue<S, B>>) , seed: S): Stream<B>
declare export function iterate<A>(f: (a: A) => A | Promise<A>, a: A): Stream<A>
declare export function generate<A>(g: CreateGenerator<A>, ...args: $ReadOnlyArray<any>): Stream<A>
declare export function reduce<A, B>(f: (b: B, a: A) => B, b: B, s: Stream<A>): Promise<B>
declare export function observe<A, B>(f: (a: A) => B, s: Stream<A>): Promise<B>
declare export function forEach<A, B>(f: (a: A) => B, s: Stream<A>): Promise<B>
declare export function drain<A>(s: Stream<A>): Promise<void>  //not sure
declare export function subscribe<A>(subscriber: Subscriber<A>, s: Stream<A>): Subscription<A>
declare export function constant<A, B>(b: B, s: Stream<A>): Stream<B>
declare export function map<A, B>(f: (a: A) => B, s: Stream<A>): Stream<B>
declare export function tap<A>(f: (a: A) => mixed, s: Stream<A>): Stream<A>
declare export function ap<A, B>(fs: Stream<(a: A) => B>, as: Stream<A>): Stream<B>
declare export function chain<A, B>(f: (a: A) => Stream<B>, s: Stream<A>): Stream<B>
declare export function flatMap<A, B>(f: (a: A) => Stream<B>, s: Stream<A>): Stream<B>
declare export function join<A>(s: Stream<Stream<A>> ): Stream<A>
declare export function switchLatest<A>(s: Stream<Stream<A>> ): Stream<A>
declare export function continueWith<A, B>(f: () => Stream<B>, s: Stream<A>): Stream<A | B>
declare export function concatMap<A, B>(f: (a: A) => Stream<B>, s: Stream<A>): Stream<B>
declare export function mergeConcurrently<A>(concurrency: number, s: Stream<Stream<A>> ): Stream<A>
declare export function merge<A>(...ss: $ReadOnlyArray<Stream<A>> ): Stream<A>
declare export function mergeArray<A>(streams: $ReadOnlyArray<Stream<A>> ): Stream<A>

declare export function combine<A, B, R>(
  fn: (a: A, b: B) => R,
  streamA: Stream<A>,
  streamB: Stream<B>,
  noc: void,
  nod: void,
  noe: void,
  nof: void
): Stream<R>
declare export function combine<A, B, C, R>(
  fn: (a: A, b: B, c: C) => R,
  streamA: Stream<A>,
  streamB: Stream<B>,
  streamC: Stream<C>,
  nod: void,
  noe: void,
  nof: void
): Stream<R>
declare export function combine<A, B, C, D, R>(
  fn: (a: A, b: B, c: C, d: D) => R,
  streamA: Stream<A>,
  streamB: Stream<B>,
  streamC: Stream<C>,
  streamD: Stream<D>,
  noe: void,
  nof: void
): Stream<R>
declare export function combine<A, B, C, D, E, R>(
  fn: (a: A, b: B, c: C, d: D, e: E) => R,
  streamA: Stream<A>,
  streamB: Stream<B>,
  streamC: Stream<C>,
  streamD: Stream<D>,
  streamE: Stream<E>,
  nof: void
): Stream<R>
declare export function combine<A, B, C, D, E, F, R>(
  fn: (a: A, b: B, c: C, d: D, e: E, f: F) => R,
  streamA: Stream<A>,
  streamB: Stream<B>,
  streamC: Stream<C>,
  streamD: Stream<D>,
  streamE: Stream<E>,
  streamF: Stream<F>
): Stream<R>

declare export function combineArray<A, B, R>(fn: (a: A, b: B) => R, streams: [Stream<A>, Stream<B>]): Stream<R>
declare export function combineArray<A, R>(fn: (...items: $ReadOnlyArray<A>) => R, streams: $ReadOnlyArray<Stream<A>>): Stream<R>
declare export function scan<A, B>(f: (b: B, a: A) => B, b: B, s: Stream<A>): Stream<B>
declare export function loop<A, B, S>(
  f: (seed: S, a: A) => SeedValue<S, B>,
  seed: S,
  s: Stream<A>
): Stream<B>
declare export function concat<A>(s1: Stream<A>, s2: Stream<A>): Stream<A>
declare export function startWith<A>(a: A, s: Stream<A>): Stream<A>
declare export function filter<A>(p: (a: A) => boolean, s: Stream<A>): Stream<A>
declare export function skipRepeats<A>(s: Stream<A>): Stream<A>
declare export function skipRepeatsWith<A>(eq: (a1: A, a2: A) => boolean, s: Stream<A>): Stream<A>
declare export function take<A>(n: number, s: Stream<A>): Stream<A>
declare export function skip<A>(n: number, s: Stream<A>): Stream<A>
declare export function takeWhile<A>(p: (a: A) => boolean, s: Stream<A>): Stream<A>
declare export function skipWhile<A>(p: (a: A) => boolean, s: Stream<A>): Stream<A>
declare export function skipAfter<A>(p: (a: A) => boolean, s: Stream<A>): Stream<A>
declare export function slice<A>(start: number, end: number, s: Stream<A>): Stream<A>
declare export function until<A, B>(signal: Stream<B>, s: Stream<A>): Stream<A>
declare export function takeUntil<A, B>(signal: Stream<B>, s: Stream<A>): Stream<A>
declare export function since<A, B>(signal: Stream<B>, s: Stream<A>): Stream<A>
declare export function skipUntil<A, B>(signal: Stream<B>, s: Stream<A>): Stream<A>
declare export function during<A, B>(timeWindow: Stream<Stream<B>> , s: Stream<A>): Stream<A>
declare export function throttle<A>(period: number, s: Stream<A>): Stream<A>
declare export function debounce<A>(period: number, s: Stream<A>): Stream<A>
declare export function timestamp<A>(s: Stream<A>): Stream<TimeValue<A>>
declare export function delay<A>(dt: number, s: Stream<A>): Stream<A>
declare export function fromPromise<A>(p: Promise<A>): Stream<A>
declare export function await<A>(s: Stream<Promise<A>> ): Stream<A>
declare export function sample<A, B, S, R>(
  fn: (a: A, b: B) => R,
  sampler: Stream<S>,
  a: Stream<A>,
  b: Stream<B>
): Stream<R>
declare export function sampleWith<A, S>(sampler: Stream<S>, s: Stream<A>): Stream<A>
declare export function zip<A, B, R>(fn: (a: A, b: B) => R, a: Stream<A>, b: Stream<B>): Stream<R>
declare export function recoverWith<A, B>(p: (a: B) => Stream<A>, s: Stream<A>): Stream<A>
declare export function throwError<E/*::: Error*/>(e: E): Stream<E>
declare export function multicast<A>(s: Stream<A>): Stream<A>
