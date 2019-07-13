//@flow

export function Defer() {
  /*::
  this.rs = result => {}
  this.rj = error => {}
  */
  const req = new Promise((rs, rj) => {
    this.rs = rs
    this.rj = rj
  })
  this.req = req
  req.catch(err => {})
}
