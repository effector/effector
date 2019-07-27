/* @flow */
import test from './test'

type Blah = {
  foo: string,
}

const obj: {val?: Blah} = {}

declare function $await<T: Promise<any>>(p: Promise<T>): T;
declare function $await<T>(p: Promise<T>): T;
declare function $await<T>(p: T): T;

async function start() {
  const val = $await(test())
  // if (val != null && typeof val === 'object' && typeof val.foo === 'string') {
  //   obj.val = val.foo
  // }
}
