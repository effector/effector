%raw
"/*@flow*/";

open FullDatatype;

/* exception UnsupportedContext(string); */
let stepArg = (ctx: Ctx.ctx('a)) =>
  switch (ctx |. Ctx.type_) {
  | 21 => %raw
          "ctx.data.result"
  | 22 => %raw
          "ctx.data.payload"
  | 24
  | 25 => %raw
          "ctx.data.value"
  | _ => %raw
         "new Error('RunContext is not supported')"
  };

let singleStep =
  (.
    single: Cmd.cmd,
    ctx: Ctx.ctx(int),
    transactions: Step.set((. unit) => unit),
  ) => (
    {
      let arg = stepArg(ctx);
      switch (Cmd.cmdUnT(single)) {
      | Cmd.EmitType =>
        let em = Ctx.emit(. [%raw "single.data.fullName"], arg);
        let emg: Ctx.ctxg = Ctx.EmitG(em);
        emg;
      | Cmd.FilterType =>
        %raw
        {|(() => {
     try {
      const isChanged = single.data.filter(arg, ctx)
      return Ctx.filter(arg, isChanged)
     } catch (err) {
      console.error(err)
      return
     }
    })()|}
      | Cmd.RunType =>
        let transCtx = [%raw "single.data.transactionContext"];
        if (transCtx) {
          let _ = Step.setAdd(transactions, transCtx);
          ();
        };
        Ctx.EmitG(Ctx.emit(. [%raw "single.data.fullName"], arg));
      | Cmd.UpdateType =>
        let newCtx = Ctx.update(. arg);
        let _ = [%raw "single.data.store.set(arg)"];
        Ctx.UpdateG(newCtx);
      | Cmd.ComputeType =>
        %raw
        {|(()=>{
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
       })()|}
      };
    }: Ctx.ctxg
    /* %raw
       {|(() => {
        const single = _
        const transactions = _$2
        if (ctx.type === Ctx.FILTER && !ctx.data.isChanged) return
        switch (single.type) {
         case Cmd.EMIT: {
          return Ctx.emit(single.data.fullName, arg)
         }
         case Cmd.FILTER: {
          try {
           const isChanged = single.data.filter(arg, ctx)
           return Ctx.filter(arg, isChanged)
          } catch (err) {
           console.error(err)
           return
          }
         }
         case Cmd.RUN: {
          const transCtx = single.data.transactionContext
          if (transCtx) transactions.add(transCtx(arg))
          try {
           single.data.runner(arg)
          } catch (err) {
           console.error(err)
          }
          return Ctx.run([arg], ctx)
         }
         case Cmd.UPDATE: {
          const newCtx = Ctx.update(arg)
          single.data.store.set(arg)
          return newCtx
         }
         case Cmd.COMPUTE: {
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
         }
         default:
          /*::(single.type: empty)*/
          throw new Error('impossible case')
        }
        })()|};*/
  );