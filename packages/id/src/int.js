//@flow

let n = '0'

export function inc(int: string) {
 return fromNumber(toNumber(int) + 1)
}
export function count() {
 return (n = inc(n))
}

export function fromNumber(n: number) {
 return n.toString(36)
}
export function fromString(s: string) {
 return fromNumber(toNumber(s))
}
export function toNumber(int: string) {
 return parseInt(int, 36)
}

export function equals(a: string, b: string) {
 return toNumber(a) === toNumber(b)
}

export function compare(a: string, b: string): -1 | 0 | 1 {
 const an = toNumber(a)
 const bn = toNumber(b)
 if (an === bn) return 0
 if (an > bn) return 1
 return -1
}
