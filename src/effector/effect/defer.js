//@flow
export class Defer {
  /*::
  rs: (value: any) => {...}
  rj: (error: any) => {...}
  req: Promise<any>
  */
  constructor() {
    const req = new Promise((rs: Function, rj: Function) => {
      this.rs = rs
      this.rj = rj
    })
    this.req = req
    req.catch(err => {})
  }
}
