//@flow

export opaque type Murk = any
export const creating = (): Murk => {}
export const murking = <T>(val: T): Murk => val
export const demurking = <T>(val: Murk): T => val

export const lifting = <A, B>(val: Murk, fn: A => B): Murk => fn(val)
