//@flow

export class Row<Ident/*: number*/> {
  ident: Ident
  text: string
}

export class Ident {
  ident: number
  static cache: Map<number, Ident> = new Map
  static create(ident: number): Ident {
    const cached = Ident.cache.get(ident)
    if (cached) return cached
    const result = new Ident
    result.ident = ident
    Ident.cache.set(ident, result)
    return result
  }
}

export class SemiRow<Ident/*: number*/> {
  ident: Ident
  text: string[]
  concat(semiRow: SemiRow<Ident>): SemiRow<Ident> {
    const result: SemiRow<Ident> = new SemiRow
    result.ident = this.ident
    result.text = this.text.concat(semiRow.text)
    return result
  }
}
