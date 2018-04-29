//@flow

export function update(instance: *, f: Function, args: any[]) {
 switch (args.length) {
  case 0:
   return instance.set(f(instance.get()))
  case 1:
   return instance.set(f(instance.get(), args[0]))
  case 2:
   return instance.set(f(instance.get(), args[0], args[1]))
  case 3:
   return instance.set(f(instance.get(), args[0], args[1], args[2]))
  case 4:
   return instance.set(f(instance.get(), args[0], args[1], args[2], args[3]))
  default:
   throw Error('update function accepts only 4 arguments')
 }
}
