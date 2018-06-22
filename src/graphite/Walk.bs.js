

import * as Block from "bs-platform/lib/es6/block.js";
import * as FullDatatype$Graphite from "../datatype/FullDatatype.bs.js";

/*@flow*/
;

function stepArg(ctx) {
  var match = ctx.type;
  var exit = 0;
  var switcher = match - 21 | 0;
  if (switcher > 4 || switcher < 0) {
    exit = 1;
  } else {
    switch (switcher) {
      case 0 : 
          return (ctx.data.result);
      case 1 : 
          return (ctx.data.payload);
      case 2 : 
          exit = 1;
          break;
      case 3 : 
      case 4 : 
          exit = 2;
          break;
      
    }
  }
  switch (exit) {
    case 1 : 
        return (new Error('RunContext is not supported'));
    case 2 : 
        return (ctx.data.value);
    
  }
}

function singleStep(single, ctx, transactions) {
  var arg = stepArg(ctx);
  var match = FullDatatype$Graphite.Cmd[/* cmdUnT */2](single);
  switch (match) {
    case 0 : 
        return ((()=>{
         const newCtx = Ctx.compute(
           [undefined, arg, ctx],
           null,
           null,
           false,
           true,
           true,
          )
          try {
           const result = single.data.reduce(undefined, arg, newCtx)
           newCtx.data.result = result
           newCtx.data.isNone = result === undefined
          } catch (err) {
           newCtx.data.isError = true
           newCtx.data.error = err
           newCtx.data.isChanged = false
          }
          if (!newCtx.data.isChanged) return
          return newCtx
       })());
    case 1 : 
        var em = FullDatatype$Graphite.Ctx[/* emit */4]((single.data.fullName), arg);
        return /* EmitG */Block.__(1, [em]);
    case 2 : 
        var transCtx = (single.data.transactionContext);
        if (transCtx) {
          FullDatatype$Graphite.Step[/* setAdd */1](transactions, transCtx);
        }
        return /* EmitG */Block.__(1, [FullDatatype$Graphite.Ctx[/* emit */4]((single.data.fullName), arg)]);
    case 3 : 
        return ((() => {
     try {
      const isChanged = single.data.filter(arg, ctx)
      return Ctx.filter(arg, isChanged)
     } catch (err) {
      console.error(err)
      return
     }
    })());
    case 4 : 
        var newCtx = FullDatatype$Graphite.Ctx[/* update */6](arg);
        ((single.data.store.set(arg)));
        return /* UpdateG */Block.__(4, [newCtx]);
    
  }
}

export {
  stepArg ,
  singleStep ,
  
}
/*  Not a pure module */
