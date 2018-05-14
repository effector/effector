//@flow

export function setProperty(prop: string | Symbol, value: any, obj: any) {
 Object.defineProperty(obj, prop, {
  value,
  writable: true,
  configurable: true,
 })
}
