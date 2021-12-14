export function createDefer(): {
  rs: (value) => any
  rj: (value) => any
  req: Promise<any>
} {
  const result = {} as {
    rs: (value) => any
    rj: (value) => any
    req: Promise<any>
  }
  result.req = new Promise((rs, rj) => {
    result.rs = rs
    result.rj = rj
  })
  result.req.catch(err => {})
  return result
}
