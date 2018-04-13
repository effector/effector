//@flow

export class Data {
 /*::+*/ id: number = ++Data.id
 static id: number = -1
 value: Array<any>
 constructor(values: any[]) {
  this.value = values
 }
 get() {
  return this.value
 }
 valueOf() {
  return [...valueOf(this)]
 }
}

function* valueOf(data): Iterable<any> {
 if (Array.isArray(data)) {
  for (const e of data) {
   yield* valueOf(e)
  }
 } else if (!(data instanceof Data)) {
  yield data
 } else
  for (const e of data.value) {
   yield* valueOf(e)
  }
}

//$off
Object.defineProperty(Data.prototype, 'isData', {
 writable: true,
 configurable: true,
 value: true,
})

export function createValue(value: any[]) {
 return new Data(value)
}
