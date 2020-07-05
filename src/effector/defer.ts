export function createDefer(): {
  rs: (value: any) => any,
  rj: (value: any) => any,
  req: Promise<any>,
} {
  const result = {}
  result.req = new Promise((rs, rj) => {
    result.rs = rs
    result.rj = rj
  })
  result.req.catch(err => {})
  return result
}
