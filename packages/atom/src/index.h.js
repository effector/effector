//@flow

export type Atom<T> = {
 get(): T,
 set(value: T): void,
}
