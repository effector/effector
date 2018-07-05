

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
        return ((()=>{throw new Error('RunContext is not supported')})());
    case 2 : 
        return (ctx.data.value);
    
  }
}

function singleEmit(arg, single, _, _$1) {
  FullDatatype$Graphite.Cmd[/* cmdUnT */2](single);
  return FullDatatype$Graphite.Ctx[/* emit */4]((single.data.fullName), arg);
}

function singleFilter(arg, single, ctx, _) {
  FullDatatype$Graphite.Cmd[/* cmdUnT */2](single);
  FullDatatype$Graphite.Ctx[/* getType */1](ctx);
  var isChanged = (single.data.filter(arg, ctx));
  return FullDatatype$Graphite.Ctx[/* filter */5](arg, isChanged);
}

function singleStep(single, ctx, transactions) {
  var arg = stepArg(ctx);
  var match = FullDatatype$Graphite.Cmd[/* cmdUnT */2](single);
  var r;
  switch (match) {
    case 0 : 
        var newCtx = FullDatatype$Graphite.Ctx[/* compute */2](/* array */[
              (undefined),
              arg,
              (ctx)
            ], (null), (null), false, true, true);
        var fr = ((()=>{
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
        console.log(newCtx);
        r = fr;
        break;
    case 1 : 
        var em = singleEmit(arg, single, ctx, transactions);
        r = /* EmitG */Block.variant("EmitG", 1, [em]);
        break;
    case 2 : 
        var transCtx = (single.data.transactionContext);
        if (transCtx) {
          transactions.push(transCtx);
        }
        r = /* EmitG */Block.variant("EmitG", 1, [FullDatatype$Graphite.Ctx[/* emit */4]((single.data.fullName), arg)]);
        break;
    case 3 : 
        r = ((() => {
           try {
            const isChanged = single.data.filter(arg, ctx)
            return Ctx.filter(arg, isChanged)
           } catch (err) {
            console.error(err)
            return
           }
          })());
        break;
    case 4 : 
        var newCtx$1 = FullDatatype$Graphite.Ctx[/* update */6](arg);
        ((single.data.store.set(arg)));
        r = /* UpdateG */Block.variant("UpdateG", 4, [newCtx$1]);
        break;
    
  }
  ((r = r[0]));
  return r;
}

export {
  stepArg ,
  singleEmit ,
  singleFilter ,
  singleStep ,
  
}
/*  Not a pure module */
