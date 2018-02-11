//@flow

import {type ID, createIDType} from './id'
const nextID = createIDType()

function never(): Promise<any> {
  return new Promise(() => {})
}

export type DeferStatus
  = 'resolved'
  | 'rejected'
  | 'unknown'

export type DisposeStatus
  = 'disposed'
  | 'unknown'

export class Dispose<Rs> {
  id: ID = nextID()
  status: DisposeStatus = 'unknown'
  /*::#*/rs: (data: Rs) => void
  done: Promise<Rs>
  disposed(data: Rs) {
    this.done = Promise.resolve(data)
    this.status = 'disposed'
    const rs = this./*::#*/rs
    rs(data)
  }
  constructor() {
    const done = new Promise(rs => {
      this./*::#*/rs = rs
    })
    this.done = done
  }
}

export class Defer<Rs, Rj> {
  id: ID = nextID()
  status: DeferStatus = 'unknown'
  /*::#*/rs: (data: Rs) => void
  /*::#*/rj: (error: Rj) => void
  done: Promise<Rs>
  fail: Promise<Rj>
  promise(): Promise<Rs> {
    return Promise.race([
      this.done.then(onResolve),
      this.fail.then(onReject),
    ]).then(result => {
      if (result.status)
        return result.done
      return Promise.reject(result.fail)
    })
  }
  resolved(data: Rs) {
    this.done = Promise.resolve(data)
    this.fail = never()
    this.status = 'resolved'
    const rs = this./*::#*/rs
    rs(data)
  }
  rejected(error: Rj) {
    this.done = never()
    this.fail = Promise.resolve(error)
    this.status = 'rejected'
    const rj = this./*::#*/rj
    rj(error)
  }
  constructor() {
    const done = new Promise(rs => {
      this./*::#*/rs = rs
    })
    const fail = new Promise(rj => {
      this./*::#*/rj = rj
    })
    this.done = done
    this.fail = fail
  }
}

function onResolve<Rs>(done: Rs): $Exact<{done: Rs, status: true}> {
  return {
    done,
    status: true,
  }
}

function onReject<Rj>(fail: Rj): $Exact<{fail: Rj, status: false}> {
  return {
    fail,
    status: false,
  }
}
