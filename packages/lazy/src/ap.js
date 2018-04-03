//@flow strict

import type {Lazy, Scalar, Async} from './instance'
import {combine} from './combine'

declare export function ap<A, B>(
 fn: Scalar<(x: A) => B>,
 value: Lazy<A>,
): Lazy<B>
declare export function ap<A, B>(
 fn: Async<(x: A) => B>,
 value: Lazy<A>,
): Async<B>
declare export function ap<A, B>(fn: Lazy<(x: A) => B>, value: Lazy<A>): Lazy<B>
declare export function ap<A, B>(
 fn: Scalar<(x: A) => B>,
 value: Scalar<A>,
): Scalar<B>
declare export function ap<A, B>(
 fn: Async<(x: A) => B>,
 value: Scalar<A>,
): Async<B>
declare export function ap<A, B>(
 fn: Lazy<(x: A) => B>,
 value: Scalar<A>,
): Lazy<B>
declare export function ap<A, B>(
 fn: Scalar<(x: A) => B>,
 value: Async<A>,
): Async<B>
declare export function ap<A, B>(
 fn: Async<(x: A) => B>,
 value: Async<A>,
): Async<B>
declare export function ap<A, B>(
 fn: Lazy<(x: A) => B>,
 value: Async<A>,
): Async<B>
export function ap<A, B>(fn: Lazy<(x: A) => B>, value: Lazy<A>): Lazy<B> {
 return combine(fn, value, (fn, value) => fn(value))
}
